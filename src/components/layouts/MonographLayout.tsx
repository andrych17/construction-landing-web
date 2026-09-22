'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuArrowUpRight, LuPhone, LuArrowRight, LuMenu, LuX } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import RemotionShowcase from '@/components/remotion/RemotionShowcase';

const monographWorks = [
  {
    num: '01',
    title: 'Jotun Showroom Commercial Fit-Out',
    type: 'Commercial & Retail Architecture',
    year: '2026',
    location: 'Surabaya, Jawa Timur',
    img: '/images/projects/jotun_showroom_hq.jpg',
    scope: 'General contracting, reinforced showcase partitions, museum-grade corporate lighting, and acoustic ceilings.',
  },
  {
    num: '02',
    title: 'Pekerjaan Pembesian & Struktur Lapangan',
    type: 'Structural Concrete Engineering',
    year: '2026',
    location: 'Semolowaru, Surabaya',
    img: '/images/projects/concrete_rebar_hq.jpg',
    scope: 'Daily progress logging, slump test verification, and seismic-compliant reinforced concrete frame.',
  },
  {
    num: '03',
    title: 'Rancang Bangun Rumah Mewah Privat',
    type: 'Private Luxury Residential',
    year: '2026',
    location: 'Surabaya Timur',
    img: '/images/projects/luxury_residence_hq.jpg',
    scope: 'Modern contemporary and classic detailing, premium Italian marble laying, and millimeter precision plastering.',
  },
  {
    num: '04',
    title: 'Fasad Arsitektur Ramah Iklim Tropis',
    type: 'Climate-Adaptive Facade',
    year: '2026',
    location: 'Surabaya',
    img: '/images/projects/tropical_facade_hq.jpg',
    scope: 'Cross-ventilation louvers, heavy monsoon rainwater barriers, and UV-reflective wall coatings.',
  },
];

const ateliers = [
  {
    code: 'DISCIPLINE 01',
    name: 'General Contracting & Commercial Fit-Out',
    desc: 'Pembangunan ruang usaha, showroom representatif, ruko, dan perkantoran dengan kepatuhan standar mutu korporat multinasional.',
    specs: ['Struktur Baja & Beton SNI', 'Plafon Akustik & Tata Cahaya', 'Standar PBG & K3 Surabaya'],
  },
  {
    code: 'DISCIPLINE 02',
    name: 'Private Residential & Exclusive Estates',
    desc: 'Konstruksi rumah tinggal eksklusif dengan presisi ukuran tingkat tinggi, material finishing Grade-A, dan ketahanan iklim tropis maritim.',
    specs: ['Pondasi Tahan Gempa', 'Akurasi Siku 90° & Nat Milimeter', 'Pengawas Sipil Dedikatif'],
  },
  {
    code: 'DISCIPLINE 03',
    name: 'Structural Re-Engineering & Retrofitting',
    desc: 'Audit integritas struktural, penambahan lantai dak beton, dan perkuatan balok/kolom gedung eksisting tanpa komplikasi.',
    specs: ['Audit Tanah Surabaya', 'Perkuatan Kolom Beton', 'Zero Budget Drift Tertulis'],
  },
  {
    code: 'DISCIPLINE 04',
    name: 'Tropical Facade Engineering & Integrated MEP',
    desc: 'Desain fasad berinsulasi termal penangkal panas matahari Surabaya dan sinkronisasi utilitas pipa/kabel sejak awal cor.',
    specs: ['Insulasi Termal UV', 'Drainase Hujan Musiman', 'Zero Bobok Jalur Pipa'],
  },
];

const tenets = [
  { num: 'I', title: 'Ketepatan Elevasi & Lot Siku', desc: 'Setiap dinding, kolom, dan kusen diverifikasi ketegakan lot vertikalnya guna mencegah kemiringan visual dan struktural.' },
  { num: 'II', title: 'Uji Slump & Mutu Beton SNI', desc: 'Pengecoran dilakukan hanya setelah pengujian slump test memenuhi nilai 12±2 cm dan besi tulangan terikat sesuai gambar kerja.' },
  { num: 'III', title: 'Transparansi Biaya Mutlak', desc: 'RAB terperinci berbasis Analisa Harga Satuan Pekerjaan (AHSP) tanpa klausul tersembunyi ataupun biaya siluman di tengah proyek.' },
  { num: 'IV', title: 'Laporan Progres Harian Terbuka', desc: 'Dokumentasi foto dan video log pekerjaan lapangan dikirimkan berkala secara transparan langsung ke WhatsApp pemilik proyek.' },
  { num: 'V', title: 'Integrasi Utilitas Sejak Awal', desc: 'Jalur plumbing dan kelistrikan disinkronkan sebelum cor dak, menjamin zero bobok ulang dinding.' },
];

export default function MonographLayout() {
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
    { label: 'Index Karya', href: '#folio' },
    { label: 'Multimedia', href: '#media' },
    { label: 'Disiplin', href: '#disciplines' },
    { label: 'Prinsip QC', href: '#principles' },
    { label: 'Studio', href: '#contact' },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      {/* Studio Header (Monograph Style) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-baseline gap-3 focus:outline-none">
              <span className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-950 font-mono">
                WONDERFUL WORKS
              </span>
              <span className="hidden xl:inline text-xs font-mono text-slate-500">
                PRACTICE / SURABAYA · 7.3015° S, 112.7758° E
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-600 hover:text-slate-950 uppercase tracking-wider transition-colors py-2 cursor-pointer font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex text-slate-700 hover:text-slate-950 items-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@ww.cons</span>
              </a>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-5 py-2.5 bg-slate-950 text-white hover:bg-slate-800 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors items-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>Konsultasi Proyek</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Monograph Navigation"
                aria-expanded={isOpen}
                className="lg:hidden p-2.5 text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              >
                {isOpen ? <LuX className="w-5 h-5" /> : <LuMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-8 space-y-6 shadow-xl animate-in fade-in duration-150">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-semibold pb-2 border-b border-slate-100">
              ARSIP & DIREKTORI MONOGRAF
            </div>
            <div className="space-y-4 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-bold text-slate-900 hover:text-orange-600 uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-950 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs"
              >
                <LuPhone className="w-4 h-4" />
                <span>Konsultasi WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-800 text-xs font-mono font-bold rounded-xs"
              >
                <FaInstagram className="w-4 h-4 text-pink-600" />
                <span>Dokumentasi Instagram @ww.cons</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero: Monumental Swiss Monograph Headline */}
      <section className="pt-36 sm:pt-44 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-8 pb-4 border-b border-slate-200">
            <span>GENERAL CONTRACTOR & CIVIL ENGINEERING</span>
            <span>EAST JAVA, ID</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[92px] font-black uppercase tracking-tighter text-slate-950 leading-[0.95] mb-10">
            Built Reality. <br />
            <span className="text-slate-600">Pure Precision.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 text-lg sm:text-xl text-slate-800 leading-relaxed font-light">
              Wonderful Works Construction berakar dari disiplin rekayasa sipil ketat dan dedikasi <em>&ldquo;Quality is our priority&rdquo;</em>. Kami mentransformasi gambar arsitektur menjadi karya fisik yang kokoh, transparan secara anggaran, dan diselesaikan tepat waktu di Surabaya dan sekitarnya.
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2 font-mono text-xs text-slate-700 border-l-2 border-slate-900 pl-6">
              <div>LOKASI KANTOR: Jl. Serenity No. 29, Semolowaru, Surabaya</div>
              <div>SUPERVISI: Tim Ahli Sipil & Quality Control Mandiri</div>
              <div>SPESIALISASI: Komersial, Showroom, Residensial Mewah & Struktur</div>
            </div>
          </div>

          {/* Panoramic Flagship Visual */}
          <div className="mt-16">
            <div className="relative aspect-[21/9] w-full bg-slate-100 rounded-xs overflow-hidden border border-slate-200">
              <Image
                src="/images/projects/jotun_showroom_hq.jpg"
                alt="Jotun Showroom Commercial Fit-Out Surabaya"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
            {/* Architectural Caption Strip below image (Anti-slop standard) */}
            <div className="mt-3 pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs font-mono text-slate-700">
              <div>
                <span className="font-bold text-slate-950 uppercase">Plat No. 01: Jotun Showroom Fit-Out</span>
                <span className="text-slate-600 ml-2">Surabaya, Jawa Timur</span>
              </div>
              <div className="text-slate-600">
                Spesifikasi: Struktur Showcase Beban Berat & Finishing Korporat Mutu SNI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Broadcast Project Reel (Remotion Cinema) */}
      <section id="media" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-mono tracking-widest text-slate-600 uppercase mb-2 font-bold">
                CINEMATIC FIELD RECORD · 30 FPS BROADCAST
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-950">
                Dokumentasi Multimedia Lapangan
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-700 max-w-sm leading-relaxed">
              Rekaman kemajuan fisik pekerjaan Wonderful Works Construction dari tahap pondasi hingga penyerahan kunci.
            </p>
          </div>

          <RemotionShowcase />
        </div>
      </section>

      {/* Asymmetric Selected Works Folio */}
      <section id="folio" className="py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-900 mb-16 text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            <span>INDEX PROYEK REKAYASA & ARSITEKTUR</span>
            <span>DOKUMENTASI RIIL @WW.CONS</span>
          </div>

          <div className="space-y-20">
            {monographWorks.map((work, idx) => (
              <div
                key={work.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 border-b border-slate-200 last:border-0"
              >
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] w-full bg-slate-100 rounded-xs overflow-hidden border border-slate-200 group">
                    <Image
                      src={work.img}
                      alt={work.title}
                      fill
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-5 flex flex-col justify-between h-full ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div>
                    <div className="flex items-baseline gap-3 mb-4 font-mono text-sm">
                      <span className="text-2xl font-black text-slate-950">{work.num}</span>
                      <span className="text-slate-600 font-bold">/ 04</span>
                      <span className="ml-auto text-xs uppercase px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-300 font-bold">
                        {work.type}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-3 leading-snug">
                      {work.title}
                    </h3>

                    <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                      {work.scope}
                    </p>

                    <div className="space-y-2 py-4 border-t border-slate-200 text-xs font-mono text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-600">LOKASI:</span>
                        <span className="text-slate-950 font-bold">{work.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">TAHUN SELESAI:</span>
                        <span className="text-slate-950 font-bold">{work.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">STANDAR KONTRAK:</span>
                        <span className="text-slate-950 font-bold">Zero Hidden Cost SPK</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <a
                      href="https://wa.me/628113313347"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-slate-950 hover:text-orange-600 transition-colors cursor-pointer min-h-[44px] py-2"
                    >
                      <span>Konsultasikan Tipologi Serupa</span>
                      <LuArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disciplines / Ateliers */}
      <section id="disciplines" className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-mono text-slate-600 tracking-widest uppercase block mb-2 font-bold">
              LINGKUP DISIPLIN KERJA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-950">
              4 Pilar Layanan Konstruksi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ateliers.map((item) => (
              <div
                key={item.code}
                className="bg-white border border-slate-200 p-8 rounded-xs flex flex-col justify-between hover:border-slate-400 transition-colors shadow-2xs"
              >
                <div>
                  <span className="text-xs font-mono text-slate-600 tracking-wider font-bold block mb-2">
                    {item.code}
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mb-3">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-[11px] font-mono text-slate-600 uppercase mb-2 font-bold">
                    Spesifikasi Terstandarisasi:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.specs.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-mono text-slate-800 bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-2xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Tenets (Manifesto Style) */}
      <section id="principles" className="py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-12 text-xs font-mono text-slate-600 font-bold uppercase">
            <span>WW NOTES LAPANGAN (@WW.CONS)</span>
            <span>STANDAR MUTU</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase text-slate-950 mb-12">
            5 Prinsip Presisi Konstruksi
          </h2>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {tenets.map((tenet) => (
              <div key={tenet.num} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                <div className="md:col-span-2 font-mono text-3xl font-black text-slate-950">
                  {tenet.num}
                </div>
                <div className="md:col-span-4 text-lg font-bold text-slate-950">
                  {tenet.title}
                </div>
                <div className="md:col-span-6 text-sm text-slate-700 leading-relaxed font-normal">
                  {tenet.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Contact / Inquiries */}
      <section id="contact" className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-4 font-bold">
                KONSULTASI & TENDER PROYEK
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight mb-8">
                Mulai Diskusi Teknis Bangunan Anda.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl mb-10">
                Kami menerima konsultasi awal denah gambar, analisa kelayakan lahan, dan estimasi Rencana Anggaran Biaya (RAB) terbuka untuk proyek komersial dan rumah tinggal di Surabaya.
              </p>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-white"
              >
                <LuPhone className="w-4 h-4" />
                <span>Hubungi Tim Sipil (+62 811-3313-347)</span>
                <LuArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 text-xs font-mono space-y-4">
              <div className="text-slate-300 uppercase font-bold border-b border-white/10 pb-3">
                KANTOR OPERASIONAL & SURVEI
              </div>
              <div>
                <span className="text-slate-400 block">KONTRAKTOR PELAKSANA:</span>
                <span className="text-white font-bold text-sm">Wonderful Works Construction</span>
              </div>
              <div>
                <span className="text-slate-400 block">ALAMAT STUDIO:</span>
                <span className="text-white">Jl. Serenity No. 29, Semolowaru, Surabaya 60119</span>
              </div>
              <div>
                <span className="text-slate-400 block">JAM OPERASIONAL:</span>
                <span className="text-white">Senin &ndash; Sabtu, 08.00 &ndash; 17.00 WIB</span>
              </div>
              <div>
                <span className="text-slate-400 block">DOKUMENTASI SOSIAL:</span>
                <a
                  href="https://www.instagram.com/ww.cons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 inline-flex items-center gap-1 font-bold mt-1 cursor-pointer min-h-[32px]"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                  <span>Instagram @ww.cons</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between text-xs font-mono text-slate-500">
            <span>&copy; {new Date().getFullYear()} Wonderful Works Construction. All rights reserved.</span>
            <span>ARCHITECTURAL MONOGRAPH EDITION · SURABAYA</span>
          </div>
        </div>
      </section>
    </div>
  );
}
