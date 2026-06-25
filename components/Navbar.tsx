'use client';

import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'How it works', href: '/#process' },
  { name: 'AI Snapshot', href: '/#ai-tool' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact', href: '/#proposal' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <nav
      id="main-nav"
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-white/5 safe-top"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
            <Logo size="md" className="max-w-[140px] sm:max-w-none" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-[#2dd4bf] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://calendly.com/peculiarai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2dd4bf] text-[#003731] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#57f1db] transition-colors"
            >
              Book a call
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 text-white hover:text-[#2dd4bf] transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-slate-900 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-white/80 hover:text-[#2dd4bf] py-3 border-b border-white/5 last:border-0 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://calendly.com/peculiarai"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full text-center bg-[#2dd4bf] text-[#003731] py-3.5 rounded-xl font-semibold"
              >
                Book a free call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}