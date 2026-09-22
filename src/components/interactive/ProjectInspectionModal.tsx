'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuMapPin, LuPhone, LuShieldCheck, LuCheck } from 'react-icons/lu';
import type { ProjectDetail } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
export type { ProjectDetail };

interface ProjectInspectionModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectInspectionModal({ project, onClose }: ProjectInspectionModalProps) {
  const { lang, t } = useLanguage();
  const { waLink } = useSiteContent();

  // ESC handler & scroll lock
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const defaultSpecs = [
    {
      label: t('Mutu Beton Struktur', 'Structural Concrete Grade'),
      value: project.specs?.concreteGrade || 'K-300 / K-350 SNI ReadyMix dengan Uji Slump',
    },
    {
      label: t('Dimensi Lahan & Bangunan', 'Site & Building Dimensions'),
      value: project.specs
        ? `LT ${project.specs.landArea} · LB ${project.specs.buildingArea} (${project.specs.levels})`
        : t('Presisi Custom Arsitektur Surabaya', 'Bespoke Architectural Precision Surabaya'),
    },
    {
      label: t('Toleransi Presisi Siku', 'Corner Alignment Tolerance'),
      value: t('Sudut 90° Digital Laser (Toleransi < 1mm)', 'Digital Laser 90° Angle (< 1mm deviance)'),
    },
    {
      label: t('Sistem Fasad & Partisi', 'Facade & Partition System'),
      value: (lang === 'en' && project.materialsEn)
        ? project.materialsEn
        : (project.materials || (project.features ? project.features.join(' · ') : 'Double-Glazed Low-E Glass & Architectural Partitions')),
    },
    {
      label: t('Sistem MEP', 'MEP Infrastructure'),
      value: t('Jalur Pipa & Listrik Tertanam Pra-Cor Dak (0% Resiko Bobok)', 'Pre-Cast Embedded Conduits & Piping (Zero Hacking Risk)'),
    },
    {
      label: t('Garansi & Pemeliharaan', 'Warranty & Retention'),
      value: t('Masa Retensi Fisik 100 Hari + Sertifikat Garansi Resmi', '100-Day Retention Guarantee + Official Structural Warranty'),
    },
  ];

  const specs = (lang === 'en' && project.specsTableEn)
    ? project.specsTableEn
    : (project.specsTable || defaultSpecs);

  const categoryLabel = (lang === 'en' && project.categoryEn) ? project.categoryEn : project.category;
  const projectDesc = (lang === 'en' && project.descEn) ? project.descEn : project.desc;

  const waMessageText = t(
    `Halo Wonderful Works Construction, saya melihat dokumentasi proyek "${project.title}" dan ingin konsultasi spesifikasi serupa.`,
    `Hello Wonderful Works Construction, I reviewed the project documentation for "${project.title}" and would like to consult on similar architectural specifications.`
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Double-Bezel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none bg-[#0a0a0a] border border-white/10 p-2 sm:p-3 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Inner Machined Core */}
          <div className="rounded-none bg-[#030303] border border-white/5 p-5 sm:p-8">
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs tracking-[0.2em] text-neutral-400 uppercase font-bold">
                  {t('DOKUMENTASI TEKNIS & INSPEKSI', 'TECHNICAL SPECIFICATIONS & INSPECTION')}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-none border border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label={t('Tutup inspeksi proyek', 'Close project inspection')}
              >
                <LuX className="w-4 h-4" />
              </button>
            </div>

            {/* Project Title & Category */}
            <div className="mb-6">
              <div className="font-mono text-xs text-amber-400/90 tracking-wider uppercase mb-1">
                {categoryLabel}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight uppercase">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs text-neutral-400">
                <LuMapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-none overflow-hidden border border-white/10 mb-6 bg-black">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>

            {/* Description Narrative */}
            <div className="mb-8">
              <h3 className="font-mono text-xs tracking-widest text-neutral-400 uppercase font-semibold mb-2">
                {t('NARASI & METODE EKSEKUSI', 'NARRATIVE & EXECUTION METHOD')}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
                {projectDesc}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="mb-8 rounded-none border border-white/10 overflow-hidden bg-black/30">
              <div className="bg-white/5 px-4 py-3 font-mono text-xs tracking-wider text-neutral-300 border-b border-white/10 flex items-center gap-2">
                <LuShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{t('SPESIFIKASI TEKNIS & STANDAR MUTU', 'TECHNICAL SPECIFICATIONS & QUALITY STANDARDS')}</span>
              </div>
              <div className="divide-y divide-white/5 font-mono text-xs">
                {specs.map((item, idx) => (
                  <div key={idx} className="p-3.5 sm:px-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-neutral-400">{item.label}</span>
                    <span className="sm:col-span-2 text-white font-medium flex items-center gap-1.5">
                      <LuCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.value}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-xs text-neutral-400 font-sans">
                {t('Konsultasikan kebutuhan teknis proyek komersial atau residensial Anda.', 'Consult the technical requirements for your bespoke residential or commercial project.')}
              </div>
              <a
                href={waLink(waMessageText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-none bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>{t('Konsultasi Proyek Serupa', 'Inquire Similar Project')}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
