'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowUpRight, LuShieldCheck, LuAward, LuCheck, LuQuote } from 'react-icons/lu';
import BarcwayNav from '@/components/navigation/BarcwayNav';
import BarcwayFooter from '@/components/navigation/BarcwayFooter';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import FounderSvgPlaceholder from '@/components/ui/FounderSvgPlaceholder';
import { BARCWAY_PHILOSOPHIES, BARCWAY_FOUNDERS } from '@/data/barcwayData';

export default function AboutPage() {
  const [openPhilosophyIndex, setOpenPhilosophyIndex] = useState<number | null>(0);
  const founder = BARCWAY_FOUNDERS[0];

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
            className="space-y-8"
          >
            <span className="font-mono text-xs text-amber-400 tracking-[0.25em] uppercase font-bold">
              WHO WE ARE
            </span>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-relaxed">
              Wonderful Works (ww.cons) is a leading architecture, interior design, and general contracting atelier specializing in high-end residential estates and flagship commercial spaces in Surabaya and across Indonesia.
            </p>
            <div className="w-12 h-[1px] bg-white/20 mx-auto" />
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto font-sans">
              Our approach goes beyond aesthetics — we design spaces that inspire well-being, foster meaningful connections, and support fulfilling lifestyles. By combining bold architectural ideas, thoughtful craftsmanship, and robust civil structural engineering, we deliver projects that are both functional and breathtaking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE DESIGN PHILOSOPHIES (BARCWAY ACCORDION) */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] relative">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Static Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
                GUIDING PRINCIPLES
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight leading-[1.02] mb-6">
                Our Design Philosophy
              </h2>
              <div className="w-16 h-[1.5px] bg-amber-400 mb-6" />
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Three foundational pillars dictate every line drawn, material selected, and structural calculation performed at our studio.
              </p>
              <div className="hidden lg:block font-mono text-xs text-neutral-500 tracking-widest uppercase">
                DISCIPLINE // 01 – 03
              </div>
            </motion.div>

            {/* Right Interactive Accordion Column */}
            <div className="lg:col-span-7 space-y-4">
              {BARCWAY_PHILOSOPHIES.map((p, idx) => {
                const isOpen = openPhilosophyIndex === idx;
                return (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="border border-white/10 hover:border-amber-400/50 rounded-xl overflow-hidden transition-colors bg-[#0a0a0a]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenPhilosophyIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 sm:p-8 flex items-center justify-between cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-5 sm:gap-8">
                        <span className="font-mono text-sm sm:text-base font-bold text-amber-400">
                          {p.num}
                        </span>
                        <div>
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                            {p.title}
                          </h3>
                          <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mt-1">
                            {p.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="text-2xl text-amber-400 font-mono font-light ml-4">
                        {isOpen ? '—' : '+'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden bg-[#121212] border-t border-white/5"
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

                            <div className="md:col-span-5 relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                              <Image
                                src={p.img}
                                alt={p.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 400px"
                              />
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

      {/* 4. THE FOUNDER (1 FOUNDER PROFILE WITH ARCHITECTURAL SVG PLACEHOLDER) */}
      <section id="founder" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#030303] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
                LEADERSHIP & PROVENANCE
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[0.95] mb-6">
                The<br />Founder
              </h2>
              <div className="w-16 h-[1.5px] bg-amber-400 mb-6" />
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Combining 50+ years of family construction pedigree in Surabaya with contemporary architectural vision, structural calculation precision, and transparent financial stewardship.
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-400 mb-8">
                <div className="flex items-center gap-3 text-neutral-300">
                  <LuShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>REGISTERED CIVIL ENGINEER & MASTER BUILDER</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-300">
                  <LuAward className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>PT. CENTRA ARYA LOKA HERITAGE · 50+ YEARS</span>
                </div>
              </div>

              <div className="hidden lg:block font-mono text-xs text-neutral-500 tracking-widest uppercase">
                PRINCIPAL · STUDIO VOZA TOWER SURABAYA
              </div>
            </motion.div>

            {/* Right Single Founder Card Showcase with SVG Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 rounded-2xl bg-[#080808] border border-white/10 hover:border-amber-400/60 p-6 sm:p-10 transition-all duration-500 flex flex-col justify-between shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
                {/* Vector Silhouette Portrait Box */}
                <div className="md:col-span-6">
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden border border-white/15 bg-black shadow-inner">
                    <FounderSvgPlaceholder
                      title="LEAD MASTER BUILDER"
                      subtitle={founder.name}
                    />
                  </div>
                </div>

                {/* Founder Details */}
                <div className="md:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono text-[10px] tracking-widest text-amber-400 uppercase inline-block">
                    {founder.role}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {founder.name}
                  </h3>
                  <div className="font-mono text-xs text-amber-400/90 tracking-wider uppercase">
                    {founder.focus}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light font-sans">
                    {founder.bio}
                  </p>
                </div>
              </div>

              {/* Quote Banner */}
              {founder.quote && (
                <div className="p-6 rounded-xl bg-[#111111] border border-white/10 mb-8 relative">
                  <LuQuote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
                  <p className="font-serif italic text-sm sm:text-base text-neutral-200 leading-relaxed pr-8">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Verified Credentials */}
              <div className="space-y-2.5 pt-6 border-t border-white/[0.08]">
                <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest block mb-3 font-bold">
                  KEY ACCREDITATIONS & CORE PRINCIPLES:
                </span>
                {founder.credentials?.map((cred) => (
                  <div key={cred} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                    <LuCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-neutral-500 gap-3">
                <span>WW.CONS & CAL.IDN</span>
                <span className="text-amber-400">DIRECT CONSULTATION: +62 822-9819-9902</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 bg-[#080808] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
            Begin Your Architectural Commission
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto font-sans">
            Discuss your luxury residence or commercial flagship project directly with our lead master builder at Voza Premium Office Surabaya.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl min-h-[44px]"
            >
              <span>Schedule Studio Session</span>
              <LuArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-mono text-xs uppercase tracking-widest rounded-full transition-all duration-300 min-h-[44px]"
            >
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <BarcwayFooter />
    </div>
  );
}
