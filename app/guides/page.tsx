import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { guidesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Guide = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: SanityImageSource;
  guideType?: string;
  difficulty?: string;
  estimatedReadingTime?: string;
};

function formatLabel(value?: string) {
  if (!value) return null;

  const labels: Record<string, string> = {
    beginner: "Débutant",
    buying: "Guide d’achat",
    region: "Régional",
    grape: "Cépage",
    pairing: "Accords",
    tasting: "Dégustation",
    travel: "Voyage",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
  };

  return labels[value] || value.replace(/[-_]/g, " ");
}

export default async function GuidesPage() {
  const guides = await client.fetch<Guide[]>(guidesQuery);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Comprendre
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Les guides.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Des repères simples pour mieux choisir, mieux goûter et mieux
              comprendre ce qu’il y a dans le verre.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {guides.length} guide{guides.length > 1 ? "s" : ""} publié
              {guides.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-6">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              À lire
            </p>

            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              Pour aller plus loin.
            </h2>
          </div>
        </div>

        {guides.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide, index) => {
              const imageSrc = guide.coverImage
                ? urlFor(guide.coverImage)
                    .width(1000)
                    .height(1200)
                    .fit("crop")
                    .url()
                : null;

              return (
                <article
                  key={guide._id}
                  className={`group border-b border-[var(--lpv-line)] py-10 ${
                    index % 3 !== 2
                      ? "xl:border-r xl:pr-10"
                      : "xl:pl-10"
                  } ${
                    index % 3 === 1
                      ? "xl:px-10"
                      : ""
                  }`}
                >
                  <Link href={`/guides/${guide.slug}`} className="block">
                    <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={guide.title}
                          className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                        />
                      ) : (
                        <div className="flex aspect-[4/5] items-center justify-center">
                          <p className="text-sm text-[var(--lpv-muted)]">
                            Image à venir
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="pt-7">
                    <div className="flex items-start justify-between gap-6">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {formatLabel(guide.guideType) || "Guide"}
                      </p>

                      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Link href={`/guides/${guide.slug}`}>
                      <h2 className="lpv-display mt-5 text-[clamp(3rem,4vw,4.8rem)] leading-[0.9] transition-opacity group-hover:opacity-60">
                        {guide.title}
                      </h2>
                    </Link>

                    <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-[var(--lpv-muted)]">
                      {guide.difficulty ? (
                        <span>{formatLabel(guide.difficulty)}</span>
                      ) : null}

                      {guide.estimatedReadingTime ? (
                        <span>· {guide.estimatedReadingTime}</span>
                      ) : null}
                    </div>

                    {guide.excerpt ? (
                      <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                        {guide.excerpt}
                      </p>
                    ) : null}

                    <Link
                      href={`/guides/${guide.slug}`}
                      className="lpv-text-link mt-8"
                    >
                      Lire le guide <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Bientôt
            </p>

            <h2 className="lpv-display mt-6 text-5xl md:text-7xl">
              Les premiers guides arrivent.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Les régions, les cépages, les accords et les bases du vin seront
              ajoutés progressivement.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
