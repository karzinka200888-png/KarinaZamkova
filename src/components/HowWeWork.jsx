import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { PROCESS } from '../data/content.js';

export default function HowWeWork() {
  return (
    <section id="process" className="px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="05" eyebrow="Як ми працюємо" title="Процес" />
      <ol className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {PROCESS.map((step, i) => (
          <motion.li
            key={step.title}
            className="flex flex-col gap-4 border-t-2 border-brand pt-6"
            variants={fadeUp}
            custom={i}
            {...inView}
          >
            <span className="text-xs font-semibold tracking-widest text-brand-dark">
              Крок {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wide text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed text-stone">{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
