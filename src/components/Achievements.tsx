'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaAward, FaUsers, FaHardHat, FaCheckCircle } from 'react-icons/fa';

const achievements = [
  {
    icon: FaAward,
    title: 'Penghargaan Industri',
    description: 'Meraih berbagai penghargaan konstruksi terbaik selama 15 tahun',
  },
  {
    icon: FaUsers,
    title: 'Tim Berpengalaman',
    description: 'Lebih dari 50 profesional bersertifikat dan berpengalaman',
  },
  {
    icon: FaHardHat,
    title: 'Keselamatan Kerja',
    description: 'Standar keselamatan internasional di setiap proyek',
  },
  {
    icon: FaCheckCircle,
    title: 'Kualitas Terjamin',
    description: 'Material premium dan kontrol kualitas ketat',
  },
];

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Keunggulan Kami
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Komitmen kami terhadap keunggulan dan inovasi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <motion.div
                className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl mb-4 shadow-lg"
                >
                  <achievement.icon className="text-3xl text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-slate-600">{achievement.description}</p>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
