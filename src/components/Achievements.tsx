'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const commitments = [
  {
    code: '01',
    title: 'Standar K3 & Keselamatan Kerja',
    desc: 'Penerapan protokol Keselamatan dan Kesehatan Kerja (K3) aktif pada seluruh personel lapangan guna meminimalisir risiko kerja.',
  },
  {
    code: '02',
    title: 'Kontrak Hukum & RAB Terbuka',
    desc: 'Spesifikasi material, tahapan termin pembayaran, dan batasan tanggung jawab dijabarkan secara jelas tanpa celah biaya terselubung.',
  },
  {
    code: '03',
    title: 'QC Mutu Material Standar SNI',
    desc: 'Hanya menggunakan semen, pasir cuci, besi beton berstandar SNI, serta material finishing dari produsen teruji (seperti Jotun & setara).',
  },
  {
    code: '04',
    title: 'Jaminan Retensi Paska-Konstruksi',
    desc: 'Jaminan pemeliharaan paska-serah terima untuk memastikan tidak ada kebocoran, keretakan rambut, atau malfungsi instalasi.',
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-slate-100/60 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand uppercase mb-3 font-semibold">
            <span className="w-1.5 h-1.5 bg-brand rounded-full" />
            <span>Kepatuhan & Jaminan Mutu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase">
            Standar Kerja Wonderful Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            Fondasi operasional yang kami terapkan di setiap lokasi proyek di Jawa Timur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((item, index) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-sm border border-slate-200 hover:border-slate-400 shadow-xs hover:shadow-md flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <span className="text-2xl font-black font-mono text-slate-950 group-hover:text-brand transition-colors">
                    {item.code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    STANDARD
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
