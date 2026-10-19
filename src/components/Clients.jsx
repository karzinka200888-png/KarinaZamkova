import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { CLIENTS, PROCESS } from '../data/content.js';

export default function Clients() {
  return (
    <section id="clients" className="px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="03" eyebrow="З ким працюємо" title="Клієнти" />

      <ul className="mt-12 md:mt-20">
        {CLIENTS.map((client, i) => (
          <motion.li
            key={client.short}
            className="group flex items-baseline justify-between gap-4 border-b border-black/15 py-4 md:py-6"
            variants={fadeUp}
            custom={i * 0.5}
            {...inView}
          >
            <span
              className="uppercase transition-colors group-hover:text-accent"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 0.9, fontWeight: 600 }}
            >
              {client.short}
            </span>
            <span className="max-w-[45%] text-right text-[10px] font-semibold uppercase tracking-widest sm:text-xs md:text-sm">
              {client.full}
            </span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-20 md:mt-32">
        <SectionHeader index="04" eyebrow="Як ми працюємо" title="Процес" />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <motion.li
              key={step.title}
              className="flex flex-col gap-4 border-t-2 border-black pt-6"
              variants={fadeUp}
              custom={i}
              {...inView}
            >
              <span className="text-xs font-semibold tracking-widest text-accent">
                Крок {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-semibold uppercase tracking-wide md:text-2xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-black/70">{step.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
