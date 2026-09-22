import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Baskervville, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LayoutProvider } from "@/context/LayoutContext";

const baskervville = Baskervville({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
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
    default: "ww.cons | Architecture & General Contractor Surabaya",
    template: "%s | ww.cons",
  },
  description:
    "ww.cons (@ww.cons) is a visionary architecture, interior design, and general contracting firm in Surabaya. Specializing in luxury residences, corporate headquarters, and high-precision civil engineering with 35-year structural provenance.",
  keywords: [
    "ww.cons",
    "ww cons",
    "ww construction",
    "arsitektur surabaya",
    "kontraktor surabaya",
    "general contractor surabaya",
    "jasa bangun rumah surabaya",
    "jasa kontraktor surabaya",
    "luxury residence surabaya",
    "kontraktor voza surabaya",
    "kontraktor semolowaru",
    "kontraktor citraland",
    "kontraktor graha famili",
    "kontraktor interior surabaya",
  ],
  authors: [{ name: "ww.cons (Wonderful Works Studio)" }],
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
      "Bold Artisan Design for Inspired Living. Architecture, interior design, and precision general contracting in Surabaya and East Java.",
    url: "https://wwconstruction.id",
    siteName: "ww.cons",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/projects/facade_architecture_hq.jpg",
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
      "Bold Artisan Design for Inspired Living. Architecture, Interior, and General Contracting in Surabaya.",
    images: ["/images/projects/facade_architecture_hq.jpg"],
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
    icon: "/images/ww/logo_transparent.png",
    apple: "/images/ww/logo_transparent.png",
  },
  alternates: {
    canonical: "https://wwconstruction.id",
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
        "@ww.cons"
      ],
      "url": "https://wwconstruction.id",
      "logo": "https://wwconstruction.id/images/ww/logo_transparent.png",
      "image": "https://wwconstruction.id/images/projects/facade_architecture_hq.jpg",
      "description":
        "ww.cons (@ww.cons) adalah studio arsitektur dan kontraktor umum terkemuka di Surabaya. Menghadirkan kemewahan monolitik, eksplorasi material jujur, dan presisi rekayasa sipil berstandar SNI K-350 dengan garansi retensi resmi 100 hari.",
      "telephone": "+62-822-9819-9902",
      "email": "info@wwconstruction.id",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gedung Voza Premium Office Lt. 20, Jl. HR Muhammad No. 31A",
        "addressLocality": "Surabaya",
        "addressRegion": "Jawa Timur",
        "postalCode": "60226",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.2889,
        "longitude": 112.6961
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
          "closes": "18:00"
        }
      ],
      "areaServed": [
        { "@type": "City", "name": "Surabaya" },
        { "@type": "City", "name": "Sidoarjo" },
        { "@type": "City", "name": "Gresik" },
        { "@type": "City", "name": "Malang" },
        { "@type": "AdministrativeArea", "name": "Jawa Timur" }
      ],
      "sameAs": [
        "https://www.instagram.com/ww.cons/"
      ],
      "slogan": "Bold Artisan Design for Inspired Living",
      "priceRange": "$$$$",
      "knowsAbout": [
        "Bespoke Architecture",
        "Luxury Residential Construction",
        "Commercial Office Fit-Out",
        "SNI K-350 Structural Concrete",
        "Digital Laser 90° Precision Alignment",
        "Anti-Seismic Civil Engineering",
        "MEP Pre-Cast Embedded Infrastructure",
        "PBG & SLF Permitting Surabaya"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Layanan Arsitektur & Kontraktor ww.cons",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bespoke Architecture & Spatial Design",
              "description": "Perancangan arsitektur dan interior hunian mewah dengan filosofi Inside Out, Balanced Contrast, dan Narrative Space."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "High-End Residential General Contracting",
              "description": "Konstruksi rumah tinggal mewah di kawasan Citraland, Graha Famili, Pakuwon City, dan Dharmahusada dengan toleransi laser < 1mm."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Headquarters & Commercial Fit-Out",
              "description": "Rancang bangun ruang pamer, gedung komersial, dan kantor eksekutif dengan plafon akustik NRC 0.85 dan instalasi MEP terpadu."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Structural Engineering & Quality Audit",
              "description": "Rekayasa sipil struktur beton bertulang K-350 SNI, uji slump independen, dan sertifikat garansi retensi resmi 100 hari."
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
        className={`${baskervville.variable} ${montserrat.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans bg-black text-slate-100 antialiased selection:bg-amber-500 selection:text-black`}
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
