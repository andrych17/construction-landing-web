'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  LuMapPin,
  LuClock,
  LuSend,
  LuArrowUpRight,
} from 'react-icons/lu';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Komersial / Showroom',
    location: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo WW Construction, saya ${formData.name}. Saya ingin konsultasi proyek ${formData.projectType} di daerah ${formData.location}. Rincian: ${formData.message}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/628113313347?text=${encoded}`, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={ref} className="py-24 sm:py-32 bg-slate-50 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-brand uppercase mb-3 font-semibold">
                <span className="w-1.5 h-1.5 bg-brand rounded-full" />
                <span>Saluran Komunikasi Resmi</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 uppercase mb-6">
                Hubungi Kami
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                Siap mewujudkan proyek konstruksi Anda dengan kualitas teruji. Kunjungi kantor kami di Surabaya atau hubungi langsung via WhatsApp.
              </p>

              <div className="space-y-3.5 text-sm text-slate-700">
                <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-xs flex items-start gap-4">
                  <LuMapPin className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5 font-semibold">
                      Kantor Operasional
                    </span>
                    <span className="font-bold text-slate-900 block">
                      Jl. Serenity No. 29, Semolowaru
                    </span>
                    <span className="text-xs text-slate-600">
                      Surabaya, Jawa Timur 60119
                    </span>
                  </div>
                </div>

                <a
                  href="https://wa.me/628113313347"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white border border-slate-200 hover:border-brand rounded-sm shadow-xs flex items-start gap-4 transition-colors group block min-h-[44px]"
                >
                  <FaWhatsapp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5 font-semibold">
                      WhatsApp Resmi
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-brand transition-colors">
                      +62 811-3313-347
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Konsultasi langsung dengan tim teknis
                    </span>
                  </div>
                  <LuArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                </a>

                <a
                  href="https://www.instagram.com/ww.cons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white border border-slate-200 hover:border-brand rounded-sm shadow-xs flex items-start gap-4 transition-colors group block min-h-[44px]"
                >
                  <FaInstagram className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5 font-semibold">
                      Instagram Portfolio
                    </span>
                    <span className="font-bold text-slate-900 group-hover:text-brand transition-colors">
                      @ww.cons
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Dokumentasi foto & reel proyek harian
                    </span>
                  </div>
                  <LuArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                </a>

                <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-xs flex items-start gap-4">
                  <LuClock className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5 font-semibold">
                      Jam Kerja Kantor
                    </span>
                    <span className="font-bold text-slate-900 block">
                      Senin - Sabtu: 08.00 - 17.00 WIB
                    </span>
                    <span className="text-xs text-slate-500">
                      Minggu / Hari Libur: Janji Temu Terlebih Dahulu
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-xs flex items-start gap-4">
                  <LuMapPin className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-0.5 font-semibold">
                      Wilayah Jangkauan Operasional
                    </span>
                    <span className="font-bold text-slate-900 block text-xs sm:text-sm">
                      Surabaya, Sidoarjo, Gresik & Jawa Timur
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      Surabaya Timur (Semolowaru, Dharmahusada), Surabaya Barat (Citraland, Graha Famili), Surabaya Pusat & Selatan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-sm shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                Formulir Rencana Proyek
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Isi rincian kebutuhan Anda. Pesan akan langsung diteruskan ke WhatsApp representatif Wonderful Works Construction.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-semibold"
                    >
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Contoh: Ir. Budi Santoso"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-semibold"
                    >
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-semibold"
                    >
                      Jenis Proyek
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-sm text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-brand"
                    >
                      <option value="Komersial / Showroom">Komersial / Ritel / Showroom</option>
                      <option value="Rumah Mewah Modern">Rumah Mewah / Residensial</option>
                      <option value="Renovasi Struktural">Renovasi & Perkuatan Struktur</option>
                      <option value="Interior Fit-Out">Interior Fit-Out & MEP</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-semibold"
                    >
                      Lokasi Rencana Proyek
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Contoh: Surabaya Barat / Sidoarjo"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-semibold"
                  >
                    Keterangan & Rincian Kebutuhan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Jelaskan perkiraan luas lahan, jumlah lantai, atau target waktu pengerjaan yang diinginkan..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-sm text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-brand resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-brand hover:bg-brand-hover active:bg-brand-active transition-colors rounded-sm shadow-sm min-h-[48px]"
                >
                  <LuSend className="w-4 h-4" />
                  <span>Kirim ke WhatsApp (+62 811-3313-347)</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
