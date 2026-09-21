'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LuArrowUpRight } from 'react-icons/lu';

const trustPillars = [
  {
    step: '01',
    category: 'JAMINAN ANGGARAN',
    title: 'Surat Perjanjian Kerja (SPK) Mengikat & RAB Terbuka',
    description:
      'Seluruh perhitungan volume, analisa harga satuan (AHS), merk spesifikasi material, dan jadwal termin disepakati secara tertulis. Kami menjamin tidak ada biaya siluman atau kenaikan sepihak di tengah proses pembangunan.',
    highlight: 'Zero Hidden Cost Guarantee',
  },
  {
    step: '02',
    category: 'PENGAWASAN REAL-TIME',
    title: 'Laporan Foto & Video Rutin via Grup WhatsApp',
    description:
      'Setiap hari, Site Manager mendokumentasikan progres pembesian, pengecoran, maupun finishing ke dalam grup WhatsApp proyek bersama pemilik. Anda dapat memantau mutu pekerjaan tanpa harus hadir setiap hari di lokasi.',
    highlight: 'Daily Visual Inspection Log',
  },
  {
    step: '03',
    category: 'PERLINDUNGAN MUTU',
    title: 'Masa Garansi Retensi Paska Serah Terima Kunci',
    description:
      'Setelah Berita Acara Serah Terima (BAST), proyek dilindungi masa pemeliharaan retensi (3 hingga 6 bulan). Tim teknis kami siap menangani penyesuaian atau keluhan fisik tanpa biaya tambahan.',
    highlight: 'Comprehensive Retention Warranty',
  },
];

const clientStories = [
  {
    scope: 'Komersial / Showroom',
    location: 'Surabaya, Jawa Timur',
    headline: 'Jotun Showroom Commercial Fit-Out',
    quote:
      'Koordinasi teknis penataan dinding pajang dan pencahayaan komersial dikerjakan dengan standar mutu yang ketat. Jadwal pembukaan showroom terpenuhi sesuai target.',
    client: 'Mitra Showroom Korporat',
  },
  {
    scope: 'Rancang Bangun Rumah Mewah',
    location: 'Surabaya Timur',
    headline: 'Hunian Residensial Modern Tropis',
    quote:
      'Laporan video berkala di WhatsApp sangat menenangkan karena saya tidak bisa setiap hari mengawasi di lapangan. Presisi ukuran dinding dan nat keramik sangat memuaskan.',
    client: 'Pemilik Hunian Residensial',
  },
  {
    scope: 'Renovasi & Struktur Beton',
    location: 'Semolowaru, Surabaya',
    headline: 'Pekerjaan Struktur & Pembesian Lapangan',
    quote:
      'Analisa RAB sangat jelas dan transparan sejak awal survei. Tim WW Construction disiplin terhadap jadwal kerja dan tidak ada pembengkakan biaya.',
    client: 'Klien Proyek Semolowaru',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
              WONDERFUL WORKS CONSTRUCTION · KEPERCAYAAN & TRANSPARANSI
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
              Standar Kepuasan Klien
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            Menghilangkan kekhawatiran terbesar dalam proyek konstruksi: dari ketidakpastian anggaran hingga mutu pengerjaan fisik.
          </p>
        </div>

        {/* 3 Trust Pillars: Clean Architectural Rows (Zero Clipart Icons) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-50 border border-slate-200 p-8 rounded-sm flex flex-col justify-between hover:border-slate-400 hover:bg-white transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-brand tracking-wider">
                    {pillar.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">
                    {pillar.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 mb-3 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/80">
                <span className="inline-block text-[11px] font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded-2xs font-semibold">
                  {pillar.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Field Experience & Client Perspectives Header */}
        <div className="pt-12 border-t border-slate-200 mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
            CATATAN REKAYASA & PENGALAMAN LAPANGAN
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-950">
            Bukti Nyata Pengawasan Proyek di Surabaya
          </h3>
        </div>

        {/* Client Story Quotes (Editorial High-Contrast Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientStories.map((story) => (
            <div
              key={story.headline}
              className="p-6 bg-slate-50/70 border-l-2 border-brand border-y border-r border-slate-200 rounded-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>{story.scope}</span>
                  <span>{story.location}</span>
                </div>
                <h4 className="text-base font-bold text-slate-950 mb-3">
                  {story.headline}
                </h4>
                <blockquote className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
              </div>
              <div className="text-xs font-mono font-semibold text-slate-900 pt-3 border-t border-slate-200/60">
                &mdash; {story.client}
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Callout */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>DOKUMENTASI RIIL PROSES PEMBANGUNAN DAPAT DIVERIFIKASI DI INSTAGRAM @WW.CONS</span>
          <a
            href="https://www.instagram.com/ww.cons/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-900 hover:text-brand font-bold transition-colors"
          >
            <span>Buka Instagram @ww.cons</span>
            <LuArrowUpRight className="w-3.5 h-3.5 text-brand" />
          </a>
        </div>
      </div>
    </section>
  );
}
