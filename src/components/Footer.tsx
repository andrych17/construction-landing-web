'use client';

import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-yellow-500">WW</span> Construction
            </h3>
            <p className="text-gray-400 mb-4">
              Membangun masa depan dengan keahlian dan dedikasi terbaik sejak 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Proyek
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              {[
                { icon: FaFacebook, link: '#' },
                { icon: FaInstagram, link: '#' },
                { icon: FaTwitter, link: '#' },
                { icon: FaLinkedin, link: '#' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-slate-800 p-3 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WW Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
