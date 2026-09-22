'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LuMapPin, LuClock, LuShieldCheck } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import BarcwayNav from '@/components/navigation/BarcwayNav';
import BarcwayFooter from '@/components/navigation/BarcwayFooter';
import ArchitecturalPreloader from '@/components/interactive/ArchitecturalPreloader';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Luxury Residence',
    location: 'Surabaya Barat',
    message: '',
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo ww.cons, saya ${formData.name}. Saya ingin konsultasi perancangan/konstruksi ${formData.type} di daerah ${formData.location}. ${formData.message ? `Catatan: ${formData.message}` : ''}`;
    window.open(`https://wa.me/6282298199902?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <ArchitecturalPreloader />
      <BarcwayNav />

      {/* 1. SIGNATURE BARCWAY 50/50 SPLIT CONTACT VIEWPORT */}
      <section className="pt-36 pb-28 md:pt-48 md:pb-36 min-h-[90vh] flex items-center border-b border-white/[0.08]">
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Monumental Column: 'Contact' Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 lg:sticky lg:top-36"
            >
              <span className="font-mono text-xs tracking-[0.28em] text-amber-400 uppercase block mb-4 font-bold">
                DIRECT COMMISSIONS & INQUIRIES
              </span>
              <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-normal text-white tracking-tight leading-[0.95] mb-6">
                Contact
              </h1>
              <div className="w-24 h-[1.5px] bg-amber-400 mb-8" />
              <p className="font-serif text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed max-w-md mb-8">
                For private luxury residence commissions, flagship corporate headquarters, or structural general contracting consultations in Surabaya and East Java.
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-300">
                  <LuClock className="w-4 h-4 text-amber-400" />
                  <span>STUDIO HOURS: SENIN – SABTU (08:30 – 17:30 WIB)</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <LuShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>OFFICIAL LEGAL CONTRACT & TIME SCHEDULE GUARANTEE</span>
                </div>
              </div>

              <div className="mt-12 font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
                INSIDE OUT · BALANCED CONTRAST · NARRATIVE SPACE
              </div>
            </motion.div>

            {/* Right Information & Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-10"
            >
              {/* Horizontal Brand Lockup */}
              <div className="pb-6 border-b border-white/10">
                <ModernWwLogo variant="full" size="lg" />
              </div>

              {/* Inquiries Details */}
              <div>
                <h2 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-[0.25em] mb-4">
                  FOR INQUIRIES
                </h2>
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

              {/* Interactive Quick Dispatch Form */}
              <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10">
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Request Project Consultation
                </h3>
                <p className="text-xs text-neutral-400 mb-6 font-mono">
                  TERHUBUNG LANGSUNG KE WHATSAPP PROJECT MANAGER KAMI
                </p>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Nama Klien
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        No. WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="08xxxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Tipe Proyek
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Luxury Residence">Luxury Residence</option>
                        <option value="Minimalist House">Minimalist House</option>
                        <option value="Commercial Office">Commercial Office / Ruko</option>
                        <option value="Showroom & Retail">Showroom & Retail</option>
                        <option value="General Contracting">Struktur & General Contracting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                        Lokasi Lahan
                      </label>
                      <input
                        type="text"
                        placeholder="Surabaya Barat / Timur / Sidoarjo"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                      Rencana & Kebutuhan Ruang
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ukuran lahan (m²), luas bangunan, perkiraan target waktu..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-400 text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>Kirim & Mulai Konsultasi WhatsApp</span>
                  </button>
                </form>
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
            </motion.div>
          </div>
        </div>
      </section>

      <BarcwayFooter />
    </div>
  );
}
