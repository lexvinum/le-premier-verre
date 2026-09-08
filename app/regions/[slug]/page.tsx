import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { RegionMiniMap } from "@/components/knowledge/region-mini-map";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { regionBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type RegionDetail = {
  _id: string;
  name: string;
  slug: string;

  country?: {
    name?: string;
    slug?: string;
  };

  parentRegion?: {
    name?: string;
    slug?: string;
  };

  heroImage?: SanityImageSource;

  introduction?: PortableTextBlock[];
  locationText?: string;

  latitude?: number;
  longitude?: number;
  mapZoom?: number;
  mapPolygon?: {
    _key?: string;
    latitude: number;
    longitude: number;
  }[];

  climate?: string;

  signatureGrapes?: {
    _id?: string;
    name?: string;
    slug?: string;
  }[];

  characteristics?: {
    _key?: string;
    title?: string;
    text?: string;
  }[];

  producers?: {
    _id: string;
    name: string;
    slug: string;
    municipality?: string;
    oneLiner?: string;
    logo?: SanityImageSource;
    photo?: SanityImageSource;
    heroImage?: SanityImageSource;
  }[];

  wines?: {
    _id: string;
    name: string;
    slug: string;
    vintage?: number;
    color?: string;
    bottleImage?: SanityImageSource;
    approxPrice?: number;
    producer?: {
      name?: string;
      slug?: string;
    };
  }[];

  guides?: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    coverImage?: SanityImageSource;
  }[];

  appellations?: {
    _id: string;
    name: string;
    slug: string;
  }[];

  soilTypes?: string[];
  mainWineStyles?: string[];
};

function formatPrice(value?: number) {
  if (typeof value !== "number") return null;

  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

function formatColor(value?: string) {
  if (!value) return null;

  const labels: Record<string, string> = {
    red: "Rouge",
    white: "Blanc",
    rose: "Rosé",
    orange: "Orange",
    sparkling: "Effervescent",
    fortified: "Fortifié",
  };

  return labels[value] || value;
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const region = await client.fetch<RegionDetail | null>(
    regionBySlugQuery,
    { slug }
  );

  if (!region) notFound();

  const heroSrc = region.heroImage
    ? urlFor(region.heroImage)
        .width(1800)
        .fit("max")
        .url()
    : null;

  const locationLabel = [
    region.parentRegion?.name,
    region.country?.name,
  ]
    .filter(Boolean)
    .join(" · ");

  const hasCoordinates =
    typeof region.latitude === "number" &&
    typeof region.longitude === "number";

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <article className="lpv-container pb-24">

        <div className="pt-8 md:pt-10">
          <Link href="/regions" className="lpv-text-link">
            <span>←</span> Retour aux régions
          </Link>
        </div>

        {/* HERO */}

        <section className="grid gap-12 border-b border-[var(--lpv-line)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[0.82fr_1.18fr]">

          <div className="lg:sticky lg:top-24 lg:self-start">

            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              {locationLabel || "Région viticole"}
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.2rem,8vw,8.5rem)] leading-[0.84]">
              {region.name}
            </h1>

            {region.introduction?.length ? (
              <div className="lpv-prose mt-10 max-w-xl text-lg leading-8 text-[var(--lpv-muted)]">
                <PortableText value={region.introduction} />
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-5 border-t border-[var(--lpv-line)] pt-7">

              {region.country?.slug ? (
                <Link
                  href={`/pays/${region.country.slug}`}
                  className="lpv-text-link"
                >
                  {region.country.name} <span>→</span>
                </Link>
              ) : null}

              {region.parentRegion?.slug ? (
                <Link
                  href={`/regions/${region.parentRegion.slug}`}
                  className="lpv-text-link"
                >
                  {region.parentRegion.name} <span>→</span>
                </Link>
              ) : null}

            </div>
          </div>

          <div className="flex min-h-[520px] items-center justify-center overflow-hidden bg-[var(--lpv-paper-light)] md:min-h-[720px]">

            {heroSrc ? (
              <img
                src={heroSrc}
                alt={region.name}
                className="h-full max-h-[820px] w-full object-cover"
              />
            ) : (
              <div className="px-8 text-center">
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  {region.name}
                </p>
                <p className="mt-5 text-sm text-[var(--lpv-muted)]">
                  Photo de région à ajouter dans Sanity.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* LOCALISATION */}

        {(region.locationText || hasCoordinates) ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr]">

              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  Le territoire
                </p>

                <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                  Où sommes-nous?
                </h2>

                {region.locationText ? (
                  <p className="mt-8 max-w-md text-base leading-8 text-[var(--lpv-muted)]">
                    {region.locationText}
                  </p>
                ) : null}
              </div>

              {hasCoordinates ? (
                <RegionMiniMap
                  name={region.name}
                  latitude={region.latitude!}
                  longitude={region.longitude!}
                  zoom={region.mapZoom || 8}
                  polygon={region.mapPolygon}
                />
              ) : null}

            </div>
          </section>
        ) : null}

        {/* CLIMAT */}

        {region.climate ? (
          <section className="grid gap-12 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.34fr_0.66fr] md:py-24">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Dans les vignes
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                Le climat.
              </h2>
            </div>

            <p className="max-w-3xl text-[clamp(1.45rem,2.4vw,2.2rem)] leading-[1.3] tracking-[-0.025em]">
              {region.climate}
            </p>

          </section>
        ) : null}

        {/* CÉPAGES */}

        {region.signatureGrapes?.length ? (
          <section className="grid gap-12 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.34fr_0.66fr] md:py-20">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                À reconnaître
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                Les cépages.
              </h2>
            </div>

            <div className="border-b border-[var(--lpv-line)]">

              {region.signatureGrapes.map((grape) => (
                <div
                  key={grape._id || grape.name}
                  className="border-t border-[var(--lpv-line)] py-5"
                >
                  {grape.slug ? (
                    <Link
                      href={`/cepages/${grape.slug}`}
                      className="group flex items-center justify-between gap-6"
                    >
                      <span className="text-xl">
                        {grape.name}
                      </span>

                      <span className="lpv-text-link opacity-60 transition group-hover:opacity-100">
                        Voir <span>→</span>
                      </span>
                    </Link>
                  ) : (
                    <span className="text-xl">
                      {grape.name}
                    </span>
                  )}
                </div>
              ))}

            </div>
          </section>
        ) : null}

        {/* CARACTÉRISTIQUES */}

        {region.characteristics?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="border-b border-[var(--lpv-line)] pb-7">

              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                En bref
              </p>

              <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                Ce qu’il faut savoir.
              </h2>

            </div>

            <div className="grid md:grid-cols-2">

              {region.characteristics.map((item, index) => (
                <div
                  key={item._key || `${item.title}-${index}`}
                  className={`border-b border-[var(--lpv-line)] py-10 md:py-14 ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  <span className="text-[0.65rem] tracking-[0.18em] text-[var(--lpv-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.title ? (
                    <h3 className="mt-7 text-xl font-medium">
                      {item.title}
                    </h3>
                  ) : null}

                  {item.text ? (
                    <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                      {item.text}
                    </p>
                  ) : null}
                </div>
              ))}

            </div>
          </section>
        ) : null}

        {/* PRODUCTEURS */}

        {region.producers?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-7">

              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  Ceux qu’on suit
                </p>

                <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                  Les producteurs.
                </h2>
              </div>

              <Link
                href="/producteurs"
                className="lpv-text-link hidden sm:inline-flex"
              >
                Tous les producteurs <span>→</span>
              </Link>

            </div>

            <div className="grid md:grid-cols-2">

              {region.producers.map((producer, index) => {
                const producerImage =
                  producer.heroImage ||
                  producer.photo ||
                  producer.logo;

                const producerImageSrc = producerImage
                  ? urlFor(producerImage)
                      .width(1000)
                      .fit("max")
                      .url()
                  : null;

                return (
                  <Link
                    key={producer._id}
                    href={`/producteurs/${producer.slug}`}
                    className={`group border-b border-[var(--lpv-line)] py-10 ${
                      index % 2 === 0
                        ? "md:border-r md:pr-10"
                        : "md:pl-10"
                    }`}
                  >
                    <div className="flex min-h-[340px] items-center justify-center overflow-hidden bg-[var(--lpv-paper-light)]">
                      {producerImageSrc ? (
                        <img
                          src={producerImageSrc}
                          alt={producer.name}
                          className="h-[340px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--lpv-muted)]">
                          Photo à venir
                        </p>
                      )}
                    </div>

                    <div className="pt-7">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {producer.municipality || region.name}
                      </p>

                      <h3 className="lpv-display mt-5 text-4xl leading-[0.92] md:text-5xl">
                        {producer.name}
                      </h3>

                      {producer.oneLiner ? (
                        <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                          {producer.oneLiner}
                        </p>
                      ) : null}

                      <span className="lpv-text-link mt-7">
                        Découvrir <span>→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}

            </div>
          </section>
        ) : null}

        {/* VINS */}

        {region.wines?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-7">

              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  À boire
                </p>

                <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                  Les vins.
                </h2>
              </div>

              <Link
                href="/vins"
                className="lpv-text-link hidden sm:inline-flex"
              >
                Tous les vins <span>→</span>
              </Link>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3">

              {region.wines.map((wine, index) => {
                const bottleSrc = wine.bottleImage
                  ? urlFor(wine.bottleImage)
                      .width(800)
                      .fit("max")
                      .url()
                  : null;

                const price = formatPrice(wine.approxPrice);

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

                    <Link
                      href={`/vins/${wine.slug}`}
                      className="flex min-h-[420px] items-center justify-center bg-[var(--lpv-paper-light)] p-12"
                    >
                      {bottleSrc ? (
                        <img
                          src={bottleSrc}
                          alt={wine.name}
                          className="h-auto max-h-[300px] w-auto max-w-[65%] object-contain transition duration-700 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--lpv-muted)]">
                          Photo à venir
                        </p>
                      )}
                    </Link>

                    <div className="pt-7">

                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {[formatColor(wine.color), wine.vintage]
                          .filter(Boolean)
                          .join(" · ") || "Vin"}
                      </p>

                      <Link href={`/vins/${wine.slug}`}>
                        <h3 className="lpv-display mt-5 text-4xl leading-[0.92] transition-opacity group-hover:opacity-60 md:text-5xl">
                          {wine.name}
                        </h3>
                      </Link>

                      {wine.producer?.name ? (
                        <p className="mt-4 text-sm text-[var(--lpv-muted)]">
                          {wine.producer.name}
                        </p>
                      ) : null}

                      <div className="mt-7 flex items-end justify-between gap-6 border-t border-[var(--lpv-line)] pt-5">

                        {price ? (
                          <p className="text-sm">
                            {price}
                          </p>
                        ) : (
                          <span />
                        )}

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
          </section>
        ) : null}

        {/* GUIDES */}

        {region.guides?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="border-b border-[var(--lpv-line)] pb-7">

              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Pour aller plus loin
              </p>

              <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                Les guides.
              </h2>

            </div>

            <div className="grid md:grid-cols-2">

              {region.guides.map((guide, index) => {
                const guideImageSrc = guide.coverImage
                  ? urlFor(guide.coverImage)
                      .width(1000)
                      .fit("max")
                      .url()
                  : null;

                return (
                  <Link
                    key={guide._id}
                    href={`/guides/${guide.slug}`}
                    className={`group border-b border-[var(--lpv-line)] py-10 ${
                      index % 2 === 0
                        ? "md:border-r md:pr-10"
                        : "md:pl-10"
                    }`}
                  >
                    {guideImageSrc ? (
                      <div className="mb-7 overflow-hidden bg-[var(--lpv-paper-light)]">
                        <img
                          src={guideImageSrc}
                          alt={guide.title}
                          className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : null}

                    <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                      Guide
                    </p>

                    <h3 className="lpv-display mt-5 text-4xl leading-[0.92] md:text-5xl">
                      {guide.title}
                    </h3>

                    {guide.excerpt ? (
                      <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                        {guide.excerpt}
                      </p>
                    ) : null}

                    <span className="lpv-text-link mt-7">
                      Lire <span>→</span>
                    </span>
                  </Link>
                );
              })}

            </div>
          </section>
        ) : null}

        {/* EXPLORER */}

        <section className="py-16 md:py-24">

          <div className="grid gap-10 border-y border-[var(--lpv-line)] py-12 md:grid-cols-[1fr_auto] md:items-end md:py-16">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Continuer
              </p>

              <h2 className="lpv-display mt-5 max-w-4xl text-5xl leading-[0.9] md:text-7xl">
                Explorer la région.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--lpv-muted)]">
                Retrouvez les producteurs, les vins et les lieux qui donnent
                vie à {region.name}.
              </p>
            </div>

            <Link
              href={`/carte?region=${encodeURIComponent(region.slug)}`}
              className="lpv-text-link w-fit text-base"
            >
              Explorer la région <span>→</span>
            </Link>

          </div>
        </section>

      </article>
    </main>
  );
}
