"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/blog", label: "Articles" },
  { href: "/guides", label: "Guides" },
  { href: "/vignobles", label: "Vignobles" },
  { href: "/bonnes-adresses", label: "Adresses" },
  { href: "/carte", label: "Carte" },
  { href: "/scan", label: "Scan" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isCellar = pathname?.startsWith("/ma-cave") || pathname?.startsWith("/cellar");
  const isRecommendation = pathname?.startsWith("/recommandation");

  const isPublicPage =
    pathname === "/disponible-bientot" || pathname === "/admin-acces";

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 16);

      if (currentY > 140 && currentY > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isPublicPage) {
    return null;
  }

  function openSidebar() {
    window.dispatchEvent(new CustomEvent("lexvinum:open-sidebar"));
  }

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden ? "-translate-y-4 opacity-0" : "translate-y-0 opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "w-full border-b backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-[rgba(212,194,167,0.14)] bg-[rgba(14,12,10,0.72)] shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            : "border-[rgba(212,194,167,0.08)] bg-[rgba(14,12,10,0.28)]",
        ].join(" ")}
      >
        <div className="grid h-[82px] grid-cols-[auto_1fr_auto] items-center gap-6 px-6 md:h-[88px] md:px-10">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={openSidebar}
              aria-label="Ouvrir le menu"
              className={[
                "inline-flex items-center gap-3 rounded-full border px-3.5 py-2 text-sm transition-all duration-300",
                scrolled
                  ? "border-[rgba(212,194,167,0.18)] bg-[rgba(255,255,255,0.05)] text-[var(--text)]"
                  : "border-[rgba(212,194,167,0.12)] bg-[rgba(255,255,255,0.03)] text-[var(--text)]",
              ].join(" ")}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(212,194,167,0.18)] bg-[rgba(255,255,255,0.04)] text-[10px] tracking-[0.28em]">
                PV
              </span>
              <span className="hidden uppercase tracking-[0.18em] text-xs text-[var(--muted)] sm:inline">
                Menu
              </span>
            </button>
          </div>

          <div className="flex min-w-0 items-center justify-center gap-7">
            <Link
              href="/"
              aria-label="Retour à l’accueil"
              className="shrink-0 transition-opacity duration-300 hover:opacity-90"
            >
              <Image
                src="/images/logo-lexvinum.png"
                alt="Le Premier Verre"
                width={420}
                height={160}
                priority
                className="h-[42px] w-auto object-contain opacity-90 md:h-[52px]"
              />
            </Link>

            <nav className="hidden items-center gap-5 xl:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "text-sm transition-colors duration-300",
                      active
                        ? "text-[var(--text)]"
                        : "text-[var(--text-soft)] hover:text-[var(--text)]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/ma-cave"
              className={[
                "hidden text-sm transition-colors duration-300 md:inline",
                isCellar
                  ? "text-[var(--text)]"
                  : "text-[var(--text-soft)] hover:text-[var(--text)]",
              ].join(" ")}
            >
              Ma cave
            </Link>

            <Link
              href="/recommandation"
              className={[
                "rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 md:px-5",
                isRecommendation
                  ? "bg-[linear-gradient(135deg,#eadac1_0%,#d7b998_100%)] text-[#1a1713]"
                  : "bg-[linear-gradient(135deg,#eadac1_0%,#d7b998_100%)] text-[#1a1713] hover:-translate-y-[1px] hover:brightness-[1.03]",
              ].join(" ")}
            >
              Trouver
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}