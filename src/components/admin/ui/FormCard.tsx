'use client';

import React from 'react';
import { Button } from './Button';

type Props = {
  title?: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage?: string;
  successMessage?: string;
  submitLabel?: string;
  /** Hide submit + disable fields (view-only). */
  readOnly?: boolean;
  children: React.ReactNode;
};

export function FormCard({
  title,
  description,
  onSubmit,
  isPending,
  isError,
  isSuccess,
  errorMessage = 'Gagal menyimpan data.',
  successMessage = 'Data tersimpan.',
  submitLabel = 'Simpan',
  readOnly = false,
  children,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        if (readOnly) {
          e.preventDefault();
          return;
        }
        onSubmit(e);
      }}
      className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
    >
      {(title || description) && (
        <div className="border-b border-slate-100 px-5 py-3.5 bg-slate-50/60">
          {title && <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3>}
          {description && <p className="text-[10px] text-slate-400 mt-0.5">{description}</p>}
        </div>
      )}

      <fieldset disabled={readOnly} className="p-5 space-y-3 disabled:opacity-90">
        {children}
      </fieldset>

      {!readOnly && (
        <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/60 flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            {isError && <p className="text-xs font-medium text-red-600 truncate">{errorMessage}</p>}
            {isSuccess && <p className="text-xs font-medium text-emerald-600 truncate">{successMessage}</p>}
          </div>
          <Button type="submit" size="sm" disabled={isPending} className={isPending ? 'opacity-70' : ''}>
            {isPending ? 'Menyimpan...' : submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}
