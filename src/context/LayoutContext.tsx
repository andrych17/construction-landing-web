'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type LayoutId = 'corporate' | 'monograph' | 'blueprint' | 'editorial' | 'luxury';

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  subtitle: string;
  inspiration: string;
  themeColor: string;
  description: string;
}

export const LAYOUTS: Record<LayoutId, LayoutConfig> = {
  corporate: {
    id: 'corporate',
    name: '01. Corporate General Contractor',
    subtitle: 'Turner Construction & Skanska Style',
    inspiration: 'Kontraktor Korporat & K3 Fisik',
    themeColor: '#EA580C',
    description: 'Tata letak terstruktur, datum strip metrik, standar K3 ketat, dan indeks spesifikasi rekayasa sipil komersial.',
  },
  monograph: {
    id: 'monograph',
    name: '02. Architectural Monograph',
    subtitle: 'Foster + Partners & Swiss Minimalist',
    inspiration: 'Monograf Arsitektur & Tipografi Swiss',
    themeColor: '#0F172A',
    description: 'Ruang putih lapang, tipografi grotesk monumental, kisi asimetris, galeri visual luas, dan estetika atelier.',
  },
  blueprint: {
    id: 'blueprint',
    name: '03. Blueprint Engineering Matrix',
    subtitle: 'SOM & ARUP Technical Spec Sheet',
    inspiration: 'Cetak Biru Teknis & Lembar Spesifikasi CAD',
    themeColor: '#2563EB',
    description: 'Penggaris grid CAD, lembar tabel WBS rekayasa, toleransi milimeter, dan data inspeksi pengawasan lapangan.',
  },
  editorial: {
    id: 'editorial',
    name: '04. Editorial Design Magazine',
    subtitle: 'Architectural Digest & Monocle Style',
    inspiration: 'Majalah Desain Arsitektur & Jurnal Lapangan',
    themeColor: '#B45309',
    description: 'Nuansa kertas hangat, tajuk berita editorial, esai foto berselang-seling, dan ulasan catatan lapangan WW Notes.',
  },
  luxury: {
    id: 'luxury',
    name: '05. Bespoke Luxury & Craftsmanship',
    subtitle: 'Olson Kundig & Custom Estate Builder',
    inspiration: 'Showroom Eksklusif & Hunian Mewah Privat',
    themeColor: '#D97706',
    description: 'Material premium (marmer, kayu, baja arsitektur), sentuhan perunggu mewah, dan layanan konsultasi privat.',
  },
};

interface LayoutContextType {
  currentLayout: LayoutId;
  setLayout: (id: LayoutId) => void;
  layouts: LayoutConfig[];
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layoutId, setLayoutId] = useState<LayoutId>('corporate');

  useEffect(() => {
    const saved = localStorage.getItem('ww_construction_layout') as LayoutId;
    if (saved && LAYOUTS[saved]) {
      setLayoutId(saved);
      document.documentElement.setAttribute('data-layout', saved);
    } else {
      document.documentElement.setAttribute('data-layout', 'corporate');
    }
  }, []);

  const handleSetLayout = (id: LayoutId) => {
    if (!LAYOUTS[id]) return;
    setLayoutId(id);
    document.documentElement.setAttribute('data-layout', id);
    try {
      localStorage.setItem('ww_construction_layout', id);
    } catch {
      // ignore
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        currentLayout: layoutId,
        setLayout: handleSetLayout,
        layouts: Object.values(LAYOUTS),
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutMode() {
  const context = useContext(LayoutContext);
  if (!context) {
    return {
      currentLayout: 'corporate' as LayoutId,
      setLayout: () => {},
      layouts: Object.values(LAYOUTS),
    };
  }
  return context;
}
