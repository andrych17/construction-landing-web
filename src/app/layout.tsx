import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Baskervville } from "next/font/google";
import "./globals.css";

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
    "kontraktor voza surabaya",
    "centra arya loka kontraktor",
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
        "@ww.cons",
      ],
      "url": "https://wwconstruction.id",
      "logo": "https://wwconstruction.id/images/ww/logo_transparent.png",
      "image": "https://wwconstruction.id/images/projects/facade_architecture_hq.jpg",
      "description":
        "ww.cons adalah studio arsitektur dan kontraktor umum terkemuka di Surabaya. Menghadirkan kemewahan monolitik, eksplorasi material jujur, dan presisi rekayasa sipil berstandar SNI K-350.",
      "telephone": "+62-822-9819-9902",
      "email": "info@wwconstruction.id",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gedung Voza Premium Office Lt. 20, Jl. HR Muhammad No. 31A",
        "addressLocality": "Surabaya",
        "addressRegion": "Jawa Timur",
        "postalCode": "60226",
        "addressCountry": "ID",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -7.2889,
        "longitude": 112.6961,
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
      "sameAs": ["https://www.instagram.com/ww.cons/"],
      "slogan": "Bold Artisan Design for Inspired Living",
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
        {children}
      </body>
    </html>
  );
}
