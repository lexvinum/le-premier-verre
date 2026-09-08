"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchButton } from "@/components/search/SearchButton";

const navItems = [
  ["Accueil", "/"],
  ["Ce soir", "/ce-soir"],
  ["Répertoire", "/vins"],
  ["Producteurs", "/producteurs"],
  ["Bonnes adresses", "/bonnes-adresses"],
  ["Guides", "/guides"],
  ["Blogue", "/blog"],
];

const accountItems = [
  ["Favoris", "/favoris"],
  ["Mon carnet", "/mon-carnet"],
  ["Connexion", "/connexion"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="relative z-[9000] flex h-24 items-center justify-between border-b border-[#d8d0c4] bg-[#F6EFE7] px-4 text-[#1F2A24] md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1F2A24] text-[#F6EFE7] shadow-sm transition hover:scale-105"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[2px] w-6 bg-current" />
              <span className="block h-[2px] w-6 bg-current" />
              <span className="block h-[2px] w-6 bg-current" />
            </span>
          </button>

          <Link
            href="/"
            className="lpv-display truncate text-[1.85rem] leading-none tracking-[-0.07em] md:text-[2.65rem]"
          >
            Le Premier Verre
          </Link>
        </div>

        <div className="ml-4 flex shrink-0 items-center gap-5">
          <SearchButton />

          <nav
            aria-label="Espace personnel"
            className="hidden items-center gap-5 lg:flex"
          >
            {accountItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs uppercase tracking-[0.16em] transition hover:opacity-60"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[10000] bg-[#1F2A24]/35 backdrop-blur-sm">
          <aside className="h-full w-full max-w-xl overflow-y-auto bg-[#1F2A24] px-8 py-10 text-[#F6EFE7] shadow-2xl md:px-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mb-14 text-sm uppercase tracking-[0.25em] text-[#D6B692]"
            >
              Fermer
            </button>

            <nav
              aria-label="Navigation principale"
              className="flex flex-col gap-5"
            >
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="lpv-display text-4xl leading-none transition hover:text-[#D6B692] md:text-6xl"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-12 border-t border-white/15 pt-8">
              <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#D6B692]">
                Espace personnel
              </p>

              <nav className="flex flex-col gap-4">
                {accountItems.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-sm uppercase tracking-[0.18em] text-white/75 transition hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
