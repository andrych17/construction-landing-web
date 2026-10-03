'use client';

import React, { useState } from 'react';
import { LuLayers, LuBriefcase, LuPhoneCall, LuUsers } from 'react-icons/lu';
import { Field } from '@/components/admin/ui/Field';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { LangSwitch } from '@/components/admin/ui/LangSwitch';
import { DEFAULT_PAGE_HEROES, type PageHeroesContent, type PageHeroItem } from '@/data/siteData';
import type { JsonValue } from '@/components/admin/JsonField';

export function PageHeroesEditor({
  value,
  onChange,
}: {
  value: JsonValue;
  onChange: (next: JsonValue) => void;
}) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const data: PageHeroesContent = {
    ...DEFAULT_PAGE_HEROES,
    ...(typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Partial<PageHeroesContent>) : {}),
  };

  const updatePage = (key: keyof PageHeroesContent, patchItem: Partial<PageHeroItem>) => {
    onChange({
      ...data,
      [key]: { ...data[key], ...patchItem },
    } as unknown as JsonValue);
  };

  const pages = [
    {
      key: 'about' as const,
      label: 'Halaman Tentang Kami (/about)',
      icon: LuUsers,
      hint: 'Judul besar dan pengantar di bagian atas halaman About Us',
    },
    {
      key: 'services' as const,
      label: 'Halaman Layanan (/services)',
      icon: LuLayers,
      hint: 'Judul besar dan pengantar di bagian atas halaman Services',
    },
    {
      key: 'projects' as const,
      label: 'Halaman Portofolio Proyek (/projects)',
      icon: LuBriefcase,
      hint: 'Judul besar dan pengantar di bagian atas katalog Proyek',
    },
    {
      key: 'contact' as const,
      label: 'Halaman Kontak & Konsultasi (/contact)',
      icon: LuPhoneCall,
      hint: 'Judul besar dan pengantar di samping formulir konsultasi',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Bahasa yang Diedit</span>
          <p className="text-xs text-slate-500">Pilih bahasa untuk mengedit judul dan pengantar (hero) halaman dalam</p>
        </div>
        <LangSwitch value={lang} onChange={setLang} idLabel="Bahasa Indonesia" enLabel="English" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pages.map((p) => {
          const item = data[p.key] || DEFAULT_PAGE_HEROES[p.key];
          const Icon = p.icon;
          return (
            <section key={p.key} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col justify-between">
              <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">{p.label}</h2>
                  <p className="text-xs text-slate-500">{p.hint}</p>
                </div>
              </header>

              <div className="p-5 space-y-4 flex-1">
                <Field label={`Judul Halaman (${lang.toUpperCase()})`}>
                  <Input
                    value={lang === 'id' ? item.titleId : item.titleEn}
                    onChange={(e) =>
                      updatePage(p.key, lang === 'id' ? { titleId: e.target.value } : { titleEn: e.target.value })
                    }
                  />
                </Field>

                <Field label={`Teks Pengantar / Lede (${lang.toUpperCase()})`}>
                  <Textarea
                    rows={3}
                    value={lang === 'id' ? item.ledeId : item.ledeEn}
                    onChange={(e) =>
                      updatePage(p.key, lang === 'id' ? { ledeId: e.target.value } : { ledeEn: e.target.value })
                    }
                  />
                </Field>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
