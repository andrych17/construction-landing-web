'use client';

import React, { useState } from 'react';
import { LuBookOpen, LuHouse, LuFileText } from 'react-icons/lu';
import { Field } from '@/components/admin/ui/Field';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { LangSwitch } from '@/components/admin/ui/LangSwitch';
import { DEFAULT_ABOUT_CONTENT, type AboutContent } from '@/data/siteData';
import type { JsonValue } from '@/components/admin/JsonField';

export function AboutEditor({
  value,
  onChange,
}: {
  value: JsonValue;
  onChange: (next: JsonValue) => void;
}) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const data: AboutContent = {
    ...DEFAULT_ABOUT_CONTENT,
    ...(typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Partial<AboutContent>) : {}),
  };

  const patch = (fields: Partial<AboutContent>) => {
    onChange({ ...data, ...fields } as unknown as JsonValue);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Bahasa yang Diedit</span>
          <p className="text-xs text-slate-500">Pilih bahasa untuk mengedit teks profil Tentang Kami</p>
        </div>
        <LangSwitch value={lang} onChange={setLang} idLabel="Bahasa Indonesia" enLabel="English" />
      </div>

      {/* Homepage About Us Section */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <LuHouse className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Bagian Tentang Kami di Halaman Beranda ({lang.toUpperCase()})
            </h2>
            <p className="text-xs text-slate-500">
              Teks profil studio singkat yang muncul di homepage tepat setelah section Hero.
            </p>
          </div>
        </header>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={`Tagline Kecil (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.homeTaglineId : data.homeTaglineEn}
                onChange={(e) => patch(lang === 'id' ? { homeTaglineId: e.target.value } : { homeTaglineEn: e.target.value })}
                placeholder={lang === 'id' ? 'TENTANG STUDIO' : 'ABOUT STUDIO'}
              />
            </Field>
            <Field label={`Judul Bagian (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? data.homeTitleId : data.homeTitleEn}
                onChange={(e) => patch(lang === 'id' ? { homeTitleId: e.target.value } : { homeTitleEn: e.target.value })}
                placeholder={lang === 'id' ? 'Arsitektur Presisi & Ketahanan Struktur' : 'Precision Architecture & Structural Integrity'}
              />
            </Field>
          </div>

          <Field label={`Paragraf Utama Profil Perusahaan (${lang.toUpperCase()})`}>
            <Textarea
              rows={4}
              value={lang === 'id' ? data.homeParagraphId : data.homeParagraphEn}
              onChange={(e) => patch(lang === 'id' ? { homeParagraphId: e.target.value } : { homeParagraphEn: e.target.value })}
              placeholder={lang === 'id' ? 'Wonderful Works Construction adalah studio design & build di Surabaya...' : 'Wonderful Works Construction is a design-build studio in Surabaya...'}
            />
          </Field>

          <Field label={`Teks Tautan ke Halaman About (${lang.toUpperCase()})`}>
            <Input
              value={lang === 'id' ? data.homeCtaId : data.homeCtaEn}
              onChange={(e) => patch(lang === 'id' ? { homeCtaId: e.target.value } : { homeCtaEn: e.target.value })}
              placeholder={lang === 'id' ? 'Tentang Studio' : 'About Studio'}
            />
          </Field>
        </div>
      </section>

      {/* About Page Full Narrative */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <LuFileText className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Narasi Naratif di Halaman Tentang Kami (/about) ({lang.toUpperCase()})
            </h2>
            <p className="text-xs text-slate-500">
              Teks penjelasan mendalam mengenai integrasi rancang bangun, disiplin insinyur, dan komitmen tim.
            </p>
          </div>
        </header>

        <div className="p-5 space-y-4">
          <Field label={`Kalimat Pernyataan Utama (${lang.toUpperCase()})`}>
            <Textarea
              rows={2}
              value={lang === 'id' ? data.narrativeLeadId : data.narrativeLeadEn}
              onChange={(e) => patch(lang === 'id' ? { narrativeLeadId: e.target.value } : { narrativeLeadEn: e.target.value })}
              placeholder={lang === 'id' ? 'Wonderful Works Construction adalah studio rancang bangun untuk hunian tinggal...' : 'Wonderful Works Construction is a design-build studio for residential...'}
            />
          </Field>

          <Field label={`Paragraf Penjelas (${lang.toUpperCase()})`}>
            <Textarea
              rows={3}
              value={lang === 'id' ? data.narrativeBodyId : data.narrativeBodyEn}
              onChange={(e) => patch(lang === 'id' ? { narrativeBodyId: e.target.value } : { narrativeBodyEn: e.target.value })}
              placeholder={lang === 'id' ? 'Desain arsitektur, interior, dan konstruksi dikerjakan oleh satu tim...' : 'Architecture, interiors, and construction are handled by one team...'}
            />
          </Field>
        </div>
      </section>

      {/* Philosophy Header Section */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
            <LuBookOpen className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Header Bagian Filosofi Desain ({lang.toUpperCase()})
            </h2>
            <p className="text-xs text-slate-500">
              Judul dan sub-judul pengantar untuk daftar filosofi desain di halaman /about.
            </p>
          </div>
        </header>

        <div className="p-5 space-y-4">
          <Field label={`Judul Filosofi (${lang.toUpperCase()})`}>
            <Input
              value={lang === 'id' ? data.philosophyTitleId : data.philosophyTitleEn}
              onChange={(e) => patch(lang === 'id' ? { philosophyTitleId: e.target.value } : { philosophyTitleEn: e.target.value })}
              placeholder={lang === 'id' ? 'Filosofi Desain Kami' : 'Our Design Philosophy'}
            />
          </Field>

          <Field label={`Sub-judul Pengantar (${lang.toUpperCase()})`}>
            <Textarea
              rows={2}
              value={lang === 'id' ? data.philosophySubtitleId : data.philosophySubtitleEn}
              onChange={(e) => patch(lang === 'id' ? { philosophySubtitleId: e.target.value } : { philosophySubtitleEn: e.target.value })}
              placeholder={lang === 'id' ? 'Tiga prinsip yang kami pakai saat menggambar...' : 'Three principles we apply when drawing...'}
            />
          </Field>
        </div>
      </section>
    </div>
  );
}
