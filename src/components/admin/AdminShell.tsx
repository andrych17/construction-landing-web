'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CONTENT_SECTIONS } from '@/lib/content-sections';

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Proyek' },
  { href: '/admin/content', label: 'Konten Teks' },
];

export function AdminShell({ adminName, children }: { adminName: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-6 border-b border-slate-200">
          <span className="font-bold text-sm tracking-tight">Wonderful Works</span>
          <span className="block text-xs text-slate-400 font-mono uppercase tracking-wider">Admin CMS</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2.5 min-h-[44px] flex items-center rounded-md text-sm font-medium transition-colors ${
                  active ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {pathname.startsWith('/admin/content') && (
            <div className="pl-3 mt-2 space-y-0.5 border-l border-slate-200 ml-3">
              {CONTENT_SECTIONS.map((section) => (
                <Link
                  key={section.key}
                  href={`/admin/content/${section.key}`}
                  className={`block px-3 py-2 min-h-[36px] flex items-center rounded-md text-xs font-medium transition-colors ${
                    pathname === `/admin/content/${section.key}`
                      ? 'text-amber-700 font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {section.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className="px-5 py-4 border-t border-slate-200 space-y-2">
          <p className="text-xs text-slate-500 truncate">{adminName}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left text-xs font-semibold text-slate-500 hover:text-red-600 min-h-[36px] transition-colors"
          >
            Keluar
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
