'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export type ThemeId = 'orange' | 'blue' | 'emerald' | 'slate' | 'amber';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  primary: string;
  hover: string;
  light: string;
  border: string;
  badge: string;
  description: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  orange: {
    id: 'orange',
    name: 'Safety Orange',
    subtitle: 'Turner Construction · K3 Industrial',
    primary: '#EA580C',
    hover: '#C2410C',
    light: '#FFF7ED',
    border: '#FED7AA',
    badge: 'Standard Industri K3',
    description: 'Aksen oranye keselamatan kerja & baja struktural berat khas Turner Construction.',
  },
  blue: {
    id: 'blue',
    name: 'Blueprint Azure',
    subtitle: 'Skanska · Architectural Engineering',
    primary: '#2563EB',
    hover: '#1D4ED8',
    light: '#EFF6FF',
    border: '#BFDBFE',
    badge: 'Cetak Biru Rekayasa',
    description: 'Warna biru presisi cetak biru arsitektur, kalkulasi sipil, dan kredibilitas korporat.',
  },
  emerald: {
    id: 'emerald',
    name: 'Verdant Green',
    subtitle: 'Green Building · Sustainable Timber',
    primary: '#059669',
    hover: '#047857',
    light: '#ECFDF5',
    border: '#A7F3D0',
    badge: 'Arsitektur Berkelanjutan',
    description: 'Standar bangunan hijau ramah lingkungan, efisiensi energi, dan Greenship Indonesia.',
  },
  slate: {
    id: 'slate',
    name: 'Monolithic Steel',
    subtitle: 'Foster + Partners · Minimalist Monograph',
    primary: '#0F172A',
    hover: '#334155',
    light: '#F1F5F9',
    border: '#CBD5E1',
    badge: 'Monokrom Minimalis',
    description: 'Monokrom modern ala monograph studio arsitektur Swiss, baja hitam, dan beton ekspos.',
  },
  amber: {
    id: 'amber',
    name: 'Terracotta Clay',
    subtitle: 'Artisanal Masonry · Warm Earth',
    primary: '#B45309',
    hover: '#92400E',
    light: '#FFFBEB',
    border: '#FDE68A',
    badge: 'Bata Terakota Alami',
    description: 'Nuansa hangat bata terakota tropis, material tanah liat bakar, dan kerajinan artisanal.',
  },
};

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function subscribeTheme(callback: () => void) {
  window.addEventListener('ww-theme-change', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('ww-theme-change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getThemeSnapshot(): ThemeId {
  try {
    const saved = localStorage.getItem('ww_construction_theme') as ThemeId;
    if (saved && THEMES[saved]) return saved;
  } catch {
    // ignore
  }
  return 'orange';
}

function getThemeServerSnapshot(): ThemeId {
  return 'orange';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeId = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
  }, [themeId]);

  const handleSetTheme = (id: ThemeId) => {
    if (!THEMES[id]) return;
    try {
      localStorage.setItem('ww_construction_theme', id);
      window.dispatchEvent(new Event('ww-theme-change'));
    } catch {
      // ignore storage errors
    }
    document.documentElement.setAttribute('data-theme', id);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: THEMES[themeId] || THEMES.orange,
        setTheme: handleSetTheme,
        themes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      currentTheme: THEMES.orange,
      setTheme: () => {},
      themes: Object.values(THEMES),
    };
  }
  return context;
}
