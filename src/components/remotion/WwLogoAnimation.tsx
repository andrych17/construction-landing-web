'use client';

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { OFFICIAL_WW_LOGO_PATH } from '@/components/ui/ModernWwLogo';

export default function WwLogoAnimation() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Spring scale and opacity for the Official Instagram Emblem
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });

  const logoOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
  });


  // 3. Official Logo Mask Reveal Height (Frames 6-30)
  const maskProgress = interpolate(frame, [6, 30], [0, 512], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 4. Wordmark Baskervville "WW.CONS" (Frames 20-38)
  const titleOpacity = interpolate(frame, [20, 36], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const titleY = interpolate(frame, [20, 36], [14, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const letterSpacing = interpolate(frame, [20, 38], [8, 14], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 5. Subtitle (Frames 26-42)
  const subOpacity = interpolate(frame, [26, 42], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 6. Gleam Glint (Frames 30-45)
  const gleamX = interpolate(frame, [30, 45], [-120, 260], {
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
      {/* Ambient Gold Radial Flare */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.09) 0%, rgba(3, 3, 3, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Logo Composition */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${0.9 + logoSpring * 0.1})`,
          opacity: logoOpacity,
        }}
      >
        {/* Official Instagram @ww.cons Vector Logo Emblem */}
        <div style={{ position: 'relative', width: 95, height: 130, marginBottom: 28 }}>
          <svg
            viewBox="0 0 378 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          >
            <defs>
              <linearGradient id="igGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FDE68A" />
                <stop offset="65%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <filter id="igGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.45" />
              </filter>
              <clipPath id="logoRevealClip">
                <rect x="0" y="0" width="378" height={maskProgress} />
              </clipPath>
            </defs>

            {/* Official Logo Path with Gold Architectural Gradient and Reveal Clip */}
            <g clipPath="url(#logoRevealClip)" filter="url(#igGoldGlow)">
              <path d={OFFICIAL_WW_LOGO_PATH} fill="url(#igGoldGrad)" />
            </g>
          </svg>

          {/* Gleam Glint Shimmer */}
          {frame >= 30 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: gleamX,
                width: 35,
                height: 130,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
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
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
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

        {/* Subtitle: "ARCHITECTURE · GENERAL CONTRACTING" */}
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
