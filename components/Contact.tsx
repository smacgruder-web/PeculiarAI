'use client';

import { Mail, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_EMAIL, PRIVACY_NOTICE } from '@/lib/constants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Not sure yet — help me figure it out',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Please tell us a bit about your work';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setStatusMessage('Thanks — we received your message and will reply within 48 hours.');
      setFormData({
        name: '',
        email: '',
        company: '',
        interest: 'Not sure yet — help me figure it out',
        message: '',
        website: '',
      });
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please email us directly.'
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="proposal" className="py-16 md:py-20 bg-[#11141A] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#2dd4bf] mb-4 block">
              Initiation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-space font-medium text-white mb-4 tracking-tight leading-tight">
              Ready to make a <span className="text-[#ff7a5c]">difference?</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Tell us what you do and what feels repetitive or slow. We&apos;ll reply within 48 hours
              with honest advice — even if AI isn&apos;t the right fit yet.
            </p>

            <div className="space-y-5">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Email</div>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm font-medium text-white hover:text-[#2dd4bf]">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#2dd4bf]" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-0.5">Phone</div>
                  <a href="tel:+12405939636" className="text-sm font-medium text-white hover:text-[#2dd4bf]">
                    +1 (240) 593-9636
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Rivera"
                    className={`w-full bg-slate-950 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf]`}
                  />
                  {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={`w-full bg-slate-950 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf]`}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="company" className="text-sm font-medium text-slate-300">
                  Company <span className="text-slate-500 font-normal">(optional)</span>
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your business or team name"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="interest" className="text-sm font-medium text-slate-300">
                  I&apos;m interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-[#2dd4bf]"
                >
                  <option>Not sure yet — help me figure it out</option>
                  <option>Automating daily tasks</option>
                  <option>Customer follow-up &amp; sales</option>
                  <option>Marketing &amp; content help</option>
                  <option>Team AI training</option>
                  <option>Custom tool or dashboard</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">
                  What would make your work easier?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. I spend hours replying to the same customer questions..."
                  className={`w-full bg-slate-950 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-base text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf] resize-y min-h-[120px]`}
                />
                {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-[#ff7a5c] text-white py-3.5 rounded-xl font-semibold hover:bg-[#ff9a82] transition-colors flex items-center justify-center gap-2 text-base disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sending...' : 'Send message'}
                <Send className="w-4 h-4" />
              </button>

              <p className="text-center text-xs text-slate-500">{PRIVACY_NOTICE}</p>

              {status === 'success' && (
                <p className="text-center text-xs text-[#2dd4bf]">{statusMessage}</p>
              )}
              {status === 'error' && (
                <p className="text-center text-xs text-red-400">
                  {statusMessage}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-red-300">
                    Email us directly
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}