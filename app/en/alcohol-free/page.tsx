import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import BottleStage from "@/components/wine/BottleStage";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export const metadata = {
  title: "Alcohol-free | Le Premier Verre",
  description:
    "A selection of alcohol-free wines and ciders chosen for their taste, balance and place at the table.",
  alternates: {
    canonical: "/en/alcohol-free",
    languages: {
      "fr-CA": "/sans-alcool",
      "en-CA": "/en/alcohol-free",
      "x-default": "/sans-alcool",
    },
  },
};

type AlcoholFreeBottle = {
  _id: string;
  name: string;
  slug: string;
  vintage?: number;
  beverageType?: "wine" | "cider";
  color?: string;
  bottleImage?: SanityImageSource;
  producer?: { name?: string };
  region?: { name?: string };
  country?: { name?: string };
};

const alcoholFreeQuery = `*[
  _type == "wine" &&
  alcoholFree == true &&
  published == true &&
  !(_id in path("drafts.**"))
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  vintage,
  beverageType,
  color,
  bottleImage,
  producer->{name},
  region->{name},
  country->{name}
}`;

function formatColor(value?: string) {
  const labels: Record<string, string> = {
    red: "Red",
    white: "White",
    rose: "Rosé",
    orange: "Orange",
    sparkling: "Sparkling",
    fortified: "Fortified",
  };

  return value ? labels[value] || value : null;
}

export default async function AlcoholFreePage() {
  const bottles = await client.fetch<AlcoholFreeBottle[]>(alcoholFreeQuery);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container py-16 md:py-24">
          <Link
            href="/en/wines"
            className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--lpv-muted)] transition-opacity hover:opacity-50"
          >
            ← Bottles
          </Link>

          <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-[0.62fr_0.38fr] md:items-end">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Alcohol-free
              </p>

              <h1 className="lpv-display mt-7 max-w-4xl text-[clamp(4rem,9vw,8.5rem)] leading-[0.86]">
                What’s in
                <br />
                the glass.
              </h1>
            </div>

            <div className="max-w-md space-y-6 text-base leading-8 text-[var(--lpv-muted)]">
              <p>
                What we love in a bottle goes well beyond alcohol. There is
                taste, texture, balance, craft, place and the people behind
                what we drink.
              </p>

              <p>
                Alcohol-free becomes much more interesting when we stop asking
                it to be a substitute. Some bottles are simply good, precise
                and thoughtfully made — and deserve a place at the table.
              </p>

              <p className="text-[var(--lpv-ink)]">
                These are the ones we want to drink.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lpv-container py-16 md:py-24">
        <div className="flex items-end justify-between gap-8 border-b border-[var(--lpv-line)] pb-6">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              The selection
            </p>
            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              Worth drinking.
            </h2>
          </div>

          {bottles.length > 0 ? (
            <p className="hidden text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)] sm:block">
              {bottles.length} bottle{bottles.length > 1 ? "s" : ""}
            </p>
          ) : null}
        </div>

        {bottles.length > 0 ? (
          <div className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12">
            {bottles.map((bottle) => {
              const location = [bottle.region?.name, bottle.country?.name]
                .filter(Boolean)
                .join(" · ");

              return (
                <article
                  key={bottle._id}
                  className="group border-b border-[var(--lpv-line)] py-10"
                >
                  <Link href={`/en/wines/${bottle.slug}`} className="block">
                    <BottleStage
                      image={bottle.bottleImage}
                      alt={bottle.name}
                      color={bottle.beverageType === "cider" ? undefined : bottle.color}
                      variant="card"
                      className="transition duration-700 group-hover:scale-[1.025]"
                    />
                  </Link>

                  <div className="pt-7">
                    <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                      {[
                        bottle.beverageType === "cider"
                          ? "Cider"
                          : formatColor(bottle.color) || "Wine",
                        "Alcohol-free",
                      ].join(" · ")}
                    </p>

                    <Link href={`/en/wines/${bottle.slug}`} className="mt-5 block">
                      <h3 className="lpv-display text-4xl leading-[0.92] transition-opacity group-hover:opacity-60 md:text-5xl">
                        {bottle.name}
                      </h3>
                    </Link>

                    {bottle.producer?.name ? (
                      <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                        {bottle.producer.name}
                      </p>
                    ) : null}

                    {location ? (
                      <p className="mt-5 border-t border-[var(--lpv-line)] pt-5 text-xs leading-6 text-[var(--lpv-muted)]">
                        {location}
                      </p>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl py-16">
            <p className="text-base leading-8 text-[var(--lpv-muted)]">
              The selection arrive bientôt. On goûte, on choisit et on garde
              seulement les bouteilles qu’on aurait réellement envie de mettre
              sur la table.
            </p>
          </div>
        )}

        <div className="mt-12 border-t border-[var(--lpv-line)] pt-8">
          <Link href="/en/wines?type=alcohol-free" className="lpv-text-link">
            View all alcohol-free bottles <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
