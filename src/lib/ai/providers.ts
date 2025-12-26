import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { AIProvider } from '@/types';

export function getAIProvider(apiKey?: string, provider: AIProvider = 'claude') {
  if (provider === 'gemini') {
    const google = createGoogleGenerativeAI({
      apiKey: apiKey || process.env.GEMINI_API_KEY,
    });
    // User requested Gemini 3.0 Pro Preview (Correct ID from docs: gemini-3-pro-preview)
    return google('gemini-3-pro-preview');
  }

  const anthropic = createAnthropic({
    apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
  });
  return anthropic('claude-opus-4-5-20251101');
}
