import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { placesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Place = {
  _id: string;
  name: string;
  slug: string;
  type?: string;
  city?: string;
  region?: string;
  coverImage?: SanityImageSource;
};

function formatType(value?: string) {
  if (!value) return "Adresse";

  const labels: Record<string, string> = {
    restaurant: "Restaurant",
    "wine-bar": "Bar à vin",
    caviste: "Caviste",
    shop: "Boutique",
    other: "Adresse",
  };

  return labels[value] || value;
}

export default async function PlacesPage() {
  const places = await client.fetch<Place[]>(placesQuery);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Répertoire
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Les bonnes
              <br />
              adresses.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Restaurants, bars à vin, cavistes et endroits où l’on aime
              revenir pour bien boire.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {places.length} adresse{places.length > 1 ? "s" : ""} à découvrir
            </p>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-6">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Nos repères
            </p>

            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              Où aller.
            </h2>
          </div>
        </div>

        {places.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {places.map((place, index) => {
              const imageSrc = place.coverImage
                ? urlFor(place.coverImage)
                    .width(1000)
                    .height(1200)
                    .fit("crop")
                    .url()
                : null;

              const location = [place.city, place.region]
                .filter(Boolean)
                .join(" · ");

              return (
                <article
                  key={place._id}
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
                  <Link
                    href={`/bonnes-adresses/${place.slug}`}
                    className="block"
                  >
                    <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={place.name}
                          className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                        />
                      ) : (
                        <div className="flex aspect-[4/5] items-center justify-center">
                          <p className="text-sm text-[var(--lpv-muted)]">
                            Photo à venir
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="pt-7">
                    <div className="flex items-start justify-between gap-6">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {formatType(place.type)}
                      </p>

                      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Link href={`/bonnes-adresses/${place.slug}`}>
                      <h2 className="lpv-display mt-5 text-[clamp(3rem,4vw,4.8rem)] leading-[0.9] transition-opacity group-hover:opacity-60">
                        {place.name}
                      </h2>
                    </Link>

                    {location ? (
                      <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                        {location}
                      </p>
                    ) : null}

                    <Link
                      href={`/bonnes-adresses/${place.slug}`}
                      className="lpv-text-link mt-8"
                    >
                      Découvrir <span>→</span>
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
              Les premières adresses arrivent.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Notre sélection se construit au fil des découvertes et des
              endroits où l’on a envie de revenir.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
