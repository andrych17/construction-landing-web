import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ArchitecturalPreloader from "@/components/interactive/ArchitecturalPreloader";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { LanguageProvider } from "@/context/LanguageContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { getAllSiteContent } from "@/lib/content";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: "#030303",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wwconstruction.id"),
  title: {
    default: "Wonderful Works Construction | Architecture & General Contractor Surabaya",
    template: "%s | Wonderful Works Construction",
  },
  description:
    "Kontraktor rancang bangun di Surabaya, Sidoarjo, dan Gresik untuk rumah tinggal dan bangunan komersial. Desain arsitektur, interior, dan konstruksi dengan RAB terbuka dan laporan progres harian.",
  keywords: [
    "Wonderful Works Construction",
    "Wonderful Works",
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
  authors: [{ name: "Wonderful Works Construction" }],
  creator: "Wonderful Works Construction",
  publisher: "Wonderful Works Construction",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Wonderful Works Construction | Architecture & General Contractor Surabaya",
    description:
      "Bringing Your Vision to Life with Expert Craftsmanship. Architecture, interiors, and general contracting in Surabaya, Sidoarjo, and Gresik.",
    url: "https://wwconstruction.id",
    siteName: "Wonderful Works Construction",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://wwconstruction.id/images/og-image.jpg",
        secureUrl: "https://wwconstruction.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Wonderful Works Construction - Architecture & General Contractor Surabaya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonderful Works Construction (@ww.cons)",
    description:
      "Bringing Your Vision to Life with Expert Craftsmanship. Architecture, interiors, and general contracting in Surabaya by Wonderful Works Construction.",
    images: ["https://wwconstruction.id/images/og-image.jpg"],
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
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: "https://wwconstruction.id",
    languages: {
      "id-ID": "https://wwconstruction.id",
      "en-US": "https://wwconstruction.id",
      "x-default": "https://wwconstruction.id",
    },
  },
};

function buildStructuredSchema(siteData: Awaited<ReturnType<typeof getAllSiteContent>>) {
  const { contact, faqs, services } = siteData;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["GeneralContractor", "ProfessionalService", "LocalBusiness"],
        "@id": "https://wwconstruction.id/#contractor",
        "name": "Wonderful Works Construction",
        "legalName": "Wonderful Works Construction",
        "alternateName": [
          "Wonderful Works",
          "Wonderful Works Studio",
          "Wonderful Works Construction Surabaya",
        ],
        "url": "https://wwconstruction.id",
        "logo": "https://wwconstruction.id/images/ww/logo-512.png",
        "image": "https://wwconstruction.id/images/projects/hero_poster.jpg",
        "description":
          "Wonderful Works Construction adalah kontraktor rancang bangun di Surabaya untuk rumah tinggal dan bangunan komersial, dengan struktur beton ReadyMix K-350 sesuai SNI dan RAB terbuka.",
        "telephone": `+${contact.whatsapp}`,
        "email": "hello@wwconstruction.id",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": contact.studio.lines[0],
          "addressLocality": "Surabaya",
          "addressRegion": "Jawa Timur",
          "postalCode": "60119",
          "addressCountry": "ID",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -7.2917,
          "longitude": 112.7936,
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
            "opens": "08:30",
            "closes": "17:30",
          },
        ],
        "areaServed": [
          { "@type": "City", "name": "Surabaya" },
          { "@type": "City", "name": "Sidoarjo" },
          { "@type": "City", "name": "Gresik" },
        ],
        "knowsAbout": [
          "Residential Architecture",
          "Civil Engineering & General Contracting",
          "ReadyMix SNI K-350 Structural Quality",
          "Laser 90° Corner Alignment Tolerances",
          "Pre-Cast Embedded MEP Systems",
          "Commercial Showrooms & Fit-Out",
          "PBG & SLF Permitting Compliance",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Layanan Arsitektur & Kontraktor Utama",
          "itemListElement": services.map((srv) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": srv.category,
              "description": srv.desc,
            },
          })),
        },
        "sameAs": [contact.instagram],
        "slogan": "Bringing Your Vision to Life with Expert Craftsmanship",
        "priceRange": "$$$$",
      },
      {
        "@type": "FAQPage",
        "@id": "https://wwconstruction.id/#faq",
        "name": "Wonderful Works Construction Frequently Asked Questions",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.questionId,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answerId,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": "https://wwconstruction.id/#website",
        "url": "https://wwconstruction.id",
        "name": "Wonderful Works Construction | Architecture & General Contractor Surabaya",
        "publisher": {
          "@id": "https://wwconstruction.id/#contractor",
        },
        "inLanguage": ["id-ID", "en-US"],
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteData = await getAllSiteContent();
  const structuredSchema = buildStructuredSchema(siteData);

  return (
    <html lang="id" className="dark bg-[#030303]" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var isPreloaded = sessionStorage.getItem('ww_preloaded') === '1';
                var isExcluded = window.location.pathname.startsWith('/admin') || window.location.pathname === '/login';
                var isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (isPreloaded || isExcluded || isReducedMotion) {
                  document.documentElement.classList.add('ww-preloaded');
                }
              } catch(e) {}
            })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans bg-[#030303] text-neutral-100 antialiased selection:bg-amber-400 selection:text-black min-h-screen`}
      >
        <SiteContentProvider data={siteData}>
          <LanguageProvider>
            <ArchitecturalPreloader />
            {children}
            <FloatingWhatsApp />
          </LanguageProvider>
        </SiteContentProvider>
      </body>
    </html>
  );
}
