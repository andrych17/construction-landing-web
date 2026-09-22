'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable, ColumnDef, FilterDef } from '@/components/admin/ui/DataTable';
import { ConfirmationModal } from '@/components/admin/ui/ConfirmationModal';
import { useToast } from '@/components/admin/ui/Toast';
import {
  LuPlus,
  LuPencil,
  LuTrash2,
  LuShieldCheck,
  LuUser,
  LuX,
} from 'react-icons/lu';

export type UserRow = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  role: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
};

interface UsersTableProps {
  users: UserRow[];
  currentUserId: string;
}

export function UsersTable({ users, currentUserId }: UsersTableProps) {
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState<UserRow[]>(users);

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserRow | null>(null);

  // Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formRole, setFormRole] = useState<'SUPERADMIN' | 'ADMIN'>('ADMIN');
  const [formPassword, setFormPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open Create Modal
  const openCreateModal = () => {
    setFormName('');
    setFormEmail('');
    setFormUsername('');
    setFormRole('ADMIN');
    setFormPassword('');
    setFormError(null);
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormUsername(user.username ?? '');
    setFormRole(user.role as 'SUPERADMIN' | 'ADMIN');
    setFormPassword('');
    setFormError(null);
  };

  // Submit Create User
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          username: formUsername || null,
          role: formRole,
          password: formPassword,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error ?? 'Gagal membuat pengguna.');

      setData((prev) => [...prev, resData]);
      setIsCreateOpen(false);
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Edit User
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          username: formUsername || null,
          role: formRole,
          ...(formPassword ? { password: formPassword } : {}),
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error ?? 'Gagal memperbarui pengguna.');

      setData((prev) => prev.map((u) => (u.id === editingUser.id ? { ...u, ...resData } : u)));
      setEditingUser(null);
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Delete User
  const handleDelete = async () => {
    if (!deletingUser) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, { method: 'DELETE' });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error ?? 'Gagal menghapus pengguna.');

      setData((prev) => prev.filter((u) => u.id !== deletingUser.id));
      setDeletingUser(null);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filters: FilterDef<UserRow>[] = [
    {
      key: 'role',
      label: 'Role Akses',
      options: [
        { label: 'Superadmin', value: 'SUPERADMIN' },
        { label: 'Admin', value: 'ADMIN' },
      ],
    },
  ];

  const columns: ColumnDef<UserRow>[] = [
    {
      header: 'No',
      className: 'w-12 text-slate-400 font-mono text-xs',
      cell: (_row, idx) => idx + 1,
    },
    {
      header: 'Pengguna & Nama',
      accessorKey: 'name',
      sortable: true,
      cell: (row) => {
        const isSelf = row.id === currentUserId;
        return (
          <div className="flex items-center gap-3 py-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase ${
                row.role === 'SUPERADMIN'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {row.name.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{row.name}</span>
                {isSelf && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-100 text-blue-700 font-bold">
                    Anda
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                @{row.username || '—'}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
      sortable: true,
      cell: (row) => <span className="font-mono text-xs text-slate-600">{row.email}</span>,
    },
    {
      header: 'Role Akses',
      accessorKey: 'role',
      sortable: true,
      cell: (row) => (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase border ${
            row.role === 'SUPERADMIN'
              ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-2xs'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          {row.role === 'SUPERADMIN' ? (
            <>
              <LuShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>SUPERADMIN</span>
            </>
          ) : (
            <>
              <LuUser className="w-3.5 h-3.5 text-slate-500" />
              <span>ADMIN</span>
            </>
          )}
        </span>
      ),
    },
    {
      header: 'Terdaftar Sejak',
      accessorKey: 'createdAt',
      sortable: true,
      cell: (row) => {
        const d = new Date(row.createdAt);
        return (
          <span className="text-xs text-slate-500 font-mono">
            {d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        );
      },
    },
    {
      header: 'Aksi',
      align: 'right',
      cell: (row) => {
        const isSelf = row.id === currentUserId;
        return (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              title="Edit & Reset Password"
              onClick={() => openEditModal(row)}
              className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
            >
              <LuPencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              title={isSelf ? 'Tidak dapat menghapus akun sendiri' : 'Hapus Pengguna'}
              disabled={isSelf}
              onClick={() => setDeletingUser(row)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
            >
              <LuTrash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Cari nama, email, username, atau role…"
        searchKeys={['name', 'email', 'username', 'role']}
        filters={filters}
        getItemId={(item) => item.id}
        emptyTitle="Belum Ada Pengguna Lain"
        emptyDescription="Tambahkan akun admin atau superadmin baru menggunakan tombol di atas."
        actions={
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <LuPlus className="w-4 h-4" />
            <span>Tambah Admin</span>
          </button>
        }
      />

      {/* CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <LuPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Tambah Akun Admin Baru</h3>
                  <p className="text-xs text-slate-500">Buat akses administrator untuk mengelola sistem.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Pengguna *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@wwconstruction.id"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="budi_ww"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Role Akses *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as 'SUPERADMIN' | 'ADMIN')}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-medium cursor-pointer"
                  >
                    <option value="ADMIN">ADMIN (Kelola Proyek & Konten)</option>
                    <option value="SUPERADMIN">SUPERADMIN (Akses Penuh + Kelola User)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Minimal 6 karakter"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan…' : 'Buat Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <LuPencil className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Pengguna: {editingUser.name}</h3>
                  <p className="text-xs text-slate-500">Perbarui profil atau reset password pengguna.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg cursor-pointer"
              >
                <LuX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Pengguna *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Kosongkan bila tidak pakai"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Role Akses *
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as 'SUPERADMIN' | 'ADMIN')}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-medium cursor-pointer"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPERADMIN">SUPERADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Reset Password <span className="text-slate-400 font-normal">(opsional)</span>
                  </label>
                  <input
                    type="password"
                    minLength={6}
                    placeholder="Isi jika ingin ganti password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:bg-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-sm font-bold shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan…' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationModal
        open={!!deletingUser}
        title="Hapus Akun Pengguna?"
        description={`Apakah Anda yakin ingin menghapus akun ${deletingUser?.name} (${deletingUser?.email})? Tindakan ini tidak dapat dibatalkan.`}
        confirmLabel="Ya, Hapus Akun"
        onConfirm={handleDelete}
        onCancel={() => setDeletingUser(null)}
        isConfirming={isSubmitting}
        destructive
      />
    </>
  );
}
