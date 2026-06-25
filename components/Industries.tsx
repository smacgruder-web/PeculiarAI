'use client';

import { Home, GraduationCap, Building2, Palmtree, Store, Briefcase } from 'lucide-react';

const industries = [
  { name: 'Real estate', icon: Home, desc: 'Lead follow-up & listings' },
  { name: 'Education', icon: GraduationCap, desc: 'Admin & lesson prep' },
  { name: 'Government', icon: Building2, desc: 'Forms & citizen service' },
  { name: 'Tourism', icon: Palmtree, desc: 'Guest communication' },
  { name: 'Small business', icon: Store, desc: 'Day-to-day operations' },
  { name: 'Professionals', icon: Briefcase, desc: 'Solo & freelance workflows' },
];

export default function Industries() {
  return (
    <section id="industries" className="py-16 md:py-20 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#2dd4bf] mb-3">Who we work with</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Individuals &amp; teams across many fields
          </h2>
          <p className="mt-3 text-slate-400 text-base max-w-xl mx-auto">
            If you repeat the same tasks every week, there&apos;s usually a smart way to automate or assist with AI.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((industry) => (
            <div
              key={industry.name}
              className="p-5 border border-white/5 bg-white/[0.02] rounded-2xl text-center"
            >
              <industry.icon className="w-7 h-7 mx-auto mb-3 text-[#2dd4bf]/80" />
              <div className="text-sm font-semibold text-white mb-1">{industry.name}</div>
              <div className="text-xs text-slate-500 leading-snug">{industry.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}