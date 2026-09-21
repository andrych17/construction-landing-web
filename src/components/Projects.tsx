'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { LuMapPin, LuArrowUpRight, LuArrowRight } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';

const realProjects = [
  {
    id: 1,
    title: 'Jotun Showroom Commercial Fit-Out',
    category: 'Komersial',
    location: 'Surabaya, Jawa Timur',
    image: '/images/projects/jotun_showroom_hq.jpg',
    description: 'Pengerjaan ruang pamer komersial resmi Jotun: perkuatan dinding display, instalasi tata cahaya pameran presisi, plafon akustik, dan fasad korporat berstandar internasional.',
    scope: 'General Contracting & Commercial Fit-Out',
    year: '2026',
    featured: true,
  },
  {
    id: 2,
    title: 'Pekerjaan Struktur & Pembesian Lapangan',
    category: 'Struktur',
    location: 'Semolowaru, Surabaya Timur',
    image: '/images/projects/concrete_rebar_hq.jpg',
    description: 'Dokumentasi berkala pembesian struktur beton bertulang, pengecoran presisi, dan uji mutu slump test harian di bawah supervisi tim rekayasa sipil.',
    scope: 'Reinforced Concrete & Daily Progress Log',
    year: '2026',
    featured: false,
  },
  {
    id: 3,
    title: 'Rancang Bangun Rumah Mewah Modern & Klasik',
    category: 'Residensial',
    location: 'Surabaya Timur & Sekitarnya',
    image: '/images/projects/luxury_residence_hq.jpg',
    description: 'Pembangunan hunian tinggal privat: mengintegrasikan karakter modern minimalis dan sentuhan profil klasik elegan dengan material finishing premium.',
    scope: 'Rancang Bangun Residensial & Finishing',
    year: '2026',
    featured: false,
  },
  {
    id: 4,
    title: 'Fasad Arsitektur Tropis Kontemporer',
    category: 'Residensial',
    location: 'Surabaya, Jawa Timur',
    image: '/images/projects/tropical_facade_hq.jpg',
    description: 'Implementasi fasad hunian tropis modern dengan kisi ventilasi silang optimal, penahan tempias hujan lebat, dan material tahan panas matahari Surabaya.',
    scope: 'Tropical Facade Engineering & Detailing',
    year: '2026',
    featured: false,
  },
  {
    id: 5,
    title: 'Rekayasa Struktur Balok & Crane Lapangan',
    category: 'Struktur',
    location: 'Surabaya & Sidoarjo',
    image: '/images/projects/construction_crane_hq.jpg',
    description: 'Solusi konstruksi sipil berbeban tinggi dengan perakitan struktur baja WF, pengecoran plat lantai mutu K-350, dan pengawasan K3 berstandar ketat.',
    scope: 'Heavy Structural Engineering & Steel Erection',
    year: '2026',
    featured: false,
  },
  {
    id: 6,
    title: 'WW Notes: Pengawasan Site Engineer Lapangan',
    category: 'Struktur',
    location: 'Surabaya, Jawa Timur',
    image: '/images/projects/site_engineer_hq.jpg',
    description: 'Penerapan 5 pilar presisi pengukuran tapak lahan, as kolom, dan ketebalan plesteran untuk menjamin zero budget drift dan keamanan struktur 100%.',
    scope: 'Quality Control, Survey & Structural Audit',
    year: '2026',
    featured: false,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [filter, setFilter] = useState('Semua');

  const categories = ['Semua', 'Komersial', 'Residensial', 'Struktur'];

  const filteredProjects =
    filter === 'Semua'
      ? realProjects
      : realProjects.filter((p) => p.category === filter);

  const featuredProject = realProjects.find((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => filter !== 'Semua' || !p.featured);

  return (
    <section id="projects" ref={ref} className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
              WONDERFUL WORKS CONSTRUCTION · DOKUMENTASI RESMI
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase">
              Portofolio Proyek
            </h2>
          </div>
          <p className="text-slate-600 max-w-md text-sm sm:text-base leading-relaxed">
            Koleksi proyek nyata yang dikerjakan oleh Wonderful Works Construction (@ww.cons) di Surabaya dan sekitarnya dengan standar presisi fisik tinggi.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all min-h-[44px] ${
                filter === cat
                  ? 'bg-slate-950 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Project Showcase (Only shown on 'Semua' filter) */}
        {filter === 'Semua' && featuredProject && (
          <div className="mb-12 bg-white border border-slate-200 rounded-sm overflow-hidden shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full min-h-[340px] bg-slate-100">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand bg-brand-light px-3 py-1 border border-brand-border rounded-2xs">
                      Proyek Pilihan · Komersial
                    </span>
                    <span className="text-xs text-slate-600 font-mono font-semibold">
                      Tuntas 2026
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-3 leading-tight">
                    {featuredProject.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed mb-6">
                    {featuredProject.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-slate-200 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600 uppercase">Lokasi Proyek</span>
                      <span className="font-semibold text-slate-900">{featuredProject.location}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600 uppercase">Lingkup Kerja</span>
                      <span className="font-semibold text-slate-900">{featuredProject.scope}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-600 uppercase">Kepatuhan Mutu</span>
                      <span className="font-semibold text-slate-900">Standar Korporat Jotun</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a
                    href="https://wa.me/628113313347?text=Halo%20WW%20Construction,%20saya%20tertarik%20dengan%20proyek%20Komersial%20seperti%20Jotun%20Showroom."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-950 hover:bg-brand transition-colors rounded-sm shadow-xs min-h-[44px]"
                  >
                    <span>Konsultasikan Proyek Serupa</span>
                    <LuArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Projects Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {regularProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col justify-between hover:border-slate-400 hover:shadow-md transition-all"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-white/95 border border-slate-200 text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wider rounded-2xs shadow-2xs">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono mb-2 font-medium">
                    <LuMapPin className="w-3.5 h-3.5 text-brand" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-brand transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-mono">
                  <span>{project.scope}</span>
                  <LuArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-brand transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authentic Instagram Callout */}
        <div className="mt-16 p-6 sm:p-8 bg-white border border-slate-200 rounded-sm shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 flex-shrink-0">
              <FaInstagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-950">
                Dokumentasi Lapangan & Edukasi Berkala (@ww.cons)
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Pantau langsung video reel kemajuan fisik, tips pemilihan bahan, dan ulasan proyek kami di Instagram.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/ww.cons/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-sm transition-colors min-h-[44px] flex-shrink-0"
          >
            <span>Kunjungi @ww.cons</span>
            <LuArrowUpRight className="w-4 h-4 text-brand" />
          </a>
        </div>
      </div>
    </section>
  );
}
