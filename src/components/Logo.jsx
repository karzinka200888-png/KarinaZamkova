import { LOGO_SRC, WORDMARK_SRC } from '../data/content.js';

// Оригінальні файли знака OS і напису OUTSISTENT — не перемальовуємо (правило брендбуку)
export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="OUTSISTENT — аутсорсингова компанія, на головну">
      <img src={LOGO_SRC} alt="" className="h-9 w-auto" width="52" height="36" />
      <span className="hidden flex-col gap-1 sm:flex">
        <img src={WORDMARK_SRC} alt="OUTSISTENT" className="h-4 w-auto" width="124" height="16" />
        <span className="text-[10px] font-medium leading-none tracking-wide text-ink">аутсорсингова компанія</span>
      </span>
    </a>
  );
}
