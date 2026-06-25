import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import Particles from '@/components/Particles';

const BANNER = {
  src: '/06_linkedin-banner_1584x396.png',
  width: 1584,
  height: 396,
} as const;

function HeroOpsTagline({ className = '' }: { className?: string }) {
  return (
    <p
      className={`font-space text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#2dd4bf] leading-relaxed ${className}`}
    >
      Practical AI for Real Operations
    </p>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#0a0b0e] text-white"
      aria-label="Peculiar AI Labs hero"
    >
      <header className="relative w-full bg-black pt-16">
        <Image
          src={BANNER.src}
          alt="Peculiar AI Labs — Building AI that's different. Solutions that make a difference."
          width={BANNER.width}
          height={BANNER.height}
          priority
          fetchPriority="high"
          sizes="100vw"
          className="block w-full h-auto"
        />

        <div
          className="absolute bottom-2.5 right-3 sm:bottom-4 sm:right-6 lg:right-10 hidden sm:block pointer-events-none"
          aria-label="Practical AI for Real Operations"
        >
          <div className="rounded-full border border-[#2dd4bf]/35 bg-black/70 px-4 py-2 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
            <HeroOpsTagline />
          </div>
        </div>
      </header>

      <div className="sm:hidden border-b border-[#2dd4bf]/15 bg-[#0a0b0e]/95 px-4 py-3 text-center">
        <HeroOpsTagline className="tracking-[0.18em]" />
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <Particles />
        </div>

        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[#2dd4bf]/6 blur-[140px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-8 left-1/2 w-[300px] h-[300px] bg-[#ff7a5c]/5 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h1 className="font-space text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight mb-5 text-white">
            A <span className="text-[#2dd4bf]">Peculiar</span> problem, demands a{' '}
            <span className="text-[#ff7a5c]">Peculiar</span> solution.
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-[42ch] mx-auto mb-8 leading-snug font-light">
            AI that thinks ahead. Solutions that deliver real-world impact for ambitious teams — built
            for constrained environments, low bandwidth, and places the cloud doesn&apos;t reach.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 justify-center">
            <a
              href="#proposal"
              className="group inline-flex items-center justify-center gap-2 bg-[#2dd4bf] text-[#003731] px-7 py-3.5 rounded-full font-bold uppercase tracking-tight text-sm hover:bg-[#57f1db] transition-all glow-teal w-full sm:w-auto"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solutions"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#2dd4bf]/60 text-[#2dd4bf] font-bold uppercase tracking-tight text-sm hover:bg-[#2dd4bf] hover:text-[#003731] transition-all w-full sm:w-auto"
            >
              Explore Solutions
            </a>
            <Link
              href="/demo"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 font-bold uppercase tracking-tight text-sm hover:bg-white/5 transition-all hover:border-[#2dd4bf]/60 w-full sm:w-auto"
            >
              Try the Console
              <Sparkles className="w-4 h-4 text-[#2dd4bf] group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          <p className="text-[10px] text-slate-400/70 tracking-[1.5px] mb-8 uppercase">
            Caribbean-first • Offline-capable • Deployed in real operations
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-sm">
              <div className="font-mono text-xl font-semibold text-white tabular-nums">40%</div>
              <div className="text-[10px] font-medium text-slate-400 leading-none uppercase tracking-widest">
                Efficiency
                <br />
                Gain
              </div>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-sm">
              <div className="font-mono text-xl font-semibold text-white tabular-nums decoration-[#2dd4bf]/60 underline">
                2.5k+
              </div>
              <div className="text-[10px] font-medium text-slate-400 leading-none uppercase tracking-widest">
                Workflows
                <br />
                Automated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}