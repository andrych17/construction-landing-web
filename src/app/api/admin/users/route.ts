import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { requireSuperAdmin, hashPassword } from '@/lib/auth';
import { handleApiError } from '@/lib/api-error';

const createUserSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter.'),
  email: z.string().email('Format email tidak valid.'),
  username: z.string().min(3, 'Username minimal 3 karakter.').optional().nullable(),
  role: z.enum(['SUPERADMIN', 'ADMIN']).default('ADMIN'),
  password: z.string().min(6, 'Password minimal 6 karakter.'),
});

export async function GET() {
  try {
    await requireSuperAdmin();

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

    return NextResponse.json(users);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireSuperAdmin();

    const json = await request.json().catch(() => null);
    const parsed = createUserSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validasi gagal.', details: parsed.error.issues.map((i) => i.message) },
        { status: 422 }
      );
    }

    const { name, email, username, role, password } = parsed.data;

    // Check unique email
    const existingEmail = await db.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (existingEmail) {
      return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 409 });
    }

    // Check unique username if provided
    if (username) {
      const existingUser = await db.adminUser.findUnique({
        where: { username: username.toLowerCase().trim() },
      });
      if (existingUser) {
        return NextResponse.json({ error: 'Username sudah digunakan.' }, { status: 409 });
      }
    }

    const passwordHash = await hashPassword(password);

    const newUser = await db.adminUser.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        username: username ? username.toLowerCase().trim() : null,
        role,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
