'use client';

import { motion } from 'motion/react';

const steps = [
  { num: '01', label: 'DISCOVER', title: 'Practical AI, Not Hype', desc: 'We focus on real operational problems with measurable ROI, not buzzwords. Deep listening in context.' },
  { num: '02', label: 'GROUND', title: 'Caribbean-First Innovation', desc: 'Built with emerging markets in mind — scalable, offline-capable, culturally aware, low-bandwidth resilient.' },
  { num: '03', label: 'PARTNER', title: 'End-to-End Partnership', desc: 'From strategy and team training to custom development, deployment, and ongoing support.' },
  { num: '04', label: 'AUGMENT', title: 'Human + Machine', desc: 'AI that augments your team, with transparent processes and no black boxes. You stay in control.' },
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="py-20 bg-[#0a0b0e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="uppercase tracking-[3px] text-xs text-[#ff7a5c]/70 mb-2">HOW WE WORK</div>
        <h2 className="font-montserrat text-4xl md:text-5xl font-medium tracking-tight mb-12">
          A process built for <span className="text-[#ff7a5c] italic">emerging realities</span>.
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-[#15181E] p-7 rounded-2xl border-l-4 border-[#2dd4bf] hover:border-[#ff7a5c] transition-colors"
            >
              <div className="text-xs font-mono tracking-[2px] text-[#2dd4bf] mb-2">{step.num} — {step.label}</div>
              <h3 className="font-medium text-lg mb-3">{step.title}</h3>
              <p className="text-[#a1a1aa] text-[15px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
