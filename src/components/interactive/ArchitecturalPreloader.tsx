'use client';

import React, { useState, useEffect } from 'react';
import { WwLogoMark } from '@/components/ui/ModernWwLogo';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitecturalPreloaderProps {
  onComplete?: () => void;
}

/* Timing intro. CURTAIN_MS wajib >= durasi animasi tirai di bawah
   (0,85 detik) ditambah stagger 4 x 0,04 detik, kalau tidak komponen
   ter-unmount saat tirai masih separuh jalan. */
const COUNT_MS = 2400; // hitungan progres 00 -> 100%, memberi waktu sapuan cahaya video emblem
const HOLD_MS = 200; // jeda singkat di 100% sebelum tirai naik
const CURTAIN_MS = 950; // 800 animasi + 150 stagger
const TOTAL_MS = COUNT_MS + HOLD_MS + CURTAIN_MS;

export default function ArchitecturalPreloader({ onComplete }: ArchitecturalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Smooth, visible logo animation progress
  useEffect(() => {
    // Intro tampil di tiap pemuatan halaman penuh.
    //
    // Tidak perlu guard sessionStorage: komponen ini dipasang di root layout,
    // dan Next.js tidak me-remount root layout saat navigasi antar halaman.
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      const skipTimer = setTimeout(() => {
        setUnmounted(true);
        if (onComplete) onComplete();
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / COUNT_MS) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        const finishTimer = setTimeout(() => setIsDone(true), HOLD_MS);
        const unmountTimer = setTimeout(() => {
          setUnmounted(true);
          if (onComplete) onComplete();
        }, HOLD_MS + CURTAIN_MS);

        return () => {
          clearTimeout(finishTimer);
          clearTimeout(unmountTimer);
        };
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Failsafe: jangan pernah mengurung pengguna kalau alur normal gagal.
  useEffect(() => {
    const safety = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        setUnmounted(true);
        if (onComplete) onComplete();
      }, CURTAIN_MS);
    }, TOTAL_MS + 600);

    return () => clearTimeout(safety);
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex overflow-hidden ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Memuat ww.cons"
    >
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className="absolute inset-0 z-30 pointer-events-none"
          >
            {/* Bingkai ala lembar gambar kerja arsitektur */}
            <div className="absolute inset-4 sm:inset-8 border border-white/10" />

            {/* Kepala lembar */}
            <div className="absolute top-8 sm:top-14 left-8 sm:left-14 right-8 sm:right-14 flex items-center justify-between font-mono text-[11px] tracking-[0.28em] text-neutral-400 uppercase">
              <span>WW.CONS</span>
              <span className="hidden sm:inline">Studio Surabaya</span>
            </div>

            {/* Pusat layar: Video Bumper Emblem ww.cons */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center overflow-hidden mb-5">
                {!videoError ? (
                  <video
                    src="/videos/logo.mp4"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <WwLogoMark className="w-20 h-20 text-white/90 logo-wipe" />
                )}
              </div>

              {/* Typographic Label & Hairline Progress Bar */}
              <div className="flex flex-col items-center gap-3">
                <span className="font-serif text-lg sm:text-xl tracking-[0.38em] text-white/90 uppercase font-light">
                  WW.CONS
                </span>

                <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-neutral-400">
                  <div className="w-28 sm:w-36 h-[1px] bg-white/10 relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-all duration-100 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-neutral-300">{String(progress).padStart(2, '0')}%</span>
                </div>
              </div>
            </div>

            {/* Kaki lembar — menyeimbangkan kepala di atas */}
            <div className="absolute bottom-8 sm:bottom-14 left-8 sm:left-14 right-8 sm:right-14 flex items-center justify-between font-mono text-[11px] tracking-[0.28em] text-neutral-400 uppercase">
              <span className="hidden sm:inline">Architecture · General Contractor</span>
              <span className="ml-auto">Wonderful Works</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tirai vertikal 5 panel yang terangkat saat selesai */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="relative h-full flex-1 bg-[#030303] border-r border-white/[0.04] last:border-r-0"
          initial={{ y: '0%' }}
          animate={{ y: isDone ? '-100%' : '0%' }}
          transition={{
            duration: 0.85,
            delay: isDone ? index * 0.04 : 0,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  );
}
