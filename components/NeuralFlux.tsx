'use client';

import { useState } from 'react';

const fluxSeeds = [
  'edge-inference-1',
  'training-data-2',
  'small-models-3',
  'tide-schedule-4',
  'offline-first-5',
  'human-operators-6',
  'latency-budget-7',
  'valuable-label-8',
];

const fluxText: Record<string, string> = {
  'edge-inference-1': 'Edge inference at 11ms on a moving vessel with a 4G fallback.',
  'training-data-2': 'What if your training data never leaves the island cluster?',
  'small-models-3': 'Small models, big decisions: 92% accuracy on 3k labeled samples.',
  'tide-schedule-4': 'The best feature was the tide schedule, not the sensor reading.',
  'offline-first-5': 'Offline-first means the model keeps working when the generator dies.',
  'human-operators-6':
    'Human operators named the anomalies before the model did — then the model learned their names.',
  'latency-budget-7': 'Latency budget: 180ms round-trip across two islands and one ferry.',
  'valuable-label-8':
    'The most valuable label came from a 14-year-old who noticed the pattern in the clouds.',
};

export default function NeuralFlux() {
  const [cardIds, setCardIds] = useState(fluxSeeds.slice(0, 6));
  const [resonated, setResonated] = useState<Set<string>>(new Set());

  const resonate = (id: string) => {
    setResonated((prev) => new Set(prev).add(id));
  };

  const addCard = () => {
    const available = fluxSeeds.filter((id) => !cardIds.includes(id));
    const pool = available.length > 0 ? available : fluxSeeds;
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCardIds((prev) => [...prev, `${next}-${Date.now()}`]);
  };

  return (
    <section id="flux" className="py-20 bg-[#0a0b0e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-[#ff7a5c]/70 mb-1">NEURAL FLUX</div>
            <h2 className="font-montserrat text-4xl font-medium tracking-tight">
              What the edge is teaching us.
            </h2>
          </div>
          <div className="text-xs text-[#a1a1aa] hidden md:block">Click a card to resonate</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardIds.map((id) => {
            const seedId = id.replace(/-\d+$/, '');
            const text = fluxText[seedId] || fluxText['edge-inference-1'];
            const hasResonated = resonated.has(id);

            return (
              <div
                key={id}
                onClick={() => resonate(id)}
                className="group bg-[#15181E] border border-white/5 rounded-2xl p-6 cursor-pointer active:scale-[0.985] transition-all hover:border-[#2dd4bf]/40"
              >
                <div className="text-[15px] leading-snug text-[#a1a1aa] group-hover:text-white transition-colors">
                  {text}
                  {hasResonated && <span className="text-[#2dd4bf]"> ✓</span>}
                </div>
                <div className="mt-5 text-[10px] tracking-[1.5px] text-[#2dd4bf]/70 group-hover:text-[#2dd4bf]">
                  {hasResonated ? 'RESONATED' : 'RESONATE'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={addCard}
            className="text-xs tracking-[2px] px-6 py-2.5 border border-white/20 hover:bg-white/5 rounded-full transition-colors"
          >
            + SURFACE ANOTHER PATTERN
          </button>
        </div>
      </div>
    </section>
  );
}