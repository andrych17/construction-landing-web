'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLayoutMode, LayoutId } from '@/context/LayoutContext';
import { LuCheck, LuX, LuLayoutGrid } from 'react-icons/lu';

export default function LayoutSwitcher() {
  const { currentLayout, setLayout, layouts } = useLayoutMode();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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

  const activeConfig = layouts.find((l) => l.id === currentLayout) || layouts[0];

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pilih 5 Tata Letak (Layout) Arsitektural Berbeda"
        className="flex items-center gap-3 px-4 py-3 bg-slate-950 text-white hover:bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-full shadow-2xl backdrop-blur-md transition-all group min-h-[48px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        <div
          className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs transition-transform group-hover:scale-125"
          style={{ backgroundColor: activeConfig.themeColor }}
        />
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 leading-none">
            Ganti Layout (7 Pilihan)
          </span>
          <span className="text-xs font-bold text-white leading-tight font-mono truncate max-w-[160px] sm:max-w-[200px]">
            {activeConfig.name}
          </span>
        </div>
        <LuLayoutGrid className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors ml-1" />
      </button>

      {/* 7 Distinct Layouts Drawer */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-88 sm:w-[420px] bg-slate-950 text-slate-100 border border-slate-800 rounded-sm shadow-2xl p-5 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-800 mb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-orange-500 font-bold block">
                7 ARSITEKTUR LAYOUT TOTAL BERBEDA
              </span>
              <h4 className="text-sm font-bold text-white font-mono">
                Pilih Konsep & Tata Letak Situs
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xs transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Tutup Pilihan Layout"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-4 font-mono leading-relaxed">
            Setiap pilihan di bawah ini memiliki susunan struktur, tipografi, dan alur visual yang benar-benar berbeda 100%:
          </p>

          {/* 5 Layout Choices */}
          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {layouts.map((item) => {
              const isSelected = currentLayout === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setLayout(item.id as LayoutId);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-sm border transition-all flex items-start gap-3.5 cursor-pointer min-h-[44px] ${
                    isSelected
                      ? 'bg-slate-900 border-orange-500 shadow-md ring-1 ring-orange-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {/* Swatch Indicator */}
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-1 flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: item.themeColor }}
                  >
                    {isSelected && <LuCheck className="w-3 h-3 text-white stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white font-mono truncate">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase bg-slate-800 px-1.5 py-0.5 rounded-2xs flex-shrink-0">
                        {item.inspiration}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {item.subtitle}
                    </div>

                    <p className="text-[11px] text-slate-300 mt-1.5 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>TERSIMPAN DI PERANGKAT ANDA</span>
            <span style={{ color: activeConfig.themeColor }} className="font-bold">
              AKTIF: {activeConfig.id.toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
