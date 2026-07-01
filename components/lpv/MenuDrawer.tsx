"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  ["Répertoire", "/vins"],
  ["Producteurs", "/producteurs"],
  ["Accords", "/accords"],
  ["Carte", "/carte"],
  ["Scan", "/scan"],
  ["Blogue", "/blog"],
  ["Boutique", "/boutique"],
  ["Sommelier", "/sommelier"],
];

export function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        className="fixed left-[72px] top-[184px] z-[9999] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#1F2A24] text-[#F6EFE7] shadow-[0_10px_25px_rgba(31,42,36,0.22)] transition hover:scale-105"
      >
        <span className="flex flex-col gap-[5px]">
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[10000] bg-[#1F2A24]/35 backdrop-blur-sm">
          <aside className="h-full w-full max-w-xl translate-x-0 bg-[#1F2A24] px-10 py-10 text-[#F6EFE7] shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mb-16 text-sm uppercase tracking-[0.25em] text-[#D6B692]"
            >
              Fermer
            </button>

            <nav className="flex flex-col gap-6">
              {links.map(([label, href]) => (
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
