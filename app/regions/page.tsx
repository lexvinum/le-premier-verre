import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { regionsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Region = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  heroImage?: SanityImageSource;
  country?: {
    name?: string;
    slug?: string;
  };
};

export default async function RegionsPage() {
  const regions = await client.fetch<Region[]>(regionsQuery);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <div className="lpv-container pb-24 pt-10 md:pt-16">

        <section className="border-b border-[var(--lpv-line)] pb-14 md:pb-20">

          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Référentiel
          </p>

          <div className="mt-7 grid gap-10 lg:grid-cols-[0.7fr_0.3fr] lg:items-end">

            <h1 className="lpv-display text-[clamp(4.5rem,9vw,9rem)] leading-[0.84]">
              Régions
              <br />
              viticoles.
            </h1>

            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Des climats, des sols et des façons de faire qui donnent une
              identité aux vins. Explorez les régions suivies par Le Premier
              Verre, d’ici et d’ailleurs.
            </p>

          </div>
        </section>

        <section className="border-b border-[var(--lpv-line)]">

          <div className="grid md:grid-cols-2">

            {regions.map((region, index) => {
              const imageSrc = region.heroImage
                ? urlFor(region.heroImage)
                    .width(1200)
                    .fit("max")
                    .url()
                : null;

              return (
                <Link
                  key={region._id}
                  href={`/regions/${region.slug}`}
                  className={`group border-b border-[var(--lpv-line)] py-10 md:py-14 ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >

                  <div className="flex min-h-[320px] items-center justify-center overflow-hidden bg-[var(--lpv-paper-light)]">

                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={region.name}
                        className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="px-8 text-center">
                        <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                          {region.country?.name || "Région viticole"}
                        </p>

                        <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                          Photo à venir
                        </p>
                      </div>
                    )}

                  </div>

                  <div className="pt-7">

                    <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                      {region.country?.name || "Région viticole"}
                    </p>

                    <h2 className="lpv-display mt-5 text-5xl leading-[0.9] md:text-6xl">
                      {region.name}
                    </h2>

                    {region.description ? (
                      <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                        {region.description}
                      </p>
                    ) : null}

                    <span className="lpv-text-link mt-8">
                      Explorer <span>→</span>
                    </span>

                  </div>

                </Link>
              );
            })}

          </div>
        </section>

      </div>
    </main>
  );
}
