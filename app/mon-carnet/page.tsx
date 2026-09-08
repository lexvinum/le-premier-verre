import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type JournalEntry = {
  _id: string;
  tastedAt: string;
  appreciation: "liked" | "average" | "disliked";
  note?: string;
  buyAgain: boolean;
  wine?: {
    _id: string;
    name?: string;
    slug?: string;
    vintage?: number;
    color?: string;
    bottleImage?: SanityImageSource;
    producer?: {
      name?: string;
    };
  };
};

const appreciationLabels: Record<JournalEntry["appreciation"], string> = {
  liked: "Aimé",
  average: "Moyen",
  disliked: "Pas aimé",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function MonCarnetPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
        <section className="border-b border-[var(--lpv-line)]">
          <div className="lpv-container py-20 md:py-28">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Mon espace
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Mon carnet
              <br />
              de vin.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Les bouteilles bues. Les impressions qu’on veut garder.
            </p>
          </div>
        </section>

        <section className="lpv-container py-24 text-center">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Connexion requise
          </p>

          <h2 className="lpv-display mt-6 text-5xl md:text-7xl">
            Ton carnet t’attend.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
            Connecte-toi pour retrouver les bouteilles que tu as bues et les
            notes que tu veux garder.
          </p>

          <Link href="/connexion" className="lpv-button lpv-button-dark mt-9">
            Se connecter
          </Link>
        </section>
      </main>
    );
  }

  const entries = await client.fetch<JournalEntry[]>(
    `*[
      _type == "wineJournalEntry" &&
      userId == $userId
    ] | order(tastedAt desc, createdAt desc) {
      _id,
      tastedAt,
      appreciation,
      note,
      buyAgain,
      wine->{
        _id,
        name,
        "slug": slug.current,
        vintage,
        color,
        bottleImage,
        producer->{name}
      }
    }`,
    { userId }
  );

  const likedCount = entries.filter(
    (entry) => entry.appreciation === "liked"
  ).length;

  const buyAgainCount = entries.filter(
    (entry) => entry.buyAgain
  ).length;

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">

      {/* HERO */}
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-12 py-16 md:grid-cols-[1fr_0.42fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Mon espace
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.8rem,10vw,10rem)] leading-[0.8]">
              Mon carnet
              <br />
              de vin.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-sm text-base leading-8 text-[var(--lpv-muted)]">
              Les bouteilles bues. Les impressions qu’on veut garder.
              Rien de plus compliqué.
            </p>

            <Link
              href="/vins"
              className="lpv-text-link mt-7 inline-flex"
            >
              Ajouter une bouteille <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid md:grid-cols-3">
          {[
            ["Bouteilles bues", entries.length],
            ["Aimées", likedCount],
            ["À racheter", buyAgainCount],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`py-8 md:px-8 md:py-10 ${
                index < 2
                  ? "border-b border-[var(--lpv-line)] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex items-end justify-between gap-6">
                <p className="lpv-kicker pb-2 text-[var(--lpv-cocoa)]">
                  {label}
                </p>

                <p className="lpv-display text-6xl leading-none md:text-7xl">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARNET */}
      <section className="lpv-container py-16 md:py-24">
        <div className="border-b border-[var(--lpv-line)] pb-7">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Mon historique
          </p>

          <h2 className="lpv-display mt-5 text-5xl leading-[0.9] md:text-7xl">
            À retenir.
          </h2>
        </div>

        {entries.length > 0 ? (
          <div>
            {entries.map((entry, index) => {
              const wine = entry.wine;

              const imageSrc = wine?.bottleImage
                ? urlFor(wine.bottleImage)
                    .width(260)
                    .height(420)
                    .fit("max")
                    .url()
                : null;

              return (
                <article
                  key={entry._id}
                  className="grid gap-8 border-b border-[var(--lpv-line)] py-10 md:grid-cols-[45px_150px_1fr] md:gap-10 md:py-14"
                >
                  {/* NUMÉRO */}
                  <div>
                    <span className="text-[0.62rem] tracking-[0.18em] text-[var(--lpv-muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* BOUTEILLE */}
                  <Link
                    href={wine?.slug ? `/vins/${wine.slug}` : "/vins"}
                    className="flex h-48 items-center justify-center md:h-60"
                  >
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={wine?.name || "Bouteille de vin"}
                        className="h-full w-auto object-contain transition-transform duration-500 hover:-translate-y-1"
                      />
                    ) : (
                      <div className="h-full w-20 border border-[var(--lpv-line)]" />
                    )}
                  </Link>

                  {/* CONTENU */}
                  <div className="flex flex-col justify-between">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:gap-16">

                      {/* IDENTITÉ */}
                      <div>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                            {appreciationLabels[entry.appreciation]}
                          </p>

                          <span className="text-[var(--lpv-line)]">—</span>

                          <p className="text-xs uppercase tracking-[0.14em] text-[var(--lpv-muted)]">
                            {formatDate(entry.tastedAt)}
                          </p>
                        </div>

                        <Link
                          href={wine?.slug ? `/vins/${wine.slug}` : "/vins"}
                        >
                          <h3 className="lpv-display mt-5 text-5xl leading-[0.86] transition-opacity hover:opacity-60 md:text-6xl">
                            {wine?.name || "Vin"}
                          </h3>
                        </Link>

                        <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                          {[wine?.producer?.name, wine?.vintage]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>

                      {/* SOUVENIR */}
                      <div className="border-t border-[var(--lpv-line)] pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                        <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                          Ce que j’en retiens
                        </p>

                        <p className="mt-5 max-w-md text-base leading-7 text-[var(--lpv-ink)]">
                          {entry.note?.trim() || (
                            <span className="text-[var(--lpv-muted)]">
                              Aucune note pour cette bouteille.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* BAS */}
                    <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-[var(--lpv-line)] pt-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                        Rachèterais{" "}
                        <span className="ml-2 text-[var(--lpv-ink)]">
                          {entry.buyAgain ? "Oui" : "Non"}
                        </span>
                      </p>

                      <Link
                        href={wine?.slug ? `/vins/${wine.slug}` : "/vins"}
                        className="lpv-text-link"
                      >
                        Voir le vin <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Première bouteille
            </p>

            <h2 className="lpv-display mt-6 text-5xl md:text-7xl">
              Le carnet est encore vide.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Après avoir bu un vin, ajoute-le ici pour garder une trace de
              ce que tu en as pensé.
            </p>

            <Link href="/vins" className="lpv-button lpv-button-dark mt-9">
              Découvrir les vins
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
