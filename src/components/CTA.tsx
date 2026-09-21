'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LuPhone, LuArrowUpRight, LuMapPin, LuClock } from 'react-icons/lu';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-white border-t border-slate-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="bg-slate-50 border border-slate-300 rounded-sm p-8 sm:p-14 lg:p-16 shadow-xs relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Headline & Assurance */}
            <div className="lg:col-span-8">
              <div className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-3 font-semibold">
                KONSULTASI RANCANG BANGUN & SURVEI LOKASI
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase leading-tight mb-4">
                Mulai Proyek Anda Dengan Kepastian RAB & Mutu.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
                Diskusikan gambar denah lahan, perkiraan anggaran, dan jadwal pelaksanaan bersama tim rekayasa teknis Wonderful Works Construction. Kami siap melakukan survei lapangan di area Surabaya, Sidoarjo, dan sekitarnya.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/628113313347?text=Halo%20WW%20Construction,%20saya%20ingin%20konsultasi%20mengenai%20rencana%20proyek%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white bg-brand hover:bg-brand-hover active:bg-brand-active transition-colors rounded-sm shadow-sm min-h-[48px]"
                >
                  <LuPhone className="w-4 h-4" />
                  <span>Konsultasi Teknis (+62 811-3313-347)</span>
                  <LuArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 rounded-sm transition-colors min-h-[48px]"
                >
                  <span>Isi Formulir Kontak</span>
                </a>
              </div>
            </div>

            {/* Right: Concrete Office Datum Card */}
            <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-sm space-y-4 text-xs font-mono">
              <div className="text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 pb-2">
                KANTOR & TIM SURVEI
              </div>

              <div className="flex items-start gap-2.5 text-slate-700">
                <LuMapPin className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">Semolowaru, Surabaya</span>
                  <span>Jl. Serenity No. 29, 60119</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-700">
                <LuClock className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900">Senin &ndash; Sabtu</span>
                  <span>08:00 &ndash; 17:00 WIB</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                Respons cepat via WhatsApp resmi. Jadwal survei lokasi dapat disesuaikan.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
