import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { AUDIT_URL, SERVICES, SERVICES_NOTE } from '../data/content.js';

export default function Services() {
  return (
    <section id="services" className="px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="01" eyebrow="Що я роблю" title="Послуги" />

      <motion.p
        className="mt-10 max-w-2xl border-l-2 border-brand pl-4 text-sm font-medium leading-relaxed text-stone md:mt-16 md:text-base"
        variants={fadeUp}
        {...inView}
      >
        {SERVICES_NOTE}
      </motion.p>

      <div className="mt-10 grid gap-px bg-line md:mt-14 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <motion.article
            key={service.title}
            className="flex flex-col gap-6 bg-white py-8 lg:px-8 lg:first:pl-0"
            variants={fadeUp}
            custom={i}
            {...inView}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-dark sm:text-xs">
                {service.tag}
              </span>
              <span
                className="font-extrabold leading-none text-brand/60"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold uppercase text-ink md:text-3xl">{service.title}</h3>
            <p className="text-sm leading-relaxed text-stone md:text-base">{service.text}</p>
            <ul className="flex flex-col gap-3">
              {service.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-medium text-ink">
                  <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-brand-dark" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={AUDIT_URL}
              className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold uppercase tracking-widest text-brand-dark transition-colors hover:text-ink"
            >
              Детальніше
              <ArrowUpRight size={18} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
