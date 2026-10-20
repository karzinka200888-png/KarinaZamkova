import { LOGO_SRC, WORDMARK_SRC } from '../data/content.js';

// Оригінальні файли знака OS і напису OUTSISTENT — не перемальовуємо (правило брендбуку)
export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="OUTSISTENT — на головну">
      <img src={LOGO_SRC} alt="" className="h-9 w-auto" width="52" height="36" />
      <img src={WORDMARK_SRC} alt="OUTSISTENT" className="hidden h-4 w-auto sm:block" width="124" height="16" />
    </a>
  );
}
