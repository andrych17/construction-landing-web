'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { LuArrowRight, LuPhone, LuArrowUpRight } from 'react-icons/lu';

export default function Hero() {
  const commitments = [
    {
      title: 'Kantor Operasional',
      detail: 'Semolowaru, Surabaya',
      desc: 'Siap survei lokasi & diskusi teknis langsung',
    },
    {
      title: 'Transparansi RAB',
      detail: 'Zero Hidden Cost',
      desc: 'Spesifikasi & analisa harga satuan terbuka',
    },
    {
      title: 'Laporan Progres',
      detail: 'Foto & Video Berkala',
      desc: 'Monitoring pekerjaan rutin via WhatsApp',
    },
    {
      title: 'Masa Retensi',
      detail: 'Garansi Mutu Fisik',
      desc: 'Pendampingan paska-serah terima kunci',
    },
  ];

  return (
    <section className="relative pt-36 sm:pt-44 pb-16 lg:pb-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7">
            {/* Clean Eyebrow (No pulsing dots) */}
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-4 font-semibold">
              WONDERFUL WORKS CONSTRUCTION · GENERAL CONTRACTOR SURABAYA
            </div>

            {/* Monumental Headline in Pure Ink Black */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black tracking-tight text-slate-950 uppercase leading-[1.04]">
              Mewujudkan Visi <br />
              Rancang Bangun <br />
              <span className="text-brand">Dengan Presisi.</span>
            </h1>

            {/* Professional Subhead */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              General contractor tepercaya di Surabaya dengan dedikasi <strong className="text-slate-900 font-semibold">&ldquo;Quality is our priority&rdquo;</strong>. Melayani rancang bangun gedung komersial, rumah mewah modern & klasik, serta renovasi struktural dengan kepastian RAB transparan dan pengawasan harian ketat.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-brand hover:bg-brand-hover active:bg-brand-active transition-colors rounded-sm shadow-sm min-h-[48px]"
              >
                <LuPhone className="w-4 h-4" />
                <span>Konsultasi Proyek (WhatsApp)</span>
                <LuArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-colors rounded-sm min-h-[48px]"
              >
                <span>Lihat Portofolio</span>
              </a>
            </div>

            {/* Social Proof Line */}
            <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span className="text-slate-400">Instagram Resmi:</span>
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 hover:text-brand font-bold inline-flex items-center gap-1 transition-colors"
              >
                <span>@ww.cons</span>
                <LuArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-300">·</span>
              <span>Dokumentasi Proyek Asli</span>
            </div>
          </div>

          {/* Right Column: High-Impact Architectural Photography */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200 rounded-sm overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src="/images/projects/jotun_showroom_hq.jpg"
                  alt="Jotun Showroom Commercial Fit-Out Surabaya - Wonderful Works Construction"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Architectural Caption Card */}
              <div className="p-5 sm:p-6 bg-white border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand bg-brand-light px-2.5 py-0.5 rounded-2xs border border-brand-border">
                    Komersial & Showroom
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Surabaya, Jawa Timur
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  Jotun Showroom Commercial Fit-Out
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  General contracting, interior showroom komersial, pencahayaan showcase, dan penyelesaian fasad korporat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Architectural Datum Strip (Clean Horizontal Row, No Clipart Icons) */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((item) => (
              <div key={item.title} className="border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  {item.title}
                </div>
                <div className="text-base font-bold text-slate-950">
                  {item.detail}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
