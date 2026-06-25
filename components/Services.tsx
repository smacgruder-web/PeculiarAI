'use client';

import { motion } from 'motion/react';
import { 
  Zap, 
  Target, 
  BarChart3, 
  Users, 
  Code2, 
  Workflow, 
  LayoutDashboard, 
  BrainCircuit 
} from 'lucide-react';

const services = [
  {
    category: 'AI Consulting',
    description: 'Strategic guidance for businesses adopting AI technologies.',
    icon: Target,
    items: ['AI readiness assessments', 'Implementation roadmaps', 'Workflow analysis', 'Digital transformation strategy'],
    color: 'bg-blue-50 text-blue-600'
  },
  {
    category: 'Automation Services',
    description: 'Building systems that reduce repetitive manual work.',
    icon: Zap,
    items: ['CRM automation', 'Email & Lead nurturing', 'AI customer support/chatbots', 'Internal workflow automation'],
    color: 'bg-cyan-50 text-cyan-600'
  },
  {
    category: 'AI Marketing Systems',
    description: 'Helping businesses market smarter using AI.',
    icon: BarChart3,
    items: ['AI-generated content systems', 'Social media automation', 'SEO content workflows', 'AI-powered lead generation'],
    color: 'bg-purple-50 text-purple-600'
  },
  {
    category: 'AI Training & Workshops',
    description: 'Teaching organizations how to effectively use AI.',
    icon: Users,
    items: ['Corporate AI training', 'School/university workshops', 'Government AI awareness', 'Staff productivity training'],
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    category: 'Custom AI Development',
    description: 'Tailored systems for specialized business needs.',
    icon: Code2,
    items: ['AI dashboards', 'Business intelligence systems', 'Predictive analytics', 'Industry-specific AI tools'],
    color: 'bg-orange-50 text-orange-600'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-900 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4 block">What We Do</span>
            <h2 className="text-4xl md:text-6xl font-space font-medium leading-tight tracking-tighter text-white">
              Practical solutions for the <span className="italic text-cyan-400">future-facing</span> enterprise.
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm mb-2 uppercase text-[10px] font-bold tracking-widest leading-relaxed text-left md:text-right">
            Our divisions focus on every aspect of your technological evolution, 
            from strategy to custom implementation.
          </p>
        </div>

        <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-min">
          {services.map((service, index) => {
            const spans = [
              'md:col-span-3 lg:col-span-4 row-span-2',
              'md:col-span-3 lg:col-span-4 row-span-1',
              'md:col-span-3 lg:col-span-4 row-span-1',
              'md:col-span-3 lg:col-span-5 row-span-1',
              'md:col-span-6 lg:col-span-7 row-span-1',
            ];
            const spanClass = spans[index] || 'md:col-span-3 lg:col-span-4';

            return (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`${spanClass} bg-white/5 group p-8 rounded-[2rem] border border-white/5 hover:border-cyan-500/50 hover:bg-white/[0.07] transition-all duration-500 flex flex-col glow-cyan relative overflow-hidden`}
              >
                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-cyan-500/10 transition-colors" />

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${service.color.replace('-50', '-500/10').replace('-600', '-500')}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                
                <div>
                  <h4 className="text-xl font-space font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                    {service.category}
                  </h4>
                  
                  <p className="text-slate-400 mb-6 text-xs leading-relaxed max-w-[280px]">
                    {service.description}
                  </p>
                </div>

                <ul className="mt-auto space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-slate-300 transition-colors">
                      <div className="w-1 h-1 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

          {/* Special CTA Card */}
          <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             viewport={{ once: true }}
             className="md:col-span-6 lg:col-span-12 bg-cyan-600/90 backdrop-blur-md p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-cyan-600 transition-colors"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="text-3xl font-space font-bold mb-2 text-white">
                  Need a custom AI roadmap?
                </h4>
                <p className="text-white/80 text-sm font-medium max-w-md">
                  We specialize in building unique AI systems that solve the &quot;peculiar&quot; 
                  operational problems standard software can&apos;t fix.
                </p>
              </div>
            </div>
            <a 
              href="https://calendly.com/peculiarai" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-cyan-600 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-xl hover:shadow-cyan-500/20 whitespace-nowrap"
            >
              Consult an Expert
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
