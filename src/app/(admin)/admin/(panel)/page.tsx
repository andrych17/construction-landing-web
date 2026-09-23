import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { CONTENT_SECTIONS } from '@/lib/content-sections';
import {
  LuFolderKanban,
  LuFileText,
  LuUsers,
  LuPlus,
  LuCircleCheck,
  LuClock,
  LuArrowRight,
  LuShieldCheck,
  LuSparkles,
} from 'react-icons/lu';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const isSuperadmin = session?.role === 'SUPERADMIN';

  const [projectCount, publishedCount, userCount, recentProjects] = await Promise.all([
    db.project.count(),
    db.project.count({ where: { published: true } }),
    db.adminUser.count(),
    db.project.findMany({
      take: 5,
      orderBy: [{ updatedAt: 'desc' }],
      select: {
        id: true,
        title: true,
        category: true,
        location: true,
        img: true,
        published: true,
        updatedAt: true,
      },
    }),
  ]);

  const draftCount = projectCount - publishedCount;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] text-white p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-amber-400 text-black">
                {session?.role ?? 'ADMIN'}
              </span>
              <span className="text-xs text-neutral-400 font-mono">Wonderful Works CMS v2.0</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Selamat Datang, {session?.name}!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Panel administrasi untuk mengelola portofolio proyek, teks profil perusahaan, dan pengguna sistem.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              <LuPlus className="w-4 h-4" />
              <span>Proyek Baru</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Proyek */}
        <Link
          href="/admin/projects"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Total Proyek
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LuFolderKanban className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{projectCount}</p>
          <div className="flex items-center gap-3 text-xs mt-2 text-slate-500 font-medium">
            <span className="text-emerald-600 font-semibold">{publishedCount} Terbit</span>
            <span>·</span>
            <span className="text-slate-400">{draftCount} Draf</span>
          </div>
        </Link>

        {/* Proyek Terbit Live */}
        <Link
          href="/admin/projects"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Status Live
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LuCircleCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 tracking-tight">{publishedCount}</p>
          <p className="text-xs text-slate-400 mt-2">Tampil di portofolio publik</p>
        </Link>

        {/* Section Konten */}
        <Link
          href="/admin/content"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              Section Konten
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LuFileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{CONTENT_SECTIONS.length}</p>
          <p className="text-xs text-slate-400 mt-2">Filosofi, layanan, founder, FAQ, dll.</p>
        </Link>

        {/* Total Admin User */}
        {isSuperadmin ? (
          <Link
            href="/admin/users"
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                Kelola User
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LuUsers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{userCount}</p>
            <p className="text-xs text-purple-600 font-semibold mt-2 flex items-center gap-1">
              <LuShieldCheck className="w-3.5 h-3.5" /> Kelola Hak Akses
            </p>
          </Link>
        ) : (
          <div className="p-5 bg-slate-50/60 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Pengguna
              </span>
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center">
                <LuUsers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-700 tracking-tight">{userCount}</p>
            <p className="text-xs text-slate-400 mt-2">Akun administrator terdaftar</p>
          </div>
        )}
      </div>

      {/* Quick Section Content Shortcuts & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Proyek Baru Diperbarui</h2>
              <p className="text-xs text-slate-400">Daftar proyek portofolio terakhir.</p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>Lihat Semua ({projectCount})</span>
              <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentProjects.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80">
                    {p.img ? (
                      <Image src={p.img} alt={p.title} fill sizes="48px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <LuSparkles className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors truncate block"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-slate-400">
                      {p.category} · {p.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      p.published
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {p.published ? 'Live' : 'Draf'}
                  </span>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-xs font-bold text-slate-600 hover:text-amber-600 p-1.5 rounded"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section CMS Quick Links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Editor Konten Section</h2>
            <p className="text-xs text-slate-400">Akses cepat untuk edit teks situs.</p>
          </div>

          <div className="space-y-2">
            {CONTENT_SECTIONS.slice(0, 6).map((section) => (
              <Link
                key={section.key}
                href={`/admin/content/${section.key}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 border border-slate-200/60 transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-amber-700">
                    {section.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">{section.key}</p>
                </div>
                <LuArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>

          <Link
            href="/admin/content"
            className="block text-center py-2.5 text-xs font-bold text-slate-600 hover:text-amber-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Lihat Semua Section ({CONTENT_SECTIONS.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
