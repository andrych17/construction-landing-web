'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuArrowUpRight, LuCircleCheck } from 'react-icons/lu';
import BarcwayNav from '@/components/navigation/BarcwayNav';
import BarcwayFooter from '@/components/navigation/BarcwayFooter';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import { CENTRA_SERVICES, MASTER_METHODOLOGY } from '@/data/barcwayData';

export default function ServicesPage() {
  return (
    <div className="bg-[#000000] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-black relative w-full overflow-x-hidden">
      <ArchitecturalPreloader />
      <BarcwayNav />

      {/* 1. MONUMENTAL SERVICES HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/images/projects/concrete_rebar_hq.jpg"
            alt="Centra Arya Loka Master Builders"
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
              MASTER BUILDERS · PT. CENTRA ARYA LOKA HERITAGE
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal text-white tracking-tight leading-[0.98] mb-6">
              Services
            </h1>
            <div className="w-20 h-[1.5px] bg-amber-400 mx-auto mb-6" />
            <p className="font-serif italic text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto">
              &ldquo;Master Builders — Explore our services tailored to meet your construction needs.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. OVERVIEW STATEMENT */}
      <section className="py-20 md:py-28 border-b border-white/[0.08] relative">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-neutral-200 leading-[2.1] sm:leading-[2.3] tracking-[1px] font-normal mb-8">
              Perjalanan kami berakar dari tradisi konstruksi teknik sipil Surabaya lebih dari 35 tahun lalu. Kini di bawah sinergi <strong className="text-white">PT. Centra Arya Loka (cal.idn)</strong> dan <strong className="text-white">ww.cons</strong>, kami memadukan eksplorasi arsitektur visioner dengan disiplin rekayasa struktur tanpa kompromi.
            </p>
            <div className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase">
              STANDAR SNI K-350 · KONTRAK KERJA TRANSPARAN · PENGAWASAN LANGSUNG INSINYUR
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PRIMARY SERVICE PILLARS (RESIDENTIAL & COMMERCIAL) */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-16"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
              CORE DISCIPLINES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight mb-4">
              Building Typologies
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans">
              Dari vila privat mewah hingga kantor korporat dan fasilitas komersial, setiap proyek dikerjakan dengan presisi terukur.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {CENTRA_SERVICES.map((srv, sIdx) => (
              <motion.div
                key={srv.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: sIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 overflow-hidden transition-all duration-500 flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div className="relative h-[300px] sm:h-[360px] w-full overflow-hidden bg-black">
                    <Image
                      src={srv.image}
                      alt={srv.category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8] group-hover:brightness-95"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9.5px] tracking-widest text-amber-400 uppercase">
                      {srv.category}
                    </div>
                  </div>

                  <div className="p-8 sm:p-10">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
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
                            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-neutral-200"
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
                    className="w-full py-4 rounded-xl border border-white/20 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 font-bold"
                  >
                    <span>Consult {srv.category === 'RESIDENTIAL BUILDING' ? 'Residential' : 'Commercial'} Project</span>
                    <LuArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CENTRA ARYA LOKA 10-STEP WORKFLOW METHODOLOGY */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#020202] w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-16"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
              CAL.IDN CONSTRUCTION WORKFLOW
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight mb-4">
              10 Pillars of Execution Discipline
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans">
              Setiap langkah dari perjumpaan perdana hingga garansi purna serah terima dikelola secara transparan dengan supervisi langsung insinyur sipil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {MASTER_METHODOLOGY.map((step, mIdx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: (mIdx % 5) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-bold text-amber-400 group-hover:scale-105 transition-transform">
                      {step.step}
                    </span>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">
                      PHASE
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {step.title}
                  </h4>
                  <div className="font-mono text-[10px] text-amber-400/80 mb-3 tracking-wider uppercase">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans mb-4">
                    {step.idDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-neutral-400">
                  <span className="text-amber-400 block font-bold mb-0.5">OUTPUT:</span>
                  <span className="text-neutral-300">{step.deliverable}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHYSICAL REALIZATION BENCHMARKS */}
      <section className="py-24 bg-[#080808] border-b border-white/[0.08]">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">01</span>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">SNI K-350 Concrete</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                Uji slump independen untuk setiap truk molen cor ready-mix. Rangka pembesian ganda tahan guncangan seismik pesisir Surabaya.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">02</span>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Laser 90° Siku Presisi</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                Kalibrasi optik laser digital memastikan pertemuan dinding 90° tegak lurus sempurna dengan deviasi nat marmer &lt; 1mm.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">03</span>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">Garansi Retensi 100 Hari</h3>
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
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2 min-h-[44px]"
            >
              <span>Konsultasi Proyek</span>
              <LuArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors min-h-[44px]"
            >
              Lihat Hasil Karya
            </Link>
          </div>
        </div>
      </section>

      <BarcwayFooter />
    </div>
  );
}
