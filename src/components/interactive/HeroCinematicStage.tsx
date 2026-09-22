'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowUpRight, LuChevronLeft, LuChevronRight, LuPhone } from 'react-icons/lu';

interface Slide {
  id: number;
  category: string;
  location: string;
  titleWords: string[];
  description: string;
  image: string;
  specs: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    category: 'FLAGSHIP FIT-OUT · KOMERSIAL',
    location: 'Surabaya, Jawa Timur',
    titleWords: ['Presisi', 'Struktur', '&', 'Craftsmanship', 'Showroom.'],
    description:
      'Pembangunan ruang komersial resmi Jotun berstandar internasional. Mengharmonisasikan estetika arsitektural dengan toleransi presisi siku 90° dan nat milimeter.',
    image: '/images/projects/jotun_showroom_hq.jpg',
    specs: 'SNI Certified · Partisi Berat · Akustik Plafon · Fasad Kaca Korporat',
  },
  {
    id: 2,
    category: 'HUNIAN MEWAH PRIVAT',
    location: 'Surabaya Timur',
    titleWords: ['Santuari', 'Residensial', 'Modern', 'Tropis', 'Eksklusif.'],
    description:
      'Konstruksi rumah tinggal bertingkat dengan kenyamanan termal maksimal. Mengawinkan marmer alam, kayu solid tropis, dan sirkulasi udara silang pasif.',
    image: '/images/projects/luxury_residence_hq.jpg',
    specs: 'Marmer Alami · Struktur Anti Gempa · Waterproofing Teruji',
  },
  {
    id: 3,
    category: 'REKAYASA STRUKTUR & SIPIL',
    location: 'Semolowaru, Surabaya',
    titleWords: ['Integritas', 'Pembesian', '&', 'Beton', 'K-350.'],
    description:
      'Pondasi tiang pancang dan sloof beton bertulang terhitung cermat. Setiap adukan beton melalui uji slump mandiri di bawah supervisi insinyur sipil berpengalaman.',
    image: '/images/projects/concrete_rebar_hq.jpg',
    specs: 'Besi Ulir SNI · Uji Slump Mandiri · Nol Kompromi Struktural',
  },
];

const SLIDE_DURATION = 6500; // 6.5s per slide

export default function HeroCinematicStage() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const activeSlide = HERO_SLIDES[current];

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full bg-[#07090E] overflow-hidden flex flex-col justify-between"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Cinematic Showcase"
    >
      {/* BACKGROUND STAGE: Full-bleed cross-fade with slow Ken-Burns zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: 'easeInOut' } }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.category}
              fill
              priority
              className="object-cover object-center brightness-[0.45] contrast-[1.1]"
              sizes="100vw"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/40 to-black/60" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#07090E]/80" />
          </motion.div>
        </AnimatePresence>

        {/* Hairline Grid Overlay (Subtle Blueprint Tectonic Lines) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:8rem_8rem]" />
      </div>

      {/* TOP SPACING (Below Nav) */}
      <div className="pt-28 md:pt-36" />

      {/* CENTER EDITORIAL CONTENT CANVAS */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-16">
        <div className="max-w-4xl">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-black/50 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-amber-300 uppercase font-medium">
              {activeSlide.category}
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-[11px] tracking-wider text-slate-300">
              {activeSlide.location}
            </span>
          </div>

          {/* Word-Masked Staggered Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 min-h-[4rem] sm:min-h-[7.5rem]">
            {activeSlide.titleWords.map((word, wIdx) => (
              <span key={wIdx} className="inline-block overflow-hidden mr-3">
                <motion.span
                  key={`${activeSlide.id}-${wIdx}`}
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: wIdx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block ${word === 'Craftsmanship' || word === 'Modern' || word === 'Beton' ? 'italic font-serif text-amber-400' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Body Description */}
          <motion.p
            key={`desc-${activeSlide.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans font-light mb-8"
          >
            {activeSlide.description}
          </motion.p>

          {/* Action CTAs: Button-in-Button Architecture */}
          <motion.div
            key={`cta-${activeSlide.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-950/40 active:scale-[0.98] min-h-[48px]"
            >
              <span>Eksplorasi Portofolio</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                <LuArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="https://wa.me/628113313347?text=Halo%20Wonderful%20Works%2C%20saya%20tertarik%20konsultasi%20rancang%20bangun."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 text-slate-200 font-mono text-xs tracking-wider transition-all duration-300 min-h-[48px]"
            >
              <LuPhone className="w-3.5 h-3.5 text-amber-400" />
              <span>Konsultasi Teknis Lapangan</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ARCHITECTURAL DOCK CONTROLLER */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#07090E]/80 backdrop-blur-xl py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Slide Counter & Telemetry Meta */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="font-mono text-sm font-bold text-white flex items-center gap-1.5">
              <span className="text-amber-400">0{activeSlide.id}</span>
              <span className="text-white/30">/</span>
              <span className="text-slate-400">0{HERO_SLIDES.length}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
            <div className="font-mono text-[11px] text-slate-400 tracking-wider truncate max-w-[280px] sm:max-w-sm">
              <span className="text-amber-400/80 mr-1.5">SPEC:</span>
              <span>{activeSlide.specs}</span>
            </div>
          </div>

          {/* Center: Segmented Progress Bars & Arrow Nav */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="w-8 h-8 rounded-full border border-white/15 hover:border-amber-400/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <LuChevronLeft className="w-4 h-4" />
            </button>

            {/* 3 Progress Bars */}
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  className="group relative h-2 w-16 sm:w-20 rounded-full bg-white/15 overflow-hidden cursor-pointer p-0 border-0"
                  aria-label={`Pindah ke slide ${idx + 1}`}
                >
                  {current === idx ? (
                    <motion.div
                      key={`fill-${current}`}
                      className="absolute inset-0 bg-amber-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '100%' }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: 'linear',
                      }}
                    />
                  ) : (
                    <div
                      className={`h-full w-full rounded-full transition-colors ${
                        idx < current ? 'bg-white/40' : 'bg-transparent group-hover:bg-white/25'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Slide berikutnya"
              className="w-8 h-8 rounded-full border border-white/15 hover:border-amber-400/60 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <LuChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Scroll to Discover Hint */}
          <a
            href="#portfolio"
            className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-slate-400 hover:text-amber-400 uppercase transition-colors"
          >
            <span>SCROLL TO DISCOVER ARCHIVE</span>
            <span className="w-6 h-[1px] bg-amber-400/60 animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}
