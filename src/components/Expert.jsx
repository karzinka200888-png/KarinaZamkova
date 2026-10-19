import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { EXPERT } from '../data/content.js';

export default function Expert() {
  return (
    <section id="expert" className="bg-mist px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="06" eyebrow="Хто веде ваш облік" title="Про нас" />

      <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
        <motion.div className="flex flex-col gap-6" variants={fadeUp} {...inView}>
          <div>
            <h3 className="text-2xl font-extrabold text-ink md:text-4xl">{EXPERT.name}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-brand-dark md:text-sm">
              {EXPERT.role}
            </p>
          </div>
          {EXPERT.about.map((p) => (
            <p key={p} className="text-base leading-relaxed text-ink md:text-lg">
              {p}
            </p>
          ))}
          <p className="font-script text-2xl text-brand-dark md:text-3xl">складне — простою мовою</p>
          <p className="border-l-2 border-brand pl-4 text-sm font-medium text-stone">{EXPERT.book}</p>
        </motion.div>

        <dl className="grid grid-cols-2 gap-px self-start bg-line">
          {EXPERT.facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              className="flex flex-col gap-3 bg-white py-6 pr-4 sm:p-6"
              variants={fadeUp}
              custom={i}
              {...inView}
            >
              <dt className="order-2 text-xs font-medium leading-snug text-stone sm:text-sm">{fact.label}</dt>
              <dd
                className="order-1 font-extrabold leading-none text-ink"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
              >
                {fact.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
