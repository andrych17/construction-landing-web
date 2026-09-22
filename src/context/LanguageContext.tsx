'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (idText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'id',
  setLang: () => {},
  t: (idText: string) => idText,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default adalah bahasa Indonesia ('id') sesuai kebutuhan user
  const [lang, setLangState] = useState<Language>('id');

  useEffect(() => {
    // Sinkronisasi dengan localStorage bila pengunjung pernah memilih bahasa
    const saved = localStorage.getItem('ww_cons_lang') as Language | null;
    if (saved === 'id' || saved === 'en') {
      setLangState(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = 'id';
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ww_cons_lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  const t = (idText: string, enText: string) => {
    return lang === 'en' ? enText : idText;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: 'id' as Language,
      setLang: () => {},
      t: (idText: string) => idText,
    };
  }
  return context;
}
