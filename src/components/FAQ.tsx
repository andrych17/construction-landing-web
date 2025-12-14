'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: 'Berapa lama waktu pengerjaan proyek?',
    answer: 'Waktu pengerjaan tergantung dari skala proyek. Untuk proyek kecil biasanya 3-6 bulan, sedangkan proyek besar bisa memakan waktu 1-2 tahun.',
  },
  {
    question: 'Apakah ada garansi untuk hasil pekerjaan?',
    answer: 'Ya, kami memberikan garansi 2 tahun untuk semua pekerjaan konstruksi dan 5 tahun untuk struktur bangunan.',
  },
  {
    question: 'Bagaimana sistem pembayaran?',
    answer: 'Sistem pembayaran kami fleksibel. Biasanya 30% di awal, 40% di tengah proses, dan 30% setelah selesai.',
  },
  {
    question: 'Apakah Anda melayani area di luar Jakarta?',
    answer: 'Kami melayani seluruh Indonesia termasuk Sumatera, Kalimantan, Sulawesi, dan wilayah lainnya.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Pertanyaan Sering Diajukan
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang layanan kami
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-yellow-50 hover:to-yellow-100 transition-all rounded-xl shadow-md hover:shadow-lg"
                whileHover={{ x: 5 }}
              >
                <span className="text-left font-bold text-slate-900 text-lg">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-yellow-500 text-xl" />
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-slate-50 border-t border-slate-200 text-slate-700">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
