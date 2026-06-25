import {
  buildChatbotPrompt,
  buildDemoPrompt,
  clampText,
  parseChatHistory,
  MAX_FIELD_LENGTH,
  MAX_MESSAGE_LENGTH,
} from '@/lib/api-prompts';
import { generateDemoAnalysis } from '@/lib/ai-fallback';
import { generateWithGemini } from '@/lib/gemini-generate';
import { enforceRateLimit, parseJsonBody } from '@/lib/api-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const rateLimited = enforceRateLimit(req, 'gemini-generate');
  if (rateLimited) return rateLimited;

  try {
    const parsed = await parseJsonBody(req, 48_000);
    if (!parsed.ok) return parsed.response;
    const body = parsed.body as Record<string, unknown>;
    const type = body?.type;

    let prompt: string | null = null;

    if (type === 'chatbot') {
      const message = clampText(body.message, MAX_MESSAGE_LENGTH);
      const history = parseChatHistory(body.history);
      if (!message || !history) {
        return NextResponse.json({ error: 'Invalid chatbot request' }, { status: 400 });
      }
      prompt = buildChatbotPrompt(message, history);
    } else if (type === 'demo') {
      const input = clampText(body.input, MAX_FIELD_LENGTH);
      if (!input) {
        return NextResponse.json({ error: 'Invalid demo request' }, { status: 400 });
      }
      prompt = buildDemoPrompt(input);
    } else {
      return NextResponse.json({ error: 'Unsupported request type' }, { status: 400 });
    }

    if (type === 'demo') {
      const input = clampText(body.input, MAX_FIELD_LENGTH)!;
      const liveText = await generateWithGemini(prompt);
      const text = liveText ?? JSON.stringify(generateDemoAnalysis(input));

      return NextResponse.json({
        text,
        mode: liveText ? 'live' : 'demo',
      });
    }

    const text = await generateWithGemini(prompt);
    if (!text) {
      return NextResponse.json(
        { error: 'AI assistant is temporarily offline. Please try again later or contact us.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ text, mode: 'live' });
  } catch (error: unknown) {
    console.error('Gemini Error:', error);
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}