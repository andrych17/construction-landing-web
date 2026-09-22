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

export const ROTATING_DISCIPLINES = ['Architecture', 'Interior', 'Planning', 'General Contracting'];

export const BARCWAY_PHILOSOPHIES = [
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

export const BARCWAY_FOUNDERS = [
  {
    name: 'Edward Matthew',
    role: 'Principal',
    image: '/images/founders/edward_matthew.jpg',
    focus: 'Architectural Vision & Spatial Master Planning',
    bio: 'Directing architectural innovation, monumental form exploration, and seamless spatial dialogues between private sanctuaries and their natural context.',
  },
  {
    name: 'Jefferson D. Halim',
    role: 'Principal',
    image: '/images/founders/jefferson_halim.jpg',
    focus: 'Interior Architecture & Material Harmony',
    bio: 'Orchestrating bespoke interior narratives, textural tension between raw and refined surfaces, and structural finishing fidelity across Surabaya commissions.',
  },
];

export const CENTRA_SERVICES = [
  {
    category: 'RESIDENTIAL BUILDING',
    subtitle: 'Your dream home, built with care and precision.',
    desc: 'Bespoke high-end private residences engineered for optimal tropical comfort, abundant natural light, and structural resilience.',
    types: [
      'Minimalist House',
      'Classic Minimalist House',
      'Industrial Minimalist House',
      'Modern Minimalist House',
    ],
    features: [
      'Double-height void thermal ventilation & cross airflow',
      'Structural grade SNI K-350 reinforced concrete framework',
      'Laser 90° deviance < 1mm interior marble & timber joinery',
    ],
    image: '/images/projects/luxury_residence_hq.jpg',
  },
  {
    category: 'COMMERCIAL BUILDING',
    subtitle: 'Functional, attractive spaces for thriving businesses.',
    desc: 'Prestigious commercial venues engineered for workflow efficiency, commanding street presence, and high-traffic durability.',
    types: [
      'Offices & Workspaces',
      'Retail & Restaurants',
      'Clinics & Service Facilities',
    ],
    features: [
      'Acoustic zoning, ergonomic lighting & commercial HVAC planning',
      'Industrial steel, architectural glass & fire-rated partitions',
      'Strict milestone compliance & zero overhead delay handovers',
    ],
    image: '/images/projects/jotun_showroom_hq.jpg',
  },
];

export const MASTER_METHODOLOGY = [
  {
    step: '01',
    title: 'Discovery & Vision Alignment',
    idDesc: 'Pertemuan perdana yang didedikasikan untuk menyelaraskan visi desain, kebutuhan ruang, dan standar operasional cal.idn.',
  },
  {
    step: '02',
    title: 'Aerial Drone & Site Survey',
    idDesc: 'Analisis lokasi komprehensif memanfaatkan teknologi aerial drone imaging untuk menangkap perspektif lingkungan dan kontur tapak.',
  },
  {
    step: '03',
    title: 'Bespoke Financial Engineering (RAB)',
    idDesc: 'Penyusunan Rencana Anggaran Biaya akurat dengan Proprietary AHS (Analisa Harga Satuan) internal cal.idn tanpa hidden cost.',
  },
  {
    step: '04',
    title: 'Collaborative Commitment (SPK)',
    idDesc: 'Penandatanganan kontrak kerja transparan dengan pemaparan spesifikasi teknis material dan time schedule (TS) resmi.',
  },
  {
    step: '05',
    title: 'Systematic Milestone Dispatch',
    idDesc: 'Pengawasan harian dan mingguan yang dilaporkan secara sistematis dan real-time oleh Project Manager dan PIC lapangan.',
  },
  {
    step: '06',
    title: 'Rigorous Material Approval',
    idDesc: 'Setiap material masuk melewati uji slump on-site dan approval berkala Site Engineer untuk sinkronisasi gambar kerja.',
  },
  {
    step: '07',
    title: 'Principal Quality Supervision',
    idDesc: 'Pengawasan langsung oleh tim insinyur sipil berpengalaman 35 tahun menjamin standar mutu tertinggi pada setiap sudut.',
  },
  {
    step: '08',
    title: 'Collaborative Handover & Routine Warranty',
    idDesc: 'Final check bersama arsitek sebelum penandatanganan BAST, dilengkapi masa garansi dan inspeksi rutin 2x setahun.',
  },
];

export const BARCWAY_PROJECTS: ProjectDetail[] = [
  {
    title: 'DG House',
    category: 'Private Residence',
    location: 'Citraland, Surabaya Barat',
    img: '/images/projects/luxury_residence_hq.jpg',
    desc: 'Monumental modern residence engineered with dramatic cantilevered monolithic volumes and seamless indoor-outdoor water courts.',
    specs: {
      landArea: '750 m²',
      buildingArea: '980 m²',
      levels: '3 Storeys + Basement',
      year: '2024',
      concreteGrade: 'K-350 Ready-Mix SNI',
    },
    features: [
      'Cantilevered upper living pavilion with zero-column perimeter',
      'Reflecting lap pool with black granite negative-edge weir',
      'Smart home automated climate and louvre solar tracking',
    ],
  },
  {
    title: 'MJ House',
    category: 'Tropical Villa',
    location: 'Pakuwon Indah, Surabaya Barat',
    img: '/images/projects/tropical_facade_hq.jpg',
    desc: 'Harmonious interplay of raw board-formed concrete and warm Indonesian teak louvers designed for tropical maritime airflow.',
    specs: {
      landArea: '600 m²',
      buildingArea: '820 m²',
      levels: '2 Storeys + Rooftop Deck',
      year: '2023',
      concreteGrade: 'K-350 Board-Form Finish',
    },
    features: [
      'Bespoke motorized teak sunscreen screen facade',
      'Internal courtyard garden acting as central thermal lung',
      'Bookmatched Italian Calacatta marble dry kitchen island',
    ],
  },
  {
    title: 'M House',
    category: 'Minimalist Sanctuary',
    location: 'Graha Famili, Surabaya',
    img: '/images/projects/facade_architecture_hq.jpg',
    desc: 'Quiet architectural discipline characterized by pure geometry, recessed glass bands, and dramatic chiaroscuro natural illumination.',
    specs: {
      landArea: '520 m²',
      buildingArea: '710 m²',
      levels: '3 Storeys',
      year: '2023',
      concreteGrade: 'K-350 Monolithic Pour',
    },
    features: [
      'Recessed structural glazing offering unobstructed garden views',
      'Integrated acoustic cedar wood slats across private gallery',
      'Dual-aspect master suite with private sky-terrace sanctuary',
    ],
  },
  {
    title: 'AW House',
    category: 'Modern Contemporary',
    location: 'Kertajaya Indah, Surabaya Timur',
    img: '/images/projects/interior_craftsmanship_hq.jpg',
    desc: 'Sculptural residential sanctuary showcasing precision stone masonry, micro-topping floors, and double-height living voids.',
    specs: {
      landArea: '480 m²',
      buildingArea: '650 m²',
      levels: '2.5 Storeys',
      year: '2022',
      concreteGrade: 'K-350 Precision Form',
    },
    features: [
      'Double-height 7.2-meter monumental foyer with skylight slit',
      'Seamless micro-cement seamless flooring throughout public zone',
      'Temperature-controlled custom architectural wine cellar',
    ],
  },
  {
    title: 'W Office',
    category: 'Corporate Headquarters',
    location: 'Mayjend Sungkono, Surabaya',
    img: '/images/projects/jotun_showroom_hq.jpg',
    desc: 'Flagship corporate headquarters integrating high-performance acoustic glass envelopes with collaborative open-plan spatial flow.',
    specs: {
      landArea: '1,200 m²',
      buildingArea: '2,400 m²',
      levels: '4 Storeys + Rooftop Executive Lounge',
      year: '2023',
      concreteGrade: 'K-400 High Durability',
    },
    features: [
      'Structural glass curtain wall with integrated sun-shading fins',
      'Multi-tier acoustic executive boardroom and media presentation room',
      'Energy-efficient VRF zoned HVAC and photovoltaic roof arrays',
    ],
  },
  {
    title: 'O House',
    category: 'Suburban Villa',
    location: 'Bukit Darmo Golf, Surabaya Barat',
    img: '/images/projects/modern_villa_hq.jpg',
    desc: 'Expansive golf-front residence with stepped terracing, infinity edge reflecting pools, and floor-to-ceiling panoramic glass.',
    specs: {
      landArea: '880 m²',
      buildingArea: '1,150 m²',
      levels: '3 Storeys',
      year: '2024',
      concreteGrade: 'K-350 Waterproofed Mix',
    },
    features: [
      'Uninterrupted 24-meter panoramic terrace overlooking fairways',
      'Subterranean wellness sanctuary with Finnish sauna and plunge pool',
      'Structural steel cantilever pergola sheltering sunset lounge',
    ],
  },
  {
    title: 'A House',
    category: 'Urban Sanctuary',
    location: 'Dharmahusada Mas, Surabaya',
    img: '/images/projects/luxury_residence_hq.jpg',
    desc: 'Intimate private residence balancing high-density urban privacy with open light shafts and tranquil internal landscaped atriums.',
    specs: {
      landArea: '420 m²',
      buildingArea: '590 m²',
      levels: '3 Storeys',
      year: '2022',
      concreteGrade: 'K-350 Compact Seismic',
    },
    features: [
      'Perforated brick screen facade filtering tropical afternoon sun',
      'Internal bamboo court channeling rainwater and ambient light',
      'Hidden pocket doors enabling flexible open/closed zoning',
    ],
  },
  {
    title: 'NE House',
    category: 'Modern Minimalist',
    location: 'Pondok Indah Barat, Surabaya',
    img: '/images/projects/facade_architecture_hq.jpg',
    desc: 'Monolithic dark zinc and basalt stone residence celebrating minimalist lines and tactile contrast between metal and organic greenery.',
    specs: {
      landArea: '500 m²',
      buildingArea: '680 m²',
      levels: '2 Storeys + Mezzanine Studio',
      year: '2023',
      concreteGrade: 'K-350 Textured Aggregate',
    },
    features: [
      'Standing seam architectural zinc cladding with hidden guttering',
      'Basalt stone feature wall with water weir cascade',
      'Minimalist linear kitchen with concealed Gaggenau appliances',
    ],
  },
  {
    title: 'RS House',
    category: 'Family Estate',
    location: 'San Antonio, Pakuwon City, Surabaya',
    img: '/images/projects/tropical_facade_hq.jpg',
    desc: 'Multi-generational luxury estate arranged around a central reflective water court, fostering interconnected familial living.',
    specs: {
      landArea: '1,050 m²',
      buildingArea: '1,420 m²',
      levels: '2 Wings, 3 Storeys',
      year: '2024',
      concreteGrade: 'K-350 Heavy Structural Foundation',
    },
    features: [
      'Dual master suites with independent access and private gardens',
      'Central 18-meter swimming pool flanked by travertine colonnades',
      'Four-car climate-controlled subterranean display gallery',
    ],
  },
  {
    title: 'Z House',
    category: 'Hillside Residence',
    location: 'Prigen Highlands / Surabaya Weekend Retreat',
    img: '/images/projects/modern_villa_hq.jpg',
    desc: 'Dramatic hillside residence following the mountain contours, framing panoramic vistas of Mount Penanggungan with raw stone terraces.',
    specs: {
      landArea: '1,600 m²',
      buildingArea: '890 m²',
      levels: 'Cascading 3-Level Topography',
      year: '2024',
      concreteGrade: 'K-350 Hillside Retaining Foundation',
    },
    features: [
      'Stepped retaining walls utilizing local mountain andesite stone',
      'Heated cantilever infinity pool hovering over highland valley',
      'Frameless glass fireplace pavilion with 360-degree mountain views',
    ],
  },
];
