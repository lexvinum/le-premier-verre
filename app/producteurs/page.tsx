import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { producersQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Producer = {
  _id: string;
  name: string;
  slug: string;
  municipality?: string;
  oneLiner?: string;
  shortBio?: string;
  logo?: SanityImageSource;
  photo?: SanityImageSource;
  heroImage?: SanityImageSource;
  country?: {
    name?: string;
  };
  region?: {
    name?: string;
  };
};

export default async function ProducersPage() {
  const producers = await client.fetch<Producer[]>(producersQuery);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Répertoire
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Ceux qui
              <br />
              font le vin.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Des personnes, des gestes, des lieux et des façons de travailler
              qui donnent une identité aux bouteilles.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {producers.length} producteur
              {producers.length > 1 ? "s" : ""} dans la collection
            </p>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-6">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              À découvrir
            </p>

            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              Les domaines.
            </h2>
          </div>
        </div>

        {producers.length > 0 ? (
          <div className="grid md:grid-cols-2">
            {producers.map((producer, index) => {
              const image =
                producer.heroImage ||
                producer.photo ||
                producer.logo;

              const imageSrc = image
                ? urlFor(image)
                    .width(1100)
                    .height(1400)
                    .fit("crop")
                    .url()
                : null;

              const location = [
                producer.municipality,
                producer.region?.name,
                producer.country?.name,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <article
                  key={producer._id}
                  className={`group border-b border-[var(--lpv-line)] py-10 ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  <Link
                    href={`/producteurs/${producer.slug}`}
                    className="block"
                  >
                    <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={producer.name}
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
                        Producteur
                      </p>

                      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <Link href={`/producteurs/${producer.slug}`}>
                      <h2 className="lpv-display mt-5 text-[clamp(3.2rem,5vw,5.5rem)] leading-[0.9] transition-opacity group-hover:opacity-60">
                        {producer.name}
                      </h2>
                    </Link>

                    {location ? (
                      <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                        {location}
                      </p>
                    ) : null}

                    {producer.oneLiner || producer.shortBio ? (
                      <p className="mt-6 max-w-xl text-base leading-7 text-[var(--lpv-muted)]">
                        {producer.oneLiner || producer.shortBio}
                      </p>
                    ) : null}

                    <Link
                      href={`/producteurs/${producer.slug}`}
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
              Les portraits arrivent.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Les premiers producteurs seront ajoutés au fil des rencontres et
              des bouteilles découvertes.
            </p>

            <Link href="/vins" className="lpv-button mt-9">
              Explorer les vins
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
