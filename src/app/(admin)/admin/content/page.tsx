import Link from 'next/link';
import { CONTENT_SECTIONS } from '@/lib/content-sections';

export default function ContentIndexPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Konten Teks</h1>
        <p className="text-sm text-slate-500">Pilih section yang ingin diedit.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONTENT_SECTIONS.map((section) => (
          <Link
            key={section.key}
            href={`/admin/content/${section.key}`}
            className="block p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors"
          >
            <p className="text-sm font-bold text-slate-900">{section.label}</p>
            <p className="text-xs text-slate-400 font-mono mt-1">{section.key}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
