import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { fadeUp, inView } from '../motion.js';
import { CONTACTS } from '../data/content.js';

export default function Contacts() {
  const rows = [
    CONTACTS.phone && {
      icon: Phone,
      label: CONTACTS.phone,
      href: `tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`,
    },
    CONTACTS.email && { icon: Mail, label: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    { icon: MapPin, label: CONTACTS.address },
    { icon: Clock, label: CONTACTS.hours },
  ].filter(Boolean);

  const primaryHref = rows.find((r) => r.href)?.href;

  return (
    <footer id="contacts" className="bg-accent px-5 pb-8 pt-20 text-white sm:px-8 md:px-12 md:pb-12 md:pt-32">
      <motion.p
        className="text-[10px] font-semibold uppercase tracking-widest sm:text-xs md:text-sm"
        variants={fadeUp}
        {...inView}
      >
        05 / Контакти
      </motion.p>

      <motion.h2
        className="mt-6 uppercase"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 10rem)', lineHeight: 0.88, fontWeight: 600 }}
        variants={fadeUp}
        custom={1}
        {...inView}
      >
        Працюймо
        <br />
        разом
      </motion.h2>

      <div className="mt-12 flex flex-col gap-10 md:mt-20 md:flex-row md:items-end md:justify-between">
        <ul className="flex flex-col gap-4">
          {rows.map(({ icon: Icon, label, href }) => (
            <motion.li key={label} variants={fadeUp} custom={2} {...inView}>
              {href ? (
                <a
                  href={href}
                  className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest hover:underline md:text-base"
                >
                  <Icon size={18} /> {label}
                </a>
              ) : (
                <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest md:text-base">
                  <Icon size={18} /> {label}
                </span>
              )}
            </motion.li>
          ))}
        </ul>

        {primaryHref && (
          <motion.a
            href={primaryHref}
            className="flex items-center gap-2 self-start whitespace-nowrap rounded-full bg-white px-6 py-4 text-sm font-semibold uppercase tracking-widest text-accent transition-transform hover:scale-105 md:self-auto md:text-base"
            variants={fadeUp}
            custom={3}
            {...inView}
          >
            Отримати консультацію
            <ArrowUpRight size={20} />
          </motion.a>
        )}
      </div>

      <div className="mt-20 flex flex-col gap-2 border-t border-white/30 pt-6 text-[10px] font-semibold uppercase tracking-widest sm:flex-row sm:justify-between sm:text-xs">
        <span>© {new Date().getFullYear()} Outsistent</span>
        <span>Бухгалтерський і юридичний аутсорсинг</span>
      </div>
    </footer>
  );
}
