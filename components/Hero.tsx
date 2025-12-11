'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import { FaStar, FaAward } from 'react-icons/fa';

const titles = ['Full Stack Developer', 'AI Developer', 'React Developer'];

export default function Hero() {
  const t = useTranslations('hero');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3500); // 3.5 seconds between each title

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0d1117] via-[#161b22] to-[#0d1117]">
      <ParticleBackground />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400"
          >
            {t('greeting')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {t('name')}
            </span>
          </motion.h1>

          {/* Rotating Title Animation */}
          <div className="h-16 xs:h-20 sm:h-24 md:h-28 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 30, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, rotateX: 90 }}
                transition={{ 
                  duration: 0.6, 
                  type: 'spring', 
                  stiffness: 100,
                  damping: 15
                }}
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl text-gray-300 font-semibold"
              >
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {titles[currentTitleIndex]}
                </span>
              </motion.h2>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            className="text-base xs:text-lg sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
          >
            {t('subtitle')}
          </motion.p>

          {/* Upwork Badges - Only Job Success and Top Rated Plus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
            className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 mt-6 xs:mt-8 px-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/50 rounded-full px-3 xs:px-4 py-2 backdrop-blur-sm hover:bg-blue-500/30 transition-all"
            >
              <FaStar className="w-4 h-4 xs:w-5 xs:h-5 text-blue-400" />
              <span className="text-sm xs:text-base text-blue-400 font-semibold">{t('badges.jobSuccess')}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-pink-500/20 border border-pink-500/50 rounded-full px-3 xs:px-4 py-2 backdrop-blur-sm hover:bg-pink-500/30 transition-all"
            >
              <FaAward className="w-4 h-4 xs:w-5 xs:h-5 text-pink-400" />
              <span className="text-sm xs:text-base text-pink-400 font-semibold">{t('badges.topRated')}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



