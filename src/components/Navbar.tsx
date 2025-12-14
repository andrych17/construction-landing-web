'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', href: '#', icon: '🏠' },
    { name: 'Layanan', href: '#services', icon: '⚙️' },
    { name: 'Proyek', href: '#projects', icon: '🏗️' },
    { name: 'Tentang', href: '#about', icon: '📖' },
    { name: 'Kontak', href: '#contact', icon: '📞' },
  ];

  return (
    <>
      <motion.nav
        style={{ backgroundColor }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'shadow-2xl shadow-yellow-500/10 backdrop-blur-2xl border-b border-yellow-500/20' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-bold flex items-center gap-2"
            >
              <motion.span 
                className="text-yellow-400"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360,
                  textShadow: '0 0 30px rgba(234, 179, 8, 1)',
                  transition: { duration: 0.5 }
                }}
              >
                WW
              </motion.span>
              <span className="text-white">Construction</span>
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                  }}
                  className="relative group px-4 py-2.5 text-white font-semibold rounded-xl transition-all"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </span>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 w-0 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 10 }}
                className="block text-white hover:text-yellow-500 transition-colors font-semibold"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.02 }}
              className="block bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 px-6 py-2 rounded-full font-bold text-center"
            >
              Konsultasi Gratis
            </motion.a>
          </div>
        </motion.div>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 origin-left shadow-lg shadow-yellow-500/50"
          style={{ scaleX: scrollYProgress }}
        />
      </motion.nav>
    </>
  );
}
