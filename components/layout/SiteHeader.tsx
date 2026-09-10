"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

import { SearchButton } from "@/components/search/SearchButton";

const navItems = [
  ["Ce soir", "/ce-soir"],
  ["Les vins", "/vins"],
  ["Producteurs", "/producteurs"],
  ["Régions", "/regions"],
  ["Cépages", "/cepages"],
  ["Bonnes adresses", "/bonnes-adresses"],
  ["Guides", "/guides"],
  ["Journal", "/blog"],
];

const signedInItems = [
  ["Mon carnet", "/mon-carnet"],
  ["Favoris", "/favoris"],
  ["Ma cave", "/ma-cave"],
  ["Mes préférences", "/mes-preferences"],
];

function getInitials(
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null
) {
  const initials = [firstName, lastName]
    .filter(Boolean)
    .map((value) => value?.trim().charAt(0).toUpperCase())
    .join("");

  if (initials) return initials.slice(0, 2);

  return email?.trim().charAt(0).toUpperCase() || "M";
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [environmentChecked, setEnvironmentChecked] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const { isLoaded, isSignedIn, user } = useUser();

  const initials = getInitials(
    user?.firstName,
    user?.lastName,
    user?.primaryEmailAddress?.emailAddress
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const prelaunchPages = [
    "/disponible-bientot",
    "/a-propos",
    "/contact",
    "/newsletter",
    "/politique-confidentialite",
  ];

  useEffect(() => {
    setIsLocal(
      window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
    );
    setEnvironmentChecked(true);
  }, []);

  if (
    prelaunchPages.includes(pathname) ||
    (pathname === "/" && (!environmentChecked || !isLocal))
  ) {
    return null;
  }

  return (
    <>
      <header className="relative z-[9000] border-b border-[var(--lpv-line)] bg-[var(--lpv-paper)]">
        <div className="lpv-container flex h-[78px] items-center justify-between">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-[var(--lpv-ink)] transition-colors hover:bg-[var(--lpv-ink)] hover:text-[var(--lpv-paper-light)]"
            >
              <span className="flex w-[17px] flex-col gap-[4px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-[12px] bg-current transition-all group-hover:w-full" />
              </span>
            </button>

            <Link
              href="/"
              className="lpv-display text-[1.65rem] leading-none sm:text-[2rem]"
            >
              Le Premier Verre
            </Link>
          </div>

          <div className="flex items-center gap-5 md:gap-7">
            <SearchButton />

            {!isLoaded ? (
              <span
                aria-hidden="true"
                className="h-9 w-9 animate-pulse rounded-full border border-[var(--lpv-line)]"
              />
            ) : isSignedIn ? (
              <div
                ref={accountRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setAccountOpen((current) => !current)}
                  aria-label="Ouvrir le menu du compte"
                  aria-expanded={accountOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--lpv-ink)] text-[0.68rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-[var(--lpv-ink)] hover:text-[var(--lpv-paper-light)]"
                >
                  {initials}
                </button>

                {accountOpen ? (
                  <div className="absolute right-0 top-[calc(100%+14px)] w-[280px] border border-[var(--lpv-line)] bg-[var(--lpv-paper-light)] p-5 shadow-[0_18px_50px_rgba(33,29,26,0.10)]">
                    <div className="border-b border-[var(--lpv-line)] pb-5">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        Mon compte
                      </p>

                      <p className="mt-3 truncate text-sm">
                        {user.fullName ||
                          user.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>

                    <nav className="flex flex-col py-3">
                      {signedInItems.map(([label, href]) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setAccountOpen(false)}
                          className="border-b border-[var(--lpv-line-light)] py-3 text-sm transition-opacity hover:opacity-50"
                        >
                          {label}
                        </Link>
                      ))}
                    </nav>

                    <SignOutButton redirectUrl="/">
                      <button
                        type="button"
                        className="mt-3 flex w-full items-center justify-between text-left text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-[var(--lpv-cocoa)] transition-opacity hover:opacity-50"
                      >
                        Se déconnecter
                        <span>→</span>
                      </button>
                    </SignOutButton>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                href="/connexion"
                className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-50 sm:inline"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[10000]">
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/32"
          />

          <aside className="lpv-fade-in absolute inset-y-0 left-0 flex w-full max-w-[680px] flex-col overflow-y-auto bg-[var(--lpv-cocoa)] px-6 py-6 text-[var(--lpv-paper-light)] sm:px-10 sm:py-9">
            <div className="flex items-center justify-between border-b border-white/20 pb-6">
              <p className="lpv-display text-2xl">
                Le Premier Verre
              </p>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-70 transition-opacity hover:opacity-100"
              >
                Fermer
              </button>
            </div>

            <nav
              aria-label="Navigation principale"
              className="flex flex-1 flex-col justify-center gap-2 py-12"
            >
              {navItems.map(([label, href], index) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-5 border-b border-white/18 py-3"
                >
                  <span className="w-6 text-[0.6rem] tracking-[0.16em] opacity-40">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="lpv-display text-[clamp(2.7rem,8vw,5.8rem)] leading-[0.94] transition-transform duration-500 group-hover:translate-x-2">
                    {label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/20 pt-6">
              {isSignedIn ? (
                <div className="grid gap-5 sm:grid-cols-3">
                  {signedInItems.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[0.68rem] uppercase tracking-[0.18em] opacity-65 transition-opacity hover:opacity-100"
                    >
                      {label}
                    </Link>
                  ))}

                  <SignOutButton redirectUrl="/">
                    <button
                      type="button"
                      className="text-left text-[0.68rem] uppercase tracking-[0.18em] text-white/65 transition-opacity hover:text-white"
                    >
                      Se déconnecter
                    </button>
                  </SignOutButton>
                </div>
              ) : (
                <div className="flex gap-7">
                  <Link
                    href="/connexion"
                    onClick={() => setMenuOpen(false)}
                    className="text-[0.68rem] uppercase tracking-[0.18em] opacity-65 transition-opacity hover:opacity-100"
                  >
                    Connexion
                  </Link>

                  <Link
                    href="/inscription"
                    onClick={() => setMenuOpen(false)}
                    className="text-[0.68rem] uppercase tracking-[0.18em] opacity-65 transition-opacity hover:opacity-100"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
