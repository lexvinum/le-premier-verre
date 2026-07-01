"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: Props) {
  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher un vin, un producteur, un cépage…"
      className="w-full border-0 bg-transparent px-8 py-7 text-2xl font-light text-[var(--lpv-ink)] outline-none placeholder:text-[var(--lpv-muted)]"
    />
  );
}
