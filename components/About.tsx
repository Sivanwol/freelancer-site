'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaLightbulb } from 'react-icons/fa';

export default function About() {
  const t = useTranslations('about');

  const highlights = [
    { icon: FaRocket, key: 'highlight1' },
    { icon: FaCode, key: 'highlight2' },
    { icon: FaLightbulb, key: 'highlight3' },
  ];

  return (
    <section id="about" className="py-12 xs:py-16 sm:py-20 px-4 bg-[#161b22]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold mb-4 xs:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl md:text-xl text-gray-300 leading-relaxed mb-6 xs:mb-8 px-4">
            {t('description')}
          </p>
          
          {/* Experience Badge */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl px-6 xs:px-8 py-4 xs:py-5 backdrop-blur-sm hover:border-purple-500/50 transition-all mb-8"
          >
            <div className="text-3xl xs:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('experience')}
            </div>
            <div className="text-sm xs:text-base text-gray-400 mt-1">{t('experienceLabel')}</div>
          </motion.div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-3 gap-4 xs:gap-6 mt-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-5 backdrop-blur-sm hover:border-purple-500/50 transition-all"
                >
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-gray-300 text-sm xs:text-base">{t(item.key)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



