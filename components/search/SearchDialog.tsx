"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import { useSearch } from "@/hooks/useSearch";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResults";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data } = useSearch(query);

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    function openSearch() {
      setOpen(true);
    }

    window.addEventListener("keydown", handleKeyboard);
    window.addEventListener("open-search", openSearch as EventListener);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
      window.removeEventListener("open-search", openSearch as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[10000] bg-[var(--lpv-ink)]/42 backdrop-blur-sm" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[10001] max-h-screen overflow-y-auto bg-[var(--lpv-paper)] text-[var(--lpv-ink)] shadow-[0_30px_100px_rgba(33,29,26,0.22)] md:left-1/2 md:right-auto md:top-8 md:max-h-[calc(100vh-64px)] md:w-[min(1100px,calc(100vw-64px))] md:-translate-x-1/2"
        >
          <Dialog.Title className="sr-only">
            Rechercher sur Le Premier Verre
          </Dialog.Title>

          <div className="flex items-center justify-between border-b border-[var(--lpv-line)] px-5 py-5 md:px-8">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Recherche
            </p>

            <Dialog.Close className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-50">
              Fermer
            </Dialog.Close>
          </div>

          <SearchInput value={query} onChange={setQuery} />

          {query.trim().length < 2 ? (
            <div className="grid min-h-[420px] gap-10 border-t border-[var(--lpv-line)] px-5 py-12 md:grid-cols-[0.62fr_0.38fr] md:px-8 md:py-16">
              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  Dans la bibliothèque
                </p>

                <h2 className="lpv-display mt-6 max-w-3xl text-[clamp(4rem,8vw,8rem)] leading-[0.84]">
                  Que cherches-tu?
                </h2>
              </div>

              <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0">
                <p className="text-base leading-8 text-[var(--lpv-muted)]">
                  Un vin, un producteur, une région, un cépage, un guide ou une
                  histoire à lire.
                </p>

                <div className="mt-8 border-t border-[var(--lpv-line)] pt-5 text-xs uppercase tracking-[0.15em] text-[var(--lpv-muted)]">
                  <p>Commence à écrire au moins deux lettres.</p>
                  <p className="mt-3">Échap pour fermer.</p>
                </div>
              </div>
            </div>
          ) : (
            <SearchResults
              results={data}
              onNavigate={() => setOpen(false)}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
