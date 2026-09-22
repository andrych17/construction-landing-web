'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/admin/ui/Toast';
import { Button } from '@/components/admin/ui/Button';
import { HERO_PAGES, type HeroPageKey } from '@/lib/content-sections';
import type { HeroMediaValue } from '@/data/siteData';
import {
  DEFAULT_HERO_HOME,
  DEFAULT_HERO_ABOUT,
  DEFAULT_HERO_SERVICES,
  DEFAULT_HERO_PROJECTS,
  DEFAULT_HERO_CONTACT,
} from '@/data/siteData';
import {
  LuFilm,
  LuImage,
  LuUpload,
  LuExternalLink,
  LuRotateCcw,
  LuTrash2,
  LuVolume2,
  LuVolumeX,
} from 'react-icons/lu';

const DEFAULT_MAP: Record<HeroPageKey, HeroMediaValue> = {
  heroHome: DEFAULT_HERO_HOME,
  heroAbout: DEFAULT_HERO_ABOUT,
  heroServices: DEFAULT_HERO_SERVICES,
  heroProjects: DEFAULT_HERO_PROJECTS,
  heroContact: DEFAULT_HERO_CONTACT,
};

export function HeroMediaManager({
  initialData,
  initialTab,
}: {
  initialData: Record<string, HeroMediaValue>;
  initialTab?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const validTabs = HERO_PAGES.map((p) => p.key);
  const initialActive = validTabs.includes(initialTab as HeroPageKey)
    ? (initialTab as HeroPageKey)
    : 'heroHome';

  const [activeTab, setActiveTab] = useState<HeroPageKey>(initialActive);
  const [data, setData] = useState<Record<string, HeroMediaValue>>(initialData);
  const [savedData, setSavedData] = useState<Record<string, HeroMediaValue>>(initialData);

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [isScrolled, setIsScrolled] = useState(false);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const posterInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync tab from URL if changed
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && validTabs.includes(tabParam as HeroPageKey)) {
      setActiveTab(tabParam as HeroPageKey);
    }
  }, [searchParams]);

  // Track scroll for floating bottom save bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentHero = data[activeTab] || DEFAULT_MAP[activeTab];
  const activePageMeta = HERO_PAGES.find((p) => p.key === activeTab) || HERO_PAGES[0];

  const hasDirtyCurrent = JSON.stringify(currentHero) !== JSON.stringify(savedData[activeTab]);

  const updateCurrentField = <K extends keyof HeroMediaValue>(field: K, value: HeroMediaValue[K]) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error ?? 'Upload gagal.');
    }
    const body = await res.json();
    return body.url as string;
  };

  const handleVideoUpload = async (file: File) => {
    setUploadingVideo(true);
    try {
      const url = await uploadFile(file);
      updateCurrentField('video', url);
      toast.success('Video berhasil diunggah.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload video gagal.');
    } finally {
      setUploadingVideo(false);
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  const handlePosterUpload = async (file: File) => {
    setUploadingPoster(true);
    try {
      const url = await uploadFile(file);
      updateCurrentField('poster', url);
      toast.success('Poster thumbnail berhasil diunggah.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload poster gagal.');
    } finally {
      setUploadingPoster(false);
      if (posterInputRef.current) posterInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentHero),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Gagal menyimpan perubahan.');
      }

      setSavedData((prev) => ({
        ...prev,
        [activeTab]: { ...currentHero },
      }));

      toast.success(`Hero ${activePageMeta.label} berhasil disimpan.`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gagal menyimpan.');
    } finally {
      setSaving(false);
    }
  };

  // Keyboard shortcut Ctrl/Cmd + S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saving && hasDirtyCurrent) {
          handleSave();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saving, hasDirtyCurrent, currentHero, activeTab]);

  const handleResetToDefault = () => {
    if (confirm(`Kembalikan media Hero ${activePageMeta.label} ke default awal?`)) {
      setData((prev) => ({
        ...prev,
        [activeTab]: { ...DEFAULT_MAP[activeTab] },
      }));
      toast.info(`Media direset ke default. Klik 'Simpan Perubahan' untuk menerapkan.`);
    }
  };

  const handleTabChange = (key: HeroPageKey) => {
    if (hasDirtyCurrent) {
      const confirmLeave = confirm(
        'Ada perubahan yang belum disimpan pada tab ini. Lanjutkan berpindah tab?'
      );
      if (!confirmLeave) return;
    }
    setActiveTab(key);
    router.replace(`/admin/hero?tab=${key}`, { scroll: false });
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Top Header - Sticky bar */}
      <div className="sticky top-0 z-30 -mx-6 px-6 py-4 bg-slate-100/90 backdrop-blur-md border-b border-slate-200 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Hero Video & Media</h1>
              <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                1 Halaman Terpadu
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola video background dan poster thumbnail untuk seluruh halaman publik.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={activePageMeta.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-amber-600 transition-colors shadow-xs"
            >
              <LuExternalLink className="w-3.5 h-3.5" />
              <span>Lihat di Web ({activePageMeta.path})</span>
            </a>

            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || !hasDirtyCurrent}
              className={
                hasDirtyCurrent
                  ? 'bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20'
                  : 'opacity-70'
              }
            >
              {saving ? 'Menyimpan…' : hasDirtyCurrent ? 'Simpan Perubahan' : 'Tersimpan'}
            </Button>
          </div>
        </div>

        {/* 5 Page Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
          {HERO_PAGES.map((page) => {
            const isActive = activeTab === page.key;
            const isDirty =
              JSON.stringify(data[page.key]) !== JSON.stringify(savedData[page.key]);

            return (
              <button
                key={page.key}
                type="button"
                onClick={() => handleTabChange(page.key)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-md shadow-black/10'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 hover:text-slate-900'
                }`}
              >
                <LuFilm
                  className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}
                />
                <span>{page.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-white/15 text-neutral-300'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {page.path}
                </span>
                {isDirty && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Ada perubahan belum disimpan" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Player & Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Live Video Preview — {activePageMeta.label}</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Tampilan langsung hero video di halaman publik ({activePageMeta.path}).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <LuVolumeX className="w-4 h-4" /> : <LuVolume2 className="w-4 h-4" />}
                  <span className="text-[10px] font-medium">{isMuted ? 'Muted' : 'Audio On'}</span>
                </button>
              </div>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-slate-800 shadow-inner group">
              {currentHero.video ? (
                <video
                  ref={videoRef}
                  key={currentHero.video}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster={currentHero.poster || undefined}
                  className="w-full h-full object-cover"
                >
                  <source src={currentHero.video} type="video/mp4" />
                  Browser Anda tidak mendukung video HTML5.
                </video>
              ) : currentHero.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentHero.poster}
                  alt={currentHero.alt || 'Hero Poster'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <LuFilm className="w-8 h-8 opacity-40" />
                  <span className="text-xs">Belum ada video atau poster terpilih.</span>
                </div>
              )}

              {/* Overlay Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-white/90 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{activePageMeta.path}</span>
              </div>

              {/* Overlay Alt Text Preview if available */}
              {(currentHero.alt || currentHero.altEn) && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-white/80 truncate">
                  <span className="font-semibold text-amber-300">Alt: </span>
                  {currentHero.alt || currentHero.altEn}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span className="truncate max-w-xs text-[11px] font-mono text-slate-400">
                Source: {currentHero.video || '(tidak ada)'}
              </span>
              <button
                type="button"
                onClick={handleResetToDefault}
                className="text-slate-500 hover:text-amber-600 transition-colors flex items-center gap-1 text-[11px] font-medium cursor-pointer"
              >
                <LuRotateCcw className="w-3 h-3" />
                <span>Reset ke Default</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Upload Controls & Alt Texts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Video Upload Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <LuFilm className="w-4 h-4 text-amber-500" />
                <span>Background Video</span>
              </label>
              <span className="text-[10px] font-mono text-slate-400">MP4 / WEBM (Max 10MB)</span>
            </div>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm"
              onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
              className="hidden"
            />

            <div
              onClick={() => !uploadingVideo && videoInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handleVideoUpload(file);
              }}
              className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                uploadingVideo
                  ? 'bg-amber-50/50 border-amber-300'
                  : 'bg-slate-50 hover:bg-amber-50/30 border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-600">
                {uploadingVideo ? (
                  <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LuUpload className="w-5 h-5 text-amber-500" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {uploadingVideo ? 'Mengunggah video…' : 'Klik atau Tarik File Video ke Sini'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Format MP4 (H.264), optimal 1920×1080 ~2-8MB
                </p>
              </div>
            </div>

            {currentHero.video && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate font-mono text-[11px] text-slate-700">
                    {currentHero.video.split('/').pop()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => updateCurrentField('video', '')}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                  title="Hapus Video"
                >
                  <LuTrash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Poster Image Upload Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <LuImage className="w-4 h-4 text-emerald-500" />
                <span>Poster Thumbnail</span>
              </label>
              <span className="text-[10px] font-mono text-slate-400">JPG, PNG, WEBP</span>
            </div>

            <input
              ref={posterInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={(e) => e.target.files?.[0] && handlePosterUpload(e.target.files[0])}
              className="hidden"
            />

            <div
              onClick={() => !uploadingPoster && posterInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) handlePosterUpload(file);
              }}
              className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer flex items-center gap-3 ${
                uploadingPoster
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-slate-50 hover:bg-emerald-50/30 border-slate-200 hover:border-emerald-400'
              }`}
            >
              {currentHero.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentHero.poster}
                  alt="Poster"
                  className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                  <LuImage className="w-6 h-6" />
                </div>
              )}

              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800">
                  {uploadingPoster ? 'Mengunggah poster…' : 'Pilih / Ganti Poster'}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {currentHero.poster
                    ? currentHero.poster.split('/').pop()
                    : 'Ditampilkan saat video sedang loading'}
                </p>
              </div>

              {uploadingPoster && (
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin shrink-0" />
              )}
            </div>
          </div>

          {/* Alt Text (Accessibility & SEO) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Deskripsi & Alt Text (SEO)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Alt Text (Bahasa Indonesia)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Arsitektur modern tropis saat senja"
                  value={currentHero.alt}
                  onChange={(e) => updateCurrentField('alt', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Alt Text (English)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern tropical architectural residence at dusk"
                  value={currentHero.altEn}
                  onChange={(e) => updateCurrentField('altEn', e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Floating Bottom Action Bar on Scroll */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl transition-all duration-300 ${
          isScrolled || hasDirtyCurrent
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-neutral-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <LuFilm className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Hero — {activePageMeta.label}</span>
                {hasDirtyCurrent ? (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-400 text-black rounded-md uppercase">
                    Belum Disimpan
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-emerald-500/20 text-emerald-300 rounded-md uppercase">
                    Tersimpan
                  </span>
                )}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                {activePageMeta.path}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Reset
            </button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving || !hasDirtyCurrent}
              className={
                hasDirtyCurrent
                  ? 'bg-amber-400 hover:bg-amber-300 text-black font-bold shadow-md shadow-amber-400/20 px-4 py-2 text-xs'
                  : 'opacity-60 px-4 py-2 text-xs'
              }
            >
              {saving ? 'Menyimpan…' : 'Simpan Perubahan'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Backward compatibility for single section invocation
export function HeroMediaEditor({
  sectionKey,
  label,
  initialValue,
  previewPath,
}: {
  sectionKey: string;
  label: string;
  initialValue: HeroMediaValue;
  previewPath: string;
}) {
  return (
    <HeroMediaManager
      initialData={{ [sectionKey]: initialValue }}
      initialTab={sectionKey}
    />
  );
}
