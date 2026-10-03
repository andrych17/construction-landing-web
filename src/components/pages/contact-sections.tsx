'use client';

import React, { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import HeroMedia from '@/components/ui/HeroMedia';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import { useLanguage } from '@/context/LanguageContext';
import { useSiteContent } from '@/context/SiteContentContext';
import { filled } from '@/components/pages/copy';
import { DEFAULT_CONTACT_FORM, DEFAULT_PAGE_HEROES } from '@/data/siteData';

type Copy = { anchorId?: string; titleId?: string; titleEn?: string; ledeId?: string; ledeEn?: string };

export function ContactStudioSection({ anchorId = 'contact', titleId, titleEn, ledeId, ledeEn }: Copy) {
  const { lang, t } = useLanguage();
  const { contact, hero, waLink, pageHeroes } = useSiteContent();
  const heroCopy = pageHeroes?.contact || DEFAULT_PAGE_HEROES.contact;
  const formCopy = contact.form || DEFAULT_CONTACT_FORM;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: formCopy.projectTypeOptions?.[0]?.id || 'Residential & Commercial',
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
      {/* Info dan formulir duduk di atas langit yang terang; scrim ini menjaga kontras teksnya. */}
      <div className="absolute inset-0 z-0 bg-black/40 lg:bg-transparent lg:bg-gradient-to-l lg:from-black/80 lg:via-black/45 lg:to-black/10" />
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Monumental Column: 'Contact' Heading */}
          <div className="lg:col-span-6 lg:sticky lg:top-36 reveal-load">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-extrabold text-white tracking-tight uppercase leading-[0.95] mb-6">
              {t(filled(titleId, heroCopy.titleId), filled(titleEn, heroCopy.titleEn))}
            </h1>
            <div className="w-24 h-[1.5px] bg-white/25 mb-8" />
            <p className="font-sans text-base sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-md">
              {t(
                filled(ledeId, heroCopy.ledeId),
                filled(ledeEn, heroCopy.ledeEn)
              )}
            </p>
          </div>

          {/* Right Information & Form Column */}
          <div className="lg:col-span-6 space-y-10 reveal-load">
            {/* Horizontal Brand Lockup */}
            <div className="pb-6 border-b border-white/10">
              <ModernWwLogo variant="full" size="lg" />
            </div>

            {/* Inquiries & Office Grid (Office moved up beside Inquiries) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Inquiries Details */}
              <div>
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-4">
                  {t('KONSULTASI & TANYA JAWAB', 'FOR INQUIRIES')}
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base">
                  <div>
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-white hover:text-amber-400 transition-colors font-sans tracking-wide block break-all"
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

              {/* Physical Office Address */}
              <div>
                <h2 className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                  <LuMapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('KANTOR', 'OFFICE')}</span>
                </h2>
                <div className="text-neutral-300 font-sans text-xs sm:text-sm leading-relaxed space-y-1">
                  {contact.studio.lines.map((line, idx) => (
                    <p key={idx} className="text-neutral-300">{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Quick Dispatch Form */}
            <div className="p-8 rounded-none bg-[#0a0a0a] border border-white/10">
              <h3 className="font-display text-2xl font-bold text-white mb-2 uppercase tracking-tight">
                {t(formCopy.titleId, formCopy.titleEn)}
              </h3>
              <p className="text-xs text-neutral-400 mb-6 font-mono uppercase tracking-wide">
                {t(formCopy.subtitleId, formCopy.subtitleEn)}
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="f-name"
                      className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                    >
                      {t(formCopy.nameLabelId, formCopy.nameLabelEn)}
                    </label>
                    <input
                      type="text"
                      required
                      id="f-name"
                      placeholder={t(formCopy.namePlaceholderId, formCopy.namePlaceholderEn)}
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
                      {t(formCopy.phoneLabelId, formCopy.phoneLabelEn)}
                    </label>
                    <input
                      type="tel"
                      required
                      id="f-phone"
                      placeholder={t(formCopy.phonePlaceholderId, formCopy.phonePlaceholderEn)}
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
                      {t(formCopy.projectTypeLabelId, formCopy.projectTypeLabelEn)}
                    </label>
                    <select
                      id="f-type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-black border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {formCopy.projectTypeOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {t(opt.labelId, opt.labelEn)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-city"
                      className="block text-xs font-mono text-neutral-400 uppercase mb-1.5"
                    >
                      {t(formCopy.cityLabelId, formCopy.cityLabelEn)}
                    </label>
                    <input
                      type="text"
                      id="f-city"
                      placeholder={t(formCopy.cityPlaceholderId, formCopy.cityPlaceholderEn)}
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
                    {t(formCopy.notesLabelId, formCopy.notesLabelEn)}
                  </label>
                  <textarea
                    id="f-notes"
                    rows={3}
                    placeholder={t(formCopy.notesPlaceholderId, formCopy.notesPlaceholderEn)}
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
                  <span>
                    {isSubmitting
                      ? t(formCopy.submittingTextId, formCopy.submittingTextEn)
                      : t(formCopy.submitTextId, formCopy.submitTextEn)}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
