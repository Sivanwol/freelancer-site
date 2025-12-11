'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-12 xs:py-16 sm:py-20 px-4 bg-[#0d1117]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-base xs:text-lg sm:text-xl text-gray-400 mb-8 xs:mb-10 sm:mb-12">
            {t('subtitle')}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
            {/* Email */}
            <motion.a
              href="mailto:fastwings@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl xs:rounded-2xl p-5 xs:p-6 hover:border-purple-500/50 transition-all group backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 transition-transform"
              >
                <FaEnvelope className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
              </motion.div>
              <h3 className="text-base xs:text-lg font-semibold text-white mb-2">{t('email')}</h3>
              <p className="text-sm xs:text-base text-gray-400 break-all">fastwings@gmail.com</p>
            </motion.a>

            {/* Upwork */}
            <motion.a
              href="https://upwork.com/freelancers/swolberg"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl xs:rounded-2xl p-5 xs:p-6 hover:border-[#14a800]/50 transition-all group backdrop-blur-sm hover:shadow-lg hover:shadow-[#14a800]/10"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-[#14a800] flex items-center justify-center mx-auto mb-4 transition-transform"
              >
                <SiUpwork className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
              </motion.div>
              <h3 className="text-base xs:text-lg font-semibold text-white mb-2">Upwork</h3>
              <p className="text-sm xs:text-base text-gray-400">{t('upwork')}</p>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/swolberg"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl xs:rounded-2xl p-5 xs:p-6 hover:border-[#0077b5]/50 transition-all group backdrop-blur-sm hover:shadow-lg hover:shadow-[#0077b5]/10"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-[#0077b5] flex items-center justify-center mx-auto mb-4 transition-transform"
              >
                <FaLinkedinIn className="w-6 h-6 xs:w-7 xs:h-7 text-white" />
              </motion.div>
              <h3 className="text-base xs:text-lg font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-sm xs:text-base text-gray-400">{t('linkedin')}</p>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



