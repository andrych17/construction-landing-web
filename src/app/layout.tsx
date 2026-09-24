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
    "Wonderful Works Construction is a visionary architecture, interior design, and general contracting firm in Surabaya. Specializing in luxury residences, commercial landmarks, and high-precision civil engineering.",
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
      "Bringing Your Vision to Life with Expert Craftmanship. Architecture, interior design, and precision general contracting in Surabaya and East Java.",
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
      "Bringing Your Vision to Life with Expert Craftmanship. Architecture, Interior, and General Contracting in Surabaya by Wonderful Works Construction.",
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
          "Wonderful Works Construction adalah studio arsitektur dan kontraktor umum terkemuka di Surabaya. Menghadirkan kemewahan monolitik, eksplorasi material jujur, dan presisi rekayasa sipil berstandar SNI K-350.",
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
            "opens": "08:00",
            "closes": "18:00",
          },
        ],
        "areaServed": [
          { "@type": "City", "name": "Surabaya" },
          { "@type": "City", "name": "Sidoarjo" },
          { "@type": "City", "name": "Gresik" },
          { "@type": "City", "name": "Malang" },
          { "@type": "City", "name": "Denpasar" },
          { "@type": "City", "name": "Jakarta" },
          { "@type": "AdministrativeArea", "name": "Jawa Timur" },
        ],
        "knowsAbout": [
          "Luxury Residential Architecture",
          "Civil Engineering & General Contracting",
          "ReadyMix SNI K-350 Structural Quality",
          "Laser 90° Corner Alignment Tolerances",
          "Pre-Cast Embedded MEP Systems",
          "Commercial Flagship Showrooms & Fit-Out",
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
        "slogan": "Bringing Your Vision to Life with Expert Craftmanship",
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
