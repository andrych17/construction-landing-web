'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { LuX } from 'react-icons/lu';

export type SearchableSelectOption = { value: string; label: string };

// ponytail: caps the rendered list so opening the dropdown against a large dataset doesn't
// render thousands of rows — typing narrows `filtered` below the cap. Upgrade path if a list
// regularly exceeds this: server-side search instead of client-side substring filtering.
const MAX_VISIBLE_OPTIONS = 50;

type Props = {
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md';
};

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Pilih…',
  disabled,
  className = '',
  size = 'md',
}: Props) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = options.find((o) => o.value === value);
  const display = open ? query : (selected?.label ?? '');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const visible = filtered.slice(0, MAX_VISIBLE_OPTIONS);
  const hiddenCount = filtered.length - visible.length;

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function pick(next: string) {
    onChange(next);
    setQuery('');
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        disabled={disabled}
        placeholder={placeholder}
        value={display}
        onFocus={() => {
          if (disabled) return;
          setQuery('');
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
          if (e.key === 'Enter' && filtered.length === 1) {
            e.preventDefault();
            pick(filtered[0].value);
          }
        }}
        className={`w-full rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 disabled:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 ${
          size === 'sm' ? 'px-2.5 py-1.5 text-xs min-h-[36px]' : 'px-3 py-2 text-sm min-h-[44px]'
        } ${value && !disabled ? 'pr-8' : ''}`}
      />
      {value && !disabled && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Hapus pilihan"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => pick('')}
        >
          <LuX className="w-3.5 h-3.5" />
        </button>
      )}
      {open && !disabled && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-xs text-slate-400">Tidak ada hasil</li>
          ) : (
            <>
              {visible.map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={o.value === value}
                    className={`w-full text-left px-3 py-1.5 hover:bg-amber-50 cursor-pointer ${
                      size === 'sm' ? 'text-xs' : 'text-sm'
                    } ${o.value === value ? 'bg-amber-50 font-semibold text-amber-700' : 'text-slate-700'}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => pick(o.value)}
                  >
                    {o.label}
                  </button>
                </li>
              ))}
              {hiddenCount > 0 && (
                <li className="px-3 py-1.5 text-[11px] text-slate-400 border-t border-slate-100 mt-1">
                  +{hiddenCount} lainnya — ketik untuk mencari
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
