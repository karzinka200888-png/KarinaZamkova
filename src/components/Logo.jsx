import { LOGO_SRC } from '../data/content.js';

// Знак OS не перемальовуємо (правило брендбуку) — лише оригінальний файл
export default function Logo() {
  return (
    <a href="#top" className="flex items-center" aria-label="OUTSISTENT — на головну">
      {LOGO_SRC ? (
        <img src={LOGO_SRC} alt="OUTSISTENT" className="h-9 w-auto" />
      ) : (
        <span className="text-sm font-bold uppercase tracking-widest text-ink">Outsistent</span>
      )}
    </a>
  );
}
