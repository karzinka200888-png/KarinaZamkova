import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import {
  FOP_BASE_INCLUDES,
  FOP_SETUPS,
  FOP_TARIFFS,
  TERMS_NOTE,
  TOV_INCLUDES,
  TOV_PAYROLL_INCLUDES,
} from '../data/content.js';
import { formatUAH } from '../pricing.js';

function CheckList({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm font-medium text-ink">
          <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-brand-dark" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="bg-mist px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="02" eyebrow="Вартість на місяць" title="Тарифи" />

      {/* ФОП */}
      <motion.div className="mt-12 md:mt-20" variants={fadeUp} {...inView}>
        <h3 className="border-b-2 border-brand pb-4 text-sm font-bold uppercase tracking-widest text-ink md:text-base">
          ФОП на єдиному податку · «Базовий» тариф
        </h3>

        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="mt-2 w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[10px] font-semibold uppercase tracking-widest text-stone sm:text-xs">
                <th className="py-4 pr-4 font-semibold">Комплектація</th>
                <th className="px-2 py-4 text-right font-semibold">2 група<br />1 / 2 рахунки</th>
                <th className="py-4 pl-2 text-right font-semibold">3 група<br />1 / 2 рахунки</th>
              </tr>
            </thead>
            <tbody>
              {FOP_SETUPS.map((setup) => (
                <tr key={setup.id} className="border-t border-line">
                  <td className="py-4 pr-4 font-medium text-ink">{setup.label}</td>
                  {[2, 3].map((group) => (
                    <td key={group} className="whitespace-nowrap px-2 py-4 text-right font-bold text-ink last:pr-0">
                      {formatUAH(FOP_TARIFFS[group][setup.id][1])}
                      <span className="font-medium text-stone"> / {formatUAH(FOP_TARIFFS[group][setup.id][2])}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-stone">грн на місяць</p>
      </motion.div>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10">
        <motion.div variants={fadeUp} {...inView}>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand-dark sm:text-sm">
            Входить у «Базовий» тариф ФОП
          </h4>
          <CheckList items={FOP_BASE_INCLUDES} />
        </motion.div>

        {/* ТОВ */}
        <motion.div variants={fadeUp} custom={1} {...inView}>
          <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand-dark sm:text-sm">
            ТОВ · абонплата до 100 операцій на місяць
          </h4>
          <CheckList items={TOV_INCLUDES} />
          <h4 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-widest text-brand-dark sm:text-sm">
            + Зарплата на 1 співробітника
          </h4>
          <CheckList items={TOV_PAYROLL_INCLUDES} />
          <p className="mt-8 text-sm font-medium text-ink">
            Вартість для ТОВ розраховуємо індивідуально — залежить від кількості операцій, працівників і
            системи оподаткування.
          </p>
          <a
            href="#contacts"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-dark transition-colors hover:text-ink"
          >
            Отримати розрахунок
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>

      <motion.p
        className="mt-12 max-w-2xl border-l-2 border-brand pl-4 text-sm font-medium leading-relaxed text-stone md:mt-16"
        variants={fadeUp}
        {...inView}
      >
        {TERMS_NOTE}
      </motion.p>
    </section>
  );
}
