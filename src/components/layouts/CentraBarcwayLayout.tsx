'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowUpRight,
  LuPhone,
  LuMapPin,
  LuMenu,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import ArchitecturalMegaMenu from '@/components/interactive/ArchitecturalMegaMenu';
import SectionRailIndicator from '@/components/interactive/SectionRailIndicator';
import ProjectInspectionModal, { ProjectDetail } from '@/components/interactive/ProjectInspectionModal';

const ROTATING_DISCIPLINES = ['Architecture', 'Interior', 'Planning', 'Contracting'];

const FUSION_PHILOSOPHIES = [
  {
    num: '01',
    title: 'INSIDE OUT',
    tagline: 'Mereduksi Batas Ruang Dalam & Luar',
    desc: 'Blurring the boundaries between indoor and outdoor through open layouts and flowing natural materials — creating spaces deeply connected to nature.',
    execution: 'Menghilangkan sekat artifisial antara interior dan iklim tropis Surabaya melalui void ganda tinggi, fasad kisi aluminium penahan tampias hujan pesisir, serta sistem ventilasi silang pasif.',
    img: '/images/projects/tropical_facade_hq.jpg',
    material: 'Double-Glazed Low-E Glass, Kisi Aluminium Pesisir 2.0mm, Void Sirkulasi Udara',
  },
  {
    num: '02',
    title: 'BALANCED CONTRAST',
    tagline: 'Harmoni Tekstur Kasar & Halus',
    desc: 'Creating bold yet balanced designs rich in texture and scale. Combining rough and smooth, raw and refined, grand and intimate — achieving harmony through contrast.',
    execution: 'Mengawinkan kekuatan mentah beton bertulang K-350 dan struktur baja masif dengan kehalusan slab marmer alam Italia bookmatched serta kayu solid jati Jawa dengan akurasi nat deviasi < 1mm.',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    material: 'Beton Bertulang K-350, Marmer Statuario Alam, Kayu Solid Tropis',
  },
  {
    num: '03',
    title: 'NARRATIVE SPACE',
    tagline: 'Alur Spasial Terencana & Presisi',
    desc: 'Spaces shaped by purpose and context, unfolding through sequence, scale, and form to tell a meaningful story of living.',
    execution: 'Ruang yang terbentuk dari kebiasaan hidup penghuni. Seluruh utilitas MEP (pipa air & conduit listrik) ditanam rapi sebelum pengecoran struktur plat dak, menjamin 0% risiko bongkar ulang pasca serah terima.',
    img: '/images/projects/modern_villa_hq.jpg',
    material: 'Instalasi MEP Tertanam Pra-Cor, Siku Presisi 90° Digital, Plafon Akustik NRC 0.85',
  },
];

const FUSION_PROJECTS: ProjectDetail[] = [
  {
    title: 'DG House',
    category: 'PRIVATE RESIDENCE',
    location: 'Surabaya Timur, Jawa Timur',
    img: '/images/projects/luxury_residence_hq.jpg',
    materials: 'Natural Italian Marble, Tropical Solid Wood, Precision Cantilever Concrete',
    desc: 'Hunian privat dengan penataan spasial mengalir bebas. Menghadirkan void ganda tinggi dan batas kaca masif yang menyatukan taman dalam ruang dengan kenyamanan interior berhawa sejuk.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Bespoke Custom Luxury Residence' },
      { label: 'Struktur Bangunan', value: 'Beton Bertulang K-350 SNI Tahan Gempa' },
      { label: 'Finishing Utama', value: 'Slab Marmer Statuario & Kisi Ulin Asli' },
      { label: 'Sistem Pencahayaan', value: 'Architectural Warm 2700K Recessed Spotlight' },
      { label: 'Kontraktor Pelaksana', value: 'ww.cons (Wonderful Works Studio)' },
    ],
  },
  {
    title: 'MJ House',
    category: 'TROPICAL MODERN ESTATE',
    location: 'Surabaya Barat',
    img: '/images/projects/modern_villa_hq.jpg',
    materials: 'Monolithic Basalt, Powder-Coated Dark Metal, Water Mirror Pool',
    desc: 'Komposisi arsitektur monolitik yang berani namun tenang. Menggunakan kolam cermin air dan kanopi kantilever untuk meredam suhu iklim maritim Surabaya.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Tropical Architectural Sanctuary' },
      { label: 'Struktur Lantai', value: 'Sistem Plat Dua Arah Presisi Tanpa Lendutan' },
      { label: 'Toleransi Konstruksi', value: 'Akurasi Siku 90° Digital (Deviasi < 1mm)' },
      { label: 'Waterproofing', value: 'Waterproofing Membran Bakar Dual-Layer' },
    ],
  },
  {
    title: 'W Office & Jotun Flagship',
    category: 'COMMERCIAL HEADQUARTERS',
    location: 'Voza Premium Tower, Surabaya',
    img: '/images/projects/jotun_showroom_hq.jpg',
    materials: 'Acoustic Wall Panels, Low-Iron Glass Partitions, Bespoke Joinery',
    desc: 'Ruang kerja korporat dan showroom resmi berstandar internasional. Menggabungkan efisiensi operasional dengan atmosfer galeri seni kontemporer.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Executive Commercial Fit-Out' },
      { label: 'Plafon & Akustik', value: 'Plafon Akustik Peredam Suara NRC 0.85' },
      { label: 'Instalasi MEP', value: 'Smart Integrated HVAC & Cable Trunking' },
      { label: 'Standar Serah Terima', value: '100% Zero-Defect Handover Milestone' },
    ],
  },
  {
    title: 'AW House',
    category: 'COURTYARD ESTATE',
    location: 'Kertajaya Indah, Surabaya',
    img: '/images/projects/tropical_facade_hq.jpg',
    materials: 'Granite Big Slab, Aluminium Louvers, Courtyard Greenery',
    desc: 'Arsitektur pekarangan dalam (inner courtyard) yang memberikan privasi absolut bagi pemilik di tengah dinamika pusat kota metropolitan.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Urban Courtyard Living' },
      { label: 'Drainase Lapangan', value: 'Sistem Pompa Resapan Sump-Pit Otomatis' },
      { label: 'Keamanan Struktur', value: 'Besi Ulir Penuh SNI dengan Pengawasan Insinyur' },
    ],
  },
  {
    title: 'RS House',
    category: 'MONOLITHIC RESIDENCE',
    location: 'Malang Highlands, Jawa Timur',
    img: '/images/projects/facade_architecture_hq.jpg',
    materials: 'Exposed Aggregate Concrete, Teak Louvre, Double Glazing',
    desc: 'Dinding beton bertekstur tebal yang membingkai pemandangan perbukitan. Didesain untuk menciptakan kehangatan alami di tengah udara dataran tinggi yang dingin.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Highland Luxury Retreat' },
      { label: 'Ketahanan Termal', value: 'Double-Skin Facade dengan Rongga Udara' },
      { label: 'Kaca Jendela', value: 'Double Glazed Low-E Glass Soundproof' },
    ],
  },
  {
    title: 'Z House',
    category: 'CANTILEVER RESIDENCE',
    location: 'Surabaya & Sidoarjo',
    img: '/images/projects/concrete_rebar_hq.jpg',
    materials: 'Engineered Steel Rebar, Structural Concrete K-350, Floating Staircase',
    desc: 'Eksplorasi struktural kantilever melayang tanpa tiang penyangga tengah. Menuntut perhitungan momen lentur yang luar biasa presisi.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Structural Cantilever Villa' },
      { label: 'Mutu Beton', value: 'ReadyMix K-350 Admixture Plastiment' },
      { label: 'Tangga Melayang', value: 'Monolithic Cantilever Steel-Embedded Stairs' },
    ],
  },
];

export default function CentraBarcwayLayout() {
  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const [openPhilosophyIndex, setOpenPhilosophyIndex] = useState<number | null>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDisciplineIndex((prev) => (prev + 1) % ROTATING_DISCIPLINES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#000000] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-black relative w-full overflow-x-hidden">
      {/* 1. Architectural Preloader */}
      <ArchitecturalPreloader />

      {/* 2. Spatial Telemetry Rail */}
      <SectionRailIndicator />

      {/* 3. Full-Width Barcway Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#000000]/90 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo Lockup — WW.CONS */}
            <a href="#hero" className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm">
              <div className="w-9 h-9 rounded-sm border border-white/20 bg-black/80 flex items-center justify-center p-1 group-hover:border-amber-400/80 transition-colors overflow-hidden shrink-0 shadow-sm">
                <Image
                  src="/images/ww/logo_transparent.png"
                  alt="ww.cons Official Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-[17px] tracking-[0.2em] font-bold text-white uppercase">
                    WW.CONS
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
                <span className="text-[8.5px] font-mono tracking-[0.28em] text-neutral-400 uppercase">
                  ARCHITECTURE · INTERIOR · CONTRACTING
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-9 text-xs font-mono tracking-[0.2em] uppercase">
              <a href="#hero" className="text-white hover:text-amber-400 transition-colors py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#statement" className="text-neutral-400 hover:text-white transition-colors py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <span>About</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#philosophy" className="text-neutral-400 hover:text-white transition-colors py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <span>Philosophy</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#projects" className="text-neutral-400 hover:text-white transition-colors py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <span>Projects</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#execution" className="text-neutral-400 hover:text-white transition-colors py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <span>Execution</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#contact" className="text-neutral-400 hover:text-white transition-colors py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-5 py-2.5 rounded-full border border-white/20 hover:border-amber-400/80 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-colors min-h-[44px] items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuPhone className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">+62 822 9819 9902</span>
              </a>

              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-amber-400 transition-colors font-mono text-xs font-bold tracking-widest min-h-[44px] cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Open Directory Menu"
              >
                <LuMenu className="w-4 h-4" />
                <span className="whitespace-nowrap">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 4. FULL-WIDTH BARCWAY HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-[100dvh] flex items-end justify-center pb-20 pt-24 overflow-hidden border-b border-white/[0.08] w-full"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/facade_architecture_hq.jpg"
            alt="ww.cons Architecture & General Contractor"
            fill
            priority
            className="object-cover object-center brightness-[0.32] contrast-[1.12]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,#000000_85%)]" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 text-center max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-normal text-white tracking-tight leading-[1.02] mb-3 lowercase"
          >
            ww.cons
          </motion.h1>

          <div className="h-14 sm:h-16 flex items-center justify-center overflow-hidden mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={ROTATING_DISCIPLINES[currentDisciplineIndex]}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-300 tracking-wide leading-[1.1] pb-1"
              >
                {ROTATING_DISCIPLINES[currentDisciplineIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-300 text-lg sm:text-xl font-light tracking-wide max-w-xl mx-auto mb-10"
          >
            Bold Artisan Design for Inspired Living
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 min-h-[48px] flex items-center gap-2 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Explore Projects</span>
              <LuArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#philosophy"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors min-h-[48px] flex items-center active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Our Philosophy
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 text-center font-mono text-[9.5px] tracking-[0.3em] text-neutral-500 uppercase px-4">
          WW.CONS · ARCHITECTURE & GENERAL CONTRACTOR · VOZA PREMIUM TOWER & SEMOLOWARU · SURABAYA
        </div>
      </section>

      {/* 5. FULL-WIDTH STATEMENT & PROVENANCE (CENTRA ARYA LOKA HERITAGE) */}
      <section id="statement" className="py-28 md:py-36 border-b border-white/[0.08] relative w-full">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-16 text-center">
          <p className="font-serif text-base sm:text-lg md:text-xl text-neutral-300 leading-[2.1] sm:leading-[2.3] tracking-[1.1px] font-normal mb-12">
            ww.cons (Wonderful Works Construction) is a visionary architecture, interior design, and general contracting firm dedicated to creating extraordinary environments that harmonize luxury, innovation, and artistry. Specializing in high-end residential and commercial spaces across Surabaya and East Java, we push the boundaries of design through bold forms and material exploration, crafting homes and interiors that elevate lifestyles and celebrate individuality. Our designs go beyond aesthetics—they enrich the lives of our clients. Every project is crafted to inspire well-being, foster meaningful connections, and support a fulfilling lifestyle for those who live and work within them.
          </p>

          <div className="w-20 h-[1px] bg-amber-400/40 mx-auto mb-8" />

          <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-2xl mx-auto tracking-[0.2em] leading-relaxed uppercase">
            35 TAHUN DEDIKASI TEKNIK SIPIL SURABAYA · STANDAR STRUKTUR SNI K-350 · AKURASI LASER 90° DEV. &lt; 1MM · GARANSI RETENSI RESMI 100 HARI
          </p>
        </div>
      </section>

      {/* 6. FULL-WIDTH OUR DESIGN PHILOSOPHY ACCORDION */}
      <section id="philosophy" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
                THE FOUNDATION OF EVERY SPACE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.08] mb-6">
                Our Design Philosophy
              </h2>
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Every architectural commission begins with spatial purpose and material honesty. We unite bold form exploration with physical structural mastery.
              </p>
              <div className="hidden lg:block font-mono text-xs text-neutral-500 tracking-widest uppercase">
                SURABAYA · SIDOARJO · MALANG HIGHLANDS
              </div>
            </div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-8 space-y-6">
              {FUSION_PHILOSOPHIES.map((p, idx) => {
                const isOpen = openPhilosophyIndex === idx;
                return (
                  <div
                    key={p.num}
                    className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenPhilosophyIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 sm:p-8 flex justify-between items-center bg-[#111111] hover:bg-[#161616] transition-colors min-h-[64px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-lg sm:text-xl font-bold text-amber-400">
                          {p.num}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                          {p.title}
                        </h3>
                        <span className="hidden md:inline font-mono text-xs text-neutral-400 tracking-wider">
                          — {p.tagline}
                        </span>
                      </div>
                      <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center font-mono text-lg text-white shrink-0 ml-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden bg-[#181818] border-t border-white/5"
                        >
                          <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="md:col-span-7">
                              <p className="text-base sm:text-lg text-neutral-200 font-serif leading-relaxed mb-6 italic">
                                &ldquo;{p.desc}&rdquo;
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans mb-6">
                                {p.execution}
                              </p>
                              <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-neutral-400">
                                <span className="text-amber-400 block mb-1">REALISASI TEKNIS & MATERIAL:</span>
                                <span className="text-neutral-300">{p.material}</span>
                              </div>
                            </div>

                            <div className="md:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
                              <Image
                                src={p.img}
                                alt={p.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 500px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-3 left-3 font-mono text-[9px] text-amber-400 uppercase tracking-widest bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                                WW.CONS COMMISSIONS
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FULL-WIDTH PROJECTS SHOWCASE */}
      <section id="projects" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full overflow-hidden">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1800px] mx-auto">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 pb-6 border-b border-white/[0.08] gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                PORTFOLIO COMMISSIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
                Projects
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-white/15 rounded-full p-1 bg-neutral-900 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('carousel')}
                  className={`px-4 py-2 rounded-full transition-colors cursor-pointer min-h-[38px] active:scale-[0.98] ${
                    viewMode === 'carousel' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Slider
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-full transition-colors cursor-pointer min-h-[38px] active:scale-[0.98] ${
                    viewMode === 'grid' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Matrix
                </button>
              </div>

              {viewMode === 'carousel' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    className="w-11 h-11 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Previous Projects"
                  >
                    <LuChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    className="w-11 h-11 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Next Projects"
                  >
                    <LuChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {viewMode === 'carousel' ? (
            <div
              ref={carouselRef}
              className="flex gap-7 overflow-x-auto scrollbar-none pb-6 scroll-smooth snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {FUSION_PROJECTS.map((proj) => (
                <div
                  key={proj.title}
                  onClick={() => setSelectedProject(proj)}
                  className="w-[320px] sm:w-[400px] md:w-[460px] lg:w-[500px] shrink-0 snap-start group cursor-pointer"
                >
                  <div className="relative h-[380px] sm:h-[440px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-neutral-950 mb-4 border border-white/10 group-hover:border-amber-400/60 transition-colors">
                    <Image
                      src={proj.img}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                      sizes="(max-width: 768px) 400px, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9.5px] tracking-widest text-amber-400 uppercase">
                      {proj.category}
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline px-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>
                    <span className="font-mono text-xs text-neutral-400">{proj.location}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FUSION_PROJECTS.map((proj) => (
                <div
                  key={proj.title}
                  onClick={() => setSelectedProject(proj)}
                  className="group rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black mb-5 border border-white/5">
                      <Image
                        src={proj.img}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85] group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                        {proj.category}
                      </div>
                    </div>

                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-xs text-neutral-400">{proj.location}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-2 mb-6 font-sans">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>INSPECT BLUEPRINT</span>
                    <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-400 text-amber-400 transition-colors">
                      <LuArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 8. FULL-WIDTH EXECUTION RIGOR */}
      <section id="execution" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
              PHYSICAL REALIZATION MASTERY · CENTRA HERITAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-4">
              Where Bold Design Meets Structural Rigor
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Memadukan estetika visioner Barcway dengan disiplin kontraktor umum ww.cons. 35 tahun rekayasa sipil Surabaya menjamin setiap desain megah berdiri kokoh, aman, dan tanpa cela.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-3xl font-bold text-amber-400 mb-4">
                  01 / STRUKTUR
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                  SNI K-350 Concrete
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  Ready-mix concrete dengan uji slump mandiri di setiap kedatangan truk mixer. Pembesian besi ulir penuh SNI diikat kawat bendrat ganda untuk ketahanan seismik.
                </p>
              </div>
              <div className="mt-10 pt-4 border-t border-white/10 font-mono text-[10.5px] text-neutral-500 uppercase tracking-wider">
                UJI LAB INDEPENDEN · ZERO HONEYCOMB
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-3xl font-bold text-amber-400 mb-4">
                  02 / PRESISI
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                  Laser 90° Cornering
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  Verifikasi sudut siku 90 derajat digital laser untuk seluruh ruangan, nat marmer lurus sempurna, dan deviasi sambungan keramik/granit di bawah 1mm.
                </p>
              </div>
              <div className="mt-10 pt-4 border-t border-white/10 font-mono text-[10.5px] text-neutral-500 uppercase tracking-wider">
                KALIBRASI DIGITAL · TOLERANSI MILIMETER
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-3xl font-bold text-amber-400 mb-4">
                  03 / AKUNTABILITAS
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                  SPK & Zero Defect
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                  Kontrak kerja resmi berbadan hukum dengan jadwal milestone transparan, grup koordinasi laporan visual harian, serta garansi retensi pasca serah terima 100 hari.
                </p>
              </div>
              <div className="mt-10 pt-4 border-t border-white/10 font-mono text-[10.5px] text-neutral-500 uppercase tracking-wider">
                KONTRAK RESMI · LAPORAN HARIAN PRIVAT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FULL-WIDTH CONTACT & FOOTER */}
      <footer id="contact" className="py-24 md:py-28 bg-[#000000] text-neutral-400 text-xs border-t border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.08]">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-10 h-10 rounded-sm border border-white/20 bg-black/80 flex items-center justify-center p-1 shrink-0 shadow-sm">
                  <Image
                    src="/images/ww/logo_transparent.png"
                    alt="ww.cons Official Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide uppercase">
                    WW.CONS™
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>
              </div>
              <div className="font-mono text-[10px] tracking-widest text-amber-400 uppercase mb-5 font-bold">
                Redefining Luxury Through Bold Design & Structural Precision
              </div>
              <p className="text-neutral-400 font-light leading-relaxed mb-8 max-w-md text-xs sm:text-sm">
                Dedicated to creating extraordinary architectural environments. Integrating bold forms, material exploration, and uncompromising construction execution across Indonesia.
              </p>
              <div className="text-neutral-400 space-y-3 font-mono text-xs">
                <div className="flex items-start gap-3">
                  <LuMapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-bold">Gedung Voza Premium Office, Lt. 20</div>
                    <div>Jl. HR Muhammad No. 31A, Surabaya, Indonesia</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <LuMapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-neutral-300 font-bold">Engineering Workshop & Field Base</div>
                    <div>Jl. Semolowaru No. 48, Surabaya Timur</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4">
                  Contact
                </h2>
                <div className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                  FOR INQUIRIES & PRIVATE COMMISSIONS
                </div>
                <p className="text-neutral-400 mb-8 font-light max-w-lg text-xs sm:text-sm leading-relaxed">
                  For private luxury estate commissions, corporate headquarters planning, or structural general contracting consultations in Surabaya and East Java.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <LuPhone className="w-3.5 h-3.5" />
                    <span>WhatsApp: +62 822 9819 9902</span>
                  </a>
                  <a
                    href="mailto:info@wwconstruction.id"
                    className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <span>info@wwconstruction.id</span>
                  </a>
                  <a
                    href="https://instagram.com/ww.cons"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 min-h-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <FaInstagram className="w-3.5 h-3.5 text-amber-400" />
                    <span>@ww.cons</span>
                  </a>
                </div>
              </div>

              <div className="mt-12 font-mono text-[11px] text-neutral-500">
                Inside Out · Balanced Contrast · Narrative Space · Structural Excellence
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-neutral-500 font-mono text-[11px] gap-3">
            <span>
              WW.CONS™ | Maximizing Space Potential Through Design & Planning | Copyright ww.cons ©{new Date().getFullYear()}. All Rights Reserved.
            </span>
            <span className="text-neutral-400">VOZA PREMIUM TOWER & SEMOLOWARU · SURABAYA</span>
          </div>
        </div>
      </footer>

      {/* Fullscreen Architectural Mega Menu */}
      <ArchitecturalMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Project Inspection Modal */}
      <ProjectInspectionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
