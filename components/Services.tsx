'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaRobot, FaServer, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const services = [
  {
    key: 'fullstack',
    icon: FaCode,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/30',
  },
  {
    key: 'ai',
    icon: FaRobot,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/30',
  },
  {
    key: 'backend',
    icon: FaServer,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    glowColor: 'shadow-green-500/30',
  },
];

export default function Services() {
  const t = useTranslations('services');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((currentIndex + i + services.length) % services.length);
    }
    return indices;
  };

  return (
    <section id="services" className="py-12 xs:py-16 sm:py-20 px-4 bg-[#0d1117] overflow-hidden">
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
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-12 xs:h-12 bg-gray-800/80 hover:bg-purple-600/80 rounded-full flex items-center justify-center text-white transition-all -translate-x-2 xs:-translate-x-4 backdrop-blur-sm"
            aria-label="Previous service"
          >
            <FaChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xs:w-12 xs:h-12 bg-gray-800/80 hover:bg-purple-600/80 rounded-full flex items-center justify-center text-white transition-all translate-x-2 xs:translate-x-4 backdrop-blur-sm"
            aria-label="Next service"
          >
            <FaChevronRight className="w-4 h-4 xs:w-5 xs:h-5" />
          </button>

          {/* Cards Container */}
          <div className="flex justify-center items-center gap-4 xs:gap-6 sm:gap-8 px-8 xs:px-12">
            <AnimatePresence mode="popLayout" initial={false}>
              {getVisibleIndices().map((serviceIndex, position) => {
                const service = services[serviceIndex];
                const Icon = service.icon;
                const isCenter = position === 1;
                
                return (
                  <motion.div
                    key={`${service.key}-${serviceIndex}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8,
                      x: direction * 100
                    }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.5,
                      scale: isCenter ? 1.05 : 0.9,
                      x: 0,
                      zIndex: isCenter ? 10 : 0
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.8,
                      x: -direction * 100
                    }}
                    transition={{ 
                      duration: 0.5, 
                      type: 'spring',
                      stiffness: 200,
                      damping: 25
                    }}
                    className={`${service.bgColor} ${service.borderColor} border rounded-2xl p-6 xs:p-8 transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                      isCenter 
                        ? `shadow-2xl ${service.glowColor} border-opacity-100` 
                        : 'hidden sm:block'
                    }`}
                    style={{ 
                      width: isCenter ? '100%' : '80%',
                      maxWidth: '380px',
                      minWidth: '280px'
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: isCenter ? [0, 5, 0] : 0,
                        scale: isCenter ? [1, 1.1, 1] : 1
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: isCenter ? Infinity : 0,
                        repeatType: 'reverse'
                      }}
                      className={`w-14 h-14 xs:w-16 xs:h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 xs:mb-6`}
                    >
                      <Icon className="w-7 h-7 xs:w-8 xs:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl xs:text-2xl font-bold text-white mb-3 xs:mb-4">
                      {t(`${service.key}.title`)}
                    </h3>
                    <p className="text-sm xs:text-base text-gray-400 leading-relaxed">
                      {t(`${service.key}.description`)}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-purple-500 w-6 xs:w-8' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



