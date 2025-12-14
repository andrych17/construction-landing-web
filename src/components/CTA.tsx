'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Siap Mewujudkan Proyek Impian Anda?
          </h2>
          <p className="text-xl text-slate-800 mb-10">
            Konsultasikan kebutuhan konstruksi Anda dengan tim profesional kami. Dapatkan penawaran terbaik dan solusi yang tepat!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.08, boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 bg-white text-yellow-600 font-bold text-lg rounded-full shadow-xl overflow-hidden group inline-block"
            >
              <motion.span
                className="absolute inset-0 bg-slate-900"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Konsultasi Gratis Sekarang
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.a>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.08, boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 bg-slate-900/20 text-slate-900 font-bold text-lg rounded-full border-2 border-slate-900 backdrop-blur-sm overflow-hidden group inline-block"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Lihat Portofolio Kami</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
