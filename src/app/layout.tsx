import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Baskervville } from "next/font/google";
import "./globals.css";
import ArchitecturalPreloader from "@/components/interactive/ArchitecturalPreloader";
import { SITE_CONTACT } from "@/data/siteData";

const baskervville = Baskervville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wwconstruction.id"),
  title: {
    default: "ww.cons | Architecture & General Contractor Surabaya",
    template: "%s | ww.cons",
  },
  description:
    "ww.cons is a visionary architecture, interior design, and general contracting firm in Surabaya. Specializing in luxury residences, commercial landmarks, and high-precision civil engineering.",
  keywords: [
    "ww.cons",
    "ww cons",
    "wonderful works",
    "wonderfulworks",
    "wonderful works surabaya",
    "ww construction",
    "arsitektur surabaya",
    "kontraktor surabaya",
    "general contractor surabaya",
    "jasa bangun rumah surabaya",
    "luxury residence surabaya",
    "kontraktor semolowaru surabaya",
  ],
  authors: [{ name: "ww.cons Studio" }],
  creator: "ww.cons",
  publisher: "ww.cons",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "ww.cons | Architecture & General Contractor Surabaya",
    description:
      "Bringing Your Vision to Life with Expert Craftmanship. Architecture, interior design, and precision general contracting in Surabaya and East Java.",
    url: "https://wwconstruction.id",
    siteName: "ww.cons",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/projects/hero_poster.jpg",
        width: 1200,
        height: 630,
        alt: "ww.cons - Architecture & General Contractor Surabaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ww.cons (@ww.cons)",
    description:
      "Bringing Your Vision to Life with Expert Craftmanship. Architecture, Interior, and General Contracting in Surabaya.",
    images: ["/images/projects/hero_poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Ikon tidak didaftarkan di sini. Next.js App Router memungutnya otomatis
  // dari src/app/icon.svg dan src/app/apple-icon.png.
  // Sebelumnya keduanya menunjuk PNG 150x150 — di bawah minimum 180x180 yang
  // diminta iOS, sehingga ikonnya buram saat ditambahkan ke Home Screen.
  // Canonical per-rute didefinisikan di masing-masing src/app/<rute>/layout.tsx.
  // Jangan set canonical global di sini: seluruh halaman akan ikut
  // mengkanonikalkan diri ke homepage dan hilang dari indeks.
  alternates: {
    canonical: "/",
  },
};

const structuredSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["GeneralContractor", "ProfessionalService", "LocalBusiness"],
      "@id": "https://wwconstruction.id/#contractor",
      "name": "ww.cons",
      "legalName": "Wonderful Works Construction",
      "alternateName": [
        "WW.CONS",
        "Wonderful Works Studio",
        "WW Construction Surabaya",
        "@ww.cons",
      ],
      "url": "https://wwconstruction.id",
      "logo": "https://wwconstruction.id/images/ww/logo-512.png",
      "image": "https://wwconstruction.id/images/projects/hero_poster.jpg",
      "description":
        "ww.cons adalah studio arsitektur dan kontraktor umum terkemuka di Surabaya. Menghadirkan kemewahan monolitik, eksplorasi material jujur, dan presisi rekayasa sipil berstandar SNI K-350.",
      // Bersumber dari SITE_CONTACT. Field yang belum terkonfirmasi (email, geo)
      // sengaja dikosongkan — structured data yang salah lebih merugikan.
      "telephone": `+${SITE_CONTACT.whatsapp}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_CONTACT.studio.lines[0],
        "addressLocality": "Surabaya",
        "addressRegion": "Jawa Timur",
        "addressCountry": "ID",
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          "opens": "08:00",
          "closes": "18:00",
        },
      ],
      "areaServed": [
        { "@type": "City", "name": "Surabaya" },
        { "@type": "City", "name": "Sidoarjo" },
        { "@type": "City", "name": "Gresik" },
        { "@type": "City", "name": "Malang" },
        { "@type": "AdministrativeArea", "name": "Jawa Timur" },
      ],
      "sameAs": [SITE_CONTACT.instagram],
      "slogan": "Bringing Your Vision to Life with Expert Craftmanship",
      "priceRange": "$$$$",
    },
    {
      "@type": "WebSite",
      "@id": "https://wwconstruction.id/#website",
      "url": "https://wwconstruction.id",
      "name": "Wonderful Works Construction",
      "publisher": {
        "@id": "https://wwconstruction.id/#contractor",
      },
      "inLanguage": "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark bg-[#030303]" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
        />
      </head>
      <body
        className={`${baskervville.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans bg-[#030303] text-neutral-100 antialiased selection:bg-amber-400 selection:text-black min-h-screen`}
      >
        <ArchitecturalPreloader />
        {children}
      </body>
    </html>
  );
}
