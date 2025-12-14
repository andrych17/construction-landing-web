'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Gedung Perkantoran Modern',
    category: 'Komersial',
    description: 'Pembangunan gedung perkantoran 15 lantai dengan desain modern dan fasilitas lengkap',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    id: 2,
    title: 'Komplek Perumahan Elite',
    category: 'Residensial',
    description: 'Pengembangan perumahan mewah dengan 50 unit rumah dan fasilitas premium',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  },
  {
    id: 3,
    title: 'Pusat Perbelanjaan',
    category: 'Komersial',
    description: 'Konstruksi mall modern dengan area 20.000 m² dan parkir bertingkat',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: 4,
    title: 'Renovasi Hotel Bintang 5',
    category: 'Renovasi',
    description: 'Renovasi total hotel dengan 200 kamar dan fasilitas restoran',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
  {
    id: 5,
    title: 'Apartemen High-Rise',
    category: 'Residensial',
    description: 'Pembangunan apartemen 25 lantai dengan view kota yang menakjubkan',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  },
  {
    id: 6,
    title: 'Pabrik Industri',
    category: 'Industri',
    description: 'Konstruksi fasilitas produksi modern dengan sistem otomasi terkini',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112b89e1a9?w=800&q=80',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [filter, setFilter] = useState('Semua');

  const categories = ['Semua', 'Komersial', 'Residensial', 'Renovasi', 'Industri'];
  
  const filteredProjects = filter === 'Semua' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section ref={ref} id="projects" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proyek Kami
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Portofolio proyek konstruksi yang telah kami selesaikan
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: filter === category 
                    ? "0 10px 30px rgba(234, 179, 8, 0.4)"
                    : "0 10px 30px rgba(100, 116, 139, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-3 rounded-full font-bold transition-all overflow-hidden ${
                  filter === category
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 shadow-xl'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {filter === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300"
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -15,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(234, 179, 8, 0.3)",
                transition: { duration: 0.3 }
              }}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project image */}
              <div className="h-56 relative overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                <motion.div
                  className="absolute inset-0 bg-yellow-500/0"
                  whileHover={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="p-6 relative">
                <motion.div 
                  className="flex items-center gap-2 mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {project.category}
                  </span>
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
                
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
