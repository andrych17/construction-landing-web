'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import {
  LuArrowUpRight,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuClock,
  LuMapPin,
  LuPause,
  LuPhone,
  LuPlay,
  LuScale,
  LuShieldCheck,
} from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import ProjectInspectionModal, { type ProjectDetail } from '@/components/interactive/ProjectInspectionModal';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import HeroMedia from '@/components/ui/HeroMedia';
import FounderSvgPlaceholder from '@/components/ui/FounderSvgPlaceholder';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { HOME_HERO_COPY } from '@/components/home/hero-copy';
import { filled } from '@/components/pages/copy';
import { CENTRA_SERVICES } from '@/data/siteData';

function formatHeroIntro(text: string) {
  // Highlight quoted phrases like "Quality is our priority"
  const parts = text.split(/("Quality is our priority"|“Quality is our priority”|"[^"]+"|[“"][^”"]+[”"])/gi);
  if (parts.length <= 1) return text;
  return parts.map((part, idx) => {
    if (part.startsWith('"') || part.startsWith('“') || part.startsWith('”')) {
      const clean = part.replace(/^[“"]|[”"]$/g, '');
      return (
        <span key={idx} className="text-amber-400 font-semibold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          &ldquo;{clean}&rdquo;
        </span>
      );
    }
    return part;
  });
}

export function HeroSection({
  anchorId = 'hero',
  line1Id,
  line1En,
  line2Id,
  line2En,
  line3Id,
  line3En,
  introId,
  introEn,
}: {
  anchorId?: string;
  line1Id?: string;
  line1En?: string;
  line2Id?: string;
  line2En?: string;
  line3Id?: string;
  line3En?: string;
  introId?: string;
  introEn?: string;
}) {
  const { t } = useLanguage();
  const { hero, waLink } = useSiteContent();

  return (
    <section
      id={anchorId}
      className="relative pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-48 lg:pb-28 overflow-hidden border-b border-white/[0.08] w-full"
    >
      <HeroMedia src={hero.home.video || undefined} poster={hero.home.poster} alt={t(hero.home.alt, hero.home.altEn)} priority />

      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-white tracking-tight uppercase leading-[1.02] mb-6 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] reveal-load break-words">
          {t(filled(line1Id, HOME_HERO_COPY.line1Id), filled(line1En, HOME_HERO_COPY.line1En))}<br />
          <span className="text-white">{t(filled(line2Id, HOME_HERO_COPY.line2Id), filled(line2En, HOME_HERO_COPY.line2En))}</span><br />
          <span className="text-amber-400 font-extrabold">{t(filled(line3Id, HOME_HERO_COPY.line3Id), filled(line3En, HOME_HERO_COPY.line3En))}</span>
        </h1>

        <p className="text-neutral-100 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto mb-10 font-sans reveal-load reveal-delay-1 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
          {formatHeroIntro(t(filled(introId, HOME_HERO_COPY.introId), filled(introEn, HOME_HERO_COPY.introEn)))}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-16 reveal-load reveal-delay-2 max-w-md sm:max-w-none mx-auto">
          <a
            href={waLink(t('Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.', 'Hello Wonderful Works Construction, I would like to consult on a design & build project.'))}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo min-h-[48px] flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          >
            <LuPhone className="w-4 h-4 text-black" />
            <span>{t('KONSULTASI RANCANG BANGUN', 'CONSULT DESIGN & BUILD')}</span>
            <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <Link
            href="/projects"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-mono text-xs font-bold uppercase tracking-widest transition-colors min-h-[48px] flex items-center justify-center"
          >
            {t('LIHAT PORTOFOLIO PROYEK', 'VIEW PROJECT PORTFOLIO')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-8 border-t border-white/10 reveal-load reveal-delay-3">
          <div className="p-6 bg-black/75 backdrop-blur-md border border-white/10 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-white uppercase">{t('Struktur SNI', 'SNI Structure')}</span>
              <LuShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div className="font-display text-sm font-bold text-amber-400 uppercase mb-1">
              {t('Safety Factor SNI', 'Safety Factor Standard')}
            </div>
            <div className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              {t('Prioritas struktur kokoh sesuai Safety Factor SNI & ReadyMix K-350', 'Structural priority complying with SNI safety factor standards')}
            </div>
          </div>

          <div className="p-6 bg-black/75 backdrop-blur-md border border-white/10 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-white uppercase">{t('No Hidden Cost', 'No Hidden Cost')}</span>
              <LuScale className="w-5 h-5 text-amber-400" />
            </div>
            <div className="font-display text-sm font-bold text-amber-400 uppercase mb-1">
              {t('RAB Terbuka & Detail', 'Itemized BOQ')}
            </div>
            <div className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              {t('Budget sudah ditentukan di awal dengan rincian RAB per item', 'Budget itemized from day one with transparent BOQ')}
            </div>
          </div>

          <div className="p-6 bg-black/75 backdrop-blur-md border border-white/10 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-white uppercase">{t('Tepat Waktu', 'On Time')}</span>
              <LuClock className="w-5 h-5 text-amber-400" />
            </div>
            <div className="font-display text-sm font-bold text-amber-400 uppercase mb-1">
              {t('Jadwal Terukur', 'Tracked Schedule')}
            </div>
            <div className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              {t('Manajemen jadwal dipantau berkala dengan Kurva-S', 'Milestones tracked on an S-curve schedule')}
            </div>
          </div>

          <div className="p-6 bg-black/75 backdrop-blur-md border border-white/10 hover:border-amber-400/50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-white uppercase">{t('Quality Control', 'Quality Control')}</span>
              <LuCircleCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div className="font-display text-sm font-bold text-amber-400 uppercase mb-1">
              {t('Struktur & Finishing', 'Structure & Finishing')}
            </div>
            <div className="text-xs text-neutral-300 font-sans font-light leading-relaxed">
              {t('Pengawasan presisi langsung dari struktur sipil hingga tahap finishing', 'Direct supervision from structural core to final finishing')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection({ anchorId = 'about' }: { anchorId?: string }) {
  const { t } = useLanguage();

  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] relative w-full scroll-mt-20">
      <div className="max-w-reading mx-auto px-6 sm:px-12 md:px-16 reveal">
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-10">
          {t('Tentang Kami', 'About Us')}
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-neutral-200 leading-relaxed font-sans font-normal mb-6">
          {t(
            'Kami adalah perusahaan jasa konstruksi dan rancang bangun yang berfokus pada kualitas. Wonderful Works percaya bahwa dedikasi terhadap mutu struktur dan presisi detail akan membuat bangunan Anda menjadi bangunan yang mewah, megah, dan kokoh.',
            'Wonderful Works is a design-build and construction company dedicated to uncompromising quality. We believe that rigorous structural integrity and meticulous craftsmanship create buildings that are luxurious, grand, and enduring.'
          )}
        </p>

        <p className="text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-sans font-light mb-12">
          {t(
            'Perusahaan kami memiliki visi dan misi yang kami pegang teguh untuk memberikan pelayanan terbaik bagi Anda. Kami bekerja sepenuh hati dan melayani setiap kebutuhan pembangunan dengan solusi yang tepat, transparan, dan terpercaya demi kepuasan klien.',
            'Guided by our steadfast vision and mission, we deliver wholehearted service and precise solutions for every construction need. Client satisfaction is our foremost priority, realized through transparent management and trusted execution.'
          )}
        </p>

        <Link
          href="/about"
          className="group inline-flex items-center gap-2 border-b border-white/25 hover:border-amber-400 pb-1 text-neutral-200 hover:text-amber-400 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <span>{t('Tentang Studio', 'About Studio')}</span>
          <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}

export function PhilosophySection({ anchorId = 'philosophy' }: { anchorId?: string }) {
  const { lang, t } = useLanguage();
  const { philosophies } = useSiteContent();

  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32 reveal">
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-6">
              {t('Filosofi Desain Kami', 'Our Design Philosophy')}
            </h2>
            <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
              {t(
                'Setiap proyek dimulai dari cara ruang itu akan dipakai dan material yang cocok untuknya.',
                'Every project starts with how the space will be used and which materials suit it.'
              )}
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {philosophies.map((p, idx) => (
              <details
                key={p.num}
                open={idx === 0}
                className="group border border-white/10 bg-[#0a0a0a] reveal"
              >
                <summary className="list-none [&::-webkit-details-marker]:hidden w-full p-6 sm:p-8 flex justify-between items-center bg-[#111111] hover:bg-[#161616] transition-colors min-h-[64px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                  <span className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-lg sm:text-xl font-bold text-amber-400">
                      {p.num}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                      {p.title}
                    </h3>
                    <span className="hidden md:inline font-mono text-xs text-neutral-400 tracking-wider">
                      — {lang === 'en' && p.taglineEn ? p.taglineEn : p.tagline}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 border border-white/20 flex items-center justify-center font-mono text-xl text-white shrink-0 ml-4 transition-all duration-300 ease-expo select-none group-hover:border-amber-400 group-hover:text-amber-400 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <div className="bg-[#181818] border-t border-white/5 p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
                      priority={idx === 0}
                      className="object-cover brightness-100 contrast-[1.02]"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

export function FounderSection({ anchorId = 'founder' }: { anchorId?: string }) {
  const { lang, t } = useLanguage();
  const { founders } = useSiteContent();

  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#030303] scroll-mt-20 w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 reveal">
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
              The<br />Founder
            </h2>
            <div className="w-16 h-[1.5px] bg-white/25 mb-6" />
            <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
              {t(
                'Memimpin perencanaan arsitektur dan pelaksanaan konstruksi, dari studi tapak hingga serah terima.',
                'Leading architectural planning and construction execution, from site feasibility to handover.'
              )}
            </p>
          </div>

          <div className="lg:col-span-7">
            {founders.map((founder) => (
              <div key={founder.name} className="group rounded-none bg-[#080808] border border-white/10 hover:border-amber-400/60 p-6 sm:p-10 transition-all duration-500 ease-expo shadow-2xl reveal">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
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
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-none bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                        {t(founder.role, founder.roleEn ?? founder.role)}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-6 space-y-4">
                    <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase">
                      {t(founder.role, founder.roleEn ?? founder.role)} · {t(founder.focus, founder.focusEn ?? founder.focus)}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors uppercase">
                      {founder.name}
                    </h3>
                    <div className="font-mono text-[11px] text-neutral-400">
                      {(lang === 'en' && founder.credentialsEn?.length ? founder.credentialsEn : founder.credentials)?.join(' · ')}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light font-sans">
                      {t(
                        founder.bio,
                        founder.bioEn ?? founder.bio
                      )}
                    </p>
                    {founder.quote && (
                      <blockquote className="border-l-2 border-amber-400 pl-3 py-1 text-xs text-neutral-400 italic">
                        &ldquo;{t(founder.quote, founder.quoteEn || founder.quote)}&rdquo;
                      </blockquote>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection({ anchorId = 'workflow' }: { anchorId?: string }) {
  const { lang, t } = useLanguage();
  const { methodology } = useSiteContent();

  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#020202] scroll-mt-20 w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 reveal">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
              {t('ALUR KERJA TERSTRUKTUR', 'STRUCTURED METHODOLOGY')}
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[0.95]">
              {t('Alur Kerja Kami', 'Our Workflow')}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed font-sans max-w-md">
            {t(
              'Dari survei lokasi hingga serah terima dan masa pemeliharaan, seluruh alur kerja dikerjakan secara transparan.',
              'From initial site survey to key handover and warranty maintenance, every stage is transparently managed.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {methodology.slice(0, 4).map((step) => (
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
                <span className="text-neutral-300 block mb-0.5 font-semibold">{t('DOKUMEN:', 'DELIVERABLE:')}</span>
                <span className="text-neutral-300">
                  {lang === 'en' && step.deliverableEn ? step.deliverableEn : step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methodology.slice(4).map((step) => (
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
                <span className="text-neutral-300 block mb-0.5 font-semibold">{t('DOKUMEN:', 'DELIVERABLE:')}</span>
                <span className="text-neutral-300">
                  {lang === 'en' && step.deliverableEn ? step.deliverableEn : step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 border-b border-white/25 hover:border-amber-400 pb-1 text-neutral-200 hover:text-amber-400 font-mono text-xs uppercase tracking-widest transition-colors"
          >
            <span>{t('Lihat Detail Layanan & 7 Alur Kerja', 'Explore Services & 7-Stage Methodology')}</span>
            <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const SERVICE_GALLERIES: Record<string, { img: string; tagId: string; tagEn: string }[]> = {
  RESIDENTIAL: [
    { img: '/images/projects/luxury_residence_hq.jpg', tagId: 'Modern Luxury', tagEn: 'Modern Luxury' },
    { img: '/images/services/res_modern_tropis.jpg', tagId: 'Modern Tropis', tagEn: 'Modern Tropical' },
    { img: '/images/projects/facade_architecture_hq.jpg', tagId: 'Modern Kontemporer', tagEn: 'Modern Contemporary' },
    { img: '/images/projects/tropical_facade_hq.jpg', tagId: 'Minimalis Modern', tagEn: 'Modern Minimalist' },
  ],
  COMMERCIAL: [
    { img: '/images/projects/jotun_showroom_hq.jpg', tagId: 'Showroom & Retail', tagEn: 'Showroom & Retail' },
    { img: '/images/services/com_modern_office.jpg', tagId: 'Perkantoran & Workspace', tagEn: 'Offices & Workspaces' },
    { img: '/images/projects/interior_craftsmanship_hq.jpg', tagId: 'Kuliner & Hospitality', tagEn: 'Culinary & Hospitality' },
    { img: '/images/services/com_logistics_warehouse.jpg', tagId: 'Pergudangan & Logistik', tagEn: 'Warehousing & Logistics' },
  ],
};

function ServiceCardWithCarousel({ srv }: { srv: (typeof CENTRA_SERVICES)[number] }) {
  const { lang, t } = useLanguage();
  const isResidential = srv.category.includes('RESIDENTIAL') || srv.category.includes('RUMAH');
  const slides = isResidential ? SERVICE_GALLERIES.RESIDENTIAL : SERVICE_GALLERIES.COMMERCIAL;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isHeld || prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length, isHeld, prefersReducedMotion]);

  const currentSlide = slides[activeSlide] || {
    img: srv.image,
    tagId: srv.category,
    tagEn: srv.categoryEn || srv.category,
  };

  return (
    <div
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      className="group rounded-none bg-[#0b0b0b] border border-white/10 hover:border-amber-400/80 overflow-clip transition-all duration-500 ease-expo flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] reveal"
    >
      <div>
        <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-black media-reveal">
          {/* All slides stay mounted so a change cross-dissolves instead of hard-cutting. */}
          {slides.map((slide, i) => (
            <Image
              key={slide.img}
              src={slide.img}
              alt={i === activeSlide ? t(slide.tagId, slide.tagEn) : ''}
              fill
              className={`object-cover group-hover:scale-105 transition-[opacity,scale] duration-1000 ease-expo brightness-100 contrast-[1.02] ${
                i === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/20 to-transparent" />
          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-none bg-black/75 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-widest text-amber-400 uppercase shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{t(currentSlide.tagId, currentSlide.tagEn)}</span>
          </div>

          <div className="absolute bottom-3 right-4 flex items-center gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeSlide === i ? 'bg-amber-400 w-5' : 'bg-white/40 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 uppercase">
            {isResidential
              ? t('Bangunan Residensial', 'Residential Building')
              : t('Bangunan Komersial', 'Commercial Building')}
          </h3>
          <p className="font-serif text-base text-amber-400/90 italic mb-4">
            &ldquo;{lang === 'en' && srv.subtitleEn ? srv.subtitleEn : srv.subtitle}&rdquo;
          </p>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-8">
            {lang === 'en' && srv.descEn ? srv.descEn : srv.desc}
          </p>

          <div className="mb-6">
            <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mb-3 font-bold">
              {t('CAKUPAN KERJA & GAYA:', 'WHAT WE DO & STYLES:')}
            </span>
            <div className="flex flex-wrap gap-2">
              {(lang === 'en' && srv.typesEn ? srv.typesEn : srv.types).map((type) => (
                <span
                  key={type}
                  className="px-3.5 py-1.5 rounded-none bg-white/5 border border-white/10 font-mono text-xs text-neutral-200"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-2.5 font-mono text-xs text-neutral-300">
            {(lang === 'en' && srv.featuresEn ? srv.featuresEn : srv.features).map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <LuCircleCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 sm:px-10 pb-8 pt-2">
        <a
          href="#contact"
          className="group w-full py-3.5 rounded-none border border-white/20 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 ease-expo flex items-center justify-center gap-2 font-bold"
        >
          <span>
            {isResidential
              ? t('Konsultasi Residensial', 'Inquire Residential')
              : t('Konsultasi Komersial', 'Inquire Commercial')}
          </span>
          <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}

export function ServicesSection({ anchorId = 'services' }: { anchorId?: string }) {
  const { t } = useLanguage();
  const { services } = useSiteContent();

  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] scroll-mt-20 w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="max-w-3xl mb-16 reveal">
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase mb-4">
            {t('Layanan Kami', 'Services')}
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
            {t(
              'Layanan rancang bangun untuk hunian dan bangunan komersial, dikerjakan dengan disiplin teknik sipil dan pengawasan lapangan langsung.',
              'Design and build services for residential and commercial architecture, delivered with civil engineering discipline and direct on-site supervision.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-20">
          {services.map((srv) => (
            <ServiceCardWithCarousel key={srv.category} srv={srv} />
          ))}
        </div>

        <div className="pt-14 border-t border-white/[0.08] flex justify-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 border-b border-white/25 hover:border-amber-400 pb-1 text-neutral-200 hover:text-amber-400 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>{t('Layanan & Alur Kerja 7 Tahap', 'Services & 7-Stage Methodology')}</span>
            <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({ anchorId = 'projects' }: { anchorId?: string }) {
  const { lang, t } = useLanguage();
  const { projects } = useSiteContent();
  const pathname = usePathname();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const autoScrollActive = !pathname.startsWith('/admin') && !isHovered && !isPaused && !prefersReducedMotion;

  useEffect(() => {
    const container = carouselRef.current;
    if (!container || !autoScrollActive) return;

    let animId: number;
    const speed = 0.85;

    const step = () => {
      const halfWidth = container.scrollWidth / 2;
      if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
        container.scrollLeft -= halfWidth;
      } else {
        container.scrollLeft += speed;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [autoScrollActive]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <section id={anchorId} className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full overflow-clip bg-[#000000]">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="flex justify-between items-end mb-12 pb-6 border-b border-white/[0.08] gap-6 reveal">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase">
              {t('Proyek', 'Projects')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setIsPaused((v) => !v)}
                className="w-11 h-11 rounded-none border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={isPaused ? t('Jalankan gerak otomatis galeri proyek', 'Resume carousel') : t('Jeda gerak otomatis galeri proyek', 'Pause carousel')}
                aria-pressed={isPaused}
              >
                {isPaused ? <LuPlay className="w-4 h-4" /> : <LuPause className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={() => scrollCarousel('left')}
              className="w-11 h-11 rounded-none border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={t('Proyek Sebelumnya', 'Previous Projects')}
            >
              <LuChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel('right')}
              className="w-11 h-11 rounded-none border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={t('Proyek Berikutnya', 'Next Projects')}
            >
              <LuChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          role="region"
          aria-label={t('Galeri proyek pilihan', 'Selected projects gallery')}
          tabIndex={0}
          className="flex gap-7 overflow-x-auto scrollbar-none pb-6 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm reveal"
        >
          {[...projects, ...projects].map((proj, idx) => {
            const isClone = idx >= projects.length;
            return (
              <button
                key={`${proj.title}-${idx}`}
                type="button"
                onClick={() => setSelectedProject(proj)}
                aria-hidden={isClone}
                tabIndex={isClone ? -1 : 0}
                className="w-[82vw] max-w-[340px] sm:max-w-none sm:w-[440px] md:w-[500px] lg:w-[540px] shrink-0 group cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-none"
              >
                <span className="sr-only">{t(`Lihat detail proyek ${proj.title}`, `View details for project ${proj.title}`)}</span>
                <div className="relative h-[320px] sm:h-[460px] md:h-[520px] w-full overflow-hidden bg-neutral-900 mb-5 border border-white/10 group-hover:border-white/40 transition-colors duration-500 ease-expo">
                  <Image
                    src={proj.img}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-expo group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 440px, 540px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-25 transition-opacity duration-500 ease-expo" />

                  <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-widest text-neutral-200 uppercase">
                    {(lang === 'en' && proj.categoryEn) ? proj.categoryEn : proj.category}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute bottom-4 right-4 w-11 h-11 flex items-center justify-center bg-white text-black translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-expo"
                  >
                    <LuArrowUpRight className="w-5 h-5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div className="flex justify-between items-baseline px-1 gap-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-xs text-neutral-400 shrink-0">{proj.location}</span>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-3 block h-px w-0 bg-amber-400 transition-[width] duration-500 ease-expo group-hover:w-full"
                />
              </button>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-none border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-400 hover:text-black text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 ease-expo min-h-[48px] font-bold shadow-lg"
          >
            <span>{t(`Lihat Semua ${projects.length} Proyek`, `View All ${projects.length} Projects`)}</span>
            <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <ProjectInspectionModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

export function ContactSection({ anchorId = 'contact' }: { anchorId?: string }) {
  const { t } = useLanguage();
  const { contact, waLink } = useSiteContent();

  return (
    <section id={anchorId} className="py-28 md:py-36 bg-[#000000] border-t border-white/[0.08] scroll-mt-20 w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-6 reveal">
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.92] mb-6">
              {t('Kontak', 'Contact')}
            </h2>
            <div className="w-24 h-[1.5px] bg-white/25 mb-8" />
            <p className="font-sans text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-md">
              {t(
                'Konsultasikan kebutuhan rancang bangun hunian dan komersial Anda bersama tim kami.',
                'Discuss your residential and commercial design & build needs with our team.'
              )}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-10 reveal">
            <div className="pb-6 border-b border-white/10">
              <ModernWwLogo variant="full" size="lg" />
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-4">
                {t('KONSULTASI & TANYA JAWAB', 'FOR INQUIRIES')}
              </h3>
              <div className="space-y-4 font-sans text-base sm:text-lg">
                <div>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-white hover:text-amber-400 transition-colors font-serif tracking-wide block"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <span className="text-neutral-400 font-serif tracking-wide block">
                      {contact.emailLabel}
                    </span>
                  )}
                </div>
                <div>
                  {contact.whatsapp ? (
                    <a
                      href={waLink(t('Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.', 'Hello Wonderful Works Construction, I would like to consult on a design & build project.'))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-amber-400 transition-colors font-mono tracking-wider block"
                    >
                      {contact.whatsappLabel}
                    </a>
                  ) : (
                    <span className="text-neutral-400 font-mono tracking-wider block">
                      {contact.whatsappLabel}
                    </span>
                  )}
                </div>
                <div>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-white transition-colors font-mono text-sm tracking-wider inline-flex items-center gap-2"
                  >
                    <FaInstagram className="w-4 h-4" />
                    <span>{contact.instagramHandle}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-mono">
              <div>
                <div className="text-white font-bold mb-1 flex items-center gap-2 uppercase">
                  <LuMapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{contact.studio.name || 'OFFICE'}</span>
                </div>
                <address className="text-neutral-400 leading-relaxed not-italic">
                  {contact.studio.lines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </address>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-none bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo inline-flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] shadow-lg w-full sm:w-auto"
              >
                <span>{t('Hubungi Kami', 'Contact Us')}</span>
                <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              {contact.whatsapp && (
                <a
                  href={waLink(t('Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.', 'Hello Wonderful Works Construction, I would like to consult on a design & build project.'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-none border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 ease-expo inline-flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] w-full sm:w-auto"
                >
                  <LuPhone className="w-4 h-4 text-amber-400" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
