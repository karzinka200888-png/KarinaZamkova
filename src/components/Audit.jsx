import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { ADVANTAGES, AUDIT_FINDINGS, AUDIT_URL } from '../data/content.js';

export default function Audit() {
  return (
    <section id="audit" className="relative overflow-hidden bg-brand-light px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <svg
        className="pointer-events-none absolute -right-[20vmax] -top-[20vmax] h-[60vmax] w-[60vmax]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="49" stroke="#73EBDF" strokeWidth="0.5" />
      </svg>

      <SectionHeader index="02" eyebrow="Аудит фінансової безпеки" title="Друга пара очей" />

      <motion.p
        className="relative mt-10 max-w-2xl text-base font-medium leading-relaxed text-ink md:mt-16 md:text-lg"
        variants={fadeUp}
        {...inView}
      >
        Більшість із цього — не злий умисел, а незнання, довіра і «поки не спіймали». Що реально
        знаходиться під час аудиту:
      </motion.p>

      <div className="relative mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {AUDIT_FINDINGS.map((item, i) => (
          <motion.div
            key={item.title}
            className="flex flex-col gap-4 bg-white p-6 md:p-8"
            variants={fadeUp}
            custom={i}
            {...inView}
          >
            <span
              className="font-extrabold leading-none text-brand/60"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-bold text-ink">{item.title}</h3>
            <p className="text-sm leading-relaxed text-stone">
              {item.accent && <span className="font-bold text-spark">{item.accent} </span>}
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-16 grid gap-10 md:mt-24 md:grid-cols-[1fr_auto] md:items-end">
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {ADVANTAGES.map((item, i) => (
            <motion.li key={item.title} className="flex gap-4" variants={fadeUp} custom={i} {...inView}>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                <Check size={14} strokeWidth={3} />
              </span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.a
          href={AUDIT_URL}
          className="flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-brand px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-transform hover:scale-105 md:self-auto"
          variants={fadeUp}
          custom={2}
          {...inView}
        >
          Замовити аудит
          <ArrowUpRight size={20} />
        </motion.a>
      </div>
    </section>
  );
}
