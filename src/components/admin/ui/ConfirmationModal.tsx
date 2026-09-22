'use client';

import React, { useEffect } from 'react';
import { Button } from './Button';

type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isConfirming?: boolean;
  /** Destructive actions get a solid red confirm button and drop the "check your data" hint. */
  destructive?: boolean;
};

export function ConfirmationModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Batal',
  onConfirm,
  onCancel,
  isConfirming,
  destructive,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isConfirming) onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, isConfirming, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={() => !isConfirming && onCancel()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 text-center border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className="text-lg font-bold text-slate-900">
          {title}
        </h2>
        <p className="mt-3 text-sm text-slate-600">{description}</p>
        {!destructive && (
          <p className="mt-1.5 text-[11px] text-slate-400 font-medium">*Pastikan data yang diisi sudah benar</p>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className={`rounded-md min-h-[36px] px-5 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              destructive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-amber-500 hover:bg-amber-400 text-black'
            }`}
          >
            {isConfirming ? 'Memproses…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
