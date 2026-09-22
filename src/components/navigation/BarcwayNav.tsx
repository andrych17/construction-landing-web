'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPhone, LuX, LuArrowUpRight, LuMapPin } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

const NAV_LINKS = [
  { href: '/', num: '01', label: 'Home', desc: 'Studio Showcase & Rotating Disciplines' },
  { href: '/about', num: '02', label: 'About Us', desc: 'Studio Ethos, Philosophies & Single Founder' },
  { href: '/services', num: '03', label: 'Services', desc: 'Centra Arya Loka 10-Step Precision' },
  { href: '/projects', num: '04', label: 'Projects', desc: 'Curated Architectural Portfolio' },
  { href: '/contact', num: '05', label: 'Contact Us', desc: 'Direct Consultation Desk' },
];

export default function BarcwayNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#030303]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-4'
            : 'bg-transparent border-b border-white/[0.04] py-6 sm:py-8'
        }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1800px] mx-auto">
          <div className="flex items-center justify-between">
            {/* Left: Authentic @ww.cons Brand Lockup */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
              aria-label="ww.cons Home"
            >
              <ModernWwLogo variant="mark" size="md" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl sm:text-2xl font-normal text-white lowercase tracking-tight group-hover:text-amber-400 transition-colors">
                    ww.cons
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                </div>
                <span className="hidden sm:block font-mono text-[8.5px] tracking-[0.28em] text-neutral-400 uppercase">
                  ARCHITECTURE · GENERAL CONTRACTOR
                </span>
              </div>
            </Link>

            {/* Center/Right Desktop Navigation Links (Barcway Exact Minimalist Layout) */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center gap-8 xl:gap-10 font-mono text-xs tracking-[0.25em] uppercase"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors ${
                      isActive ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-amber-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right: Sleek WhatsApp Dispatch & Minimalist Hamburger Button */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-amber-400/80 bg-white/5 hover:bg-amber-400 hover:text-black text-white font-mono text-xs tracking-wider transition-all duration-300 min-h-[42px] active:scale-[0.98]"
              >
                <FaWhatsapp className="w-3.5 h-3.5 text-amber-400 hover:text-black" />
                <span className="whitespace-nowrap">CONSULTATION</span>
              </a>

              {/* Minimalist Architectural Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 hover:border-white bg-black/40 hover:bg-white/10 transition-all duration-300 cursor-pointer min-h-[42px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Open Navigation Menu"
              >
                <span className="font-mono text-xs font-semibold tracking-[0.25em] text-neutral-200 group-hover:text-white uppercase">
                  MENU
                </span>
                <div className="flex flex-col gap-1.5 w-5 items-end">
                  <span className="w-5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-5" />
                  <span className="w-3.5 h-[1.5px] bg-amber-400 transition-all duration-300 group-hover:w-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Overlay Menu (Exact Barcway Aesthetic) */}
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
            <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto border-b border-white/10 pb-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                <ModernWwLogo variant="mark" size="md" />
                <span className="font-serif text-2xl font-normal text-white lowercase">ww.cons</span>
              </Link>
              
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/20 hover:border-amber-400 text-white hover:text-amber-400 transition-colors font-mono text-xs tracking-widest cursor-pointer active:scale-[0.98]"
                aria-label="Close Navigation Menu"
              >
                <LuX className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Menu Links in Monumental Baskervville Serif */}
            <div className="w-full max-w-[1600px] mx-auto my-auto py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                  {NAV_LINKS.map((link, idx) => {
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
                          className="group flex items-baseline gap-4 sm:gap-6 py-2 transition-transform duration-300 hover:translate-x-4"
                        >
                          <span className="font-mono text-xs sm:text-sm text-amber-400 tracking-widest">
                            {link.num}
                          </span>
                          <span
                            className={`font-serif text-4xl sm:text-6xl md:text-7xl font-normal transition-colors ${
                              isActive
                                ? 'text-amber-400'
                                : 'text-white group-hover:text-amber-400'
                            }`}
                          >
                            {link.label}
                          </span>
                          <span className="hidden md:inline font-mono text-xs text-neutral-500 tracking-wider">
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
                    <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                      HEADQUARTERS
                    </span>
                    <p className="font-serif text-xl text-white mb-1">Voza Premium Tower Lt. 20</p>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      Jl. Mayjen HR. Muhammad No. 31, Surabaya, Jawa Timur 60226
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                      DIRECT INQUIRIES
                    </span>
                    <a
                      href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-amber-400 font-mono text-xs transition-colors"
                    >
                      <LuPhone className="w-3.5 h-3.5 text-amber-400" />
                      <span>+62 822 9819 9902</span>
                      <LuArrowUpRight className="w-3 h-3 text-neutral-500" />
                    </a>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                      OFFICIAL INSTAGRAM
                    </span>
                    <a
                      href="https://www.instagram.com/ww.cons/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white hover:text-amber-400 font-mono text-xs transition-colors"
                    >
                      <FaInstagram className="w-3.5 h-3.5 text-amber-400" />
                      <span>@ww.cons</span>
                      <LuArrowUpRight className="w-3 h-3 text-neutral-500" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Coordinates Footer */}
            <div className="w-full max-w-[1600px] mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
              <span>© {new Date().getFullYear()} WW.CONS · PT. CENTRA ARYA LOKA HERITAGE</span>
              <span className="text-neutral-400">SURABAYA · INDONESIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
