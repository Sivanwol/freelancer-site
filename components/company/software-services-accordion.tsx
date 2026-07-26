'use client';

import { useState } from 'react';
import {
  FaArrowDown,
  FaBrain,
  FaCheck,
  FaCode,
  FaComments,
  FaDatabase,
  FaLayerGroup,
  FaShieldAlt,
  FaStore,
} from 'react-icons/fa';
import type { IconType } from 'react-icons';

type SoftwareService = {
  title: string;
  summary: string;
  technologies: readonly string[];
  outcomes: readonly string[];
};

const serviceIcons: IconType[] = [
  FaLayerGroup,
  FaCode,
  FaDatabase,
  FaBrain,
  FaComments,
  FaStore,
];

type Props = {
  services: readonly SoftwareService[];
  technologiesLabel: string;
  outcomesLabel: string;
  ctaLabel: string;
};

export default function SoftwareServicesAccordion({
  services,
  technologiesLabel,
  outcomesLabel,
  ctaLabel,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto grid max-w-5xl gap-3">
      {services.map((service, index) => {
        const Icon = serviceIcons[index] ?? FaShieldAlt;
        const isOpen = openIndex === index;
        const panelId = `software-service-panel-${index}`;
        const number = String(index + 1).padStart(2, '0');

        return (
          <article
            key={service.title}
            className={`overflow-hidden rounded-[28px] border bg-white shadow-sm transition ${
              isOpen ? 'border-[#4c9df2] shadow-md shadow-blue-500/10' : 'border-[#dbe7f5]'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-start gap-4 p-5 text-start md:items-center md:gap-6 md:p-6"
            >
              <span
                className={`mt-1 hidden h-10 w-10 shrink-0 place-items-center rounded-2xl md:grid ${
                  isOpen ? 'bg-[#1d72d2] text-white' : 'bg-[#e7f2ff] text-[#1d72d2]'
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-[#1d72d2]">{number}</p>
                    <h3 className="mt-1 text-2xl font-black leading-tight text-[#0d1626] md:text-3xl">
                      {service.title}
                    </h3>
                  </div>
                  <span
                    className={`mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#dbe7f5] bg-[#f8fbff] text-[#1d72d2] transition ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <FaArrowDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-base font-medium leading-8 text-[#526174]">{service.summary}</p>
              </div>
            </button>
            {isOpen ? (
              <div id={panelId} role="region" className="border-t border-[#e7f0fa] bg-[#f8fbff] px-5 pb-6 pt-5 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#1d72d2]">
                      {technologiesLabel}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[#c7d9ee] bg-white px-3 py-1.5 text-xs font-extrabold text-[#0d1626]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#1d72d2]">
                      {outcomesLabel}
                    </p>
                    <ul className="grid gap-2">
                      {service.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-3 rounded-2xl border border-[#dbe7f5] bg-white px-4 py-3 text-sm font-medium leading-7 text-[#526174]"
                        >
                          <FaCheck className="mt-1 h-4 w-4 shrink-0 text-[#1d72d2]" aria-hidden="true" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <a href="#contact" className="btn-primary">
                    {ctaLabel}
                  </a>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
