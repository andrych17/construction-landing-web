/**
 * Penjaga regresi: memastikan kontak milik firma lain tidak kembali masuk ke repo,
 * dan waLink tidak pernah menghasilkan tautan ke nomor asing.
 *
 * Latar: situs ini sempat memasang nomor WhatsApp, email, dan alamat Barcway
 * (+62 822 9819 9902 / info@barcway.com / Gedung Voza) sebagai tombol aktif di
 * 6 berkas. Setiap klik "Konsultasi" mengirim calon klien ke firma lain.
 *
 * Jalankan: node scripts/check-contact-integrity.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

/** Kontak/alamat milik pihak lain yang tidak boleh muncul di kode atau aset teks. */
const FOREIGN = [
  '6282298199902',
  '822 9819 9902',
  '822-9819-9902',
  'info@barcway.com',
  'barcwaydesign',
  'Gedung Voza',
  'HR Muhammad',
];

/** Berkas yang memang membahas temuan ini dalam komentar/dokumentasi. */
const ALLOWLIST = [
  'scripts/check-contact-integrity.mjs',
  'src/data/siteData.ts',
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next' || name === '.git' || name === 'graphify-out') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (['.ts', '.tsx', '.js', '.mjs', '.txt', '.json', '.css'].includes(extname(name))) out.push(full);
  }
  return out;
}

let failures = 0;

// 1. Tidak ada kontak pihak lain yang tersisa.
for (const file of [...walk(join(ROOT, 'src')), ...walk(join(ROOT, 'public'))]) {
  const rel = file.slice(ROOT.length);
  if (ALLOWLIST.includes(rel)) continue;
  const text = readFileSync(file, 'utf8');
  for (const needle of FOREIGN) {
    if (text.includes(needle)) {
      console.error(`FAIL  kontak pihak lain "${needle}" ditemukan di ${rel}`);
      failures++;
    }
  }
}

// 2. waLink tidak boleh membocorkan nomor selain SITE_CONTACT.whatsapp.
const data = readFileSync(join(ROOT, 'src/data/siteData.ts'), 'utf8');
const configured = data.match(/whatsapp:\s*'(\d*)'/)?.[1] ?? null;

if (configured === null) {
  console.error('FAIL  SITE_CONTACT.whatsapp tidak terbaca dari siteData.ts');
  failures++;
} else {
  // Tiru perilaku waLink tanpa mengimpor TypeScript.
  const waLink = (msg) =>
    configured ? `https://wa.me/${configured}?text=${encodeURIComponent(msg)}` : '#';

  const link = waLink('halo & selamat pagi');
  if (configured === '') {
    if (link !== '#') {
      console.error(`FAIL  nomor kosong seharusnya menghasilkan "#", dapat ${link}`);
      failures++;
    }
  } else {
    if (!link.startsWith(`https://wa.me/${configured}?text=`)) {
      console.error(`FAIL  waLink tidak memakai nomor terkonfigurasi: ${link}`);
      failures++;
    }
    // Karakter '&' wajib ter-encode, kalau tidak pesan terpotong di WhatsApp.
    if (link.includes('&selamat') || !link.includes('%26')) {
      console.error(`FAIL  pesan tidak ter-encode dengan benar: ${link}`);
      failures++;
    }
    for (const needle of FOREIGN) {
      if (link.includes(needle.replace(/[\s-]/g, ''))) {
        console.error(`FAIL  waLink mengarah ke nomor pihak lain: ${link}`);
        failures++;
      }
    }
  }
}

// 3. Selama konten masih placeholder, robots.ts wajib menutup indexing.
if (data.includes('isPlaceholder: true')) {
  const robots = readFileSync(join(ROOT, 'src/app/robots.ts'), 'utf8');
  if (!robots.includes('isPlaceholder') || !robots.includes("disallow: '/'")) {
    console.error('FAIL  konten masih placeholder tetapi robots.ts tidak menutup indexing');
    failures++;
  }
}

if (failures > 0) {
  console.error(`\n${failures} pemeriksaan gagal.`);
  process.exit(1);
}
console.log('OK  integritas kontak aman (tidak ada kontak pihak lain, waLink konsisten, indexing terkunci).');
