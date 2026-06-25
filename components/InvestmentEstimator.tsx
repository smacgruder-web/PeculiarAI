'use client';

import { useState } from 'react';

export default function InvestmentEstimator() {
  const [teamSize, setTeamSize] = useState(6);
  const [dataVolume, setDataVolume] = useState(12000);
  const [complexity, setComplexity] = useState(3);

  const months = Math.max(2.2, Math.min(11, 
    2.8 + (teamSize - 4) * 0.11 + Math.log10(Math.max(dataVolume, 1000) / 8000) * 1.15 + (complexity - 3) * 0.65
  ));
  const roundedMonths = Math.round(months * 10) / 10;

  const costLow = Math.round(roundedMonths * 14.2 + (teamSize * 1.8) + (complexity * 4));
  const costHigh = Math.round(costLow * 1.38);

  const edgeCoverage = Math.max(48, Math.min(96, Math.round(82 - (complexity * 4.5) + (teamSize > 12 ? 6 : 0))));

  const complexityLabel = ['Very Low', 'Low', 'Medium', 'High', 'Extreme'][complexity - 1];

  const copyEstimate = () => {
    const text = `Peculiar AI Labs Estimate\nMonths: ${roundedMonths}\nInvestment: $${costLow}k — $${costHigh}k\nEdge coverage: ${edgeCoverage}%\n\n(Generated from Kinetic Cybernetic Estimator)`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('copy-estimate-btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'COPIED!';
        setTimeout(() => {
          if (btn) btn.textContent = original;
        }, 1800);
      }
      document.getElementById('proposal')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <section id="estimator" className="py-20 bg-[#0a0b0e] text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="uppercase tracking-[3px] text-xs text-[#ff7a5c]/70 mb-2">INTERACTIVE</div>
        <h2 className="font-montserrat text-4xl md:text-5xl font-medium tracking-tight mb-3">Investment Estimator</h2>
        <p className="text-[#a1a1aa] max-w-md mb-10">
          Realistic ranges for teams operating with constraints. Move the sliders to see how scope, data reality, and environment affect timeline and investment.
        </p>

        <div className="bg-[#15181E] rounded-3xl p-8 md:p-10 border border-white/5">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Controls */}
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Team size (core operators)</div>
                  <div className="font-mono text-[#2dd4bf]">{teamSize}</div>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="25" 
                  step="1" 
                  value={teamSize} 
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full accent-[#2dd4bf]" 
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Data volume (records / month)</div>
                  <div className="font-mono text-[#2dd4bf]">{dataVolume >= 10000 ? Math.round(dataVolume / 1000) + 'k' : dataVolume}</div>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="250000" 
                  step="1000" 
                  value={dataVolume} 
                  onChange={(e) => setDataVolume(parseInt(e.target.value))}
                  className="w-full accent-[#ff7a5c]" 
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Environmental complexity</div>
                  <div className="font-mono text-[#2dd4bf]">{complexityLabel}</div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  step="1" 
                  value={complexity} 
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full accent-[#2dd4bf]" 
                />
                <div className="flex justify-between text-[10px] text-[#a1a1aa] mt-1.5">
                  <div>Stable / connected</div>
                  <div>Remote / variable</div>
                </div>
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-[#0d0e11] rounded-2xl p-8 flex flex-col">
              <div className="text-xs uppercase tracking-[2px] text-[#a1a1aa] mb-5">PROJECTED RANGE</div>

              <div className="flex-1 space-y-6">
                <div>
                  <div className="text-6xl font-medium tabular-nums tracking-tighter">
                    {roundedMonths} <span className="text-3xl font-normal text-[#a1a1aa]">months</span>
                  </div>
                  <div className="text-[#a1a1aa] mt-1">Typical delivery window</div>
                </div>

                <div className="h-px bg-white/10 my-2" />

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-[#a1a1aa]">Estimated investment</div>
                    <div className="text-4xl font-medium mt-2 tracking-tight">
                      ${costLow}k <span className="text-xl font-normal text-[#a1a1aa]">— ${costHigh}k</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#a1a1aa]">Edge / offline coverage</div>
                    <div className="text-4xl font-medium mt-2 tracking-tight">{edgeCoverage}%</div>
                  </div>
                </div>
              </div>

              <button 
                id="copy-estimate-btn"
                onClick={copyEstimate}
                className="mt-8 self-start text-xs tracking-[2px] px-6 py-2.5 border border-white/20 hover:bg-white/5 rounded-full transition-colors"
              >
                COPY ESTIMATE TO PROPOSAL
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#a1a1aa] mt-5">
          These are directional ranges based on 40+ real deployments. Final scope defined in the proposal phase.
        </p>
      </div>
    </section>
  );
}
