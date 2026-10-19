import { motion } from 'framer-motion';
import { ArrowUpRight, AtSign, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { fadeUp, inView } from '../motion.js';
import { AUDIT_URL, CONTACTS } from '../data/content.js';

export default function Contacts() {
  const rows = [
    CONTACTS.phone && {
      icon: Phone,
      label: CONTACTS.phone,
      href: `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`,
    },
    CONTACTS.email && { icon: Mail, label: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    {
      icon: AtSign,
      label: CONTACTS.instagram,
      href: `https://instagram.com/${CONTACTS.instagram}`,
    },
    {
      icon: AtSign,
      label: CONTACTS.expertInstagram,
      href: `https://instagram.com/${CONTACTS.expertInstagram}`,
    },
    { icon: MapPin, label: CONTACTS.address },
    { icon: Clock, label: CONTACTS.hours },
  ].filter(Boolean);

  return (
    <footer id="contacts" className="relative overflow-hidden bg-white px-5 pb-8 pt-20 text-ink sm:px-8 md:px-12 md:pb-12 md:pt-32">
      <svg
        className="pointer-events-none absolute -bottom-[25vmax] -right-[15vmax] h-[60vmax] w-[60vmax]"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="49" stroke="#73EBDF" strokeWidth="0.5" />
      </svg>

      <motion.p
        className="relative text-[10px] font-semibold uppercase tracking-widest text-stone sm:text-xs md:text-sm"
        variants={fadeUp}
        {...inView}
      >
        <span className="text-brand-dark">06</span> / Контакти
      </motion.p>

      <motion.h2
        className="relative mt-6 uppercase"
        style={{ fontSize: 'clamp(2.5rem, 9vw, 9rem)', lineHeight: 0.9, fontWeight: 800 }}
        variants={fadeUp}
        custom={1}
        {...inView}
      >
        Усе під
        <br />
        <span className="text-brand-dark">контролем</span>
      </motion.h2>

      <div className="relative mt-12 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-col gap-4">
          {rows.map(({ icon: Icon, label, href }) => (
            <motion.li key={label} variants={fadeUp} custom={2} {...inView}>
              {href ? (
                <a
                  href={href}
                  className="flex items-center gap-3 text-sm font-semibold tracking-wide transition-colors hover:text-brand-dark md:text-base"
                >
                  <Icon size={18} className="text-brand-dark" /> {label}
                </a>
              ) : (
                <span className="flex items-center gap-3 text-sm font-semibold tracking-wide md:text-base">
                  <Icon size={18} className="text-brand-dark" /> {label}
                </span>
              )}
            </motion.li>
          ))}
        </ul>

        <motion.a
          href={AUDIT_URL}
          className="flex items-center gap-2 self-start whitespace-nowrap rounded-full bg-brand px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-transform hover:scale-105 md:self-auto md:text-base"
          variants={fadeUp}
          custom={3}
          {...inView}
        >
          Замовити аудит
          <ArrowUpRight size={20} />
        </motion.a>
      </div>

      <div className="relative mt-20 flex flex-col gap-2 border-t border-line pt-6 text-[10px] font-semibold uppercase tracking-widest text-stone sm:flex-row sm:justify-between sm:text-xs">
        <span>© {new Date().getFullYear()} OUTSISTENT</span>
        <span>Карина Замкова · податковий консультант</span>
      </div>
    </footer>
  );
}
