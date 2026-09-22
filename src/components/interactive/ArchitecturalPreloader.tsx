'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitecturalPreloaderProps {
  onComplete?: () => void;
}

export default function ArchitecturalPreloader({ onComplete }: ArchitecturalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Smooth, visible logo animation progress (1.4s duration)
  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const skipTimer = setTimeout(() => {
        setUnmounted(true);
        if (onComplete) onComplete();
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    const startTime = Date.now();
    const duration = 1350; // 1.35 seconds

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        const finishTimer = setTimeout(() => {
          setIsDone(true);
        }, 180);

        const unmountTimer = setTimeout(() => {
          setUnmounted(true);
          if (onComplete) onComplete();
        }, 1200);

        return () => {
          clearTimeout(finishTimer);
          clearTimeout(unmountTimer);
        };
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Failsafe timer (never trap user)
  useEffect(() => {
    const safety = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        setUnmounted(true);
        if (onComplete) onComplete();
      }, 800);
    }, 2800);

    return () => clearTimeout(safety);
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex overflow-hidden ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Loading ww.cons architecture showcase"
    >
      {/* Central Official WW.CONS Logo Reveal Showcase */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24, scale: 1.02, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-between p-8 sm:p-14 pointer-events-none text-center"
          >
            {/* Top Brand Header */}
            <div className="flex items-center justify-between w-full max-w-[1400px]">
              <span className="font-serif text-sm tracking-[0.25em] text-white/90 uppercase font-medium">
                WW.CONS
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
                STUDIO SURABAYA
              </span>
            </div>

            {/* Center Logo & Progress */}
            <div className="flex flex-col items-center justify-center my-auto">
              {/* Video or Monogram Emblem Animation */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 flex items-center justify-center rounded-2xl overflow-hidden"
              >
                {/* Ambient Breathing Gold Halo */}
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
                
                {/* If user drops an MP4 video (e.g., Google Flow generated), it plays smoothly */}
                <video
                  src="/videos/logo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover relative z-10 rounded-2xl hidden"
                  onError={(e) => {
                    // If /videos/logo.mp4 doesn't exist, hide video and show image
                    (e.target as HTMLElement).style.display = 'none';
                    const fallbackImg = document.getElementById('preloader-fallback-logo');
                    if (fallbackImg) fallbackImg.style.display = 'block';
                  }}
                  onLoadedData={(e) => {
                    (e.target as HTMLElement).style.display = 'block';
                    const fallbackImg = document.getElementById('preloader-fallback-logo');
                    if (fallbackImg) fallbackImg.style.display = 'none';
                  }}
                />

                <Image
                  id="preloader-fallback-logo"
                  src="/images/ww/logo_white_hq.png"
                  alt="ww.cons Official Logo"
                  width={128}
                  height={128}
                  className="object-contain w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(245,158,11,0.65)]"
                  priority
                />
              </motion.div>

              {/* Wordmark: Baskervville Serif */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex items-center gap-2 mb-2"
              >
                <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.28em] text-white uppercase font-normal">
                  WW.CONS
                </h1>
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-6"
              >
                ARCHITECTURE · GENERAL CONTRACTOR
              </motion.p>

              {/* Monumental Tabular Progress Counter */}
              <div className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight tabular-nums select-none mb-3">
                <span>{String(progress).padStart(2, '0')}</span>
                <span className="text-base text-amber-400 font-mono ml-1 font-normal">%</span>
              </div>

              {/* Hairline Amber Progress Bar */}
              <div className="w-48 sm:w-60 h-[1.5px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Bottom Heritage Tagline */}
            <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.28em] text-neutral-500 uppercase">
              PT. CENTRA ARYA LOKA HERITAGE · VOZA TOWER SURABAYA
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5-Panel Architectural Vertical Curtain Panels */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="relative h-full flex-1 bg-[#030303] border-r border-white/[0.04] last:border-r-0"
          initial={{ y: '0%' }}
          animate={{ y: isDone ? '-100%' : '0%' }}
          transition={{
            duration: 0.85,
            delay: isDone ? index * 0.04 : 0,
            ease: [0.76, 0, 0.24, 1], // Smooth monolithic shutter curtain
          }}
        />
      ))}
    </div>
  );
}
