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
 *   [x] WW_FOUNDERS diisi nama & foto founder ww.cons (kredensial menunggu data asli)
 *   [x] WW_PHILOSOPHIES ditulis ulang dengan suara sendiri
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
    title: 'OPEN LIVING',
    tagline: 'Ruang dalam dan luar yang menyatu',
    taglineEn: 'Indoors and outdoors as one space',
    desc: 'Denah terbuka dan bukaan lebar menyambungkan ruang dalam dengan taman dan teras, sehingga cahaya dan udara masuk dari banyak sisi.',
    descEn: 'Open plans and wide openings connect the interior to the garden and terrace, letting light and air in from several sides.',
    execution: 'Void setinggi dua lantai dan kisi aluminium di fasad menahan tampias hujan Surabaya, sambil tetap menjaga ventilasi silang dan cahaya alami tanpa panas berlebih.',
    executionEn: 'Double-height voids and aluminium facade louvers keep out Surabaya\'s driving rain while preserving cross-ventilation and daylight without excess heat.',
    img: '/images/projects/tropical_facade_hq.jpg',
    material: 'Kaca Low-E Double-Glazed, Kisi Aluminium, Pergola Kayu Jati',
    materialEn: 'Double-Glazed Low-E Glass, Aluminium Louvers, Teak Pergola',
  },
  {
    num: '02',
    title: 'MATERIAL CONTRAST',
    tagline: 'Kasar dan halus dalam satu ruang',
    taglineEn: 'Raw and refined in one room',
    desc: 'Beton ekspos dan baja hitam dipasangkan dengan marmer dan kayu jati. Teksturnya berbeda, tetapi proporsinya dihitung supaya ruang tetap tenang.',
    descEn: 'Exposed concrete and black steel are paired with marble and teak. The textures differ, but the proportions are worked out so the room stays calm.',
    execution: 'Beton ekspos K-350 dan baja struktural bertemu marmer alam bookmatched dan lantai kayu jati solid. Nat dipasang dengan panduan laser, deviasinya di bawah 1 mm.',
    executionEn: 'K-350 exposed concrete and structural steel meet bookmatched natural marble and solid teak floors. Joints are laser-set to under 1 mm deviation.',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    material: 'Marmer Statuario, Beton Ekspos K-350, Kayu Jati Solid',
    materialEn: 'Statuario Marble, K-350 Exposed Concrete, Solid Teak',
  },
  {
    num: '03',
    title: 'SPATIAL FLOW',
    tagline: 'Sirkulasi dirancang lebih dulu',
    taglineEn: 'Circulation planned first',
    desc: 'Urutan ruang dari pintu masuk sampai kamar tidur disusun mengikuti cara penghuni bergerak sehari-hari.',
    descEn: 'The sequence of rooms, from the entrance to the bedrooms, follows how the household moves through the day.',
    execution: 'Jalur pipa dan listrik (MEP) ditanam sebelum plat lantai dicor, jadi dinding dan lantai tidak perlu dibobok lagi setelah finishing.',
    executionEn: 'Plumbing and electrical (MEP) runs are embedded before the floor slab is poured, so walls and floors never need to be broken open after finishing.',
    img: '/images/projects/modern_villa_hq.jpg',
    material: 'Jalur MEP Tertanam, Siku 90° Laser, Drywall Akustik',
    materialEn: 'Embedded MEP Conduits, Laser-Set 90° Corners, Acoustic Drywall',
  },
];

/**
 * PROFIL FOUNDER WONDERFUL WORKS (WW.CONS).
 *
 * Hanya berisi data yang sudah pasti (nama, gelar, peran). Kredensial, bio
 * panjang, dan kutipan sengaja dikosongkan sampai ada data asli dari Alvin;
 * jangan diisi dengan klaim karangan. `quote` kosong = blok kutipan tidak tampil.
 */
export const WW_FOUNDERS: FounderDetail[] = [
  {
    name: 'Alvin Indrajaya Setia, S.T.',
    role: 'Pendiri & Direktur',
    roleEn: 'Founder & Director',
    image: '/images/founders/alvin_indrajaya.png',
    isSvgPlaceholder: false,
    focus: 'Perencanaan & Pelaksanaan Konstruksi',
    focusEn: 'Design & Construction Management',
    bio: 'Alvin memimpin Wonderful Works dan memegang langsung perencanaan serta pelaksanaan proyek, dari studi tapak sampai serah terima.',
    bioEn: 'Alvin leads Wonderful Works and oversees the planning and construction of its projects, from site study to handover.',
    credentials: ['Sarjana Teknik (S.T.)'],
    credentialsEn: ['Bachelor of Engineering (S.T.)'],
    quote: '',
    quoteEn: '',
  },
];

// LAYANAN ARSITEKTUR & KONSTRUKSI (BILINGUAL ID & EN)
export const CENTRA_SERVICES = [
  {
    category: 'RUMAH TINGGAL',
    categoryEn: 'RESIDENTIAL BUILDING',
    subtitle: 'Rumah yang dirancang dan dibangun oleh satu tim.',
    subtitleEn: 'Homes designed and built by one team.',
    desc: 'Rumah bergaya modern minimalis, klasik modern, dan tropis. Tata ruang diatur untuk ventilasi silang dan cahaya alami, dengan finishing yang diukur sampai milimeter.',
    descEn: 'Modern minimalist, modern classic, and tropical homes. Layouts are planned for cross-ventilation and daylight, with finishing measured to the millimetre.',
    types: [
      'Rumah Minimalis Tropis',
      'Rumah Klasik Modern',
      'Rumah Industrial',
      'Villa',
    ],
    typesEn: [
      'Tropical Minimalist Home',
      'Modern Classic Home',
      'Industrial Home',
      'Villa',
    ],
    features: [
      'Void dua lantai untuk ventilasi silang',
      'Beton struktur ReadyMix K-350 SNI, diuji slump di lokasi',
      'Siku 90° dan nat marmer dipasang dengan laser, deviasi di bawah 1 mm',
      'Membran waterproofing bakar 3 mm di seluruh dak atap',
    ],
    featuresEn: [
      'Double-height voids for cross-ventilation',
      'ReadyMix K-350 SNI structural concrete, slump-tested on site',
      '90° corners and marble joints laser-set to under 1 mm deviation',
      '3 mm torch-on waterproofing membrane on every roof deck',
    ],
    image: '/images/projects/luxury_residence_hq.jpg',
  },
  {
    category: 'BANGUNAN KOMERSIAL',
    categoryEn: 'COMMERCIAL BUILDING',
    subtitle: 'Kantor, toko, dan showroom yang siap dibuka sesuai jadwal.',
    subtitleEn: 'Offices, shops, and showrooms ready to open on schedule.',
    desc: 'Showroom, kantor, klinik, dan ruang ritel. Kami merencanakan daya tahan material, tata cahaya display, dan jadwal kerja yang mengikuti tanggal pembukaan Anda.',
    descEn: 'Showrooms, offices, clinics, and retail spaces. We plan for material durability, display lighting, and a schedule built around your opening date.',
    types: [
      'Kantor',
      'Retail & Restoran',
      'Showroom',
      'Klinik',
    ],
    typesEn: [
      'Offices',
      'Retail & Restaurants',
      'Showrooms',
      'Clinics',
    ],
    features: [
      'Zonasi akustik, pencahayaan high-CRI, dan perencanaan HVAC',
      'Struktur baja WF, fasad curtain wall, dan partisi gypsum kedap suara',
      'Jadwal Kurva-S tertulis di kontrak, dengan jaminan serah terima tepat waktu',
      'Gambar as-built lengkap dan pendampingan Sertifikat Laik Fungsi (SLF)',
    ],
    featuresEn: [
      'Acoustic zoning, high-CRI lighting, and HVAC planning',
      'WF steel structure, curtain wall facade, and soundproof gypsum partitions',
      'S-curve schedule written into the contract, with an on-time handover guarantee',
      'Full as-built drawings and SLF (certificate of occupancy) support',
    ],
    image: '/images/projects/jotun_showroom_hq.jpg',
  },
];

// ALUR KERJA 10 TAHAP (BILINGUAL ID & EN)
export const MASTER_METHODOLOGY = [
  {
    step: '01',
    title: 'Konsultasi Awal',
    titleEn: 'Initial Consultation',
    subtitle: 'Kebutuhan, anggaran, dan jadwal',
    subtitleEn: 'Needs, budget, and timeline',
    idDesc: 'Kami membahas kebutuhan ruang, kisaran anggaran, dan target waktu Anda, lalu menunjukkan proyek yang pernah kami kerjakan dan cara kerja kami.',
    enDesc: 'We go through your space requirements, budget range, and timeline, then walk you through past projects and how we work.',
    deliverable: 'Brief desain & perkiraan jadwal awal',
    deliverableEn: 'Design brief & preliminary timeline',
  },
  {
    step: '02',
    title: 'Survei Lokasi',
    titleEn: 'Site Survey',
    subtitle: 'Pengukuran lahan & foto drone',
    subtitleEn: 'Site measurement & drone survey',
    idDesc: 'Tim surveyor mengukur lahan, menguji daya dukung tanah, dan memotret lokasi dengan drone. Hasilnya dipakai untuk menentukan orientasi bangunan dan jenis pondasi.',
    enDesc: 'Our surveyors measure the plot, test soil bearing capacity, and capture the site by drone. The results set the building orientation and foundation type.',
    deliverable: 'Laporan topografi, uji daya dukung tanah & foto drone',
    deliverableEn: 'Topographic report, soil bearing test & drone photos',
  },
  {
    step: '03',
    title: 'RAB Terbuka',
    titleEn: 'Itemized Budget',
    subtitle: 'Rincian biaya per item',
    subtitleEn: 'Line-item costing',
    idDesc: 'Estimator menyusun Rencana Anggaran Biaya (RAB) per item berdasarkan Analisa Harga Satuan (AHS). Setiap material ditulis jenis dan spesifikasinya, jadi Anda tahu persis apa yang dibayar.',
    enDesc: 'Our estimators itemize the bill of quantities (RAB) using unit price analysis (AHS). Every material is listed with its type and specification, so you know exactly what you are paying for.',
    deliverable: 'Rincian RAB & jadwal pembayaran bertahap',
    deliverableEn: 'Itemized BOQ & staged payment schedule',
  },
  {
    step: '04',
    title: 'Kontrak Kerja',
    titleEn: 'Contract Signing',
    subtitle: 'SPK & spesifikasi material',
    subtitleEn: 'Work agreement (SPK) & specifications',
    idDesc: 'Semua kesepakatan dituangkan dalam Surat Perjanjian Kerja (SPK). Lampirannya memuat gambar kerja dan spesifikasi material, jadi tidak ada yang berubah diam-diam di lapangan.',
    enDesc: 'Everything agreed goes into a signed work agreement (SPK), with working drawings and material specifications attached, so nothing changes quietly on site.',
    deliverable: 'SPK & lampiran gambar kerja',
    deliverableEn: 'SPK contract & working drawings',
  },
  {
    step: '05',
    title: 'Kick-off Proyek',
    titleEn: 'Project Kick-off',
    subtitle: 'Jadwal Kurva-S & pembagian tugas',
    subtitleEn: 'S-curve schedule & team assignments',
    idDesc: 'Kami menyusun jadwal Kurva-S dan menggelar rapat awal bersama tim lapangan dan arsitek, supaya target mingguan jelas sebelum pekerjaan dimulai.',
    enDesc: 'We build the S-curve (Kurva-S) schedule and hold a kick-off meeting with the site team and architect, so weekly targets are clear before work starts.',
    deliverable: 'Kurva-S proyek & daftar PIC lapangan',
    deliverableEn: 'Project S-curve & site PIC list',
  },
  {
    step: '06',
    title: 'Laporan Harian',
    titleEn: 'Daily Reporting',
    subtitle: 'Foto progres via grup WhatsApp',
    subtitleEn: 'Progress photos via WhatsApp group',
    idDesc: 'Project Manager mengirim foto dan catatan progres setiap hari ke grup WhatsApp proyek, ditambah laporan mingguan. Anda bisa memantau lokasi dari mana saja.',
    enDesc: 'The project manager posts daily photos and notes to the project WhatsApp group, plus a weekly report, so you can follow the site from anywhere.',
    deliverable: 'Grup WhatsApp proyek & laporan mingguan',
    deliverableEn: 'Project WhatsApp group & weekly reports',
  },
  {
    step: '07',
    title: 'Pemeriksaan Material',
    titleEn: 'Material Checks',
    subtitle: 'Approval sampel & uji slump',
    subtitleEn: 'Sample approval & slump tests',
    idDesc: 'Material yang datang dicocokkan dengan sampel yang sudah disetujui. Beton diuji slump per truk, dan Site Engineer memeriksa pekerjaan terhadap gambar kerja.',
    enDesc: 'Incoming materials are checked against approved samples. Concrete is slump-tested per truck, and the site engineer checks the work against the drawings.',
    deliverable: 'Lembar approval material & catatan uji slump',
    deliverableEn: 'Material approval sheets & slump test records',
  },
  {
    step: '08',
    title: 'Kontrol Kualitas',
    titleEn: 'Quality Control',
    subtitle: 'Inspeksi insinyur & toleransi siku 90°',
    subtitleEn: 'Engineer inspection & 90° tolerance',
    idDesc: 'Insinyur sipil memeriksa pembesian sebelum pengecoran dan finishing sesudahnya. Siku 90° dicek dengan laser dengan toleransi di bawah 1 mm, dan jalur MEP diperiksa sebelum ditutup.',
    enDesc: 'Civil engineers inspect the rebar before each pour and the finishing afterwards. 90° corners are laser-checked to under 1 mm, and MEP runs are inspected before they are closed up.',
    deliverable: 'Checklist pra-cor & laporan inspeksi finishing',
    deliverableEn: 'Pre-pour checklist & finishing inspection report',
  },
  {
    step: '09',
    title: 'Serah Terima (BAST)',
    titleEn: 'Handover (BAST)',
    subtitle: 'Pemeriksaan akhir bersama',
    subtitleEn: 'Joint final inspection',
    idDesc: 'Klien, kontraktor, dan arsitek memeriksa bangunan bersama. Setelah semua catatan diselesaikan, Berita Acara Serah Terima (BAST) ditandatangani dan kunci diserahkan.',
    enDesc: 'Client, contractor, and architect walk the building together. Once every open item is resolved, the handover record (BAST) is signed and the keys are handed over.',
    deliverable: 'BAST, buku panduan perawatan & gambar as-built',
    deliverableEn: 'BAST, maintenance manual & as-built drawings',
  },
  {
    step: '10',
    title: 'Garansi & Pemeliharaan',
    titleEn: 'Warranty & Maintenance',
    subtitle: 'Retensi 100 hari & garansi struktur 5 tahun',
    subtitleEn: '100-day retention & 5-year structural warranty',
    idDesc: 'Setelah serah terima, ada masa retensi 100 hari untuk perbaikan kecil dan garansi struktur hingga 5 tahun. Tim kami tetap bisa dihubungi kalau ada masalah.',
    enDesc: 'After handover you get a 100-day retention period for minor fixes and a structural warranty of up to 5 years. Our team stays reachable if anything comes up.',
    deliverable: 'Sertifikat garansi struktur & layanan respons cepat',
    deliverableEn: 'Structural warranty certificate & rapid response',
  },
];

// WONDERFUL WORKS (WW.CONS) SELECTED PROJECTS & REALIZATIONS
export const WW_PROJECTS: ProjectDetail[] = [
  {
    title: 'Tiger Billiard',
    category: 'Commercial & Entertainment',
    categoryEn: 'Commercial & Entertainment',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/tiger_billiard.jpg',
    gallery: [
      '/images/projects/tiger_billiard.jpg',
      '/images/projects/tiger_billiard_detail.jpg',
    ],
    desc: 'Arena billiard dan lounge modern yang dirancang dengan tata pencahayaan overhead presisi, lantai karpet akustik peredam benturan, serta integrasi bar lounge dan area tunggu yang nyaman.',
    descEn: 'Modern billiard arena and lounge engineered with precision overhead lighting, acoustic noise-dampening carpeting, and an integrated bar lounge and waiting area.',
    materials: 'Acoustic Ceiling Panels, Custom Overhead LED Box, Commercial Carpet Tile, Steel Partition',
    materialsEn: 'Acoustic Ceiling Panels, Custom Overhead LED Box, Commercial Carpet Tile, Steel Partition',
    specs: {
      landArea: '450 m²',
      buildingArea: '680 m²',
      levels: '1.5 Levels',
      year: '2026',
      concreteGrade: 'Commercial Fit-Out',
    },
    features: [
      'Pencahayaan khusus meja billiard non-glare high-lumen',
      'Peredaman akustik untuk kenyamanan pengunjung',
      'Integrasi bar counter, sound system, dan area istirahat pemain',
      'Finishing dinding industrial modern dengan cat bertekstur',
    ],
    featuresEn: [
      'Dedicated non-glare high-lumen table illumination',
      'Acoustic absorption ensuring visitor comfort',
      'Integrated bar counter, audio system, and players rest area',
      'Industrial modern wall finishes with textured coatings',
    ],
    specsTable: [
      { label: 'Scope', value: 'Interior Architecture, MEP & Turnkey Fit-Out' },
      { label: 'Building Area', value: '680 m²' },
      { label: 'Status', value: 'Completed & Operational' },
      { label: 'Pencahayaan', value: 'Custom High-Lumen Non-Glare System' },
    ],
    specsTableEn: [
      { label: 'Scope', value: 'Interior Architecture, MEP & Turnkey Fit-Out' },
      { label: 'Building Area', value: '680 m²' },
      { label: 'Status', value: 'Completed & Operational' },
      { label: 'Lighting', value: 'Custom High-Lumen Non-Glare System' },
    ],
  },
  {
    title: 'Prasindo Abadi',
    category: 'Commercial Building',
    categoryEn: 'Commercial Building',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/prasindo_abadi.jpg',
    gallery: [
      '/images/projects/prasindo_abadi.jpg',
    ],
    desc: 'Bangunan komersial dan kantor operasional dengan fasad secondary skin perforated metal modern berpadu batu alam andesit dan pintu geser kaca tempered untuk tampilan elegan sekaligus fungsional.',
    descEn: 'Commercial operations building and headquarters featuring a modern perforated metal secondary skin facade paired with natural andesite stone and tempered glass sliding doors.',
    materials: 'Perforated Metal Sheet, Struktur Baja WF, Batu Alam Andesit, Kaca Tempered 10mm',
    materialsEn: 'Perforated Metal Sheet, WF Structural Steel, Natural Andesite Stone, 10mm Tempered Glass',
    specs: {
      landArea: '300 m²',
      buildingArea: '550 m²',
      levels: '3 Levels',
      year: '2025',
      concreteGrade: 'K-300 SNI',
    },
    features: [
      'Secondary skin plat perforated menahan panas matahari langsung',
      'Struktur rangka baja kokoh dan tahan gempa',
      'Integrasi ruang display retail di lantai 1 dan kantor operasional lantai atas',
      'Finishing lantai granit tile heavy-duty tahan abrasi',
    ],
    featuresEn: [
      'Perforated metal secondary skin shielding direct solar heat',
      'Robust seismic-resistant structural steel frame',
      'Ground-floor retail display integration with upper-floor offices',
      'Heavy-duty abrasion-resistant granite tile flooring',
    ],
    specsTable: [
      { label: 'Scope', value: 'Fasad Modernisasi, Struktur Sipil & Fit-Out' },
      { label: 'Building Area', value: '550 m²' },
      { label: 'Status', value: 'Completed' },
      { label: 'Fasad', value: 'Perforated Metal Skin + Laser Siku 90°' },
    ],
    specsTableEn: [
      { label: 'Scope', value: 'Facade Modernization, Civil Structure & Fit-Out' },
      { label: 'Building Area', value: '550 m²' },
      { label: 'Status', value: 'Completed' },
      { label: 'Facade', value: 'Perforated Metal Skin + Laser 90° Alignment' },
    ],
  },
  {
    title: 'Rungkut Mapan',
    category: 'Private Residence',
    categoryEn: 'Private Residence',
    location: 'Surabaya Timur, Indonesia',
    img: '/images/projects/rungkut_mapan.jpg',
    gallery: [
      '/images/projects/rungkut_mapan.jpg',
    ],
    desc: 'Hunian mewah bergaya modern tropis yang memadukan kisi-kisi kayu solid tahan cuaca, taman vertikal bertingkat, dan gerbang baja hitam minimalis untuk privasi maksimal dan sirkulasi udara optimal.',
    descEn: 'Luxury modern tropical residence harmonizing weatherproof solid wood louvers, tiered vertical landscaping, and minimalist black steel entrance for optimal privacy and breeze circulation.',
    materials: 'Kayu Solid Tahan Cuaca, Batu Granit Alam, Kusen Aluminium Powder-Coated, Kaca Low-E',
    materialsEn: 'Weatherproof Solid Timber, Natural Granite, Powder-Coated Aluminium, Low-E Glazing',
    specs: {
      landArea: '350 m²',
      buildingArea: '600 m²',
      levels: '3 Levels',
      year: '2025',
      concreteGrade: 'K-350 SNI',
    },
    features: [
      'Fasad kisi kayu vertikal untuk privasi dan peneduh alami',
      'Taman gantung di balkon lantai atas untuk iklim mikro yang sejuk',
      'Pintu gerbang otomatis dengan plat perforated solid',
      'Waterproofing membran bakar 3mm di seluruh area dak terbuka',
    ],
    featuresEn: [
      'Vertical timber screen facade for natural shade and privacy',
      'Upper balcony hanging garden for cooling microclimate',
      'Automated entrance gate with solid perforated panels',
      '3mm torch-on waterproofing membrane on all open roof decks',
    ],
    specsTable: [
      { label: 'Scope', value: 'Design & Build, Struktur & Finishing Mewah' },
      { label: 'Site Area', value: '350 m²' },
      { label: 'Building Area', value: '600 m²' },
      { label: 'Status', value: 'Completed' },
      { label: 'Garansi', value: '100 Hari Retensi + Garansi Struktur 5 Tahun' },
    ],
    specsTableEn: [
      { label: 'Scope', value: 'Design & Build, Structural & Luxury Finishing' },
      { label: 'Site Area', value: '350 m²' },
      { label: 'Building Area', value: '600 m²' },
      { label: 'Status', value: 'Completed' },
      { label: 'Warranty', value: '100-Day Retention + 5-Year Structural Warranty' },
    ],
  },
  {
    title: 'Gate Akses Kebomas',
    category: 'Infrastructure & Commercial',
    categoryEn: 'Infrastructure & Commercial',
    location: 'Kebomas, Gresik, Indonesia',
    img: '/images/projects/gate_akses_kebomas.jpg',
    gallery: [
      '/images/projects/gate_akses_kebomas.jpg',
    ],
    desc: 'Gerbang utama dan pos akses keamanan kawasan industri/komersial Kebomas dengan struktur kanopi bentang lebar, barrier gate otomatis, dan pos pantau dua tingkat ber-AC.',
    descEn: 'Main entrance gate and security checkpoint for Kebomas industrial/commercial complex featuring wide-span canopy structure, automatic barrier gates, and a 2-level air-conditioned guardhouse.',
    materials: 'Struktur Baja Berat IWF, Alumunium Composite Panel (ACP), Paving Block K-300, Kaca Tempered',
    materialsEn: 'Heavy IWF Structural Steel, Aluminium Composite Panels (ACP), K-300 Interlocking Paving, Tempered Glass',
    specs: {
      landArea: '500 m²',
      buildingArea: '180 m²',
      levels: '2 Levels',
      year: '2025',
      concreteGrade: 'K-300 SNI',
    },
    features: [
      'Kanopi bentang lebar untuk proteksi jalur masuk & keluar kendaraan berat',
      'Pos pantau 360 derajat dengan tangga putar baja eksternal',
      'Sistem drainase tertanam dan perkerasan jalan tahan beban kontainer',
      'Integrasi sistem access gate otomatis dan CCTV pengawas',
    ],
    featuresEn: [
      'Wide-span steel canopy sheltering heavy vehicle entry and exit lanes',
      '360-degree observation post with external steel spiral staircase',
      'Integrated embedded drainage and heavy-duty load-bearing pavement',
      'Automated barrier gate integration and surveillance CCTV',
    ],
    specsTable: [
      { label: 'Scope', value: 'Civil Infrastructure, Steel Canopy & Security Fit-Out' },
      { label: 'Status', value: 'Completed & Operational' },
      { label: 'Pondasi', value: 'Bore Pile & Plat Beton K-300 Heavy-Duty' },
    ],
    specsTableEn: [
      { label: 'Scope', value: 'Civil Infrastructure, Steel Canopy & Security Fit-Out' },
      { label: 'Status', value: 'Completed & Operational' },
      { label: 'Foundation', value: 'Bore Pile & K-300 Heavy-Duty Concrete Slab' },
    ],
  },
  {
    title: 'Jotun Showroom Flagship',
    category: 'Commercial Showroom',
    categoryEn: 'Commercial Showroom',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/jotun_showroom_hq.jpg',
    gallery: [
      '/images/projects/jotun_showroom_hq.jpg',
      '/images/projects/jotun_showroom_entrance.jpg',
      '/images/projects/jotun_showroom_palette.jpg',
      '/images/projects/jotun_showroom_display.jpg',
      '/images/projects/jotun_showroom_consultation.jpg',
      '/images/projects/jotun_showroom_lounge.jpg',
      '/images/projects/jotun_showroom_detail.jpg',
      '/images/projects/jotun_showroom_exterior.jpg',
    ],
    desc: 'Showroom resmi Jotun Colour Store yang dirancang dan dibangun mengikuti standar global korporat. Dilengkapi partisi display heavy-duty presisi laser, pencahayaan high-CRI 97+ untuk akurasi warna cat sejati, dan lounge konsultasi arsitektural.',
    descEn: 'Official Jotun Colour Store flagship showroom built strictly to global corporate standards. Features laser-aligned heavy-duty display partitions, museum-grade CRI 97+ lighting for 100% color fidelity, and an architectural consultation lounge.',
    materials: 'Partisi Drywall Heavy, Track Lighting High-CRI 97+, Plafon Akustik Seamless, Lantai Vinyl Wood Grain',
    materialsEn: 'Heavy-Duty Drywall Partitions, High-CRI 97+ Track Lighting, Seamless Acoustic Ceiling, Wood Grain Vinyl Flooring',
    specs: {
      landArea: '400 m²',
      buildingArea: '750 m²',
      levels: '2 Levels',
      year: '2026',
      concreteGrade: 'Commercial Fit-Out',
    },
    features: [
      'Penyelarasan siku 90° dengan panduan laser digital untuk rak panel display cat',
      'Pencahayaan high-CRI 97+ menjamin akurasi 100% warna cat interior & eksterior',
      'Meja konsultasi warna berkonsep round table dan area tunggu eksklusif',
      'Selesai tepat waktu sesuai jadwal peresmian grand opening korporat',
    ],
    featuresEn: [
      'Laser-guided 90° corner alignment for paint sample display panels',
      'High-CRI 97+ lighting ensuring 100% true color fidelity',
      'Round-table color consultation desk and exclusive client lounge',
      'Completed on-time meeting strict corporate grand opening milestones',
    ],
    specsTable: [
      { label: 'Scope', value: 'Commercial Fit-Out, MEP, Custom Partitions & Lighting' },
      { label: 'Building Area', value: '750 m²' },
      { label: 'Status', value: 'Active Flagship' },
      { label: 'Presisi', value: 'Laser Siku 90° (< 1mm deviasi)' },
    ],
    specsTableEn: [
      { label: 'Scope', value: 'Commercial Fit-Out, MEP, Custom Partitions & Lighting' },
      { label: 'Building Area', value: '750 m²' },
      { label: 'Status', value: 'Active Flagship' },
      { label: 'Precision', value: 'Laser 90° Alignment (< 1mm deviation)' },
    ],
  },
  {
    title: 'Graha Santoso',
    category: 'Commercial & Office Interior',
    categoryEn: 'Commercial & Office Interior',
    location: 'Surabaya, Indonesia',
    img: '/images/projects/graha_santoso_office.jpg',
    gallery: [
      '/images/projects/graha_santoso_office.jpg',
    ],
    desc: 'Interior kantor eksekutif dan ruang rapat direksi dengan aksen dinding marmer hitam Nero Marquina berkilau, credenza kayu solid custom, dan tata cahaya cove lighting hangat.',
    descEn: 'Executive suite and boardroom interior showcasing polished black Nero Marquina bookmatched marble backdrop, bespoke solid walnut cabinetry, and warm cove ambient illumination.',
    materials: 'Marmer Nero Marquina, Kayu Walnut Solid, Drop Ceiling Cove Light, Kaca Partisi Akustik',
    materialsEn: 'Nero Marquina Marble, Solid Walnut Wood, Drop Ceiling Cove Light, Acoustic Glass Partitions',
    specs: {
      landArea: '200 m²',
      buildingArea: '320 m²',
      levels: '1 Level',
      year: '2025',
      concreteGrade: 'Executive Fit-Out',
    },
    features: [
      'Dinding marmer alam bookmatched dengan nat laser presisi',
      'Meja kerja eksekutif terintegrasi jalur kabel tertanam (concealed wire management)',
      'Peredaman suara antar ruang untuk privasi percakapan strategis',
    ],
    featuresEn: [
      'Bookmatched natural marble feature wall with laser precision joints',
      'Executive desk with concealed cable management system',
      'Acoustic wall isolation ensuring executive conversation privacy',
    ],
    specsTable: [
      { label: 'Scope', value: 'Bespoke Executive Interior & MEP Fit-Out' },
      { label: 'Building Area', value: '320 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    specsTableEn: [
      { label: 'Scope', value: 'Bespoke Executive Interior & MEP Fit-Out' },
      { label: 'Building Area', value: '320 m²' },
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
    questionId: 'Apa spesialisasi Wonderful Works Construction di Surabaya?',
    questionEn: 'What does Wonderful Works Construction specialize in?',
    answerId: 'Wonderful Works Construction adalah kontraktor rancang bangun di Surabaya. Kami mengerjakan desain arsitektur, interior, dan konstruksi untuk rumah tinggal dan bangunan komersial dengan standar teknik sipil SNI. Finishing dicek dengan laser, dengan toleransi siku di bawah 1 mm.',
    answerEn: 'Wonderful Works Construction is a design-build contractor in Surabaya. We handle architecture, interiors, and construction for homes and commercial buildings to SNI civil engineering standards. Finishing is laser-checked, with corner tolerances under 1 mm.',
    category: 'General',
  },
  {
    id: 'faq-2',
    questionId: 'Mutu beton dan kontrol kualitas apa yang dipakai Wonderful Works Construction?',
    questionEn: 'What concrete grade and quality control does Wonderful Works Construction use?',
    answerId: 'Struktur utama (bore pile, sloof, kolom, dan plat lantai) memakai beton ReadyMix K-350 sesuai SNI. Setiap truk mixer diuji slump di lokasi sebelum dicor. Tulangan anti-seismik diikat kawat bendrat ganda, dan hasil cor diperiksa supaya tidak ada keropos (honeycomb).',
    answerEn: 'Main structural elements (bore piles, grade beams, columns, and floor slabs) use SNI-compliant ReadyMix K-350 concrete. Every mixer truck is slump-tested on site before pouring. Seismic-grade rebar is double-tied, and each pour is checked for honeycombing.',
    category: 'Engineering',
  },
  {
    id: 'faq-3',
    questionId: 'Bagaimana sistem RAB dan kontrak kerja di Wonderful Works Construction?',
    questionEn: 'How do budgeting (RAB) and contracts work at Wonderful Works Construction?',
    answerId: 'RAB disusun per item berdasarkan Analisa Harga Satuan (AHS), lengkap dengan spesifikasi material, jadi tidak ada biaya tersembunyi. Pekerjaan diikat Surat Perjanjian Kerja (SPK), dan pembayaran dilakukan bertahap sesuai progres fisik di lapangan.',
    answerEn: 'The bill of quantities (RAB) is itemized using unit price analysis (AHS) with full material specifications, so there are no hidden costs. Work is bound by a signed agreement (SPK), and payments are staged against physical progress on site.',
    category: 'Financial & Contract',
  },
  {
    id: 'faq-4',
    questionId: 'Apakah Wonderful Works Construction membantu pengurusan PBG dan SLF?',
    questionEn: 'Does Wonderful Works Construction help with PBG permits and SLF certificates?',
    answerId: 'Ya. Kami menyiapkan gambar kerja, perhitungan struktur oleh insinyur bersertifikat, dan dokumen pendukung untuk pengajuan PBG (Persetujuan Bangunan Gedung) dan SLF (Sertifikat Laik Fungsi) di Surabaya, Sidoarjo, dan Gresik.',
    answerEn: 'Yes. We prepare working drawings, structural calculations by certified engineers, and supporting documents for PBG (building approval) and SLF (certificate of occupancy) submissions in Surabaya, Sidoarjo, and Gresik.',
    category: 'Licensing',
  },
  {
    id: 'faq-5',
    questionId: 'Berapa lama garansi dan masa retensi setelah serah terima?',
    questionEn: 'What warranty and retention period do you provide after handover?',
    answerId: 'Setiap proyek mendapat masa retensi pemeliharaan 100 hari untuk perbaikan pasca-huni, serta garansi struktur hingga 5 tahun dengan sertifikat garansi tertulis.',
    answerEn: 'Every project gets a 100-day maintenance retention period for post-occupancy fixes, plus a structural warranty of up to 5 years with a written certificate.',
    category: 'Warranty',
  },
  {
    id: 'faq-6',
    questionId: 'Wilayah mana saja yang dilayani Wonderful Works Construction?',
    questionEn: 'Which areas does Wonderful Works Construction serve?',
    answerId: 'Studio dan workshop kami ada di Jl. Semolowaru No. 29, Surabaya. Kami menerima proyek di Surabaya, Sidoarjo, dan Gresik.',
    answerEn: 'Our studio and workshop are at Jl. Semolowaru No. 29, Surabaya. We take on projects in Surabaya, Sidoarjo, and Gresik.',
    category: 'Coverage',
  },
];
