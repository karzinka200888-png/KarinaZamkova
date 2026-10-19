import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { FIT, PROCESS, PROCESS_NOTE } from '../data/content.js';

export default function Process() {
  return (
    <section id="process" className="bg-mist px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="03" eyebrow="Як проходить аудит" title="Процес" />

      <ol className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-5 lg:gap-6">
        {PROCESS.map((step, i) => (
          <motion.li
            key={step.title}
            className="flex flex-col gap-4 border-t-2 border-brand pt-6"
            variants={fadeUp}
            custom={i}
            {...inView}
          >
            <span className="text-xs font-semibold tracking-widest text-brand-dark">
              Етап {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-bold uppercase tracking-wide text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed text-stone">{step.text}</p>
          </motion.li>
        ))}
      </ol>

      <motion.p
        className="mt-12 flex flex-col gap-2 text-base text-ink sm:flex-row sm:items-baseline sm:gap-4 md:mt-16"
        variants={fadeUp}
        {...inView}
      >
        <span className="font-script text-3xl text-brand-dark md:text-4xl">+{PROCESS_NOTE.title}</span>
        <span className="font-medium">{PROCESS_NOTE.text}</span>
      </motion.p>

      <div className="mt-20 md:mt-32">
        <SectionHeader index="04" eyebrow="Чи це вам підходить" title="Для кого" />
        <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-10">
          {[
            { title: 'Підходить', items: FIT.yes, icon: Check, iconClass: 'bg-brand text-ink' },
            { title: 'Не підходить', items: FIT.no, icon: X, iconClass: 'bg-line text-stone' },
          ].map(({ title, items, icon: Icon, iconClass }) => (
            <div key={title}>
              <motion.h3
                className="border-b-2 border-ink pb-4 text-sm font-bold uppercase tracking-widest text-ink md:text-base"
                variants={fadeUp}
                {...inView}
              >
                {title}
              </motion.h3>
              <ul>
                {items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-4 border-b border-line py-4 text-sm font-medium text-ink"
                    variants={fadeUp}
                    custom={i * 0.4}
                    {...inView}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
                      <Icon size={14} strokeWidth={3} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
