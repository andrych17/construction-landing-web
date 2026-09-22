'use client';

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export default function WwLogoAnimation() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Outer Machined Bezel Box Spring Scale & Opacity
  const boxSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });

  const boxOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 2. Drafting Crosshairs & Circle Axis (Frames 4-22)
  const axisProgress = interpolate(frame, [4, 22], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 3. First W Stroke (White / Platinum) Draw-in (Frames 8-28)
  const strokeLength = 320;
  const whiteWProgress = interpolate(frame, [8, 28], [strokeLength, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 4. Second W Stroke (Gold) Draw-in (Frames 14-34)
  const goldWProgress = interpolate(frame, [14, 34], [strokeLength, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 5. Central Nexus Dot Pop (Frames 24-34)
  const dotScale = spring({
    frame: frame - 24,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // 6. Typography Reveal (Frames 22-40)
  const titleOpacity = interpolate(frame, [22, 36], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const titleY = interpolate(frame, [22, 36], [16, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const letterSpacing = interpolate(frame, [22, 38], [8, 14], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 7. Subtitle Reveal (Frames 28-42)
  const subOpacity = interpolate(frame, [28, 42], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 8. Subtle Gleam Glint (Frames 32-45)
  const gleamX = interpolate(frame, [32, 45], [-100, 300], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#030303',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Atmosphere */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(3, 3, 3, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Logo Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${0.92 + boxSpring * 0.08})`,
          opacity: boxOpacity,
        }}
      >
        {/* SVG Architectural Emblem */}
        <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 28 }}>
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="remotionGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="remotionWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#A3A3A3" />
              </linearGradient>
              <linearGradient id="remotionBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#141923" />
                <stop offset="100%" stopColor="#05070B" />
              </linearGradient>
              <filter id="remotionGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Machined Bezel Container */}
            <rect
              x="8"
              y="8"
              width="184"
              height="184"
              rx="22"
              fill="url(#remotionBezelGrad)"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
            />

            {/* Drafting Datum Lines */}
            <line
              x1="16"
              y1="100"
              x2="184"
              y2="100"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeDashoffset={interpolate(axisProgress, [0, 1], [40, 0])}
            />
            <line
              x1="100"
              y1="16"
              x2="100"
              y2="184"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeDashoffset={interpolate(axisProgress, [0, 1], [40, 0])}
            />
            <circle
              cx="100"
              cy="100"
              r="68"
              stroke="rgba(245, 158, 11, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={axisProgress}
            />

            {/* 4 Corner Calibration Ticks */}
            <path
              d="M 22 34 L 22 22 L 34 22"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={axisProgress}
            />
            <path
              d="M 166 22 L 178 22 L 178 34"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={axisProgress}
            />
            <path
              d="M 22 166 L 22 178 L 34 178"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={axisProgress}
            />
            <path
              d="M 166 178 L 178 178 L 178 166"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={axisProgress}
            />

            {/* White W Structural Member */}
            <path
              d="M 38 60 L 58 142 L 78 88 L 98 142 L 118 60"
              stroke="url(#remotionWhiteGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={strokeLength}
              strokeDashoffset={whiteWProgress}
            />

            {/* Gold W Structural Member with Amber Glow */}
            <path
              d="M 82 60 L 102 142 L 122 88 L 142 142 L 162 60"
              stroke="url(#remotionGoldGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#remotionGoldGlow)"
              strokeDasharray={strokeLength}
              strokeDashoffset={goldWProgress}
            />

            {/* Center Nexus Pin */}
            {frame >= 24 && (
              <circle
                cx="100"
                cy="88"
                r={Math.max(0, 5 * dotScale)}
                fill="#FBBF24"
                stroke="#05070B"
                strokeWidth="2"
              />
            )}
          </svg>

          {/* Gleam Glint Shimmer Effect */}
          {frame >= 32 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: gleamX,
                width: 30,
                height: 140,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                transform: 'skewX(-25deg)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Wordmark: Baskervville Serif "WW.CONS" */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif), "Baskervville", Georgia, serif',
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: `${letterSpacing}px`,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            WW.CONS
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#F59E0B',
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)',
              display: 'inline-block',
            }}
          />
        </div>

        {/* Subtitle: "ARCHITECTURE · INTERIOR · GENERAL CONTRACTOR" */}
        <div
          style={{
            opacity: subOpacity,
            fontFamily: 'var(--font-mono), "JetBrains Mono", monospace',
            fontSize: 10,
            letterSpacing: '4px',
            color: '#A3A3A3',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          SURABAYA · ARCHITECTURE & GENERAL CONTRACTING
        </div>
      </div>
    </div>
  );
}
