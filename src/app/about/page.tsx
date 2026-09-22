'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { LuArrowUpRight, LuShieldCheck, LuAward, LuCheck, LuQuote } from 'react-icons/lu';
import HeroMedia from '@/components/ui/HeroMedia';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import FounderSvgPlaceholder from '@/components/ui/FounderSvgPlaceholder';
import { WW_PHILOSOPHIES, WW_FOUNDERS, SITE_CONTACT, waLink } from '@/data/siteData';

export default function AboutPage() {
  const founder = WW_FOUNDERS[0];

  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <Navbar />

      {/* 1. MONUMENTAL PAGE HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 border-b border-white/[0.08] overflow-hidden">
        <HeroMedia src="/videos/material-detail.mp4" poster="/images/projects/material-detail_poster.jpg" alt="Detail pertemuan beton dan kayu jati" priority />

        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto text-center">
          <div className="reveal-load">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal text-white tracking-tight leading-[0.98] mb-6">
              About Us
            </h1>
            <div className="w-20 h-[1.5px] bg-white/25 mx-auto mb-6" />
            <p className="font-serif italic text-lg sm:text-2xl text-neutral-300 font-light max-w-2xl mx-auto">
              &ldquo;Redefining luxury living through spatial honesty, bold forms, and physical structural mastery.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 2. NARRATIVE & ETHOS */}
      <section className="py-24 md:py-32 border-b border-white/[0.08] relative">
        <div className="max-w-reading mx-auto px-6 sm:px-12 md:px-16 text-center">
          <div className="space-y-8 reveal">
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-relaxed">
              Wonderful Works (ww.cons) is a leading architecture, interior design, and general contracting atelier specializing in high-end residential estates and flagship commercial spaces in Surabaya and across Indonesia.
            </p>
            <div className="w-12 h-[1px] bg-white/20 mx-auto" />
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto font-sans">
              Our approach goes beyond aesthetics — we design spaces that inspire well-being, foster meaningful connections, and support fulfilling lifestyles. By combining bold architectural ideas, thoughtful craftsmanship, and robust civil structural engineering, we deliver projects that are both functional and breathtaking.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE DESIGN PHILOSOPHIES */}
      <section className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] relative">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Static Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 reveal">
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight leading-[1.02] mb-6">
                Our Design Philosophy
              </h2>
              <div className="w-16 h-[1.5px] bg-white/25 mb-6" />
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Three foundational pillars dictate every line drawn, material selected, and structural calculation performed at our studio.
              </p>
            </div>

            {/* Right Interactive Accordion Column */}
            <div className="lg:col-span-7 space-y-4">
              {WW_PHILOSOPHIES.map((p, idx) => (
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
                        <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
                          {p.title}
                        </h3>
                        <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mt-1">
                          {p.tagline}
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
                      <p className="text-base sm:text-lg text-neutral-200 font-serif leading-relaxed mb-6 italic">
                        &ldquo;{p.desc}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                        {p.execution}
                      </p>
                      <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                        <span className="text-neutral-300 block mb-1">MATERIAL &amp; STRUCTURAL REALIZATION:</span>
                        <span className="text-neutral-300">{p.material}</span>
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

      {/* 4. THE FOUNDER (1 FOUNDER PROFILE WITH ARCHITECTURAL SVG PLACEHOLDER) */}
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
                Combining 50+ years of family construction pedigree in Surabaya with contemporary architectural vision, structural calculation precision, and transparent financial stewardship.
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-400 mb-8">
                <div className="flex items-center gap-3 text-neutral-300">
                  <LuShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>REGISTERED CIVIL ENGINEER & MASTER BUILDER</span>
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
                    <FounderSvgPlaceholder
                      title="LEAD MASTER BUILDER"
                      subtitle={founder.name}
                    />
                  </div>
                </div>

                {/* Founder Details */}
                <div className="md:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-none bg-amber-500/10 border border-amber-500/30 font-mono text-[11px] tracking-widest text-neutral-400 uppercase inline-block">
                    {founder.role}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">
                    {founder.name}
                  </h3>
                  <div className="font-mono text-xs text-amber-400/90 tracking-wider uppercase">
                    {founder.focus}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light font-sans">
                    {founder.bio}
                  </p>
                </div>
              </div>

              {/* Quote Banner */}
              {founder.quote && (
                <div className="p-6 rounded-none bg-[#111111] border border-white/10 mb-8 relative">
                  <LuQuote className="w-8 h-8 text-amber-500/30 absolute top-4 right-4" />
                  <p className="font-serif italic text-sm sm:text-base text-neutral-200 leading-relaxed pr-8">
                    &ldquo;{founder.quote}&rdquo;
                  </p>
                </div>
              )}

              {/* Verified Credentials */}
              <div className="space-y-2.5 pt-6 border-t border-white/[0.08]">
                <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block mb-3 font-bold">
                  KEY ACCREDITATIONS & CORE PRINCIPLES:
                </span>
                {founder.credentials?.map((cred) => (
                  <div key={cred} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                    <LuCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-3">
                <span>WW.CONS</span>
                <span className="text-amber-400">DIRECT CONSULTATION: {SITE_CONTACT.whatsappLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-20 bg-[#080808] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white mb-4">
            Mulai Diskusi Proyek
          </h3>
          <p className="text-sm sm:text-base text-neutral-400 font-light mb-8 max-w-xl mx-auto font-sans">
            Diskusikan rencana hunian atau bangunan komersial Anda langsung dengan tim ww.cons.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 ease-expo shadow-xl min-h-[44px]"
            >
              <span>Schedule Studio Session</span>
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={waLink('Halo ww.cons, saya ingin konsultasi rancang bangun.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 font-mono text-xs uppercase tracking-widest rounded-none transition-all duration-300 ease-expo min-h-[44px]"
            >
              <span>Direct WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
