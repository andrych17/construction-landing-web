'use client';

import React from 'react';

interface FounderSvgPlaceholderProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function FounderSvgPlaceholder({
  className = 'w-full h-full',
  title = 'LEAD PRINCIPAL & MASTER BUILDER',
  subtitle = 'IR. CALVIN LIMANTORO, S.T., M.T.',
}: FounderSvgPlaceholderProps) {
  return (
    <div className={`relative w-full h-full min-h-[380px] bg-gradient-to-b from-[#141414] via-[#0a0a0a] to-[#040404] flex items-center justify-center overflow-hidden select-none ${className}`}>
      {/* 1. Subtle CAD Blueprint Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="founder-cad-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#D97706"
              strokeWidth="0.5"
              strokeDasharray="2,4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#founder-cad-grid)" />
      </svg>

      {/* 2. Geometric Architectural Vector Silhouette & Drafting Circles */}
      <svg
        viewBox="0 0 400 500"
        className="relative z-10 w-full max-w-[340px] h-auto text-amber-500/80 drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gold-silhouette-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="halo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Halo Glow */}
        <circle cx="200" cy="180" r="110" fill="url(#halo-grad)" />

        {/* Outer Orbit Compass Rings */}
        <circle
          cx="200"
          cy="180"
          r="135"
          stroke="#F59E0B"
          strokeWidth="0.75"
          strokeDasharray="4 6"
          className="opacity-40"
        />
        <circle
          cx="200"
          cy="180"
          r="95"
          stroke="#F59E0B"
          strokeWidth="1"
          strokeDasharray="12 4"
          className="opacity-50"
        />

        {/* Crosshair Coordinate Ticks */}
        <line x1="200" y1="20" x2="200" y2="340" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3,3" />
        <line x1="40" y1="180" x2="360" y2="180" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3,3" />

        {/* Geometric Minimalist Silhouette (Architectural Torso & Head) */}
        {/* Head Contour */}
        <path
          d="M200 80 C 160 80, 150 115, 150 155 C 150 195, 165 230, 200 230 C 235 230, 250 195, 250 155 C 250 115, 240 80, 200 80 Z"
          fill="#111111"
          stroke="url(#gold-silhouette-grad)"
          strokeWidth="1.5"
        />

        {/* Shoulders & Suit Jacket Form */}
        <path
          d="M100 380 C 100 290, 140 250, 175 240 L 200 265 L 225 240 C 260 250, 300 290, 300 380 L 100 380 Z"
          fill="#0D0D0D"
          stroke="url(#gold-silhouette-grad)"
          strokeWidth="1.5"
        />

        {/* Tie & Collar Drafting Lines */}
        <path
          d="M185 245 L 200 280 L 215 245"
          stroke="#F59E0B"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M195 280 L 192 360 L 200 375 L 208 360 L 205 280 Z"
          fill="#181818"
          stroke="#F59E0B"
          strokeWidth="1"
        />

        {/* Architectural Compass Icon at Heart */}
        <g transform="translate(200, 320) scale(0.6)">
          <path
            d="M-20 -20 L0 -40 L20 -20 L0 0 Z"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
          />
          <circle cx="0" cy="-20" r="4" fill="#F59E0B" />
        </g>

        {/* Laser Alignment Crosshair Marks */}
        <g stroke="#F59E0B" strokeWidth="1" opacity="0.7">
          <path d="M50 420 L70 420 M60 410 L60 430" />
          <path d="M330 420 L350 420 M340 410 L340 430" />
          <path d="M50 80 L70 80 M60 70 L60 90" />
          <path d="M330 80 L350 80 M340 70 L340 90" />
        </g>

        {/* Technical Text inside SVG */}
        <text
          x="200"
          y="435"
          textAnchor="middle"
          fill="#F59E0B"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.25em"
          fontWeight="bold"
        >
          {title}
        </text>
        <text
          x="200"
          y="455"
          textAnchor="middle"
          fill="#E5E5E5"
          fontSize="12"
          fontFamily="serif"
          letterSpacing="0.08em"
          fontWeight="500"
        >
          {subtitle}
        </text>
        <text
          x="200"
          y="475"
          textAnchor="middle"
          fill="#71717A"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.2em"
        >
          PT. CENTRA ARYA LOKA · WW.CONS SURABAYA
        </text>
      </svg>

      {/* 3. Corner Architectural Brackets */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

      {/* 4. Top Tag */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 border border-amber-500/30 font-mono text-[9px] text-amber-400 uppercase tracking-widest backdrop-blur-md">
        PORTRAIT ARCHIVE // SPEC-01
      </div>
    </div>
  );
}
