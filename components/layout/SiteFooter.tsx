import Link from "next/link";

const information = [
  ["À propos", "/a-propos"],
  ["Contact", "/contact"],
  ["Infolettre", "/newsletter"],
  ["Confidentialité", "/politique-confidentialite"],
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--lpv-cocoa)] text-[var(--lpv-paper-light)]">
      <div className="lpv-container py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_0.4fr]">
          <div>
            <p className="lpv-kicker text-white/55">
              Le Premier Verre
            </p>

            <h2 className="lpv-display mt-8 max-w-4xl text-[clamp(3.8rem,8vw,8.5rem)] leading-[0.86]">
              Boire moins compliqué.
            </h2>

            <p className="mt-8 max-w-lg text-sm leading-7 text-white/62">
              Des bouteilles, des personnes et des endroits qui méritent
              qu’on s’y attarde.
            </p>
          </div>

          <div>
            <p className="lpv-kicker text-white/40">
              Le projet
            </p>

            <nav className="mt-7 flex flex-col gap-3">
              {information.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="w-fit text-sm text-white/68 transition-opacity hover:opacity-50"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/20 pt-6 text-[0.62rem] uppercase tracking-[0.17em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Le Premier Verre</p>
          <p>Québec · Des bouteilles, des lieux, des histoires</p>
        </div>
      </div>
    </footer>
  );
}
