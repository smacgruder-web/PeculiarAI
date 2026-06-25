'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Activity, 
  Cpu, 
  Network, 
  Brain, 
  Zap, 
  ChevronRight, 
  BarChart3, 
  ShieldCheck,
  Send,
  Loader2,
  RefreshCw,
  Orbit
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock Data for the simulator
const SYSTEM_LOGS = [
  "INITIALIZING NEURAL_KERNEL_V4...",
  "CONNECTING TO GLOBAL_DATA_MESH...",
  "SECURE HANDSHAKE ESTABLISHED [HASH: 4F2A-91BC]",
  "WAITING FOR OPERATOR INPUT...",
];

export default function DemoPage() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>(SYSTEM_LOGS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    insight: string;
    nodes: string[];
    risk: number;
  } | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'console' | 'neural' | 'metrics'>('console');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || isProcessing) return;

    setIsProcessing(true);
    setParseError(null);
    addLog(`ANALYZING REQUEST: "${input.substring(0, 30)}..."`);
    addLog(`EXECUTING COGNITIVE_QUERY...`);

    try {
      const response = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'demo', input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Cognitive engine request failed');
      }

      let text = typeof data.text === 'string' ? data.text.trim() : '';
      if (text.includes('```json')) {
        text = text.match(/```json\n([\s\S]*?)\n```/)?.[1]?.trim() || text;
      } else if (text.startsWith('```')) {
        text = text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/, '').trim();
      }

      let result: { insight: string; nodes: string[]; risk: number };
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error('AI returned malformed analysis data');
      }

      if (
        typeof result.insight !== 'string' ||
        !Array.isArray(result.nodes) ||
        result.nodes.length < 1 ||
        typeof result.risk !== 'number'
      ) {
        throw new Error('AI response missing required analysis fields');
      }

      addLog(`SUCCESS: ANALYSIS COMPLETED${data.mode === 'demo' ? ' [OFFLINE DEMO MODE]' : ''}.`);
      setAnalysis(result);
      setActiveTab('neural');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'SYSTEM_FAILURE in COGNITIVE_ENGINE';
      addLog(`ERROR: ${message}`);
      setParseError(message);
      console.error(err);
    } finally {
      setIsProcessing(false);
      setInput('');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-300 font-mono selection:bg-cyan-500/30">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">CONSOLE_ACTIVE // INTERACTIVE_DEMO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-space font-medium tracking-tighter text-white">
              The <span className="text-cyan-400">Peculiar</span> Console
            </h1>
            <p className="mt-3 max-w-xl text-xs text-slate-500 leading-relaxed">
              Visual demo interface only — terminal logs and handshake messages are stylistic UI,
              not live security telemetry.
            </p>
          </div>
          
          <div className="flex gap-2">
            {[
              { id: 'console', icon: Terminal, label: 'Ops Console' },
              { id: 'neural', icon: Brain, label: 'Neural View' },
              { id: 'metrics', icon: BarChart3, label: 'Metrics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-cyan-500 text-slate-950' 
                    : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Console Grid */}
        <div className="grid lg:grid-cols-12 gap-6 h-[700px]">
          {/* Left Column: Input & Logs */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* The Console UI */}
            <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-[2rem] p-6 flex flex-col overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <Terminal className="w-64 h-64" />
              </div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Peculiar_Log_Stream.sh</span>
                </div>
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>

              {/* Log Window */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-2 mb-6 scrollbar-hide pr-2"
              >
                {logs.map((log, i) => (
                  <div key={i} className="text-xs font-mono leading-relaxed group/log">
                    <span className="text-slate-600 mr-2 opacity-50">[{i}]</span>
                    <span className={log.includes('ERROR') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-green-400' : 'text-cyan-400/80'}>
                      {log}
                    </span>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex items-center gap-2 text-xs text-white/50 italic animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Processing digital ecosystem...
                  </div>
                )}
                {parseError && (
                  <div className="text-xs text-red-400 border border-red-500/30 bg-red-500/10 rounded-xl p-4">
                    {parseError}
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleProcess} className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500">
                  <ChevronRight className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your business or problem (e.g. Scaling a SaaS in healthcare)..."
                  className="w-full bg-slate-950 border border-white/5 rounded-2xl py-5 pl-12 pr-16 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                />
                <button
                  type="submit"
                  disabled={!input || isProcessing}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-slate-950 p-2.5 rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Visualization/Detail */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-[2rem] p-8 flex flex-col relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'console' && (
                  <motion.div
                    key="console-help"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    <div className="h-48 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full" />
                      <Cpu className="w-20 h-20 text-cyan-400/30 animate-pulse" />
                      <Orbit className="absolute w-32 h-32 text-slate-800 rotate-45" />
                    </div>
                    
                    <div>
                      <h3 className="text-white font-space text-lg mb-4">Operator Instructions</h3>
                      <ul className="space-y-4">
                        {[
                          "Define your operational environment.",
                          "Identify friction points or scaling barriers.",
                          "Peculiar AI analyzes cognitive patterns.",
                          "Neural results populate into the system view."
                        ].map((step, i) => (
                          <li key={i} className="flex gap-3 text-xs text-slate-500">
                            <span className="text-cyan-400 font-bold">{i+1}.</span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'neural' && (
                  <motion.div
                    key="neural-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col"
                  >
                    {!analysis ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 grayscale opacity-30">
                        <Brain className="w-16 h-16 mb-4" />
                        <p className="text-xs uppercase tracking-widest font-bold">Waiting for Analysis</p>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col">
                        <div className="mb-8">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-2">Neural Insight</h4>
                          <p className="text-white text-sm font-medium leading-relaxed italic">
                            &ldquo;{analysis.insight}&rdquo;
                          </p>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400 mb-6">Efficiency Nodes</h4>
                          <div className="space-y-4">
                            {analysis.nodes.map((node: string, i: number) => (
                              <motion.div 
                                key={i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4 group hover:border-cyan-500/30 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                                  <Network className="w-4 h-4" />
                                </div>
                                <span className="text-xs text-slate-300 font-medium">{node}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-green-500" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Security: Verified</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setAnalysis(null);
                              setParseError(null);
                              setActiveTab('console');
                              addLog('SESSION RESET BY OPERATOR.');
                            }}
                            className="bg-white/5 p-2 rounded-lg text-slate-500 hover:text-white transition-colors"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'metrics' && (
                  <motion.div
                    key="metrics-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8 h-full flex flex-col"
                  >
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-white/5"
                          />
                          <motion.circle
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 80}
                            initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - (analysis?.risk || 0) / 100) }}
                            className="text-cyan-500"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-4xl font-space font-medium text-white">{analysis?.risk || 0}%</span>
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Risk Level</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[10px] uppercase tracking-widest text-slate-600 text-center mb-4">
                      Simulated console metrics for demo purposes
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Latency', value: '42ms', color: 'text-green-500' },
                        { label: 'Uptime', value: '99.9%', color: 'text-cyan-500' },
                        { label: 'Nodes', value: '1,420', color: 'text-white' },
                        { label: 'Compute', value: '82%', color: 'text-yellow-500' }
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                          <div className="text-[8px] uppercase tracking-widest text-slate-600 mb-1 font-bold">{stat.label}</div>
                          <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Feature Grid Below */}
        <div className="mt-24 grid md:grid-cols-3 gap-12">
          {[
            { 
              icon: Zap, 
              title: "Proprietary Edge Training", 
              desc: "Our models learn from unique operational data that generic AI ignores, providing a sharper competitive edge." 
            },
            { 
              icon: ShieldCheck, 
              title: "Governance First", 
              desc: "Full traceability and privacy-first architectures mean your data stays yours even as your systems improve." 
            },
            { 
              icon: Network, 
              title: "Seamless Integration", 
              desc: "Deployment that works with your current stack. No 6-month migrations, just rapid structural improvements." 
            }
          ].map((feature, i) => (
            <div key={i} className="group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500 mb-6 group-hover:scale-110">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-space text-xl mb-3">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
