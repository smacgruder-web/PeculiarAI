'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'How does Peculiar AI help my business implement AI practically?',
    answer: 'We analyze your workflows and current tech stack to identify high-impact processes that can be automated or enhanced using AI. Instead of generic software, we build custom AI agents, integrations, and automation pipelines tailored exactly to your business rules and daily operations.'
  },
  {
    category: 'Security',
    question: 'How do you handle data privacy and model licensing?',
    answer: 'Your data privacy is our absolute priority. We use secure cloud environments and configure API connections that enforce strict zero-data-retention policies (where provider APIs do not use your proprietary business data for retraining models). We can also build offline/local or enterprise-grade cloud integrations depending on your compliance requirements.'
  },
  {
    category: 'Process',
    question: 'How long does a typical AI implementation take?',
    answer: 'A Starter phase (such as a full AI audit or a simple custom chatbot deployment) can be done in 2 to 4 weeks. Full-scale system transformations (Growth and Enterprise) typically range from 6 to 12 weeks, which includes extensive design, API development, rigorous testing, and staff training.'
  },
  {
    category: 'Pricing & ROI',
    question: 'What kind of return on investment (ROI) should we expect?',
    answer: 'Most organizations we work with see an immediate 40% to 70% reduction in time spent on manual administration, data entry, and client communication. Many automation pipelines pay for themselves within the first 60 days by allowing your team to scale without needing immediate additional headcount.'
  },
  {
    category: 'General',
    question: 'Do we need technical expertise or in-house developers?',
    answer: 'Not at all. We handle the entire end-to-end implementation, hosting, configuration, and monitoring of your AI systems. Once deployed, we provide detailed executive dashboards, simplified user interfaces, and hands-on staff training so anyone on your team can operate them easily.'
  },
  {
    category: 'Pricing & ROI',
    question: 'Are there ongoing fees, support SLA, or hidden licensing costs?',
    answer: 'Every package includes 30 days of complimentary post-launch support and optimization. For ongoing updates, security patches, and model maintenance, we offer flexible consulting retainer packages. We make sure all active third-party token or subscription fees (e.g., API usage) are direct and completely transparent.'
  }
];

const categories = ['All', 'General', 'Security', 'Process', 'Pricing & ROI'];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="py-16 md:py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10" id="faq-container">
        
        {/* Section Header */}
        <div className="text-center mb-12" id="faq-header">
          <p className="text-sm font-semibold text-[#2dd4bf] mb-3">Common questions</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
            FAQ
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Honest answers about getting started with AI — no jargon required.
          </p>
        </div>

        {/* Filter Controls (Search + Category Tabs) */}
        <div className="max-w-3xl mx-auto mb-12 space-y-6" id="faq-controls">
          {/* Search bar */}
          <div className="relative group" id="search-bar-wrapper">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            </div>
            <input
              id="faq-search-input"
              type="text"
              placeholder="Search across topics..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null); // Close open answers when query changes
              }}
              className="w-full bg-white/[0.02] border border-white/5 placeholder-slate-500 text-white rounded-2xl pl-12 pr-5 py-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500/30 transition-all duration-300"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2" id="faq-categories">
            {categories.map((category) => (
              <button
                key={category}
                id={`faq-cat-btn-${category.toLowerCase().replace(/[^a-z]/g, '')}`}
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    : 'bg-white/[0.01] border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ Area */}
        <div className="max-w-3xl mx-auto" id="faq-accordion-box">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4" id="faq-items-wrapper">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={faq.question}
                      id={`faq-item-${index}`}
                      className="border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors overflow-hidden"
                    >
                      <button
                        id={`faq-btn-${index}`}
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between text-left px-6 py-5 focus:outline-none"
                      >
                        <div className="flex items-center gap-4 pr-4">
                          <HelpCircle className="w-4 h-4 text-cyan-500/50 flex-shrink-0" id={`faq-icon-help-${index}`} />
                          <h3 className="text-sm md:text-base font-space font-semibold text-white leading-snug">
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="flex-shrink-0 p-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/10"
                          id={`faq-chevron-[${index}]`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            id={`faq-content-${index}`}
                          >
                            <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-400 leading-relaxed font-medium pl-[44px] border-t border-white/5 bg-white/[0.005]">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="text-center py-12 px-4 border border-white/5 rounded-2xl bg-white/[0.01]"
                id="faq-no-results"
              >
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">
                  No matching questions found for &quot;{searchQuery}&quot;.
                </p>
                <button
                  id="faq-reset-filters-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="mt-4 text-xs font-bold text-cyan-400 uppercase tracking-widest hover:underline"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div
          className="max-w-3xl mx-auto mt-12 p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6"
          id="faq-cta-banner"
        >
          <div className="flex gap-4 items-center text-center sm:text-left" id="faq-cta-text-wrapper">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0" id="faq-cta-icon-box">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-space font-bold tracking-tight text-white mb-1">
                Still have questions?
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                We are happy to jump on a quick call or chat through your unique workflow automation queries.
              </p>
            </div>
          </div>
          <a
            href="https://calendly.com/peculiarai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-cyan-500 transition-all active:scale-95 flex-shrink-0"
            id="faq-cta-button"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
