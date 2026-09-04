'use client';

import { useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import type { Host } from '@/components/HostAvatars';

interface Insight {
  type: 'video' | 'audio';
  title: string;
  src: string;
  description: string;
  label: string;
  poster?: string;
  hosts?: Host[];
}

const LIPSYNC_MARCUS = '/media/host-marcus-lipsync.mp4';
const LIPSYNC_SIENNA = '/media/host-sienna-lipsync.mp4';

const insights: Insight[] = [
  {
    type: 'video',
    title: 'From Glitches to Grounded',
    src: '/media/AI__Glitches_to_Grounded.mp4',
    description: 'Real talk on moving from flashy failures to AI that actually holds up in the field.',
    label: 'VISUAL',
  },
  {
    type: 'audio',
    title: 'Strict Constraints or Bust',
    src: '/media/Preventing_AI_disasters_with_strict_constraints.m4a',
    description: 'Why loose rules get you wrecked — and how real guardrails create the only freedom that matters.',
    label: 'PODCAST',
    poster: '/media/podcast-duo-poster.jpg',
    hosts: [
      {
        id: 'marcus',
        name: 'Marcus',
        image: '/media/host-marcus.jpg',
        video: LIPSYNC_MARCUS,
      },
      {
        id: 'sienna',
        name: 'Sienna',
        image: '/media/host-sienna.jpg',
        video: LIPSYNC_SIENNA,
      },
    ],
  },
];

function getTodayInsight(): Insight {
  const day = new Date().getDate();
  return insights[day % insights.length];
}

export default function DailyGrounding() {
  const [insight] = useState<Insight>(getTodayInsight);

  const isPodcast = Boolean(insight.hosts?.length);

  return (
    <section id="peculiar-or-not" className="py-20 md:py-24 bg-[#0a0b0e] border-y border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="font-space text-[10px] text-[#2dd4bf] tracking-[3px] uppercase mb-1">
              Stories of Peculiar but True
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              Peculiar or Not
            </h2>
          </div>
          <div className="hidden md:block text-right text-xs text-slate-500">
            Rotates daily.<br />Straight from the edge.
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="group relative bg-[#11141A] border border-white/10 rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="inline-flex items-center gap-2">
                <div className="text-[10px] font-bold tracking-[2px] text-[#2dd4bf] border border-[#2dd4bf]/40 px-3 py-1 rounded-full">
                  {insight.label}
                </div>
                <div className="text-xs text-slate-500">TODAY</div>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2dd4bf] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2dd4bf]" />
                </span>
                {isPodcast ? 'Avatar player' : 'Live player'}
              </div>
            </div>

            <div className="px-6 pb-6">
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
                {insight.title}
              </h3>
              <p className="text-sm text-slate-400 max-w-[42ch] leading-snug">
                {insight.description}
              </p>
            </div>

            <div className="relative border-t border-white/10 bg-[#0d0f14]">
              <MediaPlayer
                key={`${insight.type}-${insight.src}`}
                type={insight.type}
                src={insight.src}
                title={insight.title}
                poster={insight.poster}
                hosts={insight.hosts}
              />
            </div>

            <div className="px-6 py-4 bg-white/[0.015] border-t border-white/5 text-[10px] text-slate-500 tracking-[1px] flex items-center justify-between text-center sm:text-left">
              <div>NO HYPE. REAL DEPLOYMENTS.</div>
              <div className="hidden sm:block text-[#2dd4bf]/60">PECULIAR AI LABS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}