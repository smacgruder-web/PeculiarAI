'use client';

const roadmap = [
  { phase: 'Q3 2026', title: 'Edge Inference Pack', desc: 'Offline-first models + lightweight runtime for boats, clinics, and remote sites.' },
  { phase: 'Q4 2026', title: 'Investment Estimator v2', desc: 'Live scenario modeling with Caribbean-specific cost and data constraints.' },
  { phase: 'Q1 2027', title: 'Neural Flux Public Feed', desc: 'Curated, community-augmented stream of peculiar AI patterns and wins.' },
  { phase: 'Q2 2027', title: 'Multi-Island Mesh', desc: 'Secure, low-bandwidth model and insight sharing across sites without central cloud dependency.' },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-[#11141A] border-y border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-[#2dd4bf]/70 mb-1">2026 — 2027</div>
            <h2 className="font-montserrat text-4xl font-medium tracking-tight">The Kinetic Cybernetic Roadmap</h2>
          </div>
          <p className="max-w-xs text-[#a1a1aa] text-sm">Phased releases focused on real operators in real environments.</p>
        </div>

        <div className="space-y-8">
          {roadmap.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-10 border-l-2 border-[#2dd4bf]/30 pl-6 md:pl-8 relative">
              <div className="md:w-48 shrink-0 text-[#2dd4bf] font-mono text-sm pt-1">{item.phase}</div>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-[#a1a1aa]">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
