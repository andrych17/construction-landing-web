'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPhone, LuX, LuArrowUpRight } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { contact: SITE_CONTACT, waLink } = useSiteContent();

  const navLinks = [
    { href: '/', num: '01', label: 'HOME', desc: 'Studio & selected realizations' },
    { href: '/about', num: '02', label: 'ABOUT US', desc: 'Ethos, philosophies & founder' },
    { href: '/services', num: '03', label: 'SERVICES', desc: 'Signature services & 10-step methodology' },
    { href: '/projects', num: '04', label: 'PROJECTS', desc: 'Architectural portfolio' },
    { href: '/contact', num: '05', label: 'CONTACT', desc: 'Direct consultation' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kunci scroll body + Escape untuk menutup overlay (WCAG 2.1.2).
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-expo ${
          scrolled
            ? 'bg-[#030303]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-4'
            : 'bg-transparent border-b border-white/[0.04] py-6 sm:py-8'
        }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="flex items-center justify-between">
            {/* Left: Authentic Wonderful Works Construction Brand Lockup */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
              aria-label="Wonderful Works Construction Home"
            >
              <ModernWwLogo variant="mark" size="md" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                    Wonderful Works
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                </div>
                <span className="hidden sm:block font-mono text-[10px] tracking-[0.22em] text-neutral-200 uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  CONSTRUCTION · ARCHITECTURE & CONTRACTOR
                </span>
              </div>
            </Link>

            {/* Center/Right Desktop Navigation Links */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center gap-8 xl:gap-10 font-mono text-xs tracking-[0.25em] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-neutral-200 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-amber-400 transition-all duration-300 ease-expo ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Language Switcher, Sleek WhatsApp Dispatch & Minimalist Hamburger Button */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {/* Language Switcher ID / EN */}
              <div
                role="group"
                aria-label="Language selector"
                className="flex items-center border border-white/20 bg-black/40 px-2.5 py-1.5 font-mono text-xs tracking-wider"
              >
                <button
                  type="button"
                  onClick={() => setLang('id')}
                  className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                    lang === 'id' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  aria-pressed={lang === 'id'}
                  aria-label="Bahasa Indonesia"
                >
                  ID
                </button>
                <span className="text-white/20 select-none mx-0.5">/</span>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                    lang === 'en' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                  aria-pressed={lang === 'en'}
                  aria-label="English"
                >
                  EN
                </button>
              </div>

              {SITE_CONTACT.whatsapp && (
              <a
                href={waLink(t('Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.', 'Hello Wonderful Works Construction, I would like to inquire about an architectural project.'))}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-none border border-white/15 hover:border-amber-400/80 bg-white/5 hover:bg-amber-400 hover:text-black text-white font-mono text-xs tracking-wider transition-all duration-300 ease-expo min-h-[42px] active:scale-[0.98]"
              >
                <FaWhatsapp className="w-3.5 h-3.5 text-amber-400 hover:text-black" />
                <span className="whitespace-nowrap">{t('KONSULTASI', 'CONSULTATION')}</span>
              </a>
              )}

              {/* Minimalist Architectural Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="lg:hidden group flex items-center gap-3 px-4 py-2 rounded-none border border-white/15 hover:border-white bg-black/40 hover:bg-white/10 transition-all duration-300 ease-expo cursor-pointer min-h-[42px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Buka menu navigasi"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-neutral-200 group-hover:text-white uppercase">
                  MENU
                </span>
                <div className="flex flex-col gap-1.5 w-5 items-end">
                  <span className="w-5 h-[1.5px] bg-white transition-all duration-300 ease-expo group-hover:w-5" />
                  <span className="w-3.5 h-[1.5px] bg-amber-400 transition-all duration-300 ease-expo group-hover:w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#030303]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full max-w-frame mx-auto border-b border-white/10 pb-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <ModernWwLogo variant="mark" size="md" />
                <span className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  Wonderful Works
                </span>
              </Link>
              
              <div className="flex items-center gap-4">
                {/* Language Switcher in Mobile Drawer */}
                <div className="flex items-center border border-white/20 bg-white/5 px-2.5 py-1 font-mono text-xs tracking-wider">
                  <button
                    type="button"
                    onClick={() => setLang('id')}
                    className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                      lang === 'id' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    ID
                  </button>
                  <span className="text-white/20 select-none mx-0.5">/</span>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                      lang === 'en' ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-2.5 px-5 py-2.5 rounded-none border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 transition-colors font-mono text-xs tracking-widest cursor-pointer active:scale-[0.98]"
                  aria-label="Close Navigation Menu"
                >
                  <LuX className="w-4 h-4 transition-transform group-hover:rotate-90" />
                  <span>{t('TUTUP', 'CLOSE')}</span>
                </button>
              </div>
            </div>

            {/* Menu Links in Monumental Architectural Font */}
            <div className="w-full max-w-frame mx-auto my-auto py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-baseline gap-4 sm:gap-6 py-2 transition-transform duration-300 ease-expo hover:translate-x-4"
                        >
                          <span className="font-mono text-xs sm:text-sm text-amber-400 tracking-widest">
                            {link.num}
                          </span>
                          <span
                            className={`font-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight transition-colors ${
                              isActive
                                ? 'text-amber-400'
                                : 'text-white group-hover:text-amber-400'
                            }`}
                          >
                            {link.label}
                          </span>
                          <span className="hidden md:inline font-mono text-xs text-neutral-400 tracking-wider">
                            — {link.desc}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Info Column (Contact & Address) */}
                <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 space-y-8">
                  <div>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase block mb-2 font-bold">
                      HEADQUARTERS
                    </span>
                    <p className="font-display text-lg font-bold text-white mb-1 uppercase">{SITE_CONTACT.studio.name}</p>
                    <address className="text-xs text-neutral-400 leading-relaxed font-sans not-italic">
                      {SITE_CONTACT.studio.lines.join(', ')}
                    </address>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase block mb-2 font-bold">
                      DIRECT INQUIRIES
                    </span>
                    <a
                      href={waLink('Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-white hover:text-amber-400 font-mono text-xs transition-colors"
                    >
                      <LuPhone className="w-3.5 h-3.5 text-amber-400" />
                      <span>{SITE_CONTACT.whatsappLabel}</span>
                      <LuArrowUpRight className="w-3 h-3 text-neutral-400 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase block mb-2 font-bold">
                      OFFICIAL INSTAGRAM
                    </span>
                    <a
                      href={SITE_CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-white hover:text-amber-400 font-mono text-xs transition-colors"
                    >
                      <FaInstagram className="w-3.5 h-3.5 text-amber-400" />
                      <span>{SITE_CONTACT.instagramHandle}</span>
                      <LuArrowUpRight className="w-3 h-3 text-neutral-400 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Coordinates Footer */}
            <div className="w-full max-w-frame mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
              <span>© {new Date().getFullYear()} WONDERFUL WORKS CONSTRUCTION</span>
              <span className="text-neutral-400">SURABAYA · INDONESIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
