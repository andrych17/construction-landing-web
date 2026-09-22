'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JsonField, type JsonValue } from '@/components/admin/JsonField';
import { Button } from '@/components/admin/ui/Button';

export function SectionEditor({
  sectionKey,
  label,
  initialValue,
}: {
  sectionKey: string;
  label: string;
  initialValue: JsonValue;
}) {
  const router = useRouter();
  const [value, setValue] = useState<JsonValue>(initialValue);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setStatus('idle');
    try {
      const res = await fetch(`/api/admin/content/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Gagal menyimpan.');
      }
      setStatus('saved');
      router.refresh();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Gagal menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  const isArray = Array.isArray(value);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 bg-slate-50/95 backdrop-blur-sm -mx-6 px-6 py-4 border-b border-slate-200 z-10">
        <div>
          <h1 className="text-lg font-bold text-slate-900">{label}</h1>
          {status === 'saved' && <p className="text-xs text-emerald-600 font-medium">Tersimpan.</p>}
          {status === 'error' && <p className="text-xs text-red-600 font-medium">{errorMessage}</p>}
        </div>
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
        </Button>
      </div>

      {isArray ? (
        <JsonField fieldKey={label} value={value} onChange={setValue} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {value && typeof value === 'object' && !Array.isArray(value)
            ? Object.entries(value).map(([k, v]) => (
                <div key={k} className={Array.isArray(v) || (v && typeof v === 'object') ? 'sm:col-span-2' : ''}>
                  <JsonField
                    fieldKey={k}
                    value={v}
                    onChange={(next) => setValue({ ...(value as Record<string, JsonValue>), [k]: next })}
                  />
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
}
