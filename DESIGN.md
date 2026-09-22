# DESIGN SYSTEM & ARCHITECTURAL INTERACTION MANIFESTO
**Project:** ww.cons (`ww.cons` / Wonderful Works Construction — `wwconstruction.id`)  
**Flagship Foundation:** Authentically Rooted in Barcway (`barcway.com`) & Centra Arya Loka Engineering Rigor  
**Target Standard:** Awwwards Site of the Day / Luxury Architectural Grade  
**Default Flagship Layout:** `barcway` (01. WW.CONS Baseline Flagship)  
**Layout Standards:** True Full-Width Edge-to-Edge (`max-w-[1800px]`, `px-6 md:px-16 lg:px-20`)  
**Directives Enforced:** Anti-AI Slop Directive + UI/UX Pro Max Accessibility & Tactile Feedback  
**Engine:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Framer Motion 12  

---

## 1. Executive Summary: The Anti-AI-Slop Teardown

### A. Diagnosa: Mengapa betadesain.com Terasa "Full AI & Jelek"?
Meskipun memiliki fitur interaktif yang lengkap di atas kertas, eksekusi `betadesain.com` menderita sejumlah **"AI Slop Tells"** yang menurunkan nilai persepsi (*perceived value*) sebuah biro arsitektur/desain:
1. **Gimmick Wireframe Melayang yang Tidak Relevan:**
   - SVG poligon, lingkaran, dan kotak berputar tanpa bobot di latar belakang (`.ambient-shapes`). Ini adalah template cliché AI yang tidak mencerminkan fisik material konstruksi nyata.
2. **Micro-Delay Huruf yang Melelahkan:**
   - Text animation yang memecah tiap huruf (`--d: 0.025s` per character) membuat headline terasa seperti efek teks generator murahan, bukan *editorial typographic rhythm*.
3. **Detail Aksen Sci-Fi / Gaming:**
   - Sudut tombol menggunakan bracket sudut digital (`.btn-hero-corner-tl`), bukan *craftsmanship* arsitektural. Desain arsitektur mewah bertumpu pada *hairline joints*, *reveals*, dan *bevels*, bukan hiasan ala dashboard game.
4. **Copywriting Template Klise:**
   - Marquee teks berulang 4 kali dengan slogan klise AI: *"Architecture is Frozen Music"*, *"Form Follows Feeling"*, *"Spaces That Endure"*. Tidak ada bukti proyek nyata, sertifikasi SNI, atau rekayasa struktural.
5. **Kelebihan Fitur Tanpa Hirarki Visual:**
   - Menjejalkan cursor follower, ticker marquee, stats counter, floating shapes, mega menu 7 kolom, dan section rail sekaligus tanpa *macro-whitespace* yang cukup, membuat layout terasa sesak dan bising.

---

### B. Anatomi Keunggulan 3 Benchmark Referensi

| Aspek | Centra Arya Loka (`centraaryaloka.com`) | Barcway (`barcway.com`) | KantorGG (`kantorgg.com`) |
| :--- | :--- | :--- | :--- |
| **Jiwa / Identitas** | Provenance 35+ tahun dari bengkel konstruksi baja Surabaya hingga kontraktor & metal artisan modern (Cal.idn & Metalworks). | Kemewahan monolitik sunyi (*quiet dark luxury*), percaya diri, elegan tanpa trik murahan. | Arsitektur bespoke kontemporer: *"Monolithic and Biophilic, Outlandish and Understated"*. |
| **Tipografi** | Clean industrial sans dengan hirarki korporat yang kokoh. | Baskervville Serif berbobot tinggi dipadu sans modern berjarak renggang (*spaced tracking*). | High-fashion editorial serif, layout majalah (*Zine publication*), micro-eyebrow tags. |
| **Materialitas** | Menampilkan fabrikasi logam presisi, rekayasa fasad, dan kolaborasi arsitek ternama. | Tekstur batu alam, marmer, kayu eksotis, dan pencahayaan dramatis natural. | Kantilever masif, bukaan tropis, kolam tanpa batas (*infinity pools*), batuan monolitik. |
| **Ritme Spasial** | Teratur, fungsional, berorientasi hasil nyata. | Massive negative space, full-bleed imagery tanpa batas buatan. | Asymmetric split layout, ritme editorial majalah arsitektur papan atas. |

---

## 2. Visual Theme & Calibrated Atmosphere

### Spectrum Coordinates
- **Density:** `3/10` — *Art Gallery Airy*. Macro-whitespace lapang (`py-28` hingga `py-40`). Setiap karya bernapas lega.
- **Variance:** `8/10` — *Offset Asymmetric*. Mematahkan layout simetris 3-kolom standar AI; menggunakan ritme split 60/40, cascade z-axis, dan grid tektonik.
- **Motion:** `7/10` — *Cinematic Mass & Spring*. Semua transisi mensimulasikan massa fisik inersia nyata (pintu geser galeri, tirai partisi, redaman fluida hidrolik).

### The Color Calibration (Single Palette Integrity)
*Prinsip: Tidak ada neon purple/blue glows. Menggunakan palet Obsidian & Tectonic Earth yang terkalibrasi.*

```css
:root {
  /* Surface Layers (Deep Obsidian & Basalt) */
  --surface-ground: #07090E;      /* Deepest obsidian foundation */
  --surface-elevated: #0D111A;    /* Machined panel surface */
  --surface-overlay: #131926;     /* Double-bezel inner tray */
  --surface-light: #FBFBFA;       /* Warm Italian alabaster for text */

  /* Architectural Hairlines & Tectonic Borders */
  --hairline-subtle: rgba(255, 255, 255, 0.07);  /* 1px structural grid lines */
  --hairline-active: rgba(217, 119, 6, 0.35);     /* Active Amber/Ochre guide */
  --glass-substrate: rgba(13, 17, 26, 0.72);      /* Backdrop blur core */

  /* Typography Colors */
  --text-monumental: #F9FAFB;     /* Headings, crisp high-contrast */
  --text-editorial: #94A3B8;      /* Body copy, calm slate */
  --text-technical: #64748B;      /* Specs, coordinates, SNI notations */

  /* Singular Accent (Warm Architectural Bronze / Amber Ochre) */
  --accent-ochre: #D97706;        /* Primary accent, under 75% saturation */
  --accent-ochre-glow: rgba(217, 119, 6, 0.12); /* Subtle haptic ambient */
}
```

---

## 3. Typographic Architecture & Rules

### Font Hierarchy
1. **Display / Headline (Monumental Editorial):**
   - **Primary:** Modern Luxury Serif (`Baskervville` / `Playfair Display` / `Instrument Serif` / `PP Editorial New`).
   - **Characteristics:** Track-tight (`tracking-[-0.03em]`), optical kerning, relaxed line-height (`leading-[1.08]`). Huruf tidak "berteriak", melainkan anggun seperti prasasti monolit.
2. **Body & Interface (Precision Grotesk):**
   - **Primary:** `Plus Jakarta Sans` / `Geist Sans`.
   - **Characteristics:** Max line length 62 karakter (`max-w-[62ch]`), leading santai (`leading-relaxed`), berat font `300` (Light) hingga `400` (Regular).
3. **Telemetry & Engineering Spec (Drafting Mono):**
   - **Primary:** `JetBrains Mono`.
   - **Characteristics:** Tracking lebar (`tracking-[0.18em]`), uppercase, untuk data struktural: koordinat lokasi, mutu beton `K-350`, SNI, elevasi `+0.00`, status toleransi `±0.5mm`.

### Typographic Anti-Patterns (BANNED)
- ❌ **Inter** untuk display/headline arsitektural.
- ❌ **Comic Sans**, **Papyrus**, atau sans-serif generik tanpa karakter.
- ❌ **Gradient text pelangi / AI holographic**.
- ❌ **Character-by-character split delays** tanpa konteks kata (menghindari efek teks "mengetik" murahan).

---

## 4. Reverse-Engineered & Elevated Interaction Engine

Kami mengadopsi seluruh rangkaian fitur interaktif dari `betadesain.com`, namun membersihkannya dari elemen murahan dan meningkatkan standar eksekusinya ke level Awwwards:

```
+-----------------------------------------------------------------------------------+
| 0. ARCHITECTURAL PRELOADER & 5-PANEL CURTAIN REVEAL                               |
|    [Monogram Mask Reveal] -> [Progress 0-100%] -> [5-Panel Vertical Curtain Shutter] |
+-----------------------------------------------------------------------------------+
| 1. FLUID ISLAND HEADER & FULLSCREEN ARCHITECTURAL MEGA-MENU                      |
|    [Floating Capsule Nav] <---> [Full-Viewport Mega Menu + Live Image Morph]      |
+-----------------------------------------------------------------------------------+
| 2. CINEMATIC HERO STAGE WITH DOCK CONTROLLER                                      |
|    - Full-Bleed 100dvh Stage with Ken-Burns Motion (1.06 -> 1.00)                 |
|    - Word-Masked Line Stagger (Framer Motion cubic-bezier)                        |
|    - Architectural Bottom Dock: Slide Index [01/03] + Realtime Segment Progress    |
+-----------------------------------------------------------------------------------+
| 3. SPATIAL TELEMETRY (RIGHT-HAND SECTION RAIL)                                    |
|    - Coordinates indicator tracking active section via IntersectionObserver        |
+-----------------------------------------------------------------------------------+
| 4. DOUBLE-BEZEL CRAFTSMANSHIP & PROJECT SPECIFICATION DRAWER                      |
|    - Nested milled aluminum aesthetic + In-depth Engineering Inspection Modal     |
+-----------------------------------------------------------------------------------+
```

---

### Phase 1: Architectural Preloader & 5-Panel Curtain Unmasking
*Menggantikan spinner generik dan logo bar polos betadesain dengan transisi tirai arsitektur bersekat 5.*

- **Komponen:** `src/components/interactive/ArchitecturalPreloader.tsx`
- **Mekanisme Gerak:**
  1. **T = 0.0s – 1.0s:** Layar tertutup obsidian penuh (`#07090E`). Monogram emas `WW` muncul perlahan dengan hairline stroke drafting.
  2. **T = 1.0s – 1.8s:** Angka persentase mono (`00%` → `100%`) bertambah halus seiring pemuatan aset visual esensial (dengan batas aman *failsafe* max 2.5s).
  3. **T = 1.8s – 2.6s (The 5-Panel Curtain):** Kontainer preloader terbagi menjadi 5 kolom vertikal (`5 columns curtain`), masing-masing ditarik ke atas secara bertingkat (*staggered delay* 0.06s per panel) menggunakan kurva inersia:
     ```css
     transition: transform 0.85s cubic-bezier(0.76, 0, 0.24, 1);
     ```
  4. Seketika hero canvas di belakangnya terungkap dengan efek *subtle scale-down* dari `1.08` ke `1.00`.

---

### Phase 2: Full-Bleed Cinematic Hero Stage & Dock Controller
*Mengadaptasi hero slider betadesain dengan tata letak editorial asimetris dan controller dermaga tektonik.*

- **Komponen:** `src/components/interactive/HeroCinematicStage.tsx`
- **Visual Presentation:**
  - Full viewport unit `min-h-[100dvh]` (kebal terhadap iOS Safari address bar resize).
  - Background slide layer: 3 master project slides (e.g. *Jotun Flagship Showroom*, *Private Classic Residence*, *Heavy Structural Engineering*).
  - Setiap pergantian slide menjalankan interpolasi *cross-fade* + *slow zoom out* (1.06 ke 1.00) selama 1.2 detik.
- **Typographic Reveal (Word-Masking):**
  - Bukan karakter per karakter, melainkan kata per baris yang muncul dari balik *overflow mask*:
    ```tsx
    <span className="inline-block overflow-hidden">
      <motion.span 
        initial={{ y: "110%", opacity: 0 }} 
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        Presisi Tanpa Kompromi.
      </motion.span>
    </span>
    ```
- **The Architectural Dock (Bottom Hub):**
  - **Kiri (Identity & Telemetry):**
    - `01 — 03` (Slide Counter berformat mono).
    - Lokasi & Tipe Rekayasa: e.g. `SURABAYA TIMUR · HEAVY COMMERCIAL FIT-OUT`.
  - **Tengah (Segmented Progress Bars):**
    - 3 kapsul bar horizontal dengan active fill timer berdurasi 6000ms.
    - Tombol chevron tipis (`<` / `>`) untuk pergantian manual. Hovering mem-pause timer.
  - **Kanan (Scroll Indicator):**
    - Teks mono `SCROLL TO EXPLORE ARCHIVE` dipadu garis hairline berkedip halus (*subtle pulse line*).

---

### Phase 3: Fullscreen Architectural Mega-Menu with Live Hover Preview
*Mengambil konsep kolom mega-menu betadesain dan menyempurnakannya menjadi galeri inspeksi arsitektur.*

- **Komponen:** `src/components/interactive/ArchitecturalMegaMenu.tsx`
- **Struktur Layout (Split 40 / 60):**
  - **Sisi Kiri (Live Viewport Frame):**
    - Frame gambar berasio 4:5 dengan doppelrand (*double-bezel* border).
    - Menampilkan preview foto proyek/layanan secara dinamis ketika kursor pengguna melintasi tautan navigasi di sisi kanan.
    - Transisi gambar menggunakan *opacity cross-dissolve* + *subtle scale shift* (1.04 ke 1.00) yang responsif tanpa lag.
  - **Sisi Kanan (Architectural Navigation Columns):**
    - **Kolom 1 (Disiplin Konstruksi):** Rancang Bangun Komersial, Residensial Mewah, Rekayasa Struktur & Baja, Tata Ruang Interior.
    - **Kolom 2 (Kredensial & Standar):** 5 Pilar Mutu, Uji Slump SNI, Transparansi RAB, Video Dokumenter Proyek.
    - **Kolom 3 (Concierge & Kontak):** Direct WhatsApp Engineer, Jadwal Konsultasi Lapangan, Head Office Surabaya.
  - **Tombol Tutup (Morphing Close):**
    - Ikon hamburger 2-garis berputar 45° secara mulus membentuk 'X' presisi, terkurung dalam kapsul hairlines.

---

### Phase 4: Spatial Telemetry (Right-Rail Section Indicator)
*Indikator navigasi samping yang anggun, melacak posisi pengguna pada kanvas panjang halaman.*

- **Komponen:** `src/components/interactive/SectionRailIndicator.tsx`
- **Fitur:**
  - Menempel pada sisi kanan layar (`fixed right-6 top-1/2 -translate-y-1/2 z-40`).
  - Menampilkan angka section aktif (`01`, `02`, `03`...) dalam tipografi mono emas ochre.
  - Garis hairline vertikal dinamis yang memanjang/memendek sesuai scroll depth.
  - Label nama section yang memudar (*fade-in*) lembut saat kursor mendekat atau section berubah.
  - Menggunakan native `IntersectionObserver` dengan debounce `requestAnimationFrame` untuk memastikan 0% reflow performance hit di perangkat mobile.

---

### Phase 5: Double-Bezel Craftsmanship & Project Inspection Modal
*Menghapus modal generic/lightbox default dan menggantinya dengan architectural drafting drawer.*

- **Prinsip Double-Bezel (Doppelrand):**
  - **Outer Shell:** Wrapper `bg-white/[0.03]` dengan hairline border `border border-white/10`, padding `p-1.5`, dan radius `rounded-2xl`.
  - **Inner Core:** Kontainer konten dengan latar `bg-[#0D111A]`, inner shadow highlight `shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]`, dan radius konsentris `rounded-[calc(1rem-0.125rem)]`.
- **Project Detail Drawer (Full Inspection):**
  - Mengklik kartu proyek membuka panel inspeksi mendalam:
    * Galeri foto resolusi tinggi dengan strip thumbnail horizontal.
    * Spesifikasi teknis: Mutu Beton, Dimensi Ruang, Toleransi Siku, Spesifikasi MEP, Material Fasad.
    * Client Brief & Architectural Problem-Solving narrative.
    * CTA direct: *"Minta Rekomendasi Teknis untuk Proyek Serupa"*.

---

## 5. Component Master Table & Behavioral States

| Komponen | Default State | Hover / Active State | Interaction Dynamics |
| :--- | :--- | :--- | :--- |
| **Primary Pill Button** | Obsidian fill, 1px amber border, text alabaster | Scale `0.98`, amber glow bertambah 20%, icon circle bergeser `translate-x-1 -translate-y-[1px]` | Spring physics (`damping: 25, stiffness: 300`) |
| **Slide Progress Bar** | Bar abu-abu transparan (`h-1 bg-white/20`) | Bar aktif terisi emas ochre dari 0% ke 100% dalam 6000ms | Animasi linier terinterpolasi GPU, pause saat hover |
| **Project Card** | Double-bezel border, foto monokrom hangat | Gambar zoom halus `scale-105`, overlay gelap memudar, badge teknis naik `translate-y-0` | Transisi 700ms `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Section Rail Indicator** | Opacity 40%, label nama tersembunyi | Opacity 100%, nama section muncul ke kiri dengan hairline arrow | Reveal berbasis IntersectionObserver |
| **Interactive Form Group** | Border tipis `border-white/10`, label di atas input | Focus ring amber ochre `ring-1 ring-amber-500/40`, background lebih pekat | Haptic feedback tanpa layout jumping |

---

## 6. Performance & Implementation Guardrails

1. **Zero Layout Shifts (CLS = 0):**
   - Semua elemen animasi hanya memanipulasi properti GPU-accelerated: `transform` (`translate3d`, `scale`) dan `opacity`.
   - Dilarang keras menganimasikan `top`, `left`, `width`, atau `height`.
2. **Backdrop Filter Restraint:**
   - Properti `backdrop-blur` hanya diizinkan pada floating navbar dan mega-menu overlay. Dilarang memasang filter blur pada kontainer yang di-scroll terus-menerus guna mencegah FPS drop pada mobile.
3. **Mobile-First Degradation (< 768px):**
   - Mega-menu pada mobile beralih ke *vertical architectural accordion* bersih tanpa image preview hover untuk menghemat bandwidth dan memori.
   - Section rail di sisi kanan disembunyikan pada layar di bawah `1024px` agar ruang layar tetap bersih.
   - Tinggi viewport selalu menggunakan `min-h-[100dvh]` (menghilangkan lonjakan layout pada mobile browser).
4. **Clean Asset Management:**
   - Semua gambar menggunakan Next.js `<Image />` dengan atribut `sizes`, `priority` untuk hero slides pertama, dan lazy loading untuk sisa galeri.

---

## 7. Implementation Roadmap & Milestones

1. **Milestone 1: State & Preloader Integration**
   - Pasang `ArchitecturalPreloader` dengan 5-panel shutter unmasking di layout utama.
2. **Milestone 2: Cinematic Hero Stage & Dock Hub**
   - Implementasikan carousel full-bleed berorientasi lanskap arsitektur Surabaya dengan dock kontrol di bawah.
3. **Milestone 3: Fullscreen Mega-Menu Overlay**
   - Buat drawer menu multi-kolom dengan live-preview hover image.
4. **Milestone 4: Section Rail & Architectural Portfolio Grid**
   - Aktifkan pelacak koordinat section di kanan dan kartu berarsitektur double-bezel dengan modal inspeksi teknis.
5. **Milestone 5: Verification & Anti-Slop Audit**
   - Validasi terhadap Pre-Output Checklist: memastikan 0 elemen cheesy AI, responsivitas 100%, dan performa 60fps konstan.
