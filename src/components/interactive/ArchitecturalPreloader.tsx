'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitecturalPreloaderProps {
  onComplete?: () => void;
}

export default function ArchitecturalPreloader({ onComplete }: ArchitecturalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  // Fast, smooth, refined counter progression (approx 1.1s total)
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
    const duration = 1100; // Snappy 1.1s load time

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        const finishTimer = setTimeout(() => {
          setIsDone(true);
        }, 150);

        const unmountTimer = setTimeout(() => {
          setUnmounted(true);
          if (onComplete) onComplete();
        }, 1100);

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
      }, 900);
    }, 2200);

    return () => clearTimeout(safety);
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex overflow-hidden ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Loading studio showcase"
    >
      {/* Central Understated Studio Presentation */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-between p-8 sm:p-14 pointer-events-none text-center"
          >
            {/* Top Brand Mark */}
            <div className="flex items-center justify-between w-full max-w-[1400px]">
              <div className="font-serif text-sm tracking-[0.25em] text-white/80 uppercase">
                WW.CONS
              </div>
              <div className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                STUDIO SURABAYA
              </div>
            </div>

            {/* Center Monumental Counter */}
            <div className="flex flex-col items-center justify-center my-auto">
              <div className="font-serif text-6xl sm:text-7xl md:text-8xl font-normal text-white tracking-tight tabular-nums select-none mb-4">
                {String(progress).padStart(2, '0')}
              </div>
              <div className="w-36 sm:w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="h-full bg-amber-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>

            {/* Bottom Statement */}
            <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.3em] text-neutral-400 uppercase">
              ARCHITECTURE · GENERAL CONTRACTOR
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5-Panel Architectural Vertical Curtain Panels */}
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="relative h-full flex-1 bg-[#050505] border-r border-white/[0.04] last:border-r-0"
          initial={{ y: '0%' }}
          animate={{ y: isDone ? '-100%' : '0%' }}
          transition={{
            duration: 0.8,
            delay: isDone ? index * 0.04 : 0,
            ease: [0.76, 0, 0.24, 1], // Smooth monolithic shutter curtain
          }}
        />
      ))}
    </div>
  );
}
