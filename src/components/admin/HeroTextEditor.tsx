'use client';

import React, { useState } from 'react';
import { LuSparkles, LuShieldCheck, LuScale, LuClock, LuCircleCheck } from 'react-icons/lu';
import { Field } from '@/components/admin/ui/Field';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { LangSwitch } from '@/components/admin/ui/LangSwitch';
import { DEFAULT_HERO_TEXT, type HeroTextContent, type HeroValueCard } from '@/data/siteData';
import type { JsonValue } from '@/components/admin/JsonField';

const CARD_ICONS = [LuShieldCheck, LuScale, LuClock, LuCircleCheck];

export function HeroTextEditor({
  value,
  onChange,
}: {
  value: JsonValue;
  onChange: (next: JsonValue) => void;
}) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const data: HeroTextContent = {
    ...DEFAULT_HERO_TEXT,
    ...(typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Partial<HeroTextContent>) : {}),
  };

  const patch = (fields: Partial<HeroTextContent>) => {
    onChange({ ...data, ...fields } as unknown as JsonValue);
  };

  const updateCard = (index: number, patchCard: Partial<HeroValueCard>) => {
    const cards = [...(data.valueCards || DEFAULT_HERO_TEXT.valueCards)];
    cards[index] = { ...cards[index], ...patchCard };
    patch({ valueCards: cards });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Bahasa yang Diedit</span>
          <p className="text-xs text-slate-500">Pilih bahasa untuk mengedit teks Beranda (Hero & Keunggulan)</p>
        </div>
        <LangSwitch value={lang} onChange={setLang} idLabel="Bahasa Indonesia" enLabel="English" />
      </div>

      {/* Hero Headline & Intro Card */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <LuSparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Judul Utama & Narasi Hero ({lang.toUpperCase()})
            </h2>
            <p className="text-xs text-slate-500">
              Teks headline 3 baris di halaman beranda serta paragraf pengantar di bawahnya.
            </p>
          </div>
        </header>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label={`Headline Baris 1 (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.line1Id : data.line1En}
                onChange={(e) => patch(lang === 'id' ? { line1Id: e.target.value } : { line1En: e.target.value })}
                placeholder={lang === 'id' ? 'RANCANG BANGUN' : 'DESIGN & BUILD'}
              />
            </Field>
            <Field label={`Headline Baris 2 (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.line2Id : data.line2En}
                onChange={(e) => patch(lang === 'id' ? { line2Id: e.target.value } : { line2En: e.target.value })}
                placeholder={lang === 'id' ? 'RESIDENSIAL & KOMERSIAL,' : 'RESIDENTIAL & COMMERCIAL,'}
              />
            </Field>
            <Field label={`Headline Baris 3 (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.line3Id : data.line3En}
                onChange={(e) => patch(lang === 'id' ? { line3Id: e.target.value } : { line3En: e.target.value })}
                placeholder={lang === 'id' ? 'BERKUALITAS & TRANSPARAN.' : 'HONEST & ENDURING.'}
              />
            </Field>
          </div>

          <Field label={`Paragraf Pengantar Hero (${lang.toUpperCase()})`}>
            <Textarea
              rows={3}
              value={lang === 'id' ? data.introId : data.introEn}
              onChange={(e) => patch(lang === 'id' ? { introId: e.target.value } : { introEn: e.target.value })}
              placeholder={lang === 'id' ? 'Kontraktor umum dan studio rancang bangun di Surabaya...' : 'A general contractor and design-build studio in Surabaya...'}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <Field label={`Label Tombol Konsultasi (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.ctaConsultId : data.ctaConsultEn}
                onChange={(e) => patch(lang === 'id' ? { ctaConsultId: e.target.value } : { ctaConsultEn: e.target.value })}
                placeholder={lang === 'id' ? 'KONSULTASI RANCANG BANGUN' : 'CONSULT DESIGN & BUILD'}
              />
            </Field>
            <Field label={`Label Tombol Portofolio (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.ctaPortfolioId : data.ctaPortfolioEn}
                onChange={(e) => patch(lang === 'id' ? { ctaPortfolioId: e.target.value } : { ctaPortfolioEn: e.target.value })}
                placeholder={lang === 'id' ? 'LIHAT PORTOFOLIO PROYEK' : 'VIEW PROJECT PORTFOLIO'}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* 4 Value Proposition Cards */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <LuShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              4 Nilai Keunggulan / Value Proposition Cards ({lang.toUpperCase()})
            </h2>
            <p className="text-xs text-slate-500">
              4 kotak keunggulan yang tampil di bagian bawah hero (SNI Structure, No Hidden Cost, On Time, Quality Control).
            </p>
          </div>
        </header>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          {(data.valueCards || DEFAULT_HERO_TEXT.valueCards).map((card, idx) => {
            const Icon = CARD_ICONS[idx % CARD_ICONS.length];
            return (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <Icon className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-slate-800">Kartu Keunggulan 0{idx + 1}</span>
                </div>
                <Field label="Judul Kartu">
                  <Input
                    value={lang === 'id' ? card.titleId : card.titleEn}
                    onChange={(e) =>
                      updateCard(idx, lang === 'id' ? { titleId: e.target.value } : { titleEn: e.target.value })
                    }
                  />
                </Field>
                <Field label="Sub-Judul / Badge Kategori">
                  <Input
                    value={lang === 'id' ? card.badgeId : card.badgeEn}
                    onChange={(e) =>
                      updateCard(idx, lang === 'id' ? { badgeId: e.target.value } : { badgeEn: e.target.value })
                    }
                  />
                </Field>
                <Field label="Deskripsi Singkat">
                  <Textarea
                    rows={2}
                    value={lang === 'id' ? card.descId : card.descEn}
                    onChange={(e) =>
                      updateCard(idx, lang === 'id' ? { descId: e.target.value } : { descEn: e.target.value })
                    }
                  />
                </Field>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
