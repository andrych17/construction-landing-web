'use client';

import React from 'react';
import Link from 'next/link';
import ModernWwLogo from '@/components/ui/ModernWwLogo';
import { SITE_CONTACT } from '@/data/siteData';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-[#050505] text-neutral-400 border-t border-white/[0.08] w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-frame mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[11px]">
        <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
          <Link href="/" className="flex items-center gap-2.5 group">
            <ModernWwLogo variant="mark" size="sm" />
            <span className="font-serif text-white tracking-widest text-sm group-hover:text-amber-400 transition-colors">
              WW.CONS
            </span>
          </Link>
          <span className="hidden sm:inline text-neutral-400" aria-hidden="true">|</span>
          <span className="text-neutral-400">
            {t('Wonderful Works · Arsitektur & Kontraktor Utama', 'Wonderful Works · Architecture & General Contractor')}
          </span>
        </div>

        <nav aria-label="Navigasi footer" className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">{t('Beranda', 'Home')}</Link>
          <Link href="/about" className="hover:text-white transition-colors">{t('Tentang', 'About')}</Link>
          <Link href="/services" className="hover:text-white transition-colors">{t('Layanan', 'Services')}</Link>
          <Link href="/projects" className="hover:text-white transition-colors">{t('Proyek', 'Projects')}</Link>
          <Link href="/contact" className="hover:text-white transition-colors">{t('Kontak', 'Contact')}</Link>
        </nav>

        <div className="text-center md:text-right text-neutral-400">
          <span>Copyright wwconstruction.id ©{new Date().getFullYear()} All Rights Reserved</span>
          <span className="block sm:inline sm:before:content-['·'] sm:before:mx-2 text-neutral-400">
            {SITE_CONTACT.studio.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
