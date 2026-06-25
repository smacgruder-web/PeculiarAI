const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function sanitizeText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function sanitizeEmail(value: unknown): string | null {
  const email = sanitizeText(value, 254);
  if (!email || !EMAIL_RE.test(email)) return null;
  return email.toLowerCase();
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const CONTACT_INTERESTS = [
  'Not sure yet — help me figure it out',
  'Automating daily tasks',
  'Customer follow-up & sales',
  'Marketing & content help',
  'Team AI training',
  'Custom tool or dashboard',
] as const;

export const CAREER_POSITIONS = [
  'Front End Developer',
  'Back End Developer',
  'Other / Open to Discussion',
] as const;