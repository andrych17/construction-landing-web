import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { SESSION_COOKIE_NAME } from '@/lib/session-cookie';
import { safeNextPath } from '@/lib/safe-next';

// ponytail: Edge middleware can't touch Prisma/Postgres, so this only verifies
// the JWT signature to gate the route. Route handlers still re-check the DB
// (see requireAdmin in src/lib/auth.ts) before any mutation.
async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = await hasValidSession(request);
  const onLogin = pathname === '/login' || pathname === '/admin/login';

  if (onLogin) {
    if (loggedIn) {
      return NextResponse.redirect(new URL(safeNextPath(request.nextUrl.searchParams.get('next')), request.url));
    }
    if (pathname === '/login') {
      const url = new URL('/admin/login', request.url);
      request.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (!loggedIn) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/admin', '/admin/:path*'],
};
