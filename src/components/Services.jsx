import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { SERVICES } from '../data/content.js';

export default function Services() {
  return (
    <section id="services" className="px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="01" eyebrow="Щомісячний супровід" title="Послуги" />

      <div className="mt-12 grid gap-px bg-line sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
        {SERVICES.map((service, i) => (
          <motion.article
            key={service.title}
            className="flex flex-col gap-4 bg-white py-8 sm:p-8"
            variants={fadeUp}
            custom={i * 0.5}
            {...inView}
          >
            <span
              className="font-extrabold leading-none text-brand/60"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-bold uppercase text-ink md:text-2xl">{service.title}</h3>
            <p className="text-sm leading-relaxed text-stone md:text-base">{service.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
