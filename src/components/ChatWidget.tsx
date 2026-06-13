import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const INITIAL_WELCOME: Message = {
  role: 'assistant',
  content: "Hey, I'm Porus AI. Ask me anything about my work, skills, or projects.",
};

const MAX_MESSAGES = 10;
const RATE_LIMIT_RESET_MS = 60_000;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [msgCount, setMsgCount] = useState(0);
  const [rateLimited, setRateLimited] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming || rateLimited) return;

    if (msgCount >= MAX_MESSAGES) {
      setRateLimited(true);
      setError('Rate limit reached. Try again in 1 minute.');
      setTimeout(() => {
        setRateLimited(false);
        setError('');
      }, RATE_LIMIT_RESET_MS);
      return;
    }

    setInput('');
    setMsgCount((prev) => prev + 1);

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);

    setIsStreaming(true);
    setStreamingContent('');

    const chatHistory = updatedMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
        signal: abortController.signal,
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.token) {
              fullContent += parsed.token;
              setStreamingContent(fullContent);
            }
          } catch {
            // skip
          }
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: fullContent || '(no response)' }]);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError('Connection error. Check that the API server is running.');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I ran into an error. Please try again.' },
      ]);
    } finally {
      setIsStreaming(false);
      setStreamingContent('');
      abortRef.current = null;
    }
  }, [input, isStreaming, rateLimited, msgCount, messages]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'font-display text-sm',
          'border border-accent-green text-accent-green',
          'bg-bg-base/80 backdrop-blur-sm',
          'px-4 py-2.5',
          'hover:bg-accent-green hover:text-bg-base',
          'transition-colors duration-200',
          isOpen && 'hidden',
        )}
      >
        $ Ask Porus _
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed bottom-24 right-6 z-50',
              'w-[400px] h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]',
              'bg-bg-base/95 backdrop-blur-md',
              'border border-bg-border',
              'flex flex-col',
              'shadow-2xl',
            )}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-bg-border shrink-0">
              <span className="font-display text-xs text-accent-green">
                {'>'} porus_ai <span className="animate-blink">▌</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="font-display text-xs text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  {msg.role === 'assistant' && (
                    <span className="shrink-0 w-[3px] self-stretch bg-accent-green mr-2" />
                  )}
                  <span
                    className={cn(
                      'inline-block px-3 py-2 text-sm leading-relaxed max-w-[85%]',
                      msg.role === 'user'
                        ? 'bg-accent-green/10 text-accent-green border border-accent-green/30 rounded'
                        : 'text-text-primary font-body',
                    )}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}

              {isStreaming && (
                <div className="flex justify-start">
                  <span className="shrink-0 w-[3px] self-stretch bg-accent-green mr-2" />
                  <span className="inline-block text-sm leading-relaxed text-text-primary">
                    {streamingContent || ''}
                    <span className="animate-blink text-accent-green font-display">▌</span>
                  </span>
                </div>
              )}

              {error && !isStreaming && (
                <div className="text-center font-display text-xs text-red-400">{error}</div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-bg-border p-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs text-accent-green shrink-0">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  disabled={isStreaming || rateLimited}
                  className={cn(
                    'flex-1 bg-transparent outline-none',
                    'font-body text-sm text-text-primary',
                    'placeholder:text-text-muted',
                    'disabled:opacity-50',
                  )}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming || rateLimited}
                  className={cn(
                    'font-display text-xs px-3 py-1',
                    'border border-accent-green text-accent-green',
                    'hover:bg-accent-green hover:text-bg-base',
                    'transition-colors duration-200',
                    'disabled:opacity-30 disabled:cursor-not-allowed',
                  )}
                >
                  send
                </button>
              </div>
            </div>

            <div className="text-center py-1.5 border-t border-bg-border shrink-0">
              <span className="font-display text-[10px] text-text-muted tracking-wider">
                pow·ered by Porus AI
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
