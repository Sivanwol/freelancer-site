'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiNextdotjs, SiNestjs, SiPython, SiPhp } from 'react-icons/si';
import { FaRobot, FaMagic } from 'react-icons/fa';

const skills = [
  { key: 'nextjs', icon: SiNextdotjs, level: 95, color: '#ffffff', gradientFrom: '#8b5cf6', gradientTo: '#ec4899' },
  { key: 'nestjs', icon: SiNestjs, level: 90, color: '#e0234e', gradientFrom: '#e0234e', gradientTo: '#f472b6' },
  { key: 'claude', icon: FaRobot, level: 92, color: '#d97706', gradientFrom: '#d97706', gradientTo: '#fbbf24' },
  { key: 'cursor', icon: FaMagic, level: 88, color: '#8b5cf6', gradientFrom: '#8b5cf6', gradientTo: '#a78bfa' },
  { key: 'python', icon: SiPython, level: 85, color: '#3776ab', gradientFrom: '#3776ab', gradientTo: '#60a5fa' },
  { key: 'php', icon: SiPhp, level: 90, color: '#777bb4', gradientFrom: '#777bb4', gradientTo: '#a78bfa' },
];

// Number of segments in the speed bar
const SEGMENTS = 20;

function SpeedBar({ level, gradientFrom, gradientTo, index }: { level: number; gradientFrom: string; gradientTo: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const filledSegments = Math.round((level / 100) * SEGMENTS);

  return (
    <div ref={ref} className="flex gap-1 xs:gap-1.5 h-6 xs:h-8 items-end">
      {Array.from({ length: SEGMENTS }).map((_, segmentIndex) => {
        const isFilled = segmentIndex < filledSegments;
        const segmentHeight = 40 + (segmentIndex / SEGMENTS) * 60; // Height increases from 40% to 100%
        const delay = index * 0.1 + segmentIndex * 0.03;
        
        return (
          <motion.div
            key={segmentIndex}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleY: isFilled ? 1 : 0.3, 
              opacity: isFilled ? 1 : 0.2 
            } : { scaleY: 0, opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: delay,
              type: 'spring',
              stiffness: 200
            }}
            className="flex-1 rounded-sm origin-bottom"
            style={{ 
              height: `${segmentHeight}%`,
              background: isFilled 
                ? `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
                : '#374151',
              boxShadow: isFilled ? `0 0 8px ${gradientFrom}40` : 'none'
            }}
          />
        );
      })}
    </div>
  );
}

function SpeedIndicator({ level, color }: { level: number; color: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative w-16 h-16 xs:w-20 xs:h-20"
    >
      {/* Circular background */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#374151"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 40}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
          animate={isInView ? { 
            strokeDashoffset: 2 * Math.PI * 40 * (1 - level / 100) 
          } : { strokeDashoffset: 2 * Math.PI * 40 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      {/* Percentage text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-lg xs:text-xl font-bold text-white">{level}%</span>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="py-12 xs:py-16 sm:py-20 px-4 bg-[#161b22]">
      <div className="container mx-auto max-w-4xl">
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

        <div className="grid gap-5 xs:gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 xs:p-5 backdrop-blur-sm hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  {/* Icon and Name */}
                  <div className="flex items-center gap-3 min-w-[140px] xs:min-w-[160px]">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${skill.color}20` }}
                    >
                      <Icon className="w-6 h-6 xs:w-7 xs:h-7" style={{ color: skill.color }} />
                    </motion.div>
                    <span className="text-sm xs:text-base font-semibold text-white">
                      {t(skill.key)}
                    </span>
                  </div>

                  {/* Speed Bar */}
                  <div className="flex-1 hidden sm:block">
                    <SpeedBar 
                      level={skill.level} 
                      gradientFrom={skill.gradientFrom}
                      gradientTo={skill.gradientTo}
                      index={index}
                    />
                  </div>

                  {/* Circular Indicator (Mobile) */}
                  <div className="sm:hidden ms-auto">
                    <SpeedIndicator level={skill.level} color={skill.color} />
                  </div>

                  {/* Percentage (Desktop) */}
                  <div className="hidden sm:flex items-center justify-center min-w-[60px]">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                      className="text-lg xs:text-xl font-bold"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



