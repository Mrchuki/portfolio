import { createOpenAI } from '@ai-sdk/openai';
import { streamText, tool, type CoreMessage } from 'ai';
import { z } from 'zod';

import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getInternship } from './tools/getIntership';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';

export const maxDuration = 30;

// Create DeepSeek provider using OpenAI compatibility
const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    // We explicitly type messages to assist inference
    const { messages }: { messages: CoreMessage[] } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);
    
    // Check if API key is available
    if (!process.env.DEEPSEEK_API_KEY) {
      console.error('[CHAT-API] Missing DEEPSEEK_API_KEY environment variable');
      return new Response('Missing API key', { status: 500 });
    }
    
    console.log('[CHAT-API] API key available:', process.env.DEEPSEEK_API_KEY?.slice(0, 5) + '...');

    // Add system prompt
    messages.unshift(SYSTEM_PROMPT);

    // Add tools
    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getInternship,
    };

    console.log('[CHAT-API] About to call streamText');
    
    // streamText returns a Promise in ai@4, so we await it
    const result = await streamText({
      model: deepseek('deepseek-chat'),
      messages,
      tools,
      maxSteps: 2,
    });

    console.log('[CHAT-API] streamText completed successfully');
    
    // toDataStreamResponse creates a standard response for AI SDK clients
    const response = result.toDataStreamResponse();
    console.log('[CHAT-API] DataStreamResponse created');
    
    return response;
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Handle specific error types
    if (error instanceof Error && error.message?.includes('quota')) {
      return new Response('API quota exceeded. Please try again later.', { status: 429 });
    }
    
    if (error instanceof Error && error.message?.includes('network')) {
      return new Response('Network error. Please check your connection and try again.', { status: 503 });
    }
    
    return new Response(`Internal Server Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}
