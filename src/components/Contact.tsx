'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah dikirim.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Telepon',
      content: '+62 812-3456-7890',
      link: 'tel:+6281234567890',
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: '+62 812-3456-7890',
      link: 'https://wa.me/6281234567890',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@wwconstruction.com',
      link: 'mailto:info@wwconstruction.com',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Alamat',
      content: 'Jakarta, Indonesia',
      link: '#',
    },
  ];

  return (
    <section ref={ref} id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Siap membantu mewujudkan proyek konstruksi Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Informasi Kontak
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10, boxShadow: "0 10px 30px rgba(234, 179, 8, 0.2)" }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <motion.div 
                    className="bg-gradient-to-br from-yellow-500 to-yellow-400 p-4 rounded-xl shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <info.icon className="text-2xl text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-lg">
                      {info.title}
                    </h4>
                    <p className="text-slate-600">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="mb-6 relative">
                <label htmlFor="name" className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">
                  Nama Lengkap
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 30px rgba(234, 179, 8, 0.2)" }}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all bg-white/80 backdrop-blur-sm font-medium"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div className="mb-6 relative">
                <label htmlFor="email" className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 30px rgba(234, 179, 8, 0.2)" }}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all bg-white/80 backdrop-blur-sm font-medium"
                  placeholder="email@example.com"
                />
              </div>

              <div className="mb-6 relative">
                <label htmlFor="phone" className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">
                  Nomor Telepon
                </label>
                <motion.input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 30px rgba(234, 179, 8, 0.2)" }}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all bg-white/80 backdrop-blur-sm font-medium"
                  placeholder="+62 812-3456-7890"
                />
              </div>

              <div className="mb-6 relative">
                <label htmlFor="message" className="block text-slate-700 font-bold mb-2 text-sm uppercase tracking-wider">
                  Pesan
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  whileFocus={{ scale: 1.01, boxShadow: "0 10px 30px rgba(234, 179, 8, 0.2)" }}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 transition-all resize-none bg-white/80 backdrop-blur-sm font-medium"
                  placeholder="Ceritakan tentang proyek Anda..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(234, 179, 8, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-900 font-bold text-lg py-4 px-8 rounded-xl shadow-2xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Kirim Pesan
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
