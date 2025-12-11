'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FaBriefcase, FaDatabase, FaChartLine, FaMusic, FaServer, FaRocket, FaUsers, FaCode } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    icon: FaBriefcase,
    company: 'NICE',
    role: 'Senior Front End Engineer',
    date: '2019 - 2022',
    description: 'Developed hybrid applications for a global contact center platform. Led legacy system migrations and improved code quality with automated testing.',
    skills: ['Angular', 'TypeScript', 'Node.js'],
    skillColors: ['bg-red-500', 'bg-blue-500', 'bg-green-500'],
  },
  {
    id: 2,
    icon: FaDatabase,
    company: 'DBmaestro',
    role: 'Full Stack Engineer',
    date: '2017 - 2018',
    description: 'Built database management tools for DevOps teams. Developed features using the MEAN stack with cloud deployment on AWS.',
    skills: ['Node.js', 'Angular', 'AWS'],
    skillColors: ['bg-green-500', 'bg-red-500', 'bg-orange-500'],
  },
  {
    id: 3,
    icon: FaChartLine,
    company: 'Bidalgo',
    role: 'Full Stack Engineer',
    date: '2014 - 2017',
    description: 'Built marketing analytics platform for Facebook advertisers. Developed end-to-end solutions handling millions of data points daily.',
    skills: ['AngularJS', 'Node.js', 'PHP', 'Python'],
    skillColors: ['bg-red-500', 'bg-green-500', 'bg-indigo-500', 'bg-yellow-500'],
  },
  {
    id: 4,
    icon: FaMusic,
    company: 'Fuga Technologies',
    role: 'Full Stack Engineer',
    date: '2012 - 2014',
    description: 'Built music distribution and e-commerce platforms. Led modernization from PHP to JavaScript frameworks with AWS infrastructure.',
    skills: ['PHP', 'Node.js', 'AWS'],
    skillColors: ['bg-indigo-500', 'bg-green-500', 'bg-orange-500'],
  },
  {
    id: 5,
    icon: FaServer,
    company: 'Delanet',
    role: 'Backend Engineer',
    date: '2010 - 2012',
    description: 'Developed high-traffic web applications with optimized database performance. Ensured PCI compliance and system security.',
    skills: ['PHP', '.NET', 'MSSQL'],
    skillColors: ['bg-indigo-500', 'bg-purple-500', 'bg-blue-600'],
  },
  {
    id: 6,
    icon: FaRocket,
    company: 'Time Tunnel',
    role: 'CTO',
    date: '2009 - 2010',
    description: 'Led technology strategy and development team. Managed web and desktop projects while driving business growth initiatives.',
    skills: ['ASP.NET', 'PHP', 'Leadership'],
    skillColors: ['bg-purple-500', 'bg-indigo-500', 'bg-pink-500'],
  },
  {
    id: 7,
    icon: FaUsers,
    company: 'Xplore',
    role: 'Back End Team Lead',
    date: '2007 - 2009',
    description: 'Managed development team building enterprise applications. Delivered streaming solutions and multi-tier architecture systems.',
    skills: ['.NET', 'Java', 'Team Lead'],
    skillColors: ['bg-purple-500', 'bg-orange-600', 'bg-pink-500'],
  },
  {
    id: 8,
    icon: FaCode,
    company: 'Adgency',
    role: 'PHP Web Developer',
    date: '2005 - 2007',
    description: 'Built websites and internal management systems. Handled server administration and web service integrations.',
    skills: ['PHP', 'Linux', 'MVC'],
    skillColors: ['bg-indigo-500', 'bg-gray-500', 'bg-teal-500'],
  },
];

export default function ExperienceTimeline() {
  const t = useTranslations('experience');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-12 xs:py-16 sm:py-20 px-4 bg-[#161b22]">
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

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute start-6 xs:start-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden sm:block" />

          <div className="space-y-5 xs:space-y-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isHovered = hoveredId === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, type: 'spring' }}
                  className="relative ps-0 sm:ps-20"
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Icon Circle - Only visible on sm+ */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute start-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-gray-800 border-2 border-purple-500 items-center justify-center z-10 shadow-lg hidden sm:flex"
                  >
                    <Icon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-purple-400" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    animate={{ 
                      scale: isHovered ? 1.02 : 1,
                      y: isHovered ? -2 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`bg-gray-800/50 border rounded-xl xs:rounded-2xl p-4 xs:p-5 transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                      isHovered ? 'border-purple-500/70 shadow-lg shadow-purple-500/20' : 'border-gray-700'
                    }`}
                  >
                    <div className="flex flex-col gap-2 mb-2">
                      {/* Mobile icon + company row */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center sm:hidden">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base xs:text-lg font-bold text-white">{exp.company}</h3>
                          <p className="text-xs xs:text-sm text-purple-400">{exp.role}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded-full whitespace-nowrap">
                          {exp.date}
                        </span>
                      </div>
                    </div>

                    {/* Description - shown on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0, 
                        height: isHovered ? 'auto' : 0 
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs xs:text-sm text-gray-400 leading-relaxed mb-3">
                        {exp.description}
                      </p>
                    </motion.div>

                    {/* Skills Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 + skillIndex * 0.03 }}
                          whileHover={{ scale: 1.1 }}
                          className={`${exp.skillColors[skillIndex]} text-white text-xs font-medium px-2 py-0.5 rounded-full`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}



