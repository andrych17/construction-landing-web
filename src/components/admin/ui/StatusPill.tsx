type StatusMeta = { label: string; style: string; dot: string };

const STATUS_MAP: Record<string, StatusMeta> = {
  draft: { label: 'Draf', style: 'bg-slate-50 text-slate-500 border-slate-200', dot: 'bg-slate-400' },
  pending: { label: 'Menunggu', style: 'bg-amber-50 text-amber-700 border-amber-300', dot: 'bg-amber-500 animate-pulse' },
  active: { label: 'Aktif', style: 'bg-emerald-50 text-emerald-700 border-emerald-300', dot: 'bg-emerald-500' },
  approved: { label: 'Disetujui', style: 'bg-emerald-50 text-emerald-700 border-emerald-300', dot: 'bg-emerald-500' },
  published: { label: 'Terbit', style: 'bg-emerald-50 text-emerald-700 border-emerald-300', dot: 'bg-emerald-500' },
  completed: { label: 'Selesai', style: 'bg-emerald-50 text-emerald-700 border-emerald-300', dot: 'bg-emerald-500' },
  revision: { label: 'Revisi', style: 'bg-orange-50 text-orange-700 border-orange-300', dot: 'bg-orange-500' },
  rejected: { label: 'Ditolak', style: 'bg-red-50 text-red-700 border-red-300', dot: 'bg-red-500' },
  inactive: { label: 'Nonaktif', style: 'bg-slate-50 text-slate-400 border-slate-200', dot: 'bg-slate-400' },
  cancelled: { label: 'Dibatalkan', style: 'bg-slate-50 text-slate-400 border-slate-200', dot: 'bg-slate-400' },
  expired: { label: 'Kedaluwarsa', style: 'bg-slate-50 text-slate-400 border-slate-200', dot: 'bg-slate-400' },
};

const FALLBACK: StatusMeta = { label: '', style: 'bg-slate-50 text-slate-500 border-slate-200', dot: 'bg-slate-400' };

/** Same semantic color/label a StatusPill renders, exposed for charts (funnel bars, legends). */
export function getStatusMeta(status: string): StatusMeta {
  return STATUS_MAP[status] ?? { ...FALLBACK, label: status };
}

export function StatusPill({ status }: { status: string }) {
  const s = getStatusMeta(status);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border shrink-0 whitespace-nowrap ${s.style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  );
}
