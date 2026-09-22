'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPhone, LuMenu, LuX, LuArrowUpRight } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

const NAV_LINKS = [
  { href: '/', num: '01', label: 'Home', desc: 'Studio Showcase & Rotating Disciplines' },
  { href: '/about', num: '02', label: 'About Us', desc: 'Single Founder, Ethos & Philosophies' },
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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030303]/95 backdrop-blur-md border-b border-white/[0.1] shadow-2xl'
            : 'bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <div className="flex items-center justify-between h-[72px]">
            {/* Architectural Brand Identity Lockup — WW.CONS */}
            <Link
              href="/"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
              aria-label="ww.cons Home"
            >
              <ModernWwLogo variant="full" size="md" />
            </Link>

            {/* Desktop Navigation Links — Multi-Page Active Routing */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center gap-9 text-xs font-mono tracking-[0.2em] uppercase"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors ${
                      isActive ? 'text-amber-400 font-bold' : 'text-neutral-300 hover:text-white'
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

            {/* Actions & Menu Trigger */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-5 py-2.5 rounded-full border border-white/20 hover:border-amber-400/80 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-colors min-h-[44px] items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuPhone className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">+62 822 9819 9902</span>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-amber-400 transition-colors font-mono text-xs font-bold tracking-widest min-h-[44px] cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Open Navigation Menu"
              >
                <LuMenu className="w-4 h-4" />
                <span className="whitespace-nowrap">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#030303]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto border-b border-white/10 pb-6">
              <ModernWwLogo variant="full" size="md" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors font-mono text-xs tracking-widest cursor-pointer active:scale-[0.98]"
                aria-label="Close Navigation Menu"
              >
                <LuX className="w-4 h-4" />
                <span>CLOSE</span>
              </button>
            </div>

            {/* Menu Links in Monumental Baskervville Serif */}
            <div className="w-full max-w-[1600px] mx-auto my-auto py-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-8 space-y-4 sm:space-y-6">
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="group flex items-baseline gap-4 sm:gap-6 py-2 transition-transform duration-300 hover:translate-x-3"
                        >
                          <span className="font-mono text-xs text-amber-400 tracking-widest">
                            {link.num}
                          </span>
                          <span
                            className={`font-serif text-3xl sm:text-5xl md:text-6xl font-normal transition-colors ${
                              isActive
                                ? 'text-amber-400'
                                : 'text-white group-hover:text-amber-400'
                            }`}
                          >
                            {link.label}
                          </span>
                          <span className="hidden sm:inline font-mono text-xs text-neutral-500 tracking-wider">
                            — {link.desc}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Info Column */}
                <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10 space-y-8">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                      HEADQUARTERS
                    </span>
                    <p className="font-serif text-lg text-white mb-1">Voza Premium Tower Lt. 20</p>
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
                      STUDIO ARCHIVE
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

            {/* Bottom Footer */}
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
