'use client';

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const ArchitecturalBlueprintComp: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animations based on frame
  // Frame 0-45: Grid & Blueprint Coordinate Lines
  const gridOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const lineProgress = interpolate(frame, [10, 50], [0, 100], { extrapolateRight: 'clamp' });

  // Frame 35-85: Structural Columns Spring Up
  const columnProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Frame 70-120: Beam & Roof Truss Framing
  const beamProgress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  // Frame 110-150: Laser Scanner & Quality Verification
  const scannerX = interpolate(frame, [100, 145], [-50, width + 50], { extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [125, 145], [0, 1], { extrapolateRight: 'clamp' });
  const badgeScale = spring({
    frame: frame - 125,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  // Loop fade out Frame 165-180
  const masterFade = interpolate(frame, [170, 180], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'monospace',
        opacity: masterFade,
      }}
    >
      {/* Precision Blueprint Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: gridOpacity * 0.25,
          backgroundImage: `
            linear-gradient(to right, rgba(56, 189, 248, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Outer Technical Frame & Coordinate Rulers */}
      <div
        style={{
          position: 'absolute',
          inset: 24,
          border: '1px solid rgba(148, 163, 184, 0.3)',
          pointerEvents: 'none',
        }}
      >
        {/* Top Header Telemetry */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 16px',
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
            fontSize: 12,
            color: '#94A3B8',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ color: '#EA580C', fontWeight: 'bold' }}>
              ● LIVE CAD SIMULATION // REMOTION ENGINE
            </span>
            <span>PROJ: JOTUN SHOWROOM SURABAYA</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <span>LOC: 07°18'S 112°47'E</span>
            <span>SCALE: 1:50</span>
            <span style={{ color: '#38BDF8' }}>TOL: ±0.5mm</span>
          </div>
        </div>

        {/* Dynamic Architectural Drawing Canvas */}
        <svg
          width="100%"
          height="80%"
          viewBox="0 0 1000 500"
          style={{ position: 'absolute', top: 50, left: 0 }}
        >
          <defs>
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#EA580C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ground Line */}
          <line
            x1="100"
            y1="400"
            x2={`${100 + (lineProgress / 100) * 800}`}
            y2="400"
            stroke="#94A3B8"
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          {/* Footing Foundations */}
          {[200, 400, 600, 800].map((x, i) => {
            const h = Math.max(0, Math.min(1, columnProgress * 1.5 - i * 0.15));
            return (
              <g key={x}>
                {/* Footing Pad */}
                <rect
                  x={x - 45}
                  y={400}
                  width="90"
                  height={h * 20}
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />
                {/* Vertical Column */}
                <rect
                  x={x - 12}
                  y={400 - h * 240}
                  width="24"
                  height={h * 240}
                  fill="rgba(234, 88, 12, 0.25)"
                  stroke="#EA580C"
                  strokeWidth="2"
                />
                {/* Column Centerline */}
                <line
                  x1={x}
                  y1={405}
                  x2={x}
                  y2={400 - h * 255}
                  stroke="#F97316"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
                {/* Column ID Tag */}
                {h > 0.8 && (
                  <text
                    x={x}
                    y={425}
                    fill="#94A3B8"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    COL-{i + 1}
                  </text>
                )}
              </g>
            );
          })}

          {/* Horizontal Beams (Floor 2 & Roof) */}
          {beamProgress > 0 && (
            <g>
              {/* Mid Beam Level +4.20m */}
              <rect
                x="180"
                y="280"
                width={Math.min(640, beamProgress * 640)}
                height="18"
                fill="rgba(56, 189, 248, 0.2)"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              {/* Roof Truss Girder Level +7.50m */}
              <polygon
                points={`
                  180,160 
                  ${180 + Math.min(320, beamProgress * 320)},${160 - Math.min(60, beamProgress * 60)} 
                  ${180 + Math.min(640, beamProgress * 640)},160
                `}
                fill="none"
                stroke="#EA580C"
                strokeWidth="2.5"
                filter="url(#glow)"
              />
              {/* Web Truss Bracing */}
              {beamProgress > 0.6 && (
                <>
                  <line x1="260" y1="160" x2="340" y2="130" stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1="420" y1="160" x2="500" y2="100" stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1="580" y1="160" x2="500" y2="100" stroke="#38BDF8" strokeWidth="1.5" />
                  <line x1="740" y1="160" x2="660" y2="130" stroke="#38BDF8" strokeWidth="1.5" />
                </>
              )}
            </g>
          )}

          {/* Dimension Calipers */}
          {lineProgress > 70 && (
            <g opacity={gridOpacity}>
              {/* Horizontal Total Dimension */}
              <line x1="200" y1="450" x2="800" y2="450" stroke="#94A3B8" strokeWidth="1" />
              <line x1="200" y1="442" x2="200" y2="458" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="800" y1="442" x2="800" y2="458" stroke="#94A3B8" strokeWidth="1.5" />
              <text
                x="500"
                y="445"
                fill="#F8FAFC"
                fontSize="12"
                textAnchor="middle"
                fontFamily="monospace"
                fontWeight="bold"
              >
                SPAN: 24,000 mm [AS TO AS]
              </text>

              {/* Vertical Height Dimension */}
              <line x1="860" y1="400" x2="860" y2="160" stroke="#94A3B8" strokeWidth="1" />
              <line x1="852" y1="400" x2="868" y2="400" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="852" y1="160" x2="868" y2="160" stroke="#94A3B8" strokeWidth="1.5" />
              <text
                x="880"
                y="285"
                fill="#F8FAFC"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
              >
                H: 7,500 mm
              </text>
            </g>
          )}

          {/* Laser Scanner Vertical Line */}
          {frame >= 95 && frame <= 150 && (
            <g>
              <line
                x1={scannerX}
                y1="50"
                x2={scannerX}
                y2="450"
                stroke="#EA580C"
                strokeWidth="2.5"
                filter="url(#glow)"
              />
              <rect
                x={scannerX - 35}
                y="40"
                width="70"
                height="18"
                fill="#EA580C"
                rx="2"
              />
              <text
                x={scannerX}
                y="53"
                fill="#FFFFFF"
                fontSize="9"
                textAnchor="middle"
                fontWeight="bold"
                fontFamily="monospace"
              >
                QC SCAN
              </text>
            </g>
          )}
        </svg>

        {/* Verified Stamp Overlay */}
        {badgeOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${badgeScale})`,
              opacity: badgeOpacity,
              border: '2px solid #EA580C',
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              padding: '16px 28px',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            <div style={{ color: '#EA580C', fontSize: 11, fontWeight: 'bold', letterSpacing: 2 }}>
              ★ WONDERFUL WORKS CONSTRUCTION ★
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 900, marginTop: 4, letterSpacing: 1 }}>
              QUALITY VERIFIED: 100%
            </div>
            <div style={{ color: '#38BDF8', fontSize: 11, marginTop: 4, fontFamily: 'monospace' }}>
              &ldquo;BRINGING YOUR VISION TO LIFE WITH EXPERT CRAFTSMANSHIP&rdquo;
            </div>
          </div>
        )}

        {/* Bottom Technical Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            fontSize: 11,
            color: '#94A3B8',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
          }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#22C55E' }}>● STRUCTURAL INTEGRITY: OPTIMAL</span>
            <span>|</span>
            <span>BEARING CAPACITY: 450 kN/m²</span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span>CAD VER: 2026.9</span>
            <span style={{ color: '#EA580C', fontWeight: 'bold' }}>@WW.CONS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
