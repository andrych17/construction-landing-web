'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { WwLogoMark } from '@/components/ui/ModernWwLogo';
import { CONTENT_SECTIONS } from '@/lib/content-sections';
import type { AdminSession } from '@/lib/auth';
import {
  LuLayoutDashboard,
  LuFolderKanban,
  LuFileText,
  LuUsers,
  LuExternalLink,
  LuLogOut,
  LuMenu,
  LuX,
  LuShieldCheck,
  LuUser,
  LuChevronDown,
  LuChevronRight,
  LuSparkles,
} from 'react-icons/lu';

interface AdminShellProps {
  session: AdminSession;
  children: React.ReactNode;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function AdminShell({ session, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contentMenuOpen, setContentMenuOpen] = useState(pathname.startsWith('/admin/content'));

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/login');
      router.refresh();
    }
  };

  const isSuperadmin = session.role === 'SUPERADMIN';

  const navGroups: NavGroup[] = [
    {
      title: 'MANAJEMEN UTAMA',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LuLayoutDashboard },
        { href: '/admin/projects', label: 'Portofolio Proyek', icon: LuFolderKanban },
      ],
    },
    {
      title: 'KONTEN SITUS',
      items: [
        {
          href: '/admin/content',
          label: 'CMS Konten Teks',
          icon: LuFileText,
          hasSubmenu: true,
        },
      ],
    },
    ...(isSuperadmin
      ? [
          {
            title: 'SISTEM & AKSES',
            items: [
              {
                href: '/admin/users',
                label: 'Kelola Pengguna',
                icon: LuUsers,
                badge: 'SUPERADMIN',
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans">
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Modern Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a0a0a] text-neutral-200 border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center p-2 shadow-inner group-hover:border-amber-400/50 transition-colors">
              <WwLogoMark className="w-full h-full text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors">
                  WONDERFUL WORKS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                ADMIN CMS PORTAL
              </span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-neutral-400 hover:text-white p-1 rounded-lg"
          >
            <LuX className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                {group.title}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                if (item.hasSubmenu) {
                  return (
                    <div key={item.href} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setContentMenuOpen(!contentMenuOpen)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 min-h-[42px] rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                          active
                            ? 'bg-amber-400/15 text-amber-400 border border-amber-400/30'
                            : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        {contentMenuOpen ? (
                          <LuChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <LuChevronRight className="w-3.5 h-3.5 opacity-60" />
                        )}
                      </button>

                      {contentMenuOpen && (
                        <div className="pl-6 space-y-1 border-l border-white/10 ml-5 py-1">
                          <Link
                            href="/admin/content"
                            className={`block px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              pathname === '/admin/content'
                                ? 'bg-amber-400 text-black font-bold'
                                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                            }`}
                          >
                            Semua Section ({CONTENT_SECTIONS.length})
                          </Link>
                          {CONTENT_SECTIONS.map((section) => (
                            <Link
                              key={section.key}
                              href={`/admin/content/${section.key}`}
                              className={`block px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors truncate ${
                                pathname === `/admin/content/${section.key}`
                                  ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30'
                                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                              }`}
                            >
                              {section.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 min-h-[42px] rounded-xl text-xs font-semibold tracking-wide transition-all ${
                      active
                        ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/10'
                        : 'text-neutral-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          active ? 'bg-black text-amber-400' : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Footer Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/40">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0 ${
                  isSuperadmin
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                {session.name.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{session.name}</p>
                <div className="flex items-center gap-1">
                  {isSuperadmin ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-amber-400">
                      <LuShieldCheck className="w-3 h-3" /> SUPERADMIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-neutral-400">
                      <LuUser className="w-3 h-3" /> ADMIN
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] font-medium text-neutral-300 hover:text-white transition-colors"
            >
              <LuExternalLink className="w-3.5 h-3.5" />
              <span>Web Publik</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-[11px] font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              <LuLogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col lg:pl-72">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              <LuMenu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-slate-800 font-bold">Admin Portal</span>
              <span>/</span>
              <span className="text-slate-600 capitalize">
                {pathname === '/admin'
                  ? 'Dashboard'
                  : pathname.split('/').slice(2).join(' / ') || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              <LuSparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Lihat Web Utama</span>
              <LuExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
