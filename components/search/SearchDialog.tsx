"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";
import { useSearch } from "@/hooks/useSearch";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data } = useSearch(query);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") setOpen(false);
    }

    function openSearch() {
      setOpen(true);
    }

    window.addEventListener("keydown", handler);
    window.addEventListener("open-search", openSearch as EventListener);

    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("open-search", openSearch as EventListener);
    };
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[var(--lpv-ink)]/45 backdrop-blur-md" />

        <Dialog.Content className="fixed left-1/2 top-16 z-50 w-[min(920px,92vw)] -translate-x-1/2 overflow-hidden rounded-[2.25rem] border border-[var(--lpv-border)] bg-[rgba(251,247,239,0.97)] shadow-2xl backdrop-blur-2xl">
          <SearchInput value={query} onChange={setQuery} />

          {query.length < 2 ? (
            <div className="border-t border-[var(--lpv-border)] p-10 text-center">
              <p className="lpv-display text-6xl leading-[0.85] tracking-[-0.07em] text-[var(--lpv-ink)]">
                Que cherches-tu?
              </p>
              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[var(--lpv-muted)]">
                Vins, producteurs, régions, cépages, accords, guides et articles.
              </p>
            </div>
          ) : (
            <SearchResults results={data} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
