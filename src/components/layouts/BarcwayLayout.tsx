'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowUpRight,
  LuPhone,
  LuMapPin,
  LuChevronLeft,
  LuChevronRight,
  LuPlay,
  LuPause,
  LuCircleCheck,
} from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import SectionRailIndicator from '@/components/interactive/SectionRailIndicator';
import ProjectInspectionModal, { ProjectDetail } from '@/components/interactive/ProjectInspectionModal';
import BarcwayNav from '@/components/navigation/BarcwayNav';
import BarcwayFooter from '@/components/navigation/BarcwayFooter';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

// Design Read:
// Luxury Architectural Studio & High-End General Contractor landing page for discerning residential & commercial patrons in Surabaya.
// Monolithic dark aesthetic, Baskervville serif typography, full-width expansive framing, anti-slop restraint, and tactile feedback.
// Dials: DESIGN_VARIANCE: 8 | MOTION_INTENSITY: 6 | VISUAL_DENSITY: 3

const ROTATING_DISCIPLINES = ['Architecture', 'Interior', 'Planning', 'General Contracting'];

export const BARCWAY_FOUNDERS = [
  {
    name: 'Edward Matthew',
    role: 'Principal',
    image: '/images/founders/edward_matthew.jpg',
    focus: 'Architectural Vision & Spatial Master Planning',
    bio: 'Directing architectural innovation, monumental form exploration, and seamless spatial dialogues between private sanctuaries and their natural context.',
  },
  {
    name: 'Jefferson D. Halim',
    role: 'Principal',
    image: '/images/founders/jefferson_halim.jpg',
    focus: 'Interior Architecture & Material Harmony',
    bio: 'Orchestrating bespoke interior narratives, textural tension between raw and refined surfaces, and structural finishing fidelity across Surabaya commissions.',
  },
];

export const CENTRA_SERVICES = [
  {
    category: 'RESIDENTIAL BUILDING',
    subtitle: 'Your dream home, built with care and precision.',
    desc: 'Bespoke high-end private residences engineered for optimal tropical comfort, abundant natural light, and structural resilience.',
    types: [
      'Minimalist House',
      'Classic Minimalist House',
      'Industrial Minimalist House',
      'Modern Minimalist House',
    ],
    features: [
      'Double-height void thermal ventilation & cross airflow',
      'Structural grade SNI K-350 reinforced concrete framework',
      'Laser 90° deviance < 1mm interior marble & timber joinery',
    ],
    image: '/images/projects/luxury_residence_hq.jpg',
  },
  {
    category: 'COMMERCIAL BUILDING',
    subtitle: 'Functional, attractive spaces for thriving businesses.',
    desc: 'Prestigious commercial venues engineered for workflow efficiency, commanding street presence, and high-traffic durability.',
    types: [
      'Offices & Workspaces',
      'Retail & Restaurants',
      'Clinics & Service Facilities',
    ],
    features: [
      'Acoustic zoning, ergonomic lighting & commercial HVAC planning',
      'Industrial steel, architectural glass & fire-rated partitions',
      'Strict milestone compliance & zero overhead delay handovers',
    ],
    image: '/images/projects/jotun_showroom_hq.jpg',
  },
];

export const MASTER_METHODOLOGY = [
  {
    step: '01',
    title: 'Discovery & Vision Alignment',
    idDesc: 'Pertemuan perdana yang didedikasikan untuk menyelaraskan visi desain, kebutuhan ruang, dan standar operasional cal.idn.',
  },
  {
    step: '02',
    title: 'Aerial Drone & Site Survey',
    idDesc: 'Analisis lokasi komprehensif memanfaatkan teknologi aerial drone imaging untuk menangkap perspektif lingkungan dan kontur tapak.',
  },
  {
    step: '03',
    title: 'Bespoke Financial Engineering (RAB)',
    idDesc: 'Penyusunan Rencana Anggaran Biaya akurat dengan Proprietary AHS (Analisa Harga Satuan) internal cal.idn tanpa hidden cost.',
  },
  {
    step: '04',
    title: 'Collaborative Commitment (SPK)',
    idDesc: 'Penandatanganan kontrak kerja transparan dengan pemaparan spesifikasi teknis material dan time schedule (TS) resmi.',
  },
  {
    step: '05',
    title: 'Systematic Milestone Dispatch',
    idDesc: 'Pengawasan harian dan mingguan yang dilaporkan secara sistematis dan real-time oleh Project Manager dan PIC lapangan.',
  },
  {
    step: '06',
    title: 'Rigorous Material Approval',
    idDesc: 'Setiap material masuk melewati uji slump on-site dan approval berkala Site Engineer untuk sinkronisasi gambar kerja.',
  },
  {
    step: '07',
    title: 'Principal Quality Supervision',
    idDesc: 'Pengawasan langsung oleh tim insinyur sipil berpengalaman 35 tahun menjamin standar mutu tertinggi pada setiap sudut.',
  },
  {
    step: '08',
    title: 'Collaborative Handover & Routine Warranty',
    idDesc: 'Final check bersama arsitek sebelum penandatanganan BAST, dilengkapi masa garansi dan inspeksi rutin 2x setahun.',
  },
];

const BARCWAY_PHILOSOPHIES = [
  {
    num: '01',
    title: 'INSIDE OUT',
    tagline: 'Mereduksi Batas Ruang Dalam & Luar',
    desc: 'Blurring the boundaries between indoor and outdoor through open layouts and flowing natural materials — creating spaces deeply connected to nature.',
    execution: 'Rekayasa bukaan void ganda tinggi dengan kisi fasad aluminium penahan tampias iklim tropis maritim Surabaya, memaksimalkan sirkulasi silang pasif dan pencahayaan alami tanpa radiasi panas berlebih.',
    img: '/images/projects/tropical_facade_hq.jpg',
    material: 'Double-Glazed Low-E Glass, Coastal Aluminium Louvers, Teak Pergola',
  },
  {
    num: '02',
    title: 'BALANCED CONTRAST',
    tagline: 'Harmoni Tekstur Kasar & Halus',
    desc: 'Creating bold yet balanced designs rich in texture and scale. Combining rough and smooth, raw and refined, grand and intimate — achieving harmony through contrast.',
    execution: 'Menyatukan ketangguhan mentah beton ekspos K-350 dan baja struktural hitam dengan keanggunan marmer alam bookmatched Italia, serta lantai kayu solid jati Jawa dengan nat laser deviasi < 1mm.',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    material: 'Statuario Natural Marble, Exposed Monolithic Concrete, Solid Teakwood',
  },
  {
    num: '03',
    title: 'NARRATIVE SPACE',
    tagline: 'Ruang Spasial yang Mengalir & Bercerita',
    desc: 'Spaces shaped by purpose and context, unfolding through sequence, scale, and form to tell a meaningful story of living.',
    execution: 'Alur sirkulasi ruang terhitung presisi. Seluruh instalasi utilitas MEP (pemipaan air bersih & conduit kelistrikan) ditanam rapi sebelum pengecoran struktur plat dak, menjamin 0% resiko bobok ulang pasca finishing.',
    img: '/images/projects/modern_villa_hq.jpg',
    material: 'Pre-Cast Embedded Conduit MEP, 90° Digital Corner Bevel, Acoustic Drywall',
  },
];

const BARCWAY_PROJECTS: ProjectDetail[] = [
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
    title: 'M House',
    category: 'MINIMALIST RESIDENCE',
    location: 'Dharmahusada Indah, Surabaya',
    img: '/images/projects/facade_architecture_hq.jpg',
    materials: 'Off-White Architectural Stucco, Custom Pivot Door, Slate Stone',
    desc: 'Hunian minimalis dengan geometri bersih dan pintu masuk pivot raksasa setinggi 4 meter. Mengedepankan ketenangan visual serta privasi total dari jalan utama.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Contemporary Private Home' },
      { label: 'Tinggi Plafon', value: 'High Ceiling 4.2 Meter Void' },
      { label: 'Pondasi Struktur', value: 'Strauß Pile & Pile Cap Beton K-350' },
      { label: 'Ketahanan Cuaca', value: 'Cat Fasad Elastomeric Anti-Retak Rambut' },
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
    title: 'W Office',
    category: 'COMMERCIAL HEADQUARTERS',
    location: 'Voza Premium Tower, Surabaya',
    img: '/images/projects/jotun_showroom_hq.jpg',
    materials: 'Acoustic Wall Panels, Low-Iron Glass Partitions, Bespoke Joinery',
    desc: 'Ruang kerja korporat dan ruang pamer flagship berstandar internasional. Menggabungkan efisiensi operasional dengan atmosfer galeri seni kontemporer.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Executive Commercial Fit-Out' },
      { label: 'Plafon & Akustik', value: 'Plafon Akustik Peredam Suara NRC 0.85' },
      { label: 'Instalasi MEP', value: 'Smart Integrated HVAC & Cable Trunking' },
      { label: 'Standar Serah Terima', value: '100% Zero-Defect Handover Milestone' },
    ],
  },
  {
    title: 'O House',
    category: 'PRIVATE RESIDENTIAL ESTATE',
    location: 'Citraland, Surabaya Barat',
    img: '/images/projects/construction_crane_hq.jpg',
    materials: 'Reinforced Concrete Columns, Heavy Steel I-Beams, Glass Facade',
    desc: 'Kediaman eksklusif dengan rekayasa bentang struktur lebar di kontur bukit Citraland, dibangun dengan pengawasan geoteknik ketat dan fondasi terukur.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Hillside Modern Villa' },
      { label: 'Pondasi Lereng', value: 'Dinding Penahan Tanah (Retaining Wall) Terhitung' },
      { label: 'Baja Profil', value: 'Baja WF Krakatau Steel SNI Full' },
    ],
  },
  {
    title: 'A House',
    category: 'PAVILION VILLA',
    location: 'Graha Famili, Surabaya Barat',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    materials: 'Teak Millwork, Honed Travertine, Fluted Glass',
    desc: 'Paviliun santai keluarga dengan interior kustom mewah. Setiap panel kayu dan nat batu dipasang secara manual oleh pengrajin ahli dengan presisi tinggi.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Private Pavilion Retreat' },
      { label: 'Pertukangan Interior', value: 'Custom Teak Cabinetry Finishing Melamic Natural' },
      { label: 'Lantai', value: 'Travertine Honed Sealer Kedap Noda' },
    ],
  },
  {
    title: 'NE House',
    category: 'MINIMALIST LUXURY',
    location: 'Pakuwon City, Surabaya Timur',
    img: '/images/projects/site_engineer_hq.jpg',
    materials: 'Curtain Wall Glass, Architectural Iron, Textured Concrete',
    desc: 'Hunian kontemporer 3 lantai berorientasi angin laut pesisir. Menghadirkan kesejukan pasif dan ketahanan material terhadap kelembapan udara asin.',
    specsTable: [
      { label: 'Tipe Proyek', value: 'Coastal Urban Residence' },
      { label: 'Ketahanan Korosi', value: 'Stainless Steel Grade 316 untuk Hardware Eksterior' },
      { label: 'Sistem Kaca', value: 'Tempered 10mm Laminated Glass Tahan Angin Kencang' },
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

export default function BarcwayLayout() {
  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const [openPhilosophyIndex, setOpenPhilosophyIndex] = useState<number | null>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Rotating disciplines cycle (exact Barcway behavior)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDisciplineIndex((prev) => (prev + 1) % ROTATING_DISCIPLINES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Continuous smooth auto-glide replicating barcway.com's continuous Swiper autoplay
  useEffect(() => {
    if (viewMode !== 'carousel' || isCarouselPaused) return;
    const container = carouselRef.current;
    if (!container) return;

    let animId: number;
    const speed = 0.85;

    const step = () => {
      if (container) {
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else {
          container.scrollLeft += speed;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [viewMode, isCarouselPaused]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="bg-[#000000] text-slate-100 font-sans min-h-screen selection:bg-amber-500 selection:text-black relative w-full overflow-x-hidden">
      {/* 1. Architectural Preloader */}
      <ArchitecturalPreloader />

      {/* 2. Spatial Telemetry Rail */}
      <SectionRailIndicator />

      {/* 3. Full-Width Barcway Signature Navigation */}
      <BarcwayNav />

      {/* 4. FULL-WIDTH CINEMATIC HERO (Anti-Slop: Viewport Fitted, Descender Cleared) */}
      <section
        id="hero"
        className="relative min-h-[100dvh] flex items-end justify-center pb-20 pt-24 overflow-hidden border-b border-white/[0.08] w-full"
      >
        {/* Ambient Dark Atmospheric Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects/facade_architecture_hq.jpg"
            alt="ww.cons Architecture & General Contractor Surabaya"
            fill
            priority
            className="object-cover object-center brightness-[0.32] contrast-[1.12]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-black/75" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,#000000_85%)]" />
        </div>

        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 text-center max-w-[1400px] mx-auto">
          {/* Monumental Baskervville Serif Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-normal text-white tracking-tight leading-[1.02] mb-3 lowercase"
          >
            ww.cons
          </motion.h1>

          {/* Animated Rotating Headline with Italic Descender Clearance (pb-1 leading-[1.1]) */}
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

          {/* Subtitle (Strict < 20 Words Anti-Slop Limit) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-300 text-lg sm:text-xl font-light tracking-wide max-w-xl mx-auto mb-10"
          >
            Bold Artisan Design for Inspired Living
          </motion.p>

          {/* Minimalist Action CTAs (Single-Line, Tactile Feedback, WCAG Contrast) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/projects"
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 min-h-[48px] flex items-center gap-2 active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shadow-lg"
            >
              <span>Explore Projects</span>
              <LuArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-colors min-h-[48px] flex items-center active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Our Studio & Philosophy
            </Link>
          </motion.div>
        </div>

        {/* Bottom Coordinates Bar */}
        <div className="absolute bottom-6 left-0 right-0 z-10 text-center font-mono text-[9.5px] tracking-[0.3em] text-neutral-500 uppercase px-4">
          WW.CONS · ARCHITECTURE & GENERAL CONTRACTOR · VOZA PREMIUM OFFICE & SEMOLOWARU · SURABAYA
        </div>
      </section>

      {/* 5. ABOUT US (BARCWAY STUDIO ETHOS & PEDIGREE) */}
      <section id="about" className="py-28 md:py-36 border-b border-white/[0.08] relative w-full scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1200px] mx-auto px-6 sm:px-12 md:px-16 text-center"
        >
          <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-4 font-bold">
            STUDIO ETHOS & ARCHITECTURAL PEDIGREE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.05] mb-10">
            About Us
          </h2>

          <p className="font-serif text-base sm:text-lg md:text-xl text-neutral-200 leading-[2.1] sm:leading-[2.3] tracking-[1.1px] font-normal mb-8 max-w-4xl mx-auto">
            ww.cons is a leading architecture, interior design, and general contracting firm specializing in high-end residential and commercial spaces. We create extraordinary environments that blend luxury, innovation, and artistry, crafting unique designs that elevate lifestyles and reflect individuality.
          </p>

          <p className="font-serif text-base sm:text-lg md:text-xl text-neutral-400 leading-[2.1] sm:leading-[2.3] tracking-[1.1px] font-normal mb-12 max-w-4xl mx-auto">
            Our approach goes beyond aesthetics—we design spaces that inspire well-being, foster connections, and support fulfilling lifestyles. By combining bold ideas, thoughtful details, and innovative materials, we deliver designs that are both functional and breathtaking. At ww.cons, every project is a collaboration to create spaces that feel personal, timeless, and truly extraordinary.
          </p>

          <div className="w-20 h-[1px] bg-amber-400/40 mx-auto mb-8" />

          <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-2xl mx-auto tracking-[0.2em] leading-relaxed uppercase mb-8">
            35 TAHUN DEDIKASI TEKNIK SIPIL SURABAYA · STANDAR STRUKTUR SNI K-350 · AKURASI LASER 90° DEV. &lt; 1MM · GARANSI RETENSI RESMI 100 HARI
          </p>

          <div className="flex justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px]"
            >
              <span>Explore Studio Ethos & Founders</span>
              <LuArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 6. FULL-WIDTH PHILOSOPHY ACCORDION */}
      <section id="philosophy" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column (Sticky on Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
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
            </motion.div>

            {/* Right Accordion Column */}
            <div className="lg:col-span-8 space-y-6">
              {BARCWAY_PHILOSOPHIES.map((p, idx) => {
                const isOpen = openPhilosophyIndex === idx;
                return (
                  <motion.div
                    key={p.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden transition-all duration-300"
                  >
                    {/* Interactive Accordion Bar */}
                    <button
                      type="button"
                      onClick={() => setOpenPhilosophyIndex(isOpen ? null : idx)}
                      className="w-full text-left p-6 sm:p-8 flex justify-between items-center bg-[#111111] hover:bg-[#161616] transition-colors min-h-[64px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
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
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center font-mono text-xl text-white shrink-0 ml-4 group-hover:border-amber-400 group-hover:text-amber-400 transition-colors select-none"
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Expandable Body */}
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
                                <span className="text-amber-400 block mb-1">MATERIAL & STRUCTURAL REALIZATION:</span>
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. THE FOUNDERS (BARCWAY VISIONARIES & PRINCIPALS) */}
      <section id="founders" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#030303] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Column */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
                THE VISIONARIES
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[0.95] mb-6">
                The<br />Founders
              </h2>
              <div className="w-16 h-[1.5px] bg-amber-400 mb-6" />
              <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Dedicated to shaping evocative architectural landmarks and bespoke private sanctuaries that harmonize bold form exploration with physical structural mastery.
              </p>
              <div className="hidden lg:block font-mono text-xs text-neutral-500 tracking-widest uppercase">
                PRINCIPALS · STUDIO VOZA SURABAYA
              </div>
            </motion.div>

            {/* Right Founders Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {BARCWAY_FOUNDERS.map((founder, fIdx) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: fIdx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-2xl bg-[#090909] border border-white/10 hover:border-amber-400/60 p-6 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Portrait Frame */}
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                      <Image
                        src={founder.image}
                        alt={`${founder.name} - ${founder.role}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9px] tracking-widest text-amber-400 uppercase">
                        {founder.role}
                      </div>
                    </div>

                    {/* Information */}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                      {founder.name}
                    </h3>
                    <div className="font-mono text-xs text-amber-400/90 tracking-widest uppercase mb-4">
                      {founder.role} — {founder.focus}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light font-sans mb-6">
                      {founder.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>WW.CONS PRINCIPAL</span>
                    <span className="text-neutral-400">VOZA TOWER LT. 20</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SERVICES (CENTRA ARYA LOKA MASTER BUILDERS) */}
      <section id="services" className="py-28 md:py-36 border-b border-white/[0.08] bg-[#050505] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-16"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-3 font-bold">
              MASTER BUILDERS · PT. CENTRA ARYA LOKA HERITAGE
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight mb-4">
              Master Builders
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Explore our services tailored to meet your construction needs. Backed by 35 years of physical engineering discipline in Surabaya, we build your dream spaces with unyielding care, structural rigor, and material artistry.
            </p>
          </motion.div>

          {/* 2 Major Service Categories (Residential & Commercial) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 mb-20">
            {CENTRA_SERVICES.map((srv, sIdx) => (
              <motion.div
                key={srv.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: sIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-amber-400/60 overflow-hidden transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden bg-black">
                    <Image
                      src={srv.image}
                      alt={srv.category}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8] group-hover:brightness-95"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[9.5px] tracking-widest text-amber-400 uppercase">
                      {srv.category}
                    </div>
                  </div>

                  <div className="p-8 sm:p-10">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
                      {srv.category === 'RESIDENTIAL BUILDING' ? 'Residential Building' : 'Commercial Building'}
                    </h3>
                    <p className="font-serif text-base text-amber-400/90 italic mb-4">
                      &ldquo;{srv.subtitle}&rdquo;
                    </p>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8">
                      {srv.desc}
                    </p>

                    <div className="mb-6">
                      <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mb-3">
                        WHAT WE DO:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {srv.types.map((type) => (
                          <span
                            key={type}
                            className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-neutral-300"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-2.5 font-mono text-xs text-neutral-400">
                      {srv.features.map((feat) => (
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
                    className="w-full py-3.5 rounded-xl border border-white/20 hover:border-amber-400 hover:bg-amber-400 hover:text-black text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 font-bold"
                  >
                    <span>Inquire {srv.category === 'RESIDENTIAL BUILDING' ? 'Residential' : 'Commercial'}</span>
                    <LuArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Centra Arya Loka 8-Stage Methodology */}
          <div className="pt-16 border-t border-white/[0.08]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-12"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                CAL.IDN CONSTRUCTION METHODOLOGY
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
                8 Pillars of Execution Discipline
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Dari penelusuran visi perdana hingga inspeksi rutin purna serah terima, setiap tahapan diawasi langsung oleh tim insinyur sipil profesional.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MASTER_METHODOLOGY.map((step, mIdx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: (mIdx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-amber-400/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-2xl font-bold text-amber-400 block mb-3">
                      {step.step}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light font-sans">
                      {step.idDesc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                    VERIFIED PROCESS
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[44px]"
              >
                <span>Explore Full Services & 8-Stage Methodology</span>
                <LuArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FULL-WIDTH EDGE-TO-EDGE PROJECTS SHOWCASE */}
      <section id="projects" className="py-28 md:py-36 border-b border-white/[0.08] scroll-mt-20 w-full overflow-hidden">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1800px] mx-auto">
          {/* Section Header with Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row justify-between sm:items-end mb-12 pb-6 border-b border-white/[0.08] gap-6"
          >
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-amber-400 uppercase block mb-2 font-bold">
                PORTFOLIO COMMISSIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white tracking-tight">
                Projects
              </h2>
            </div>

            {/* View Mode & Carousel Controls */}
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
                    onClick={() => setIsCarouselPaused((prev) => !prev)}
                    className="w-11 h-11 rounded-full border border-white/20 hover:border-amber-400 flex items-center justify-center text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    title={isCarouselPaused ? 'Resume auto-glide' : 'Pause auto-glide'}
                    aria-label={isCarouselPaused ? 'Resume auto-glide' : 'Pause auto-glide'}
                  >
                    {isCarouselPaused ? (
                      <LuPlay className="w-4 h-4 text-amber-400 ml-0.5" />
                    ) : (
                      <LuPause className="w-4 h-4 text-neutral-300" />
                    )}
                  </button>
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
          </motion.div>

          {/* Full-Width Carousel Mode (Signature Barcway Continuous Infinite Swiper) */}
          {viewMode === 'carousel' ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              ref={carouselRef}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onTouchStart={() => setIsCarouselPaused(true)}
              onTouchEnd={() => setIsCarouselPaused(false)}
              className="flex gap-7 overflow-x-auto scrollbar-none pb-6 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[...BARCWAY_PROJECTS, ...BARCWAY_PROJECTS].map((proj, idx) => (
                <div
                  key={`${proj.title}-${idx}`}
                  onClick={() => setSelectedProject(proj)}
                  className="w-[320px] sm:w-[400px] md:w-[460px] lg:w-[500px] shrink-0 group cursor-pointer"
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
            </motion.div>
          ) : (
            /* Full-Width 3-Column Responsive Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BARCWAY_PROJECTS.map((proj, pIdx) => (
                <motion.div
                  key={proj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: (pIdx % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
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
                </motion.div>
              ))}
            </div>
          )}

          {/* Link to Dedicated Projects Page */}
          <div className="mt-14 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-amber-400 bg-white/5 hover:bg-amber-400 hover:text-black text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 min-h-[48px] font-bold shadow-lg"
            >
              <span>Explore All 10 Signature Projects & Blueprints</span>
              <LuArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FULL-WIDTH SIGNATURE CONTACT SECTION (BARCWAY 50/50 SPLIT) */}
      <section id="contact" className="py-28 md:py-36 bg-[#000000] border-t border-white/[0.08] scroll-mt-20 w-full">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Monumental Column: 'Contact' Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] font-normal text-white tracking-tight leading-[0.95] mb-6">
                Contact
              </h2>
              <div className="w-24 h-[1.5px] bg-amber-400 mb-8" />
              <p className="font-serif text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-md">
                For private luxury residence commissions, flagship corporate headquarters, or structural general contracting consultations in Surabaya and East Java.
              </p>
              <div className="mt-8 font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
                INSIDE OUT · BALANCED CONTRAST · NARRATIVE SPACE
              </div>
            </motion.div>

            {/* Right Information Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-10"
            >
              {/* Horizontal Brand Lockup */}
              <div className="pb-6 border-b border-white/10">
                <ModernWwLogo variant="full" size="lg" />
              </div>

              {/* Inquiries Details */}
              <div>
                <h3 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-[0.25em] mb-4">
                  FOR INQUIRIES
                </h3>
                <div className="space-y-4 font-sans text-base sm:text-lg">
                  <div>
                    <a
                      href="mailto:info@wwconstruction.id"
                      className="text-white hover:text-amber-400 transition-colors font-serif tracking-wide block"
                    >
                      info@wwconstruction.id
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-amber-400 transition-colors font-mono tracking-wider block"
                    >
                      +62 822 9819 9902 <span className="text-xs font-mono text-neutral-500">(Direct Client Hotline)</span>
                    </a>
                    <a
                      href="https://wa.me/628113313347?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20teknik%20sipil."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-amber-400 transition-colors font-mono tracking-wider block text-sm mt-1"
                    >
                      +62 811 3313 347 <span className="text-xs font-mono text-neutral-500">(Field Engineering Base)</span>
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://instagram.com/ww.cons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-white transition-colors font-mono text-sm tracking-wider inline-flex items-center gap-2"
                    >
                      <FaInstagram className="w-4 h-4" />
                      <span>@ww.cons</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs font-mono">
                <div>
                  <div className="text-white font-bold mb-1 flex items-center gap-2">
                    <LuMapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>SURABAYA STUDIO</span>
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    Gedung Voza Premium Office, Lt. 20<br />
                    Jl. HR Muhammad No. 31A<br />
                    Surabaya, Indonesia
                  </div>
                </div>
                <div>
                  <div className="text-neutral-300 font-bold mb-1 flex items-center gap-2">
                    <LuMapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span>WORKSHOP & YARD</span>
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    Jl. Semolowaru No. 48<br />
                    Surabaya Timur, Jawa Timur<br />
                    Indonesia
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white text-black hover:bg-amber-400 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 min-h-[48px] active:scale-[0.98] shadow-lg"
                >
                  <span>Open Contact Desk & Inquiries</span>
                  <LuArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 inline-flex items-center gap-2 min-h-[48px] active:scale-[0.98]"
                >
                  <LuPhone className="w-4 h-4 text-amber-400" />
                  <span>WhatsApp Direct Dispatch</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. SIGNATURE BARCWAY FOOTER */}
      <BarcwayFooter />

      {/* Project Inspection Modal */}
      <ProjectInspectionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
