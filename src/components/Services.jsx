import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { SERVICE_GROUPS } from '../data/content.js';

export default function Services() {
  return (
    <section id="services" className="px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="01" eyebrow="Що ми робимо" title="Послуги" />

      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-10">
        {SERVICE_GROUPS.map((group) => (
          <div key={group.title}>
            <motion.h3
              className="border-b-2 border-black pb-4 text-sm font-semibold uppercase tracking-widest md:text-base"
              variants={fadeUp}
              {...inView}
            >
              {group.title}
            </motion.h3>
            <ul>
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  custom={i * 0.4}
                  {...inView}
                >
                  <a
                    href="#contacts"
                    className="group flex items-center gap-4 border-b border-black/15 py-4 transition-colors hover:text-accent"
                  >
                    <span className="w-6 shrink-0 text-xs font-semibold tracking-widest text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-xs font-semibold uppercase tracking-wide sm:text-sm">
                      {item}
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
