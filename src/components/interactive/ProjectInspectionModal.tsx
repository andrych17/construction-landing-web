'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuMapPin, LuPhone, LuShieldCheck, LuCheck } from 'react-icons/lu';
import type { ProjectDetail } from '@/data/barcwayData';
export type { ProjectDetail };

interface ProjectInspectionModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export default function ProjectInspectionModal({ project, onClose }: ProjectInspectionModalProps) {
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
      label: 'Mutu Beton Struktur',
      value: project.specs?.concreteGrade || 'K-300 / K-350 SNI ReadyMix dengan Uji Slump',
    },
    {
      label: 'Dimensi Lahan & Bangunan',
      value: project.specs ? `LT ${project.specs.landArea} · LB ${project.specs.buildingArea} (${project.specs.levels})` : 'Presisi Custom Arsitektur Surabaya',
    },
    {
      label: 'Toleransi Presisi Siku',
      value: 'Sudut 90° Digital Laser (Toleransi < 1mm)',
    },
    {
      label: 'Sistem Fasad & Partisi',
      value: project.materials || (project.features ? project.features.join(' · ') : 'Double-Glazed Low-E Glass & Architectural Partitions'),
    },
    {
      label: 'Sistem MEP',
      value: 'Jalur Pipa & Listrik Tertanam Pra-Cor Dak (0% Resiko Bobok)',
    },
    {
      label: 'Garansi & Pemeliharaan',
      value: 'Masa Retensi Fisik 100 Hari + Sertifikat Garansi Resmi',
    },
  ];

  const specs = project.specsTable || defaultSpecs;

  const waMessage = encodeURIComponent(
    `Halo ww.cons, saya melihat dokumentasi proyek "${project.title}" di Surabaya dan ingin konsultasi spesifikasi serupa.`
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
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#090D14] border border-white/10 p-2 sm:p-3 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Inner Machined Core */}
          <div className="rounded-xl bg-[#0D121C] border border-white/5 p-5 sm:p-8">
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-mono text-xs tracking-[0.2em] text-amber-400 uppercase font-bold">
                  DOKUMENTASI TEKNIS & INSPEKSI
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full border border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup inspeksi proyek"
              >
                <LuX className="w-4 h-4" />
              </button>
            </div>

            {/* Project Title & Category */}
            <div className="mb-6">
              <div className="font-mono text-xs text-slate-400 tracking-wider uppercase mb-1">
                {project.category}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs text-amber-400/90">
                <LuMapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 mb-6 bg-black">
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
              <h3 className="font-mono text-xs tracking-widest text-slate-400 uppercase font-semibold mb-2">
                NARASI & METODE EKSEKUSI
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                {project.desc}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="mb-8 rounded-lg border border-white/10 overflow-hidden bg-black/30">
              <div className="bg-white/5 px-4 py-3 font-mono text-xs tracking-wider text-amber-400 font-bold border-b border-white/10 flex items-center gap-2">
                <LuShieldCheck className="w-4 h-4" />
                <span>SPESIFIKASI TEKNIS & STANDAR MUTU</span>
              </div>
              <div className="divide-y divide-white/5 font-mono text-xs">
                {specs.map((item, idx) => (
                  <div key={idx} className="p-3.5 sm:px-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                    <span className="text-slate-400">{item.label}</span>
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
              <div className="text-xs text-slate-400 font-sans">
                Konsultasikan kebutuhan teknis proyek komersial atau residensial Anda.
              </div>
              <a
                href={`https://wa.me/6282298199902?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>Konsultasi Proyek Serupa</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
