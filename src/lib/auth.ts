import 'server-only';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { db } from '@/lib/db';
import { SESSION_COOKIE_NAME } from '@/lib/session-cookie';

export { SESSION_COOKIE_NAME };
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 jam

export type AdminSession = {
  userId: string;
  email: string;
  username?: string;
  name: string;
  role: string; // 'SUPERADMIN' | 'ADMIN'
};

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET belum dikonfigurasi di .env');
  return new TextEncoder().encode(secret);
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signSessionToken(payload: AdminSession): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.userId !== 'string' || typeof payload.email !== 'string' || typeof payload.name !== 'string') {
      return null;
    }
    return {
      userId: payload.userId,
      email: payload.email,
      username: typeof payload.username === 'string' ? payload.username : undefined,
      name: payload.name,
      role: typeof payload.role === 'string' ? payload.role : 'ADMIN',
    };
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  };
}

export class UnauthorizedError extends Error {
  constructor(message = 'Login diperlukan.') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Akses ditolak. Fitur ini hanya untuk Superadmin.') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/** Dipakai di Server Component (layout/page admin) — null bila belum login. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session) return null;

  // Verifikasi user masih ada di DB (bukan sekadar token valid) — mengunci akses
  // begitu admin dihapus, tanpa menunggu token kedaluwarsa.
  const user = await db.adminUser.findUnique({ where: { id: session.userId } });
  if (!user) return null;

  return {
    ...session,
    role: user.role ?? 'ADMIN',
    username: user.username ?? undefined,
  };
}

/** Dipakai di Route Handler (API) — melempar UnauthorizedError bila belum login. */
export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) throw new UnauthorizedError();
  return session;
}

/** Khusus Superadmin (misal: Kelola Pengguna Admin). */
export async function requireSuperAdmin(): Promise<AdminSession> {
  const session = await requireAdmin();
  if (session.role !== 'SUPERADMIN') {
    throw new ForbiddenError();
  }
  return session;
}
