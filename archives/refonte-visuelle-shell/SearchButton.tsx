"use client";

export function SearchButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className="group flex w-full items-center justify-between rounded-full border border-[var(--lpv-border)] bg-white/45 px-5 py-3 text-left shadow-sm backdrop-blur-xl transition duration-500 hover:-translate-y-0.5 hover:bg-white/75 hover:shadow-md"
    >
      <span className="flex items-center gap-3">
        <span>🔍</span>
        <span className="text-sm text-[var(--lpv-muted)]">
          Rechercher
        </span>
      </span>

      <kbd className="rounded-full border border-[var(--lpv-border)] bg-[var(--lpv-surface)] px-2.5 py-1 text-[10px] text-[var(--lpv-muted)]">
        ⌘K
      </kbd>
    </button>
  );
}
