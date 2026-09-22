'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';
import BarcwayNav from '@/components/navigation/BarcwayNav';
import BarcwayFooter from '@/components/navigation/BarcwayFooter';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import { BARCWAY_PHILOSOPHIES, BARCWAY_FOUNDERS } from '@/data/barcwayData';

export default function AboutPage() {
  const [openPhilosophyIndex, setOpenPhilosophyIndex] = useState<number | null>(0);

  return (
    <div className="bg-[#000000] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-black relative w-full overflow-x-hidden">
      <ArchitecturalPreloader />
      <BarcwayNav />

      {/* 1. MONUMENTAL PAGE HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/projects/tropical_facade_hq.jpg"
            alt="ww.cons Studio Surabaya"
            fill
            priority
            className="object-cover object-center brightness-50 contrast-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs tracking-[0.28em] text-amber-400 uppercase block mb-4 font-bold">
              STUDIO ETHOS & ARCHITECTURAL PEDIGREE
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal text-white tracking-tight leading-[0.98] mb-6">
              About Us
            </h1>
            <div className="w-20 h-[1.5px] bg-amber-400 mx-auto mb-6" />
            <p className="font-serif italic text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto">
              &ldquo;Redefining luxury living through spatial honesty, bold forms, and physical structural mastery.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. BARCWAY NARRATIVE & ETHOS */}
      <section className="py-24 md:py-32 border-b border-white/[0.08] relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-neutral-200 leading-[2.1] sm:leading-[2.3] tracking-[1.1px] font-normal mb-8">
              ww.cons is a leading architecture, interior design, and general contracting firm dedicated to creating extraordinary environments that blend luxury, innovation, and artistry. Specializing in high-end residential and commercial spaces across Surabaya and East Java, we push the boundaries of design through bold forms and material exploration, crafting homes and interiors that elevate lifestyles and celebrate individuality.
            </p>

            <p className="font-serif text-base sm:text-lg md:text-xl text-neutral-400 leading-[2.1] sm:leading-[2.3] tracking-[1.1px] font-normal mb-12">
              Our approach goes beyond aesthetics—we design spaces that inspire well-being, foster connections, and support fulfilling lifestyles. By combining bold ideas, thoughtful details, and innovative materials, we deliver designs that are both functional and breathtaking. At ww.cons, every project is a collaboration to create spaces that feel personal, timeless, and truly extraordinary.
            </p>

            <div className="w-20 h-[1px] bg-amber-400/40 mx-auto mb-8" />

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-3xl mx-auto font-mono text-xs sm:text-sm text-neutral-400 tracking-[0.2em] leading-relaxed uppercase">
              35 TAHUN DEDIKASI TEKNIK SIPIL SURABAYA · STANDAR STRUKTUR SNI K-350 · AKURASI LASER 90° DEV. &lt; 1MM · GARANSI RETENSI RESMI 100 HARI
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE 3 DESIGN PHILOSOPHIES (ACCORDION) */}
      <section id="philosophy" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
                THE FOUNDATION OF EVERY SPACE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.08] mb-6">
                Our Design Philosophy
              </h2>
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Every architectural commission begins with spatial purpose and material honesty. We unite bold form exploration with physical structural mastery.
              </p>
              <div className="hidden lg:block font-mono text-xs text-neutral-500 tracking-widest uppercase">
                SURABAYA · SIDOARJO · MALANG HIGHLANDS
              </div>
            </motion.div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-8 space-y-6">
              {BARCWAY_PHILOSOPHIES.map((p, idx) => {
                const isOpen = openPhilosophyIndex === idx;
                return (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300"
                  >
                    {/* Interactive Accordion Bar */}
                    <button
                      type="button"
                      onClick={() => setOpenPhilosophyIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 sm:p-8 flex justify-between items-center bg-[#111111] hover:bg-[#161616] transition-colors min-h-[64px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-lg sm:text-xl font-bold text-amber-400">
                          {p.num}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                          {p.title}
                        </h3>
                        <span className="hidden md:inline font-mono text-xs text-neutral-400 tracking-wider">
                          — {p.tagline}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center font-mono text-xl text-white shrink-0 ml-4 group-hover:border-amber-400 group-hover:text-amber-400 transition-colors select-none"
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Expandable Body */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden bg-[#181818] border-t border-white/5"
                        >
                          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="md:col-span-7">
                              <p className="text-base sm:text-lg text-neutral-200 font-serif leading-relaxed mb-6 italic">
                                &ldquo;{p.desc}&rdquo;
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                                {p.execution}
                              </p>
                              <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                                <span className="text-amber-400 block mb-1">MATERIAL & STRUCTURAL REALIZATION:</span>
                                <span className="text-neutral-300">{p.material}</span>
                              </div>
                            </div>

                            <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                              <Image
                                src={p.img}
                                alt={p.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 500px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-3 left-3 font-mono text-[9px] text-amber-400 uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                                WW.CONS COMMISSIONS
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE FOUNDERS (BARCWAY VISIONARIES & PRINCIPALS) */}
      <section id="founders" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#030303] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
                THE VISIONARIES
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[0.95] mb-6">
                The<br />Founders
              </h2>
              <div className="w-16 h-[1.5px] bg-amber-400 mb-6" />
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Dedicated to shaping evocative architectural landmarks and bespoke private sanctuaries that harmonize bold form exploration with physical structural mastery.
              </p>
              <div className="hidden lg:block font-mono text-xs text-neutral-500 tracking-widest uppercase">
                PRINCIPALS · STUDIO VOZA SURABAYA
              </div>
            </motion.div>

            {/* Right Founders Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {BARCWAY_FOUNDERS.map((founder, fIdx) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: fIdx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl bg-[#090909] border border-white/10 hover:border-amber-400/60 p-6 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Portrait Frame */}
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                      <Image
                        src={founder.image}
                        alt={`${founder.name} - ${founder.role}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                        {founder.role}
                      </div>
                    </div>

                    {/* Information */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                      {founder.name}
                    </h3>
                    <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase mb-4">
                      {founder.role} — {founder.focus}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light font-sans mb-6">
                      {founder.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>WW.CONS PRINCIPAL</span>
                    <span className="text-neutral-400">VOZA TOWER LT. 20</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 bg-[#080808] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
            Begin Your Architectural Commission
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto">
            Discuss your luxury residence or commercial flagship project directly with our principals at Voza Premium Office Surabaya.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
            >
              <span>Contact Us</span>
              <LuArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      <BarcwayFooter />
    </div>
  );
}
