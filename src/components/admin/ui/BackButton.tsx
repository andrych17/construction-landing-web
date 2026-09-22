import Link from 'next/link';
import { LuArrowLeft } from 'react-icons/lu';

export function BackButton({ href, className = '' }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label="Kembali"
      className={`flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-2xs hover:shadow-xs transition-all duration-150 active:scale-95 cursor-pointer ${className}`}
    >
      <LuArrowLeft className="w-4 h-4" />
    </Link>
  );
}
