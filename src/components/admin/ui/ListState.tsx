import React from 'react';
import { LoadingView } from './LoadingView';

export function ListState({
  isLoading,
  isEmpty,
  isError,
  emptyText,
  onRetry,
  children,
}: {
  isLoading: boolean;
  isEmpty: boolean;
  isError?: boolean;
  emptyText: string;
  onRetry?: () => void;
  children: React.ReactNode;
}) {
  if (isLoading) return <LoadingView />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-150">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 border border-red-100 text-red-400 mb-4">
          <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h4 className="text-sm font-bold text-slate-700">Gagal Memuat Data</h4>
        <p className="mt-1 text-xs text-slate-400 font-medium max-w-xs">Terjadi kesalahan. Silakan coba lagi.</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-md bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-black transition-colors cursor-pointer"
          >
            Coba Lagi
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-slate-200 shadow-xs animate-in fade-in duration-150">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 mb-4">
          <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18" />
          </svg>
        </div>
        <h4 className="text-sm font-bold text-slate-700">Tidak Ada Data</h4>
        <p className="mt-1 text-xs text-slate-400 font-medium max-w-xs">{emptyText}</p>
      </div>
    );
  }

  return <>{children}</>;
}
