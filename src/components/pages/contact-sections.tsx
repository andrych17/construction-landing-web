'use client';

import React, { useState } from 'react';
import { LuMapPin, LuClock, LuShieldCheck } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import HeroMedia from '@/components/ui/HeroMedia';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { filled } from '@/components/pages/copy';

type Copy = { anchorId?: string; titleId?: string; titleEn?: string; ledeId?: string; ledeEn?: string };

export function ContactStudioSection({ anchorId = 'contact', titleId, titleEn, ledeId, ledeEn }: Copy) {
  const { lang, t } = useLanguage();
  const { contact, hero, waLink } = useSiteContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Residential',
    city: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          projectType: formData.type,
          city: formData.city,
          notes: formData.notes,
        }),
      });
    } catch (err) {
      console.error('Failed to log inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }

    if (!contact.whatsapp) return;
    const text =
      lang === 'en'
        ? `Hello Wonderful Works Construction, I am ${formData.name} (${formData.phone}). I would like to consult on a ${formData.type} project in ${formData.city || 'Surabaya'}.${formData.notes ? ` Notes: ${formData.notes}` : ''}`
        : `Halo Wonderful Works Construction, saya ${formData.name} (${formData.phone}). Saya ingin konsultasi proyek ${formData.type} di kota ${formData.city || 'Surabaya'}.${formData.notes ? ` Catatan: ${formData.notes}` : ''}`;
    window.location.href = waLink(text);
  };
  return (
    <section id={anchorId} className="relative overflow-hidden pt-36 pb-28 md:pt-48 md:pb-36 min-h-[90vh] flex items-center border-b border-white/[0.08]">
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
              {t(filled(titleId, 'Kontak'), filled(titleEn, 'Contact'))}
            </h1>
            <div className="w-24 h-[1.5px] bg-white/25 mb-8" />
            <p className="font-sans text-base sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-md mb-8">
              {t(
                filled(ledeId, 'Untuk rumah tinggal, bangunan komersial, dan pekerjaan general contracting di Surabaya, Sidoarjo, dan Gresik.'),
                filled(ledeEn, 'For homes, commercial buildings, and general contracting in Surabaya, Sidoarjo, and Gresik.')
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
                    'KONTRAK SPK TERTULIS & JADWAL KURVA-S',
                    'WRITTEN SPK CONTRACT & S-CURVE SCHEDULE'
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
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-white hover:text-amber-400 transition-colors font-sans tracking-wide block"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <span className="text-neutral-400 font-sans tracking-wide block">
                      {contact.emailLabel}
                    </span>
                  )}
                </div>
                <div>
                  {contact.whatsapp ? (
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
                      {contact.whatsappLabel}
                    </a>
                  ) : (
                    <span className="text-neutral-400 font-mono tracking-wider block">
                      {contact.whatsappLabel}
                    </span>
                  )}
                </div>
                <div>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-white transition-colors font-mono text-sm tracking-wider inline-flex items-center gap-2"
                  >
                    <FaInstagram className="w-4 h-4" />
                    <span>{contact.instagramHandle}</span>
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
                      <option value="Residential">
                        {t('Residential', 'Residential')}
                      </option>
                      <option value="Commercial">
                        {t('Commercial', 'Commercial')}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-city"
                      className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                    >
                      {t('Kota', 'City')}
                    </label>
                    <input
                      type="text"
                      id="f-city"
                      placeholder={t('Surabaya / Sidoarjo / Gresik', 'Surabaya / Sidoarjo / Gresik')}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="f-notes"
                    className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                  >
                    {t('Catatan (Opsional)', 'Notes (Optional)')}
                  </label>
                  <textarea
                    id="f-notes"
                    rows={3}
                    placeholder={t(
                      'Catatan tambahan mengenai rencana atau kebutuhan proyek...',
                      'Additional notes regarding your project plans or requirements...'
                    )}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-none bg-amber-400 text-black hover:bg-white font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-expo flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>{isSubmitting ? t('Menyimpan...', 'Saving...') : t('Kirim & Mulai Konsultasi WhatsApp', 'Send & Consult via WhatsApp')}</span>
                </button>
              </form>
            </div>

            {/* Physical Address */}
            <div className="pt-6 border-t border-white/10 text-xs font-mono">
              <div>
                <div className="text-white font-bold mb-1 flex items-center gap-2">
                  <LuMapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('OFFICE', 'OFFICE')}</span>
                </div>
                <div className="text-neutral-400 leading-relaxed max-w-md">
                  {contact.studio.lines.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
