'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONTACT, waLink } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';

export default function FloatingWhatsApp() {
  const { lang, t } = useLanguage();

  if (!SITE_CONTACT.whatsapp) return null;

  const defaultMessage =
    lang === 'en'
      ? 'Hello ww.cons, I would like to consult on a design & build project.'
      : 'Halo ww.cons, saya ingin konsultasi rancang bangun.';

  return (
    <aside
      aria-label={t('Tautan Cepat WhatsApp', 'WhatsApp Quick Contact')}
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={waLink(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('Konsultasi via WhatsApp', 'Chat via WhatsApp')}
        className="group flex items-center gap-3 px-3.5 py-3.5 sm:px-4 sm:py-3.5 rounded-full bg-[#0d0d0d]/90 backdrop-blur-md border border-white/20 hover:border-[#25D366] text-white shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(37,211,102,0.2)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(37,211,102,0.4)] transition-all duration-300 ease-expo active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <div className="relative flex items-center justify-center">
          <FaWhatsapp className="w-6 h-6 text-[#25D366] transition-transform duration-300 ease-expo group-hover:scale-110" />
          {/* Subtle live indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25D366] ring-2 ring-black animate-pulse" />
        </div>

        {/* Text expands on hover on desktop, remains sleek and compact */}
        <span className="hidden sm:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-expo whitespace-nowrap font-mono text-xs tracking-wider text-neutral-200 group-hover:text-white">
          {t('Konsultasi WhatsApp', 'Chat on WhatsApp')}
        </span>
      </a>
    </aside>
  );
}
