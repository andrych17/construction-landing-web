'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';

const precisionPillars = [
  {
    step: '01',
    title: 'Keamanan & Kekuatan Struktur',
    subtitle: 'Safety First & Structural Reliability',
    focus: 'Kalkulasi beban gempa, analisa tanah Surabaya, dan mutu beton/baja standar SNI.',
    sop: [
      'Uji slump test & benda uji silinder beton berkala',
      'Pemeriksaan ikatan pembesian sebelum pengecoran',
      'Pondasi disesuaikan dengan daya dukung tanah setempat',
    ],
  },
  {
    step: '02',
    title: 'Transparansi RAB & Anti-Rugi',
    subtitle: 'Cost Transparency & Zero Budget Drift',
    focus: 'Rencana Anggaran Biaya terperinci per satuan pekerjaan tanpa klausul tersembunyi.',
    sop: [
      'Analisa Harga Satuan Pekerjaan (AHSP) terbuka',
      'Spesifikasi merek dan tipe material tercantum jelas di kontrak',
      'Sistem termin pembayaran berbasis progres opname fisik nyata',
    ],
  },
  {
    step: '03',
    title: 'Disiplin Timeline & Bebas Molor',
    subtitle: 'Strict Schedule & S-Curve Management',
    focus: 'Manajemen waktu berbasis Kurva-S untuk memastikan serah terima tepat waktu.',
    sop: [
      'Pengawasan harian oleh Site Manager & Pelaksana Lapangan',
      'Perencanaan logistik material 7 hari sebelum jadwal aplikasi',
      'Laporan deviasi progres mingguan kepada pemilik proyek',
    ],
  },
  {
    step: '04',
    title: 'Finishing Halus & Estetika Tinggi',
    subtitle: 'Refined Workmanship & Detailing',
    focus: 'Ketelitian pada level milimeter untuk bidang dinding, elevasi lantai, dan nat keramik.',
    sop: [
      'Pengecekan kelurusan dan kesikuan 90° menggunakan waterpass & laser',
      'Plesteran dan acian rata bebas retak rambut dengan bahan aditif',
      'Inspeksi kerapian nat granit, marmer, dan cat interior sebelum serah terima',
    ],
  },
  {
    step: '05',
    title: 'Integrasi MEP & Zero Bongkar',
    subtitle: 'Seamless Utilities & Interior Fit-Out',
    focus: 'Sinkronisasi instalasi air, listrik, dan AC sejak tahap struktur sebelum cor.',
    sop: [
      'Sleeve pipa dan conduit kabel tertanam sebelum pengecoran dak',
      'Uji tekanan pipa plumbing untuk memastikan 100% bebas bocor',
      'Penyesuaian titik saklar dan stop kontak sesuai gambar denah interior',
    ],
  },
];

export default function BuildingAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="methodology"
      ref={ref}
      className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
              SERI EDUKASI LAPANGAN · @WW.CONS NOTES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
              5 Pilar Presisi Konstruksi
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            Standar SOP lapangan Wonderful Works Construction untuk mencegah kegagalan struktur, kelebihan biaya, dan deviasi spesifikasi.
          </p>
        </div>

        {/* 5 Pillars Matrix (Clean Architectural Grid, No Synthetic Clipart) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {precisionPillars.map((pillar, index) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white border border-slate-200 rounded-sm p-8 flex flex-col justify-between hover:border-slate-400 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="text-3xl font-black font-mono text-slate-950 group-hover:text-brand transition-colors">
                    {pillar.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-2xs font-semibold">
                    STANDAR MUTU
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-brand mb-3 font-medium">
                  {pillar.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {pillar.focus}
                </p>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2.5">
                    SOP Pengawasan Lapangan:
                  </div>
                  <ul className="space-y-2">
                    {pillar.sop.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-brand rounded-full mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                PENERAPAN PROYEK WW CONSTRUCTION
              </div>
            </motion.div>
          ))}

          {/* 6th Card: Authentic Instagram WW Notes Callout */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="bg-slate-900 text-white border border-slate-800 rounded-sm p-8 flex flex-col justify-between shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-brand uppercase tracking-widest font-bold">
                  WW NOTES SERIES
                </span>
                <div className="w-8 h-8 rounded-sm bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <FaInstagram className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Edukasi Lapangan Berkala di @ww.cons
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Kami secara aktif membagikan ulasan teknis, dokumentasi pembesian, tips pemilihan keramik, dan panduan memilih kontraktor di akun Instagram resmi kami.
              </p>

              <div className="p-4 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-slate-300">
                &ldquo;Presisi ukuran adalah investasi ketenangan pikiran jangka panjang.&rdquo;
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-4 py-3 bg-brand hover:bg-brand-hover text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors min-h-[44px]"
              >
                <span>Lihat Video Lapangan @ww.cons</span>
                <LuArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
