// Kept separate from lib/auth.ts (which imports Prisma) because middleware.ts
// runs on the Edge runtime and can't bundle the Node-only Prisma client.
export const SESSION_COOKIE_NAME = 'ww_admin_session';
