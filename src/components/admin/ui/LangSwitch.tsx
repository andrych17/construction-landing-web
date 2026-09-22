'use client';

import React from 'react';

/** Small pill toggle so bilingual fields can share one slot instead of stacking ID + EN inputs. */
export function LangSwitch({
  value,
  onChange,
  idLabel = 'ID',
  enLabel = 'EN',
}: {
  value: 'id' | 'en';
  onChange: (lang: 'id' | 'en') => void;
  idLabel?: string;
  enLabel?: string;
}) {
  return (
    <div className="inline-flex p-0.5 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
      {(['id', 'en'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors cursor-pointer ${
            value === lang
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {lang === 'id' ? idLabel : enLabel}
        </button>
      ))}
    </div>
  );
}
