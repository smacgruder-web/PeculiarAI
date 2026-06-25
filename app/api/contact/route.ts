import { enforceRateLimit, parseJsonBody } from '@/lib/api-utils';
import { CONTACT_INTERESTS, isHoneypotTriggered, sanitizeEmail, sanitizeText } from '@/lib/form-utils';
import { sendFormEmail } from '@/lib/send-email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rateLimited = enforceRateLimit(req, 'contact');
  if (rateLimited) return rateLimited;

  try {
    const parsed = await parseJsonBody(req);
    if (!parsed.ok) return parsed.response;
    const body = parsed.body as Record<string, unknown>;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitizeText(body.name, 100);
    const email = sanitizeEmail(body.email);
    const company = sanitizeText(body.company, 200) ?? '';
    const interest = sanitizeText(body.interest, 100);
    const message = sanitizeText(body.message, 5000);

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Invalid contact request' }, { status: 400 });
    }

    if (!interest || !CONTACT_INTERESTS.includes(interest as (typeof CONTACT_INTERESTS)[number])) {
      return NextResponse.json({ error: 'Invalid contact request' }, { status: 400 });
    }

    const result = await sendFormEmail({
      subject: `Peculiar AI inquiry: ${interest}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        ...(company ? { Company: company } : {}),
        Interest: interest,
        Message: message,
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: 'Form delivery is not configured. Please email us directly.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}