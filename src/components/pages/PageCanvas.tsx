'use client';

import { Render } from '@puckeditor/core';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { configFor } from '@/components/pages/page-configs';
import type { HomeLayoutData, PageId } from '@/lib/home-layout';

export function PageCanvas({ page, data }: { page: PageId; data: HomeLayoutData }) {
  return (
    <div className="bg-[#030303] text-neutral-100 font-sans min-h-screen selection:bg-amber-400 selection:text-black relative w-full overflow-x-hidden">
      <Navbar />
      <Render config={configFor(page)} data={data} />
      <Footer />
    </div>
  );
}
