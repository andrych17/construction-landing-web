'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LuArrowUpRight } from 'react-icons/lu';
import HeroMedia from '@/components/ui/HeroMedia';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ProjectInspectionModal from '@/components/interactive/ProjectInspectionModal';
import type { ProjectDetail } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const { projects: WW_PROJECTS } = useSiteContent();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', labelId: 'SEMUA', labelEn: 'ALL' },
    { key: 'RESIDENTIAL', labelId: 'HUNIAN', labelEn: 'RESIDENTIAL' },
    { key: 'COMMERCIAL', labelId: 'KOMERSIAL', labelEn: 'COMMERCIAL' },
    { key: 'VILLA', labelId: 'VILA', labelEn: 'VILLA' },
  ];

  const filteredProjects = WW_PROJECTS.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'RESIDENTIAL') {
      return (
        p.category.toLowerCase().includes('residence') ||
        p.category.toLowerCase().includes('house') ||
        p.category.toLowerCase().includes('sanctuary') ||
        p.category.toLowerCase().includes('estate')
      );
    }
    if (selectedCategory === 'COMMERCIAL') {
      return p.category.toLowerCase().includes('office') || p.category.toLowerCase().includes('corporate');
    }
    if (selectedCategory === 'VILLA') {
      return p.category.toLowerCase().includes('villa') || p.category.toLowerCase().includes('hillside');
    }
    return true;
  });

  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <Navbar />

      {/* Blueprint Inspection Modal */}
      {selectedProject && (
        <ProjectInspectionModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 1. MONUMENTAL PAGE HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <HeroMedia
          src="/videos/villa-dusk.mp4"
          poster="/images/projects/villa-dusk_poster.jpg"
          alt={t('Vila modern saat senja', 'Modern villa at dusk')}
          priority
        />

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
          <div className="reveal-load">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
              {t('Portofolio Proyek', 'Projects')}
            </h1>
            <div className="w-20 h-[1.5px] bg-white/25 mx-auto mb-6" />
            <p className="font-mono text-sm sm:text-lg text-amber-400/90 font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto">
              {t(
                'Koleksi hunian privat eksklusif dan bangunan korporat terkemuka di Surabaya dan Jawa Timur.',
                'Curated portfolio of high-end private residences and flagship corporate headquarters across Surabaya and East Java.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TOOLBAR */}
      <section className="py-8 border-b border-white/[0.08] bg-[#050505] sticky top-[72px] z-30 backdrop-blur-md">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer min-h-[40px] font-mono tracking-widest ${
                  selectedCategory === cat.key
                    ? 'border-amber-400 bg-amber-400 text-black font-bold shadow-md'
                    : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30 bg-black/40'
                }`}
              >
                {t(cat.labelId, cat.labelEn)}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
            {filteredProjects.length} {t('PROYEK', 'PROJECTS')}
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURAL GALLERY GRID */}
      <section className="py-20 md:py-28 w-full bg-[#000000]">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProjects.map((proj) => (
              <div
                key={proj.title}
                onClick={() => setSelectedProject(proj)}
                className="group rounded-none bg-[#0a0a0a] border border-white/10 hover:border-amber-400/80 p-5 transition-all duration-500 ease-expo cursor-pointer flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(245,158,11,0.15)] reveal"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden bg-black mb-5 border border-white/10">
                    <Image
                      src={proj.img}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-expo brightness-100 contrast-[1.02]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-none bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-widest text-neutral-400 uppercase shadow-md">
                      {proj.category}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-display text-2xl text-white group-hover:text-amber-400 transition-colors uppercase font-bold tracking-tight">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400">{proj.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-2 mb-6 font-sans">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{t('INSPEKSI SPESIFIKASI CETAK BIRU', 'INSPECT BLUEPRINT SPEC')}</span>
                  <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black text-amber-400 transition-all">
                    <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <Footer />
    </div>
  );
}
