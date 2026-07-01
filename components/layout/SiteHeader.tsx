"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchButton } from "@/components/search/SearchButton";

const navItems = [
  ["Répertoire", "/vins"],
  ["Producteurs", "/producteurs"],
  ["Accords", "/accords"],
  ["Carte", "/carte"],
  ["Scan", "/scan"],
  ["Blogue", "/blog"],
  ["Boutique", "/boutique"],
  ["Sommelier", "/sommelier"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="relative z-[9000] flex h-24 items-center justify-between border-b border-[#d8d0c4] bg-[#F6EFE7] px-8 text-[#1F2A24]">
        <div className="flex shrink-0 items-center gap-3">
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

          <Link href="/" className="lpv-display shrink-0 -translate-x-20 text-[2.65rem] leading-none tracking-[-0.08em]">
            Le Premier Verre
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-8">
          <SearchButton />
          <Link
            href="/sommelier"
            className="rounded-full bg-[#120f0d] px-8 py-4 text-xs uppercase tracking-[0.28em] text-[#F6EFE7] transition hover:bg-[#465344]"
          >
            Sommelier
          </Link>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[10000] bg-[#1F2A24]/35 backdrop-blur-sm">
          <aside className="h-full w-full max-w-xl bg-[#1F2A24] px-10 py-10 text-[#F6EFE7] shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mb-16 text-sm uppercase tracking-[0.25em] text-[#D6B692]"
            >
              Fermer
            </button>

            <nav className="flex flex-col gap-6">
              {navItems.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="lpv-display text-6xl leading-none transition hover:text-[#D6B692]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
