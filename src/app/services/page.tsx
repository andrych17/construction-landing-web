'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight, LuCircleCheck } from 'react-icons/lu';
import HeroMedia from '@/components/ui/HeroMedia';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';

export default function ServicesPage() {
  const { lang, t } = useLanguage();
  const { services: CENTRA_SERVICES, methodology: MASTER_METHODOLOGY, faqs: WW_FAQS } = useSiteContent();

  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <Navbar />

      {/* 1. MONUMENTAL SERVICES HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <HeroMedia
          src="/videos/concrete-structure.mp4"
          poster="/images/projects/concrete-structure_poster.jpg"
          alt={t('Struktur beton dalam pengerjaan', 'Concrete structure in progress')}
          priority
        />

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
          <div className="reveal-load">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
              {t('Layanan', 'Services')}
            </h1>
            <div className="w-20 h-[1.5px] bg-white/25 mx-auto mb-6" />
            <p className="font-mono text-sm sm:text-lg text-amber-400/90 font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto">
              {t(
                'Layanan rancang bangun terintegrasi — presisi arsitektur, perhitungan sipil teruji, dan eksekusi lapangan tanpa kompromi.',
                'Integrated design and build services — architectural precision, certified civil calculations, and uncompromising site execution.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW STATEMENT */}
      <section className="py-20 md:py-28 border-b border-white/[0.08] relative">
        <div className="max-w-reading mx-auto px-6 sm:px-12 text-center">
          <div className="reveal">
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-neutral-200 leading-[2.1] sm:leading-[2.3] tracking-wide font-normal mb-8">
              <strong className="text-white font-bold">Wonderful Works Construction</strong>{' '}
              {t(
                'memadukan perancangan arsitektur dengan disiplin pelaksanaan di lapangan — dari studi tapak, penyusunan anggaran terbuka, hingga serah terima dan masa pemeliharaan.',
                'unites architectural conceptualization with meticulous field execution discipline — from site feasibility studies and transparent budget schedules to handover and comprehensive retention warranty.'
              )}
            </p>
            <div className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase">
              {t(
                'STANDAR SNI K-350 · KONTRAK KERJA TRANSPARAN · PENGAWASAN LANGSUNG INSINYUR',
                'SNI K-350 SPECIFICATION · TRANSPARENT SCHEDULE CONTRACT · LEAD ENGINEER DIRECT SUPERVISION'
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRIMARY SERVICE PILLARS (RESIDENTIAL & COMMERCIAL) */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="max-w-3xl mb-16 reveal">
            <span className="font-mono text-xs tracking-[0.25em] text-neutral-400 uppercase block mb-3 font-bold">
              {t('DISIPLIN UTAMA', 'CORE DISCIPLINES')}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
              {t('Tipologi Bangunan', 'Building Typologies')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed font-sans">
              {t(
                'Dari vila privat mewah hingga kantor korporat dan fasilitas komersial, setiap proyek dikerjakan dengan presisi terukur.',
                'From private luxury estates to flagship corporate headquarters and commercial developments, every commission is executed with measured precision.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {CENTRA_SERVICES.map((srv) => (
              <div
                key={srv.category}
                className="group rounded-none bg-[#0b0b0b] border border-white/10 hover:border-amber-400/80 overflow-hidden transition-all duration-500 ease-expo flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] reveal"
              >
                <div>
                  <div className="relative h-[300px] sm:h-[360px] w-full overflow-hidden bg-black">
                    <Image
                      src={srv.image}
                      alt={lang === 'en' && srv.categoryEn ? srv.categoryEn : srv.category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-expo brightness-100 contrast-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/20 to-transparent" />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-none bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-widest text-neutral-400 uppercase shadow-lg">
                      {lang === 'en' && srv.categoryEn ? srv.categoryEn : srv.category}
                    </div>
                  </div>

                  <div className="p-8 sm:p-10">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 uppercase">
                      {srv.category === 'RESIDENTIAL BUILDING'
                        ? t('Bangunan Residensial', 'Residential Building')
                        : t('Bangunan Komersial', 'Commercial Building')}
                    </h3>
                    <p className="font-serif text-base text-amber-400/90 italic mb-4">
                      &ldquo;{lang === 'en' && srv.subtitleEn ? srv.subtitleEn : srv.subtitle}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8 font-sans">
                      {lang === 'en' && srv.descEn ? srv.descEn : srv.desc}
                    </p>

                    <div className="mb-8">
                      <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mb-3 font-bold">
                        {t('CAKUPAN KERJA:', 'WHAT WE DO:')}
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {(lang === 'en' && srv.typesEn ? srv.typesEn : srv.types).map((type) => (
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
                      {(lang === 'en' && srv.featuresEn ? srv.featuresEn : srv.features).map((feat) => (
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
                    <span>
                      {srv.category === 'RESIDENTIAL BUILDING'
                        ? t('Konsultasi Proyek Residensial', 'Consult Residential Project')
                        : t('Konsultasi Proyek Komersial', 'Consult Commercial Project')}
                    </span>
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
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
              {t('Alur Kerja 10 Tahap', '10-Stage Workflow Methodology')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans">
              {t(
                'Setiap langkah dari perjumpaan perdana hingga garansi purna serah terima dikelola secara transparan dengan supervisi langsung insinyur sipil.',
                'Every phase from initial commission to final handover and warranty retention is managed with strict transparency and direct civil engineer oversight.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {MASTER_METHODOLOGY.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-none bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 transition-all duration-300 ease-expo flex flex-col justify-between group shadow-lg reveal"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-bold text-amber-400 group-hover:scale-105 transition-transform">
                      {step.step}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">
                      {t('TAHAP', 'PHASE')}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors uppercase">
                    {lang === 'en' && step.titleEn ? step.titleEn : step.title}
                  </h3>
                  <div className="font-mono text-[11px] text-amber-400/80 mb-3 tracking-wider uppercase">
                    {lang === 'en' && step.subtitleEn ? step.subtitleEn : step.subtitle}
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans mb-4">
                    {lang === 'en' && step.enDesc ? step.enDesc : step.idDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                  <span className="text-neutral-300 block mb-0.5">{t('OUTPUT DOKUMEN:', 'DELIVERABLE:')}</span>
                  <span className="text-neutral-300">
                    {lang === 'en' && step.deliverableEn ? step.deliverableEn : step.deliverable}
                  </span>
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
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase">{t('Beton SNI K-350', 'SNI K-350 Concrete')}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                {t(
                  'Uji slump independen untuk setiap truk molen cor ready-mix. Rangka pembesian ganda tahan guncangan seismik pesisir Surabaya.',
                  'Independent slump and compression testing for every batch. Heavy-gauge double rebar cage engineered for seismic stability.'
                )}
              </p>
            </div>
            <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">02</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase">{t('Laser 90° Siku Presisi', 'Laser 90° Precision')}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                {t(
                  'Kalibrasi optik laser digital memastikan pertemuan dinding 90° tegak lurus sempurna dengan deviasi nat marmer < 1mm.',
                  'Digital optical laser calibration verifies true perpendicularity across structural junctions with marble joint tolerances under 1mm.'
                )}
              </p>
            </div>
            <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
              <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">03</span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase">{t('Garansi Retensi 100 Hari', '100-Day Retention Warranty')}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                {t(
                  'Komitmen purna jual resmi tertulis dalam SPK berkekuatan hukum, ditambah inspeksi berkala 2x setahun untuk merawat kenyamanan Anda.',
                  'Legally documented handover retention commitment backed by twice-annual preventative inspections for complete post-occupancy peace of mind.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AEO & GEO OPTIMIZED FAQS (ACCORDION) */}
      <section id="faqs" className="py-24 bg-[#050505] border-b border-white/[0.08]">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-4xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
              {t('INFORMASI & PERTANYAAN POPULER', 'FREQUENTLY ASKED QUESTIONS')}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
              {t('Tanya Jawab Seputar Rancang Bangun', 'Answers to Common Commission Inquiries')}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto font-sans">
              {t(
                'Transparansi teknis, estimasi pembiayaan, hingga proteksi garansi purna jual untuk kenyamanan investasi Anda.',
                'Technical clarity, investment estimation parameters, and post-occupancy protection for your commission.'
              )}
            </p>
          </div>

          <div className="space-y-4">
            {WW_FAQS.map((faq, idx) => (
              <details
                key={faq.id}
                open={idx === 0}
                className="group border border-white/10 bg-[#0a0a0a] rounded-none reveal"
              >
                <summary className="list-none [&::-webkit-details-marker]:hidden w-full p-6 sm:p-7 flex justify-between items-center bg-[#111111] hover:bg-[#161616] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  <h3 className="font-display text-base sm:text-lg font-bold text-white text-left pr-4">
                    {lang === 'en' && faq.questionEn ? faq.questionEn : faq.questionId}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 border border-white/20 flex items-center justify-center font-mono text-lg text-amber-400 shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="p-6 sm:p-7 border-t border-white/5 bg-[#0e0e0e] text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
                  {lang === 'en' && faq.answerEn ? faq.answerEn : faq.answerId}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 bg-[#000000] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
            {t('Siap Mewujudkan Visi Arsitektur Anda?', 'Ready to Build Your Architectural Commission?')}
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto font-sans">
            {t(
              'Hubungi tim estimator dan project manager kami untuk konsultasi teknis dan penyusunan RAB transparan zero hidden cost.',
              'Connect directly with our estimating and project management team for technical feasibility and a transparent, zero-hidden-cost Bill of Quantities.'
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-none bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo flex items-center gap-2 min-h-[44px]"
            >
              <span>{t('Konsultasi Proyek', 'Consult Project')}</span>
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 rounded-none border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors min-h-[44px]"
            >
              {t('Lihat Portofolio', 'View Portfolio')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
