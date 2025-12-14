'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Budi Hartono',
    role: 'Direktur PT Maju Jaya',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    content: 'WW Construction sangat profesional dan tepat waktu. Hasil kerjanya melampaui ekspektasi kami. Sangat merekomendasikan untuk proyek apapun!',
    rating: 5,
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Pemilik Rumah Mewah',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    content: 'Tim mereka sangat responsif dan selalu memberikan update. Renovasi rumah saya jadi jauh lebih indah dari yang dibayangkan!',
    rating: 5,
  },
  {
    name: 'Ahmad Wijaya',
    role: 'Manager Proyek Komersial',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    content: 'Kualitas material dan workmanship WW Construction tidak ada tandingannya. Harga juga sangat kompetitif untuk kualitas yang mereka tawarkan.',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Testimoni Klien Kami
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Kepuasan klien adalah prioritas utama kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <FaStar className="text-yellow-400 text-lg" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
