'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { LuArrowUpRight, LuPhone, LuMapPin, LuMenu, LuX } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import RemotionShowcase from '@/components/remotion/RemotionShowcase';

const stories = [
  {
    tag: 'KOMERSIAL & RITEL',
    title: 'Showroom Cat Jotun: Menyelaraskan Standar Korporat dengan Presisi Lapangan',
    loc: 'Surabaya, Jawa Timur',
    img: '/images/projects/jotun_showroom_hq.jpg',
    excerpt: 'Pengerjaan ruang pamer komersial resmi Jotun di Surabaya membutuhkan integrasi dinding display yang kuat menahan beban, plafon akustik tanpa celah, dan penataan pencahayaan showcase yang akurat.',
    date: 'Edisi 2026',
  },
  {
    tag: 'STRUKTUR BETON',
    title: 'Catatan dari Semolowaru: Mengapa Pembesian dan Slump Test Tidak Boleh Dikompromikan',
    loc: 'Semolowaru, Surabaya',
    img: '/images/projects/concrete_rebar_hq.jpg',
    excerpt: 'Tanah Surabaya memiliki karakteristik unik yang menuntut perhitungan beban teliti. Setiap ikatan besi beton ulir SNI dan uji mutu slump test dikawal langsung demi keandalan struktur seumur hidup.',
    date: 'Edisi 2026',
  },
  {
    tag: 'RESIDENSIAL MEWAH',
    title: 'Membangun Rumah Tinggal Modern-Klasik: Harmoni Antara Estetika dan Ketahanan Tropis',
    loc: 'Surabaya Timur',
    img: '/images/projects/luxury_residence_hq.jpg',
    excerpt: 'Pemasangan lantai marmer Italia dan kesikuan dinding 90 derajat level milimeter menjadi bukti bahwa ketelitian tukang berpengalaman adalah kunci kenyamanan hunian jangka panjang.',
    date: 'Edisi 2026',
  },
];

const editorialServices = [
  {
    num: 'No. 01',
    title: 'General Contracting Komersial',
    summary: 'Rancang bangun gedung usaha, showroom, dan ruko dengan disiplin kurva-S ketat agar bisnis Anda segera beroperasi.',
  },
  {
    num: 'No. 02',
    title: 'Pembangunan Rumah Mewah',
    summary: 'Mewujudkan hunian privat eksklusif dengan pengawasan kualitas harian dan transparansi pemilihan merk material.',
  },
  {
    num: 'No. 03',
    title: 'Renovasi & Perkuatan Struktur',
    summary: 'Menata ulang fungsi ruang, menambah lantai dak beton, dan audit integritas bangunan eksisting tanpa risiko retak.',
  },
  {
    num: 'No. 04',
    title: 'Fasad Tropis & Utilitas MEP',
    summary: 'Fasad peredam panas matahari Surabaya dan instalasi utilitas listrik-pipa tertanam rapi tanpa bobok ulang.',
  },
];

const journalNotes = [
  { pilar: '01', title: 'Struktur Aman & Teruji', note: 'Kalkulasi beban gempa dan pengujian mutu beton berkala adalah harga mati untuk ketenangan pemilik.' },
  { pilar: '02', title: 'Transparansi Tanpa Biaya Siluman', note: 'RAB terperinci per satuan volume. Tidak ada lonjakan tagihan mendadak di tengah pembangunan.' },
  { pilar: '03', title: 'Disiplin Waktu & Laporan Rutin', note: 'Grup WhatsApp proyek aktif memperbarui foto & video kemajuan fisik agar klien dapat memantau kapan saja.' },
  { pilar: '04', title: 'Finishing Halus & Akurasi Laser', note: 'Plesteran siku 90° dan nat keramik rata merupakan standar dasar workmanship kami.' },
  { pilar: '05', title: 'Utilitas Rapi Sejak Awal Cor', note: 'Jalur pipa dan kabel tertanam sebelum dak dicor, menjaga dinding tetap mulus tanpa renovasi ulang.' },
];

const navDepartments = [
  { label: 'LAPORAN UTAMA', href: '#cover-story' },
  { label: 'REKAMAN VIDEO', href: '#editorial-video' },
  { label: 'CATATAN LAPANGAN', href: '#curated-works' },
  { label: 'KEAHLIAN TEKNIS', href: '#disciplines' },
  { label: '5 PILAR PRESISI', href: '#five-pillars' },
  { label: 'MEJA REDAKSI', href: '#editorial-contact' },
];

export default function EditorialLayout() {
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

  return (
    <div className="bg-[#FAF8F5] text-slate-900 min-h-screen font-serif selection:bg-amber-800 selection:text-white">
      {/* Magazine Masthead */}
      <header className="border-b border-stone-300 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-stone-300 pb-4 mb-4 gap-4 text-xs font-sans uppercase tracking-widest text-stone-700 font-semibold">
            <div>THE WONDERFUL WORKS ARCHITECTURAL DISPATCH</div>
            <div>VOL. VIII · EDISI LAPORAN KHUSUS · SURABAYA, 2026</div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-900 transition-colors inline-flex items-center gap-1 cursor-pointer min-h-[40px]"
              >
                <FaInstagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@ww.cons</span>
              </a>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-900 hover:text-amber-700 transition-colors cursor-pointer min-h-[40px] inline-flex items-center"
              >
                +62 811-3313-347
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 uppercase font-serif">
                Wonderful Works
              </h1>
              <p className="text-xs sm:text-sm font-sans tracking-widest text-stone-700 uppercase mt-2 font-medium">
                Wonderful Works Construction &middot; General Contractor & Rekayasa Sipil Surabaya
              </p>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 border border-stone-400 bg-white text-stone-900 hover:bg-stone-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shadow-xs"
              aria-label={isOpen ? 'Tutup menu navigasi redaksi' : 'Buka menu navigasi redaksi'}
              aria-expanded={isOpen}
            >
              {isOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Editorial Department Sticky Navigation Strip */}
        <nav
          aria-label="Navigasi Edisi Redaksi"
          className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-t border-b border-stone-300"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:flex items-center justify-between h-12 text-xs font-sans font-bold uppercase tracking-wider text-stone-800">
              <div className="flex items-center gap-8">
                {navDepartments.map((dept) => (
                  <a
                    key={dept.href}
                    href={dept.href}
                    className="hover:text-amber-900 transition-colors py-3 border-b-2 border-transparent hover:border-amber-900 cursor-pointer min-h-[44px] inline-flex items-center"
                  >
                    {dept.label}
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-stone-900 hover:bg-amber-900 text-white transition-colors cursor-pointer min-h-[36px] inline-flex items-center gap-1.5 shadow-2xs font-semibold"
              >
                <LuPhone className="w-3.5 h-3.5" />
                <span>Konsultasi SPK</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Mobile Editorial Drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 top-[140px] z-50 bg-stone-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-[#FAF8F5] border-b-2 border-stone-900 p-6 shadow-2xl max-h-[calc(100vh-140px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs font-sans uppercase font-bold tracking-widest text-amber-900 pb-2 border-b border-stone-300 mb-4">
                DAFTAR ISI EDISI KHUSUS 2026
              </div>
              <div className="flex flex-col space-y-2">
                {navDepartments.map((dept, idx) => (
                  <a
                    key={dept.href}
                    href={dept.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 font-serif text-lg font-bold text-stone-900 hover:bg-stone-200/60 border border-stone-200 transition-colors min-h-[48px]"
                  >
                    <span>{dept.label}</span>
                    <span className="text-xs font-sans font-mono text-stone-500">DEPT 0{idx + 1}</span>
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-300 space-y-3">
                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 bg-stone-900 hover:bg-amber-900 text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>Hubungi Meja Redaksi & SPK</span>
                  <LuArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/ww.cons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-stone-400 bg-white font-sans text-xs uppercase tracking-wider text-stone-800 flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors min-h-[44px]"
                >
                  <FaInstagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram @ww.cons</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cover Story Hero */}
      <section id="cover-story" className="py-16 sm:py-24 border-b border-stone-300 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Lead Column */}
            <div className="lg:col-span-6">
              <span className="text-xs font-sans uppercase tracking-widest text-amber-900 font-bold block mb-3">
                LAPORAN UTAMA / COVER STORY · 4 MENIT BACA
              </span>

              <h2 className="text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6 font-serif">
                Mengejar Presisi Milimeter di Bawah Terik Cuaca Surabaya.
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-stone-800 leading-relaxed font-serif">
                <p>
                  <span className="text-4xl float-left mr-2 font-bold text-stone-900 leading-none">M</span>
                  embangun di Surabaya bukan sekadar menyusun bata dan menuang semen. Dari kadar panas pesisir yang tinggi hingga keunikan tanah lempung setempat, setiap milimeter elevasi dan mutu beton bertulang memegang peranan krusial bagi umur bangunan.
                </p>
                <p className="text-base text-stone-700 font-sans leading-relaxed">
                  Melalui prinsip dasar <em>&ldquo;Quality is our priority&rdquo;</em>, Wonderful Works Construction menghadirkan pendekatan kontraktor transparan: Rencana Anggaran Biaya yang jelas per item, serta pengawasan mutu lapangan harian yang dilaporkan berkala via WhatsApp.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-300 flex flex-wrap items-center gap-6">
                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-stone-900 hover:bg-amber-900 text-white font-sans text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2 cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-stone-900"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>Konsultasi Proyek Anda</span>
                  <LuArrowUpRight className="w-4 h-4" />
                </a>
                <span className="text-xs font-sans text-stone-700 font-medium">
                  Survei Lokasi Surabaya & Sekitarnya
                </span>
              </div>
            </div>

            {/* Cover Photograph */}
            <div className="lg:col-span-6">
              <div className="bg-white p-4 border border-stone-300 shadow-lg">
                <div className="relative aspect-[4/3] w-full bg-stone-200 overflow-hidden">
                  <Image
                    src="/images/projects/jotun_showroom_hq.jpg"
                    alt="Jotun Showroom Commercial Fit-Out Surabaya"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-3 pt-3 border-t border-stone-200 flex justify-between items-baseline text-xs font-sans text-stone-600">
                  <span className="font-bold text-stone-900">Jotun Showroom Commercial Fit-Out</span>
                  <span>Surabaya, 2026</span>
                </div>
                <p className="text-xs font-sans text-stone-500 mt-1">
                  Dokumentasi pekerjaan partisi arsitektural berat, tata cahaya pameran, dan fasad resmi @ww.cons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Video Reel Feature */}
      <section id="editorial-video" className="py-20 bg-stone-100 border-b border-stone-300 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-sans uppercase tracking-widest text-amber-800 font-bold block mb-2">
              DOKUMENTASI GERAK 30 FPS
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              Rekaman Proyek Nyata Lapangan
            </h3>
            <p className="text-sm font-sans text-stone-600 mt-3">
              Rangkuman eksekusi fisik dari proyek komersial Jotun Showroom hingga pembesian beton di Surabaya Timur.
            </p>
          </div>

          <RemotionShowcase />
        </div>
      </section>

      {/* Field Essays (Projects) */}
      <section id="curated-works" className="py-24 border-b border-stone-300 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b-2 border-stone-900 pb-3 mb-16 flex justify-between items-end">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Catatan Lapangan & Portofolio
            </h3>
            <span className="text-xs font-sans uppercase text-stone-700 font-bold">
              Koleksi Proyek Terverifikasi 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stories.map((story) => (
              <article key={story.title} className="flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/11] w-full bg-stone-200 overflow-hidden mb-4 border border-stone-300 group">
                    <Image
                      src={story.img}
                      alt={story.title}
                      fill
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs font-sans uppercase text-amber-900 font-bold mb-2">
                    <span>{story.tag}</span>
                    <span className="text-stone-600 font-semibold">{story.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 leading-snug mb-3 font-serif">
                    {story.title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed font-sans mb-4">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-300 text-xs font-sans text-stone-700 flex items-center gap-1 font-medium">
                  <LuMapPin className="w-3.5 h-3.5 text-amber-800" />
                  <span>{story.loc}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialisms (Services Columns) */}
      <section id="disciplines" className="py-20 bg-stone-100 border-b border-stone-300 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans uppercase tracking-widest text-amber-900 font-bold block mb-2">
              KECAKAPAN TEKNIS
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              Empat Bidang Keahlian Konstruksi
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {editorialServices.map((svc) => (
              <div key={svc.num} className="bg-[#FAF8F5] p-6 border border-stone-300 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-stone-600 font-bold block mb-2">
                    {svc.num}
                  </span>
                  <h4 className="text-lg font-bold text-stone-900 font-serif mb-3">
                    {svc.title}
                  </h4>
                  <p className="text-xs font-sans text-stone-700 leading-relaxed font-normal">
                    {svc.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WW Notes Journal Entries (5 Pillars) */}
      <section id="five-pillars" className="py-24 border-b border-stone-300 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-sans uppercase tracking-widest text-amber-900 font-bold block mb-2">
              FILOSOFI & JURNAL HARIAN
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              5 Pilar Presisi dari Seri @ww.cons Notes
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {journalNotes.map((item) => (
              <div
                key={item.pilar}
                className="bg-white p-6 sm:p-8 border border-stone-300 flex flex-col sm:flex-row items-start gap-6 shadow-2xs"
              >
                <span className="text-3xl font-serif font-bold text-amber-900 flex-shrink-0">
                  {item.pilar}
                </span>
                <div>
                  <h4 className="text-lg font-bold font-serif text-stone-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm font-sans text-stone-700 leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Inquiries & Letter */}
      <footer id="editorial-contact" className="py-20 bg-stone-900 text-stone-300 font-sans text-xs scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
            <div className="md:col-span-6">
              <h4 className="text-lg font-serif font-bold text-white mb-3">
                Wonderful Works Construction
              </h4>
              <p className="font-serif text-sm text-stone-400 leading-relaxed max-w-md mb-6">
                Membawa ketenangan bagi pemilik bangunan melalui standar mutu yang disiplin, laporan berkala harian, dan pertanggungjawaban profesional yang kokoh di Surabaya.
              </p>
              <div className="text-stone-400 space-y-1">
                <div>Alamat Kantor: Jl. Serenity No. 29, Semolowaru, Surabaya 60119</div>
                <div>Layanan: Surabaya Timur, Barat, Pusat, Sidoarjo, dan Gresik</div>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-white uppercase tracking-wider mb-2">
                  Hubungi Meja Redaksi & Teknik
                </h5>
                <p className="text-stone-400 mb-4">
                  Diskusikan gambar denah dan Rencana Anggaran Biaya proyek Anda bersama perwakilan teknis kami.
                </p>
                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-800 hover:bg-amber-700 text-white font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>WhatsApp (+62 811-3313-347)</span>
                </a>
              </div>
              <div className="mt-6 text-stone-500 text-[11px]">
                Dokumentasi foto dan reel lapangan lengkap dapat diverifikasi di Instagram @ww.cons.
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between text-stone-500 text-[11px]">
            <span>&copy; {new Date().getFullYear()} Wonderful Works Construction. All rights reserved.</span>
            <span>THE EDITORIAL DISPATCH EDITION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
