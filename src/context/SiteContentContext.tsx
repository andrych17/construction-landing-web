'use client';

import React, { createContext, useContext, useMemo } from 'react';
import type { SiteData } from '@/lib/content';

type SiteContentValue = SiteData & {
  waLink: (message: string) => string;
};

const SiteContentContext = createContext<SiteContentValue | null>(null);

export function SiteContentProvider({ data, children }: { data: SiteData; children: React.ReactNode }) {
  const value = useMemo<SiteContentValue>(
    () => ({
      ...data,
      waLink: (message: string) =>
        data.contact.whatsapp ? `https://wa.me/${data.contact.whatsapp}?text=${encodeURIComponent(message)}` : '#',
    }),
    [data]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContentValue {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent harus dipakai di dalam <SiteContentProvider>');
  }
  return context;
}
