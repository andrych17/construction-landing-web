'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { WwLogoMark } from '@/components/ui/ModernWwLogo';
import { motion } from 'framer-motion';

interface ArchitecturalPreloaderProps {
  onComplete?: () => void;
}

const COUNT_MS = 2400; // durasi hitungan video sapuan cahaya bumper
const HOLD_MS = 200; // jeda singkat sebelum tirai terangkat
const CURTAIN_MS = 850; // durasi animasi tirai halus
const TOTAL_MS = COUNT_MS + HOLD_MS + CURTAIN_MS;

export default function ArchitecturalPreloader({ onComplete }: ArchitecturalPreloaderProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname === '/login' || pathname.startsWith('/admin');
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
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

    const finishTimer = setTimeout(() => {
      setIsDone(true);
    }, COUNT_MS + HOLD_MS);

    const unmountTimer = setTimeout(() => {
      setUnmounted(true);
      if (onComplete) onComplete();
    }, TOTAL_MS);

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  // Failsafe cadangan bila browser lambat me-render
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

  if (unmounted || isAdminRoute) return null;

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] bg-[#030303] overflow-hidden ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      initial={{ y: '0%' }}
      animate={{ y: isDone ? '-100%' : '0%' }}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
      }}
      role="status"
      aria-live="polite"
      aria-label="Memuat Wonderful Works Construction"
    >
      {/* Fullscreen Video Bumper Solid Tanpa Garis atau Celah */}
      <div className="absolute inset-0 bg-[#030303] flex items-center justify-center overflow-hidden">
        {!videoError ? (
          <video
            src="/videos/logo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center bg-[#030303]"
            onError={() => setVideoError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#030303]">
            <WwLogoMark className="w-24 h-24 text-white/90 logo-wipe" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
