'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { WwLogoMark } from '@/components/ui/ModernWwLogo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Email atau password salah.');
      }
      const next = searchParams.get('next') ?? '/admin';
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col items-center justify-center px-4 relative overflow-hidden selection:bg-amber-400 selection:text-black">
      {/* Subtle architectural ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-8 sm:p-10 relative z-10">
        {/* WW Construction Official Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-3 mb-4 shadow-inner">
            <WwLogoMark className="w-full h-full text-white" />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <h1 className="font-display text-lg font-bold tracking-[0.15em] text-white uppercase">
              WONDERFUL WORKS
            </h1>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          </div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
            STUDIO ADMIN PORTAL
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-white/15 bg-[#121212] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
              Kata Sandi
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password Admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 min-h-[44px] rounded-lg border border-white/15 bg-[#121212] text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-sans"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 min-h-[44px] rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md shadow-amber-400/10 hover:shadow-amber-400/20 active:scale-[0.99]"
          >
            {submitting ? 'MEMVERIFIKASI…' : 'MASUK KE ADMIN'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.08] text-center">
          <Link
            href="/"
            className="text-xs font-mono text-neutral-400 hover:text-amber-400 transition-colors tracking-wider inline-flex items-center gap-1.5"
          >
            <span>←</span> Kembali ke Website Publik
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
