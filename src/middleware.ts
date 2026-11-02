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

// Visitor country from Cloudflare (CF-IPCountry), passed to the client as a cookie so the
// static pages can default to English outside Indonesia (src/context/LanguageContext.tsx).
// Crawlers get no cookie and keep the Indonesian default the pages are indexed in.
const GEO_COOKIE = 'ww_geo';
const BOT_UA = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|inspectiontool|headless/i;

function withGeo(request: NextRequest, response: NextResponse): NextResponse {
  const country = request.headers.get('cf-ipcountry')?.toUpperCase() ?? '';
  // ISO 3166 alpha-2, plus Cloudflare's XX (unknown) and T1 (Tor): Indonesian is only for "ID".
  if (!/^[A-Z][A-Z0-9]$/.test(country)) return response;
  if (!request.headers.get('accept')?.includes('text/html')) return response;
  if (BOT_UA.test(request.headers.get('user-agent') ?? '')) return response;
  if (request.cookies.get(GEO_COOKIE)?.value === country) return response;
  response.cookies.set(GEO_COOKIE, country, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname === '/login' || pathname === '/admin' || pathname.startsWith('/admin/');
  if (!isAuthRoute) return withGeo(request, NextResponse.next());

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
  // Public pages (for the geo cookie) plus the auth-gated routes; skips API, Next assets and files.
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
