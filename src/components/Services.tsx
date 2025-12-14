'use client';

import { motion } from 'framer-motion';
import { FaHardHat, FaHome, FaBuilding, FaTools } from 'react-icons/fa';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: FaBuilding,
    title: 'Konstruksi Bangunan',
    description: 'Pembangunan gedung komersial dan residensial dengan standar kualitas tinggi',
  },
  {
    icon: FaHome,
    title: 'Renovasi',
    description: 'Layanan renovasi dan remodeling untuk hunian dan kantor Anda',
  },
  {
    icon: FaHardHat,
    title: 'Desain & Konsultasi',
    description: 'Konsultasi arsitektur dan desain untuk mewujudkan visi Anda',
  },
  {
    icon: FaTools,
    title: 'Pemeliharaan',
    description: 'Perawatan dan pemeliharaan bangunan secara berkala',
  },
];

export default function Services() {
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
            Layanan Kami
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Solusi konstruksi lengkap untuk semua kebutuhan Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15, 
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              />
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.2
                }}
                transition={{ duration: 0.5 }}
                className="relative inline-block mb-6 p-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-lg"
              >
                <service.icon className="text-4xl text-white" />
              </motion.div>
              <h3 className="relative text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="relative text-slate-600">{service.description}</p>
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
