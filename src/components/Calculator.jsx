import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { fadeUp, inView } from '../motion.js';
import { FOP_EXTRAS, FOP_OPERATIONS, FOP_PACKAGES, FOP_SETUPS, TERMS_NOTE } from '../data/content.js';
import { calculateFop, formatUAH } from '../pricing.js';

const INITIAL = {
  group: 3,
  setup: 'noRro',
  accounts: 1,
  operations: 0,
  packages: Object.fromEntries(FOP_PACKAGES.map((p) => [p.id, 0])),
  employees: 0,
  extras: {},
};

function Field({ label, children }) {
  return (
    <fieldset className="flex flex-col gap-3 border-t border-line pt-6">
      <legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone">{label}</legend>
      {children}
    </fieldset>
  );
}

function Pills({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`rounded-full border px-4 py-2 text-left text-sm font-medium transition-colors ${
              active ? 'border-brand bg-brand text-ink' : 'border-line bg-white text-ink hover:border-brand'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function Calculator() {
  const [state, setState] = useState(INITIAL);
  const set = (patch) => setState((s) => ({ ...s, ...patch }));
  const result = useMemo(() => calculateFop(state), [state]);

  return (
    <section id="calculator" className="px-5 py-20 sm:px-8 md:px-12 md:py-32">
      <SectionHeader index="03" eyebrow="Попередній розрахунок для ФОП" title="Калькулятор" />

      <div className="mt-12 grid gap-10 md:mt-20 lg:grid-cols-[1fr_380px] lg:gap-16">
        <motion.div className="flex flex-col gap-8" variants={fadeUp} {...inView}>
          <Field label="Група єдиного податку">
            <Pills
              options={[
                { value: 2, label: '2 група' },
                { value: 3, label: '3 група' },
              ]}
              value={state.group}
              onChange={(group) => set({ group })}
            />
          </Field>

          <Field label="Каса і платежі">
            <Pills
              options={FOP_SETUPS.map((s) => ({ value: s.id, label: s.label }))}
              value={state.setup}
              onChange={(setup) => set({ setup })}
            />
          </Field>

          <Field label="Банківські рахунки">
            <Pills
              options={[
                { value: 1, label: '1 рахунок' },
                { value: 2, label: '2 рахунки' },
              ]}
              value={state.accounts}
              onChange={(accounts) => set({ accounts })}
            />
          </Field>

          <Field label="Операцій на місяць">
            <Pills
              options={FOP_OPERATIONS.map((o, i) => ({ value: i, label: o.label }))}
              value={state.operations}
              onChange={(operations) => set({ operations })}
            />
          </Field>

          {FOP_PACKAGES.map((pkg) => (
            <Field key={pkg.id} label={pkg.title}>
              <Pills
                options={pkg.options.map((o, i) => ({ value: i, label: o.label }))}
                value={state.packages[pkg.id]}
                onChange={(v) => set({ packages: { ...state.packages, [pkg.id]: v } })}
              />
            </Field>
          ))}

          <Field label="Наймані працівники">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => set({ employees: Math.max(0, state.employees - 1) })}
                aria-label="Менше працівників"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-brand"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center text-2xl font-bold text-ink" aria-live="polite">
                {state.employees}
              </span>
              <button
                type="button"
                onClick={() => set({ employees: Math.min(50, state.employees + 1) })}
                aria-label="Більше працівників"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-brand"
              >
                <Plus size={16} />
              </button>
            </div>
          </Field>

          <Field label="Особливості">
            <div className="flex flex-col gap-3">
              {FOP_EXTRAS.map((extra) => (
                <label key={extra.id} className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink">
                  <input
                    type="checkbox"
                    checked={!!state.extras[extra.id]}
                    onChange={(e) => set({ extras: { ...state.extras, [extra.id]: e.target.checked } })}
                    className="h-5 w-5 shrink-0 accent-brand-dark"
                  />
                  {extra.label}
                  <span className="ml-auto whitespace-nowrap text-stone">
                    {extra.from ? 'від ' : '+'}
                    {formatUAH(extra.price)}
                  </span>
                </label>
              ))}
            </div>
          </Field>
        </motion.div>

        <motion.aside
          className="self-start rounded-3xl bg-brand-light p-6 sm:p-8 lg:sticky lg:top-8"
          variants={fadeUp}
          custom={1}
          {...inView}
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-dark">Орієнтовно на місяць</p>
          {result.individual ? (
            <p className="mt-3 text-3xl font-extrabold text-ink">Індивідуально</p>
          ) : (
            <p className="mt-3 font-extrabold leading-none text-ink" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
              {result.from && <span className="text-2xl">від </span>}
              {formatUAH(result.total)}
              <span className="text-xl font-bold text-stone"> грн</span>
            </p>
          )}

          <ul className="mt-6 flex flex-col gap-2 border-t border-brand/50 pt-6">
            {result.lines.map(([label, price]) => (
              <li key={label} className="flex justify-between gap-4 text-sm text-ink">
                <span>{label}</span>
                <span className="whitespace-nowrap font-semibold">{formatUAH(price)}</span>
              </li>
            ))}
            {result.individual && (
              <li className="flex justify-between gap-4 text-sm text-ink">
                <span>Понад 500 операцій</span>
                <span className="font-semibold">індивідуально</span>
              </li>
            )}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-stone">
            Попередній розрахунок за тарифами договору. {TERMS_NOTE}
          </p>

          <a
            href="#contacts"
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-transform hover:scale-105"
          >
            Обговорити
            <ArrowUpRight size={18} />
          </a>
        </motion.aside>
      </div>
    </section>
  );
}
