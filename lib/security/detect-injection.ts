/**
 * Heuristic prompt injection detector for fetched content.
 *
 * Zero-LLM-cost detection using pattern matching against known
 * prompt injection signatures, encoded payloads, and structural anomalies.
 */

export type Severity = "low" | "medium" | "high";

export interface SecurityFlag {
  rule: string;
  severity: Severity;
  detail: string;
  line?: number;
}

export interface SecurityScanResult {
  safe: boolean;
  score: number;
  flags: SecurityFlag[];
}

const DEFAULT_THRESHOLD = 3;

const SEVERITY_WEIGHT: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

interface PatternRule {
  rule: string;
  severity: Severity;
  pattern: RegExp;
  detail: string;
}

const LINE_PATTERNS: PatternRule[] = [
  {
    rule: "injection-pattern",
    severity: "high",
    pattern: /ignore\s+(all\s+)?previous\s+instructions/i,
    detail: 'Prompt injection: "ignore previous instructions"',
  },
  {
    rule: "injection-pattern",
    severity: "high",
    pattern: /disregard\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
    detail: 'Prompt injection: "disregard previous instructions"',
  },
  {
    rule: "injection-pattern",
    severity: "medium",
    pattern: /you\s+are\s+now\s+/i,
    detail: 'Role override attempt: "you are now"',
  },
  {
    rule: "injection-pattern",
    severity: "medium",
    pattern: /^\s*act\s+as\s+/i,
    detail: 'Role override attempt: "act as"',
  },
  {
    rule: "injection-pattern",
    severity: "medium",
    pattern: /pretend\s+you\s+are/i,
    detail: 'Role override attempt: "pretend you are"',
  },
  {
    rule: "system-prompt-injection",
    severity: "high",
    pattern: /^\s*system\s*:/i,
    detail: 'System prompt injection: "system:" prefix',
  },
  {
    rule: "system-prompt-injection",
    severity: "high",
    pattern: /<system>/i,
    detail: "System prompt injection: <system> tag",
  },
  {
    rule: "system-prompt-injection",
    severity: "high",
    pattern: /\[SYSTEM\]/,
    detail: "System prompt injection: [SYSTEM] marker",
  },
  {
    rule: "tag-injection",
    severity: "high",
    pattern: /<instructions>/i,
    detail: "XML injection: <instructions> tag",
  },
  {
    rule: "tag-injection",
    severity: "high",
    pattern: /<tool_use>/i,
    detail: "XML injection: <tool_use> tag",
  },
  {
    rule: "tag-injection",
    severity: "high",
    pattern: /<function_call>/i,
    detail: "XML injection: <function_call> tag",
  },
  {
    rule: "base64-blob",
    severity: "medium",
    pattern: /[A-Za-z0-9+/=]{50,}/,
    detail: "Large Base64-encoded blob detected",
  },
  {
    rule: "hex-encoded",
    severity: "medium",
    pattern: /0x[0-9a-fA-F]{20,}/,
    detail: "Large hex-encoded string detected",
  },
  {
    rule: "hidden-content",
    severity: "low",
    pattern: /<!--[\s\S]*?-->/,
    detail: "HTML comment (potential hidden instructions)",
  },
];

function buildCodeBlockMap(lines: string[]): boolean[] {
  const map: boolean[] = new Array(lines.length).fill(false);
  let insideFence = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trimStart().startsWith("```")) {
      insideFence = !insideFence;
      map[i] = true;
    } else {
      map[i] = insideFence;
    }
  }
  return map;
}

function validateStructure(content: string): SecurityFlag[] {
  const flags: SecurityFlag[] = [];
  const trimmed = content.trimStart();

  if (trimmed.length === 0) return flags;

  if (!trimmed.startsWith("#")) {
    if (/^<!DOCTYPE/i.test(trimmed) || /^<html/i.test(trimmed)) {
      flags.push({
        rule: "invalid-format",
        severity: "high",
        detail: "Content is HTML, not Markdown",
        line: 1,
      });
    } else if (trimmed.startsWith('{"') || trimmed.startsWith("[")) {
      flags.push({
        rule: "invalid-format",
        severity: "high",
        detail: "Content is JSON, not Markdown",
        line: 1,
      });
    } else if (trimmed.startsWith("<?xml")) {
      flags.push({
        rule: "invalid-format",
        severity: "high",
        detail: "Content is XML, not Markdown",
        line: 1,
      });
    } else {
      flags.push({
        rule: "invalid-structure",
        severity: "medium",
        detail: "Content should start with # (Markdown H1)",
        line: 1,
      });
    }
  }

  return flags;
}

/**
 * Scan content for prompt injection patterns and security issues.
 * Lines inside fenced code blocks (``` ... ```) are skipped.
 */
export function scanContent(
  content: string,
  threshold?: number,
): SecurityScanResult {
  const effectiveThreshold =
    threshold ??
    (typeof process !== "undefined" && process.env.SECURITY_SCORE_THRESHOLD
      ? parseInt(process.env.SECURITY_SCORE_THRESHOLD, 10)
      : DEFAULT_THRESHOLD);

  const flags: SecurityFlag[] = [];

  flags.push(...validateStructure(content));

  const lines = content.split("\n");
  const codeBlockMap = buildCodeBlockMap(lines);

  for (let i = 0; i < lines.length; i++) {
    if (codeBlockMap[i]) continue;

    for (const rule of LINE_PATTERNS) {
      if (rule.pattern.test(lines[i])) {
        flags.push({
          rule: rule.rule,
          severity: rule.severity,
          detail: rule.detail,
          line: i + 1,
        });
      }
    }
  }

  if (/\n\nHuman\s*:/.test(content)) {
    flags.push({
      rule: "conversation-injection",
      severity: "high",
      detail: 'Claude conversation format injection: "\\n\\nHuman:"',
    });
  }
  if (/\n\nAssistant\s*:/.test(content)) {
    flags.push({
      rule: "conversation-injection",
      severity: "high",
      detail: 'Claude conversation format injection: "\\n\\nAssistant:"',
    });
  }

  const score = flags.reduce(
    (sum, flag) => sum + SEVERITY_WEIGHT[flag.severity],
    0,
  );

  return {
    safe: score < effectiveThreshold,
    score,
    flags,
  };
}
