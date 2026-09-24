'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowUpRight, LuShieldCheck, LuAward, LuCheck, LuQuote } from 'react-icons/lu';
import HeroMedia from '@/components/ui/HeroMedia';
import FounderSvgPlaceholder from '@/components/ui/FounderSvgPlaceholder';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { filled } from '@/components/pages/copy';

type Copy = { anchorId?: string; titleId?: string; titleEn?: string; ledeId?: string; ledeEn?: string };

export function AboutHeroSection({ anchorId = 'hero', titleId, titleEn, ledeId, ledeEn }: Copy) {
  const { t } = useLanguage();
  const { hero } = useSiteContent();
  return (
    <section id={anchorId} className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
      <HeroMedia
        src={hero.about.video || undefined}
        poster={hero.about.poster}
        alt={t(hero.about.alt, hero.about.altEn)}
        priority
      />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
        <div className="reveal-load">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
            {t(filled(titleId, 'Tentang Kami'), filled(titleEn, 'About Us'))}
          </h1>
          <div className="w-20 h-[1.5px] bg-white/25 mx-auto mb-6" />
          <p className="font-mono text-sm sm:text-lg text-amber-400/90 font-medium tracking-[0.2em] uppercase max-w-2xl mx-auto">
            {t(
              filled(ledeId, 'Studio rancang bangun di Surabaya yang mendesain, menghitung struktur, dan membangun dalam satu tim.'),
              filled(ledeEn, 'A Surabaya design-build studio that designs, engineers, and builds with one team.')
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export function AboutNarrativeSection({ anchorId = 'narrative' }: Copy) {
  const { t } = useLanguage();
  return (
    <section id={anchorId} className="py-24 md:py-32 border-b border-white/[0.08] relative">
      <div className="max-w-reading mx-auto px-6 sm:px-12 md:px-16 text-center">
        <div className="space-y-8 reveal">
          <p className="font-sans text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-relaxed">
            {t(
              'Wonderful Works Construction adalah studio rancang bangun untuk rumah tinggal dan bangunan komersial di Surabaya, Sidoarjo, dan Gresik.',
              'Wonderful Works Construction is a design-build studio for homes and commercial buildings in Surabaya, Sidoarjo, and Gresik.'
            )}
          </p>
          <div className="w-12 h-[1px] bg-white/20 mx-auto" />
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto font-sans">
            {t(
              'Desain arsitektur, interior, dan konstruksi dikerjakan oleh satu tim. Perhitungan struktur dibuat insinyur sipil, material dicek sebelum dipasang, dan setiap tahap dilaporkan ke pemilik.',
              'Architecture, interiors, and construction are handled by one team. Structural calculations are done by civil engineers, materials are checked before installation, and every stage is reported to the owner.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export function AboutPhilosophySection({ anchorId = 'philosophy' }: Copy) {
  const { lang, t } = useLanguage();
  const { philosophies } = useSiteContent();
  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] relative">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Static Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 reveal">
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.02] mb-6">
              {t('Filosofi Desain Kami', 'Our Design Philosophy')}
            </h2>
            <div className="w-16 h-[1.5px] bg-white/25 mb-6" />
            <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
              {t(
                'Tiga prinsip yang kami pakai saat menggambar, memilih material, dan menghitung struktur.',
                'Three principles we apply when drawing, choosing materials, and calculating structure.'
              )}
            </p>
          </div>

          {/* Right Interactive Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {philosophies.map((p, idx) => (
              <details
                key={p.num}
                open={idx === 0}
                className="group border border-white/10 hover:border-amber-400/50 transition-colors bg-[#0a0a0a] reveal"
              >
                <summary className="list-none [&::-webkit-details-marker]:hidden p-6 sm:p-8 flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  <span className="flex items-center gap-5 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base font-bold text-amber-400">
                      {p.num}
                    </span>
                    <span className="block">
                      <h3 className="font-display text-xl sm:text-2xl text-white uppercase font-bold tracking-wide">
                        {p.title}
                      </h3>
                      <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mt-1">
                        {lang === 'en' && p.taglineEn ? p.taglineEn : p.tagline}
                      </span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-2xl text-amber-400 font-mono font-light ml-4 transition-transform duration-300 ease-expo group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <div className="bg-[#121212] border-t border-white/5 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7">
                    <p className="text-base sm:text-lg text-neutral-200 font-sans leading-relaxed mb-6 font-normal">
                      &ldquo;{lang === 'en' && p.descEn ? p.descEn : p.desc}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-6 font-light">
                      {lang === 'en' && p.executionEn ? p.executionEn : p.execution}
                    </p>
                    <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                      <span className="text-neutral-300 block mb-1">
                        {t('MATERIAL:', 'MATERIALS:')}
                      </span>
                      <span className="text-neutral-300">
                        {lang === 'en' && p.materialEn ? p.materialEn : p.material}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-5 relative aspect-[4/3] overflow-hidden border border-white/10 media-reveal">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutFounderSection({ anchorId = 'founder' }: Copy) {
  const { lang, t } = useLanguage();
  const { founders, contact } = useSiteContent();
  const founder = founders[0];
  if (!founder) return null;
  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#030303] scroll-mt-20 w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Header Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 reveal">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
              The<br />Founder
            </h2>
            <div className="w-16 h-[1.5px] bg-white/25 mb-6" />
            <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
              {t(
                'Memimpin perencanaan arsitektur dan pelaksanaan konstruksi, dari studi tapak hingga serah terima.',
                'Leads architectural planning and construction, from site study to handover.'
              )}
            </p>

            <div className="space-y-3 font-mono text-xs text-neutral-400 mb-8">
              <div className="flex items-center gap-3 text-neutral-300">
                <LuShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t(founder.role, founder.roleEn ?? founder.role)}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <LuAward className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WONDERFUL WORKS · SURABAYA</span>
              </div>
            </div>
          </div>

          {/* Right Single Founder Card Showcase with SVG Placeholder */}
          <div className="lg:col-span-7 rounded-none bg-[#080808] border border-white/10 hover:border-amber-400/60 p-6 sm:p-10 transition-all duration-500 ease-expo flex flex-col justify-between shadow-2xl reveal">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
              {/* Vector Silhouette Portrait Box */}
              <div className="md:col-span-6">
                <div className="relative aspect-[3/4] w-full rounded-none overflow-hidden border border-white/15 bg-black shadow-inner">
                  {founder.image ? (
                    <Image
                      src={founder.image}
                      alt={`${founder.name} - ${founder.role}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-expo brightness-[0.9] group-hover:brightness-100"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <FounderSvgPlaceholder
                      title={t(founder.role, founder.roleEn ?? founder.role)}
                      subtitle={founder.name}
                    />
                  )}
                </div>
              </div>

              {/* Founder Details */}
              <div className="md:col-span-6 space-y-4">
                <span className="px-3 py-1 rounded-none bg-amber-500/10 border border-amber-500/30 font-mono text-[11px] tracking-widest text-neutral-400 uppercase inline-block">
                  {t(founder.role, founder.roleEn ?? founder.role)}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                  {founder.name}
                </h3>
                <div className="font-mono text-xs text-amber-400/90 tracking-wider uppercase">
                  {t(founder.focus, founder.focusEn ?? founder.focus)}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light font-sans">
                  {t(
                    founder.bio,
                    founder.bioEn ?? founder.bio
                  )}
                </p>
              </div>
            </div>

            {/* Quote Banner */}
            {founder.quote && (
              <div className="p-6 rounded-none bg-[#111111] border border-white/10 mb-8 relative">
                <LuQuote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
                <p className="font-serif italic text-sm sm:text-base text-neutral-200 leading-relaxed pr-8">
                  &ldquo;{t(founder.quote, founder.quoteEn || founder.quote)}&rdquo;
                </p>
              </div>
            )}

            {/* Verified Credentials */}
            {((lang === 'en' && founder.credentialsEn?.length ? founder.credentialsEn : founder.credentials) ?? []).length > 0 && (
              <div className="space-y-2.5 pt-6 border-t border-white/[0.08]">
                <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block mb-3 font-bold">
                  {t('PENDIDIKAN:', 'EDUCATION:')}
                </span>
                {(lang === 'en' && founder.credentialsEn?.length ? founder.credentialsEn : founder.credentials)?.map((cred) => (
                  <div key={cred} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                    <LuCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-3">
              <span>WONDERFUL WORKS</span>
              <span className="text-amber-400">
                {t('KONSULTASI LANGSUNG:', 'DIRECT CONSULTATION:')} {contact.whatsappLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutCtaSection({ anchorId = 'cta' }: Copy) {
  const { t } = useLanguage();
  const { waLink } = useSiteContent();
  return (
    <section id={anchorId} className="py-20 bg-[#080808] border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
          {t('Mulai Diskusi Proyek Anda', 'Discuss Your Project')}
        </h3>
        <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto font-sans">
          {t(
            'Diskusikan rencana hunian privat atau bangunan komersial Anda langsung bersama tim arsitek dan insinyur Wonderful Works Construction.',
            'Talk through your home or commercial project directly with the Wonderful Works Construction architects and engineers.'
          )}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 ease-expo shadow-xl min-h-[44px]"
          >
            <span>{t('Jadwalkan Konsultasi', 'Book a Consultation')}</span>
            <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href={waLink(t('Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.', 'Hello Wonderful Works Construction, I would like to consult on a design & build project.'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-mono text-xs uppercase tracking-widest rounded-none transition-all duration-300 ease-expo min-h-[44px]"
          >
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </section>
  );
}
