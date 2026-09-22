'use client';

import React, { useState } from 'react';
import { Field } from '@/components/admin/ui/Field';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { Button } from '@/components/admin/ui/Button';
import { ImageDropzone } from '@/components/admin/ui/ImageDropzone';
import { LangSwitch } from '@/components/admin/ui/LangSwitch';

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function humanLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

const IMAGE_FIELD_RE = /image|img|photo|avatar|poster|icon|thumbnail/i;

/** Plain string values that look like filepaths get replaced with the file input entirely — no editable text path. */
function isImageField(key: string, value: JsonValue): boolean {
  return typeof value === 'string' && IMAGE_FIELD_RE.test(key);
}

function isPairableValue(value: JsonValue): value is string | string[] {
  if (typeof value === 'string') return true;
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

type GroupedEntry =
  | { kind: 'single'; key: string; value: JsonValue }
  | { kind: 'pair'; baseKey: string; idKey: string; enKey: string; idValue: string | string[]; enValue: string | string[] };

/** Groups sibling `x` / `xEn` keys (desc/descEn, bio/bioEn, …) so they render as one field with a language toggle instead of two stacked fields. */
function groupBilingual(obj: Record<string, JsonValue>): GroupedEntry[] {
  const consumed = new Set<string>();
  const result: GroupedEntry[] = [];
  for (const key of Object.keys(obj)) {
    if (consumed.has(key)) continue;
    if (key.endsWith('En')) {
      result.push({ kind: 'single', key, value: obj[key] });
      consumed.add(key);
      continue;
    }
    const enKey = `${key}En`;
    const value = obj[key];
    const enValue = obj[enKey];
    if (enKey in obj && !consumed.has(enKey) && isPairableValue(value) && isPairableValue(enValue) && !isImageField(key, value)) {
      result.push({ kind: 'pair', baseKey: key, idKey: key, enKey, idValue: value, enValue });
      consumed.add(key);
      consumed.add(enKey);
    } else {
      result.push({ kind: 'single', key, value });
      consumed.add(key);
    }
  }
  return result;
}

function BilingualPairField({
  baseKey,
  idValue,
  enValue,
  onChangeId,
  onChangeEn,
}: {
  baseKey: string;
  idValue: string | string[];
  enValue: string | string[];
  onChangeId: (v: string | string[]) => void;
  onChangeEn: (v: string | string[]) => void;
}) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const label = humanLabel(baseKey);
  const value = lang === 'id' ? idValue : enValue;
  const onChangeValue = lang === 'id' ? onChangeId : onChangeEn;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
        <LangSwitch value={lang} onChange={setLang} />
      </div>
      {Array.isArray(value) ? (
        <Textarea
          value={value.join('\n')}
          onChange={(e) => onChangeValue(e.target.value.split('\n').map((l) => l.trim()).filter(Boolean))}
        />
      ) : value.length > 70 || baseKey.toLowerCase().includes('desc') || baseKey.toLowerCase().includes('bio') ? (
        <Textarea value={value} onChange={(e) => onChangeValue(e.target.value)} />
      ) : (
        <Input type="text" value={value} onChange={(e) => onChangeValue(e.target.value)} />
      )}
    </div>
  );
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
    if (isImageField(fieldKey, value)) {
      return (
        <div>
          <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</span>
          <ImageDropzone value={value} onChange={(url) => onChange(url)} />
        </div>
      );
    }
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
                  {groupBilingual(item).map((entry) => {
                    if (entry.kind === 'pair') {
                      return (
                        <div key={entry.baseKey} className="sm:col-span-2">
                          <BilingualPairField
                            baseKey={entry.baseKey}
                            idValue={entry.idValue}
                            enValue={entry.enValue}
                            onChangeId={(next) => {
                              const copy = [...value];
                              copy[idx] = { ...item, [entry.idKey]: next };
                              onChange(copy);
                            }}
                            onChangeEn={(next) => {
                              const copy = [...value];
                              copy[idx] = { ...item, [entry.enKey]: next };
                              onChange(copy);
                            }}
                          />
                        </div>
                      );
                    }
                    const { key: k, value: v } = entry;
                    return (
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
                    );
                  })}
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
          {groupBilingual(value as Record<string, JsonValue>).map((entry) => {
            if (entry.kind === 'pair') {
              return (
                <div key={entry.baseKey} className="sm:col-span-2">
                  <BilingualPairField
                    baseKey={entry.baseKey}
                    idValue={entry.idValue}
                    enValue={entry.enValue}
                    onChangeId={(next) => onChange({ ...value, [entry.idKey]: next })}
                    onChangeEn={(next) => onChange({ ...value, [entry.enKey]: next })}
                  />
                </div>
              );
            }
            const { key: k, value: v } = entry;
            return (
              <div key={k} className={Array.isArray(v) || (v && typeof v === 'object') ? 'sm:col-span-2' : ''}>
                <JsonField
                  fieldKey={k}
                  value={v}
                  onChange={(next) => onChange({ ...value, [k]: next })}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
