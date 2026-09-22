'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ponytail: App Router gives no real navigation-progress events, so this fakes
// one — jump to 30% instantly on path/query change, creep toward 90% while the
// new route renders, then snap to 100% and fade. No dependency (NProgress etc.)
// needed for a two-state (start/finish) bar.
function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const key = `${pathname}?${searchParams.toString()}`;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Deferred via setTimeout so the initial setState doesn't run synchronously
    // inside the effect body (react-hooks/set-state-in-effect).
    const start = setTimeout(() => {
      setVisible(true);
      setProgress(30);
    }, 0);

    const creep = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) * 0.2));
    }, 150);

    const finish = setTimeout(() => {
      clearInterval(creep);
      setProgress(100);
      setTimeout(() => setVisible(false), 250);
    }, 350);

    return () => {
      clearTimeout(start);
      clearInterval(creep);
      clearTimeout(finish);
    };
  }, [key]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[3px]" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-[width] duration-300 ease-out"
        style={{ width: `${progress}%` }}
      >
        <div className="h-full w-24 -translate-x-full animate-[shimmer_1.1s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      </div>
    </div>
  );
}

export function TopProgressBar() {
  return (
    <Suspense>
      <ProgressBar />
    </Suspense>
  );
}
