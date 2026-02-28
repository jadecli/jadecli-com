/**
 * API output sandboxing — wraps content in XML delimiters
 * so downstream LLMs can distinguish source data from instructions.
 */

export function sandboxContent(content: string, entitySlug: string): string {
  const safeSlug = entitySlug
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<UNTRUSTED_DATA source="${safeSlug}" type="fetched-content">
${content}
</UNTRUSTED_DATA>`;
}
