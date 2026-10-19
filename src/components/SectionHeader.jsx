import { motion } from 'framer-motion';
import { fadeUp, inView } from '../motion.js';

// Номер секції + великий заголовок, у стилі першого екрана
export default function SectionHeader({ index, eyebrow, title }) {
  return (
    <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <motion.p
        className="text-[10px] font-semibold uppercase tracking-widest text-stone sm:text-xs md:text-sm"
        variants={fadeUp}
        custom={0}
        {...inView}
      >
        <span className="text-brand-dark">{index}</span> / {eyebrow}
      </motion.p>
      <motion.h2
        className="uppercase text-ink md:text-right"
        style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)', lineHeight: 0.95, fontWeight: 800 }}
        variants={fadeUp}
        custom={1}
        {...inView}
      >
        {title}
      </motion.h2>
    </div>
  );
}
