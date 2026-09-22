'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuArrowUpRight, LuCircleCheck } from 'react-icons/lu';
import HeroMedia from '@/components/ui/HeroMedia';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { CENTRA_SERVICES, MASTER_METHODOLOGY } from '@/data/siteData';

export default function ServicesPage() {
  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <Navbar />

      {/* 1. MONUMENTAL SERVICES HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <HeroMedia src="/videos/concrete-structure.mp4" poster="/images/projects/concrete-structure_poster.jpg" alt="Struktur beton dalam pengerjaan" priority />

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
          <div className="reveal-load">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal text-white tracking-tight leading-[0.98] mb-6">
              Services
            </h1>
            <div className="w-20 h-[1.5px] bg-white/25 mx-auto mb-6" />
            <p className="font-serif italic text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto">
              &ldquo;Services — Explore our services tailored to meet your construction needs.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW STATEMENT */}
      <section className="py-20 md:py-28 border-b border-white/[0.08] relative">
        <div className="max-w-reading mx-auto px-6 sm:px-12 text-center">
          <div className="reveal">
            {/* TODO: tulis ulang dengan rekam jejak ww.cons yang sebenarnya.
                Versi lama menyebut "lebih dari 35 tahun" (tidak terverifikasi dan
                bertabrakan dengan klaim 50+ tahun di tempat lain) serta
                memposisikan PT Centra Arya Loka sebagai mitra — itu firma lain. */}
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-neutral-200 leading-[2.1] sm:leading-[2.3] tracking-[1px] font-normal mb-8">
              <strong className="text-white">ww.cons</strong> memadukan perancangan arsitektur dengan disiplin pelaksanaan di lapangan — dari studi tapak, penyusunan anggaran terbuka, hingga serah terima dan masa pemeliharaan.
            </p>
            <div className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase">
              STANDAR SNI K-350 · KONTRAK KERJA TRANSPARAN · PENGAWASAN LANGSUNG INSINYUR
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRIMARY SERVICE PILLARS (RESIDENTIAL & COMMERCIAL) */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="max-w-3xl mb-16 reveal">
            <span className="font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase block mb-3 font-bold">
              CORE DISCIPLINES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight mb-4">
              Building Typologies
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed font-sans">
              Dari vila privat mewah hingga kantor korporat dan fasilitas komersial, setiap proyek dikerjakan dengan presisi terukur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {CENTRA_SERVICES.map((srv, sIdx) => (
              <div key={srv.category} className="group rounded-none bg-[#0b0b0b] border border-white/10 hover:border-amber-400/80 overflow-hidden transition-all duration-500 ease-expo flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] reveal">
                <div>
                  <div className="relative h-[300px] sm:h-[360px] w-full overflow-hidden bg-black">
                    <Image
                      src={srv.image}
                      alt={srv.category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-expo brightness-100 contrast-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/20 to-transparent" />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-none bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-widest text-neutral-400 uppercase shadow-lg">
                      {srv.category}
                    </div>
                  </div>

                  <div className="p-8 sm:p-10">
                    <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2">
                      {srv.category === 'RESIDENTIAL BUILDING' ? 'Residential Building' : 'Commercial Building'}
                    </h3>
                    <p className="font-serif text-base text-amber-400/90 italic mb-4">
                      &ldquo;{srv.subtitle}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8 font-sans">
                      {srv.desc}
                    </p>

                    <div className="mb-8">
                      <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mb-3 font-bold">
                        WHAT WE DO:
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {srv.types.map((type) => (
                          <span
                            key={type}
                            className="px-4 py-2 rounded-none bg-white/5 border border-white/10 font-mono text-xs text-neutral-200"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs text-neutral-300">
                      {srv.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5">
                          <LuCircleCheck className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-8 sm:px-10 pb-8 pt-2">
                  <Link
                    href="/contact"
                    className="group w-full py-4 rounded-none border border-white/20 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 ease-expo flex items-center justify-center gap-2 font-bold"
                  >
                    <span>Consult {srv.category === 'RESIDENTIAL BUILDING' ? 'Residential' : 'Commercial'} Project</span>
                    <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 10-STEP WORKFLOW METHODOLOGY */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#020202] w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="max-w-3xl mb-16 reveal">
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight mb-4">
              Alur Kerja 10 Tahap
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans">
              Setiap langkah dari perjumpaan perdana hingga garansi purna serah terima dikelola secara transparan dengan supervisi langsung insinyur sipil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {MASTER_METHODOLOGY.map((step, mIdx) => (
              <div key={step.step} className="p-6 rounded-none bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 transition-all duration-300 ease-expo flex flex-col justify-between group shadow-lg reveal">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-bold text-amber-400 group-hover:scale-105 transition-transform">
                      {step.step}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">
                      PHASE
                    </span>
                  </div>
                  <h4 className="font-serif text-lg text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h4>
                  <div className="font-mono text-[11px] text-amber-400/80 mb-3 tracking-wider uppercase">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans mb-4">
                    {step.idDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                  <span className="text-neutral-300 block mb-0.5">OUTPUT:</span>
                  <span className="text-neutral-300">{step.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHYSICAL REALIZATION BENCHMARKS */}
      <section className="py-24 bg-[#080808] border-b border-white/[0.08]">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">01</span>
              <h3 className="font-serif text-2xl text-white mb-2">SNI K-350 Concrete</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                Uji slump independen untuk setiap truk molen cor ready-mix. Rangka pembesian ganda tahan guncangan seismik pesisir Surabaya.
              </p>
            </div>
            <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">02</span>
              <h3 className="font-serif text-2xl text-white mb-2">Laser 90° Siku Presisi</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                Kalibrasi optik laser digital memastikan pertemuan dinding 90° tegak lurus sempurna dengan deviasi nat marmer &lt; 1mm.
              </p>
            </div>
            <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">03</span>
              <h3 className="font-serif text-2xl text-white mb-2">Garansi Retensi 100 Hari</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                Komitmen purna jual resmi tertulis dalam SPK berkekuatan hukum, ditambah inspeksi berkala 2x setahun untuk merawat kenyamanan Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 bg-[#000000] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
            Ready to Build Your Architectural Commission?
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto font-sans">
            Hubungi tim estimator dan project manager kami untuk konsultasi teknis dan penyusunan RAB transparan zero hidden cost.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-none bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo flex items-center gap-2 min-h-[44px]"
            >
              <span>Konsultasi Proyek</span>
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-none border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors min-h-[44px]"
            >
              Lihat Hasil Karya
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
