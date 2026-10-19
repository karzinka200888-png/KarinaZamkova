import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { EASE, fadeDown, fadeUp } from '../motion.js';
import { AUDIT_URL, HEADING_WORDS, NAV_LINKS, STATS } from '../data/content.js';

function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-white px-5 pb-8 pt-5 sm:px-8 md:px-12 md:pb-12 md:pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрити меню"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-3xl font-semibold uppercase tracking-widest text-ink transition-colors hover:text-brand-dark"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          <a
            href={AUDIT_URL}
            onClick={onClose}
            className="mt-auto flex items-center gap-2 text-xl font-semibold uppercase tracking-wide text-brand-dark"
          >
            Аудит фінансової безпеки
            <ArrowUpRight size={22} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden text-ink">
      {/* Фірмова геометрія: контурне бірюзове коло і тонка лінія */}
      <div className="pointer-events-none absolute inset-0 bg-mist" aria-hidden="true">
        <svg
          className="absolute -left-[30vmax] top-1/2 h-[90vmax] w-[90vmax] -translate-y-1/2 md:-left-[12vmax]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="49"
            stroke="#73EBDF"
            strokeWidth="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: EASE }}
          />
        </svg>
        <motion.div
          className="absolute left-0 top-[72px] h-px bg-brand md:top-[84px]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 1.4, ease: EASE }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6">
          <motion.div variants={fadeDown} initial="hidden" animate="visible" custom={0}>
            <Logo />
          </motion.div>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:text-brand-dark"
                variants={fadeDown}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Відкрити меню"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-ink"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <span className="h-0.5 w-4 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
          </motion.button>
        </nav>

        {/* Stats */}
        <div className="flex flex-1 items-center justify-end px-5 py-8 sm:px-8 md:px-12 md:py-0">
          <div className="flex gap-5 sm:gap-8 md:gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-end text-right"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 2}
              >
                <div
                  className="flex items-start leading-none"
                  style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: 600 }}
                >
                  <span className="text-brand-dark" style={{ fontSize: '0.5em' }}>
                    +
                  </span>
                  <span>{stat.value}</span>
                </div>
                <p className="mt-1 whitespace-pre-line text-[10px] font-semibold uppercase leading-tight tracking-widest sm:text-xs md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom content */}
        <div className="flex flex-col gap-6 px-5 pb-8 sm:px-8 md:gap-12 md:px-12 md:pb-12">
          {/* Row A */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              className="max-w-[130px] text-[10px] font-semibold uppercase tracking-widest sm:max-w-[160px] sm:text-xs md:max-w-xs md:text-sm"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              Незалежний погляд
              <br />
              на ваш облік
              <br />
              <span className="font-script text-base normal-case tracking-normal text-brand-dark sm:text-lg md:text-2xl">
                друга пара очей
              </span>
            </motion.p>

            <motion.a
              href={AUDIT_URL}
              className="flex items-center gap-1.5 whitespace-nowrap text-base uppercase tracking-wide text-brand-dark sm:text-xl md:text-2xl"
              style={{ fontWeight: 600 }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              Замовити аудит
              <ArrowUpRight className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </motion.a>
          </div>

          {/* Row B */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <motion.div
              className="max-w-[220px] shrink-0 sm:w-[180px] sm:max-w-none md:w-[280px]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7}
            >
              <p className="text-left text-[10px] font-semibold uppercase tracking-widest sm:text-xs md:text-right md:text-sm">
                Знаходжу податкові ризики у вашому обліку раніше, ніж їх знайде податкова
              </p>
            </motion.div>

            <h1
              className="self-end text-right uppercase text-ink"
              style={{ fontSize: 'clamp(2.25rem, 6.6vw, 8.5rem)', lineHeight: 0.9, fontWeight: 800 }}
            >
              {HEADING_WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 + i * 0.14, duration: 0.7, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </section>
  );
}
