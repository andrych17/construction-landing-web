'use client';

import React from 'react';
import { LuInstagram, LuMail, LuMapPin, LuPhone, LuWarehouse } from 'react-icons/lu';
import { Input, Textarea } from '@/components/admin/ui/Input';
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
  const contact = asContact(value);
  const patch = (next: Partial<ContactValue>) => onChange({ ...contact, ...next });
  const patchPlace = (key: 'studio' | 'workshop', next: Partial<Place>) =>
    patch({ [key]: { ...contact[key], ...next } });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card icon={LuMapPin} title="Studio" hint="Alamat yang tampil sebagai kantor.">
          <Labeled id="studio-name" label="Nama">
            <Input
              id="studio-name"
              value={contact.studio?.name ?? ''}
              onChange={(e) => patchPlace('studio', { name: e.target.value })}
            />
          </Labeled>
          <Labeled id="studio-lines" label="Alamat" hint="Satu baris sama dengan satu baris alamat di situs.">
            <Textarea
              id="studio-lines"
              rows={4}
              value={linesToText(contact.studio?.lines)}
              onChange={(e) => patchPlace('studio', { lines: textToLines(e.target.value) })}
            />
          </Labeled>
        </Card>

        <Card icon={LuWarehouse} title="Workshop" hint="Alamat bengkel atau yard.">
          <Labeled id="workshop-name" label="Nama">
            <Input
              id="workshop-name"
              value={contact.workshop?.name ?? ''}
              onChange={(e) => patchPlace('workshop', { name: e.target.value })}
            />
          </Labeled>
          <Labeled id="workshop-lines" label="Alamat" hint="Satu baris sama dengan satu baris alamat di situs.">
            <Textarea
              id="workshop-lines"
              rows={4}
              value={linesToText(contact.workshop?.lines)}
              onChange={(e) => patchPlace('workshop', { lines: textToLines(e.target.value) })}
            />
          </Labeled>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card icon={LuMail} title="Email" hint="Alamat yang diklik pengunjung.">
          <Labeled id="contact-email" label="Email">
            <Input
              id="contact-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="hello@wwconstruction.id"
              value={contact.email ?? ''}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </Labeled>
          <Labeled id="contact-email-label" label="Teks yang tampil" hint="Boleh beda dengan alamat teknis, misalnya nama kotak surat.">
            <Input
              id="contact-email-label"
              value={contact.emailLabel ?? ''}
              onChange={(e) => patch({ emailLabel: e.target.value })}
            />
          </Labeled>
        </Card>

        <Card icon={LuPhone} title="WhatsApp" hint="Nomor tanpa tanda plus atau spasi.">
          <Labeled id="contact-wa" label="Nomor">
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
          <Labeled id="contact-wa-label" label="Teks yang tampil">
            <Input
              id="contact-wa-label"
              value={contact.whatsappLabel ?? ''}
              onChange={(e) => patch({ whatsappLabel: e.target.value })}
            />
          </Labeled>
        </Card>

        <Card icon={LuInstagram} title="Instagram" hint="Tautan profil dan nama yang terlihat.">
          <Labeled id="contact-ig" label="Tautan">
            <Input
              id="contact-ig"
              type="url"
              inputMode="url"
              placeholder="https://www.instagram.com/ww.cons/"
              value={contact.instagram ?? ''}
              onChange={(e) => patch({ instagram: e.target.value })}
            />
          </Labeled>
          <Labeled id="contact-ig-handle" label="Nama akun">
            <Input
              id="contact-ig-handle"
              value={contact.instagramHandle ?? ''}
              onChange={(e) => patch({ instagramHandle: e.target.value })}
            />
          </Labeled>
        </Card>

        <section className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Data contoh</h2>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Nyalakan kalau alamat dan kontak ini belum data resmi perusahaan.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={Boolean(contact.isPlaceholder)}
            onClick={() => patch({ isPlaceholder: !contact.isPlaceholder })}
            className={`relative h-11 w-16 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
              contact.isPlaceholder ? 'bg-amber-400' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-9 w-9 rounded-full bg-white shadow transition-transform duration-200 ${
                contact.isPlaceholder ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
            <span className="sr-only">{contact.isPlaceholder ? 'Data contoh aktif' : 'Data resmi'}</span>
          </button>
        </section>
      </div>
    </div>
  );
}
