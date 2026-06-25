'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { HelpCircle, ArrowLeft, Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-mono selection:bg-cyan-500/30 flex flex-col justify-between">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden pt-32 pb-20">
        {/* Ambient background grow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-md w-full text-center relative z-10 space-y-8">
          {/* Visual Indicator */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 text-cyan-400 mb-2 shadow-lg shadow-cyan-500/5 mx-auto"
          >
            <HelpCircle className="w-10 h-10 animate-pulse" />
          </motion.div>

          {/* Text content */}
          <div className="space-y-3">
            <h1 className="text-8xl font-space font-black tracking-tighter text-white">
              404
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold">
              ERR_COGNITIVE_NODE_NOT_FOUND
            </p>
            <p className="text-slate-500 text-sm font-sans max-w-xs mx-auto leading-relaxed pt-2">
              The neural pathway or operational system node you requested does not exist in our index.
            </p>
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back Home
            </Link>
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-cyan-500/50 transition-all"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Open Console
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
