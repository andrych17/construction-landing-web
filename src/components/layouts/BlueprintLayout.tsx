'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuPhone, LuArrowUpRight, LuFileSpreadsheet, LuMapPin, LuRuler, LuCircleCheck, LuMenu, LuX } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import RemotionShowcase from '@/components/remotion/RemotionShowcase';

const wbsServices = [
  {
    code: 'WBS-01',
    division: 'Divisi 01 / Konstruksi Komersial & Showroom',
    scope: 'Pembangunan struktur showroom representatif, gedung kantor, ruko komersial, dan ruang ritel.',
    standards: 'Mutu Beton K-300 SNI · Struktur Baja WF · Plafon Akustik · Pencahayaan Pameran',
    deliverable: 'Bangunan Laik Fungsi (SLF) · Gambar As-Built Drawings · Sertifikat Garansi BAST',
  },
  {
    code: 'WBS-02',
    division: 'Divisi 02 / Rancang Bangun Hunian Mewah',
    scope: 'Konstruksi rumah tinggal eksklusif arsitektur modern minimalis dan profil klasik presisi.',
    standards: 'Pondasi Tahan Gempa SNI 1726 · Nat Granit Presisi Milimeter · Plesteran Acian Siku 90°',
    deliverable: 'Serah Terima Kunci 100% · Laporan Video Progress Harian · Bebas Keretakan Struktur',
  },
  {
    code: 'WBS-03',
    division: 'Divisi 03 / Re-Engineering Struktur & Renovasi',
    scope: 'Audit kekuatan tanah gerak Surabaya, perkuatan kolom/balok eksisting, dan penambahan lantai.',
    standards: 'Jacketing Beton Bertulang · Chemical Anchor Hilti · Membran Waterproofing Bakar',
    deliverable: 'Zero Kerusakan Dinding Tetangga · Analisa Beban Rekayasa · Bebas Biaya Tak Terduga',
  },
  {
    code: 'WBS-04',
    division: 'Divisi 04 / Fasad Terisolasi & Utilitas Terpadu (MEP)',
    scope: 'Pemasangan fasad kisi-kisi anti-radiasi UV dan instalasi pipa/kabel sebelum pengecoran dak.',
    standards: 'Pipa Conduit PVC High Impact · Talang Air Anti-Luapan · Panel Distribusi Schneider',
    deliverable: 'Garansi Bebas Bocor · Jalur Utilitas As-Built Rapi · Efisiensi Energi Bangunan',
  },
];

const blueprintSheets = [
  {
    sheetNo: 'SHT-01',
    title: 'Jotun Showroom Commercial Fit-Out',
    cat: 'COMMERCIAL',
    loc: 'Surabaya, Jawa Timur',
    img: '/images/projects/jotun_showroom_hq.jpg',
    specs: 'Showroom resmi produk cat Jotun. Struktur partisi berat, tata cahaya pameran presisi, dan fasad kaca.',
  },
  {
    sheetNo: 'SHT-02',
    title: 'Pembesian & Pengecoran Lapangan',
    cat: 'STRUCTURAL',
    loc: 'Semolowaru, Surabaya',
    img: '/images/projects/concrete_rebar_hq.jpg',
    specs: 'Pengawasan slump test beton, ikatan besi ulir SNI, dan checklist izin cor bertahap oleh Site Manager.',
  },
  {
    sheetNo: 'SHT-03',
    title: 'Hunian Residensial Modern & Klasik',
    cat: 'RESIDENTIAL',
    loc: 'Surabaya Timur',
    img: '/images/projects/luxury_residence_hq.jpg',
    specs: 'Rancang bangun rumah mewah eksklusif dengan presisi elevasi lantai dan finishing material Grade-A.',
  },
  {
    sheetNo: 'SHT-04',
    title: 'Fasad Arsitektural Ramah Iklim',
    cat: 'ENVELOPE',
    loc: 'Surabaya Barat',
    img: '/images/projects/tropical_facade_hq.jpg',
    specs: 'Fasad sirip penahan radiasi matahari tropis dan sistem waterproofing anti-bocor musiman.',
  },
];

const qaGates = [
  { step: 'GATE 01', name: 'Survey Elevasi & Bowplank', desc: 'Penentuan peil ±0.00 akurat menggunakan waterpass laser untuk memastikan kesikuan bangunan.' },
  { step: 'GATE 02', name: 'Checklist Besi Tulangan', desc: 'Verifikasi diameter, jumlah, dan ikatan kawat bendrat pembesian balok kolom sesuai gambar DED.' },
  { step: 'GATE 03', name: 'Uji Slump Test Beton', desc: 'Pengujian kelecakan campuran beton ready mix di lokasi (nilai slump 12±2 cm) sebelum tuang cor.' },
  { step: 'GATE 04', name: 'Inspeksi Bekisting & Curing', desc: 'Pengecekan kerapatan papan cor dan penyiraman air (curing) pasca-cor demi mencegah retak susut.' },
  { step: 'GATE 05', name: 'Sleeve MEP Pre-Coring', desc: 'Pipa air dan kabel listrik tertanam sebelum cor dak untuk mencegah bongkar ulang.' },
];

export default function BlueprintLayout() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [isOpen, setIsOpen] = useState(false);

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

  const navLinks = [
    { label: '[SHT: PROYEK]', href: '#sheets' },
    { label: '[WBS: LAYANAN]', href: '#wbs' },
    { label: '[QC: 5-GATE]', href: '#gates' },
    { label: '[INSPEKSI: VIDEO]', href: '#video' },
    { label: '[TENDER]', href: '#tender' },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 font-mono min-h-screen selection:bg-blue-600 selection:text-white">
      {/* Blueprint Header Rulers */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-blue-500/30 text-xs">
        {/* Top Engineering Title Block */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 border-b border-blue-900/50">
            <a href="#" className="flex items-center gap-3 focus:outline-none">
              <div className="w-9 h-9 bg-blue-600 rounded-xs flex items-center justify-center font-black text-white text-base">
                WW
              </div>
              <div>
                <span className="font-bold tracking-wider text-white text-sm block">
                  WONDERFUL WORKS
                </span>
                <span className="text-[10px] text-blue-400">
                  CIVIL & GENERAL CONTRACTING · SURABAYA
                </span>
              </div>
            </a>

            {/* Desktop Engineering Nav Tabs */}
            <nav className="hidden lg:flex items-center gap-2 text-[11px] font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-2.5 py-1.5 rounded-xs text-slate-300 hover:text-blue-300 hover:bg-blue-950/60 border border-transparent hover:border-blue-700/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
              >
                <FaInstagram className="w-4 h-4 text-pink-500" />
                <span>@ww.cons</span>
              </a>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors items-center gap-2"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>Konsultasi Teknis</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle CAD Navigation"
                aria-expanded={isOpen}
                className="lg:hidden p-2 text-blue-400 hover:text-white hover:bg-slate-800 border border-blue-900 rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                {isOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile CAD Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-blue-500/40 px-6 py-6 space-y-5 text-xs font-mono">
            <div className="text-[10px] text-blue-400 uppercase tracking-widest pb-1 border-b border-slate-800 font-bold">
              INDEX GAMBAR KERJA & SPEK LAPANGAN
            </div>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-200 hover:text-blue-400 text-sm font-bold tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider rounded-xs text-xs"
              >
                <LuPhone className="w-4 h-4" />
                <span>WhatsApp Site Manager</span>
              </a>
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-slate-300 text-xs rounded-xs"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-500" />
                <span>Instagram @ww.cons</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero: Engineering Blueprint Matrix */}
      <section className="pt-32 sm:pt-40 pb-20 border-b border-blue-900/40 relative blueprint-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Technical Specification Matrix */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/80 border border-blue-500/40 text-blue-400 text-xs uppercase tracking-widest mb-6">
                <LuRuler className="w-3.5 h-3.5" />
                <span>SURABAYA CIVIL & COMMERCIAL CONTRACTOR</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight mb-6">
                Ketelitian Milimeter. <br />
                <span className="text-blue-400">Keamanan Struktur 100%.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Wonderful Works Construction adalah mitra general contractor di Surabaya yang mengedepankan kalkulasi teknik sipil SNI, transparansi RAB berbasis Analisa Harga Satuan, serta pengawasan mutu lapangan secara harian.
              </p>

              {/* Engineering Specs Table */}
              <div className="bg-slate-950/90 border border-blue-900/60 p-5 rounded-xs space-y-2.5 text-xs text-slate-300 mb-8">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">STANDAR MUTU BETON:</span>
                  <span className="text-white font-bold">K-300 s/d K-350 Ready Mix SNI</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">BEBAN GEMPA & TANAH:</span>
                  <span className="text-white font-bold">Analisa SNI 1726 Wilayah Surabaya</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">TOLERANSI AKURASI:</span>
                  <span className="text-blue-400 font-bold">± 2 mm (Laser Waterpass)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SISTEM PEMBAYARAN:</span>
                  <span className="text-emerald-400 font-bold">Termin Sesuai Opname Fisik Nyata</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-xs uppercase font-bold tracking-wider rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>Diskusikan Rencana Gambar</span>
                  <LuArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#wbs"
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs uppercase font-bold tracking-wider rounded-xs transition-colors cursor-pointer min-h-[44px] inline-flex items-center"
                >
                  Lihat Lembar WBS
                </a>
              </div>
            </div>

            {/* Right: Technical Project Sheet Visual */}
            <div className="lg:col-span-6 bg-slate-950 border border-blue-500/40 p-4 rounded-xs shadow-2xl relative">
              <div className="flex justify-between items-center text-[10px] text-blue-400 pb-2 mb-2 border-b border-slate-800">
                <span>DETAIL SHEET: PROYEK SHOWROOM JOTUN SURABAYA</span>
                <span>STATUS: AS-BUILT 2026</span>
              </div>

              <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden border border-slate-800">
                <Image
                  src="/images/projects/jotun_showroom_hq.jpg"
                  alt="Jotun Showroom Commercial Fit-Out"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Millimeter CAD Overlays */}
                <div className="absolute top-3 left-3 bg-slate-950/90 border border-blue-500/50 px-2.5 py-1 text-[10px] text-white font-mono">
                  ELEVASI: +3.80 m (PLAFON SHOWCASE)
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-emerald-500/50 px-2.5 py-1 text-[10px] text-emerald-400 font-mono">
                  QC STATUS: VERIFIKASI 100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Work Breakdown Structure (WBS / Services) */}
      <section id="wbs" className="py-24 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-blue-400 uppercase tracking-widest block mb-1">
                CIVIL & STRUCTURAL WORK BREAKDOWN
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
                Work Breakdown Structure (WBS)
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Dokumen Acuan Kontrak Kerja Lapangan
            </div>
          </div>

          <div className="space-y-4">
            {wbsServices.map((wbs) => (
              <div
                key={wbs.code}
                className="bg-slate-950 border border-slate-800 hover:border-blue-500/60 transition-colors p-6 rounded-xs"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-blue-950 border border-blue-600 text-blue-400 text-xs font-bold">
                      {wbs.code}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {wbs.division}
                    </h3>
                  </div>
                  <div className="text-xs text-emerald-400">
                    DELIVERABLE: {wbs.deliverable}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4 text-xs">
                  <div className="lg:col-span-6 text-slate-300 leading-relaxed">
                    <span className="text-slate-400 block mb-1 font-semibold">LINGKUP PEKERJAAN:</span>
                    {wbs.scope}
                  </div>
                  <div className="lg:col-span-6 text-slate-300 leading-relaxed">
                    <span className="text-blue-400 block mb-1 font-semibold">STANDAR MUTU SNI & ACUAN:</span>
                    {wbs.standards}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remotion Video Inspection Monitor */}
      <section id="video" className="py-24 bg-slate-950 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-blue-400 uppercase tracking-widest block mb-1">
                TELEMETRI VIDEO LAPANGAN · 30 FPS REMOTION
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
                Inspeksi Visual Proyek Nyata
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Dokumentasi berkala pelaksanaan struktur beton & showroom resmi @ww.cons
            </div>
          </div>

          <RemotionShowcase />
        </div>
      </section>

      {/* Drawing Sheets Portfolio (Projects) */}
      <section id="sheets" className="py-24 bg-slate-950 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs text-blue-400 uppercase tracking-widest block mb-1">
                PROJECT CATALOGUE & AS-BUILT SHEETS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
                Lembar Proyek Lapangan
              </h2>
            </div>
            <div className="text-xs text-slate-400">
              Menampilkan {activeTab === 'ALL' ? blueprintSheets.length : blueprintSheets.filter((s) => s.cat === activeTab).length} dari {blueprintSheets.length} Lembar Terverifikasi
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <span className="text-xs text-blue-400 mr-2 uppercase tracking-wider font-bold">Kategori CAD:</span>
            {['ALL', 'COMMERCIAL', 'STRUCTURAL', 'RESIDENTIAL', 'ENVELOPE'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 py-2 text-xs rounded-xs border transition-colors cursor-pointer min-h-[40px] flex items-center ${
                  activeTab === cat
                    ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-blue-500 hover:text-white'
                }`}
              >
                {cat === 'ALL' ? 'SEMUA PROYEK' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'ALL' ? blueprintSheets : blueprintSheets.filter((s) => s.cat === activeTab)).map((sheet) => (
              <div
                key={sheet.sheetNo}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500 transition-colors p-4 rounded-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center text-[10px] text-slate-300 pb-2 mb-3 border-b border-slate-800">
                    <span className="font-bold text-blue-400">{sheet.sheetNo}</span>
                    <span className="text-slate-400">{sheet.cat}</span>
                  </div>

                  <div className="relative aspect-[4/3] w-full bg-slate-800 rounded-xs overflow-hidden mb-4">
                    <Image
                      src={sheet.img}
                      alt={sheet.title}
                      fill
                      className="object-cover object-center group-hover:scale-103 transition-transform"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {sheet.title}
                  </h3>
                  <div className="text-[11px] text-slate-300 mb-3 flex items-center gap-1">
                    <LuMapPin className="w-3.5 h-3.5 text-blue-400" />
                    <span>{sheet.loc}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                    {sheet.specs}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] text-blue-400 font-bold flex justify-between items-center">
                  <span>DOKUMEN TERVERIFIKASI</span>
                  <LuCircleCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 QA/QC Gates (Methodology) */}
      <section id="gates" className="py-24 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs text-blue-400 uppercase tracking-widest block mb-2 font-bold">
              STANDAR KUALITAS @WW.CONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
              5 Gerbang Mutu Rekayasa (QA/QC)
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Setiap tahapan fisik harus melewati checklist pengawasan lapangan sebelum lanjut ke proses berikutnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {qaGates.map((gate) => (
              <div key={gate.step} className="bg-slate-950 border border-slate-800 p-5 rounded-xs">
                <div className="text-xs font-bold text-blue-400 mb-2">{gate.step}</div>
                <h4 className="text-sm font-bold text-white mb-2">{gate.name}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{gate.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Tender & Inquiries */}
      <footer id="tender" className="py-20 bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
            <div>
              <h4 className="text-white font-bold uppercase mb-3 text-sm">KANTOR TEKNIS & DRAFTING</h4>
              <p className="leading-relaxed">
                Wonderful Works Construction<br />
                Jl. Serenity No. 29, Semolowaru<br />
                Surabaya, Jawa Timur 60119
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase mb-3 text-sm">KOMUNIKASI SITE MANAGER</h4>
              <p className="leading-relaxed mb-3">
                Waktu Respons: &lt; 15 Menit pada Jam Kerja
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-bold inline-flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <LuPhone className="w-3.5 h-3.5" />
                  <span>WhatsApp: +62 811-3313-347</span>
                </a>
                <a
                  href="https://www.instagram.com/ww.cons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 font-bold inline-flex items-center gap-1.5 cursor-pointer py-1"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                  <span>Instagram: @ww.cons</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase mb-3 text-sm">SPK & HUKUM</h4>
              <p className="leading-relaxed">
                Semua proyek dilindungi Surat Perjanjian Kerja berkekuatan hukum dengan spesifikasi RAB transparan dan klausul retensi pemeliharaan.
              </p>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]">
            <span>&copy; {new Date().getFullYear()} Wonderful Works Construction · Blueprint Engineering Matrix</span>
            <span>PRODUCED WITH CIVIL PRECISION IN SURABAYA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
