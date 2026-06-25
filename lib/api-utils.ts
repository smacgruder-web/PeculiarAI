import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

const RATE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  'gemini-generate': { limit: 20, windowMs: 60_000 },
  readiness: { limit: 20, windowMs: 60_000 },
  contact: { limit: 5, windowMs: 60_000 },
  newsletter: { limit: 5, windowMs: 60_000 },
  careers: { limit: 3, windowMs: 60_000 },
};

const DEFAULT_BODY_LIMIT = 32_000;

export function enforceRateLimit(req: NextRequest, route: string): NextResponse | null {
  const ip = getClientIp(req);
  const config = RATE_LIMITS[route] ?? { limit: 20, windowMs: 60_000 };
  const result = rateLimit(`${route}:${ip}`, config.limit, config.windowMs);

  if (!result.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      {
        status: 429,
        headers: result.retryAfter
          ? { 'Retry-After': String(result.retryAfter) }
          : undefined,
      }
    );
  }

  return null;
}

export async function parseJsonBody(
  req: NextRequest,
  maxBytes = DEFAULT_BODY_LIMIT
): Promise<{ ok: true; body: unknown } | { ok: false; response: NextResponse }> {
  const contentLength = Number(req.headers.get('content-length') ?? 0);
  if (contentLength > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Request too large' }, { status: 413 }),
    };
  }

  try {
    const raw = await req.text();
    if (raw.length > maxBytes) {
      return {
        ok: false,
        response: NextResponse.json({ error: 'Request too large' }, { status: 413 }),
      };
    }

    if (!raw.trim()) {
      return {
        ok: false,
        response: NextResponse.json({ error: 'Invalid request' }, { status: 400 }),
      };
    }

    return { ok: true, body: JSON.parse(raw) as unknown };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Invalid request' }, { status: 400 }),
    };
  }
}