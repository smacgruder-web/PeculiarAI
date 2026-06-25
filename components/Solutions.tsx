'use client';

const solutions = [
  {
    title: 'AI Engineering',
    description:
      'Architecting robust AI pipelines and scalable infrastructure built for the future — edge, cloud, and hybrid.',
    chip: 'Engineering',
  },
  {
    title: 'Machine Learning',
    description:
      'Developing advanced predictive models and algorithms tailored to your unique, often messy, real-world data.',
    chip: 'Intelligence',
  },
  {
    title: 'Data Intelligence',
    description:
      'Transforming raw, complex data into clear, actionable insights for strategic decision-making under constraint.',
    chip: 'Insights',
  },
  {
    title: 'Custom Solutions',
    description:
      'Designing bespoke AI applications built specifically to solve your hardest, most peculiar challenges.',
    chip: 'Custom',
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-16 md:py-20 bg-[#11141A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#2dd4bf]/70 mb-2 block">
              CORE CAPABILITIES
            </span>
            <h2 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              Solutions that feel <span className="text-[#2dd4bf]">inevitable</span>.
            </h2>
          </div>
          <a
            href="#pricing"
            className="hidden md:inline text-sm text-[#a1a1aa] hover:text-[#2dd4bf] transition-colors"
          >
            Estimate your investment →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className={`kinetic-card rounded-2xl p-6 sm:p-7 hover:shadow-[0_0_22px_rgba(45,212,191,0.15)] ${
                index % 2 === 1 ? '!border-t-[#ff7a5c]' : ''
              }`}
            >
              <div className="text-[10px] font-medium tracking-[1.5px] uppercase text-[#2dd4bf] mb-4">
                {solution.chip}
              </div>
              <h3 className="font-medium text-xl mb-3 text-white">{solution.title}</h3>
              <p className="text-[#a1a1aa] text-[15px] leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}