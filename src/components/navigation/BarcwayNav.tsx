'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuPhone, LuMenu } from 'react-icons/lu';
import ArchitecturalMegaMenu from '@/components/interactive/ArchitecturalMegaMenu';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact Us' },
];

export default function BarcwayNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ArchitecturalMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#000000]/95 backdrop-blur-md border-b border-white/[0.12] shadow-2xl'
            : 'bg-[#000000]/60 backdrop-blur-sm border-b border-white/[0.04]'
        }`}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="flex items-center justify-between h-[72px]">
            {/* Modern Architectural Brand Identity Lockup — WW.CONS */}
            <Link
              href="/"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
              aria-label="ww.cons Home"
            >
              <ModernWwLogo variant="full" size="md" />
            </Link>

            {/* Desktop Navigation Links — Multi-Page Active Routing */}
            <nav
              aria-label="Navigasi Utama"
              className="hidden lg:flex items-center gap-9 text-xs font-mono tracking-[0.2em] uppercase"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-2 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors ${
                      isActive ? 'text-amber-400 font-bold' : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-amber-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions & Menu Trigger — 44px Touch Target Min */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/6282298199902?text=Halo%20ww.cons%2C%20saya%20ingin%20konsultasi%20rancang%20bangun%20Surabaya."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-5 py-2.5 rounded-full border border-white/20 hover:border-amber-400/80 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-colors min-h-[44px] items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <LuPhone className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">+62 822 9819 9902</span>
              </a>

              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-amber-400 transition-colors font-mono text-xs font-bold tracking-widest min-h-[44px] cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Open Directory Menu"
              >
                <LuMenu className="w-4 h-4" />
                <span className="whitespace-nowrap">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
