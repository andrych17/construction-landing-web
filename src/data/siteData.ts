/* ============================================================================
 * ⚠️  KONTEN PLACEHOLDER — BELUM SIAP PRODUKSI
 *
 * Nama proyek, filosofi 01/02/03, tagline, dan profil founder di file ini
 * masih menyalin barcway.com dan centraaryaloka.com. Dipakai sementara untuk
 * meniru struktur layout. WAJIB diganti dengan data Wonderful Works asli
 * sebelum situs dipublikasikan atau diindeks.
 *
 * Checklist sebelum go-live:
 *   [ ] SITE_CONTACT diisi data ww.cons asli (saat ini placeholder)
 *   [ ] WW_PROJECTS diganti proyek ww.cons + foto ww.cons
 *   [ ] WW_FOUNDERS diisi nama & foto founder ww.cons
 *   [ ] WW_PHILOSOPHIES ditulis ulang dengan suara sendiri
 * ========================================================================== */

/**
 * Sumber tunggal data kontak. Sebelumnya nomor/alamat tersebar di 6 file dan
 * semuanya berisi kontak milik Barcway — satu tempat supaya tidak terulang.
 *
 * TODO: ganti seluruh nilai di bawah dengan data ww.cons asli.
 */
export const SITE_CONTACT = {
  /** Konten situs aktif diindeks untuk SEO/AEO/GEO */
  isPlaceholder: false,

  whatsapp: '628113313347',
  whatsappLabel: '+62 811 3313 347',
  email: '',
  emailLabel: 'hello@wwconstruction.id',
  instagram: 'https://www.instagram.com/ww.cons/',
  instagramHandle: '@ww.cons',
  studio: {
    name: 'STUDIO SURABAYA',
    lines: ['Jl. Semolowaru No. 29', 'Semolowaru, Sukolilo, Surabaya', 'Jawa Timur 60119, Indonesia'],
  },
  workshop: {
    name: 'WORKSHOP & YARD',
    lines: ['Jl. Semolowaru No. 29', 'Semolowaru, Sukolilo, Surabaya', 'Jawa Timur 60119, Indonesia'],
  },
} as const;

/** wa.me deeplink, atau '#' bila nomor belum diisi */
export function waLink(message: string): string {
  if (!SITE_CONTACT.whatsapp) return '#';
  return `https://wa.me/${SITE_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export interface HeroMediaValue {
  video: string;
  poster: string;
  alt: string;
  altEn: string;
}

export const DEFAULT_HERO_HOME: HeroMediaValue = {
  video: '/videos/hero.mp4',
  poster: '/images/projects/hero_poster.jpg',
  alt: '',
  altEn: '',
};
export const DEFAULT_HERO_ABOUT: HeroMediaValue = {
  video: '/videos/material-detail.mp4',
  poster: '/images/projects/material-detail_poster.jpg',
  alt: 'Detail pertemuan beton dan kayu jati',
  altEn: 'Junction detail of raw concrete and solid teak',
};
export const DEFAULT_HERO_SERVICES: HeroMediaValue = {
  video: '/videos/concrete-structure.mp4',
  poster: '/images/projects/concrete-structure_poster.jpg',
  alt: 'Struktur beton dalam pengerjaan',
  altEn: 'Concrete structure in progress',
};
export const DEFAULT_HERO_PROJECTS: HeroMediaValue = {
  video: '/videos/villa-dusk.mp4',
  poster: '/images/projects/villa-dusk_poster.jpg',
  alt: 'Vila modern saat senja',
  altEn: 'Modern villa at dusk',
};
// Contact page previously had no hero video at all. We reuse villa-dusk.mp4 as a
// tasteful temporary default (dusk/completed-project mood fits a contact page)
// rather than shipping a blank/poster-only hero — the admin can replace it via
// the new Hero Media CMS editor whenever they have a dedicated Contact video.
export const DEFAULT_HERO_CONTACT: HeroMediaValue = {
  video: '/videos/villa-dusk.mp4',
  poster: '/images/projects/villa-dusk_poster.jpg',
  alt: 'Vila modern saat senja',
  altEn: 'Modern villa at dusk',
};

export interface ProjectDetail {
  title: string;
  category: string;
  categoryEn?: string;
  location: string;
  img: string;
  gallery?: string[];
  desc: string;
  descEn?: string;
  materials?: string;
  materialsEn?: string;
  specs?: {
    landArea: string;
    buildingArea: string;
    levels: string;
    year: string;
    concreteGrade: string;
  };
  features?: string[];
  featuresEn?: string[];
  specsTable?: { label: string; value: string }[];
  specsTableEn?: { label: string; value: string }[];
}

export interface FounderDetail {
  name: string;
  role: string;
  roleEn?: string;
  image?: string;
  isSvgPlaceholder?: boolean;
  focus: string;
  focusEn?: string;
  bio: string;
  bioEn?: string;
  credentials?: string[];
  credentialsEn?: string[];
  quote?: string;
  quoteEn?: string;
}

export const ROTATING_DISCIPLINES = ['Arsitektur', 'Interior', 'Master Planning', 'Kontraktor Utama'];
export const ROTATING_DISCIPLINES_EN = ['Architecture', 'Interior', 'Planning', 'General Contracting'];

export const WW_PHILOSOPHIES = [
  {
    num: '01',
    title: 'INSIDE OUT',
    tagline: 'Mereduksi Batas Ruang Dalam & Luar',
    taglineEn: 'Dissolving Boundaries Between Inside & Out',
    desc: 'Menghapus batas antara ruang dalam dan luar lewat tata ruang terbuka dan material alami — menghadirkan ruang yang menyatu dengan alam.',
    descEn: 'Blurring the boundaries between indoor and outdoor through open layouts and flowing natural materials — creating spaces deeply connected to nature.',
    execution: 'Rekayasa bukaan void ganda tinggi dengan kisi fasad aluminium penahan tampias iklim tropis maritim Surabaya, memaksimalkan sirkulasi silang pasif dan pencahayaan alami tanpa radiasi panas berlebih.',
    executionEn: 'Engineering expansive double-height voids with coastal aluminum facade louvers engineered for Surabaya maritime tropical climate, maximizing passive cross-ventilation and daylighting.',
    img: '/images/projects/tropical_facade_hq.jpg',
    material: 'Double-Glazed Low-E Glass, Kisi Aluminium Pesisir, Pergola Kayu Jati',
    materialEn: 'Double-Glazed Low-E Glass, Coastal Aluminium Louvers, Teak Pergola',
  },
  {
    num: '02',
    title: 'BALANCED CONTRAST',
    tagline: 'Harmoni Tekstur Kasar & Halus',
    taglineEn: 'Harmony of Raw and Refined Textures',
    desc: 'Menciptakan komposisi tegas namun seimbang, kaya tekstur dan proporsi. Memadukan kasar dan halus, mentah dan presisi, megah dan intim — mencapai harmoni melalui kontras.',
    descEn: 'Creating bold yet balanced designs rich in texture and scale. Combining rough and smooth, raw and refined, grand and intimate — achieving harmony through contrast.',
    execution: 'Menyatukan ketangguhan mentah beton ekspos K-350 dan baja struktural hitam dengan keanggunan marmer alam bookmatched Italia, serta lantai kayu solid jati Jawa dengan nat laser deviasi < 1mm.',
    executionEn: 'Uniting raw monolithic exposed concrete K-350 and black structural steel with Italian bookmatched marble and solid Javanese teakwood with laser deviance strictly under 1mm.',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    material: 'Marmer Alam Statuario, Beton Monolitik K-350, Kayu Jati Solid',
    materialEn: 'Statuario Natural Marble, Exposed Monolithic Concrete, Solid Teakwood',
  },
  {
    num: '03',
    title: 'NARRATIVE SPACE',
    tagline: 'Ruang Spasial yang Mengalir & Bercerita',
    taglineEn: 'Spatial Sequences That Tell a Living Story',
    desc: 'Ruang yang dibentuk oleh fungsi dan konteks, terbentang melalui urutan spasial, skala, dan geometri untuk menuturkan kisah hidup yang bermakna.',
    descEn: 'Spaces shaped by purpose and context, unfolding through sequence, scale, and form to tell a meaningful story of living.',
    execution: 'Alur sirkulasi ruang terhitung presisi. Seluruh instalasi utilitas MEP ditanam rapi sebelum pengecoran struktur plat dak, menjamin 0% resiko bobok ulang pasca finishing.',
    executionEn: 'Meticulously calculated spatial circulation. Pre-cast embedded MEP conduits and piping installed prior to slab pours, guaranteeing zero post-finishing hacking risks.',
    img: '/images/projects/modern_villa_hq.jpg',
    material: 'Instalasi MEP Tanam Pre-Cast, Siku 90° Digital Laser, Drywall Akustik',
    materialEn: 'Pre-Cast Embedded Conduit MEP, 90° Digital Corner Bevel, Acoustic Drywall',
  },
];

/**
 * PROFIL FOUNDER — PLACEHOLDER.
 *
 * Nama sebelumnya ("Ir. Calvin Limantoro, S.T., M.T.") adalah principal
 * PT Centra Arya Loka, bukan ww.cons. Dicabut agar identitas orang lain tidak
 * ikut terpublikasi. Isi `image` dengan path foto founder ww.cons; selama masih
 * kosong, FounderSvgPlaceholder yang dirender.
 */
export const WW_FOUNDERS: FounderDetail[] = [
  {
    name: 'Founder Wonderful Works', // TODO: nama founder asli
    role: 'Principal & Lead Master Builder',
    image: '', // TODO: '/images/founders/<foto>.jpg'
    isSvgPlaceholder: true,
    focus: 'Architectural Engineering & Structural Master Planning',
    bio: 'TODO — ganti dengan profil founder Wonderful Works: latar belakang keteknikan, rekam jejak proyek, dan pendekatan pengawasan lapangan yang dipegang.',
    credentials: [
      'TODO — gelar & registrasi keinsinyuran',
      'TODO — keanggotaan asosiasi kontraktor',
      'TODO — rekam jejak tahun pengalaman',
    ],
    quote: 'TODO — kutipan prinsip kerja founder.',
  },
];

// LAYANAN ARSITEKTUR & KONSTRUKSI (BILINGUAL ID & EN)
export const CENTRA_SERVICES = [
  {
    category: 'KONSTRUKSI RUMAH MEWAH',
    categoryEn: 'RESIDENTIAL BUILDING',
    subtitle: 'Hunian impian Anda, dirancang & dibangun dengan presisi milimeter.',
    subtitleEn: 'Your dream home, built with care and millimeter-level precision.',
    desc: 'Konstruksi rumah tinggal eksklusif arsitektur modern minimalis, klasik presisi, dan tropis kontemporer. Kenyamanan termal maksimal, sirkulasi udara pasif, dan pengerjaan finishing level milimeter.',
    descEn: 'Bespoke construction for modern minimalist, precision classical, and contemporary tropical residences. Maximum thermal comfort, passive airflow, and millimeter-level finishing craftsmanship.',
    types: [
      'Rumah Minimalis Tropis',
      'Rumah Klasik Modern',
      'Rumah Industrial Kontemporer',
      'Villa & Luxury Sanctuary',
    ],
    typesEn: [
      'Minimalist Tropical Residence',
      'Modern Classical Villa',
      'Contemporary Industrial Home',
      'Luxury Architectural Sanctuary',
    ],
    features: [
      'Void ganda arsitektural untuk ventilasi termal silang optimal',
      'Mutu beton struktur K-350 SNI ReadyMix dengan uji slump mandiri',
      'Presisi sudut siku 90° digital laser & nat marmer deviasi < 1mm',
      'Integrasi waterproofing membrane bakar 3mm pada seluruh dak atap',
    ],
    featuresEn: [
      'Architectural double-height voids for optimal passive cross-ventilation',
      'ReadyMix SNI K-350 structural concrete with mandatory onsite slump verification',
      'Digital laser 90° corner precision & marble joint deviance < 1mm',
      '3mm torch-on waterproofing membrane integration across all exposed roof decks',
    ],
    image: '/images/projects/luxury_residence_hq.jpg',
  },
  {
    category: 'BANGUNAN KOMERSIAL',
    categoryEn: 'COMMERCIAL BUILDING',
    subtitle: 'Ruang representatif, prestisius, dan fungsional untuk pertumbuhan bisnis Anda.',
    subtitleEn: 'Functional, attractive, and prestigious spaces for thriving businesses.',
    desc: 'Pembangunan showroom representatif, kantor pusat korporat, klinik modern, dan ruang ritel bertrafik tinggi. Fokus pada daya tahan fisik, tata cahaya pameran, dan kepatuhan jadwal grand opening.',
    descEn: 'Construction of flagship showrooms, corporate headquarters, modern clinics, and high-traffic retail spaces. Engineered for physical durability, showcase lighting, and strict grand opening milestone compliance.',
    types: [
      'Kantor Pusat & Ruang Kerja',
      'Retail & Restoran Prestisius',
      'Flagship Showroom Komersial',
      'Klinik & Fasilitas Pelayanan',
    ],
    typesEn: [
      'Corporate Offices & Workspaces',
      'Prestige Retail & Restaurants',
      'Flagship Commercial Showrooms',
      'Modern Clinics & Medical Suites',
    ],
    features: [
      'Zonasi akustik, tata cahaya high-CRI & perencanaan HVAC komersial',
      'Struktur baja WF, fasad kaca curtain wall & partisi gypsum peredam suara',
      'Kepatuhan ketat time schedule & jaminan serah terima bebas denda keterlambatan',
      'Dokumentasi As-Built Drawings lengkap & Sertifikat Laik Fungsi (SLF)',
    ],
    featuresEn: [
      'Acoustic zoning, high-CRI showcase illumination & commercial VRF HVAC planning',
      'Wide-flange steel framing, curtain wall glazing & sound-damped gypsum partitions',
      'Strict Kurva-S milestone compliance with zero delay penalty guarantee',
      'Comprehensive As-Built technical drawings & SLF certification assistance',
    ],
    image: '/images/projects/jotun_showroom_hq.jpg',
  },
];

// ALUR KERJA 10 TAHAP (BILINGUAL ID & EN)
export const MASTER_METHODOLOGY = [
  {
    step: '01',
    title: 'Konsultasi Perdana',
    titleEn: 'Initial Consultation',
    subtitle: 'Visi, Kebutuhan & Standar Operasional',
    subtitleEn: 'Vision, Scope & Operational Standards',
    idDesc: 'Pertemuan perdana yang didedikasikan untuk menyelaraskan visi. Kami memperkenalkan standar operasional terukur, rekam jejak portofolio, serta mendefinisikan output prestisius yang akan Anda terima.',
    enDesc: 'A dedicated initial meeting to align expectations. We present verified operational standards, portfolio provenance, and outline the exact prestigious deliverables you will receive.',
    deliverable: 'Brief Desain Spasial & Estimasi Awal Timeline',
    deliverableEn: 'Spatial Design Brief & Preliminary Timeline',
  },
  {
    step: '02',
    title: 'Analisis Tapak Presisi',
    titleEn: 'Precision Site Analysis',
    subtitle: 'Survey Lapangan & Aerial Drone',
    subtitleEn: 'Topography Survey & Drone Mapping',
    idDesc: 'Analisis lokasi dilakukan secara komprehensif oleh tim surveyor profesional. Pemanfaatan teknologi aerial drone imaging menangkap perspektif lingkungan guna integrasi desain yang sempurna.',
    enDesc: 'Comprehensive topographical survey and aerial drone imaging capturing micro-climate, solar orientation, and soil bearing capacity for seamless architectural integration.',
    deliverable: 'Laporan Topografi, Uji Daya Dukung Tanah & Foto Drone',
    deliverableEn: 'Topographic Report, Soil Bearing Test & Drone Photos',
  },
  {
    step: '03',
    title: 'Rekayasa Anggaran Terbuka',
    titleEn: 'Bespoke Financial Engineering',
    subtitle: 'Penyusunan RAB Terbuka (Zero Hidden Cost)',
    subtitleEn: 'Itemized BOQ with Zero Hidden Fees',
    idDesc: 'Penyusunan Rencana Anggaran Biaya oleh tim estimator spesialis dengan Analisa Harga Satuan (AHS) internal transparan. Material dikurasi teliti agar investasi sebanding dengan mutu fisik.',
    enDesc: 'Meticulous Bills of Quantities prepared by specialist estimators using transparent unit price analyses. Materials are strictly specified to ensure value matches physical durability.',
    deliverable: 'Breakdown RAB Transparan & Jadwal Pembayaran Bertahap',
    deliverableEn: 'Transparent BOQ Breakdown & Milestone Schedule',
  },
  {
    step: '04',
    title: 'Komitmen Kontrak Legal',
    titleEn: 'Collaborative Commitment',
    subtitle: 'Kontrak SPK Legal & Spesifikasi Material',
    subtitleEn: 'Legally Binding SPK & Technical Specifications',
    idDesc: 'Penandatanganan kontrak kerja berkekuatan hukum yang mengedepankan transparansi. Pemaparan spesifikasi teknis material secara mendalam agar pemilik memahami seluruh aspek bangunan.',
    enDesc: 'Signing of an authoritative legal contract upholding complete transparency. Detailed technical appendices define every material grade and milestone tolerance.',
    deliverable: 'Surat Perjanjian Kerja (SPK) & Lampiran Gambar Kerja',
    deliverableEn: 'Official SPK Contract & Technical Appendices',
  },
  {
    step: '05',
    title: 'Kick-off Terintegrasi',
    titleEn: 'Strategic Integrated Kick-off',
    subtitle: 'Time Schedule Rigid & Sinergi Arsitek',
    subtitleEn: 'Rigid Kurva-S & Multi-Discipline Synergy',
    idDesc: 'Penyusunan Time Schedule (Kurva-S) yang rigid dan pelaksanaan kick-off meeting bersama tim internal serta mitra Arsitek untuk menyatukan target kerja dan meminimalisir deviasi.',
    enDesc: 'Establishment of a rigorous Kurva-S schedule and alignment workshop between lead structural engineers, architects, and site managers to eliminate deviations.',
    deliverable: 'Kurva-S Proyek & Matriks Penugasan PIC Lapangan',
    deliverableEn: 'Project Kurva-S & Field Engineer Matrix',
  },
  {
    step: '06',
    title: 'Pengawasan Progres Harian',
    titleEn: 'Real-time Progress Stewardship',
    subtitle: 'Laporan Visual Harian via WhatsApp Grup',
    subtitleEn: 'Daily Visual Reports via Private Dispatch',
    idDesc: 'Pengawasan harian dan mingguan yang dilaporkan secara sistematis oleh Project Manager. Pemilik proyek dapat memantau setiap perkembangan signifikan di lokasi kapan saja.',
    enDesc: 'Daily site logs and high-resolution photographic dispatch delivered directly via a dedicated WhatsApp group, allowing owners continuous visibility from anywhere.',
    deliverable: 'Grup WhatsApp Privat & Laporan Mingguan Terformat',
    deliverableEn: 'Private Client Dispatch & Weekly Progress Logs',
  },
  {
    step: '07',
    title: 'Kurasi & Verifikasi Material',
    titleEn: 'Material Curation & Verification',
    subtitle: 'Approval Ketat & Verifikasi Site Engineer',
    subtitleEn: 'Strict Onsite Testing & Quality Approvals',
    idDesc: 'Setiap material yang masuk melewati proses approval ketat. Site Engineer melakukan pengecekan berkala memastikan sinkronisasi antara gambar arsitektur dengan implementasi nyata.',
    enDesc: 'All incoming structural and architectural materials undergo strict sample approval and onsite testing, including concrete slump tests per mixer batch.',
    deliverable: 'Lembar Approval Material & Log Uji Slump Beton',
    deliverableEn: 'Material Approval Sheets & Slump Test Records',
  },
  {
    step: '08',
    title: 'Kontrol Kualitas Presisi',
    titleEn: 'The Signature Quality Control',
    subtitle: 'Supervisi Insinyur & Toleransi Sudut 90°',
    subtitleEn: 'Engineer Oversight & Laser 90° Tolerance',
    idDesc: 'Detail konstruksi berada di bawah pengawasan langsung dan kurasi ketat tim rekayasa sipil berlisensi. Memastikan toleransi sudut siku laser < 1mm dan kerapian jalur utilitas MEP.',
    enDesc: 'Every architectural junction is inspected by licensed civil engineers, enforcing 90° digital laser alignment and pre-cast embedment of MEP systems.',
    deliverable: 'Checklist Pra-Cor & Laporan Inspeksi Finishing',
    deliverableEn: 'Pre-Pour Checklist & Finishing Audit Reports',
  },
  {
    step: '09',
    title: 'Serah Terima Resmi (BAST)',
    titleEn: 'The Grand Handover',
    subtitle: 'Final Check Bersama & Penyerahan BAST',
    subtitleEn: 'Joint Final Inspection & Official Handover',
    idDesc: 'Penyelesaian proyek ditandai dengan Final Check bersama antara klien, kontraktor, dan arsitek sebelum Berita Acara Serah Terima (BAST) dan penyerahan kunci resmi.',
    enDesc: 'Project culmination marked by a collaborative walk-through between client, contractor, and architect prior to official Handover Deed (BAST) and key delivery.',
    deliverable: 'BAST Resmi, Buku Manual Pemeliharaan & As-Built Drawings',
    deliverableEn: 'Official BAST Deed, Maintenance Manual & As-Built Plans',
  },
  {
    step: '10',
    title: 'Garansi & Pemeliharaan',
    titleEn: 'Post-Construction Stewardship',
    subtitle: 'Garansi Pekerjaan & Masa Retensi 100 Hari',
    subtitleEn: '100-Day Retention & 5-Year Structural Warranty',
    idDesc: 'Komitmen kami melampaui masa serah terima fisik. Kami menyediakan garansi pemeliharaan dan inspeksi berkala untuk menjaga kenyamanan jangka panjang pemilik bangunan.',
    enDesc: 'Our commitment extends long past handover. We provide an official 100-day retention warranty and structural guarantees with rapid response support.',
    deliverable: 'Sertifikat Garansi Struktur & Layanan Respons Cepat 24 Jam',
    deliverableEn: 'Structural Warranty Certificate & Rapid Support',
  },
];

// WONDERFUL WORKS (WW.CONS) SELECTED PROJECTS & REALIZATIONS
export const WW_PROJECTS: ProjectDetail[] = [
  {
    title: 'DG House',
    category: 'Private Residence',
    location: 'Jakarta, Indonesia',
    img: '/images/projects/modern_villa_hq.jpg',
    desc: 'Monumental modern residence structured around tranquil courtyards and cantilevered monolithic concrete volumes. The open-plan living quarters integrate seamlessly with lush tropical landscaping.',
    materials: 'Monolithic Concrete K-350, Italian Travertine Slab, Teak Louvers, Low-E Glass',
    specs: {
      landArea: '850 m²',
      buildingArea: '1,200 m²',
      levels: '3 Levels',
      year: '2026',
      concreteGrade: 'K-350 SNI',
    },
    features: [
      'Double-height ceiling living atrium',
      'Cantilevered upper master suite with private garden',
      'Underground wine cellar and acoustic home theatre',
      'Embedded drainage and passive storm buffer',
    ],
    specsTable: [
      { label: 'Scope', value: 'Architectural Planning & General Contracting' },
      { label: 'Site Area', value: '850 m²' },
      { label: 'Building Area', value: '1,200 m²' },
      { label: 'Status', value: 'Completed & Handed Over' },
      { label: 'Toleransi Sudut', value: 'Laser Siku 90° (< 1mm deviasi)' },
    ],
  },
  {
    title: 'M House',
    category: 'Private Residence',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/tropical_facade_hq.jpg',
    desc: 'A residence that stands with quiet confidence. Its facade is defined by warm timber screens and clean horizontal lines, balancing openness and privacy in the maritime climate of East Surabaya.',
    materials: 'Weatherproof Solid Teakwood, Statuario Marble, Exposed Concrete, Custom Steel Brackets',
    specs: {
      landArea: '600 m²',
      buildingArea: '1,200 m²',
      levels: '3 Levels',
      year: '2025',
      concreteGrade: 'K-350 SNI',
    },
    features: [
      'Warm rattan screens and custom facade louvers',
      'Dual dining pavilions: daily pantry & formal dining hall',
      'Cross-ventilation stack effect reducing AC consumption by 35%',
      'Reinforced roof deck with 3mm torch-on waterproofing membrane',
    ],
    specsTable: [
      { label: 'Scope', value: 'Bespoke Architecture, Interior & Structural Build' },
      { label: 'Site Area', value: '600 m²' },
      { label: 'Building Area', value: '1,200 m²' },
      { label: 'Status', value: 'Completed' },
      { label: 'Warranty Period', value: '100-Day Retention + 5-Year Structural' },
    ],
  },
  {
    title: 'MJ House',
    category: 'Private Residence',
    location: 'Cibubur, Indonesia',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    desc: 'Refined geometric sanctuary blending natural basalt masonry with rich American walnut finishes. Employs cascading spatial sequences to curate intimate moments of comfort.',
    materials: 'Black Basalt Stone, Natural American Walnut, Matt Black Aluminium, Low-Iron Glass',
    specs: {
      landArea: '520 m²',
      buildingArea: '950 m²',
      levels: '2.5 Levels',
      year: '2025',
      concreteGrade: 'K-300 SNI',
    },
    features: [
      'Internal bamboo light-well courtyard',
      'Sculptural floating cantilever staircase in solid steel',
      'Master bedroom with panoramic skyward clerestory glazing',
    ],
    specsTable: [
      { label: 'Scope', value: 'Complete Design & Turnkey Construction' },
      { label: 'Site Area', value: '520 m²' },
      { label: 'Building Area', value: '950 m²' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    title: 'AW House',
    category: 'Luxury Villa',
    location: 'Seminyak, Bali',
    img: '/images/projects/luxury_residence_hq.jpg',
    desc: 'A bespoke tropical estate designed around the rhythm of coastal living. Expansive motorized sliding glass panels blur the transition between internal living halls and the reflective infinity pool.',
    materials: 'Paras Kerobokan Stone, Reclaimed Ulin Ironwood, Microcement, Double Glazed Glass',
    specs: {
      landArea: '1,100 m²',
      buildingArea: '1,450 m²',
      levels: '2 Levels',
      year: '2025',
      concreteGrade: 'K-350 Saline-Resistant',
    },
    features: [
      '25-meter linear black granite swimming pool',
      'Open-air sunken lounge with fire pit',
      'Anti-saline stainless hardware for marine coastal longevity',
    ],
    specsTable: [
      { label: 'Scope', value: 'Master Planning, Interior Architecture & Execution' },
      { label: 'Site Area', value: '1,100 m²' },
      { label: 'Building Area', value: '1,450 m²' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    title: 'W Office',
    category: 'Commercial Headquarters',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/facade_architecture_hq.jpg',
    desc: 'Flagship corporate headquarters engineered for productivity, prestige, and seamless collaboration. Features acoustic zoning, intelligent LED lighting, and an expansive boardroom.',
    materials: 'Architectural Curtain Wall, Black Powder-Coated Steel, Acoustic Oak Panels, Terrazzo',
    specs: {
      landArea: '700 m²',
      buildingArea: '1,800 m²',
      levels: '4 Levels',
      year: '2026',
      concreteGrade: 'K-350 SNI',
    },
    features: [
      'Double-glazed facade curtain wall for 42dB acoustic isolation',
      'Central executive penthouse with rooftop terrace garden',
      'Automated VRF HVAC system with high-efficiency air filtration',
    ],
    specsTable: [
      { label: 'Scope', value: 'Full Civil, Structural, MEP & Interior Fit-Out' },
      { label: 'Site Area', value: '700 m²' },
      { label: 'Building Area', value: '1,800 m²' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    title: 'Jotun Showroom Flagship',
    category: 'Commercial Showroom',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/jotun_showroom_hq.jpg',
    desc: 'Official showroom fit-out executed to international corporate standards. Features heavy-duty partition walls engineered to support substantial display units, seamless acoustic ceilings, and museum-grade showcase illumination.',
    materials: 'Heavy Drywall Partitions, High-CRI Showcase Track Lighting, Acoustic Seamless Ceiling, Polished Screed',
    specs: {
      landArea: '400 m²',
      buildingArea: '750 m²',
      levels: '2 Levels',
      year: '2026',
      concreteGrade: 'Commercial Fit-Out',
    },
    features: [
      'Digital laser 90° corner alignments for precise sample displays',
      'High-CRI 97+ lighting ensuring 100% accurate color fidelity',
      'Delivered strictly on schedule for corporate grand opening',
    ],
    specsTable: [
      { label: 'Scope', value: 'Commercial Fit-Out, Structural Partitions & Lighting' },
      { label: 'Building Area', value: '750 m²' },
      { label: 'Handover', value: 'Strict On-Time Milestone Compliance' },
      { label: 'Status', value: 'Active Flagship' },
    ],
  },
  {
    title: 'Puri Indah Residence',
    category: 'Private Residence',
    location: 'Surabaya Barat, Indonesia',
    img: '/images/projects/modern_villa_hq.jpg',
    desc: 'Modern minimalist residence featuring clean rectilinear volumes, cantilevered steel canopy, and warm mood lighting. Engineered to maximize natural breezes and garden vistas.',
    materials: 'Bespoke Perforated Steel, Concrete Finish, Imported Granite, Weatherproof Silicone Sealant',
    specs: {
      landArea: '450 m²',
      buildingArea: '720 m²',
      levels: '2 Levels',
      year: '2025',
      concreteGrade: 'K-300 SNI',
    },
    features: [
      'Zen dry garden with Japanese maple feature tree',
      'Integrated hidden gutters preventing external facade staining',
      'Private master suite with spa bathroom and sky garden',
    ],
    specsTable: [
      { label: 'Scope', value: 'Architectural Construction & Interior Finishing' },
      { label: 'Site Area', value: '450 m²' },
      { label: 'Building Area', value: '720 m²' },
      { label: 'Status', value: 'Completed' },
    ],
  },
  {
    title: 'RMB House',
    category: 'Private Residence',
    location: 'Surabaya Timur, Indonesia',
    img: '/images/projects/construction_crane_hq.jpg',
    desc: 'Timeless modern-classic residence featuring elegant proportions, bespoke mouldings, and an expansive double-height foyer with bespoke crystal chandelier support framework.',
    materials: 'Classic Profiling, Botticino Marble, Solid Mahogany Joinery, Cast Iron Balustrades',
    specs: {
      landArea: '680 m²',
      buildingArea: '1,100 m²',
      levels: '3 Levels',
      year: '2025',
      concreteGrade: 'K-350 SNI',
    },
    features: [
      'Monumental marble entrance portal with custom brass hardware',
      'Underground parking garage for 6 luxury vehicles',
      'Rooftop pavilion overlooking Surabaya skyline',
    ],
    specsTable: [
      { label: 'Scope', value: 'General Contracting & Classical Finishing' },
      { label: 'Site Area', value: '680 m²' },
      { label: 'Building Area', value: '1,100 m²' },
      { label: 'Status', value: 'Completed' },
    ],
  },
];

export interface FaqItem {
  id: string;
  questionId: string;
  questionEn: string;
  answerId: string;
  answerEn: string;
  category: string;
}

// DATASET FAQ RESMI (AEO / GEO / FAQPAGE SCHEMA)
export const WW_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    questionId: 'Apa keunggulan dan spesialisasi utama Wonderful Works Construction di Surabaya?',
    questionEn: 'What is Wonderful Works Construction primary specialization and advantage in Surabaya?',
    answerId: 'Wonderful Works Construction adalah studio arsitektur dan kontraktor umum premium di Surabaya yang memadukan desain spasial modern-tropis dengan ketelitian rekayasa sipil berstandar SNI. Kami mengkhususkan diri pada hunian mewah (luxury residences), fasad monolitik, dan bangunan komersial representatif dengan toleransi sudut laser 90° deviasi < 1mm.',
    answerEn: 'Wonderful Works Construction is a premier architecture and general contracting firm in Surabaya uniting modern-tropical spatial design with civil engineering precision under SNI standards. We specialize in luxury residences, monolithic facades, and bespoke commercial spaces with digital laser 90° corner tolerances under 1mm deviance.',
    category: 'General',
  },
  {
    id: 'faq-2',
    questionId: 'Standar mutu beton dan kontrol kualitas apa yang diterapkan dalam pembangunan?',
    questionEn: 'What concrete quality standards and quality controls does Wonderful Works Construction employ?',
    answerId: 'Untuk seluruh struktur utama (pondasi bore pile, sloof, kolom, dan plat dak lantai), kami menggunakan beton ReadyMix SNI K-350 dengan pengujian slump mandiri pada tiap truk mixer. Besi tulangan anti-seismik diikat kawat bendrat ganda tanpa kompromi rongga (zero honeycomb tolerance).',
    answerEn: 'For all critical load-bearing structures (bore piles, grade beams, columns, and floor slabs), we utilize ReadyMix SNI K-350 concrete with mandatory onsite slump testing per mixer truck. Anti-seismic rebar cages are double-wire secured with zero honeycomb tolerance.',
    category: 'Engineering',
  },
  {
    id: 'faq-3',
    questionId: 'Bagaimana transparansi anggaran biaya (RAB) dan sistem kontrak kerja?',
    questionEn: 'How does Wonderful Works Construction manage cost transparency (BOQ) and construction contracts?',
    answerId: 'Kami menerapkan transparansi 100% tanpa biaya tersembunyi (Zero Hidden Costs). RAB disusun terperinci berdasarkan Analisa Harga Satuan (AHS) internal dan spesifikasi material tertulis jelas. Pekerjaan diikat oleh Surat Perjanjian Kerja (SPK) legal berkekuatan hukum dengan jadwal pembayaran bertahap berbasis kurva progres fisik.',
    answerEn: 'We operate on 100% financial transparency with zero hidden costs. Bills of Quantities (BOQ/RAB) are meticulously itemized with verified unit price analyses and explicit material specifications. All projects are anchored by legally binding construction contracts (SPK) with milestone payments tied to actual physical progress.',
    category: 'Financial & Contract',
  },
  {
    id: 'faq-4',
    questionId: 'Apakah Wonderful Works Construction memfasilitasi pengurusan perizinan PBG dan SLF di Jawa Timur?',
    questionEn: 'Does Wonderful Works Construction facilitate building permits (PBG) and certification (SLF) in East Java?',
    answerId: 'Ya. Tim kami menyediakan asistensi menyeluruh untuk gambar kerja teknis, perhitungan struktur oleh insinyur bersertifikat, dan dokumen kepatuhan untuk pengajuan PBG (Persetujuan Bangunan Gedung) dan SLF (Sertifikat Laik Fungsi) di Kota Surabaya, Kabupaten Sidoarjo, dan Kabupaten Gresik.',
    answerEn: 'Yes. Our team provides complete technical drafting, licensed structural calculations, and compliance documentation for PBG (Building Approval Permit) and SLF (Certificate of Building Worthiness) submissions across Surabaya, Sidoarjo, and Gresik.',
    category: 'Licensing',
  },
  {
    id: 'faq-5',
    questionId: 'Berapa lama jaminan garansi dan masa retensi pemeliharaan setelah serah terima?',
    questionEn: 'What is the warranty and post-handover retention period provided?',
    answerId: 'Setiap proyek yang diserahterimakan mendapatkan Garansi Retensi Pemeliharaan selama 100 hari dengan tim respons cepat untuk perapian pasca-huni, serta Garansi Struktur Konstruksi hingga 5 tahun yang dilindungi sertifikat garansi resmi.',
    answerEn: 'Every handed-over project receives an official 100-Day Maintenance Retention Guarantee with dedicated rapid-response teams for post-occupancy adjustments, plus a Structural Warranty of up to 5 years backed by an official warranty certificate.',
    category: 'Warranty',
  },
  {
    id: 'faq-6',
    questionId: 'Wilayah mana saja yang dilayani oleh studio dan workshop Wonderful Works Construction?',
    questionEn: 'Which geographic regions are served by Wonderful Works Construction studio and workshop?',
    answerId: 'Studio dan workshop utama kami berlokasi di Semolowaru, Surabaya. Kami melayani proyek di seluruh wilayah metropolitan Surabaya (Citraland, Graha Famili, Pakuwon City, Dharmahusada), Sidoarjo, Gresik, Malang, serta proyek terpilih di Bali dan Jakarta.',
    answerEn: 'Our central studio and workshop are based in Semolowaru, Surabaya. We handle projects across Greater Surabaya (Citraland, Graha Famili, Pakuwon City, Dharmahusada), Sidoarjo, Gresik, Malang, as well as selected estates in Bali and Jakarta.',
    category: 'Coverage',
  },
];
