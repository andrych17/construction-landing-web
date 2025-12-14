'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Static particles data to avoid hydration error
const particles = [
  { id: 0, x: 23, y: 12, size: 3, duration: 15, delay: 0.5 },
  { id: 1, x: 67, y: 45, size: 2, duration: 18, delay: 1.2 },
  { id: 2, x: 12, y: 78, size: 4, duration: 12, delay: 0.8 },
  { id: 3, x: 89, y: 23, size: 2.5, duration: 20, delay: 1.5 },
  { id: 4, x: 45, y: 56, size: 3.5, duration: 16, delay: 0.3 },
  { id: 5, x: 78, y: 89, size: 2, duration: 14, delay: 1.8 },
  { id: 6, x: 34, y: 67, size: 3, duration: 19, delay: 0.6 },
  { id: 7, x: 56, y: 34, size: 4, duration: 13, delay: 1.1 },
  { id: 8, x: 90, y: 12, size: 2.5, duration: 17, delay: 0.9 },
  { id: 9, x: 15, y: 45, size: 3, duration: 15, delay: 1.4 },
  { id: 10, x: 72, y: 78, size: 2, duration: 18, delay: 0.4 },
  { id: 11, x: 28, y: 23, size: 3.5, duration: 16, delay: 1.7 },
  { id: 12, x: 61, y: 90, size: 2.5, duration: 14, delay: 0.7 },
  { id: 13, x: 83, y: 56, size: 4, duration: 19, delay: 1.3 },
  { id: 14, x: 19, y: 67, size: 2, duration: 12, delay: 1.0 },
  { id: 15, x: 94, y: 34, size: 3, duration: 20, delay: 0.2 },
  { id: 16, x: 41, y: 12, size: 2.5, duration: 15, delay: 1.6 },
  { id: 17, x: 52, y: 89, size: 3.5, duration: 17, delay: 0.5 },
  { id: 18, x: 76, y: 45, size: 2, duration: 13, delay: 1.9 },
  { id: 19, x: 8, y: 78, size: 4, duration: 18, delay: 0.1 },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-yellow-900/40"></div>
      </motion.div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-yellow-400/30 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
          style={{ top: '10%', left: '10%' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ bottom: '10%', right: '10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 z-10"
        style={{ 
          opacity,
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center perspective-1000"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.span 
              className="inline-block text-yellow-400"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(234, 179, 8, 0.8), 0 0 40px rgba(234, 179, 8, 0.4)",
                  "0 0 40px rgba(234, 179, 8, 1), 0 0 80px rgba(234, 179, 8, 0.6)",
                  "0 0 20px rgba(234, 179, 8, 0.8), 0 0 40px rgba(234, 179, 8, 0.4)"
                ],
              }}
              whileHover={{ 
                scale: 1.1,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              WW
            </motion.span>{' '}
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Construction
            </motion.span>
          </motion.h1>

          {/* Building Animation Icon */}
          <motion.div 
            className="flex justify-center items-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Broken House -> Building Process -> Complete House */}
            <motion.div className="text-6xl md:text-7xl">
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: [1, 0, 0, 0, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  times: [0, 0.2, 0.4, 0.8, 1]
                }}
                className="inline-block"
              >
                🏚️
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0, 1, 0, 0],
                  scale: [0.8, 0.8, 1, 0.8, 0.8],
                  rotate: [0, 0, 360, 360, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  times: [0, 0.2, 0.4, 0.6, 1]
                }}
                className="inline-block absolute"
              >
                🏗️
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0, 0, 1, 1],
                  scale: [0.5, 0.5, 0.5, 1.2, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  times: [0, 0.4, 0.6, 0.8, 1]
                }}
                className="inline-block absolute"
              >
                🏠
              </motion.span>
            </motion.div>

            {/* Arrow Animation */}
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-yellow-400 text-4xl font-bold hidden md:block"
            >
              ➜
            </motion.div>

            {/* Dream Home Icon */}
            <motion.div 
              className="text-6xl md:text-7xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨🏡
            </motion.div>
          </motion.div>

          {/* Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <motion.p 
              className="text-2xl md:text-3xl font-bold mb-2"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              From Ground Zero to Dream Home
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-gray-300 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Dari Lahan Kosong Menuju Hunian Impian
            </motion.p>
          </motion.div>
          
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Membangun masa depan dengan keahlian dan dedikasi terbaik
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-6 justify-center flex-wrap"
          >
            <motion.a
              href="#projects"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                boxShadow: "0 30px 60px rgba(234, 179, 8, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    🏗️
                  </motion.span>
                  Lihat Proyek Kami
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </div>
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                rotateX: 5,
                boxShadow: "0 30px 60px rgba(234, 179, 8, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative border-2 border-yellow-400/50 text-white px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-xl bg-white/10 overflow-hidden shadow-2xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📞
                  </motion.span>
                  Hubungi Kami
                </span>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div 
            className="w-6 h-10 border-2 border-yellow-400 rounded-full p-1"
            whileHover={{ scale: 1.2, borderColor: '#fbbf24' }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-yellow-400 rounded-full mx-auto"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
          <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wider">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
