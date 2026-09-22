'use client';

import React from 'react';
import { interpolate, useCurrentFrame, Img } from 'remotion';

interface ProjectScene {
  image: string;
  category: string;
  title: string;
  location: string;
  scope: string;
  chapter: string;
}

const scenes: ProjectScene[] = [
  {
    image: '/images/projects/jotun_showroom_hq.jpg',
    category: 'Komersial & Showroom',
    title: 'Jotun Showroom Commercial Fit-Out',
    location: 'Surabaya, Jawa Timur',
    scope: 'General Contracting & Commercial Fit-Out',
    chapter: '01. Jotun Showroom',
  },
  {
    image: '/images/projects/concrete_rebar_hq.jpg',
    category: 'Struktur Beton & Baja',
    title: 'Pekerjaan Struktur & Pembesian Lapangan',
    location: 'Semolowaru, Surabaya Timur',
    scope: 'Reinforced Concrete & Daily Progress Log',
    chapter: '02. Struktur Semolowaru',
  },
  {
    image: '/images/projects/luxury_residence_hq.jpg',
    category: 'Residensial Mewah',
    title: 'Rancang Bangun Rumah Mewah Modern & Klasik',
    location: 'Surabaya Timur & Sekitarnya',
    scope: 'Pembangunan Rumah Mewah & Detail Arsitektur',
    chapter: '03. Residensial Mewah',
  },
  {
    image: '/images/projects/tropical_facade_hq.jpg',
    category: 'Fasad Tropis Kontemporer',
    title: 'Fasad Arsitektur Modern Ramah Iklim',
    location: 'Surabaya, Jawa Timur',
    scope: 'Tropical Facade Engineering & Detailing',
    chapter: '04. Fasad Tropis',
  },
];

export interface RealProjectReelProps {
  brandColor?: string;
}

export const RealProjectReelComp: React.FC<RealProjectReelProps> = ({
  brandColor = '#EA580C',
}) => {
  const frame = useCurrentFrame();
  const sceneDuration = 90; // 3 seconds per project

  const currentSceneIndex = Math.min(
    scenes.length - 1,
    Math.floor(frame / sceneDuration)
  );
  const currentScene = scenes[currentSceneIndex];
  const sceneFrame = frame % sceneDuration;

  // Ken Burns subtle zoom effect: 1.0 -> 1.08
  const scale = interpolate(sceneFrame, [0, sceneDuration], [1.0, 1.08], {
    extrapolateRight: 'clamp',
  });

  // Crossfade between scenes (10 frames transition)
  const fadeIn = interpolate(sceneFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(sceneFrame, [sceneDuration - 10, sceneDuration], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const sceneOpacity = Math.min(fadeIn, fadeOut);

  // Lower-third title slide-up animation
  const titleY = interpolate(sceneFrame, [5, 25], [20, 0], {
    extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(sceneFrame, [5, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0F172A',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Project Image with Ken Burns motion */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: sceneOpacity,
          transform: `scale(${scale})`,
          transition: 'transform 0.1s linear',
        }}
      >
        <Img
          src={currentScene.image}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>

      {/* Cinematic Gradient Vignette & Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to top,
            rgba(15, 23, 42, 0.92) 0%,
            rgba(15, 23, 42, 0.4) 40%,
            rgba(15, 23, 42, 0.2) 70%,
            rgba(15, 23, 42, 0.75) 100%
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Architectural Corner Brackets (Turner-Style) */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          width: 24,
          height: 24,
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          borderLeft: '2px solid rgba(255, 255, 255, 0.5)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 24,
          height: 24,
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          borderRight: '2px solid rgba(255, 255, 255, 0.5)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Bar: Real Corporate Identity */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 36,
          right: 36,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Brand Monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              backgroundColor: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4,
              overflow: 'hidden',
              padding: 4,
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
          >
            <Img
              src="/images/ww/logo.jpg"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              Wonderful Works Construction
            </div>
            <div
              style={{
                color: brandColor,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 1,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
              }}
            >
              Wonderful Works Construction · Surabaya
            </div>
          </div>
        </div>

        {/* Official Instagram Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '6px 14px',
            borderRadius: 4,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: brandColor,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'monospace',
            }}
          >
            DOKUMENTASI RESMI @WW.CONS
          </span>
        </div>
      </div>

      {/* Center Cinematic Watermark (Subtle) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          textAlign: 'center',
          opacity: 0.08,
          fontSize: 64,
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: 8,
          textTransform: 'uppercase',
          width: '100%',
        }}
      >
        WONDERFUL WORKS
      </div>

      {/* Lower-Third: Real Project Information Card */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 36,
          right: 36,
          zIndex: 10,
          transform: `translateY(${titleY}px)`,
          opacity: textOpacity,
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ maxWidth: 640 }}>
            {/* Category Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span
                style={{
                  backgroundColor: brandColor,
                  color: '#FFFFFF',
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: 2,
                  fontFamily: 'monospace',
                }}
              >
                {currentScene.category}
              </span>
              <span
                style={{
                  color: '#CBD5E1',
                  fontSize: 11,
                  fontFamily: 'monospace',
                }}
              >
                📍 {currentScene.location}
              </span>
            </div>

            {/* Project Title */}
            <h2
              style={{
                color: '#FFFFFF',
                fontSize: 26,
                fontWeight: 900,
                lineHeight: 1.2,
                margin: '0 0 6px 0',
                letterSpacing: -0.5,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              {currentScene.title}
            </h2>

            {/* Scope / Description */}
            <div
              style={{
                color: '#94A3B8',
                fontSize: 13,
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {currentScene.scope}
            </div>
          </div>

          {/* Quality Guarantee Seal */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: `1px solid ${brandColor}66`,
              padding: '10px 16px',
              borderRadius: 4,
              textAlign: 'right',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ color: brandColor, fontSize: 10, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 1 }}>
              STANDAR MUTU TERUJI
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 13, fontWeight: 700, marginTop: 2 }}>
              Zero Hidden Cost · Presisi K3
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Chapter Timeline at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 36,
          right: 36,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {scenes.map((scene, idx) => {
            const isCurrent = idx === currentSceneIndex;
            const isPast = idx < currentSceneIndex;
            const segmentProgress = isCurrent
              ? (sceneFrame / sceneDuration) * 100
              : isPast
              ? 100
              : 0;

            return (
              <div key={scene.chapter} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div
                  style={{
                    height: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${segmentProgress}%`,
                      backgroundColor: brandColor,
                      borderRadius: 2,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 10,
                    fontFamily: 'monospace',
                    color: isCurrent ? '#FFFFFF' : 'rgba(148, 163, 184, 0.6)',
                    fontWeight: isCurrent ? 700 : 400,
                  }}
                >
                  <span>{scene.chapter}</span>
                  {isCurrent && <span style={{ color: brandColor }}>PLAYING</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
