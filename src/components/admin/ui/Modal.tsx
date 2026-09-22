'use client';

import React, { useEffect } from 'react';
import { LuX } from 'react-icons/lu';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  busy?: boolean;
};

const SIZE_CLASS: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
};

export function Modal({ open, onClose, title, subtitle, children, footer, size = 'md', busy }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, busy, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-4 sm:items-center animate-in fade-in duration-150"
      onClick={() => !busy && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full max-h-[90vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150 ${SIZE_CLASS[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-6 pb-4">
          <div className="min-w-0">
            <h2 id="modal-title" className="text-lg font-bold text-slate-900 truncate">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-xs text-slate-400 truncate">{subtitle}</p>}
          </div>
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="shrink-0 -mt-1 -mr-1 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 transition-colors cursor-pointer"
          >
            <LuX className="w-4.5 h-4.5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-2">{children}</div>
        {footer && <div className="flex gap-3 justify-end p-6 pt-4 border-t border-slate-100">{footer}</div>}
      </div>
    </div>
  );
}
