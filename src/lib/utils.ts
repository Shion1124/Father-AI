import fs from 'fs';
import path from 'path';

/**
 * Load the Context Engineering prompt from the data directory
 */
export async function loadSystemPrompt(): Promise<string> {
  const promptPath = path.join(process.cwd(), 'data', 'Context_Engineering.md');

  try {
    const prompt = fs.readFileSync(promptPath, 'utf-8');
    return prompt;
  } catch (error) {
    console.error('Failed to load system prompt:', error);
    // Fallback prompt
    return `You are "Father AI", a supportive career counselor for elementary and middle school students.
Your goal is to help them discover their interests and create concrete roadmaps to their dream careers.
Always be encouraging, specific, and provide visual roadmaps using Mermaid diagrams and Markdown tables.`;
  }
}

/**
 * MCP Tools placeholder
 * These will be implemented when context7 and Serena are integrated
 */
export const mcpTools = {
  context7: {
    name: 'context7',
    description: 'Context management and optimization tool',
    // Implementation pending
  },
  serena: {
    name: 'serena',
    description: 'Agent autonomous action and tool usage support',
    // Implementation pending
  },
};
