import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { loadSystemPrompt } from '@/lib/utils';

// Connect to Ollama via OpenAI-compatible endpoint
const openai = new OpenAI({
  baseURL: process.env.QWEN_API_ENDPOINT || 'http://localhost:11434/v1',
  apiKey: 'ollama', // Required but ignored by Ollama
});

// Use Node.js runtime for file system access
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('📨 Received message count:', messages.length);

    // Load the system prompt
    const systemPrompt = await loadSystemPrompt();
    console.log('📝 System prompt loaded');

    const modelName = process.env.QWEN_MODEL_NAME || 'qwen3:8b';
    console.log('🤖 Using model:', modelName);

    // Add system prompt to the beginning of messages
    // Note: Some models might prefer system prompt as a separate parameter depending on the client library,
    // but for OpenAI chat completions, it's typically the first message.
    const fullMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ];

    const response = await openai.chat.completions.create({
      model: modelName,
      stream: true,
      messages: fullMessages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onStart: async () => {
        console.log('✅ Stream started');
      },
      onCompletion: async (completion) => {
        console.log('✅ Stream completed');
      },
    });

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('❌ Error in chat API:', error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
