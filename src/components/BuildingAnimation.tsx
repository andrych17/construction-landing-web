'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const buildingStages = [
  { stage: 0, icon: '💥', label: 'Demolition', progress: 0 },
  { stage: 1, icon: '🏗️', label: 'Foundation', progress: 20 },
  { stage: 2, icon: '🧱', label: 'Structure', progress: 40 },
  { stage: 3, icon: '🏢', label: 'Framework', progress: 60 },
  { stage: 4, icon: '🎨', label: 'Finishing', progress: 80 },
  { stage: 5, icon: '🏡', label: 'Dream Home', progress: 100 },
];

export default function BuildingAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentStage((prev) => {
          if (prev < buildingStages.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 800);

      return () => clearInterval(interval);
    } else {
      setCurrentStage(0);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(234, 179, 8, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-8xl">🏗️</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              From Ground Zero
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mt-4"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              style={{ backgroundSize: '200% 200%' }}
            >
              To Your Dream Home
            </motion.span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Menyaksikan transformasi dari pondasi hingga kesempurnaan
          </motion.p>
        </motion.div>

        {/* Building Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Construction Area */}
            <div className="relative h-96 flex items-end justify-center perspective-1000">
              {/* Ground */}
              <motion.div
                className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1 }}
              />

              {/* Building Layers */}
              <div className="relative flex flex-col items-center gap-2" style={{ transformStyle: 'preserve-3d' }}>
                {/* Roof */}
                <motion.div
                  initial={{ opacity: 0, y: -100, rotateX: -90 }}
                  animate={currentStage >= 5 ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="text-8xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  🏠
                </motion.div>

                {/* Windows/Finishing */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={currentStage >= 4 ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="absolute top-20 flex gap-4"
                >
                  <span className="text-4xl">🪟</span>
                  <span className="text-4xl">🚪</span>
                  <span className="text-4xl">🪟</span>
                </motion.div>

                {/* Framework */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={currentStage >= 3 ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 150 }}
                  className="text-9xl origin-bottom"
                >
                  🏢
                </motion.div>

                {/* Bricks */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={currentStage >= 2 ? { opacity: 1, x: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 100 }}
                  className="absolute top-32 left-0 flex flex-wrap gap-2"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={currentStage >= 2 ? { opacity: 1, rotate: 0 } : {}}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl"
                    >
                      🧱
                    </motion.span>
                  ))}
                </motion.div>

                {/* Foundation */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={currentStage >= 1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="flex gap-2 mt-4"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-4xl"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
                    >
                      ⬜
                    </motion.span>
                  ))}
                </motion.div>

                {/* Demolition */}
                {currentStage === 0 && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 0.8, 1.1, 1],
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-9xl"
                  >
                    💥
                  </motion.div>
                )}
              </div>

              {/* Floating particles */}
              {currentStage > 0 && (
                <div className="absolute inset-0">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -100],
                        opacity: [1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {buildingStages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05, x: 10 }}
                  className={`relative flex items-center gap-6 p-6 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 ${
                    currentStage >= stage.stage
                      ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border-yellow-500 shadow-2xl shadow-yellow-500/30'
                      : 'bg-slate-800/30 border-slate-700/50'
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    animate={currentStage >= stage.stage ? {
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                    } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-6xl"
                  >
                    {stage.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors ${
                      currentStage >= stage.stage ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {stage.label}
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={currentStage >= stage.stage ? { width: '100%' } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/50"
                      />
                    </div>
                    
                    <motion.p
                      className="mt-2 text-sm font-semibold"
                      animate={currentStage >= stage.stage ? {
                        color: ['#fbbf24', '#eab308', '#fbbf24'],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stage.progress}% Complete
                    </motion.p>
                  </div>

                  {/* Checkmark */}
                  {currentStage >= stage.stage && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="text-4xl"
                    >
                      ✅
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 30px 60px rgba(234, 179, 8, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              Mulai Proyek Anda Sekarang
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
