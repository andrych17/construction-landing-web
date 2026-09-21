'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { LuMapPin, LuBuilding, LuPhone, LuArrowUpRight } from 'react-icons/lu';

const companyCredentials = [
  {
    title: 'Kontrak Kerja SPK Sah',
    desc: 'Dilindungi Surat Perjanjian Kerja (SPK) tertulis yang mengikat hak & kewajiban secara profesional.',
  },
  {
    title: 'Wilayah Layanan Utama',
    desc: 'Surabaya (Timur, Barat, Pusat), Sidoarjo, Gresik, serta kawasan industri Jawa Timur.',
  },
  {
    title: 'Standar Mutu & Material',
    desc: 'Penggunaan beton & baja SNI, material grade-A terverifikasi, dan analisa harga satuan transparan.',
  },
  {
    title: 'Masa Retensi & Garansi',
    desc: 'Jaminan pemeliharaan paska-serah terima kunci (BAST) bebas kebocoran dan kendala fungsi utilitas.',
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" ref={ref} className="py-24 sm:py-32 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Company Identity Monograph */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-50 border border-slate-300 rounded-sm p-8 sm:p-10 shadow-xs">
              {/* Logo in About card */}
              <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-sm p-2 flex items-center justify-center mb-6 shadow-sm">
                <Image
                  src="/images/ww/logo.jpg"
                  alt="WW Construction Monogram"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="inline-block text-[10px] font-mono uppercase tracking-widest text-brand bg-brand-light px-2.5 py-1 border border-brand-border font-bold mb-3">
                Corporate Profile
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-1">
                Wonderful Works Construction
              </h3>
              <p className="text-xs font-mono text-slate-500 mb-6">
                General Contractor Surabaya &middot; @ww.cons
              </p>

              <div className="space-y-3.5 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-700 font-mono">
                <div className="flex items-start gap-3">
                  <LuMapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                  <span>
                    Jl. Serenity No. 29, Semolowaru, Surabaya 60119
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <LuBuilding className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                  <span>
                    General Contractor, Komersial & Residensial
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <LuPhone className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                  <span>
                    WhatsApp: +62 811-3313-347
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                  Motto Perusahaan
                </div>
                <blockquote className="text-xs sm:text-sm font-semibold text-slate-900 italic">
                  &ldquo;Quality is our priority &mdash; Bringing your vision to life with expert craftsmanship.&rdquo;
                </blockquote>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission & Engineering Standards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
              FILOSOFI & KOMITMEN LAPANGAN
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase mb-6 leading-tight">
              Membangun Lebih Dari Sekadar Struktur Fisik.
            </h2>

            <p className="text-base text-slate-700 leading-relaxed mb-6">
              Wonderful Works Construction hadir untuk mengubah paradigma dunia kontraktor yang kerap diwarnai ketidakpastian biaya dan pengerjaan yang lambat. Kami menempatkan transparansi teknis dan pengawasan harian sebagai pondasi utama setiap kerja sama.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              Mulai dari penyusunan gambar teknis detail, analisa tanah Surabaya, uji kekuatan beton berkala, hingga ketepatan sudut nat keramik, seluruh proses dikerjakan oleh tenaga spesialis dan disupervisi langsung oleh tim sipil berdedikasi.
            </p>

            {/* Corporate Credentials Datum Grid (Editorial, Zero Icon Boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              {companyCredentials.map((item) => (
                <div key={item.title} className="border-l-2 border-slate-300 pl-4">
                  <h4 className="text-sm font-bold text-slate-950 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                Punya pertanyaan mengenai profil atau legalitas kami?
              </span>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 hover:text-brand transition-colors"
              >
                <span>Hubungi Manajemen</span>
                <LuArrowUpRight className="w-3.5 h-3.5 text-brand" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
