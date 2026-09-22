'use client';

import React, { useState } from 'react';
import { LuMapPin, LuClock, LuShieldCheck } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import HeroMedia from '@/components/ui/HeroMedia';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const { contact: SITE_CONTACT, hero, waLink } = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Luxury Residence',
    location: 'Surabaya Barat',
    message: '',
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!SITE_CONTACT.whatsapp) return;
    const text =
      lang === 'en'
        ? `Hello Wonderful Works Construction, I am ${formData.name} (${formData.phone}). I would like to inquire about design and construction for a ${formData.type} in ${formData.location}.${formData.message ? ` Notes: ${formData.message}` : ''}`
        : `Halo Wonderful Works Construction, saya ${formData.name} (${formData.phone}). Saya ingin konsultasi perancangan/konstruksi ${formData.type} di daerah ${formData.location}.${formData.message ? ` Catatan: ${formData.message}` : ''}`;
    window.location.href = waLink(text);
  };

  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <Navbar />

      {/* 1. 50/50 SPLIT CONTACT VIEWPORT */}
      <section className="relative overflow-hidden pt-36 pb-28 md:pt-48 md:pb-36 min-h-[90vh] flex items-center border-b border-white/[0.08]">
        <HeroMedia
          src={hero.contact.video || undefined}
          poster={hero.contact.poster}
          alt={t(hero.contact.alt, hero.contact.altEn)}
          priority
        />
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Monumental Column: 'Contact' Heading */}
            <div className="lg:col-span-6 lg:sticky lg:top-36 reveal-load">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
                {t('Kontak', 'Contact')}
              </h1>
              <div className="w-24 h-[1.5px] bg-white/25 mb-8" />
              <p className="font-sans text-base sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-md mb-8">
                {t(
                  'Untuk hunian privat, bangunan komersial, dan pekerjaan general contracting di Surabaya dan Jawa Timur.',
                  'For bespoke residences, commercial developments, and general contracting across Surabaya and East Java.'
                )}
              </p>

              <div className="space-y-3 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-300">
                  <LuClock className="w-4 h-4 text-amber-400" />
                  <span>
                    {t(
                      'JAM OPERASIONAL: SENIN – SABTU (08:30 – 17:30 WIB)',
                      'STUDIO HOURS: MON – SAT (08:30 – 17:30 WIB)'
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <LuShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>
                    {t(
                      'KONTRAK RESMI BERKEKUATAN HUKUM & JAMINAN SCHEDULE',
                      'OFFICIAL LEGAL CONTRACT & TIME SCHEDULE GUARANTEE'
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Information & Form Column */}
            <div className="lg:col-span-6 space-y-10 reveal-load">
              {/* Horizontal Brand Lockup */}
              <div className="pb-6 border-b border-white/10">
                <ModernWwLogo variant="full" size="lg" />
              </div>

              {/* Inquiries Details */}
              <div>
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-4">
                  {t('KONSULTASI & TANYA JAWAB', 'FOR INQUIRIES')}
                </h2>
                <div className="space-y-4 font-sans text-base sm:text-lg">
                  <div>
                    {SITE_CONTACT.email ? (
                      <a
                        href={`mailto:${SITE_CONTACT.email}`}
                        className="text-white hover:text-amber-400 transition-colors font-sans tracking-wide block"
                      >
                        {SITE_CONTACT.email}
                      </a>
                    ) : (
                      <span className="text-neutral-400 font-sans tracking-wide block">
                        {SITE_CONTACT.emailLabel}
                      </span>
                    )}
                  </div>
                  <div>
                    {SITE_CONTACT.whatsapp ? (
                      <a
                        href={waLink(
                          t(
                            'Halo Wonderful Works Construction, saya ingin konsultasi rancang bangun.',
                            'Hello Wonderful Works Construction, I would like to consult on a design & build project.'
                          )
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-amber-400 transition-colors font-mono tracking-wider block"
                      >
                        {SITE_CONTACT.whatsappLabel}
                      </a>
                    ) : (
                      <span className="text-neutral-400 font-mono tracking-wider block">
                        {SITE_CONTACT.whatsappLabel}
                      </span>
                    )}
                  </div>
                  <div>
                    <a
                      href={SITE_CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-white transition-colors font-mono text-sm tracking-wider inline-flex items-center gap-2"
                    >
                      <FaInstagram className="w-4 h-4" />
                      <span>{SITE_CONTACT.instagramHandle}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Quick Dispatch Form */}
              <div className="p-8 rounded-none bg-[#0a0a0a] border border-white/10">
                <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                  {t('Formulir Konsultasi Proyek', 'Request Project Consultation')}
                </h3>
                <p className="text-xs text-neutral-400 mb-6 font-mono uppercase">
                  {t(
                    'TERHUBUNG LANGSUNG KE WHATSAPP PROJECT MANAGER KAMI',
                    'CONNECT DIRECTLY TO OUR PROJECT MANAGER VIA WHATSAPP'
                  )}
                </p>

                <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="f-name"
                        className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                      >
                        {t('Nama Klien', 'Client Name')}
                      </label>
                      <input
                        type="text"
                        required
                        id="f-name"
                        placeholder={t('Nama Anda', 'Your Name')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="f-phone"
                        className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                      >
                        {t('No. WhatsApp', 'WhatsApp Number')}
                      </label>
                      <input
                        type="tel"
                        required
                        id="f-phone"
                        placeholder="08xxxxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="f-type"
                        className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                      >
                        {t('Tipe Proyek', 'Project Type')}
                      </label>
                      <select
                        id="f-type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="Luxury Residence">
                          {t('Hunian Mewah / Luxury Residence', 'Luxury Residence')}
                        </option>
                        <option value="Minimalist House">
                          {t('Rumah Minimalis Modern', 'Modern Minimalist House')}
                        </option>
                        <option value="Commercial Office">
                          {t('Kantor Komersial / Ruko', 'Commercial Office / Shophouse')}
                        </option>
                        <option value="Showroom & Retail">
                          {t('Showroom & Ritel Komersial', 'Showroom & Retail Space')}
                        </option>
                        <option value="General Contracting">
                          {t('Struktur & General Contracting', 'Structure & General Contracting')}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="f-location"
                        className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                      >
                        {t('Lokasi Lahan', 'Site Location')}
                      </label>
                      <input
                        type="text"
                        id="f-location"
                        placeholder={t('Surabaya Barat / Timur / Sidoarjo', 'West Surabaya / East / Sidoarjo')}
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="f-message"
                      className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                    >
                      {t('Rencana & Kebutuhan Ruang', 'Scope & Spatial Requirements')}
                    </label>
                    <textarea
                      id="f-message"
                      rows={3}
                      placeholder={t(
                        'Ukuran lahan (m²), luas bangunan yang diinginkan, target waktu...',
                        'Land size (sqm), intended built area, target timeline...'
                      )}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-none bg-amber-400 text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>{t('Kirim & Mulai Konsultasi WhatsApp', 'Send & Consult via WhatsApp')}</span>
                  </button>
                </form>
              </div>

              {/* Physical Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs font-mono">
                <div>
                  <div className="text-white font-bold mb-1 flex items-center gap-2">
                    <LuMapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('STUDIO SURABAYA', 'SURABAYA STUDIO')}</span>
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    {SITE_CONTACT.studio.lines.join(', ')}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-300 font-bold mb-1 flex items-center gap-2">
                    <LuMapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{t('BENGKEL & WORKSHOP', 'WORKSHOP & YARD')}</span>
                  </div>
                  <div className="text-neutral-400 leading-relaxed">
                    {SITE_CONTACT.workshop.lines.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
