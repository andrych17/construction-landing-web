# WW Construction Website

Website portfolio profesional untuk WW Construction yang dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan Framer Motion.

## Fitur

- ✨ **Animasi Modern** - Menggunakan Framer Motion untuk animasi yang smooth dan menarik
- 📱 **Responsive Design** - Tampilan optimal di semua ukuran layar
- 🎨 **UI Modern** - Desain profesional dengan Tailwind CSS
- ⚡ **Performance** - Dibangun dengan Next.js 14 App Router untuk performa terbaik
- 🔧 **TypeScript** - Type-safe untuk development yang lebih baik

## Teknologi yang Digunakan

- [Next.js 14](https://nextjs.org/) - React Framework
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Icons](https://react-icons.github.io/react-icons/) - Icon Library

## Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser dan akses [http://localhost:3000](http://localhost:3000)

## Struktur Proyek

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
└── components/
    ├── Navbar.tsx       # Navigation bar
    ├── Hero.tsx         # Hero section
    ├── Services.tsx     # Services section
    ├── About.tsx        # About section
    ├── Projects.tsx     # Projects portfolio
    ├── Contact.tsx      # Contact form
    └── Footer.tsx       # Footer
```

## Customization

### Mengganti Foto Proyek
Foto proyek saat ini menggunakan placeholder. Untuk mengganti dengan foto asli:
1. Tambahkan gambar ke folder `public/projects/`
2. Update komponen `Projects.tsx` untuk menggunakan gambar tersebut

### Mengubah Konten
- **Teks**: Edit langsung di file komponen terkait
- **Warna**: Modifikasi di `tailwind.config.ts` atau langsung di class Tailwind
- **Animasi**: Sesuaikan parameter Framer Motion di setiap komponen

## Build untuk Production

```bash
npm run build
npm start
```

## Lisensi

© 2024 WW Construction. All rights reserved.
