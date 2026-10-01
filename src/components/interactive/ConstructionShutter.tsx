'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WwLogoMark } from '@/components/ui/ModernWwLogo';

const COLUMNS = 6;
const COLUMN_EASE = [0.76, 0, 0.24, 1] as const;
// Closing blocks navigation, so keep it short (0.3s + 5 × 0.02s = 0.4s).
// Lifting does not block — the page is already there and clickable — so it
// can breathe a little longer (0.45s + 5 × 0.03s = 0.6s).
const CLOSE = { duration: 0.3, stagger: 0.02 };
const LIFT = { duration: 0.45, stagger: 0.03 };
const NAV_TIMEOUT_MS = 10000;

const isPrivatePath = (path: string) =>
  path === '/login' || path.startsWith('/admin') || path.startsWith('/api') || path.startsWith('/uploads');

/**
 * Six structural columns, staggered left to right. Shared by the first-visit
 * preloader and route transitions so both speak the same motion language:
 * columns rise to close the site, then lift away to open it.
 */
export function ShutterColumns({
  initial,
  to,
  onDone,
}: {
  initial: string;
  to: string;
  onDone?: () => void;
}) {
  const timing = to === '-100%' ? LIFT : CLOSE;
  return (
    <div aria-hidden="true" className="absolute inset-0 flex">
      {Array.from({ length: COLUMNS }, (_, i) => (
        <motion.div
          key={i}
          initial={{ y: initial }}
          animate={{ y: to }}
          transition={{ duration: timing.duration, ease: COLUMN_EASE, delay: i * timing.stagger }}
          onAnimationComplete={i === COLUMNS - 1 ? onDone : undefined}
          className="relative h-full flex-1 bg-[#060606] border-r border-white/[0.05] last:border-r-0"
        >
          {/* Amber flange on both ends: the edge that leads while rising and while lifting. */}
          <span className="absolute inset-x-0 top-0 h-px bg-amber-400/70" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-amber-400/70" />
        </motion.div>
      ))}
    </div>
  );
}

type Run = { href: string; from: string; covered: boolean; timedOut: boolean };

/**
 * Route transition. Intercepts internal link clicks, closes the columns,
 * navigates once the screen is covered, and lifts the columns when the new
 * pathname commits. Because every public page is force-dynamic, the covered
 * state doubles as the loading indicator while the server renders.
 *
 * Note: back/forward navigation is not animated — the browser has already
 * swapped the page by the time we could react.
 */
export default function ConstructionShutter() {
  const router = useRouter();
  const pathname = usePathname();
  const [run, setRun] = useState<Run | null>(null);
  const lifting = !!run && (pathname !== run.from || run.timedOut);

  useEffect(() => {
    if (run || isPrivatePath(pathname)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!(a instanceof HTMLAnchorElement) || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (isPrivatePath(url.pathname)) return;

      // Runs in the capture phase, before next/link sees the click; next/link
      // skips navigation when the event is already defaultPrevented.
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      // Fetch the page while the columns close, so the push after the cover
      // is served from the router cache instead of starting a request then.
      // PrefetchKind is not exported publicly; 'full' is its runtime value.
      router.prefetch(href, { kind: 'full' } as unknown as Parameters<typeof router.prefetch>[1]);
      document.documentElement.dataset.curtain = '';
      setRun({ href, from: window.location.pathname, covered: false, timedOut: false });
    };

    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, [pathname, run, router]);

  // Failsafe: never trap the visitor behind the shutter if navigation stalls.
  const covered = !!run?.covered;
  useEffect(() => {
    if (!covered) return;
    const id = setTimeout(() => setRun((r) => r && { ...r, timedOut: true }), NAV_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [covered]);

  // Hero entrance animations stay paused (globals.css) until the columns lift.
  useEffect(() => {
    if (lifting) delete document.documentElement.dataset.curtain;
  }, [lifting]);

  if (!run) return null;

  const onDone = () => {
    if (lifting) return setRun(null);
    setRun({ ...run, covered: true });
    router.push(run.href);
  };

  const waiting = run.covered && !lifting;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9998] ${lifting ? 'pointer-events-none' : 'pointer-events-auto'} ${waiting ? 'bg-[#060606]' : ''}`}
    >
      <ShutterColumns initial="100%" to={lifting ? '-100%' : '0%'} onDone={onDone} />

      {/* Laser level: indeterminate progress while the next page renders.
          Fades in only after 200ms of waiting, so fast responses never flash it. */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-300 ease-expo ${
          waiting ? 'opacity-100 delay-200' : 'opacity-0'
        }`}
      >
        <WwLogoMark className="w-10 h-14 text-white/90" />
        <div className="relative h-px w-40 sm:w-56 overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/5 animate-[shimmer_1.1s_ease-in-out_infinite] bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
        </div>
      </div>
    </div>
  );
}
