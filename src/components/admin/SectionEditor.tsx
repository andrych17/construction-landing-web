'use client';

import React, { useEffect, useState } from 'react';
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
  const [savedValue, setSavedValue] = useState<JsonValue>(initialValue);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const isDirty = JSON.stringify(value) !== JSON.stringify(savedValue);

  // Header bar lives inside AdminShell's own sticky top bar — a second sticky
  // element at the same top offset would render behind it. Save lives in the
  // floating bottom bar instead, mirroring HeroMediaEditor's pattern.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 120);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saving && isDirty) handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving, isDirty, value]);

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
      setSavedValue(value);
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
    <div className="space-y-6 pb-28">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{label}</h1>
        {status === 'saved' && <p className="text-xs text-emerald-600 font-medium">Tersimpan.</p>}
        {status === 'error' && <p className="text-xs text-red-600 font-medium">{errorMessage}</p>}
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

      {/* Floating bottom save bar — stays clear of AdminShell's own sticky top header. */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl transition-all duration-300 ${
          isScrolled || isDirty ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-neutral-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{label}</span>
              {isDirty ? (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-400 text-black rounded-md uppercase">
                  Belum Disimpan
                </span>
              ) : (
                <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded-md uppercase">
                  Tersimpan
                </span>
              )}
            </div>
          </div>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            className={
              isDirty
                ? 'bg-amber-400 hover:bg-amber-300 text-black font-bold shadow-md shadow-amber-400/20 px-4 py-2 text-xs'
                : 'opacity-60 px-4 py-2 text-xs'
            }
          >
            {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
          </Button>
        </div>
      </div>
    </div>
  );
}
