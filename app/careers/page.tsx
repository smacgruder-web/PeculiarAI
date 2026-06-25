'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Code2, Database } from 'lucide-react';
import { CONTACT_EMAIL, PRIVACY_NOTICE } from '@/lib/constants';
import { FormEvent, useState } from 'react';

export default function CareersPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleApplication = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          position: formData.get('position'),
          why: formData.get('why'),
          website: formData.get('website'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      form.reset();
      setStatus('success');
      setStatusMessage('Application received. We will reply within 5 business days.');
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please email us directly.'
      );
    }
  };

  return <CareersContent status={status} statusMessage={statusMessage} onSubmit={handleApplication} />;
}

function CareersContent({
  status,
  statusMessage,
  onSubmit,
}: {
  status: 'idle' | 'submitting' | 'success' | 'error';
  statusMessage: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const jobs = [
  {
    id: 'frontend',
    title: 'Front End Developer',
    icon: Code2,
    location: 'Remote / Global',
    type: 'Full-time',
    description: 'We are looking for a creative and highly skilled Front End Developer to help us build the next generation of AI-driven interfaces. You will work on creating seamless, high-performance dashboards and client-facing applications that make complex AI logic intuitive and beautiful.',
    requirements: [
      'Expert level proficiency in React and Next.js (App Router)',
      'Mastery of Tailwind CSS and modern styling patterns',
      'Experience with motion libraries (motion/react or Framer Motion)',
      'Deep understanding of state management and API integration',
      'Passionate about building "delightful" user experiences'
    ],
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    id: 'backend',
    title: 'Back End Developer',
    icon: Database,
    location: 'Remote / Global',
    type: 'Full-time',
    description: 'As a Back End Developer at Peculiar AI, you will be responsible for the engine behind our intelligence. You will design and implement scalable API architectures, manage complex data flows, and ensure our AI integrations are robust, secure, and lightning-fast.',
    requirements: [
      'Expert knowledge of Node.js and TypeScript',
      'Experience with AI SDKs and LLM orchestration',
      'Strong background in database design (SQL, NoSQL, and Vector DBs)',
      'Understanding of cloud infrastructure (GCP preferred)',
      'Experience building real-time systems and WebSockets'
    ],
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  }
];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl opacity-50 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">Careers</h2>
            <h1 className="text-5xl md:text-7xl font-space font-extrabold leading-tight tracking-tight mb-6 text-cyan-400">
              Build the future of <span className="italic text-cyan-400">Intelligence.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Join a team of visionaries dedicated to making AI practical, 
              scalable, and human-centered. We&apos;re looking for peculiar minds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 md:p-12 rounded-[2rem] border ${job.color} backdrop-blur-sm relative group hover:border-white/20 transition-all`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl ${job.color} border flex items-center justify-center`}>
                      <job.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-space font-bold text-white">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-400">
                          <Clock className="w-3.5 h-3.5" /> {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <a 
                    href="#apply" 
                    className="flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-cyan-400 hover:text-white transition-all group-hover:scale-105"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  {job.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Requirements</h4>
                    <ul className="space-y-3">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture/Value Section */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-space font-bold mb-12">Why join Peculiar AI?</h2>
            <div className="grid md:grid-cols-3 gap-12">
                {[
                    { title: 'Innovation First', desc: 'Work on the cutting edge of AI automation and strategy.' },
                    { title: 'Global Freedom', desc: 'Fully remote team with asynchronous workflows for maximum flexibility.' },
                    { title: 'Peculiar Culture', desc: 'We value deep work, curiosity, and high levels of individual ownership.' }
                ].map((item, i) => (
                    <div key={i} className="space-y-4">
                        <div className="text-cyan-400 text-xl font-space font-bold uppercase tracking-widest leading-none">0{i+1}</div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-24 border-t border-white/5 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4 block">Join the Team</span>
            <h2 className="text-4xl md:text-5xl font-space font-medium tracking-tighter text-white mb-4">
              Ready to build something <span className="italic text-cyan-400">peculiar</span>?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Send us your information and a note about why you're interested in working on the frontier of practical AI.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-1 rounded-3xl">
            <div className="bg-slate-900/70 p-10 md:p-12 rounded-[2rem]">
              <form className="space-y-6" onSubmit={onSubmit}>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1 mb-1.5 block">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-sm placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition-colors" 
                      placeholder="Alex Rivera" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1 mb-1.5 block">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-sm placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition-colors" 
                      placeholder="you@domain.com" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1 mb-1.5 block">Position You're Applying For</label>
                  <select name="position" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors">
                    <option>Front End Developer</option>
                    <option>Back End Developer</option>
                    <option>Other / Open to Discussion</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1 mb-1.5 block">Why Peculiar AI? (Tell us about a problem you've solved that felt "peculiar")</label>
                  <textarea 
                    rows={5} 
                    name="why"
                    required 
                    className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-sm placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition-colors resize-y" 
                    placeholder="I once built..." 
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-4 bg-white text-slate-950 hover:bg-cyan-400 hover:text-white transition-all py-5 rounded-2xl font-bold uppercase tracking-[0.15em] text-sm disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>

                <p className="text-center text-[10px] text-slate-500 pt-2">{PRIVACY_NOTICE}</p>
                {status === 'success' && (
                  <p className="text-center text-xs text-cyan-400">{statusMessage}</p>
                )}
                {status === 'error' && (
                  <p className="text-center text-xs text-red-400">
                    {statusMessage}{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      Email us directly
                    </a>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
