import { createAnthropic } from '@ai-sdk/anthropic';

export function getAIProvider(apiKey?: string) {
  const anthropic = createAnthropic({
    apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
  });
  return anthropic('claude-opus-4-5-20251101');
}
