'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export type LayoutId = 'barcway' | 'fusion' | 'corporate' | 'monograph' | 'blueprint' | 'editorial' | 'luxury';

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  subtitle: string;
  inspiration: string;
  themeColor: string;
  description: string;
}

export const LAYOUTS: Record<LayoutId, LayoutConfig> = {
  barcway: {
    id: 'barcway',
    name: '01. WW.CONS (Barcway Baseline Flagship)',
    subtitle: 'Architecture · Interior · General Contractor',
    inspiration: 'Bold Artisan Living & Monolithic Luxury (barcway.com)',
    themeColor: '#C29B38',
    description: 'Estetika autentik barcway.com untuk ww.cons: Baskervville serif, headline berputar dinamis, filosofi Inside Out / Balanced Contrast / Narrative Space, dan swiper projects.',
  },
  fusion: {
    id: 'fusion',
    name: '02. Centra × Barcway Fusion',
    subtitle: 'Contractor Provenance × Bold Artisan Luxury',
    inspiration: 'Centra Arya Loka × Barcway Design',
    themeColor: '#D97706',
    description: 'Sinergi kekuatan kontraktor umum Surabaya berstandar SNI dengan estetika arsitektur gelap monolitik kelas dunia Barcway.',
  },
  corporate: {
    id: 'corporate',
    name: '03. Corporate General Contractor',
    subtitle: 'Turner Construction & Skanska Style',
    inspiration: 'Kontraktor Korporat & K3 Fisik',
    themeColor: '#EA580C',
    description: 'Tata letak terstruktur, datum strip metrik, standar K3 ketat, dan indeks spesifikasi rekayasa sipil komersial.',
  },
  monograph: {
    id: 'monograph',
    name: '04. Architectural Monograph',
    subtitle: 'Foster + Partners & Swiss Minimalist',
    inspiration: 'Monograf Arsitektur & Tipografi Swiss',
    themeColor: '#0F172A',
    description: 'Ruang putih lapang, tipografi grotesk monumental, kisi asimetris, galeri visual luas, dan estetika atelier.',
  },
  blueprint: {
    id: 'blueprint',
    name: '05. Blueprint Engineering Matrix',
    subtitle: 'SOM & ARUP Technical Spec Sheet',
    inspiration: 'Cetak Biru Teknis & Lembar Spesifikasi CAD',
    themeColor: '#2563EB',
    description: 'Penggaris grid CAD, lembar tabel WBS rekayasa, toleransi milimeter, dan data inspeksi pengawasan lapangan.',
  },
  editorial: {
    id: 'editorial',
    name: '06. Editorial Design Magazine',
    subtitle: 'Architectural Digest & Monocle Style',
    inspiration: 'Majalah Desain Arsitektur & Jurnal Lapangan',
    themeColor: '#B45309',
    description: 'Nuansa kertas hangat, tajuk berita editorial, esai foto berselang-seling, dan ulasan catatan lapangan WW Notes.',
  },
  luxury: {
    id: 'luxury',
    name: '07. Bespoke Luxury & Craftsmanship',
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

function subscribeLayout(callback: () => void) {
  window.addEventListener('ww-layout-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('ww-layout-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getLayoutSnapshot(): LayoutId {
  try {
    const saved = localStorage.getItem('ww_construction_layout') as LayoutId;
    if (saved && LAYOUTS[saved]) return saved;
  } catch {
    // ignore
  }
  return 'barcway';
}

function getLayoutServerSnapshot(): LayoutId {
  return 'barcway';
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const layoutId = useSyncExternalStore(
    subscribeLayout,
    getLayoutSnapshot,
    getLayoutServerSnapshot
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-layout', layoutId);
  }, [layoutId]);

  const handleSetLayout = (id: LayoutId) => {
    if (!LAYOUTS[id]) return;
    try {
      localStorage.setItem('ww_construction_layout', id);
      window.dispatchEvent(new Event('ww-layout-change'));
    } catch {
      // ignore
    }
    document.documentElement.setAttribute('data-layout', id);
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
      currentLayout: 'barcway' as LayoutId,
      setLayout: () => {},
      layouts: Object.values(LAYOUTS),
    };
  }
  return context;
}
