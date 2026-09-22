'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ModernWwLogoProps {
  variant?: 'mark' | 'full' | 'minimal' | 'preloader';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

export default function ModernWwLogo({
  variant = 'full',
  size = 'md',
  className = '',
  animated = false,
}: ModernWwLogoProps) {
  // Dimensions map
  const sizeMap = {
    sm: { box: 'w-8 h-8', svg: 32, text: 'text-[15px]', subtext: 'text-[7.5px]' },
    md: { box: 'w-10 h-10', svg: 40, text: 'text-[17px]', subtext: 'text-[8.5px]' },
    lg: { box: 'w-14 h-14', svg: 56, text: 'text-2xl', subtext: 'text-[10px]' },
    xl: { box: 'w-24 h-24', svg: 96, text: 'text-4xl', subtext: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  // The Pure Vector Architectural WW Emblem
  const renderSvgMark = (isPreloader = false) => {
    return (
      <div className={`relative ${isPreloader ? 'w-24 h-24 sm:w-28 sm:h-28' : currentSize.box} shrink-0 group`}>
        {/* Ambient Backlight Glow on hover or preloader */}
        <div
          className={`absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 blur-md opacity-60 transition-opacity duration-500 ${
            isPreloader ? 'animate-pulse opacity-80' : 'group-hover:opacity-100'
          }`}
        />

        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-lg"
        >
          <defs>
            <linearGradient id="wwGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="45%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="wwWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="wwBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#141923" />
              <stop offset="100%" stopColor="#05070B" />
            </linearGradient>
            <filter id="wwAmberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#F59E0B" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Machined Bezel Container */}
          <rect
            x="8"
            y="8"
            width="184"
            height="184"
            rx="22"
            fill="url(#wwBezelGrad)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="2"
          />

          {/* Architectural Drafting Crosshairs & Datum Axis */}
          <line x1="16" y1="100" x2="184" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="100" y1="16" x2="100" y2="184" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="68" stroke="rgba(245,158,11,0.09)" strokeWidth="1" />

          {/* 4 Precision Corner Calibration Ticks */}
          <path d="M 22 34 L 22 22 L 34 22" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 166 22 L 178 22 L 178 34" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 22 166 L 22 178 L 34 178" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 166 178 L 178 178 L 178 166" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />

          {/* First Architectural W (Platinum White Facet Structural Beams) */}
          {animated || isPreloader ? (
            <motion.path
              d="M 38 60 L 58 142 L 78 88 L 98 142 L 118 60"
              stroke="url(#wwWhiteGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <path
              d="M 38 60 L 58 142 L 78 88 L 98 142 L 118 60"
              stroke="url(#wwWhiteGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Second Architectural W (Gold Offset Interlocking Structure) */}
          {animated || isPreloader ? (
            <motion.path
              d="M 82 60 L 102 142 L 122 88 L 142 142 L 162 60"
              stroke="url(#wwGoldGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wwAmberGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <path
              d="M 82 60 L 102 142 L 122 88 L 142 142 L 162 60"
              stroke="url(#wwGoldGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wwAmberGlow)"
            />
          )}

          {/* Central Architectural Nexus Dot */}
          <circle cx="100" cy="88" r="5" fill="#FBBF24" stroke="#06080D" strokeWidth="2" />
        </svg>
      </div>
    );
  };

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{renderSvgMark()}</div>;
  }

  if (variant === 'preloader') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        {renderSvgMark(true)}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderSvgMark()}
        <div className="flex items-center gap-1.5">
          <span className={`font-serif ${currentSize.text} tracking-[0.2em] font-bold text-white uppercase`}>
            WW.CONS
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
      </div>
    );
  }

  // Full Brand Lockup: Mark + Baskervville Wordmark + Micro-Spaced Subline
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {renderSvgMark()}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif ${currentSize.text} tracking-[0.2em] font-bold text-white uppercase group-hover:text-amber-400 transition-colors`}>
            WW.CONS
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
        </div>
        <span className={`${currentSize.subtext} font-mono tracking-[0.28em] text-neutral-400 uppercase group-hover:text-neutral-300 transition-colors`}>
          ARCHITECTURE · INTERIOR · CONTRACTING
        </span>
      </div>
    </div>
  );
}
