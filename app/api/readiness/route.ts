import { generateReadinessSnapshot } from '@/lib/ai-fallback';
import { buildReadinessPrompt, clampText, MAX_FIELD_LENGTH } from '@/lib/api-prompts';
import { generateWithGemini } from '@/lib/gemini-generate';
import { enforceRateLimit, parseJsonBody } from '@/lib/api-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rateLimited = enforceRateLimit(req, 'readiness');
  if (rateLimited) return rateLimited;

  try {
    const parsed = await parseJsonBody(req, 4096);
    if (!parsed.ok) return parsed.response;
    const body = parsed.body as Record<string, unknown>;
    const businessType = clampText(body.businessType, MAX_FIELD_LENGTH);
    const goals = clampText(body.goals, MAX_FIELD_LENGTH);

    if (!businessType || !goals) {
      return NextResponse.json({ error: 'Invalid readiness request' }, { status: 400 });
    }

    const prompt = buildReadinessPrompt(businessType, goals);
    const liveText = await generateWithGemini(prompt);
    const text = liveText ?? generateReadinessSnapshot(businessType, goals);

    return NextResponse.json({
      text,
      mode: liveText ? 'live' : 'demo',
    });
  } catch (error: unknown) {
    console.error('Gemini Error:', error);
    return NextResponse.json({ error: 'Failed to generate strategy' }, { status: 500 });
  }
}