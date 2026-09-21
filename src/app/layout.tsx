import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LayoutProvider } from "@/context/LayoutContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wwconstruction.id"),
  title: {
    default: "Wonderful Works Construction | General Contractor Surabaya",
    template: "%s | Wonderful Works Construction",
  },
  description:
    "Wonderful Works Construction (@ww.cons) adalah general contractor tepercaya di Surabaya. Melayani rancang bangun komersial, hunian mewah, renovasi struktural, dan fit-out interior dengan prinsip 'Quality is our priority'.",
  keywords: [
    "kontraktor surabaya",
    "general contractor surabaya",
    "jasa bangun rumah surabaya",
    "jasa kontraktor surabaya",
    "kontraktor ruko surabaya",
    "kontraktor renovasi surabaya",
    "wonderful works construction",
    "ww construction",
    "ww konstruksi",
    "kontraktor semolowaru",
    "kontraktor surabaya timur",
    "jasa renovasi rumah sidoarjo",
    "kontraktor interior surabaya",
    "kontraktor showroom surabaya",
  ],
  authors: [{ name: "Wonderful Works Construction" }],
  creator: "Wonderful Works Construction",
  publisher: "Wonderful Works Construction",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Wonderful Works Construction | General Contractor Surabaya",
    description:
      "Bringing Your Vision to Life with Expert Craftsmanship. General contractor tepercaya di Surabaya dengan presisi ukuran, transparansi RAB, dan komitmen tepat waktu.",
    url: "https://wwconstruction.id",
    siteName: "Wonderful Works Construction",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/ww/project_8.jpg",
        width: 1200,
        height: 630,
        alt: "Wonderful Works Construction - General Contractor Surabaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonderful Works Construction (@ww.cons)",
    description:
      "General contractor resmi di Surabaya. Presisi struktur, transparansi RAB, dan kualitas tanpa kompromi.",
    images: ["/images/ww/project_8.jpg"],
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
  icons: {
    icon: "/images/ww/logo.jpg",
    apple: "/images/ww/logo.jpg",
  },
  alternates: {
    canonical: "https://wwconstruction.id",
  },
};

const structuredSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GeneralContractor",
      "@id": "https://wwconstruction.id/#contractor",
      "name": "Wonderful Works Construction",
      "alternateName": [
        "WW Construction",
        "WW Cons",
        "Wonderful Works",
        "@ww.cons"
      ],
      "url": "https://wwconstruction.id",
      "logo": "https://wwconstruction.id/images/ww/logo.jpg",
      "image": "https://wwconstruction.id/images/ww/project_8.jpg",
      "description":
        "General contractor resmi berbasis di Surabaya. Melayani jasa konstruksi gedung komersial, pembangunan rumah mewah modern & klasik, renovasi struktural, dan interior fit-out dengan standar mutu presisi tinggi.",
      "telephone": "+62-811-3313-347",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Serenity No. 29, Semolowaru",
        "addressLocality": "Surabaya",
        "addressRegion": "Jawa Timur",
        "postalCode": "60119",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.3015,
        "longitude": 112.7758
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
            "Saturday"
          ],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Surabaya" },
        { "@type": "City", "name": "Sidoarjo" },
        { "@type": "City", "name": "Gresik" },
        { "@type": "AdministrativeArea", "name": "Jawa Timur" }
      ],
      "sameAs": [
        "https://www.instagram.com/ww.cons/"
      ],
      "slogan": "Bringing your vision to life with expert craftsmanship - Quality is our priority",
      "priceRange": "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Layanan Konstruksi Surabaya",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "General Contractor & Gedung Komersial",
              "description": "Konstruksi perkantoran, ruko, showroom komersial, dan sarana usaha di Surabaya."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pembangunan Rumah Tinggal Mewah Modern & Klasik",
              "description": "Rancang bangun hunian premium dengan standar rekayasa sipil teruji dan finishing presisi."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Renovasi & Re-Engineering Struktur",
              "description": "Perkuatan struktur pondasi/kolom, penambahan lantai, dan transformasi fasad bangunan eksisting."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Interior Fit-Out & MEP Integration",
              "description": "Pengerjaan interior arsitektural komersial dan instalasi mekanikal/elektrikal terpadu."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://wwconstruction.id/#website",
      "url": "https://wwconstruction.id",
      "name": "Wonderful Works Construction",
      "publisher": {
        "@id": "https://wwconstruction.id/#contractor"
      },
      "inLanguage": "id-ID"
    },
    {
      "@type": "FAQPage",
      "@id": "https://wwconstruction.id/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Berapa kisaran estimasi biaya jasa kontraktor bangun & renovasi di Surabaya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Estimasi biaya konstruksi di Surabaya bersama Wonderful Works Construction dihitung transparan berbasis Rencana Anggaran Biaya (RAB) terperinci per item pekerjaan (analisa harga satuan material & upah kerja). Mulai dari rumah tinggal modern, ruko komersial, hingga fit-out interior showroom, seluruh kalkulasi volume disepakati di awal secara tertulis untuk menjamin zero hidden cost (tanpa biaya siluman)."
          }
        },
        {
          "@type": "Question",
          "name": "Apa saja 5 tahapan alur kerja sama proyek di Wonderful Works Construction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Alur kerja sama kami terbagi menjadi 5 tahapan terstruktur: (1) Konsultasi kebutuhan & survei tapak lahan di area Surabaya/sekitarnya, (2) Penyusunan gambar kerja teknis arsitektur & rincian RAB terbuka, (3) Penandatanganan Surat Perjanjian Kerja (SPK) & jadwal kurva-S, (4) Pelaksanaan fisik konstruksi dengan pengawasan QC harian serta laporan foto/video berkala via WhatsApp, dan (5) Serah Terima Kunci (BAST) serta penerbitan sertifikat masa garansi retensi."
          }
        },
        {
          "@type": "Question",
          "name": "Mengapa presisi ukuran sangat krusial dalam konstruksi menurut Wonderful Works?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sesuai edukasi \"WW Notes\" di Instagram @ww.cons, presisi ukuran pada level milimeter sangat krusial untuk: (1) Menjamin keamanan dan kekuatan struktur (Safety First), (2) Mencegah pembengkakan biaya akibat bongkar pasang (Anti Rugi), (3) Menjaga kepatuhan timeline proyek (Bebas Molor), (4) Menghasilkan finishing yang rapi dan bernilai estetika tinggi, serta (5) Memudahkan instalasi utilitas MEP dan integrasi interior."
          }
        },
        {
          "@type": "Question",
          "name": "Apakah Wonderful Works Construction membantu pengurusan izin PBG dan SLF di Surabaya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ya. Kami mendampingi penyusunan berkas teknis lengkap, termasuk gambar arsitektur, perhitungan struktur teknis sipil, dan as-built drawings yang dipersyaratkan oleh instansi terkait di Pemerintah Kota Surabaya (Dinas Cipta Karya) maupun Pemkab Sidoarjo/Gresik untuk penerbitan Persetujuan Bangunan Gedung (PBG) dan Sertifikat Laik Fungsi (SLF)."
          }
        },
        {
          "@type": "Question",
          "name": "Bagaimana solusi pemilihan material bangunan untuk iklim tropis maritim Surabaya?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Surabaya memiliki paparan panas matahari tinggi, kelembaban pesisir, dan potensi tempias hujan musiman lebat. Tim kami menerapkan rekayasa material khusus: insulasi termal atap tahan UV, sistem talang air anti-luapan, waterproofing membrane berstandar tinggi pada dak beton, serta cat eksterior pelindung cuaca ekstrem (seperti Jotun Jotashield) guna mencegah lumut dan keretakan dinding."
          }
        },
        {
          "@type": "Question",
          "name": "Berapa lama masa garansi pemeliharaan (retensi) paska-konstruksi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Seluruh proyek fisik di bawah naungan Wonderful Works Construction dilindungi masa retensi pemeliharaan paska-serah terima kunci (umumnya 3 hingga 6 bulan sesuai kesepakatan SPK). Tim teknis kami bertanggung jawab penuh melakukan inspeksi berkala dan perbaikan jika terjadi kendala rembesan air, keretakan rambut plesteran, atau penyesuaian fungsi instalasi MEP tanpa biaya tambahan."
          }
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://wwconstruction.id/#methodology",
      "name": "5 Pilar Presisi Eksekusi Konstruksi Wonderful Works Construction",
      "description": "Standar rekayasa dan manajemen pelaksanaan proyek rancang bangun di Surabaya.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Keamanan & Kekuatan Struktur (Safety First)",
          "text": "Perhitungan beban gempa dan pemilihan mutu beton SNI serta baja struktural teruji."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Transparansi & Kontrol Biaya (Anti Rugi)",
          "text": "Penyusunan Rencana Anggaran Biaya (RAB) terbuka per volume tanpa biaya tersembunyi."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Penyelesaian Tepat Waktu (Bebas Molor)",
          "text": "Disiplin monitoring kurva-S dan manajemen rantai pasok material berkala."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Finishing Rapi & Estetika Tinggi",
          "text": "Toleransi pengerjaan nat, plesteran, acian, dan pengecatan presisi tingkat tinggi."
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Integrasi MEP & Interior Mulus",
          "text": "Sinkronisasi jalur pipa air, listrik, dan interior sejak awal struktur fisik."
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="orange" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('ww_construction_theme') || 'orange';
                  document.documentElement.setAttribute('data-theme', saved);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans bg-white text-slate-900 antialiased`}
      >
        <ThemeProvider>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
