import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

import PreferencesForm from "@/components/preferences/PreferencesForm";

export const dynamic = "force-dynamic";

export default async function MesPreferencesPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
        <section className="border-b border-[var(--lpv-line)]">
          <div className="lpv-container grid gap-12 py-16 md:grid-cols-[1fr_0.42fr] md:items-end md:py-24">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Mon espace
              </p>

              <h1 className="lpv-display mt-7 text-[clamp(4.5rem,10vw,9rem)] leading-[0.82]">
                Mes préférences.
              </h1>
            </div>

            <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
              <p className="max-w-sm text-base leading-8 text-[var(--lpv-muted)]">
                Quelques repères simples sur ce que tu aimes boire.
              </p>

              <Link
                href="/connexion"
                className="lpv-button lpv-button-dark mt-8"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-12 py-16 md:grid-cols-[1fr_0.42fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Mon profil
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.5rem,10vw,9rem)] leading-[0.82]">
              Mes préférences.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-sm text-base leading-8 text-[var(--lpv-muted)]">
              Quelques repères pour mieux comprendre ce que tu aimes.
              Tu peux les modifier en tout temps.
            </p>
          </div>
        </div>
      </section>

      <PreferencesForm />
    </main>
  );
}
