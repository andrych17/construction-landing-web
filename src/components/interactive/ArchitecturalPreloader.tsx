'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernWwLogo from '@/components/ui/ModernWwLogo';

interface ArchitecturalPreloaderProps {
  onComplete?: () => void;
}

const PHASES = [
  { threshold: 20, code: '01', title: 'COMPUTATIONAL FORM GENERATION' },
  { threshold: 45, code: '02', title: 'STRUCTURAL REINFORCEMENT (SNI K-350)' },
  { threshold: 70, code: '03', title: 'TROPICAL BIOCLIMATIC SIMULATION' },
  { threshold: 92, code: '04', title: 'MATERIAL TEXTURE FIDELITY & MEP' },
  { threshold: 100, code: '05', title: 'ARCHITECTURAL CANVAS DEPLOYED' },
];

export default function ArchitecturalPreloader({ onComplete }: ArchitecturalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Determine current active phase
  const currentPhase = useMemo(() => {
    return PHASES.find((p) => progress <= p.threshold) || PHASES[PHASES.length - 1];
  }, [progress]);

  // Fast smooth algorithmic progress increment
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1400; // Total loading animation duration: 1.4s

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        const doneTimer = setTimeout(() => {
          setIsDone(true);
        }, 220);

        const unmountTimer = setTimeout(() => {
          setUnmounted(true);
          if (onComplete) onComplete();
        }, 1300);

        return () => {
          clearTimeout(doneTimer);
          clearTimeout(unmountTimer);
        };
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Failsafe timer (never block page)
  useEffect(() => {
    const safety = setTimeout(() => {
      setIsDone(true);
      setTimeout(() => {
        setUnmounted(true);
        if (onComplete) onComplete();
      }, 1000);
    }, 2800);

    return () => clearTimeout(safety);
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden transition-opacity duration-300 ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Loading Architectural Canvas"
    >
      {/* 1. HUD Telemetry Coordinates & Corner Crosshairs */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-30 pointer-events-none p-6 sm:p-10 flex flex-col justify-between"
          >
            {/* Top HUD Bar */}
            <div className="flex justify-between items-start font-mono text-[9px] sm:text-[10px] text-neutral-400 tracking-[0.25em] uppercase">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">+</span>
                <span>SURABAYA [07°15&apos;55&quot; S · 112°44&apos;33&quot; E]</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="hidden sm:inline">CAD STAGE: INITIALIZING</span>
                <span className="text-amber-400 font-bold">+</span>
              </div>
            </div>

            {/* Bottom HUD Bar */}
            <div className="flex justify-between items-end font-mono text-[9px] sm:text-[10px] text-neutral-400 tracking-[0.25em] uppercase">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">+</span>
                <span>WW.CONS · VOZA PREMIUM TOWER LT. 20</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="text-amber-400">SNI K-350 VERIFIED</span>
                <span className="text-amber-400 font-bold">+</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Precision Laser Scan Line (Sweeps across the viewport) */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity }}
            className="absolute left-0 right-0 z-20 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none shadow-[0_0_12px_rgba(251,191,36,0.6)]"
          />
        )}
      </AnimatePresence>

      {/* 3. Centered Modern Monogram, Counter & Stage Telemetry */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 1.04, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4"
          >
            {/* Ultra-Modern Vector Architectural Logo with Animated Strokes */}
            <div className="mb-7">
              <ModernWwLogo variant="preloader" animated />
            </div>

            {/* Studio Wordmark with Refined Letterspacing */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-white uppercase font-bold mb-2 flex items-center justify-center gap-2"
            >
              <span>WW.CONS</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-mono text-[9px] sm:text-[10px] tracking-[0.35em] text-neutral-400 uppercase mb-8"
            >
              ARCHITECTURE · INTERIOR · GENERAL CONTRACTOR
            </motion.p>

            {/* Monumental Tabular Progress Counter */}
            <div className="mb-4">
              <div className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight tabular-nums flex items-baseline justify-center">
                <span>{String(progress).padStart(2, '0')}</span>
                <span className="text-xl sm:text-2xl text-amber-400 font-mono ml-1 font-normal">%</span>
              </div>
            </div>

            {/* Precision Hairline Laser Progress Bar */}
            <div className="w-56 sm:w-72 max-w-[85vw] mb-4">
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Dynamic Stage Ticker */}
            <div className="h-5 flex items-center justify-center overflow-hidden">
              <motion.div
                key={currentPhase.code}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.25em] text-amber-400/90 uppercase"
              >
                PHASE {currentPhase.code} {'//'} {currentPhase.title}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Five-Panel Architectural Vertical Curtain Aperture */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="relative h-full flex-1 bg-[#05060A] border-r border-white/[0.04] last:border-r-0"
          initial={{ y: '0%' }}
          animate={{ y: isDone ? '-100%' : '0%' }}
          transition={{
            duration: 0.85,
            delay: isDone ? index * 0.05 : 0,
            ease: [0.76, 0, 0.24, 1], // Cinematic shutter easing curve
          }}
        >
          {/* Architectural Panel Datum Gridline */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_0%,transparent_70%)]" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.3em] text-white/10 select-none">
            GRID // 0{index + 1}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
