'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  LuArrowUpRight,
  LuPhone,
  LuMapPin,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuPause,
  LuPlay,
} from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import ProjectInspectionModal, { ProjectDetail } from '@/components/interactive/ProjectInspectionModal';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import HeroMedia from '@/components/ui/HeroMedia';
import FounderSvgPlaceholder from '@/components/ui/FounderSvgPlaceholder';

import {
  ROTATING_DISCIPLINES,
  ROTATING_DISCIPLINES_EN,
  WW_PHILOSOPHIES,
  WW_FOUNDERS,
  CENTRA_SERVICES,
  WW_PROJECTS,
  SITE_CONTACT,
  waLink,
} from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';

export default function MainLayout() {
  const { lang, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  // framer-motion sudah terpasang; pakai hook-nya, jangan tulis matchMedia sendiri.
  const prefersReducedMotion = useReducedMotion();

  // Auto-glide kontinu ala Swiper autoplay.
  // Berhenti saat hover, saat dijeda manual, atau saat reduced-motion aktif
  // (WCAG 2.2.2 mensyaratkan gerak otomatis >5 detik bisa dihentikan).
  const autoScrollActive = !isHovered && !isPaused && !prefersReducedMotion;

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
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">

      {/* 2. Full-Width Luxury Minimalist Navigation */}
      <Navbar />

      {/* 3. MONUMENTAL CINEMATIC HERO */}
      <section
        id="hero"
        className="relative min-h-[100dvh] flex items-end justify-center pb-20 pt-28 sm:pt-36 overflow-hidden border-b border-white/[0.08] w-full"
      >
        <HeroMedia src="/videos/hero.mp4" poster="/images/projects/hero_poster.jpg" priority />

        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 text-center max-w-frame mx-auto">
          {/* Monumental Baskervville Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl lg:text-[11.5rem] font-normal text-white tracking-tight leading-[0.95] mb-4 lowercase drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] reveal-load">
            ww.cons
          </h1>

          {/* Disiplin studio — statis */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-4xl lg:text-5xl text-white/90 tracking-wide leading-[1.3] mb-5 drop-shadow-md reveal-load reveal-delay-1 max-w-4xl mx-auto">
            {(lang === 'en' ? ROTATING_DISCIPLINES_EN : ROTATING_DISCIPLINES).join(' · ')}
          </p>

          {/* Subtitle */}
          <p className="text-neutral-200 text-sm sm:text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-10 reveal-load reveal-delay-2">
            {t('Mewujudkan Visi Anda dengan Keahlian Keteknikan Presisi', 'Bringing Your Vision to Life with Expert Craftmanship')}
          </p>

          {/* Minimalist Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 reveal-load reveal-delay-3 max-w-md sm:max-w-none mx-auto">
            <Link
              href="/projects"
              className="group px-8 py-4 rounded-none bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo min-h-[48px] flex items-center justify-center gap-2 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shadow-lg w-full sm:w-auto"
            >
              <span>{t('Lihat Proyek', 'View Projects')}</span>
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-none border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors min-h-[48px] flex items-center justify-center active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 w-full sm:w-auto"
            >
              {t('Tentang Kami', 'About Us')}
            </Link>
          </div>
        </div>

      </section>

      {/* 4. ABOUT US (STUDIO ETHOS & MANIFESTO) */}
      <section id="about" className="py-28 md:py-36 border-b border-white/[0.08] relative w-full scroll-mt-20">
        <div className="max-w-reading mx-auto px-6 sm:px-12 md:px-16 reveal">
          <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[0.95] mb-12">
            {t('Tentang Kami', 'About Us')}
          </h2>

          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-100 leading-[1.7] font-normal mb-10">
            {t(
              'Wonderful Works (ww.cons) adalah studio arsitektur, desain interior spasial, dan kontraktor umum terkemuka di Surabaya yang berspesialisasi pada hunian mewah dan ruang komersial prestisius. Kami menciptakan lingkungan luar biasa yang memadukan kemewahan, inovasi material, dan seni keteknikan tingkat tinggi.',
              'Wonderful Works (ww.cons) is a leading architecture, interior design, and general contracting firm specializing in high-end residential and commercial spaces. We create extraordinary environments that blend luxury, innovation, and artistry, crafting unique designs that elevate lifestyles and reflect individuality.'
            )}
          </p>

          <p className="font-serif text-lg sm:text-xl text-neutral-400 leading-[1.9] font-normal mb-14">
            {t(
              'Pendekatan kami melampaui sekadar estetika visual — kami merancang ruang yang menginspirasi kenyamanan, mempererat koneksi, dan mendukung gaya hidup berkualitas. Dengan memadukan gagasan berani, detail cermat, dan material pilihan berstandar SNI, kami menghadirkan hasil karya yang fungsional sekaligus menakjubkan.',
              'Our approach goes beyond aesthetics—we design spaces that inspire well-being, foster connections, and support fulfilling lifestyles. By combining bold ideas, thoughtful details, and innovative materials, we deliver designs that are both functional and breathtaking. At ww.cons, every project is a collaboration to create spaces that feel personal, timeless, and truly extraordinary.'
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

      {/* 5. OUR DESIGN PHILOSOPHY ACCORDION */}
      <section id="philosophy" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column (Sticky on Desktop) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 reveal">
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.08] mb-6">
                {t('Filosofi Desain Kami', 'Our Design Philosophy')}
              </h2>
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                {t(
                  'Setiap proyek dimulai dari tujuan ruang dan kejujuran material.',
                  'Every project begins with spatial purpose and the honesty of materials.'
                )}
              </p>
            </div>

            {/* Right Accordion Column */}
            {/* <details> native: buka/tutup, keyboard, dan ARIA sudah ditangani
                browser. Versi sebelumnya memakai state + animasi tinggi JS,
                sehingga isi accordion tidak pernah terlihat kalau animasinya
                tidak selesai — persis bug void hitam di halaman ini. */}
            <div className="lg:col-span-8 space-y-6">
              {WW_PHILOSOPHIES.map((p, idx) => (
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
                      <h3 className="font-serif text-xl sm:text-2xl text-white tracking-wide">
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
                      <p className="text-base sm:text-lg text-neutral-200 font-serif leading-relaxed mb-6 italic">
                        &ldquo;{lang === 'en' && p.descEn ? p.descEn : p.desc}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                        {lang === 'en' && p.executionEn ? p.executionEn : p.execution}
                      </p>
                      <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                        <span className="text-neutral-300 block mb-1">
                          {t('REALISASI MATERIAL & STRUKTUR:', 'MATERIAL & STRUCTURAL REALIZATION:')}
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

      {/* 6. THE FOUNDER (1 FOUNDER PROFILE WITH ARCHITECTURAL CAD VECTOR SILHOUETTE) */}
      <section id="founder" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#030303] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 reveal">
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[0.95] mb-6">
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

            {/* Right Single Founder Card Showcase with SVG Placeholder */}
            <div className="lg:col-span-7">
              {WW_FOUNDERS.map((founder, fIdx) => (
                <div key={founder.name} className="group rounded-none bg-[#080808] border border-white/10 hover:border-amber-400/60 p-6 sm:p-10 transition-all duration-500 ease-expo shadow-2xl reveal">
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
                            title={t('MASTER BUILDER UTAMA', 'LEAD MASTER BUILDER')}
                            subtitle={founder.name}
                          />
                        )}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-none bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                          {t('MASTER BUILDER & DIREKTUR', founder.role)}
                        </div>
                      </div>
                    </div>

                    {/* Information */}
                    <div className="md:col-span-6 space-y-4">
                      <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase">
                        {t('Master Builder & Direktur', founder.role)} — {t('Disiplin Struktural & Kejujuran Material', founder.focus)}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white group-hover:text-amber-400 transition-colors">
                        {founder.name}
                      </h3>
                      <div className="font-mono text-[11px] text-neutral-400">
                        {founder.credentials}
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light font-sans">
                        {t(
                          'Mengawasi langsung integrasi antara desain arsitektur dan eksekusi lapangan. Memastikan presisi toleransi milimeter dan efisiensi struktural di setiap tahap pembangunan.',
                          founder.bio
                        )}
                      </p>
                      {founder.quote && (
                        <blockquote className="border-l-2 border-amber-400 pl-3 py-1 text-xs text-neutral-400 italic">
                          &ldquo;{t('Bentuk mengikuti tujuan, dan kemewahan sejati lahir dari presisi eksekusi, bukan ornamen berlebihan.', founder.quote)}&rdquo;
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

      {/* 7. SERVICES */}
      <section id="services" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-16 reveal">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-4">
              {t('Layanan Kami', 'Services')}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
              {t(
                'Layanan rancang bangun untuk hunian dan bangunan komersial, dikerjakan dengan disiplin teknik sipil dan pengawasan lapangan langsung.',
                'Design and build services for residential and commercial architecture, delivered with civil engineering discipline and direct on-site supervision.'
              )}
            </p>
          </div>

          {/* 2 Major Service Categories (Residential & Commercial) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-20">
            {CENTRA_SERVICES.map((srv, sIdx) => (
              <div key={srv.category} className="group rounded-none bg-[#0b0b0b] border border-white/10 hover:border-amber-400/80 overflow-hidden transition-all duration-500 ease-expo flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.7)] reveal">
                <div>
                  <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-black media-reveal">
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
                    <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2">
                      {srv.category === 'RESIDENTIAL BUILDING'
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
                        {t('CAKUPAN KERJA:', 'WHAT WE DO:')}
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
                      {srv.category === 'RESIDENTIAL BUILDING'
                        ? t('Konsultasi Residensial', 'Inquire Residential')
                        : t('Konsultasi Komersial', 'Inquire Commercial')}
                    </span>
                    <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Alur kerja 10 tahap sengaja TIDAK ditampilkan di sini.
              Isinya identik dengan /services, dan 10 kartu padat teks memutus
              ritme image-first homepage. Tautan di bawah yang mengantar ke sana. */}
          <div className="pt-14 border-t border-white/[0.08] flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 border-b border-white/25 hover:border-amber-400 pb-1 text-neutral-200 hover:text-amber-400 font-mono text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>{t('Layanan & Alur Kerja 10 Tahap', 'Services & 10-Stage Methodology')}</span>
              <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. PROJECTS (AUTOMATIC CONTINUOUS SWIPER) */}
      <section id="projects" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full overflow-hidden bg-[#000000]">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          {/* Section Header with Subtle Navigation Arrows */}
          <div className="flex justify-between items-end mb-12 pb-6 border-b border-white/[0.08] gap-6 reveal">
            <div>
              <h2 className="font-serif text-5xl sm:text-7xl font-normal text-white tracking-tight">
                {t('Proyek Pilihan', 'Selected Projects')}
              </h2>
            </div>

            {/* Subtle Minimalist Navigation Arrows */}
            <div className="flex items-center gap-3">
              {/* Kontrol jeda eksplisit. Hover saja tidak cukup: pengguna
                  keyboard dan layar sentuh tidak punya cara menghentikan gerak. */}
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

          {/* Full-Width Continuous Infinite Swiper */}
          <div ref={carouselRef} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onTouchStart={() => setIsHovered(true)} onTouchEnd={() => setIsHovered(false)} role="region" aria-label={t('Galeri proyek pilihan', 'Selected projects gallery')} tabIndex={0} className="flex gap-7 overflow-x-auto scrollbar-none pb-6 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm reveal">
            {[...WW_PROJECTS, ...WW_PROJECTS].map((proj, idx) => {
              // Separuh kedua hanya penyambung visual agar loop terasa mulus.
              // Disembunyikan dari teknologi bantu supaya tiap proyek tidak dibacakan dua kali.
              const isClone = idx >= WW_PROJECTS.length;
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
                    {/* Gelap saat diam, membuka saat disentuh — gambarnya yang jadi hadiah. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 group-hover:opacity-25 transition-opacity duration-500 ease-expo" />

                    <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-widest text-neutral-200 uppercase">
                      {proj.category}
                    </span>

                    {/* Penanda arah yang masuk dari pojok saat hover */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-4 right-4 w-11 h-11 flex items-center justify-center bg-white text-black translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-expo"
                    >
                      <LuArrowUpRight className="w-5 h-5 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline px-1 gap-4">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400 shrink-0">{proj.location}</span>
                  </div>
                  {/* Garis yang ditarik dari kiri, menggantikan perubahan warna judul */}
                  <span
                    aria-hidden="true"
                    className="mt-3 block h-px w-0 bg-amber-400 transition-[width] duration-500 ease-expo group-hover:w-full"
                  />
                </button>
              );
            })}
          </div>

          {/* Link to Dedicated Projects Page */}
          <div className="mt-14 text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-none border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-400 hover:text-black text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 ease-expo min-h-[48px] font-bold shadow-lg"
            >
              <span>{t(`Lihat Semua ${WW_PROJECTS.length} Proyek`, `View All ${WW_PROJECTS.length} Projects`)}</span>
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. SIGNATURE CONTACT SECTION */}
      <section id="contact" className="py-28 md:py-36 bg-[#000000] border-t border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Monumental Column: 'Contact' Heading */}
            <div className="lg:col-span-6 reveal">
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-normal text-white tracking-tight leading-[0.95] mb-6">
                {t('Kontak', 'Contact')}
              </h2>
              <div className="w-24 h-[1.5px] bg-white/25 mb-8" />
              <p className="font-serif text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-md">
                {t(
                  'Untuk hunian privat, bangunan komersial, dan pekerjaan general contracting di Surabaya dan Jawa Timur.',
                  'For bespoke residences, commercial developments, and general contracting across Surabaya and East Java.'
                )}
              </p>
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-6 space-y-10 reveal">
              {/* Horizontal Brand Lockup */}
              <div className="pb-6 border-b border-white/10">
                <ModernWwLogo variant="full" size="lg" />
              </div>

              {/* Inquiries Details */}
              <div>
                <h3 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-4">
                  {t('KONSULTASI & TANYA JAWAB', 'FOR INQUIRIES')}
                </h3>
                <div className="space-y-4 font-sans text-base sm:text-lg">
                  <div>
                    {SITE_CONTACT.email ? (
                      <a
                        href={`mailto:${SITE_CONTACT.email}`}
                        className="text-white hover:text-amber-400 transition-colors font-serif tracking-wide block"
                      >
                        {SITE_CONTACT.email}
                      </a>
                    ) : (
                      <span className="text-neutral-400 font-serif tracking-wide block">
                        {SITE_CONTACT.emailLabel}
                      </span>
                    )}
                  </div>
                  <div>
                    {SITE_CONTACT.whatsapp ? (
                      <a
                        href={waLink(t('Halo ww.cons, saya ingin konsultasi rancang bangun.', 'Hello ww.cons, I would like to consult on a design & build project.'))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-amber-400 transition-colors font-mono tracking-wider block"
                      >
                        {SITE_CONTACT.whatsappLabel}
                      </a>
                    ) : (
                      <span className="text-neutral-400 font-mono tracking-wider block">
                        {SITE_CONTACT.whatsappLabel}
                      </span>
                    )}
                  </div>
                  <div>
                    <a
                      href={SITE_CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-white transition-colors font-mono text-sm tracking-wider inline-flex items-center gap-2"
                    >
                      <FaInstagram className="w-4 h-4" />
                      <span>{SITE_CONTACT.instagramHandle}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs font-mono">
                {[SITE_CONTACT.studio, SITE_CONTACT.workshop].map((place) => (
                  <div key={place.name}>
                    <div className="text-white mb-1 flex items-center gap-2">
                      <LuMapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{place.name}</span>
                    </div>
                    <address className="text-neutral-400 leading-relaxed not-italic">
                      {place.lines.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </address>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="group px-8 py-4 rounded-none bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo inline-flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] shadow-lg w-full sm:w-auto"
                >
                  <span>{t('Hubungi Kami', 'Contact Us')}</span>
                  <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {SITE_CONTACT.whatsapp && (
                  <a
                    href={waLink(t('Halo ww.cons, saya ingin konsultasi rancang bangun.', 'Hello ww.cons, I would like to consult on a design & build project.'))}
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

      {/* 10. FOOTER */}
      <Footer />

      {/* Project Inspection Modal */}
      <ProjectInspectionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
