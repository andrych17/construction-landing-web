import React from 'react';

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
        {label} {hint && <span className="normal-case font-normal text-slate-400">({hint})</span>}
      </span>
      {children}
    </label>
  );
}
