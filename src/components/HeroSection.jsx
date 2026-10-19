import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4';

const ACCENT = '#5E0ED7';
const EASE = [0.22, 1, 0.36, 1];

const NAV_LINKS = ['Story', 'Expertise', 'Studios', 'Feedback'];

const STATS = [
  { value: '300', label: 'Crafted\nBrands' },
  { value: '200', label: 'Digital\nProducts' },
  { value: '100', label: 'Ventures\nFunded' },
];

const HEADING_WORDS = ['Fearless', 'Vision', 'Delivered'];

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};

function Logo() {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full border-2"
      style={{ borderColor: ACCENT }}
    >
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ACCENT }} />
    </div>
  );
}

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
          aria-label="Menu"
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={onClose}
                className="text-3xl font-semibold uppercase tracking-widest text-black"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                {link}
              </motion.a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={onClose}
            className="mt-auto flex items-center gap-2 text-xl font-semibold uppercase tracking-wide"
            style={{ color: ACCENT }}
          >
            Work With Us
            <ArrowUpRight size={22} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden text-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-5 pt-5 sm:px-8 md:px-12 md:pt-6">
          <motion.div variants={fadeDown} initial="hidden" animate="visible" custom={0}>
            <Logo />
          </motion.div>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-semibold uppercase tracking-widest text-black"
                variants={fadeDown}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                {link}
              </motion.a>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full bg-black"
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
                key={stat.value}
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
                  <span style={{ color: ACCENT, fontSize: '0.5em' }}>+</span>
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
              Shaping Bold
              <br />
              Visions Into Power
              <br />
              For Your Tribe
            </motion.p>

            <motion.a
              href="#contact"
              className="flex items-center gap-1.5 whitespace-nowrap text-base uppercase tracking-wide sm:text-xl md:text-2xl"
              style={{ color: ACCENT, fontWeight: 600 }}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              Work With Us
              <ArrowUpRight className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </motion.a>
          </div>

          {/* Row B */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.div
              className="w-[120px] shrink-0 sm:w-[180px] md:w-[280px]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7}
            >
              <p className="text-left text-[9px] font-semibold uppercase tracking-widest sm:text-xs md:text-right md:text-sm">
                Creative Studios Built Around Elevating Your Vision Into Striking Reality
              </p>
            </motion.div>

            <h1
              className="text-right uppercase text-black"
              style={{ fontSize: 'clamp(2rem, 9vw, 9rem)', lineHeight: 0.88, fontWeight: 600 }}
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

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
