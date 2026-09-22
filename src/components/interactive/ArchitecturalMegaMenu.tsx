'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuArrowUpRight, LuPhone, LuMapPin, LuShieldCheck } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

interface NavItem {
  label: string;
  href: string;
  sublabel: string;
  image: string;
}

const DISCIPLINES: NavItem[] = [
  {
    label: 'About Us & Studio Ethos',
    href: '/about',
    sublabel: 'Arsitektur, interior, dan kontraktor mewah Surabaya',
    image: '/images/projects/tropical_facade_hq.jpg',
  },
  {
    label: 'The Founders',
    href: '/about#founders',
    sublabel: 'Edward Matthew & Jefferson D. Halim (Principals)',
    image: '/images/founders/edward_matthew.jpg',
  },
  {
    label: 'Master Builders Services',
    href: '/services',
    sublabel: 'Residential & Commercial building standar Cal.idn',
    image: '/images/projects/luxury_residence_hq.jpg',
  },
  {
    label: 'Portfolio Projects',
    href: '/projects',
    sublabel: '10 Signature Commissions & blueprint inspection',
    image: '/images/projects/jotun_showroom_hq.jpg',
  },
];

const STANDARDS: NavItem[] = [
  {
    label: 'Our Design Philosophy',
    href: '/about#philosophy',
    sublabel: 'Inside Out, Balanced Contrast, Narrative Space',
    image: '/images/projects/interior_craftsmanship_hq.jpg',
  },
  {
    label: '8-Stage Methodology',
    href: '/services',
    sublabel: 'Drone survey, RAB proprietary AHS, zero defect SPK',
    image: '/images/projects/site_engineer_hq.jpg',
  },
  {
    label: 'Contact & Consultation',
    href: '/contact',
    sublabel: 'Voza Premium Office Lt. 20 & Workshop Semolowaru',
    image: '/images/projects/facade_architecture_hq.jpg',
  },
];

interface ArchitecturalMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArchitecturalMegaMenu({ isOpen, onClose }: ArchitecturalMegaMenuProps) {
  const [activePreview, setActivePreview] = useState<NavItem>(DISCIPLINES[0]);

  // Lock body scroll when open
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

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#07090E]/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
          aria-modal="true"
          role="dialog"
          aria-label="Architectural Navigation Directory"
        >
          {/* TOP BAR */}
          <div className="w-full border-b border-white/10 bg-[#07090E]/60 py-4 px-6 sm:px-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ModernWwLogo variant="mark" size="sm" />
              <span className="font-mono text-xs tracking-[0.2em] text-white uppercase font-bold">
                DIRECTORI ARSITEKTURAL & KONSTRUKSI
              </span>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono text-xs tracking-wider transition-all duration-300 cursor-pointer min-h-[44px]"
              aria-label="Tutup menu navigasi"
            >
              <span>TUTUP</span>
              <LuX className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300 text-amber-400" />
            </button>
          </div>

          {/* MAIN TWO-COLUMN VIEWPORT */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 py-8 lg:py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start my-auto">
            {/* LEFT COLUMN: Dynamic Architectural Live Hover Preview */}
            <div className="hidden lg:block lg:col-span-5 sticky top-8">
              <div className="p-2 rounded-2xl bg-white/[0.02] border border-white/10 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/60">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePreview.image}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activePreview.image}
                        alt={activePreview.label}
                        fill
                        className="object-cover brightness-[0.7] contrast-[1.08]"
                        sizes="40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-amber-400 uppercase font-bold mb-1">
                      LIVE PREVIEW INSPECTION
                    </div>
                    <div className="font-serif text-lg text-white font-bold tracking-tight">
                      {activePreview.label}
                    </div>
                    <div className="font-mono text-[11px] text-slate-300 mt-1">
                      {activePreview.sublabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Multi-Department Directory Links */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* Disciplines Column */}
              <div>
                <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400 uppercase font-bold mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>DISIPLIN KONSTRUKSI</span>
                </div>
                <div className="space-y-3">
                  {DISCIPLINES.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setActivePreview(item)}
                      className="group block p-3.5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-200"
                    >
                      <div className="flex items-center justify-between text-white group-hover:text-amber-400 font-serif text-base sm:text-lg font-bold">
                        <span>{item.label}</span>
                        <LuArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-amber-400" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-sans font-light leading-relaxed">
                        {item.sublabel}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Standards & Credentials Column */}
              <div>
                <div className="font-mono text-[11px] tracking-[0.25em] text-amber-400 uppercase font-bold mb-5 pb-2 border-b border-white/10 flex items-center gap-2">
                  <LuShieldCheck className="w-3.5 h-3.5" />
                  <span>STANDAR & KREDENSIAL</span>
                </div>
                <div className="space-y-3 mb-8">
                  {STANDARDS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      onMouseEnter={() => setActivePreview(item)}
                      className="group block p-3.5 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-all duration-200"
                    >
                      <div className="flex items-center justify-between text-white group-hover:text-amber-400 font-serif text-base sm:text-lg font-bold">
                        <span>{item.label}</span>
                        <LuArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-amber-400" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-sans font-light leading-relaxed">
                        {item.sublabel}
                      </p>
                    </Link>
                  ))}
                </div>

                {/* Direct Concierge Box */}
                <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-950/15">
                  <div className="font-mono text-[10px] tracking-widest text-amber-400 uppercase font-bold mb-2">
                    KONSULTASI TEKNIS LANGSUNG
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    Diskusikan denah, perkiraan RAB, atau audit kelayakan struktur langsung bersama insinyur lapangan kami.
                  </p>
                  <a
                    href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <LuPhone className="w-3.5 h-3.5" />
                    <span>Chat WhatsApp ww.cons</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER BAR */}
          <div className="w-full border-t border-white/10 bg-[#07090E]/60 py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <LuMapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Semolowaru, Surabaya</span>
              </span>
              <span className="text-white/20">|</span>
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <FaInstagram className="w-3.5 h-3.5 text-amber-400" />
                <span>@ww.cons</span>
              </a>
            </div>
            <div>© ww.cons (Wonderful Works). All Rights Reserved.</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
