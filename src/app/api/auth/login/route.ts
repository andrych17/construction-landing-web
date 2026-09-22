import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { verifyPassword, signSessionToken, sessionCookieOptions, SESSION_COOKIE_NAME } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = loginSchema.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: 'Email atau password tidak valid.' }, { status: 422 });
  }

  const { email, password } = body.data;
  const user = await db.adminUser.findUnique({ where: { email } });
  // Bandingkan hash placeholder bila user tidak ditemukan, supaya waktu respons
  // untuk email valid/tidak valid tidak berbeda (mencegah user enumeration timing).
  const passwordHash = user?.passwordHash ?? '$2b$10$invalidsaltinvalidsaltinvalidsaltinvalidsaltinvalidsa';
  const valid = await verifyPassword(password, passwordHash);

  if (!user || !valid) {
    return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
  }

  const token = await signSessionToken({ userId: user.id, email: user.email, name: user.name });
  const response = NextResponse.json({ name: user.name, email: user.email });
  response.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return response;
}
