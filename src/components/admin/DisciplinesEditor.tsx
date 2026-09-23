'use client';

import React from 'react';
import { LuPlus, LuTrash2 } from 'react-icons/lu';
import { Input } from '@/components/admin/ui/Input';
import type { JsonValue } from '@/components/admin/JsonField';

type Disciplines = { id?: string[]; en?: string[] };

function asDisciplines(value: JsonValue): { id: string[]; en: string[] } {
  const raw = value && typeof value === 'object' && !Array.isArray(value) ? (value as Disciplines) : {};
  const id = Array.isArray(raw.id) ? raw.id.map(String) : [];
  const en = Array.isArray(raw.en) ? raw.en.map(String) : [];
  const count = Math.max(id.length, en.length, 1);
  return {
    id: Array.from({ length: count }, (_, i) => id[i] ?? ''),
    en: Array.from({ length: count }, (_, i) => en[i] ?? ''),
  };
}

export function DisciplinesEditor({ value, onChange }: { value: JsonValue; onChange: (next: JsonValue) => void }) {
  const rows = asDisciplines(value);
  const write = (id: string[], en: string[]) => onChange({ ...(typeof value === 'object' && value && !Array.isArray(value) ? value : {}), id, en });

  const setCell = (side: 'id' | 'en', index: number, text: string) => {
    const next = { id: [...rows.id], en: [...rows.en] };
    next[side][index] = text;
    write(next.id, next.en);
  };

  const remove = (index: number) => {
    if (rows.id.length <= 1) return;
    write(rows.id.filter((_, i) => i !== index), rows.en.filter((_, i) => i !== index));
  };

  const add = () => write([...rows.id, ''], [...rows.en, '']);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 bg-slate-50 px-6 py-5">
        <h2 className="text-base font-semibold text-slate-900">Daftar disiplin studio</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
          Satu baris satu disiplin. Kiri bahasa Indonesia, kanan bahasa Inggris. Urutan keduanya harus sejajar.
        </p>
      </header>

      <div className="hidden border-b border-slate-100 px-6 py-3 lg:grid lg:grid-cols-[1fr_1fr_44px] lg:gap-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Indonesia</span>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">English</span>
        <span className="sr-only">Hapus</span>
      </div>

      <ul className="divide-y divide-slate-100">
        {rows.id.map((idText, index) => (
          <li key={index} className="grid grid-cols-1 gap-3 px-6 py-4 lg:grid-cols-[1fr_1fr_44px] lg:items-center lg:gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800 lg:sr-only">Indonesia {index + 1}</span>
              <Input
                value={idText}
                onChange={(e) => setCell('id', index, e.target.value)}
                className="min-h-[52px] px-4 text-base"
                aria-label={`Disiplin Indonesia ${index + 1}`}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800 lg:sr-only">English {index + 1}</span>
              <Input
                value={rows.en[index] ?? ''}
                onChange={(e) => setCell('en', index, e.target.value)}
                className="min-h-[52px] px-4 text-base"
                aria-label={`Disiplin English ${index + 1}`}
              />
            </label>
            <button
              type="button"
              onClick={() => remove(index)}
              disabled={rows.id.length <= 1}
              aria-label={`Hapus baris ${index + 1}`}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <LuTrash2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <div className="border-t border-slate-100 px-6 py-4">
        <button
          type="button"
          onClick={add}
          className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-amber-400 hover:bg-amber-50 hover:text-slate-900"
        >
          <LuPlus className="h-4 w-4" aria-hidden="true" />
          Tambah disiplin
        </button>
      </div>
    </section>
  );
}
