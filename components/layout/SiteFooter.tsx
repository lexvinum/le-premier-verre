import Link from "next/link";
import { getSiteSettings, getThemeStyle } from "@/sanity/lib/site-settings";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer
      style={getThemeStyle(settings)}
      className="mt-20 border-t border-[var(--lpv-border)] bg-[var(--lpv-ink)] text-[var(--lpv-cream)]"
    >
      <div className="lpv-container py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="mb-8 text-[10px] uppercase tracking-[0.48em] text-white/38">
              Le journal du premier verre
            </p>

            <h2 className="lpv-display max-w-5xl text-[clamp(4.2rem,9vw,10rem)] leading-[0.78] tracking-[-0.075em]">
              {settings.footer.headline}
            </h2>

            <p className="mt-9 max-w-xl text-sm leading-7 text-white/52">
              {settings.footer.description}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-10 md:items-end">
            <div className="flex flex-col gap-4 md:items-end">
              {(settings.footer.links ?? []).map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href ?? "/"}
                  className="text-sm text-white/52 transition duration-500 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/sommelier"
              className="rounded-full border border-white/22 px-6 py-3 text-xs uppercase tracking-[0.24em] text-white/70 transition duration-500 hover:border-white hover:text-white"
            >
              Demander au sommelier IA
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-7 text-[11px] uppercase tracking-[0.22em] text-white/32 md:flex-row md:items-center md:justify-between">
          <p>{settings.footer.copyright}</p>
          <p>Magazine numérique du vin · Québec</p>
        </div>
      </div>
    </footer>
  );
}
