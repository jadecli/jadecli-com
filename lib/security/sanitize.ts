/**
 * Content sanitizer — strips invisible/dangerous Unicode characters
 * from fetched content before storage.
 *
 * Defends against steganographic prompt injection where malicious actors
 * embed invisible characters in source-controlled files.
 */

export interface InvisibleCharReport {
  found: boolean;
  count: number;
  types: string[];
}

/** Category matchers for detection reporting. */
const CATEGORY_MATCHERS: Array<{ name: string; regex: RegExp }> = [
  { name: "zero-width", regex: /[\u200B-\u200D\u2060\uFEFF]/g },
  { name: "bidi-override", regex: /[\u202A-\u202E\u2066-\u2069]/g },
  { name: "control-char", regex: /[\u0000-\u0008\u000E-\u001F]/g },
  { name: "tag-char", regex: /\uDB40[\uDC01-\uDC7F]/g },
  { name: "variation-selector", regex: /[\uFE00-\uFE0F]/g },
];

/**
 * Master regex matching all invisible/dangerous character ranges.
 * Preserves: TAB (U+0009), LF (U+000A), CR (U+000D), SPACE and above.
 */
const INVISIBLE_CHAR_REGEX =
  /[\u0000-\u0008\u000E-\u001F\u200B-\u200D\u2060\uFEFF\u202A-\u202E\u2066-\u2069\uFE00-\uFE0F]|\uDB40[\uDC01-\uDC7F]/g;

/**
 * Detect invisible/dangerous Unicode characters in content.
 * Returns a report with categories found and total count.
 */
export function detectInvisibleChars(content: string): InvisibleCharReport {
  const types: string[] = [];
  let totalCount = 0;

  for (const { name, regex } of CATEGORY_MATCHERS) {
    regex.lastIndex = 0;
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      types.push(name);
      totalCount += matches.length;
    }
  }

  return { found: totalCount > 0, count: totalCount, types };
}

/**
 * Strip invisible/dangerous Unicode characters from content.
 * Preserves legitimate whitespace: TAB (U+0009), LF (U+000A), CR (U+000D).
 */
export function stripInvisibleChars(content: string): string {
  return content.replace(INVISIBLE_CHAR_REGEX, "");
}
