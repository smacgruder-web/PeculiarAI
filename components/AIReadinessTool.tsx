'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Loader2, BrainCircuit, ChevronRight } from 'lucide-react';

export default function AIReadinessTool() {
  const [businessType, setBusinessType] = useState('');
  const [goals, setGoals] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType || !goals) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessType, goals }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate snapshot');
      }

      if (!data.text) {
        throw new Error('Empty response');
      }

      setResult(data.text);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to generate your AI snapshot right now. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-tool" className="py-16 md:py-20 relative overflow-hidden bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[#2dd4bf] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-4 h-4" />
            AI Strategy Snapshot
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-space font-medium tracking-tighter text-white">
            Get a quick <span className="italic text-[#2dd4bf]">AI Blueprint</span> in seconds.
          </h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="business-type" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Industry / Business Type
                </label>
                <input
                  id="business-type"
                  type="text"
                  required
                  placeholder="e.g. Real Estate Agency, Logistics"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="goals" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Primary Scaling Goal
                </label>
                <input
                  id="goals"
                  type="text"
                  required
                  placeholder="e.g. Automate lead follow-up"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2dd4bf] text-[#003731] py-3.5 rounded-xl font-bold uppercase tracking-widest hover:bg-[#57f1db] transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Generate AI Snapshot
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-300"
              >
                {error}
              </motion.div>
            )}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-white/5 border border-[#2dd4bf]/20 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <BrainCircuit className="w-20 h-20 text-[#2dd4bf]" />
                </div>
                <p className="text-sm font-bold text-[#2dd4bf] uppercase tracking-[0.2em] mb-4">
                  Executive Recommendation
                </p>
                <div className="text-sm leading-relaxed text-slate-300 whitespace-pre-line italic">
                  {result}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center text-[10px] text-slate-500 uppercase tracking-widest">
          *This is a generative AI analysis.{' '}
          <a
            href="https://calendly.com/peculiarai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2dd4bf] hover:underline"
          >
            Book a full audit
          </a>{' '}
          for precise roadmaps.
        </p>
      </div>
    </section>
  );
}