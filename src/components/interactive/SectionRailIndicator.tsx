'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionTarget {
  id: string;
  num: string;
  name: string;
}

const SECTIONS: SectionTarget[] = [
  { id: 'hero', num: '01', name: 'Home' },
  { id: 'about', num: '02', name: 'About' },
  { id: 'founder', num: '03', name: 'Founder' },
  { id: 'services', num: '04', name: 'Services' },
  { id: 'projects', num: '05', name: 'Projects' },
  { id: 'contact', num: '06', name: 'Contact' },
];

export default function SectionRailIndicator() {
  const [activeId, setActiveId] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const secEl = document.getElementById(SECTIONS[i].id);
        if (secEl) {
          const top = secEl.offsetTop;
          if (scrollPos >= top) {
            setActiveId(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Navigasi Rel Spasial"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Current Active Number */}
      <motion.div
        key={activeSection.num}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-xs font-bold text-amber-400 mb-2"
      >
        {activeSection.num}
      </motion.div>

      {/* Vertical Rail with Pips */}
      <div className="relative py-2 flex flex-col items-center gap-3">
        {/* Continuous hairline background line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10" />

        {SECTIONS.map((sec) => {
          const isActive = sec.id === activeId;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative z-10 p-1 flex items-center justify-center cursor-pointer border-0 bg-transparent"
              aria-label={`Loncat ke section ${sec.name}`}
            >
              {/* Pip Indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-2 bg-amber-400 ring-4 ring-amber-500/20'
                    : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                }`}
              />

              {/* Hover Section Tooltip (Appears to the left) */}
              <AnimatePresence>
                {(isHovered || isActive) && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className={`absolute right-6 whitespace-nowrap px-2 py-1 rounded-xs font-mono text-[10px] tracking-widest uppercase transition-colors pointer-events-none ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        : 'bg-black/80 text-slate-400 border border-white/10'
                    }`}
                  >
                    {sec.num} · {sec.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* Dynamic Active Section Name Rotated */}
      <div className="mt-2 h-16 flex items-center justify-center">
        <span
          className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          {activeSection.name}
        </span>
      </div>
    </aside>
  );
}
