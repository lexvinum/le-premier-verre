import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { grapesQuery } from "@/sanity/lib/queries";

type Grape = {
  _id: string;
  name: string;
  slug: string;
  color?: "red" | "white";
  oneLiner?: string;
  body?: number;
  acidity?: number;
  tannins?: number;
};

function colorLabel(color?: string) {
  if (color === "red") return "Rouge";
  if (color === "white") return "Blanc";
  return null;
}

function bodyLabel(body?: number) {
  if (!body) return null;
  if (body <= 2) return "Léger";
  if (body === 3) return "Moyen";
  return "Puissant";
}

export default async function GrapesPage() {
  const grapes = await client.fetch<Grape[]>(grapesQuery);

  return (
    <main className="bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="lpv-container border-b border-[var(--lpv-line)] py-16 md:py-24">
        <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[var(--lpv-muted)]">
          Référentiel
        </p>

        <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-end">
          <div>
            <h1 className="lpv-display text-6xl leading-[0.92] sm:text-7xl md:text-8xl">
              Cépages
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--lpv-muted)]">
              Comprendre rapidement ce qu’un cépage apporte dans le verre :
              son style, ses arômes, sa structure et les bouteilles où le découvrir.
            </p>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-5 md:border-t-0 md:border-l md:pl-8 md:pt-0">
            <p className="text-sm leading-6 text-[var(--lpv-muted)]">
              {grapes.length} cépage{grapes.length > 1 ? "s" : ""} dans le répertoire
            </p>
          </div>
        </div>
      </section>

      <section className="lpv-container py-10 md:py-16">
        {grapes.length ? (
          <div className="border-t border-[var(--lpv-line)]">
            {grapes.map((grape, index) => {
              const grapeColor = colorLabel(grape.color);
              const grapeBody = bodyLabel(grape.body);

              return (
                <Link
                  key={grape._id}
                  href={`/cepages/${grape.slug}`}
                  className="group grid gap-5 border-b border-[var(--lpv-line)] py-7 transition-opacity hover:opacity-70 md:grid-cols-[70px_1fr_1fr_auto] md:items-center md:py-8"
                >
                  <span className="text-xs tabular-nums text-[var(--lpv-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="lpv-display text-4xl leading-none sm:text-5xl">
                      {grape.name}
                    </h2>

                    {(grapeColor || grapeBody) && (
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--lpv-muted)]">
                        {[grapeColor, grapeBody].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>

                  <div>
                    {grape.oneLiner ? (
                      <p className="max-w-xl text-sm leading-6 text-[var(--lpv-muted)] md:text-base">
                        {grape.oneLiner}
                      </p>
                    ) : (
                      <p className="text-sm italic text-[var(--lpv-muted)]">
                        Fiche à compléter
                      </p>
                    )}
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-2xl transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="border-y border-[var(--lpv-line)] py-14">
            <p className="text-[var(--lpv-muted)]">
              Aucun cépage n’est encore disponible.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
