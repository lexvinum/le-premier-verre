import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import FavoriteButton from "@/components/favorites/FavoriteButton";
import BottleStage from "@/components/wine/BottleStage";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { enforceAccountLanguage } from "@/lib/i18n/account-language";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatPrice(value?: number) {
  if (typeof value !== "number") return null;

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

function formatLabel(value?: string) {
  if (!value) return null;

  const labels: Record<string, string> = {
    red: "Red",
    white: "White",
    rose: "Rosé",
    orange: "Orange",
    sparkling: "Sparkling",
    fortified: "Fortified",
  };

  return labels[value] || value.replace(/[-_]/g, " ");
}

type FavoriteWine = {
  _id: string;
  slug: string;
  name: string;
  vintage?: number;
  beverageType?: "wine" | "cider";
  alcoholFree?: boolean;
  color?: string;
  bottleImage?: SanityImageSource;
  approxPrice?: number;
  producer?: { name?: string };
  country?: { name?: string; nameEn?: string };
  region?: { name?: string; nameEn?: string };
};

export default async function EnglishFavoritesPage() {
  const { userId } = await auth();

  if (userId) {
    await enforceAccountLanguage(userId, "en", "favorites");
  }

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
            beverageType,
            alcoholFree,
            color,
            bottleImage,
            approxPrice,
            producer->{name},
            country->{name, nameEn},
            region->{name, nameEn}
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
              Personal collection
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              My favourites.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              The bottles saved along the way.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {orderedWines.length} favourite{orderedWines.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-6">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Worth keeping
            </p>

            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              The bottles.
            </h2>
          </div>

          <Link href="/en/wines" className="lpv-text-link hidden sm:inline-flex">
            Explore <span>→</span>
          </Link>
        </div>

        {orderedWines.length > 0 ? (
          <div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12">
            {orderedWines.map((wine, index) => {
const price = wine.approxPrice;

              return (
                <article
                  key={wine._id}
                  className="group flex min-w-0 flex-col border-b border-[var(--lpv-line)] py-10"
                >
                  <div className="relative">
                    <Link
                      href={`/en/wines/${wine.slug}`}
                      className="block w-full"
                    >
                      <BottleStage
                        image={wine.bottleImage}
                        alt={wine.name ?? "Bottle"}
                        color={
                          wine.beverageType === "cider"
                            ? undefined
                            : wine.color ?? undefined
                        }
                        variant="card"
                        className="transition duration-700 group-hover:scale-[1.025]"
                      />
                    </Link>

                    <div className="absolute right-0 top-0 z-20">
                      <FavoriteButton wineId={wine._id} size="sm" />
                    </div>
                  </div>

                  <div className="pt-7">
                    <div className="flex items-start justify-between gap-6">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {[
                          wine.beverageType === "cider"
                            ? "Cider"
                            : formatLabel(wine.color) || "Wine",
                          wine.alcoholFree ? "Alcohol-free" : null,
                          wine.vintage,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>

                      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Link href={`/en/wines/${wine.slug}`}>
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
                          {[wine.region?.nameEn || wine.region?.name, wine.country?.nameEn || wine.country?.name]
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
                        href={`/en/wines/${wine.slug}`}
                        className="lpv-text-link"
                      >
                        View <span>→</span>
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
              Nothing yet
            </p>

            <h2 className="lpv-display mt-6 text-5xl md:text-7xl">
              Your selection is empty.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Save bottles from the directory or from any bottle page.
            </p>

            <Link href="/en/wines" className="lpv-button lpv-button-dark mt-9">
              Explore bottles
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
