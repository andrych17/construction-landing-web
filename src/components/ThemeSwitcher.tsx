'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, ThemeId } from '@/context/ThemeContext';
import { LuCheck, LuX, LuPalette } from 'react-icons/lu';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="fixed bottom-6 right-6 z-50">
      {/* Floating Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pilih Palet Tema Warna Arsitektural"
        className="flex items-center gap-3 px-4 py-3 bg-white/95 hover:bg-white text-slate-900 border border-slate-300 hover:border-slate-400 rounded-full shadow-lg backdrop-blur-md transition-all group min-h-[48px] focus:outline-none focus:ring-2 focus:ring-slate-400"
      >
        <div
          className="w-4 h-4 rounded-full border border-black/10 shadow-xs flex-shrink-0 transition-transform group-hover:scale-110"
          style={{ backgroundColor: currentTheme.primary }}
        />
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 leading-none">
            Tema Arsitektur
          </span>
          <span className="text-xs font-bold text-slate-900 leading-tight">
            {currentTheme.name}
          </span>
        </div>
        <LuPalette className="w-4 h-4 text-slate-500 ml-1 group-hover:text-slate-900 transition-colors" />
      </button>

      {/* Palette Selection Popover */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-84 sm:w-96 bg-white border border-slate-300 rounded-sm shadow-2xl p-5 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-start justify-between pb-3.5 border-b border-slate-200 mb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                PILIHAN TEMA ARSITEKTUR
              </span>
              <h4 className="text-sm font-bold text-slate-950">
                5 Karakter Visual Kontraktor
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-xs transition-colors"
              aria-label="Tutup Pilihan Tema"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Pilih palet warna yang paling mewakili identitas proyek dan karakter arsitektur Anda:
          </p>

          {/* List of 5 Themes */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {themes.map((theme) => {
              const isSelected = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    setTheme(theme.id as ThemeId);
                  }}
                  className={`w-full text-left p-3 rounded-sm border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-slate-50 border-slate-900 shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50/80 hover:border-slate-300'
                  }`}
                >
                  {/* Swatch Circle */}
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 mt-0.5 border border-black/10 flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {isSelected && <LuCheck className="w-4 h-4 text-white stroke-[3]" />}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-950">
                        {theme.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded-2xs">
                        {theme.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {theme.subtitle}
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                      {theme.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>PILIHAN TERSIMPAN SECARA OTOMATIS</span>
            <span style={{ color: currentTheme.primary }} className="font-bold">
              AKTIF: {currentTheme.name.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
