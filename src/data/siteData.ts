export interface ProjectDetail {
  title: string;
  category: string;
  location: string;
  img: string;
  desc: string;
  materials?: string;
  specs?: {
    landArea: string;
    buildingArea: string;
    levels: string;
    year: string;
    concreteGrade: string;
  };
  features?: string[];
  specsTable?: { label: string; value: string }[];
}

export interface FounderDetail {
  name: string;
  role: string;
  image?: string;
  isSvgPlaceholder?: boolean;
  focus: string;
  bio: string;
  credentials?: string[];
  quote?: string;
}

export const ROTATING_DISCIPLINES = ['Architecture', 'Interior', 'Planning', 'General Contracting'];

export const WW_PHILOSOPHIES = [
  {
    num: '01',
    title: 'INSIDE OUT',
    tagline: 'Mereduksi Batas Ruang Dalam & Luar',
    desc: 'Blurring the boundaries between indoor and outdoor through open layouts and flowing natural materials — creating spaces deeply connected to nature.',
    execution: 'Rekayasa bukaan void ganda tinggi dengan kisi fasad aluminium penahan tampias iklim tropis maritim Surabaya, memaksimalkan sirkulasi silang pasif dan pencahayaan alami tanpa radiasi panas berlebih.',
    img: '/images/projects/tropical_facade_hq.jpg',
    material: 'Double-Glazed Low-E Glass, Coastal Aluminium Louvers, Teak Pergola',
  },
  {
    num: '02',
    title: 'BALANCED CONTRAST',
    tagline: 'Harmoni Tekstur Kasar & Halus',
    desc: 'Creating bold yet balanced designs rich in texture and scale. Combining rough and smooth, raw and refined, grand and intimate — achieving harmony through contrast.',
    execution: 'Menyatukan ketangguhan mentah beton ekspos K-350 dan baja struktural hitam dengan keanggunan marmer alam bookmatched Italia, serta lantai kayu solid jati Jawa dengan nat laser deviasi < 1mm.',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    material: 'Statuario Natural Marble, Exposed Monolithic Concrete, Solid Teakwood',
  },
  {
    num: '03',
    title: 'NARRATIVE SPACE',
    tagline: 'Ruang Spasial yang Mengalir & Bercerita',
    desc: 'Spaces shaped by purpose and context, unfolding through sequence, scale, and form to tell a meaningful story of living.',
    execution: 'Alur sirkulasi ruang terhitung presisi. Seluruh instalasi utilitas MEP (pemipaan air bersih & conduit kelistrikan) ditanam rapi sebelum pengecoran struktur plat dak, menjamin 0% resiko bobok ulang pasca finishing.',
    img: '/images/projects/modern_villa_hq.jpg',
    material: 'Pre-Cast Embedded Conduit MEP, 90° Digital Corner Bevel, Acoustic Drywall',
  },
];

// 1 FOUNDER PROFILE (Photo placeholder handled via architectural SVG)
export const WW_FOUNDERS: FounderDetail[] = [
  {
    name: 'Ir. Calvin Limantoro, S.T., M.T.',
    role: 'Principal & Lead Master Builder',
    image: '',
    isSvgPlaceholder: true,
    focus: 'Architectural Engineering & Structural Master Planning',
    bio: 'Memimpin perencanaan arsitektur, rekayasa sipil presisi tinggi, dan konstruksi hunian mewah serta gedung komersial di Surabaya. Melanjutkan warisan 50+ tahun keluarga dalam dunia konstruksi dengan sistem pengawasan digital terintegrasi dan jaminan keterbukaan anggaran.',
    credentials: [
      'Sarjana Teknik Sipil (S.T.) & Magister Teknik Sipil Struktur (M.T.)',
      'Insinyur Profesional Teregistrasi (Ir.) & Asosiasi Kontraktor Nasional',
      '50+ Tahun Warisan Keluarga Konstruksi & Fabrikasi Presisi',
      'Pengawasan Langsung Lapangan & Kontrak SPK Transparan Tanpa Biaya Tersembunyi',
    ],
    quote: 'Kami memberikan solusi inovatif untuk efisiensi anggaran dalam konstruksi hunian mewah dan komersial tanpa mengorbankan kualitas, integritas struktur, dan ketepatan waktu.',
  },
];

// SERVICES FROM CENTRA ARYA LOKA (PT. Centra Arya Loka & Wonderful Works)
export const CENTRA_SERVICES = [
  {
    category: 'RESIDENTIAL BUILDING',
    subtitle: 'Your dream home, built with care and precision.',
    desc: 'Konstruksi rumah tinggal eksklusif arsitektur modern minimalis, klasik presisi, dan tropis kontemporer. Kenyamanan termal maksimal, sirkulasi udara pasif, dan pengerjaan finishing level milimeter.',
    types: [
      'Minimalist House',
      'Classic Minimalist House',
      'Industrial Minimalist House',
      'Modern Minimalist House',
    ],
    features: [
      'Void ganda arsitektural untuk ventilasi termal silang optimal',
      'Mutu beton struktur K-350 SNI ReadyMix dengan uji slump mandiri',
      'Presisi sudut siku 90° digital laser & nat marmer deviasi < 1mm',
      'Integrasi waterproofing membrane bakar 3mm pada seluruh dak atap',
    ],
    image: '/images/projects/luxury_residence_hq.jpg',
  },
  {
    category: 'COMMERCIAL BUILDING',
    subtitle: 'Functional, attractive spaces for thriving businesses.',
    desc: 'Pembangunan showroom representatif, kantor pusat korporat, klinik modern, dan ruang ritel bertrafik tinggi. Fokus pada daya tahan fisik, tata cahaya pameran, dan kepatuhan jadwal grand opening.',
    types: [
      'Offices & Workspaces',
      'Retail & Restaurants',
      'Flagship Showrooms',
      'Clinics & Service Facilities',
    ],
    features: [
      'Zonasi akustik, tata cahaya high-CRI & perencanaan HVAC komersial',
      'Struktur baja WF, fasad kaca curtain wall & partisi gypsum peredam suara',
      'Kepatuhan ketat time schedule & jaminan serah terima bebas denda keterlambatan',
      'Dokumentasi As-Built Drawings lengkap & Sertifikat Laik Fungsi (SLF)',
    ],
    image: '/images/projects/jotun_showroom_hq.jpg',
  },
];

// 10-STEP WORKFLOW FROM CENTRA ARYA LOKA (PT. CENTRA ARYA LOKA HERITAGE)
export const MASTER_METHODOLOGY = [
  {
    step: '01',
    title: 'Initial Consultation',
    subtitle: 'Visi, Kebutuhan & Standar Operasional',
    idDesc: 'Pertemuan perdana yang didedikasikan untuk menyelaraskan visi. Kami memperkenalkan standar operasional terukur, rekam jejak portofolio, serta mendefinisikan output prestisius yang akan Anda terima.',
    deliverable: 'Brief Desain Spasial & Estimasi Awal Timeline',
  },
  {
    step: '02',
    title: 'Precision Site Analysis',
    subtitle: 'Survey Lapangan & Aerial Drone',
    idDesc: 'Analisis lokasi dilakukan secara komprehensif oleh tim surveyor profesional. Pemanfaatan teknologi aerial drone imaging menangkap perspektif lingkungan guna integrasi desain yang sempurna.',
    deliverable: 'Laporan Topografi, Uji Daya Dukung Tanah & Foto Drone',
  },
  {
    step: '03',
    title: 'Bespoke Financial Engineering',
    subtitle: 'Penyusunan RAB Terbuka (Zero Hidden Cost)',
    idDesc: 'Penyusunan Rencana Anggaran Biaya oleh tim estimator spesialis dengan Analisa Harga Satuan (AHS) internal transparan. Material dikurasi teliti agar investasi sebanding dengan mutu fisik.',
    deliverable: 'Breakdown RAB Transparan & Jadwal Pembayaran Bertahap',
  },
  {
    step: '04',
    title: 'Collaborative Commitment',
    subtitle: 'Kontrak SPK Legal & Spesifikasi Material',
    idDesc: 'Penandatanganan kontrak kerja berkekuatan hukum yang mengedepankan transparansi. Pemaparan spesifikasi teknis material secara mendalam agar pemilik memahami seluruh aspek bangunan.',
    deliverable: 'Surat Perjanjian Kerja (SPK) & Lampiran Gambar Kerja',
  },
  {
    step: '05',
    title: 'Strategic Integrated Kick-off',
    subtitle: 'Time Schedule Rigid & Sinergi Arsitek',
    idDesc: 'Penyusunan Time Schedule (Kurva-S) yang rigid dan pelaksanaan kick-off meeting bersama tim internal serta mitra Arsitek untuk menyatukan target kerja dan meminimalisir deviasi.',
    deliverable: 'Kurva-S Proyek & Matriks Penugasan PIC Lapangan',
  },
  {
    step: '06',
    title: 'Real-time Progress Stewardship',
    subtitle: 'Laporan Visual Harian via WhatsApp Grup',
    idDesc: 'Pengawasan harian dan mingguan yang dilaporkan secara sistematis oleh Project Manager. Pemilik proyek dapat memantau setiap perkembangan signifikan di lokasi kapan saja.',
    deliverable: 'Grup WhatsApp Privat & Laporan Mingguan Terformat',
  },
  {
    step: '07',
    title: 'Material Curation & Verification',
    subtitle: 'Approval Ketat & Verifikasi Site Engineer',
    idDesc: 'Setiap material yang masuk melewati proses approval ketat. Site Engineer melakukan pengecekan berkala (1x seminggu) memastikan sinkronisasi antara gambar arsitektur dengan implementasi nyata.',
    deliverable: 'Lembar Approval Material & Log Uji Slump Beton',
  },
  {
    step: '08',
    title: 'The Signature Quality Control',
    subtitle: 'Supervisi Insinyur & Toleransi Sudut 90°',
    idDesc: 'Detail konstruksi berada di bawah pengawasan langsung dan kurasi ketat tim rekayasa sipil berlisensi. Memastikan toleransi sudut siku laser < 1mm dan kerapian jalur utilitas MEP.',
    deliverable: 'Checklist Pra-Cor & Laporan Inspeksi Finishing',
  },
  {
    step: '09',
    title: 'The Grand Handover',
    subtitle: 'Final Check Bersama & Penyerahan BAST',
    idDesc: 'Penyelesaian proyek ditandai dengan Final Check bersama antara klien, kontraktor, dan arsitek sebelum Berita Acara Serah Terima (BAST) dan penyerahan kunci resmi.',
    deliverable: 'BAST Resmi, Buku Manual Pemeliharaan & As-Built Drawings',
  },
  {
    step: '10',
    title: 'Post-Construction Stewardship',
    subtitle: 'Garansi Pekerjaan & Masa Retensi 100 Hari',
    idDesc: 'Komitmen kami melampaui masa serah terima fisik. Kami menyediakan garansi pemeliharaan dan inspeksi berkala untuk menjaga kenyamanan jangka panjang pemilik bangunan.',
    deliverable: 'Sertifikat Garansi Struktur & Layanan Respons Cepat 24 Jam',
  },
];

// WONDERFUL WORKS (WW.CONS) SELECTED PROJECTS & REALIZATIONS
export const WW_PROJECTS: ProjectDetail[] = [
  {
    title: 'DG House',
    category: 'Private Residence',
    location: 'Jakarta, Indonesia',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
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
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
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
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
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
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
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
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
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
    img: 'https://images.unsplash.com/photo-16005851554526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
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
    img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
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

// Clean backward compatibility aliases
export const BARCWAY_PHILOSOPHIES = WW_PHILOSOPHIES;
export const BARCWAY_FOUNDERS = WW_FOUNDERS;
export const BARCWAY_PROJECTS = WW_PROJECTS;
