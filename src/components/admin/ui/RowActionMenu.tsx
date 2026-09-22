'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { LuEllipsis } from 'react-icons/lu';

export interface RowActionItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

interface RowActionMenuProps {
  items: (RowActionItem | null | undefined | false)[];
  align?: 'left' | 'right';
  className?: string;
  title?: string;
}

export function RowActionMenu({ items, align = 'right', className = '', title = 'Tindakan lainnya' }: RowActionMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const validItems = items.filter(Boolean) as RowActionItem[];

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (validItems.length === 0) return null;

  return (
    <div
      className={`relative inline-block text-left ${open ? 'z-30' : ''} ${className}`}
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        title={title}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`inline-flex items-center justify-center h-7 w-7 rounded-lg border text-slate-500 transition-all cursor-pointer ${
          open
            ? 'bg-slate-100 border-slate-300 text-slate-800 ring-2 ring-amber-400/20'
            : 'bg-white border-slate-200 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300'
        }`}
      >
        <LuEllipsis className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div
          className={`absolute z-30 mt-1 min-w-[160px] w-max max-w-[240px] rounded-xl border border-slate-200 bg-white p-1 text-xs shadow-lg animate-in fade-in zoom-in-95 duration-100 ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {validItems.map((item, idx) => (
            <button
              key={idx}
              type="button"
              disabled={item.disabled}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick();
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                item.disabled
                  ? 'text-slate-300 cursor-not-allowed'
                  : item.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon && <span className="shrink-0 text-current">{item.icon}</span>}
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
