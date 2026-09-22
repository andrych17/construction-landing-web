# Hero Video — Panduan & Koleksi Prompt Google Flow (Veo 3.1)

Dokumentasi resmi dan panduan prompt untuk membuat ulang video latar *Hero Homepage* **Wonderful Works (`ww.cons`)**.

---

## 1. Batasan & Komposisi Tampilan Layar (Layout Fit)

Komponen Hero di [`src/components/layouts/MainLayout.tsx`](file:///home/spil/projects/personal/construction-landing-web/src/components/layouts/MainLayout.tsx) menggunakan `object-cover` pada kontainer `100dvh` dengan `scale-105`:

| Ukuran Layar | Area Video yang Terlihat | Catatan Komposisi |
| :--- | :--- | :--- |
| **Desktop (1440×900 / 1920×1080)** | ~90% (Hampir penuh) | Panorama terlihat megah |
| **Tablet (768×1024)** | ~42% (Bagian tengah) | Sisi kiri & kanan terpotong |
| **HP / Smartphone (390×844)** | **~26% (Seperempat tengah)** | **Wajib fokus subjek di tengah!** |

### Pembagian Vertikal Frame:
```
 0% – 25%   [Area Navbar]      → Tertutup gradien gelap tipis navbar
25% – 55%   [PITA BERSIH]      → Subjek utama bangunan & arsitektur berada di sini
55% – 100%  [Area Teks Hero]   → Tertutup gradien hitam + Wordmark "ww.cons"
```

> **Aturan Komposisi**: 
> 1. Letakkan bangunan/fasad utama tepat di **tengah horizontal**.
> 2. Bagian bawah frame (55% ke bawah) harus relatif gelap dan polos agar teks wordmark `ww.cons` dan tombol aksi tetap terbaca sangat tajam.

---

## 2. Koleksi Prompt Text-to-Video (T2V) Siap Pakai

Tersedia varian file prompt di folder `docs/hero-video/` yang bisa langsung di-copy-paste ke Google Flow / Veo 3.1:

| File | Tema & Karakteristik | Rekomendasi |
| :--- | :--- | :--- |
| [`01-villa-golden-hour.txt`](file:///home/spil/projects/personal/construction-landing-web/docs/hero-video/01-villa-golden-hour.txt) | **Modern Tropical Villa at Dusk & Twilight** | ⭐ **Pilihan Utama (Paling Mewah)** |
| [`02-concrete-structure.txt`](file:///home/spil/projects/personal/construction-landing-web/docs/hero-video/02-concrete-structure.txt) | **Monolithic Concrete K-350 & Structural Steel** | Menonjolkan sisi teknik sipil / kontraktor |
| [`03-material-detail.txt`](file:///home/spil/projects/personal/construction-landing-web/docs/hero-video/03-material-detail.txt) | **Macro Material Detail (Travertine + Teak)** | Paling tenang & mulus untuk seamless loop |
| [`05-waterfront-villa-dusk.txt`](file:///home/spil/projects/personal/construction-landing-web/docs/hero-video/05-waterfront-villa-dusk.txt) | **Luxury Waterfront Villa & Reflection Pool** | Efek air tenang memantulkan cahaya malam |
| [`06-inside-out-atrium.txt`](file:///home/spil/projects/personal/construction-landing-web/docs/hero-video/06-inside-out-atrium.txt) | **Inside-Out Double-Height Marble Living Atrium** | Alur spasial dalam ke luar |
| [`04-logo-bumper.txt`](file:///home/spil/projects/personal/construction-landing-web/docs/hero-video/04-logo-bumper.txt) | **Emblem Logo Reveal (Image-to-Video)** | Khusus animasi logo dengan start frame |

---

## 3. Aturan Prompt Veo 3.1 (Anti-Glitch / Anti AI Slop)

1. **Text-to-Video All-in-One**: Cukup masukkan blok `PROMPT` dan `NEGATIVE PROMPT` ke Google Flow.
2. **Tanpa Manusia (`no people, no faces`)**: Menghindari karakter AI yang berjalan aneh atau glitch.
3. **Tanpa Teks / Logo di Video (`no text, no watermark`)**: Teks `ww.cons` sudah dirender otomatis oleh Next.js di atas video dengan font Baskervville tajam.
4. **Gerakan Kamera Tunggal (`one continuous slow movement`)**: Cukup 1 gerakan halus (*slow forward push-in* atau *slow lateral pan*).

---

## 4. Spesifikasi File Keluaran & Cara Pasang

| Parameter | Nilai Target |
| :--- | :--- |
| **Resolusi** | 1920×1080 (1080p) atau 2560×1440 (2K) |
| **Aspek Rasio** | **16:9** Widescreen |
| **Durasi** | 8 – 10 detik |
| **Format** | MP4 / H.264 |
| **Ukuran Target** | **≤ 4 MB** *(web optimized)* |
| **Path Tujuan** | `public/videos/hero.mp4` |
| **Poster Path** | `public/images/projects/hero_poster.jpg` |

### Perintah Kompresi FFmpeg (Opsional):
Jika file video hasil unduhan dari Google Flow terlalu besar (> 10 MB), jalankan perintah ini di terminal:

```bash
# 1. Kompres video ke ukuran web-ready (~2-3 MB)
ffmpeg -i hasil_flow.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow -movflags +faststart public/videos/hero.mp4

# 2. Ambil 1 frame pertama sebagai gambar poster cadangan (fallback)
ffmpeg -i public/videos/hero.mp4 -vframes 1 -q:v 3 public/images/projects/hero_poster.jpg
```

---

## 5. Checklist Verifikasi Sebelum Selesai:
- [ ] Video berformat 16:9 MP4
- [ ] Subjek bangunan terpusat di tengah frame
- [ ] Bagian bawah frame gelap dan polos untuk keterbacaan teks
- [ ] Tanpa teks / logo / wajah orang di dalam video
- [ ] File diletakkan di `public/videos/hero.mp4`
- [ ] Web `http://localhost:3000` memutar video baru dengan mulus
