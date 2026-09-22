'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import WwLogoAnimation from '@/components/remotion/WwLogoAnimation';

// Dynamic import of Remotion Player to guarantee zero SSR hydration issues
const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => null,
  }
);

interface ArchitecturalPreloaderProps {
  onComplete?: () => void;
}

export default function ArchitecturalPreloader({ onComplete }: ArchitecturalPreloaderProps) {
  const [isDone, setIsDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const skipTimer = setTimeout(() => {
        setUnmounted(true);
        if (onComplete) onComplete();
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    // Total Remotion animation duration is ~1.5s (45 frames @ 30fps)
    const doneTimer = setTimeout(() => {
      setIsDone(true);
    }, 1550);

    const unmountTimer = setTimeout(() => {
      setUnmounted(true);
      if (onComplete) onComplete();
    }, 2450);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(doneTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex overflow-hidden ${
        isDone ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-label="Loading ww.cons architecture showcase"
    >
      {/* Remotion Architectural Video Player Reveal */}
      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none p-4"
          >
            {mounted && (
              <div className="w-full max-w-[620px] aspect-[7/5] flex items-center justify-center">
                <Player
                  component={WwLogoAnimation}
                  durationInFrames={45}
                  compositionWidth={700}
                  compositionHeight={500}
                  fps={30}
                  autoPlay
                  loop={false}
                  controls={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
            )}
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
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  );
}
