import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { ONE_OFF } from '../data/content.js';

const TABS = [
  { id: 'fop', label: 'Для ФОП' },
  { id: 'tov', label: 'Для ТОВ' },
];

export default function OneOff() {
  const [tab, setTab] = useState('fop');
  const [open, setOpen] = useState(0);

  return (
    <section id="one-off" className="bg-mist px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="04" eyebrow="Разові та додаткові послуги" title="Прайс" />

      <motion.div className="mt-12 flex gap-2 md:mt-20" role="tablist" variants={fadeUp} {...inView}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => {
              setTab(t.id);
              setOpen(0);
            }}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-widest transition-colors ${
              tab === t.id ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-brand-light'
            }`}
          >
            {t.label}
          </button>
        ))}
      </motion.div>

      <div className="mt-8 border-t border-line" role="tabpanel">
        {ONE_OFF[tab].map((group, i) => {
          const isOpen = open === i;
          return (
            <div key={`${tab}-${group.title}`} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-base font-bold uppercase tracking-wide text-ink md:text-lg">{group.title}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-brand-dark transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <ul className="pb-6">
                  {group.items.map(([name, price]) => (
                    <li key={name} className="flex items-baseline justify-between gap-6 py-2 text-sm">
                      <span className="text-ink">{name}</span>
                      <span className="whitespace-nowrap font-semibold text-ink">{price} грн</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
