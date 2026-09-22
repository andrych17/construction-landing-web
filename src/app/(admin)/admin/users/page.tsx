import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth';
import { UsersTable } from '@/components/admin/UsersTable';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect('/login');

  // Hanya SUPERADMIN yang bisa mengakses halaman ini
  if (session.role !== 'SUPERADMIN') {
    redirect('/admin');
  }

  const users = await db.adminUser.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ role: 'asc' }, { createdAt: 'asc' }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Kelola Pengguna & Hak Akses</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar akun administrator yang memiliki akses ke sistem CMS Wonderful Works.
          </p>
        </div>
      </div>

      <UsersTable users={users} currentUserId={session.userId} />
    </div>
  );
}
