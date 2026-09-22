import React from 'react';
import { LuChevronDown } from 'react-icons/lu';

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
};

export function Dropdown({ label, options, className = '', ...rest }: Props) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
      <div className="relative">
        <select
          {...rest}
          className={`w-full appearance-none px-3 py-2 min-h-[44px] pr-9 rounded-md border border-slate-300 bg-white text-sm text-slate-900 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 cursor-pointer transition-colors ${className}`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>
    </label>
  );
}
