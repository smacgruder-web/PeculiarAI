'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { CONTACT_EMAIL, PRIVACY_NOTICE } from '@/lib/constants';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleNewsletter = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || status === 'submitting') return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, website: honeypot }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      setNewsletterEmail('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Logo size="xl" />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Building AI that&apos;s different. Solutions that make a difference.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/peculiarai' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/peculiarai' },
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/peculiarai' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-[#2dd4bf]/50 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/#process" className="hover:text-[#2dd4bf] transition-colors">How it works</Link></li>
              <li><Link href="/#ai-tool" className="hover:text-[#2dd4bf] transition-colors">AI Strategy Snapshot</Link></li>
              <li><Link href="/#pricing" className="hover:text-[#2dd4bf] transition-colors">Pricing</Link></li>
              <li><Link href="/#faq" className="hover:text-[#2dd4bf] transition-colors">FAQ</Link></li>
              <li><Link href="/#proposal" className="hover:text-[#2dd4bf] transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-[#2dd4bf] transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Stay in the loop</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Occasional tips on using AI in your work — no spam.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2dd4bf]"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="shrink-0 bg-[#2dd4bf] text-[#003731] px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#57f1db] transition-colors disabled:opacity-60"
                >
                  {status === 'submitting' ? '...' : 'Join'}
                </button>
              </div>
              <p className="text-[11px] text-slate-600">{PRIVACY_NOTICE}</p>
              {status === 'success' && (
                <p className="text-xs text-[#2dd4bf]">Thanks — you&apos;re on the list.</p>
              )}
              {status === 'error' && (
                <p className="text-xs text-red-400">
                  Signup unavailable.{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                    Email us
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center md:text-left">
          <p className="text-xs text-slate-600">
            © 2026 Peculiar AI Labs · Kinetic Cybernetic ·{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-slate-400 transition-colors">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}