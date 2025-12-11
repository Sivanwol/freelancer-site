'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { SiUpwork } from 'react-icons/si';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export default function FloatingCTA() {
  const locale = useLocale();
  const isRTL = locale === 'he';

  // Position classes based on RTL/LTR
  const positionClass = isRTL ? 'left-4 xs:left-6' : 'right-4 xs:right-6';
  const tooltipPositionClass = isRTL 
    ? 'left-16 right-auto' 
    : 'right-16 left-auto';
  const hoverDirection = isRTL ? 5 : -5;

  const links = [
    {
      href: 'https://www.linkedin.com/in/swolberg/',
      label: 'LinkedIn',
      icon: FaLinkedinIn,
      bgColor: 'bg-[#0077b5]',
      hoverShadow: 'hover:shadow-[#0077b5]/50',
      delay: 0,
    },
    {
      href: 'https://upwork.com/freelancers/swolberg',
      label: 'Upwork',
      icon: SiUpwork,
      bgColor: 'bg-[#14a800]',
      hoverShadow: 'hover:shadow-[#14a800]/50',
      delay: 0.3,
    },
    {
      href: 'mailto:fastwings@gmail.com',
      label: 'Email',
      icon: FaEnvelope,
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600',
      hoverShadow: 'hover:shadow-purple-500/50',
      delay: 0.6,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
      className={`fixed ${positionClass} top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3`}
    >
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="group relative"
            aria-label={link.label}
            whileHover={{ scale: 1.1, x: hoverDirection }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: link.delay }}
              className={`w-12 h-12 ${link.bgColor} rounded-full flex items-center justify-center shadow-lg ${link.hoverShadow} transition-all`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <span className={`absolute ${tooltipPositionClass} top-1/2 -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap text-sm font-medium shadow-lg pointer-events-none`}>
              {link.label}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}


