import React from 'react';
import Link from 'next/link';
import { Card } from './Card';

export type StatTileVariant = 'neutral' | 'success' | 'warn' | 'danger';

const VARIANT_STYLES: Record<StatTileVariant, { border: string; iconBg: string; iconText: string; value: string }> = {
  neutral: { border: 'border-l-amber-400', iconBg: 'bg-amber-50', iconText: 'text-amber-600', value: 'text-slate-800' },
  success: { border: 'border-l-emerald-400', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', value: 'text-slate-800' },
  warn: { border: 'border-l-amber-400', iconBg: 'bg-amber-50', iconText: 'text-amber-600', value: 'text-amber-600' },
  danger: { border: 'border-l-red-400', iconBg: 'bg-red-50', iconText: 'text-red-600', value: 'text-red-600' },
};

type Props = {
  icon: React.ReactNode;
  label: string;
  value: number;
  variant?: StatTileVariant;
  /** Larger, more prominent tile — use for at most one "headline" number per grid. */
  hero?: boolean;
  href?: string;
};

export function StatTile({ icon, label, value, variant = 'neutral', hero = false, href }: Props) {
  const s = VARIANT_STYLES[variant];
  const content = (
    <Card
      className={`p-4 border-l-4 transition-all duration-200 ${s.border} ${
        href ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
      }`}
    >
      <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.iconBg} ${s.iconText}`}>
        {icon}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-1 font-bold tabular-nums ${s.value} ${hero ? 'text-3xl' : 'text-2xl'}`}>{value}</p>
    </Card>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
