'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi! I'm here to help you figure out how AI could fit into your work. Ask me anything — like automating emails, choosing tools, or where to start.",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const resetConversation = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setIsTyping(false);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const historyForApi = [...messages, userMessage];
    setMessages(historyForApi);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'chatbot',
          message: userMessage.content,
          history: historyForApi,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Request failed');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't respond just now. Try again or use the contact form — we're happy to help!",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-4 sm:right-6 z-[100] w-14 h-14 bg-[#2dd4bf] text-[#003731] rounded-2xl shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform safe-bottom"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:w-[360px] z-[100] h-[min(480px,calc(100dvh-7rem))] bg-slate-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden safe-bottom"
          >
            <div className="p-4 border-b border-white/5 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Ask Peculiar AI</h3>
                <p className="text-xs text-slate-500">Questions about AI for your work</p>
              </div>
              <button
                type="button"
                onClick={resetConversation}
                className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5"
                aria-label="Reset chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain" aria-live="polite">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#2dd4bf] text-[#003731] rounded-tr-sm'
                        : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                    <Loader2 className="w-4 h-4 text-[#2dd4bf] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/5 bg-slate-900/50">
              <div className="flex gap-2 mb-3 overflow-x-auto">
                {[
                  { label: 'Free snapshot', href: '/#ai-tool' },
                  { label: 'Contact', href: '/#proposal' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-[#2dd4bf] border border-white/5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 min-w-0 bg-slate-950 border border-white/10 rounded-xl py-3 px-3.5 text-sm text-white focus:outline-none focus:border-[#2dd4bf]"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="shrink-0 p-3 rounded-xl bg-[#2dd4bf] text-[#003731] disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}