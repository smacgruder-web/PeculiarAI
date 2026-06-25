'use client';

import { MessageCircle, Lightbulb, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Tell us what slows you down',
    desc: 'Share your workflow, team size, and what you wish happened automatically. No tech jargon required.',
  },
  {
    icon: Lightbulb,
    title: 'Get a clear AI plan',
    desc: 'We map quick wins, tools that fit your budget, and a realistic path to bring AI into daily work.',
  },
  {
    icon: Rocket,
    title: 'We build and train your team',
    desc: 'From setup to handoff, we implement solutions your people can actually use — and support you after launch.',
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-16 md:py-20 bg-[#0a0b0e] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[3px] text-[#ff7a5c]/70 mb-2 block">
            How we work
          </span>
          <h2 className="font-montserrat text-3xl sm:text-4xl font-medium tracking-tight text-white">
            A process built for <span className="text-[#ff7a5c] italic">emerging realities</span>.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-[#15181E] rounded-2xl p-6 border-l-4 border-[#2dd4bf] hover:border-[#ff7a5c] transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#2dd4bf]/10 flex items-center justify-center text-[#2dd4bf] mb-4">
                <step.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#2dd4bf] mb-2">Step {i + 1}</p>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}