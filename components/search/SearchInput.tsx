"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  return (
    <div className="px-5 py-8 md:px-8 md:py-10">
      <label htmlFor="global-search" className="sr-only">
        Rechercher
      </label>

      <div className="flex items-end gap-5">
        <span
          aria-hidden="true"
          className="mb-3 hidden text-2xl text-[var(--lpv-muted)] sm:block"
        >
          ↳
        </span>

        <input
          id="global-search"
          autoFocus
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Vin, producteur, région…"
          className="lpv-display min-w-0 flex-1 border-0 bg-transparent py-2 text-[clamp(2.8rem,7vw,7rem)] leading-[0.95] text-[var(--lpv-ink)] outline-none placeholder:text-[var(--lpv-muted)]/35"
        />
      </div>
    </div>
  );
}
