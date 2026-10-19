export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Outsistent — на головну">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="hidden text-sm font-semibold uppercase tracking-widest text-black sm:inline">
        Outsistent
      </span>
    </a>
  );
}
