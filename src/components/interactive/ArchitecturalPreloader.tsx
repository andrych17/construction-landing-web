'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { WwLogoMark } from '@/components/ui/ModernWwLogo';
import { ShutterColumns } from '@/components/interactive/ConstructionShutter';
import { motion } from 'framer-motion';

// Logo di video sudah utuh sejak ±0.4s; sisanya hanya kilau cahaya. Bumper yang
// menahan konten lebih dari ±2s merugikan kunjungan pertama, jadi cukup 1.6s.
// Klip logo-intro.mp4 adalah potongan 2.4s tanpa audio dari logo.mp4 (2.7MB → 0.5MB).
const COUNT_MS = 1600;
const HOLD_MS = 200; // jeda singkat sebelum kolom terangkat
const CURTAIN_MS = 600; // 6 kolom terangkat: 0.45s + stagger 5 × 0.03s
const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;

const STORAGE_KEY = 'ww_preloaded';

// Melepas jeda animasi masuk hero (lihat html[data-curtain] di globals.css).
const releaseCurtain = () => delete document.documentElement.dataset.curtain;

// Skrip inline di layout sudah memasang class ini untuk sesi yang pernah melihat
// preloader, rute admin, dan prefers-reduced-motion. Snapshot server = false
// supaya hidrasi cocok dengan HTML server, lalu React langsung render ulang.
const noopSubscribe = () => () => {};
const readSkipped = () =>
  document.documentElement.classList.contains('ww-preloaded') ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverSkipped = () => false;

export default function ArchitecturalPreloader() {
  const pathname = usePathname();
  const isAdminRoute = pathname === '/login' || pathname.startsWith('/admin');
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const skipped = useSyncExternalStore(noopSubscribe, readSkipped, serverSkipped);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video sengaja tanpa autoPlay dan preload="none": elemen ini ikut ter-render
  // di HTML server untuk semua kunjungan, dan autoPlay membuat browser
  // mengunduhnya bahkan saat preloader disembunyikan CSS (sesi yang sudah
  // pernah melihatnya). Baca DOM langsung, bukan `skipped`, karena render
  // hidrasi pertama selalu memakai snapshot server (false).
  useEffect(() => {
    if (!readSkipped()) videoRef.current?.play().catch(() => setVideoError(true));
  }, []);

  useEffect(() => {
    if (skipped) {
      releaseCurtain();
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const markComplete = () => {
      setUnmounted(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
        document.documentElement.classList.add('ww-preloaded');
      } catch {}
    };

    // Dipanggil sekali: oleh timer, atau lebih awal saat pengunjung klik / tap /
    // scroll / tekan tombol — bumper tidak boleh menahan orang yang ingin masuk.
    const lift = () => {
      SKIP_EVENTS.forEach((ev) => window.removeEventListener(ev, lift));
      clearTimeout(timer);
      releaseCurtain();
      setIsDone(true);
      timer = setTimeout(markComplete, CURTAIN_MS);
    };

    SKIP_EVENTS.forEach((ev) => window.addEventListener(ev, lift, { passive: true }));
    timer = setTimeout(lift, COUNT_MS + HOLD_MS);

    return () => {
      SKIP_EVENTS.forEach((ev) => window.removeEventListener(ev, lift));
      clearTimeout(timer);
    };
  }, [skipped]);

  if (skipped || unmounted || isAdminRoute) return null;

  return (
    <div
      id="ww-architectural-preloader"
      className={`fixed inset-0 z-[9999] overflow-hidden ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Memuat Wonderful Works Construction"
    >
      {/* Kolom struktural yang sama dengan transisi antar-halaman: terangkat bertahap. */}
      <ShutterColumns initial="0%" to={isDone ? '-100%' : '0%'} />

      {/* Fullscreen Video Bumper Solid Tanpa Garis atau Celah */}
      <motion.div
        className="absolute inset-0 bg-[#030303] flex items-center justify-center overflow-hidden"
        animate={{ opacity: isDone ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {!videoError ? (
          <video
            src="/videos/logo-intro.mp4"
            ref={videoRef}
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover object-center bg-[#030303]"
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#030303]">
            <WwLogoMark className="w-24 h-24 text-white/90 logo-wipe" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
