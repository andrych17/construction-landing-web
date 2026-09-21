'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  LuMenu,
  LuX,
  LuPhone,
  LuArrowUpRight,
  LuChevronDown,
  LuBuilding,
  LuRuler,
  LuShieldCheck,
  LuVideo,
  LuClock,
  LuMapPin,
  LuSparkles,
} from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'projects' | 'services' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMouseEnter = (menu: 'projects' | 'services') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const projectLinks = [
    {
      title: 'Showroom & Komersial',
      desc: 'Jotun Showroom & Fit-Out Retail Surabaya',
      href: '#projects',
      badge: 'KOMERSIAL',
      icon: LuBuilding,
    },
    {
      title: 'Hunian Mewah Modern',
      desc: 'Residensial Privat & Kontemporer Tropis',
      href: '#projects',
      badge: 'RESIDENSIAL',
      icon: LuRuler,
    },
    {
      title: 'Rekayasa Struktur Beton',
      desc: 'Pembesian Balok Kolom SNI & Uji Slump',
      href: '#projects',
      badge: 'STRUKTUR',
      icon: LuShieldCheck,
    },
    {
      title: 'Time-Lapse Lapangan',
      desc: 'Video Konstruksi Riil & Reel 30 FPS',
      href: '#project-reel',
      badge: 'MULTIMEDIA',
      icon: LuVideo,
    },
  ];

  const serviceLinks = [
    {
      title: 'General Contracting',
      desc: 'Rancang bangun gedung komersial, ruko, dan hunian dari nol hingga serah terima kunci (BAST).',
      href: '#services',
      icon: LuBuilding,
    },
    {
      title: 'Renovasi & Retrofitting',
      desc: 'Perkuatan struktur balok kolom, peninggian dak beton, dan mitigasi tanah lempung Surabaya.',
      href: '#services',
      icon: LuRuler,
    },
    {
      title: 'Supervisi Lapangan & QC',
      desc: 'Monitoring mutu harian, checklist cor bertahap, dan transparansi RAB zero hidden cost.',
      href: '#services',
      icon: LuShieldCheck,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* 1. Architectural Utility Top Bar (Operational HUD Datum Strip) */}
      <div className="hidden md:block bg-slate-950 text-slate-300 text-[11px] font-mono border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          {/* Left: Live Operational Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300 font-semibold tracking-wider uppercase">
                STATUS OPERASIONAL: AKTIF
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">SURABAYA & JAWA TIMUR</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400 border-l border-slate-800 pl-4">
              <LuClock className="w-3.5 h-3.5 text-slate-500" />
              <span>SENIN &ndash; SABTU, 08:00 &ndash; 17:00 WIB</span>
            </div>
          </div>

          {/* Right: Quick Direct Contact Anchors */}
          <div className="flex items-center gap-5 text-[11px]">
            <a
              href="https://www.instagram.com/ww.cons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FaInstagram className="w-3.5 h-3.5 text-pink-400" />
              <span>@ww.cons</span>
            </a>
            <span className="text-slate-800">|</span>
            <a
              href="https://wa.me/628113313347"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-semibold cursor-pointer"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hotline: +62 811-3313-347</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 border-b ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md border-slate-200 shadow-sm'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Studio Identity */}
            <a
              href="#"
              className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xs"
            >
              <div className="relative w-11 h-11 bg-slate-950 border border-slate-800 rounded-xs flex items-center justify-center overflow-hidden p-1 shadow-xs group-hover:border-brand transition-colors">
                <Image
                  src="/images/ww/logo.jpg"
                  alt="Wonderful Works Construction Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-950 group-hover:text-brand transition-colors uppercase leading-tight font-sans">
                  Wonderful Works
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-0.5 font-semibold">
                  General Contractor · Surabaya
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with Architectural Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Portofolio Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('projects')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'projects' ? null : 'projects')
                  }
                  className={`px-3.5 py-2 text-sm font-semibold inline-flex items-center gap-1.5 rounded-xs transition-colors cursor-pointer min-h-[44px] ${
                    activeDropdown === 'projects'
                      ? 'text-brand bg-slate-100'
                      : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                  aria-expanded={activeDropdown === 'projects'}
                >
                  <span>Portofolio</span>
                  <LuChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'projects' ? 'rotate-180 text-brand' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'projects' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-[540px] bg-white border border-slate-200 shadow-xl rounded-xs p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={() => handleMouseEnter('projects')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs font-mono text-slate-500 font-semibold">
                      <span className="uppercase tracking-wider">Koleksi Proyek Fisik Asli</span>
                      <span className="text-brand">@ww.cons</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {projectLinks.map((p) => (
                        <a
                          key={p.title}
                          href={p.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-3 rounded-xs border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group/item block cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand bg-brand-light px-2 py-0.5 rounded-2xs border border-brand-border">
                              {p.badge}
                            </span>
                            <p.icon className="w-4 h-4 text-slate-400 group-hover/item:text-brand transition-colors" />
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 group-hover/item:text-brand transition-colors">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {p.desc}
                          </p>
                        </a>
                      ))}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500">Standar Mutu SNI & RAB Terbuka</span>
                      <a
                        href="#projects"
                        onClick={() => setActiveDropdown(null)}
                        className="text-slate-900 hover:text-brand font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Lihat Semua Proyek</span>
                        <LuArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Layanan Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'services' ? null : 'services')
                  }
                  className={`px-3.5 py-2 text-sm font-semibold inline-flex items-center gap-1.5 rounded-xs transition-colors cursor-pointer min-h-[44px] ${
                    activeDropdown === 'services'
                      ? 'text-brand bg-slate-100'
                      : 'text-slate-800 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                  aria-expanded={activeDropdown === 'services'}
                >
                  <span>Layanan</span>
                  <LuChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'services' ? 'rotate-180 text-brand' : 'text-slate-400'
                    }`}
                  />
                </button>

                {activeDropdown === 'services' && (
                  <div
                    className="absolute top-full left-0 mt-1 w-[460px] bg-white border border-slate-200 shadow-xl rounded-xs p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 text-xs font-mono text-slate-500 font-semibold">
                      <span className="uppercase tracking-wider">Spesialisasi Rancang Bangun</span>
                      <span className="text-slate-700">Surabaya & Jatim</span>
                    </div>

                    <div className="space-y-2">
                      {serviceLinks.map((s) => (
                        <a
                          key={s.title}
                          href={s.href}
                          onClick={() => setActiveDropdown(null)}
                          className="p-3 rounded-xs border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all group/item block cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <s.icon className="w-4 h-4 text-brand" />
                            <h4 className="text-xs font-bold text-slate-950 group-hover/item:text-brand transition-colors">
                              {s.title}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-6">
                            {s.desc}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Anchor Items */}
              <a
                href="#methodology"
                className="px-3.5 py-2 text-sm font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-xs transition-colors min-h-[44px] inline-flex items-center"
              >
                5 Pilar Presisi
              </a>

              <a
                href="#about"
                className="px-3.5 py-2 text-sm font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-xs transition-colors min-h-[44px] inline-flex items-center"
              >
                Tentang Kami
              </a>

              <a
                href="#faq"
                className="px-3.5 py-2 text-sm font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 rounded-xs transition-colors min-h-[44px] inline-flex items-center"
              >
                FAQ & Biaya
              </a>
            </nav>

            {/* Right Action: Direct Consultation CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right hidden xl:block">
                <div className="text-[10px] font-mono text-slate-600 uppercase font-semibold">
                  RESPON SURVEI LAPANGAN
                </div>
                <div className="text-xs font-bold text-slate-900">
                  &lt; 15 Menit · Zero Hidden Cost
                </div>
              </div>

              <a
                href="https://wa.me/628113313347?text=Halo%20Wonderful%20Works%20Construction,%20saya%20ingin%20konsultasi%20mengenai%20rencana%20proyek%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-brand hover:bg-brand-hover active:bg-brand-active transition-colors rounded-xs shadow-xs min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                <LuPhone className="w-4 h-4" />
                <span>Konsultasi RAB & Survei</span>
                <LuArrowUpRight className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Hotline"
                className="p-2.5 text-emerald-600 hover:bg-emerald-50 border border-emerald-200 rounded-xs transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Buka Menu Navigasi"
                aria-expanded={isOpen}
                className="p-2.5 text-slate-800 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 rounded-xs transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Architectural Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-8 space-y-6 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
          {/* Section: Proyek */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2 pb-1 border-b border-slate-200">
              PORTOFOLIO PROYEK FISIK
            </div>
            <div className="grid grid-cols-1 gap-1">
              {projectLinks.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xs hover:bg-slate-50 text-slate-800 hover:text-brand transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <p.icon className="w-4 h-4 text-brand" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{p.title}</div>
                      <div className="text-[11px] text-slate-500">{p.desc}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-2xs">
                    {p.badge}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Section: Layanan & SOP */}
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold mb-2 pb-1 border-b border-slate-200">
              LAYANAN & METODOLOGI
            </div>
            <div className="space-y-1">
              <a
                href="#services"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-slate-800 hover:text-brand hover:bg-slate-50 rounded-xs transition-colors"
              >
                Layanan Rancang Bangun & Renovasi
              </a>
              <a
                href="#methodology"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-slate-800 hover:text-brand hover:bg-slate-50 rounded-xs transition-colors"
              >
                5 Pilar Presisi (@ww.cons Notes)
              </a>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-slate-800 hover:text-brand hover:bg-slate-50 rounded-xs transition-colors"
              >
                Tentang Wonderful Works Construction
              </a>
              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-xs font-bold text-slate-800 hover:text-brand hover:bg-slate-50 rounded-xs transition-colors"
              >
                FAQ & Transparansi Biaya RAB
              </a>
            </div>
          </div>

          {/* Contact & Action Section */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="text-[11px] font-mono text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <LuMapPin className="w-3.5 h-3.5 text-brand" />
                <span>Jl. Serenity No. 29, Semolowaru, Surabaya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LuClock className="w-3.5 h-3.5 text-brand" />
                <span>Senin &ndash; Sabtu, 08:00 &ndash; 17:00 WIB</span>
              </div>
            </div>

            <a
              href="https://wa.me/628113313347?text=Halo%20Wonderful%20Works%20Construction,%20saya%20ingin%20konsultasi%20mengenai%20rencana%20proyek%20saya."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-brand hover:bg-brand-hover rounded-xs transition-colors shadow-xs min-h-[44px]"
            >
              <LuPhone className="w-4 h-4" />
              <span>Konsultasi RAB & Survei Lahan</span>
              <LuArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/ww.cons/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xs transition-colors min-h-[44px]"
            >
              <FaInstagram className="w-4 h-4 text-pink-500" />
              <span>Dokumentasi Instagram @ww.cons</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
