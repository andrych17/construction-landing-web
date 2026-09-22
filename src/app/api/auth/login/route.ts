import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyPassword, signSessionToken, sessionCookieOptions, SESSION_COOKIE_NAME } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().min(1, 'Username atau email wajib diisi.'),
  password: z.string().min(1, 'Password wajib diisi.'),
});

export async function POST(request: Request) {
  const body = loginSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: 'Username/email atau password tidak valid.' }, { status: 422 });
  }

  const identifier = body.data.email.trim();
  const { password } = body.data;

  // Cari berdasarkan email ATAU username (case-insensitive)
  const user = await db.adminUser.findFirst({
    where: {
      OR: [
        { email: { equals: identifier, mode: 'insensitive' } },
        { username: { equals: identifier, mode: 'insensitive' } },
      ],
    },
  });

  // Bandingkan hash placeholder bila user tidak ditemukan, supaya waktu respons
  // untuk email valid/tidak valid tidak berbeda (mencegah user enumeration timing).
  const passwordHash = user?.passwordHash ?? '$2b$10$invalidsaltinvalidsaltinvalidsaltinvalidsaltinvalidsa';
  const valid = await verifyPassword(password, passwordHash);

  if (!user || !valid) {
    return NextResponse.json({ error: 'Username/email atau password salah.' }, { status: 401 });
  }

  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    username: user.username ?? undefined,
    name: user.name,
    role: user.role ?? 'ADMIN',
  });

  const response = NextResponse.json({
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
  });

  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return response;
}
