'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LuPhone, LuArrowUpRight, LuMapPin, LuShieldCheck, LuMenu, LuEye } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import RemotionShowcase from '@/components/remotion/RemotionShowcase';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import HeroCinematicStage from '@/components/interactive/HeroCinematicStage';
import ArchitecturalMegaMenu from '@/components/interactive/ArchitecturalMegaMenu';
import SectionRailIndicator from '@/components/interactive/SectionRailIndicator';
import ProjectInspectionModal, { ProjectDetail } from '@/components/interactive/ProjectInspectionModal';

const luxuryWorks: ProjectDetail[] = [
  {
    title: 'Jotun Showroom Commercial Fit-Out',
    category: 'FLAGSHIP COMMERCIAL',
    location: 'Surabaya, Jawa Timur',
    img: '/images/projects/jotun_showroom_hq.jpg',
    materials: 'Partisi Berat, Tata Cahaya Showcase, Plafon Akustik, Fasad Kaca Korporat',
    desc: 'Eksekusi ruang pamer resmi Jotun berstandar internasional. Mengharmonisasikan estetika warna dengan daya tahan fisik ruang komersial bertrafik tinggi. Toleransi siku 90° digital laser pada setiap pertemuan partisi.',
    specsTable: [
      { label: 'Kategori Bangunan', value: 'Commercial Showroom & Retail Flagship' },
      { label: 'Presisi Sudut & Nat', value: 'Laser 90° Sudut Siku Presisi (Toleransi < 1mm)' },
      { label: 'Tata Cahaya', value: 'High-CRI Showcase Lighting System' },
      { label: 'Partisi & Dinding', value: 'Partisi Gypsum Akustik Double-Layer' },
      { label: 'Serah Terima', value: 'Tepat Waktu Sesuai Jadwal Grand Opening Jotun' },
    ],
  },
  {
    title: 'Private Modern & Classic Residence',
    category: 'LUXURY RESIDENTIAL',
    location: 'Surabaya Timur',
    img: '/images/projects/luxury_residence_hq.jpg',
    materials: 'Marmer Alami, Kayu Solid Tropis, Profil Klasik Elegan, Siku Presisi 90°',
    desc: 'Konstruksi rumah tinggal privat bertingkat dengan kenyamanan termal maksimal, sirkulasi silang, dan pengerjaan finishing level milimeter. Mengintegrasikan material batu marmer impor dengan ketahanan iklim tropis pesisir.',
    specsTable: [
      { label: 'Luas Bangunan', value: '680 m² (3 Lantai Bertingkat)' },
      { label: 'Mutu Beton Struktur', value: 'K-350 SNI ReadyMix dengan Uji Slump Mandiri' },
      { label: 'Finishing Lantai', value: 'Bookmatched Italian Marble Slab' },
      { label: 'Sirkulasi Termal', value: 'Cross-Ventilation Pasif & Double Height Ceiling' },
      { label: 'Inspeksi Kualitas', value: 'Supervisi Harian & Laporan Foto Berkala' },
    ],
  },
  {
    title: 'Rekayasa Struktur & Pembesian Lapangan',
    category: 'HEAVY CIVIL & STRUCTURAL',
    location: 'Semolowaru, Surabaya',
    img: '/images/projects/concrete_rebar_hq.jpg',
    materials: 'Besi Ulir SNI, Mutu Beton K-350, Waterproofing Bakar, Uji Slump Mandiri',
    desc: 'Pondasi dan struktur beton bertulang terhitung cermat sesuai beban gempa dan daya dukung tanah setempat di kawasan Surabaya Timur. Seluruh tulangan diikat kawat bendrat ganda dengan selimut beton terjaga.',
    specsTable: [
      { label: 'Spesifikasi Besi', value: 'Besi Ulir Standar Nasional Indonesia (SNI) Penuh' },
      { label: 'Mutu Beton Dak', value: 'K-350 Admixture Waterproofing Integral' },
      { label: 'Uji Mutu', value: 'Slump Test 12±2 cm per Truk Mixer' },
      { label: 'Pondasi', value: 'Tiang Pancang Mini-Pile + Strauß Pile Terpadu' },
      { label: 'Dokumentasi', value: 'Foto As-Built Pembesian Sebelum Cor' },
    ],
  },
  {
    title: 'Fasad Arsitektural Resilien Iklim Tropis',
    category: 'FACADE ENGINEERING',
    location: 'Surabaya Barat',
    img: '/images/projects/tropical_facade_hq.jpg',
    materials: 'Kisi Aluminium Powder-Coated, Kaca Low-E, Pelindung UV Iklim Pesisir',
    desc: 'Fasad modern dengan perlindungan menyeluruh terhadap tampias hujan badai dan terik radiasi matahari maritim Surabaya. Kisi-kisi arsitektural dirancang untuk mereduksi panas hingga 40% tanpa mengorbankan cahaya alami.',
    specsTable: [
      { label: 'Bahan Kisi-Kisi', value: 'Aluminium Extrusion Tebal 2.0mm Powder Coating' },
      { label: 'Kaca Eksterior', value: 'Double Glass 6mm+12A+6mm Low-E Glass' },
      { label: 'Ketahanan Karat', value: 'Anti-Korosi Udara Asin Pesisir Surabaya' },
      { label: 'Sealant Sendi', value: 'Polyurethane Heavy-Duty Weatherproof' },
      { label: 'Garansi Fasad', value: 'Garansi Kebocoran Sealant 5 Tahun' },
    ],
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
  { label: 'STAGE', href: '#hero' },
  { label: 'VIDEO REEL', href: '#video-reel' },
  { label: 'KARYA', href: '#portfolio' },
  { label: 'STANDAR', href: '#standards' },
  { label: 'KONTAK', href: '#concierge' },
];

export default function LuxuryLayout() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const getWaLink = () => {
    const text = encodeURIComponent(
      'Halo Wonderful Works Construction, saya ingin konsultasi rencana proyek di Surabaya.'
    );
    return `https://wa.me/628113313347?text=${text}`;
  };

  return (
    <div className="bg-[#07090E] text-slate-100 font-sans min-h-screen selection:bg-amber-600 selection:text-white relative">
      {/* 1. Architectural Preloader with 5-Panel Curtain Reveal */}
      <ArchitecturalPreloader />

      {/* 2. Spatial Telemetry (Right-Rail Section Indicator) */}
      <SectionRailIndicator />

      {/* 3. Luxury Floating Capsule Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090E]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Lockup */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-black/90 border border-amber-500/40 p-1 flex items-center justify-center rounded-xs shadow-md group-hover:border-amber-400 transition-colors">
                <Image
                  src="/images/ww/logo_transparent.png"
                  alt="Wonderful Works Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold tracking-widest text-white uppercase block font-serif">
                  Wonderful Works
                </span>
                <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase block">
                  Bespoke Contractor · Surabaya
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider">
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

            {/* Action Group: Mega-Menu Capsule Trigger & Concierge */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
              {/* Instagram link */}
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-pink-400 transition-colors cursor-pointer min-h-[44px]"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-500" />
                <span>@ww.cons</span>
              </a>

              {/* Concierge Button */}
              <a
                href={getWaLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-lg items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>Konsultasi Privat</span>
              </a>

              {/* FULLSCREEN MEGA MENU TRIGGER */}
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 text-slate-200 font-mono text-xs tracking-wider transition-all duration-300 min-h-[44px] cursor-pointer"
                aria-label="Buka direktori menu arsitektural"
              >
                <LuMenu className="w-4 h-4 text-amber-400" />
                <span className="font-bold tracking-widest">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. Cinematic Hero Stage with Segmented Dock Controller */}
      <HeroCinematicStage />

      {/* 5. Broadcast Project Reel (Remotion Cinema Showcase) */}
      <section id="video-reel" className="py-24 bg-[#090D14] border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold">
                  DOKUMENTASI REKAYASA FISIK · LAPANGAN
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                Rekaman Pengerjaan Nyata di Surabaya
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm leading-relaxed">
              Pantau langsung hasil rekaman video fisik pekerjaan @ww.cons: pembesian, pengecoran balok dak, dan penyelesaian fasad komersial.
            </p>
          </div>

          <RemotionShowcase />
        </div>
      </section>

      {/* 6. Selected Works Showcase with Double-Bezel Frames & Technical Inspection Trigger */}
      <section id="portfolio" className="py-28 border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-16 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-2 font-bold">
                KOLEKSI PORTOFOLIO REKAYASA & BANGUNAN
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Karya Terpilih Surabaya
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Klik kartu untuk inspeksi spesifikasi teknis</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {luxuryWorks.map((work) => (
              <div
                key={work.title}
                onClick={() => setSelectedProject(work)}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-500/50 p-2.5 sm:p-3 transition-all duration-500 cursor-pointer shadow-xl"
              >
                {/* Inner Core Container */}
                <div className="rounded-xl bg-[#0B0F18] border border-white/5 p-5 sm:p-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Featured Photo with Hover Zoom */}
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden mb-6 bg-black border border-white/10">
                      <Image
                        src={work.img}
                        alt={work.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Floating Inspection Trigger Pill */}
                      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] tracking-widest uppercase flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <LuEye className="w-3 h-3 text-amber-400" />
                        <span>Inspeksi Dokumen</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono text-amber-400 mb-2 font-semibold">
                      <span>{work.category}</span>
                      <span className="text-slate-400">{work.location}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-amber-400 transition-colors tracking-tight">
                      {work.title}
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed font-light mb-6 font-sans line-clamp-3">
                      {work.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <div>
                      <span className="text-amber-500 font-bold mr-2">SPESIFIKASI:</span>
                      <span className="text-slate-300 truncate inline-block max-w-[220px] sm:max-w-xs align-bottom">
                        {work.materials}
                      </span>
                    </div>
                    <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-500/20 transition-all shrink-0">
                      <LuArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The 5 Pillars of Excellence */}
      <section id="standards" className="py-28 bg-[#090D14] border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-3 font-bold">
              THE 5 PILLARS OF CRAFTSMANSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              5 Standar Presisi Eksekusi Fisik
            </h2>
            <p className="text-sm text-slate-400 mt-4 font-light leading-relaxed">
              Diterapkan secara ketat pada seluruh proyek rancang bangun Wonderful Works Construction di Surabaya untuk menjamin ketenangan dan nilai investasi jangka panjang pemilik properti.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pillars.map((p) => (
              <div
                key={p.step}
                className="rounded-xl bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
              >
                <div>
                  <div className="text-2xl font-mono font-bold text-amber-400 mb-3">{p.step}</div>
                  <h3 className="text-base font-serif font-bold text-white mb-2 leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                  <LuShieldCheck className="w-3 h-3 text-amber-400" />
                  <span>WW STANDAR SNI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Private Concierge Footer */}
      <footer id="concierge" className="py-24 bg-[#05070B] text-slate-400 text-xs border-t border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black/90 border border-amber-500/40 p-1 flex items-center justify-center rounded-xs shadow-md shrink-0">
                  <Image
                    src="/images/ww/logo_transparent.png"
                    alt="Wonderful Works Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-base font-serif font-bold text-white uppercase tracking-wider block">
                    Wonderful Works Construction
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 uppercase block">
                    Bespoke Contractor · Surabaya
                  </span>
                </div>
              </div>
              <p className="text-slate-400 font-light leading-relaxed mb-6 max-w-md">
                General contractor tepercaya di Surabaya dengan moto <em>&ldquo;Quality is our priority&rdquo;</em>. Menjamin kontrak SPK tertulis berkekuatan hukum, transparansi analisa harga satuan, dan pengawasan langsung insinyur sipil.
              </p>
              <div className="text-slate-400 space-y-1.5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <LuMapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Kantor: Jl. Serenity No. 29, Semolowaru, Surabaya 60119</span>
                </div>
                <div className="pl-5 text-slate-500">
                  Cakupan: Surabaya (Timur, Barat, Pusat, Selatan), Sidoarjo, & Gresik
                </div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white uppercase tracking-wider mb-2 font-mono text-sm">
                  KONSULTASI & AUDIT LAPANGAN PRIVAT
                </h3>
                <p className="text-slate-400 mb-6 font-light leading-relaxed max-w-lg">
                  Atur jadwal diskusi gambar denah arsitektur, perhitungan Rencana Anggaran Biaya (RAB), atau cek kelayakan struktur bersama tim rekayasa kami.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={getWaLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <LuPhone className="w-4 h-4" />
                    <span>WhatsApp Tim Sipil (+62 811-3313-347)</span>
                  </a>
                  <a
                    href="https://www.instagram.com/ww.cons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-mono text-xs font-bold uppercase tracking-wider rounded-full transition-all inline-flex items-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    <FaInstagram className="w-4 h-4 text-pink-500" />
                    <span>Dokumentasi @ww.cons</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 text-slate-500 font-mono text-[11px] flex flex-wrap gap-x-4 gap-y-1">
                <span>✓ SPK Resmi Berkekuatan Hukum</span>
                <span>✓ Mutu Beton SNI K-350</span>
                <span>✓ Transparansi RAB Terbuka</span>
                <span>✓ Masa Retensi 100 Hari</span>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-500 font-mono text-[11px] gap-2">
            <span>&copy; {new Date().getFullYear()} Wonderful Works Construction. All rights reserved.</span>
            <span>BESPOKE ARCHITECTURAL EDITION · SURABAYA</span>
          </div>
        </div>
      </footer>

      {/* 9. Interactive Fullscreen Mega Menu with Live Hover Preview */}
      <ArchitecturalMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* 10. Technical Project Inspection Modal Drawer */}
      <ProjectInspectionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
