/** Tujuan setelah login. Hanya path admin di situs ini. `/` tetap lewat tautan "Lihat Web Utama". */
export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\') || value.includes('://')) {
    return '/admin';
  }
  if (
    value === '/' ||
    value === '/login' ||
    value.startsWith('/login?') ||
    value === '/admin/login' ||
    value.startsWith('/admin/login?')
  ) {
    return '/admin';
  }
  return value;
}
