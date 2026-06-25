const BLOCKED_PATTERNS = [
  /<script\b/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /<iframe\b/i,
];

export function sanitizeAiOutput(text: string): string {
  let output = text.trim();

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(output)) {
      return 'I can only share plain-language guidance here. Please rephrase your question.';
    }
  }

  if (output.length > 8000) {
    output = `${output.slice(0, 8000).trim()}…`;
  }

  return output;
}