import { sanitizeAiOutput } from '@/lib/ai-output';
import { getGeminiClient } from '@/lib/gemini';

const GEMINI_MODEL = 'gemini-2.0-flash';
const PLACEHOLDER_KEY = 'your_gemini_api_key_here';

export function isGeminiConfigured(): boolean {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  return Boolean(apiKey && apiKey !== PLACEHOLDER_KEY);
}

export async function generateWithGemini(prompt: string): Promise<string | null> {
  if (!isGeminiConfigured()) {
    return null;
  }

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    const text = typeof response.text === 'string' ? response.text.trim() : '';
    return text ? sanitizeAiOutput(text) : null;
  } catch (error) {
    console.error('Gemini generation failed, using fallback:', error);
    return null;
  }
}