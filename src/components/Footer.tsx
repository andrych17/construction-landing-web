'use client';

import Image from 'next/image';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { LuMapPin, LuPhone } from 'react-icons/lu';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand & Corporate Summary */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 bg-black border border-slate-800 rounded-sm p-1 flex items-center justify-center shadow-sm">
                <Image
                  src="/images/ww/logo_transparent.png"
                  alt="WW Construction Monogram"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="text-base font-bold text-white uppercase tracking-tight block">
                  Wonderful Works Construction
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                  General Contractor &middot; Surabaya
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              General contractor tepercaya di Surabaya dengan komitmen utama &ldquo;Quality is our priority&rdquo;. Menghadirkan presisi struktural, transparansi biaya, dan keunggulan eksekusi arsitektur.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/ww.cons/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @ww.cons"
                className="w-10 h-10 bg-slate-900 border border-slate-800 hover:border-brand hover:text-white rounded-sm flex items-center justify-center transition-colors text-pink-400"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/628113313347"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp WW Construction"
                className="w-10 h-10 bg-slate-900 border border-slate-800 hover:border-brand hover:text-white rounded-sm flex items-center justify-center transition-colors text-emerald-400"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4 font-semibold">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Portofolio Proyek
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Layanan Konstruksi
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-white transition-colors">
                  5 Pilar Presisi
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Tentang Perusahaan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Pertanyaan Umum (FAQ)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Kontak & Lokasi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-4 font-semibold">
              Kantor Operasional
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <LuMapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Jl. Serenity No. 29, Semolowaru, Surabaya, Jawa Timur 60119
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <LuPhone className="w-4 h-4 text-brand flex-shrink-0" />
                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-slate-300"
                >
                  +62 811-3313-347 (WhatsApp)
                </a>
              </div>
              <div className="pt-2 text-slate-400 text-xs font-mono">
                Jam Operasional: Senin – Sabtu, 08:00 – 17:00 WIB
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>
            &copy; {currentYear} Wonderful Works Construction. All rights reserved.
          </p>
          <p>
            General Contractor · Surabaya, ID
          </p>
        </div>
      </div>
    </footer>
  );
}
