'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight, LuCircleCheck } from 'react-icons/lu';
import HeroMedia from '@/components/ui/HeroMedia';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { filled } from '@/components/pages/copy';

type Copy = { anchorId?: string; titleId?: string; titleEn?: string; ledeId?: string; ledeEn?: string };

export function ServicesHeroSection({ anchorId = 'hero', titleId, titleEn, ledeId, ledeEn }: Copy) {
  const { t } = useLanguage();
  const { hero } = useSiteContent();
  return (
    <section id={anchorId} className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
      <HeroMedia
        src={hero.services.video || undefined}
        poster={hero.services.poster}
        alt={t(hero.services.alt, hero.services.altEn)}
        priority
      />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
        <div className="reveal-load">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
            {t(filled(titleId, 'Layanan'), filled(titleEn, 'Services'))}
          </h1>
          <div className="w-20 h-[1.5px] bg-white/25 mx-auto mb-6" />
          <p className="font-mono text-sm sm:text-lg text-amber-400/90 font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto">
            {t(
              filled(ledeId, 'Desain arsitektur, perhitungan struktur, dan pelaksanaan lapangan, dikerjakan oleh satu tim.'),
              filled(ledeEn, 'Architectural design, structural calculation, and site execution, handled by one team.')
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ServicesOverviewSection({ anchorId = 'overview' }: Copy) {
  const { t } = useLanguage();
  return (
    <section id={anchorId} className="py-20 md:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-reading mx-auto px-6 sm:px-12 text-center">
        <div className="reveal">
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-neutral-200 leading-[2.1] sm:leading-[2.3] tracking-wide font-normal mb-8">
            <strong className="text-white font-bold">Wonderful Works Construction</strong>{' '}
            {t(
              'mengerjakan desain dan konstruksi dalam satu alur: studi tapak, RAB terbuka, pelaksanaan, serah terima, sampai masa pemeliharaan.',
              'handles design and construction as one process: site study, itemized budget, construction, handover, and the maintenance period after.'
            )}
          </p>
          <div className="font-mono text-xs text-neutral-400 tracking-[0.2em] uppercase">
            {t(
              'STANDAR SNI K-350 · KONTRAK KERJA TRANSPARAN · PENGAWASAN LANGSUNG INSINYUR',
              'SNI K-350 CONCRETE · TRANSPARENT CONTRACTS · DIRECT ENGINEER SUPERVISION'
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesPillarsSection({ anchorId = 'pillars' }: Copy) {
  const { lang, t } = useLanguage();
  const { services } = useSiteContent();
  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] w-full">
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
              'Dari rumah tinggal dan villa sampai kantor, showroom, dan klinik.',
              'From homes and villas to offices, showrooms, and clinics.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {services.map((srv) => (
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
  );
}

export function ServicesMethodSection({ anchorId = 'method' }: Copy) {
  const { lang, t } = useLanguage();
  const { methodology } = useSiteContent();
  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#020202] w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="max-w-3xl mb-16 reveal">
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase mb-4">
            {t('Alur Kerja 10 Tahap', '10-Stage Workflow')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans">
            {t(
              'Dari konsultasi pertama sampai masa garansi, setiap tahap menghasilkan dokumen yang bisa Anda periksa.',
              'From the first consultation to the end of the warranty, every stage produces a document you can check.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {methodology.map((step) => (
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
  );
}

export function ServicesBenchmarksSection({ anchorId = 'benchmarks' }: Copy) {
  const { t } = useLanguage();
  return (
    <section id={anchorId} className="py-24 bg-[#080808] border-b border-white/[0.08]">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
            <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">01</span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase">{t('Beton SNI K-350', 'SNI K-350 Concrete')}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
              {t(
                'Setiap truk ReadyMix diuji slump sebelum dicor. Pembesian ganda dirancang tahan gempa.',
                'Every ReadyMix truck is slump-tested before pouring. Double rebar cages are designed for seismic loads.'
              )}
            </p>
          </div>
          <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
            <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">02</span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase">{t('Siku 90° dengan Laser', 'Laser-Set 90° Corners')}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
              {t(
                'Pertemuan dinding dicek dengan laser digital supaya benar-benar siku. Deviasi nat marmer di bawah 1 mm.',
                'Wall junctions are checked with a digital laser for true right angles. Marble joint deviation stays under 1 mm.'
              )}
            </p>
          </div>
          <div className="p-8 rounded-none bg-[#0d0d0d] border border-white/10">
            <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">03</span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 uppercase">{t('Garansi Retensi 100 Hari', '100-Day Retention Warranty')}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
              {t(
                'Masa retensi tertulis di SPK, ditambah inspeksi dua kali setahun setelah bangunan Anda tempati.',
                'The retention period is written into the SPK, with inspections twice a year after you move in.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesFaqSection({ anchorId = 'faqs' }: Copy) {
  const { lang, t } = useLanguage();
  const { faqs } = useSiteContent();
  return (
    <section id={anchorId} className="py-24 bg-[#050505] border-b border-white/[0.08]">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-4xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
            {t('INFORMASI & PERTANYAAN POPULER', 'FREQUENTLY ASKED QUESTIONS')}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
            {t('Tanya Jawab Seputar Rancang Bangun', 'Common Questions About Design & Build')}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light max-w-xl mx-auto font-sans">
            {t(
              'Soal mutu beton, RAB, perizinan, garansi, dan wilayah layanan.',
              'On concrete quality, budgets, permits, warranty, and service area.'
            )}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
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
  );
}

export function ServicesCtaSection({ anchorId = 'cta' }: Copy) {
  const { t } = useLanguage();
  return (
    <section id={anchorId} className="py-20 bg-[#000000] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
          {t('Mulai dari Konsultasi dan RAB', 'Start with a Consultation and a Budget')}
        </h3>
        <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto font-sans">
          {t(
            'Ceritakan lahan dan kebutuhan Anda. Tim estimator dan project manager kami akan menyusun RAB terperinci tanpa biaya tersembunyi.',
            'Tell us about your site and requirements. Our estimators and project managers will prepare an itemized budget with no hidden costs.'
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
  );
}
