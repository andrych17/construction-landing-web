import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireSuperAdmin, hashPassword } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';

const updateUserSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter.').optional(),
  email: z.string().email('Format email tidak valid.').optional(),
  username: z.string().min(3, 'Username minimal 3 karakter.').optional().nullable(),
  role: z.enum(['SUPERADMIN', 'ADMIN']).optional(),
  password: z.string().min(6, 'Password baru minimal 6 karakter.').optional().or(z.literal('')),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSuperAdmin();
    const { id } = await params;

    const targetUser = await db.adminUser.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 });
    }

    const json = await request.json().catch(() => null);
    const parsed = updateUserSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal.', details: parsed.error.issues.map((i) => i.message) },
        { status: 422 }
      );
    }

    const { name, email, username, role, password } = parsed.data;

    // Check duplicate email if changed
    if (email && email.toLowerCase().trim() !== targetUser.email) {
      const exists = await db.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } });
      if (exists) return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 409 });
    }

    // Check duplicate username if changed
    if (username && username.toLowerCase().trim() !== targetUser.username) {
      const exists = await db.adminUser.findUnique({ where: { username: username.toLowerCase().trim() } });
      if (exists) return NextResponse.json({ error: 'Username sudah digunakan.' }, { status: 409 });
    }

    // Protection: Prevent demoting the last SUPERADMIN
    if (role && role !== 'SUPERADMIN' && targetUser.role === 'SUPERADMIN') {
      const superadminCount = await db.adminUser.count({ where: { role: 'SUPERADMIN' } });
      if (superadminCount <= 1) {
        return NextResponse.json({ error: 'Tidak bisa mengubah role Superadmin terakhir.' }, { status: 400 });
      }
    }

    const updateData: {
      name?: string;
      email?: string;
      username?: string | null;
      role?: string;
      passwordHash?: string;
    } = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase().trim();
    if (username !== undefined) updateData.username = username ? username.toLowerCase().trim() : null;
    if (role) updateData.role = role;
    if (password && password.trim().length >= 6) {
      updateData.passwordHash = await hashPassword(password.trim());
    }

    const updated = await db.adminUser.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireSuperAdmin();
    const { id } = await params;

    if (session.userId === id) {
      return NextResponse.json({ error: 'Anda tidak dapat menghapus akun Anda sendiri saat sedang login.' }, { status: 400 });
    }

    const targetUser = await db.adminUser.findUnique({ where: { id } });
    if (!targetUser) {
      return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 });
    }

    // Protection: Ensure at least one SUPERADMIN remains
    if (targetUser.role === 'SUPERADMIN') {
      const superadminCount = await db.adminUser.count({ where: { role: 'SUPERADMIN' } });
      if (superadminCount <= 1) {
        return NextResponse.json({ error: 'Tidak dapat menghapus Superadmin terakhir di sistem.' }, { status: 400 });
      }
    }

    await db.adminUser.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Pengguna berhasil dihapus.' });
  } catch (error) {
    return handleApiError(error);
  }
}
