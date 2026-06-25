import { enforceRateLimit, parseJsonBody } from '@/lib/api-utils';
import { isHoneypotTriggered, sanitizeEmail } from '@/lib/form-utils';
import { sendFormEmail } from '@/lib/send-email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rateLimited = enforceRateLimit(req, 'newsletter');
  if (rateLimited) return rateLimited;

  try {
    const parsed = await parseJsonBody(req, 4096);
    if (!parsed.ok) return parsed.response;
    const body = parsed.body as Record<string, unknown>;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const email = sanitizeEmail(body.email);
    if (!email) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const result = await sendFormEmail({
      subject: 'Newsletter subscribe',
      replyTo: email,
      fields: {
        Email: email,
        Source: 'Footer newsletter signup',
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: 'Newsletter signup is not configured. Please email us directly.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit newsletter signup' }, { status: 500 });
  }
}