import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import FavoriteButton from "@/components/favorites/FavoriteButton";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { winesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type WineCard = {
  _id: string;
  name: string;
  slug: string;
  vintage?: number;
  color?: string;
  style?: string;
  bottleImage?: SanityImageSource;
  producer?: {
    name?: string;
    slug?: string;
  };
  country?: {
    name?: string;
    slug?: string;
  };
  region?: {
    name?: string;
    slug?: string;
  };
  appellation?: {
    name?: string;
    slug?: string;
  };
};

type SearchParams = Promise<{
  q?: string;
  color?: string;
  country?: string;
  region?: string;
}>;

function normalize(value?: string) {
  return value?.trim().toLocaleLowerCase("fr-CA") ?? "";
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
    dry: "Sec",
    "off-dry": "Demi-sec",
    sweet: "Doux",
    natural: "Nature",
    classic: "Classique",
  };

  return labels[value] || value.replace(/[-_]/g, " ");
}

export default async function VinsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const wines = await client.fetch<WineCard[]>(winesQuery);

  const query = normalize(params.q);
  const selectedColor = params.color ?? "";
  const selectedCountry = params.country ?? "";
  const selectedRegion = params.region ?? "";

  const colors = [
    ...new Set(
      wines
        .map((wine) => wine.color)
        .filter((value): value is string => Boolean(value))
    ),
  ].sort();

  const countries = [
    ...new Set(
      wines
        .map((wine) => wine.country?.name)
        .filter((value): value is string => Boolean(value))
    ),
  ].sort();

  const regions = [
    ...new Set(
      wines
        .map((wine) => wine.region?.name)
        .filter((value): value is string => Boolean(value))
    ),
  ].sort();

  const filteredWines = wines.filter((wine) => {
    const searchableText = normalize(
      [
        wine.name,
        wine.producer?.name,
        wine.country?.name,
        wine.region?.name,
        wine.appellation?.name,
        wine.color,
        wine.style,
      ]
        .filter(Boolean)
        .join(" ")
    );

    return (
      (!query || searchableText.includes(query)) &&
      (!selectedColor || wine.color === selectedColor) &&
      (!selectedCountry || wine.country?.name === selectedCountry) &&
      (!selectedRegion || wine.region?.name === selectedRegion)
    );
  });

  const hasFilters = Boolean(
    query ||
      selectedColor ||
      selectedCountry ||
      selectedRegion
  );

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      {/* INTRO */}
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Répertoire
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Les vins de
              <br />
              la bibliothèque.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Une sélection de bouteilles à découvrir, à garder sous la main
              et à ouvrir au bon moment.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {wines.length} vin{wines.length > 1 ? "s" : ""} dans la collection
            </p>
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section className="border-b border-[var(--lpv-line)]">
        <form
          method="GET"
          className="lpv-container py-8 md:py-10"
        >
          <div className="grid gap-px bg-[var(--lpv-line)] md:grid-cols-2 xl:grid-cols-5">
            <label className="bg-[var(--lpv-paper)] p-4 xl:col-span-2">
              <span className="mb-3 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
                Rechercher
              </span>

              <input
                type="search"
                name="q"
                defaultValue={params.q ?? ""}
                placeholder="Vin, producteur, région…"
                className="w-full border-0 bg-transparent py-1 text-base outline-none placeholder:text-[var(--lpv-muted)]/55"
              />
            </label>

            <label className="bg-[var(--lpv-paper)] p-4">
              <span className="mb-3 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
                Couleur
              </span>

              <select
                name="color"
                defaultValue={selectedColor}
                className="w-full appearance-none border-0 bg-transparent py-1 text-base outline-none"
              >
                <option value="">Toutes</option>

                {colors.map((color) => (
                  <option key={color} value={color}>
                    {formatLabel(color)}
                  </option>
                ))}
              </select>
            </label>

            <label className="bg-[var(--lpv-paper)] p-4">
              <span className="mb-3 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
                Pays
              </span>

              <select
                name="country"
                defaultValue={selectedCountry}
                className="w-full appearance-none border-0 bg-transparent py-1 text-base outline-none"
              >
                <option value="">Tous</option>

                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <label className="bg-[var(--lpv-paper)] p-4">
              <span className="mb-3 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
                Région
              </span>

              <select
                name="region"
                defaultValue={selectedRegion}
                className="w-full appearance-none border-0 bg-transparent py-1 text-base outline-none"
              >
                <option value="">Toutes</option>

                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5">
            <button type="submit" className="lpv-button lpv-button-dark">
              Appliquer les filtres
            </button>

            {hasFilters ? (
              <Link href="/vins" className="lpv-text-link">
                Réinitialiser
              </Link>
            ) : null}
          </div>
        </form>
      </section>

      {/* CATALOGUE */}
      <section className="lpv-container py-16 md:py-24">
        <div className="flex flex-col gap-5 border-b border-[var(--lpv-line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Catalogue
            </p>

            <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
              À ouvrir.
            </h2>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-[var(--lpv-muted)]">
            {filteredWines.length} résultat
            {filteredWines.length > 1 ? "s" : ""}
          </p>
        </div>

        {filteredWines.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {filteredWines.map((wine, index) => {
              const imageSrc = wine.bottleImage
                ? urlFor(wine.bottleImage)
                    .width(800)
                    .fit("max")
                    .url()
                : null;

              const location = [
                wine.region?.name,
                wine.country?.name,
              ]
                .filter(Boolean)
                .join(" · ");

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
                  } md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:pr-8 md:[&:nth-child(even)]:pl-8 xl:[&:nth-child(odd)]:border-r-0 xl:[&:nth-child(even)]:pl-0`
                  }
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
                          className="h-auto max-h-[300px] w-auto max-w-[65%] object-contain transition duration-700 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--lpv-muted)]">
                          Photo à venir
                        </p>
                      )}
                    </Link>

                    <div className="absolute right-4 top-4">
                      <FavoriteButton
                        wineId={wine._id}
                        size="sm"
                      />
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
                      <h3 className="lpv-display mt-5 text-4xl leading-[0.92] transition-opacity group-hover:opacity-60 md:text-5xl">
                        {wine.name}
                      </h3>
                    </Link>

                    {wine.producer?.name ? (
                      wine.producer.slug ? (
                        <Link
                          href={`/producteurs/${wine.producer.slug}`}
                          className="mt-5 block w-fit text-sm text-[var(--lpv-muted)] transition-opacity hover:opacity-50"
                        >
                          {wine.producer.name}
                        </Link>
                      ) : (
                        <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                          {wine.producer.name}
                        </p>
                      )
                    ) : null}

                    <div className="mt-7 flex items-end justify-between gap-6 border-t border-[var(--lpv-line)] pt-5">
                      <div>
                        {location ? (
                          <p className="text-xs leading-6 text-[var(--lpv-muted)]">
                            {location}
                          </p>
                        ) : null}

                        {wine.appellation?.name ? (
                          <p className="text-xs leading-6 text-[var(--lpv-muted)]">
                            {wine.appellation.name}
                          </p>
                        ) : null}
                      </div>

                      <Link
                        href={`/vins/${wine.slug}`}
                        className="lpv-text-link shrink-0"
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
          <div className="py-20 text-center">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Aucun résultat
            </p>

            <h2 className="lpv-display mt-6 text-5xl">
              Rien pour le moment.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
              Essaie une autre recherche ou retire certains filtres.
            </p>

            <Link
              href="/vins"
              className="lpv-button mt-8"
            >
              Voir tous les vins
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
