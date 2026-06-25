import { enforceRateLimit, parseJsonBody } from '@/lib/api-utils';
import { CAREER_POSITIONS, isHoneypotTriggered, sanitizeEmail, sanitizeText } from '@/lib/form-utils';
import { sendFormEmail } from '@/lib/send-email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rateLimited = enforceRateLimit(req, 'careers');
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
    const position = sanitizeText(body.position, 100);
    const why = sanitizeText(body.why, 5000);

    if (!name || !email || !why) {
      return NextResponse.json({ error: 'Invalid application' }, { status: 400 });
    }

    if (!position || !CAREER_POSITIONS.includes(position as (typeof CAREER_POSITIONS)[number])) {
      return NextResponse.json({ error: 'Invalid application' }, { status: 400 });
    }

    const result = await sendFormEmail({
      subject: `Peculiar AI Application: ${position}`,
      replyTo: email,
      fields: {
        Name: name,
        Email: email,
        Position: position,
        'Why Peculiar AI': why,
      },
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: 'Application delivery is not configured. Please email us directly.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}