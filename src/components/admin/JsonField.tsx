'use client';

import React from 'react';
import { Field } from '@/components/admin/ui/Field';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { Button } from '@/components/admin/ui/Button';

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function humanLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

/** Bentuk kosong dengan struktur sama — dipakai saat menambah item baru ke array of object. */
export function emptyLike(value: JsonValue): JsonValue {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, emptyLike(v)]));
  }
  return '';
}

function isStringArray(value: JsonValue[]): boolean {
  return value.every((v) => typeof v === 'string');
}

function isObjectArray(value: JsonValue[]): value is Record<string, JsonValue>[] {
  return value.length > 0 && typeof value[0] === 'object' && value[0] !== null && !Array.isArray(value[0]);
}

/** Form generik yang dibentuk otomatis dari bentuk JSON — dipakai untuk semua section teks CMS. */
export function JsonField({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string;
  value: JsonValue;
  onChange: (next: JsonValue) => void;
}) {
  const label = humanLabel(fieldKey);

  if (typeof value === 'string') {
    const long = value.length > 70 || fieldKey.toLowerCase().includes('desc') || fieldKey.toLowerCase().includes('bio');
    return (
      <Field label={label}>
        {long ? (
          <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
        ) : (
          <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </Field>
    );
  }

  if (typeof value === 'number') {
    return (
      <Field label={label}>
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
      </Field>
    );
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="font-semibold uppercase tracking-wide text-xs text-slate-500">{label}</span>
      </label>
    );
  }

  if (Array.isArray(value)) {
    if (value.length === 0 || isStringArray(value)) {
      const lines = (value as string[]).join('\n');
      return (
        <Field label={label} hint="satu baris = satu item">
          <Textarea
            value={lines}
            onChange={(e) => onChange(e.target.value.split('\n').map((l) => l.trim()).filter(Boolean))}
          />
        </Field>
      );
    }

    if (isObjectArray(value)) {
      return (
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{label}</span>
          <div className="space-y-4">
            {value.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => onChange(value.filter((_, i) => i !== idx))}
                  >
                    Hapus
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(item).map(([k, v]) => (
                    <div key={k} className={typeof v === 'string' && v.length > 70 ? 'sm:col-span-2' : ''}>
                      <JsonField
                        fieldKey={k}
                        value={v}
                        onChange={(next) => {
                          const copy = [...value];
                          copy[idx] = { ...item, [k]: next };
                          onChange(copy);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange([...value, emptyLike(value[0])])}
            className="mt-3 border-dashed"
          >
            + Tambah Item
          </Button>
        </div>
      );
    }
  }

  if (value && typeof value === 'object') {
    return (
      <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{label}</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className={Array.isArray(v) || (v && typeof v === 'object') ? 'sm:col-span-2' : ''}>
              <JsonField
                fieldKey={k}
                value={v}
                onChange={(next) => onChange({ ...value, [k]: next })}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
