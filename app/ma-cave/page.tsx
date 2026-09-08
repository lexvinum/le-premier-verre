import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

import { writeClient } from "@/sanity/lib/write-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CaveData = {
  journalCount: number;
  favoriteCount: number;
  listCount: number;
  buyAgainCount: number;
};

export default async function MaCavePage() {
  const { userId } = await auth();

  const stats: CaveData = userId
    ? await writeClient.fetch(
        `{
          "journalCount": count(*[
            _type == "wineJournalEntry" &&
            userId == $userId
          ]),
          "favoriteCount": count(*[
            _type == "wineFavorite" &&
            userId == $userId
          ]),
          "listCount": count(*[
            _type == "wineList" &&
            userId == $userId
          ]),
          "buyAgainCount": count(*[
            _type == "wineJournalEntry" &&
            userId == $userId &&
            buyAgain == true
          ])
        }`,
        { userId }
      )
    : {
        journalCount: 0,
        favoriteCount: 0,
        listCount: 0,
        buyAgainCount: 0,
      };

  const spaces = [
    {
      number: "01",
      kicker: "Mémoire",
      title: "Mon carnet",
      description:
        "Les vins réellement bus, ce que tu en as pensé et ceux que tu rachèterais.",
      href: "/mon-carnet",
      count: stats.journalCount,
      countLabel:
        stats.journalCount === 1 ? "vin dégusté" : "vins dégustés",
    },
    {
      number: "02",
      kicker: "Sélection",
      title: "Mes favoris",
      description:
        "Les bouteilles mises de côté au fil de tes découvertes.",
      href: "/favoris",
      count: stats.favoriteCount,
      countLabel:
        stats.favoriteCount === 1 ? "favori" : "favoris",
    },
    {
      number: "03",
      kicker: "Collections",
      title: "Mes listes",
      description:
        "Tes sélections personnelles pour organiser les bouteilles comme tu veux.",
      href: "/mes-listes",
      count: stats.listCount,
      countLabel:
        stats.listCount === 1 ? "liste" : "listes",
    },
    {
      number: "04",
      kicker: "Mon profil",
      title: "Mes préférences",
      description:
        "Quelques repères sur tes goûts, ton budget et les occasions pour lesquelles tu choisis du vin.",
      href: "/mes-preferences",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      {/* HERO */}
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-12 py-16 md:grid-cols-[1fr_0.42fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Mon espace
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(5rem,11vw,11rem)] leading-[0.8]">
              Ma cave.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-sm text-base leading-8 text-[var(--lpv-muted)]">
              Tes bouteilles, tes souvenirs et tes sélections réunis au même
              endroit.
            </p>

            {!userId ? (
              <Link
                href="/connexion"
                className="lpv-button lpv-button-dark mt-8"
              >
                Se connecter
              </Link>
            ) : (
              <Link
                href="/vins"
                className="lpv-text-link mt-7 inline-flex"
              >
                Explorer les vins <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      {userId ? (
        <section className="border-b border-[var(--lpv-line)]">
          <div className="lpv-container grid grid-cols-2 md:grid-cols-4">
            {[
              ["Bus", stats.journalCount],
              ["Aimés", stats.favoriteCount],
              ["Listes", stats.listCount],
              ["À racheter", stats.buyAgainCount],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`py-8 md:px-8 md:py-10 ${
                  index < 3
                    ? "border-b border-[var(--lpv-line)] md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  {label}
                </p>

                <p className="lpv-display mt-5 text-6xl leading-none md:text-7xl">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ESPACES */}
      <section className="lpv-container py-16 md:py-24">
        <div className="border-b border-[var(--lpv-line)] pb-7">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Personnel
          </p>

          <h2 className="lpv-display mt-5 text-5xl leading-[0.9] md:text-7xl">
            À moi.
          </h2>
        </div>

        <div>
          {spaces.map((space) => (
            <Link
              key={space.href}
              href={userId ? space.href : "/connexion"}
              className="group grid gap-6 border-b border-[var(--lpv-line)] py-10 transition-opacity hover:opacity-65 md:grid-cols-[70px_0.9fr_1.1fr_150px_30px] md:items-center md:py-12"
            >
              <span className="text-[0.62rem] tracking-[0.18em] text-[var(--lpv-muted)]">
                {space.number}
              </span>

              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  {space.kicker}
                </p>

                <h3 className="lpv-display mt-4 text-4xl leading-[0.9] md:text-5xl">
                  {space.title}
                </h3>
              </div>

              <p className="max-w-md text-sm leading-7 text-[var(--lpv-muted)]">
                {space.description}
              </p>

              {userId && "count" in space ? (
                <div className="md:text-right">
                  <p className="lpv-display text-4xl leading-none">
                    {space.count}
                  </p>

                  <p className="mt-2 text-[0.62rem] uppercase tracking-[0.15em] text-[var(--lpv-muted)]">
                    {space.countLabel}
                  </p>
                </div>
              ) : (
                <span />
              )}

              <span className="text-xl transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RAPPEL */}
      {userId && stats.journalCount > 0 ? (
        <section className="border-t border-[var(--lpv-line)]">
          <div className="lpv-container grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Dans mon carnet
              </p>

              <p className="lpv-display mt-4 text-4xl leading-[0.95] md:text-5xl">
                {stats.buyAgainCount > 0
                  ? `${stats.buyAgainCount} ${
                      stats.buyAgainCount === 1
                        ? "bouteille à racheter."
                        : "bouteilles à racheter."
                    }`
                  : "De nouvelles bouteilles à découvrir."}
              </p>
            </div>

            <Link href="/mon-carnet" className="lpv-text-link">
              Ouvrir mon carnet <span>→</span>
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
