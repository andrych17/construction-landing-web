'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const stats = [
  { number: '15+', label: 'Tahun Pengalaman' },
  { number: '200+', label: 'Proyek Selesai' },
  { number: '50+', label: 'Tim Profesional' },
  { number: '100%', label: 'Kepuasan Klien' },
];

const values = [
  'Kualitas terjamin dengan standar internasional',
  'Tim profesional bersertifikat',
  'Penggunaan material berkualitas premium',
  'Tepat waktu dalam setiap pengerjaan',
  'Harga kompetitif dan transparan',
  'Garansi dan after-sales service',
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" 
          alt="Construction" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Tentang <span className="text-yellow-500">WW Construction</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              WW Construction adalah perusahaan kontraktor terkemuka yang telah berpengalaman 
              lebih dari 15 tahun dalam industri konstruksi. Kami berkomitmen untuk memberikan 
              layanan terbaik dengan hasil yang melampaui ekspektasi klien.
            </p>
            <p className="text-lg text-slate-600 mb-8">
              Dengan tim profesional yang berpengalaman dan dedikasi tinggi, kami siap 
              mewujudkan proyek konstruksi impian Anda menjadi kenyataan.
            </p>

            <div className="space-y-3 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <FaCheckCircle className="text-yellow-500 text-xl mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-xl text-center shadow-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3, type: 'spring' }}
                  className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
