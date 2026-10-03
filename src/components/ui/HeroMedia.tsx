'use client';

import React from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

interface HeroMediaProps {
  /** Video latar. Kosongkan untuk memakai poster saja. */
  src?: string;
  /** Wajib. Dipakai sebagai poster video sekaligus gambar LCP. */
  poster: string;
  alt?: string;
  /** Prioritaskan pemuatan gambar — nyalakan untuk hero paruh atas. */
  priority?: boolean;
}

/**
 * Latar hero: video (opsional) + dua scrim.
 *
 * Dipakai di homepage dan tiga halaman turunan. Scrim-nya sengaja hanya dua dan
 * menyasar area tertentu — versi lama menumpuk empat lapis peredup sehingga
 * gambarnya nyaris tak terlihat.
 *
 * Saat `prefers-reduced-motion: reduce`, video tidak dirender sama sekali dan
 * hanya poster yang tampil: video latar yang berputar terus adalah gerak
 * otomatis tanpa kontrol jeda.
 */
export default function HeroMedia({ src, poster, alt = '', priority = true }: HeroMediaProps) {
  const prefersReducedMotion = useReducedMotion();
  const showVideo = Boolean(src) && !prefersReducedMotion;
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !showVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#030303]">
      {/* High-priority Next.js poster: paints instantly in 0ms for perfect LCP */}
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center brightness-[0.95] contrast-[1.05] scale-105 hero-settle"
      />

      {/* Video layer: streams in background and smoothly fades in once ready */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setIsVideoReady(true)}
          className={`w-full h-full object-cover object-center brightness-[0.95] contrast-[1.05] scale-105 hero-settle transition-opacity duration-1000 ease-out ${
            isVideoReady ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src={src} type="video/mp4" media="(min-width: 768px)" />
        </video>
      )}

      {/* Strip atas: keterbacaan navbar */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/85 via-black/45 to-transparent" />
      {/* Strip bawah: dudukan teks hero */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#030303] via-[#030303]/70 to-transparent" />
    </div>
  );
}
