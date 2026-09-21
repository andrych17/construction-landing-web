'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';

const services = [
  {
    number: '01',
    category: 'Komersial & Ritel',
    title: 'Konstruksi Gedung & Commercial Fit-Out',
    headline: 'Pembangunan ruang usaha, showroom representatif, dan fasilitas komersial berstandar korporat.',
    description:
      'Melayani pekerjaan struktur baja, beton bertulang SNI, partisi arsitektural, hingga instalasi tata cahaya showroom komersial (seperti proyek resmi Jotun Showroom Surabaya). Dikelola dengan kurva-S ketat dan laporan progres transparan.',
    deliverables: [
      'Struktur Baja & Beton Mutu SNI',
      'Plafon Akustik & Tata Cahaya Komersial',
      'Kepatuhan Standar Fasad Korporat',
      'Manajemen K3 & Izin Operasional',
    ],
    projectRef: 'Contoh: Jotun Showroom Surabaya',
    href: 'https://wa.me/628113313347?text=Halo%20WW%20Construction,%20saya%20ingin%20konsultasi%20proyek%20Komersial%20/%20Showroom.',
  },
  {
    number: '02',
    category: 'Residensial Mewah',
    title: 'Rancang Bangun Rumah Mewah (Modern & Classic)',
    headline: 'Konstruksi hunian tinggal privat eksklusif dengan presisi ukuran milimeter dan material Grade-A.',
    description:
      'Mewujudkan rumah impian bergaya modern tropis kontemporer maupun profil klasik elegan di kawasan Surabaya Timur, Surabaya Barat, dan Sidoarjo. Menyelaraskan estetika arsitek, sirkulasi udara alami, dan ketahanan terhadap cuaca maritim.',
    deliverables: [
      'Pondasi & Struktur Tahan Gempa',
      'Plesteran Siku 90° & Finishing Rata',
      'Material Granit / Marmer & Kayu Pilihan',
      'Supervisi Rutin Pengawas Sipil Berpengalaman',
    ],
    projectRef: 'Contoh: Hunian Privat Modern & Klasik Surabaya',
    href: 'https://wa.me/628113313347?text=Halo%20WW%20Construction,%20saya%20ingin%20konsultasi%20rancang%20bangun%20Rumah%20Tinggal.',
  },
  {
    number: '03',
    category: 'Struktur & Rekayasa',
    title: 'Renovasi Menyeluruh & Re-Engineering Struktur',
    headline: 'Penguatan struktur eksisting, penambahan lantai, dan transformasi fungsi ruang tanpa risiko komplikasi.',
    description:
      'Solusi rekayasa sipil untuk bangunan yang membutuhkan peningkatan beban, perbaikan pondasi pada tanah gerak khas Surabaya, penambahan lantai dak beton, dan audit struktural menyeluruh guna memastikan zero budget drift.',
    deliverables: [
      'Audit Daya Dukung Tanah & Struktur Lama',
      'Perkuatan Balok, Kolom & Dak Beton',
      'Waterproofing Membrane Anti-Bocor',
      'Zero Kerusakan Bangunan Tetangga',
    ],
    projectRef: 'Contoh: Pembesian & Pengecoran Semolowaru',
    href: 'https://wa.me/628113313347?text=Halo%20WW%20Construction,%20saya%20ingin%20konsultasi%20Renovasi%20/%20Perkuatan%20Struktur.',
  },
  {
    number: '04',
    category: 'Fasad & MEP',
    title: 'Rekayasa Fasad Tropis & Utilitas Interior Terintegrasi',
    headline: 'Fasad arsitektural tahan iklim panas pesisir Surabaya dan integrasi MEP sejak awal pengecoran.',
    description:
      'Pemasangan kisi ventilasi penangkal tempias hujan, insulasi peredam panas atap UV, serta sinkronisasi instalasi pipa (plumbing) dan kelistrikan (MEP) tanpa proses bongkar bobok ulang yang merusak estetika dinding.',
    deliverables: [
      'Kisi Fasad & Penahan Radiasi Matahari',
      'Instalasi Kelistrikan & Plumbing Tertanam Rapi',
      'Cat Eksterior Tahan Sinar UV & Jamur',
      'Garansi Pemeliharaan & Masa Retensi SPK',
    ],
    projectRef: 'Contoh: Fasad Tropis & Atap Berinsulasi',
    href: 'https://wa.me/628113313347?text=Halo%20WW%20Construction,%20saya%20ingin%20konsultasi%20Fasad%20Tropis%20/%20Interior%20MEP.',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" ref={ref} className="py-24 sm:py-32 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Editorial & Architectural */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
              WONDERFUL WORKS CONSTRUCTION · SPESIALISASI BIDANG KERJA
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
              Layanan Utama
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            Pendekatan rekayasa sipil disiplin untuk sektor komersial maupun residensial privat di Surabaya, Sidoarjo, dan sekitarnya.
          </p>
        </div>

        {/* Editorial Stacked Rows Layout (Zero Clipart Icons, 100% Architectural Typography) */}
        <div className="divide-y divide-slate-200 border-b border-slate-200">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="py-10 sm:py-12 group hover:bg-slate-50/70 transition-colors px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Column 1: Index Number & Discipline */}
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-slate-950 group-hover:text-brand transition-colors">
                      {service.number}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ 04</span>
                  </div>
                  <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-brand bg-brand-light border border-brand-border px-2.5 py-0.5 rounded-2xs">
                    {service.category}
                  </span>
                  <div className="mt-4 text-xs font-mono text-slate-400">
                    {service.projectRef}
                  </div>
                </div>

                {/* Column 2: Title & Engineering Narrative */}
                <div className="lg:col-span-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 leading-snug group-hover:text-brand transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mb-3">
                    {service.headline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Column 3: Scope Deliverables & Action Link */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full pt-1 lg:pt-0">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                      Lingkup Spesifikasi:
                    </div>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 bg-brand rounded-full flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:text-brand transition-colors"
                    >
                      <span>Konsultasikan Spesifikasi Ini</span>
                      <LuArrowUpRight className="w-4 h-4 text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
