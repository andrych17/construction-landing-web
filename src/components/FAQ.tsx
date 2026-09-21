'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

const faqs = [
  {
    question: 'Berapa kisaran estimasi biaya jasa kontraktor bangun & renovasi di Surabaya?',
    answer:
      'Estimasi biaya konstruksi di Surabaya bersama Wonderful Works Construction dihitung transparan berbasis Rencana Anggaran Biaya (RAB) terperinci per item pekerjaan (analisa harga satuan material & upah kerja). Mulai dari rumah tinggal modern, ruko komersial, hingga fit-out interior showroom, seluruh kalkulasi volume disepakati di awal secara tertulis untuk menjamin zero hidden cost (tanpa biaya siluman).',
  },
  {
    question: 'Apa saja 5 tahapan alur kerja sama proyek di Wonderful Works Construction?',
    answer:
      'Alur kerja sama kami terbagi menjadi 5 tahapan terstruktur: (1) Konsultasi kebutuhan & survei tapak lahan di area Surabaya/sekitarnya, (2) Penyusunan gambar kerja teknis arsitektur & rincian RAB terbuka, (3) Penandatanganan Surat Perjanjian Kerja (SPK) & jadwal kurva-S, (4) Pelaksanaan fisik konstruksi dengan pengawasan QC harian serta laporan foto/video berkala via WhatsApp, dan (5) Serah Terima Kunci (BAST) serta penerbitan sertifikat masa garansi retensi.',
  },
  {
    question: 'Mengapa presisi ukuran sangat krusial dalam konstruksi menurut Wonderful Works?',
    answer:
      'Sesuai edukasi "WW Notes" di Instagram @ww.cons, presisi ukuran pada level milimeter sangat krusial untuk: (1) Menjamin keamanan dan kekuatan struktur (Safety First), (2) Mencegah pembengkakan biaya akibat bongkar pasang (Anti Rugi), (3) Menjaga kepatuhan timeline proyek (Bebas Molor), (4) Menghasilkan finishing yang rapi dan bernilai estetika tinggi, serta (5) Memudahkan instalasi utilitas MEP dan integrasi interior.',
  },
  {
    question: 'Apakah Wonderful Works Construction membantu pengurusan izin PBG dan SLF di Surabaya?',
    answer:
      'Ya. Kami mendampingi penyusunan berkas teknis lengkap, termasuk gambar arsitektur, perhitungan struktur teknis sipil, dan as-built drawings yang dipersyaratkan oleh instansi terkait di Pemerintah Kota Surabaya (Dinas Cipta Karya) maupun Pemkab Sidoarjo/Gresik untuk penerbitan Persetujuan Bangunan Gedung (PBG) dan Sertifikat Laik Fungsi (SLF).',
  },
  {
    question: 'Bagaimana solusi pemilihan material bangunan untuk iklim tropis maritim Surabaya?',
    answer:
      'Surabaya memiliki paparan panas matahari tinggi, kelembaban pesisir, dan potensi tempias hujan musiman lebat. Tim kami menerapkan rekayasa material khusus: insulasi termal atap tahan UV, sistem talang air anti-luapan, waterproofing membrane berstandar tinggi pada dak beton, serta cat eksterior pelindung cuaca ekstrem (seperti Jotun Jotashield) guna mencegah lumut dan keretakan dinding.',
  },
  {
    question: 'Berapa lama masa garansi pemeliharaan (retensi) paska-konstruksi?',
    answer:
      'Seluruh proyek fisik di bawah naungan Wonderful Works Construction dilindungi masa retensi pemeliharaan paska-serah terima kunci (umumnya 3 hingga 6 bulan sesuai kesepakatan SPK). Tim teknis kami bertanggung jawab penuh melakukan inspeksi berkala dan perbaikan jika terjadi kendala rembesan air, keretakan rambut plesteran, atau penyesuaian fungsi instalasi MEP tanpa biaya tambahan.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-24 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span>Transparansi Informasi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase">
            Pertanyaan Umum (FAQ)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            Hal-hal mendasar yang perlu Anda ketahui mengenai kerja sama rancang bangun dengan kami.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50 transition-colors min-h-[48px]"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-950 pr-4">
                    {faq.question}
                  </span>
                  <LuChevronDown
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
