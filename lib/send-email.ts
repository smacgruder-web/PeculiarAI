import { escapeHtml } from '@/lib/form-utils';

interface SendFormEmailInput {
  subject: string;
  fields: Record<string, string>;
  replyTo?: string;
}

export async function sendFormEmail({
  subject,
  fields,
  replyTo,
}: SendFormEmailInput): Promise<{ ok: true } | { ok: false; reason: 'not_configured' | 'send_failed' }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_FORM_TO?.trim() || process.env.CONTACT_EMAIL?.trim();

  if (!apiKey || !to) {
    return { ok: false, reason: 'not_configured' };
  }

  const from = process.env.RESEND_FROM?.trim() || 'Peculiar AI <onboarding@resend.dev>';
  const html = Object.entries(fields)
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value).replace(/\n/g, '<br>')}</p>`)
    .join('');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!response.ok) {
      console.error('Resend API error:', response.status, await response.text());
      return { ok: false, reason: 'send_failed' };
    }

    return { ok: true };
  } catch (error) {
    console.error('Resend request failed:', error);
    return { ok: false, reason: 'send_failed' };
  }
}