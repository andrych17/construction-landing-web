'use client';

import React, { useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { RealProjectReelComp } from './RealProjectReelComp';
import { useTheme } from '@/context/ThemeContext';
import {
  LuPlay,
  LuPause,
  LuShieldCheck,
  LuPhone,
  LuMapPin,
} from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa';

// Dynamic import of Remotion Player to prevent SSR hydration errors
const Player = dynamic(
  () => import('@remotion/player').then((mod) => mod.Player),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/9] bg-slate-900 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-3">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span>MEMUAT DOKUMENTASI PROYEK @WW.CONS...</span>
      </div>
    ),
  }
);

export default function RemotionShowcase() {
  const { currentTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'remotion' | 'live_timelapse'>('remotion');

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full bg-slate-950 border border-slate-300 rounded-sm overflow-hidden shadow-lg relative">
      {/* Player Header Bar with Mode Selector */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-white border-b border-slate-200 text-xs gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('remotion')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[36px] ${
              viewMode === 'remotion'
                ? 'bg-slate-950 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Reel Arsitektur (Remotion 30 FPS)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('live_timelapse')}
            className={`px-3 py-1.5 rounded-xs font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer min-h-[36px] flex items-center gap-1.5 ${
              viewMode === 'live_timelapse'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Time-Lapse Lapangan (MP4)</span>
          </button>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <a
            href="https://www.instagram.com/ww.cons/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700 flex items-center gap-1.5 font-bold transition-colors cursor-pointer min-h-[36px]"
          >
            <FaInstagram className="w-3.5 h-3.5" />
            <span>@ww.cons</span>
          </a>
          <span className="text-slate-300">·</span>
          <span className="text-slate-700 font-semibold">Wonderful Works Construction</span>
        </div>
      </div>

      {/* Video Player Display Container */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
        {viewMode === 'remotion' ? (
          <>
            <Player
              component={RealProjectReelComp}
              inputProps={{
                brandColor: currentTheme.primary,
              }}
              durationInFrames={360}
              compositionWidth={1280}
              compositionHeight={720}
              fps={30}
              style={{
                width: '100%',
                height: '100%',
              }}
              controls={false}
              autoPlay={isPlaying}
              loop
            />

            {/* Floating Play/Pause Button for Remotion */}
            <div className="absolute top-4 right-4 z-20">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 rounded-sm backdrop-blur-md transition-all shadow-md flex items-center gap-2 text-xs font-mono min-h-[36px] cursor-pointer"
                aria-label={isPlaying ? 'Jeda Video' : 'Putar Video'}
              >
                {isPlaying ? (
                  <>
                    <LuPause className="w-3.5 h-3.5 text-brand" />
                    <span>Jeda Video</span>
                  </>
                ) : (
                  <>
                    <LuPlay className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Putar Video</span>
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          /* Live MP4 Time-Lapse Player */
          <div className="relative w-full h-full bg-black">
            <video
              src="/videos/construction_timelapse.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Telemetric HUD Overlay on Video */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-blue-500/40 px-3 py-1.5 rounded-xs text-[11px] font-mono text-white">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-blue-400">REC: LIVE SITE PROGRESS</span>
              <span className="text-slate-400">|</span>
              <span>SURABAYA · STRUKTUR BETON & PEMBESIAN</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/15 px-4 py-2 text-xs font-mono text-white">
              <div>
                <span className="font-bold text-amber-400">DOKUMENTASI RIIL PEKERJAAN LAPANGAN</span>
                <span className="text-slate-300 ml-2">Tahap Pondasi, Struktur Balok & Pengecoran</span>
              </div>
              <div className="text-[11px] text-slate-300">
                Laporan Berkala Harian via WhatsApp Proyek
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical & Consultation Bar in Light Mode */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-xs font-mono text-slate-600 gap-3">
        <div className="flex items-center gap-4">
          <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
            <LuShieldCheck className="w-4 h-4 text-emerald-600" />
            DOKUMENTASI RIIL
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:flex items-center gap-1 text-slate-700">
            <LuMapPin className="w-3.5 h-3.5 text-brand" />
            Surabaya (Semolowaru · Dharmahusada · Barat)
          </span>
        </div>

        <a
          href="https://wa.me/628113313347"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-900 hover:text-brand transition-colors font-bold text-xs"
        >
          <LuPhone className="w-3.5 h-3.5 text-brand" />
          <span>Konsultasi Proyek Serupa (+62 811-3313-347)</span>
        </a>
      </div>
    </div>
  );
}
