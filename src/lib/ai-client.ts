import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';

/**
 * AI Client Configuration
 * Supports both Qwen (primary) and Gemini (fallback) models
 */

// Qwen Model (OpenAI-compatible endpoint)
export const qwenClient = createOpenAI({
  baseURL: process.env.QWEN_API_ENDPOINT || 'http://localhost:11434/v1',
  apiKey: 'ollama', // Ollama doesn't require a real API key
});

export const qwenModel = qwenClient(process.env.QWEN_MODEL_NAME || 'qwen3-coder-next3b');

// Google Gemini Model (fallback)
export const geminiModel = google('gemini-2.0-flash-exp');

/**
 * Get the appropriate model based on task complexity
 * @param useGemini - Force use of Gemini for complex tasks
 */
export function getModel(useGemini: boolean = false) {
  return useGemini ? geminiModel : qwenModel;
}
