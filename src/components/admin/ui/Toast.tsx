'use client';

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { LuCircleCheck, LuCircleX, LuTriangleAlert, LuInfo, LuX } from 'react-icons/lu';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastCtx {
  toast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastCtx | null>(null);

let nextId = 0;

const STYLE_CLASS: Record<ToastType, string> = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-amber-500 text-black',
  info: 'bg-slate-800 text-white',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((type: ToastType, message: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const ctx: ToastCtx = {
    toast: add,
    success: (msg) => add('success', msg),
    error: (msg) => add('error', msg),
    warning: (msg) => add('warning', msg),
    info: (msg) => add('info', msg),
  };

  const icons: Record<ToastType, ReactNode> = {
    success: <LuCircleCheck className="w-4.5 h-4.5" />,
    error: <LuCircleX className="w-4.5 h-4.5" />,
    warning: <LuTriangleAlert className="w-4.5 h-4.5" />,
    info: <LuInfo className="w-4.5 h-4.5" />,
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm" role="region" aria-label="Notifikasi">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === 'error' ? 'alert' : 'status'}
            aria-live={t.type === 'error' ? 'assertive' : 'polite'}
            className={`rounded-xl px-4 py-3 text-sm font-medium shadow-lg animate-in slide-in-from-right-2 fade-in duration-150 flex items-center gap-2.5 ${STYLE_CLASS[t.type]}`}
          >
            <span className="shrink-0">{icons[t.type]}</span>
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              aria-label="Tutup notifikasi"
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="opacity-60 hover:opacity-100 shrink-0 rounded-md p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-opacity cursor-pointer"
            >
              <LuX className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast harus dipakai di dalam ToastProvider');
  return ctx;
}
