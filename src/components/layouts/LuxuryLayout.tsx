'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuPhone, LuArrowUpRight, LuMapPin, LuSparkles, LuShieldCheck, LuClock, LuMenu, LuX } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import RemotionShowcase from '@/components/remotion/RemotionShowcase';

const luxuryWorks = [
  {
    title: 'Jotun Showroom Commercial Fit-Out',
    category: 'FLAGSHIP COMMERCIAL',
    location: 'Surabaya, Jawa Timur',
    img: '/images/projects/jotun_showroom_hq.jpg',
    materials: 'Partisi Berat, Tata Cahaya Showcase, Plafon Akustik, Fasad Kaca Korporat',
    desc: 'Eksekusi ruang pamer resmi Jotun berstandar internasional. Mengharmonisasikan estetika warna dengan daya tahan fisik ruang komersial.',
  },
  {
    title: 'Private Modern & Classic Residence',
    category: 'LUXURY RESIDENTIAL',
    location: 'Surabaya Timur',
    img: '/images/projects/luxury_residence_hq.jpg',
    materials: 'Marmer Alami, Kayu Solid Tropis, Profil Klasik Elegan, Siku Presisi 90°',
    desc: 'Konstruksi rumah tinggal privat bertingkat dengan kenyamanan termal maksimal, sirkulasi silang, dan pengerjaan finishing level milimeter.',
  },
  {
    title: 'Rekayasa Struktur & Pembesian Lapangan',
    category: 'HEAVY CIVIL & STRUCTURAL',
    location: 'Semolowaru, Surabaya',
    img: '/images/projects/concrete_rebar_hq.jpg',
    materials: 'Besi Ulir SNI, Mutu Beton K-350, Waterproofing Bakar, Uji Slump Mandiri',
    desc: 'Pondasi dan struktur beton bertulang terhitung cermat sesuai beban gempa dan daya dukung tanah setempat.',
  },
  {
    title: 'Fasad Arsitektural Resilien Iklim Tropis',
    category: 'FACADE ENGINEERING',
    location: 'Surabaya',
    img: '/images/projects/tropical_facade_hq.jpg',
    materials: 'Kisi Aluminium Powder-Coated, Kaca Low-E, Pelindung UV Iklim Pesisir',
    desc: 'Fasad modern dengan perlindungan menyeluruh terhadap tampias hujan badai dan terik radiasi matahari maritim Surabaya.',
  },
];

const pillars = [
  { step: '01', title: 'Ketahanan Struktur Tanpa Kompromi', desc: 'Perhitungan rekayasa sipil teliti, uji slump beton K-300 SNI, dan integritas pembesian.' },
  { step: '02', title: 'Transparansi Biaya & Zero Hidden Cost', desc: 'Seluruh merk dan analisa harga satuan tertulis jelas dalam Surat Perjanjian Kerja berkekuatan hukum.' },
  { step: '03', title: 'Laporan Visual Harian Langsung', desc: 'Grup WhatsApp proyek privat memudahkan pemilik memantau kemajuan fisik dari mana saja.' },
  { step: '04', title: 'Akurasi Siku 90° & Nat Milimeter', desc: 'Sentuhan craftsmanship tingkat tinggi oleh tukang spesialis berpengalaman di bawah supervisi insinyur.' },
  { step: '05', title: 'Sinkronisasi Utilitas MEP Sejak Awal', desc: 'Jalur pipa dan kelistrikan tertanam rapi sebelum pengecoran dak, mencegah pembongkaran ulang.' },
];

const luxuryNavLinks = [
  { label: 'SPESIFIKASI', href: '#bespoke-hero' },
  { label: 'VIDEO REEL', href: '#video-reel' },
  { label: 'PORTOFOLIO', href: '#residences' },
  { label: '5 STANDAR', href: '#standards' },
  { label: 'CONCIERGE', href: '#concierge' },
];

export default function LuxuryLayout() {
  const [selectedInterest, setSelectedInterest] = useState('Showroom & Komersial');
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const interests = [
    'Showroom & Komersial',
    'Rumah Tinggal Mewah',
    'Struktur Beton & Lapangan',
  ];

  const getWaLink = () => {
    const text = encodeURIComponent(
      `Halo Wonderful Works Construction, saya ingin konsultasi rencana proyek ${selectedInterest} di Surabaya.`
    );
    return `https://wa.me/628113313347?text=${text}`;
  };

  return (
    <div className="bg-[#090D14] text-slate-100 font-sans min-h-screen selection:bg-amber-600 selection:text-white">
      {/* Luxury Minimalist Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#090D14]/90 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black border border-amber-500/40 p-1 flex items-center justify-center rounded-xs">
                <Image
                  src="/images/ww/logo.jpg"
                  alt="Wonderful Works Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest text-white uppercase block">
                  Wonderful Works
                </span>
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase block">
                  Bespoke Contractor · Surabaya
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav aria-label="Navigasi Proyek Privat" className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider">
              {luxuryNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-amber-400 transition-colors py-2 cursor-pointer min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition-colors cursor-pointer min-h-[44px]"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@ww.cons</span>
              </a>

              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md items-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>Konsultasi Privat</span>
              </a>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/50 rounded-xs bg-black/40 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
                aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
                aria-expanded={isOpen}
              >
                {isOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Luxury Drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 top-20 z-50 bg-black/80 backdrop-blur-md lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-[#0D131F] border-b border-amber-500/30 p-6 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-white/10">
                NAVIGASI PROYEK PRIVAT
              </div>
              <div className="flex flex-col space-y-2">
                {luxuryNavLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3.5 bg-white/5 border border-white/10 hover:border-amber-400/50 font-mono text-sm font-bold text-white rounded-xs transition-colors min-h-[48px]"
                  >
                    <span>{link.label}</span>
                    <LuArrowUpRight className="w-4 h-4 text-amber-400" />
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>Konsultasi Privat Langsung</span>
                </a>
                <a
                  href="https://www.instagram.com/ww.cons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white/5 border border-white/15 text-slate-300 font-mono text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors min-h-[44px]"
                >
                  <FaInstagram className="w-4 h-4 text-pink-500" />
                  <span>Instagram @ww.cons</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero: Bespoke Luxury Split */}
      <section id="bespoke-hero" className="pt-36 sm:pt-44 pb-24 border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-6">
                <LuSparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CRAFTING TIMELESS ARCHITECTURE · SURABAYA</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-black uppercase text-white tracking-tight leading-[1.05] mb-6">
                Mewujudkan Visi <br />
                Hunian & Komersial <br />
                <span className="text-amber-300 font-serif italic font-normal lowercase tracking-normal">
                  dengan presisi mutlak.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-6 max-w-xl">
                Wonderful Works Construction menghadirkan standar pengerjaan konstruksi tingkat tinggi untuk klien yang mengutamakan kerapian milimeter, transparansi anggaran, dan ketepatan serah terima di Surabaya dan sekitarnya.
              </p>

              {/* Interactive VIP Scope Selector */}
              <div className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xs">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-3 font-bold">
                  PILIH MINAT SPESIFIKASI PROYEK ANDA:
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedInterest(item)}
                      className={`px-3.5 py-2 text-xs font-mono rounded-xs border transition-colors cursor-pointer min-h-[40px] flex items-center ${
                        selectedInterest === item
                          ? 'bg-amber-600 text-white border-amber-400 font-bold shadow-xs'
                          : 'bg-black/50 text-slate-300 border-white/15 hover:border-amber-400/50 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={getWaLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-lg inline-flex items-center gap-2 cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>Jadwalkan Konsultasi: {selectedInterest}</span>
                  <LuArrowUpRight className="w-4 h-4" />
                </a>

                <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Survei Lokasi Semolowaru, Surabaya & Sekitarnya</span>
                </div>
              </div>
            </div>

            {/* Right: Flagship Showcase Card */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-4 rounded-xs shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full bg-slate-800 rounded-xs overflow-hidden mb-4 border border-white/10">
                <Image
                  src="/images/projects/jotun_showroom_hq.jpg"
                  alt="Jotun Showroom Commercial Fit-Out"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-amber-400 mb-1">
                <span>FLAGSHIP COMMERCIAL FIT-OUT</span>
                <span>SURABAYA · 2026</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Jotun Showroom Official Fit-Out
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pengerjaan ruang pamer resmi produk cat Jotun: dinding pameran arsitektural berat, pencahayaan showcase presisi, dan fasad korporat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Broadcast Project Reel (Remotion Cinema) */}
      <section id="video-reel" className="py-24 bg-black/40 border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">
                BROADCAST MULTIMEDIA REEL · 30 FPS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
                Dokumentasi Proyek Nyata Lapangan
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm">
              Pantau langsung hasil rekaman video fisik pekerjaan @ww.cons dari pondasi hingga finishing akhir.
            </p>
          </div>

          <RemotionShowcase />
        </div>
      </section>

      {/* Bespoke Works Showcase */}
      <section id="residences" className="py-24 border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-1">
                SELECTED PORTFOLIO COMMISSIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
                Koleksi Rancang Bangun Terpilih
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Surabaya & Jawa Timur
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {luxuryWorks.map((work) => (
              <div
                key={work.title}
                className="bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors p-6 rounded-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-slate-800 rounded-xs overflow-hidden mb-6 border border-white/10">
                    <Image
                      src={work.img}
                      alt={work.title}
                      fill
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-amber-400 mb-2">
                    <span>{work.category}</span>
                    <span className="text-slate-400">{work.location}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {work.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {work.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                  <div className="text-amber-500 mb-1">MATERIAL HIGHLIGHTS:</div>
                  <div>{work.materials}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Standards of Bespoke Craftsmanship */}
      <section id="standards" className="py-24 bg-black/40 border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2">
              THE 5 PILLARS OF EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">
              5 Standar Presisi Pengerjaan Fisik
            </h2>
            <p className="text-sm text-slate-400 mt-3 font-light">
              Diadaptasi dari seri edukasi lapangan WW Notes (@ww.cons) untuk menjamin rasa tenang setiap pemilik proyek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {pillars.map((p) => (
              <div key={p.step} className="bg-white/5 border border-white/10 p-6 rounded-xs flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black font-mono text-amber-500 mb-3">{p.step}</div>
                  <h4 className="text-base font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500">
                  WONDERFUL WORKS CONSTRUCTION
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Concierge Footer */}
      <footer id="concierge" className="py-20 bg-[#06080E] text-slate-400 text-xs border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5">
              <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                Wonderful Works Construction
              </h4>
              <p className="text-slate-400 font-light leading-relaxed mb-6 max-w-sm">
                General contractor tepercaya berbasis di Surabaya dengan moto <em>&ldquo;Quality is our priority&rdquo;</em>. Menghadirkan kontrak SPK tertulis, transparansi anggaran, dan presisi fisik tingkat tinggi.
              </p>
              <div className="text-slate-400 space-y-1 font-mono">
                <div>Jl. Serenity No. 29, Semolowaru, Surabaya 60119</div>
                <div>Wilayah: Surabaya (Timur, Barat, Pusat), Sidoarjo & Gresik</div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-white uppercase tracking-wider mb-2 font-mono">
                  KONSULTASI & SURVEI PROYEK PRIVAT
                </h5>
                <p className="text-slate-400 mb-6 font-light">
                  Silakan hubungi perwakilan teknis kami untuk mengatur jadwal diskusi denah lahan dan Rencana Anggaran Biaya (RAB) terbuka.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={getWaLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <LuPhone className="w-4 h-4" />
                    <span>WhatsApp Tim Sipil (+62 811-3313-347)</span>
                  </a>
                  <a
                    href="https://www.instagram.com/ww.cons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <FaInstagram className="w-4 h-4 text-pink-500" />
                    <span>Dokumentasi @ww.cons</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 text-slate-500 font-mono text-[11px]">
                SPK Resmi · Mutu SNI · Zero Hidden Cost · Garansi Retensi Pemeliharaan
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between text-slate-500 font-mono text-[11px]">
            <span>&copy; {new Date().getFullYear()} Wonderful Works Construction. All rights reserved.</span>
            <span>BESPOKE ARCHITECTURAL EDITION · SURABAYA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
