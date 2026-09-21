'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import RemotionShowcase from './remotion/RemotionShowcase';

export default function RemotionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const techHighlights = [
    {
      step: '01',
      title: 'Dokumentasi Harian Lapangan',
      desc: 'Laporan visual berkala pembesian, pengecoran, dan instalasi fisik via grup WhatsApp proyek untuk transparansi penuh.',
    },
    {
      step: '02',
      title: 'Finishing Arsitektur Presisi',
      desc: 'Standar pengerjaan nat keramik, plesteran, dan profil fasad tingkat tinggi oleh tukang spesialis berpengalaman.',
    },
    {
      step: '03',
      title: 'Material SNI & Brand Teruji',
      desc: 'Penggunaan besi beton bertulang SNI serta cat pelindung iklim tropis Surabaya (seperti Jotun dan setara).',
    },
    {
      step: '04',
      title: 'Jaminan Retensi & Garansi',
      desc: 'Komitmen pemeliharaan menyeluruh paska-serah terima kunci (BAST) untuk memastikan keandalan jangka panjang.',
    },
  ];

  return (
    <section
      id="project-reel"
      ref={ref}
      className="py-24 sm:py-32 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
              WONDERFUL WORKS CONSTRUCTION · DOKUMENTASI MULTIMEDIA
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase leading-tight">
              Video Proyek Lapangan
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-slate-600 max-w-lg text-sm sm:text-base leading-relaxed"
          >
            Rangkuman visual eksekusi konstruksi fisik <strong>Wonderful Works (@ww.cons)</strong> di Surabaya: dari pekerjaan struktur beton bertulang, showroom komersial Jotun, hingga rancang bangun hunian mewah.
          </motion.p>
        </div>

        {/* The Remotion Interactive Showcase Component */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <RemotionShowcase />
        </motion.div>

        {/* 4 Highlights Strip (Clean Light Typography, No Clipart Icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-slate-200">
          {techHighlights.map((item) => (
            <div key={item.step} className="border-l-2 border-slate-300 pl-4">
              <span className="text-xs font-mono text-brand font-bold block mb-1">
                {item.step}
              </span>
              <h3 className="text-sm font-bold text-slate-950 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
