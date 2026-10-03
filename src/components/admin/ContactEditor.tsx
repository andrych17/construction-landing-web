'use client';

import React, { useState } from 'react';
import { LuInstagram, LuMail, LuMapPin, LuPhone, LuFileText, LuPlus, LuTrash2 } from 'react-icons/lu';
import { Input, Textarea } from '@/components/admin/ui/Input';
import { Field } from '@/components/admin/ui/Field';
import { LangSwitch } from '@/components/admin/ui/LangSwitch';
import { DEFAULT_CONTACT_FORM, type ContactFormContent, type ContactFormOption } from '@/data/siteData';
import type { JsonValue } from '@/components/admin/JsonField';

type Place = { name?: string; lines?: string[] };

type ContactValue = {
  email?: string;
  emailLabel?: string;
  whatsapp?: string;
  whatsappLabel?: string;
  instagram?: string;
  instagramHandle?: string;
  isPlaceholder?: boolean;
  studio?: Place;
  workshop?: Place;
  form?: ContactFormContent;
};

function asContact(value: JsonValue): ContactValue {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as ContactValue;
}

function linesToText(lines: string[] | undefined): string {
  return (lines ?? []).join('\n');
}

function textToLines(text: string): string[] {
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

function Card({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <p className="text-xs leading-5 text-slate-600">{hint}</p>
        </div>
      </header>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}

function Labeled({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-5 text-slate-600">{hint}</p>}
    </div>
  );
}

export function ContactEditor({ value, onChange }: { value: JsonValue; onChange: (next: JsonValue) => void }) {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const contact = asContact(value);
  const formData: ContactFormContent = {
    ...DEFAULT_CONTACT_FORM,
    ...(contact.form || {}),
  };

  const patch = (next: Partial<ContactValue>) => onChange({ ...contact, ...next } as unknown as JsonValue);
  const patchPlace = (key: 'studio' | 'workshop', next: Partial<Place>) =>
    patch({ [key]: { ...contact[key], ...next } });

  const patchForm = (next: Partial<ContactFormContent>) => {
    patch({ form: { ...formData, ...next } });
  };

  const updateOption = (index: number, patchOpt: Partial<ContactFormOption>) => {
    const opts = [...(formData.projectTypeOptions || DEFAULT_CONTACT_FORM.projectTypeOptions)];
    opts[index] = { ...opts[index], ...patchOpt };
    patchForm({ projectTypeOptions: opts });
  };

  const addOption = () => {
    const opts = [...(formData.projectTypeOptions || DEFAULT_CONTACT_FORM.projectTypeOptions)];
    opts.push({ id: 'Custom', labelId: 'Opsi Baru', labelEn: 'New Option' });
    patchForm({ projectTypeOptions: opts });
  };

  const removeOption = (index: number) => {
    const opts = [...(formData.projectTypeOptions || DEFAULT_CONTACT_FORM.projectTypeOptions)];
    opts.splice(index, 1);
    patchForm({ projectTypeOptions: opts });
  };

  return (
    <div className="space-y-6">
      {/* Alamat & Kontak Utama */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card icon={LuMapPin} title="Kantor (OFFICE)" hint="Alamat resmi kantor Wonderful Works.">
          <Labeled id="studio-name" label="Label Nama Kantor">
            <Input
              id="studio-name"
              value={contact.studio?.name ?? 'OFFICE'}
              onChange={(e) => patchPlace('studio', { name: e.target.value })}
            />
          </Labeled>
          <Labeled id="studio-lines" label="Alamat Kantor" hint="Satu baris sama dengan satu baris alamat di situs.">
            <Textarea
              id="studio-lines"
              rows={4}
              value={linesToText(contact.studio?.lines)}
              onChange={(e) => patchPlace('studio', { lines: textToLines(e.target.value) })}
            />
          </Labeled>
        </Card>

        <Card icon={LuPhone} title="WhatsApp & Chat Langsung" hint="Nomor tujuan pengiriman pesan formulir konsultasi.">
          <Labeled id="contact-wa" label="Nomor WhatsApp (dengan kode negara tanpa +)">
            <Input
              id="contact-wa"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="628113313347"
              value={contact.whatsapp ?? ''}
              onChange={(e) => patch({ whatsapp: e.target.value })}
            />
          </Labeled>
          <Labeled id="contact-wa-label" label="Teks Nomor Tampil">
            <Input
              id="contact-wa-label"
              value={contact.whatsappLabel ?? ''}
              onChange={(e) => patch({ whatsappLabel: e.target.value })}
            />
          </Labeled>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card icon={LuMail} title="Email Resmi" hint="Alamat surat elektronik untuk pertanyaan umum.">
          <Labeled id="contact-email" label="Alamat Email">
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="Wonderful.work.cons@gmail.com"
              value={contact.email ?? ''}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </Labeled>
          <Labeled id="contact-email-label" label="Teks yang Tampil">
            <Input
              id="contact-email-label"
              value={contact.emailLabel ?? ''}
              onChange={(e) => patch({ emailLabel: e.target.value })}
            />
          </Labeled>
        </Card>

        <Card icon={LuInstagram} title="Instagram" hint="Tautan akun profil sosial media.">
          <Labeled id="contact-ig" label="Tautan URL Profil">
            <Input
              id="contact-ig"
              type="url"
              inputMode="url"
              placeholder="https://www.instagram.com/ww.cons/"
              value={contact.instagram ?? ''}
              onChange={(e) => patch({ instagram: e.target.value })}
            />
          </Labeled>
          <Labeled id="contact-ig-handle" label="Handle Akun (@...)">
            <Input
              id="contact-ig-handle"
              value={contact.instagramHandle ?? ''}
              onChange={(e) => patch({ instagramHandle: e.target.value })}
            />
          </Labeled>
        </Card>
      </div>

      {/* Formulir Konsultasi WhatsApp & Opsi Dropdown */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <LuFileText className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Teks Formulir Konsultasi & Pilihan Tipe Proyek ({lang.toUpperCase()})
              </h2>
              <p className="text-xs text-slate-500">
                Atur label formulir, teks tombol, dan opsi dropdown tipe proyek (Residential, Commercial, dll).
              </p>
            </div>
          </div>
          <LangSwitch value={lang} onChange={setLang} idLabel="Bahasa Indonesia" enLabel="English" />
        </header>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={`Judul Formulir (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.titleId : formData.titleEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { titleId: e.target.value } : { titleEn: e.target.value })
                }
              />
            </Field>
            <Field label={`Sub-judul / Badge Banner (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.subtitleId : formData.subtitleEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { subtitleId: e.target.value } : { subtitleEn: e.target.value })
                }
              />
            </Field>
          </div>

          {/* Opsi Dropdown Tipe Proyek */}
          <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Pilihan Dropdown Tipe Proyek (Project Type)
                </span>
                <p className="text-xs text-slate-500">
                  Opsi yang dapat dipilih klien saat mengisi formulir konsultasi (Residential, Commercial, dll).
                </p>
              </div>
              <button
                type="button"
                onClick={addOption}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-colors cursor-pointer"
              >
                <LuPlus className="w-3.5 h-3.5" />
                <span>Tambah Opsi</span>
              </button>
            </div>

            <div className="space-y-2">
              {(formData.projectTypeOptions || DEFAULT_CONTACT_FORM.projectTypeOptions).map((opt, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-400 w-6">0{idx + 1}</span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input
                      placeholder="Nilai Value / ID"
                      value={opt.id}
                      onChange={(e) => updateOption(idx, { id: e.target.value })}
                    />
                    <Input
                      placeholder="Label Tampil (ID)"
                      value={opt.labelId}
                      onChange={(e) => updateOption(idx, { labelId: e.target.value })}
                    />
                    <Input
                      placeholder="Label Tampil (EN)"
                      value={opt.labelEn}
                      onChange={(e) => updateOption(idx, { labelEn: e.target.value })}
                    />
                  </div>
                  {formData.projectTypeOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeOption(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Hapus opsi"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={`Label Nama Klien (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.nameLabelId : formData.nameLabelEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { nameLabelId: e.target.value } : { nameLabelEn: e.target.value })
                }
              />
            </Field>
            <Field label={`Placeholder Nama (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.namePlaceholderId : formData.namePlaceholderEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { namePlaceholderId: e.target.value } : { namePlaceholderEn: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={`Label No. WhatsApp (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.phoneLabelId : formData.phoneLabelEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { phoneLabelId: e.target.value } : { phoneLabelEn: e.target.value })
                }
              />
            </Field>
            <Field label={`Label Kota Lokasi (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.cityLabelId : formData.cityLabelEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { cityLabelId: e.target.value } : { cityLabelEn: e.target.value })
                }
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={`Label Catatan (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.notesLabelId : formData.notesLabelEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { notesLabelId: e.target.value } : { notesLabelEn: e.target.value })
                }
              />
            </Field>
            <Field label={`Placeholder Catatan (${lang.toUpperCase()})`}>
              <Input
                value={lang === 'id' ? formData.notesPlaceholderId : formData.notesPlaceholderEn}
                onChange={(e) =>
                  patchForm(lang === 'id' ? { notesPlaceholderId: e.target.value } : { notesPlaceholderEn: e.target.value })
                }
              />
            </Field>
          </div>

          <Field label={`Teks Tombol Kirim WhatsApp (${lang.toUpperCase()})`}>
            <Input
              value={lang === 'id' ? formData.submitTextId : formData.submitTextEn}
              onChange={(e) =>
                patchForm(lang === 'id' ? { submitTextId: e.target.value } : { submitTextEn: e.target.value })
              }
            />
          </Field>
        </div>
      </section>
    </div>
  );
}
