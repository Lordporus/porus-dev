import { readFileSync } from 'fs';
import { join } from 'path';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  try {
    const kbPath = join(process.cwd(), 'porus_knowledge.MD');
    let knowledgeBase = '';
    try {
      knowledgeBase = readFileSync(kbPath, 'utf-8');
    } catch {
      knowledgeBase = 'Knowledge base file not found. Porus is an AI Automation Engineer and Full Stack SaaS Developer.';
    }

    const systemPrompt = `You are Porus AI, a portfolio assistant representing Porus (AI Automation Engineer & Full Stack SaaS Developer).

You must answer ONLY using the knowledge base below. Never invent information. If you don't know, redirect.

KNOWLEDGE BASE:
${knowledgeBase}

RULES:
- Answer only from the knowledge base
- Never invent experience, certifications, clients, revenue, or testimonials
- If information is missing, say: "That's beyond what I can answer. Please schedule a call or contact Porus directly."
- Be direct, practical, technical, and minimal fluff
- Never negotiate pricing or accept contracts
- Never make promises on behalf of Porus`;

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!groqRes.ok) {
      const text = await groqRes.text();
      console.error('Groq API error:', groqRes.status, text);
      return res.status(502).json({ error: 'AI service error' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = groqRes.body?.getReader();
    if (!reader) {
      return res.status(502).json({ error: 'No response stream' });
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const token = parsed.choices?.[0]?.delta?.content || '';
          if (token) {
            res.write(`data: ${JSON.stringify({ token })}\n\n`);
          }
        } catch {
          // skip malformed lines
        }
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    console.error('Chat handler error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
