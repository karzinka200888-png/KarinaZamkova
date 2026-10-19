import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { ADVANTAGES } from '../data/content.js';

export default function Advantages() {
  return (
    <section id="about" className="bg-black px-5 py-20 text-white sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="02" eyebrow="Чому аутсорсинг" title="Переваги" />

      <div className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
        {ADVANTAGES.map((item, i) => (
          <motion.div
            key={item.title}
            className="flex flex-col gap-6 bg-black py-8 sm:p-8"
            variants={fadeUp}
            custom={i}
            {...inView}
          >
            <span className="text-xs font-semibold tracking-widest text-accent">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-semibold uppercase tracking-wide md:text-2xl">{item.title}</h3>
            <p className="text-sm leading-relaxed text-white/70">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
