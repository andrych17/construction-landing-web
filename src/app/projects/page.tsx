'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LuArrowUpRight,
  LuChevronLeft,
  LuChevronRight,
  LuPlay,
  LuPause,
} from 'react-icons/lu';
import BarcwayNav from '@/components/navigation/BarcwayNav';
import BarcwayFooter from '@/components/navigation/BarcwayFooter';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import ProjectInspectionModal from '@/components/interactive/ProjectInspectionModal';
import { BARCWAY_PROJECTS, ProjectDetail } from '@/data/barcwayData';

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('grid');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const categories = ['ALL', 'RESIDENTIAL', 'COMMERCIAL', 'VILLA'];

  const filteredProjects = BARCWAY_PROJECTS.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'RESIDENTIAL') return p.category.toLowerCase().includes('residence') || p.category.toLowerCase().includes('house') || p.category.toLowerCase().includes('sanctuary') || p.category.toLowerCase().includes('estate');
    if (selectedCategory === 'COMMERCIAL') return p.category.toLowerCase().includes('office') || p.category.toLowerCase().includes('corporate');
    if (selectedCategory === 'VILLA') return p.category.toLowerCase().includes('villa') || p.category.toLowerCase().includes('hillside');
    return true;
  });

  // Continuous auto-glide for carousel mode
  useEffect(() => {
    if (viewMode !== 'carousel') return;
    const container = carouselRef.current;
    if (!container) return;

    let animId: number;
    const speed = 0.85;

    const step = () => {
      if (!isCarouselPaused && container) {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isCarouselPaused, viewMode]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="bg-[#000000] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-black relative w-full overflow-x-hidden">
      <ArchitecturalPreloader />
      <BarcwayNav />

      {/* Blueprint Inspection Modal */}
      {selectedProject && (
        <ProjectInspectionModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 1. MONUMENTAL PAGE HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/projects/luxury_residence_hq.jpg"
            alt="ww.cons Portfolio"
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
              PORTFOLIO COMMISSIONS & REALIZATIONS
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal text-white tracking-tight leading-[0.98] mb-6">
              Projects
            </h1>
            <div className="w-20 h-[1.5px] bg-amber-400 mx-auto mb-6" />
            <p className="font-serif italic text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto">
              &ldquo;Curated portfolio of high-end private residences and flagship corporate headquarters across Surabaya and East Java.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER & CONTROLS TOOLBAR */}
      <section className="py-8 border-b border-white/[0.08] bg-[#050505] sticky top-[72px] z-30 backdrop-blur-md">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1800px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border transition-all cursor-pointer min-h-[38px] ${
                  selectedCategory === cat
                    ? 'border-amber-400 bg-amber-400 text-black font-bold'
                    : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30 bg-black/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Mode & Swiper Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/15 rounded-full p-1 bg-neutral-900 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-full transition-colors cursor-pointer min-h-[36px] ${
                  viewMode === 'grid' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Matrix (3-Col)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 rounded-full transition-colors cursor-pointer min-h-[36px] ${
                  viewMode === 'carousel' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Slider (Glide)
              </button>
            </div>

            {viewMode === 'carousel' && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCarouselPaused((prev) => !prev)}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-amber-400 flex items-center justify-center text-white transition-colors cursor-pointer"
                  title={isCarouselPaused ? 'Resume glide' : 'Pause glide'}
                >
                  {isCarouselPaused ? <LuPlay className="w-3.5 h-3.5 text-amber-400 ml-0.5" /> : <LuPause className="w-3.5 h-3.5 text-neutral-300" />}
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors"
                >
                  <LuChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors"
                >
                  <LuChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. SHOWCASE VIEWPORT */}
      <section className="py-20 md:py-28 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1800px] mx-auto">
          {viewMode === 'carousel' ? (
            /* Full-Width Glide Swiper */
            <div
              ref={carouselRef}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onTouchStart={() => setIsCarouselPaused(true)}
              onTouchEnd={() => setIsCarouselPaused(false)}
              className="flex gap-7 overflow-x-auto scrollbar-none pb-6 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[...filteredProjects, ...filteredProjects].map((proj, idx) => (
                <div
                  key={`${proj.title}-${idx}`}
                  onClick={() => setSelectedProject(proj)}
                  className="w-[340px] sm:w-[420px] md:w-[480px] lg:w-[520px] shrink-0 group cursor-pointer"
                >
                  <div className="relative h-[400px] sm:h-[460px] md:h-[520px] w-full rounded-2xl overflow-hidden bg-neutral-950 mb-4 border border-white/10 group-hover:border-amber-400/60 transition-colors">
                    <Image
                      src={proj.img}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                      sizes="520px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9.5px] tracking-widest text-amber-400 uppercase">
                      {proj.category}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline px-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400">{proj.location}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 3-Column Responsive Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj, pIdx) => (
                <motion.div
                  key={proj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: (pIdx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedProject(proj)}
                  className="group rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black mb-5 border border-white/5">
                      <Image
                        src={proj.img}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                        {proj.category}
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-xs text-neutral-400">{proj.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-2 mb-6 font-sans">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>INSPECT BLUEPRINT</span>
                    <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400 text-amber-400 transition-colors">
                      <LuArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-20 bg-[#080808] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
            Commission Your Custom Sanctuary
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto">
            Setiap rancang bangun dimulai dengan dialog mendalam mengenai gaya hidup Anda. Hubungi kami untuk merencanakan hunian atau ruang usaha Anda.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2"
          >
            <span>Start a Commission</span>
            <LuArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <BarcwayFooter />
    </div>
  );
}
