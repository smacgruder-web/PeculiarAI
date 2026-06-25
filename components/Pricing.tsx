'use client';

import { Info } from 'lucide-react';

const packages = [
  {
    name: 'Starter',
    price: '$1,500 – $3,500',
    desc: 'Perfect for small businesses beginning with AI.',
    features: [
      'Full AI Readiness Audit',
      'Workflow Recommendations',
      'Basic Customer Chatbot',
      'Core Email Automation',
      'Initial CRM Setup',
    ],
    cta: 'Start Transformation',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$5,000 – $15,000',
    desc: 'Business automation and customer acquisition systems.',
    features: [
      'Everything in Starter',
      'AI Lead Generation Systems',
      'Sales Pipeline Automation',
      'Content Workflow Automation',
      'Executive Dashboard Reporting',
      'Full Staff AI Training',
    ],
    cta: 'Accelerate Growth',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$20,000+',
    desc: 'Large-scale AI transformation projects.',
    features: [
      'Custom AI Development',
      'Multi-department Automation',
      'AI Implementation Strategy',
      'Data Systems Integration',
      'Long-term Consulting Retainer',
      '24/7 Priority Support',
    ],
    cta: 'Contact for Enterprise',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-slate-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#2dd4bf] mb-4 block">
            Pricing &amp; Packages
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-medium text-white tracking-tight">
            Investment in <span className="italic text-[#2dd4bf]">scalability</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto">
            Start small or go all-in — every package includes setup help and 30 days of post-launch support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`relative p-6 sm:p-10 rounded-[2rem] flex flex-col h-full border transition-all ${
                pkg.highlight
                  ? 'bg-[#2dd4bf]/10 border-[#2dd4bf] shadow-[0_0_40px_rgba(45,212,191,0.15)]'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/20'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-5 right-5 bg-[#2dd4bf] text-[#003731] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                  Popular
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                      pkg.highlight ? 'bg-[#2dd4bf] text-[#003731]' : 'bg-white/10 text-slate-500'
                    }`}
                  >
                    0{index + 1}
                  </div>
                  <h3
                    className={`text-sm font-space font-bold uppercase tracking-[0.3em] ${
                      pkg.highlight ? 'text-[#2dd4bf]' : 'text-slate-500'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-space font-medium text-white mb-3">
                  {pkg.price}
                </div>
                <p className={`text-sm ${pkg.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{pkg.desc}</p>
              </div>

              <div className={`h-px w-full mb-8 ${pkg.highlight ? 'bg-[#2dd4bf]/20' : 'bg-white/5'}`} />

              <ul className="space-y-3 mb-10 flex-grow text-sm text-slate-400">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3 items-start">
                    <span className={`shrink-0 ${pkg.highlight ? 'text-[#2dd4bf]' : 'text-slate-600'}`}>+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://calendly.com/peculiarai"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all ${
                  pkg.highlight
                    ? 'bg-[#2dd4bf] text-[#003731] hover:bg-[#57f1db]'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-start sm:items-center justify-center gap-3 text-slate-400 text-sm text-center px-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>All packages include a 30-day post-implementation support period.</span>
        </div>
      </div>
    </section>
  );
}