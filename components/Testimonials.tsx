'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { SiUpwork } from 'react-icons/si';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "It was a pleasure working with Sivan Wolberg. He quickly understood our web app setup and was very responsive in fixing bugs and adding new features. His work was efficient and professional.",
    project: "Web App Specialist - Node.js/React Project",
    date: "Oct 2025",
  },
  {
    id: 2,
    rating: 5,
    text: "Excellent full-stack developer with deep knowledge of modern technologies. Communication was clear and deliverables were always on time. Highly recommended for complex projects.",
    project: "Full-Stack Developer for Social App",
    date: "Jun 2025",
  },
  {
    id: 3,
    rating: 5,
    text: "Great experience working with Sivan on our marketing platform. Strong technical skills combined with good understanding of business requirements. Would definitely work with again.",
    project: "Full-Stack Developer for Marketing Platform",
    date: "Mar 2025",
  },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonials" className="py-12 xs:py-16 sm:py-20 px-4 bg-[#0d1117]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="text-center mb-10 xs:mb-12 sm:mb-16"
        >
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-base xs:text-lg flex items-center justify-center gap-2">
            <SiUpwork className="text-[#14a800]" />
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl xs:rounded-2xl p-5 xs:p-6 hover:border-purple-500/50 transition-all backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10"
            >
              <FaQuoteLeft className="w-8 h-8 text-purple-500/30 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                &quot;{testimonial.text}&quot;
              </p>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="text-white font-semibold text-sm">
                  {testimonial.project}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



