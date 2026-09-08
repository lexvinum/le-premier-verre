import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import FavoriteButton from "@/components/favorites/FavoriteButton";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatPrice(value?: number) {
  if (typeof value !== "number") return null;

  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

function formatLabel(value?: string) {
  if (!value) return null;

  const labels: Record<string, string> = {
    red: "Rouge",
    white: "Blanc",
    rose: "Rosé",
    orange: "Orange",
    sparkling: "Effervescent",
    fortified: "Fortifié",
  };

  return labels[value] || value.replace(/[-_]/g, " ");
}

type FavoriteWine = {
  _id: string;
  slug: string;
  name: string;
  vintage?: number;
  color?: string;
  bottleImage?: SanityImageSource;
  approxPrice?: number;
  producer?: { name?: string };
  country?: { name?: string };
  region?: { name?: string };
};

export default async function FavoritesPage() {
  const { userId } = await auth();

  const orderedWines = userId
    ? await client.fetch<FavoriteWine[]>(
        `*[
          _type == "wineFavorite" &&
          userId == $userId &&
          defined(wine->slug.current) &&
          wine->published == true
        ] | order(createdAt desc) {
          "wine": wine->{
            _id,
            name,
            "slug": slug.current,
            vintage,
            color,
            bottleImage,
            approxPrice,
            producer->{name},
            country->{name},
            region->{name}
          }
        }.wine`,
        { userId }
      )
    : [];

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Collection personnelle
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Mes favoris.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Les bouteilles mises de côté au fil des découvertes.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {orderedWines.length} favori
              {orderedWines.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-6">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              À garder
            </p>

            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              Les bouteilles.
            </h2>
          </div>

          <Link href="/vins" className="lpv-text-link hidden sm:inline-flex">
            Explorer <span>→</span>
          </Link>
        </div>

        {orderedWines.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {orderedWines.map((wine, index) => {
              const imageSrc = wine.bottleImage
                ? urlFor(wine.bottleImage)
                    .width(800)
                    .height(1100)
                    .fit("max")
                    .url()
                : null;

              const price = wine.approxPrice;

              return (
                <article
                  key={wine._id}
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
                  <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden bg-[var(--lpv-paper-light)] px-8 py-10">
                    <Link
                      href={`/vins/${wine.slug}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={wine.name}
                          className="max-h-[390px] max-w-full object-contain transition duration-700 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--lpv-muted)]">
                          Photo à venir
                        </p>
                      )}
                    </Link>

                    <div className="absolute right-4 top-4">
                      <FavoriteButton wineId={wine._id} size="sm" />
                    </div>
                  </div>

                  <div className="pt-7">
                    <div className="flex items-start justify-between gap-6">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {[formatLabel(wine.color), wine.vintage]
                          .filter(Boolean)
                          .join(" · ") || "Vin"}
                      </p>

                      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Link href={`/vins/${wine.slug}`}>
                      <h2 className="lpv-display mt-5 text-4xl leading-[0.92] transition-opacity group-hover:opacity-60 md:text-5xl">
                        {wine.name}
                      </h2>
                    </Link>

                    {wine.producer?.name ? (
                      <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                        {wine.producer.name}
                      </p>
                    ) : null}

                    <div className="mt-7 flex items-end justify-between gap-6 border-t border-[var(--lpv-line)] pt-5">
                      <div>
                        <p className="text-xs leading-6 text-[var(--lpv-muted)]">
                          {[wine.region?.name, wine.country?.name]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>

                        {price ? (
                          <p className="mt-2 text-sm">
                            {formatPrice(price)}
                          </p>
                        ) : null}
                      </div>

                      <Link
                        href={`/vins/${wine.slug}`}
                        className="lpv-text-link"
                      >
                        Voir <span>→</span>
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
              Rien pour le moment
            </p>

            <h2 className="lpv-display mt-6 text-5xl md:text-7xl">
              Ta sélection est vide.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Ajoute des bouteilles depuis le répertoire ou une fiche vin.
            </p>

            <Link href="/vins" className="lpv-button lpv-button-dark mt-9">
              Explorer les vins
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
