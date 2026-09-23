import Link from 'next/link';
import { CONTENT_SECTIONS } from '@/lib/content-sections';
import { LuFilm, LuArrowRight } from 'react-icons/lu';

export default function ContentIndexPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">CMS Konten Teks</h1>
          <p className="text-sm text-slate-500">Pilih section konten teks yang ingin diedit.</p>
        </div>

        <Link
          href="/admin/hero"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors shadow-xs"
        >
          <LuFilm className="w-4 h-4" />
          <span>Kelola Hero Video & Media</span>
          <LuArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CONTENT_SECTIONS.map((section) => (
          <Link
            key={section.key}
            href={`/admin/content/${section.key}`}
            className="block p-5 rounded-xl border border-slate-200 bg-white hover:border-amber-400 transition-colors group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {section.label}
              </p>
              <span className="text-xs text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">{section.key}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
