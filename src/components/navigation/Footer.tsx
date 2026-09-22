'use client';

import React from 'react';
import Link from 'next/link';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#050505] text-neutral-500 text-xs border-t border-white/[0.08] w-full">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[11px]">
        <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
          <Link href="/" className="flex items-center gap-2.5 group">
            <ModernWwLogo variant="mark" size="sm" />
            <span className="font-serif font-bold text-white tracking-widest text-sm group-hover:text-amber-400 transition-colors">
              WW.CONS™
            </span>
          </Link>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <span className="text-neutral-400">Wonderful Works · Architecture & General Contractor</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="text-center md:text-right text-neutral-500">
          <span>Copyright wwconstruction.id ©2026 All Rights Reserved</span>
          <span className="block sm:inline sm:before:content-['·'] sm:before:mx-2 text-neutral-600">
            Voza Premium Office Lt. 20 Surabaya
          </span>
        </div>
      </div>
    </footer>
  );
}

export { Footer as BarcwayFooter };
