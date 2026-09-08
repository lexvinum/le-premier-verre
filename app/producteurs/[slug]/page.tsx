import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { producerBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Producer = {
  _id: string;
  name: string;
  slug: string;

  municipality?: string;

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

  logo?: SanityImageSource;
  photo?: SanityImageSource;
  heroImage?: SanityImageSource;

  oneLiner?: string;
  shortBio?: string;
  bio?: PortableTextBlock[];

  approach?: {
    _key?: string;
    title?: string;
    text?: string;
  }[];

  signatureGrapes?: {
    _id?: string;
    name?: string;
    slug?: string;
  }[];

  whyWeFollow?: string;

  openToVisitors?: boolean;
  visitDetails?: string;
  address?: string;
  reservationRequired?: boolean;
  website?: string;

  instagram?: string;
  facebook?: string;

  wines?: {
    _id: string;
    name: string;
    slug: string;
    vintage?: number;
    color?: string;
    bottleImage?: SanityImageSource;
    approxPrice?: number;
  }[];

  articles?: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
  }[];

  guides?: {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
  }[];
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

export default async function ProducerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const producer = await client.fetch<Producer | null>(
    producerBySlugQuery,
    { slug }
  );

  if (!producer) notFound();

  const image =
    producer.heroImage ||
    producer.photo ||
    producer.logo;

  const imageSrc = image
    ? urlFor(image)
        .width(1600)
        .fit("max")
        .url()
    : null;

  const location = [
    producer.municipality,
    producer.region?.name,
    producer.country?.name,
  ]
    .filter(Boolean)
    .join(" · ");

  const hasVisitInformation =
    producer.openToVisitors !== undefined ||
    Boolean(producer.address) ||
    Boolean(producer.visitDetails) ||
    Boolean(producer.website);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <article className="lpv-container pb-24">

        <div className="pt-8 md:pt-10">
          <Link href="/producteurs" className="lpv-text-link">
            <span>←</span> Retour aux producteurs
          </Link>
        </div>

        {/* HERO */}

        <section className="grid gap-12 border-b border-[var(--lpv-line)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[0.82fr_1.18fr]">

          <div className="lg:sticky lg:top-24 lg:self-start">

            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              {location || "Producteur"}
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.5rem,8vw,8.5rem)] leading-[0.84]">
              {producer.name}
            </h1>

            {producer.oneLiner ? (
              <p className="mt-10 max-w-xl text-[clamp(1.7rem,3vw,2.7rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                {producer.oneLiner}
              </p>
            ) : producer.shortBio ? (
              <p className="mt-8 max-w-lg text-lg leading-8 text-[var(--lpv-muted)]">
                {producer.shortBio}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-5 border-t border-[var(--lpv-line)] pt-7">

              {producer.website ? (
                <a
                  href={producer.website}
                  target="_blank"
                  rel="noreferrer"
                  className="lpv-text-link"
                >
                  Site officiel <span>↗</span>
                </a>
              ) : null}

              {producer.instagram ? (
                <a
                  href={producer.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="lpv-text-link"
                >
                  Instagram <span>↗</span>
                </a>
              ) : null}

            </div>
          </div>

          <div className="flex min-h-[580px] items-center justify-center overflow-hidden bg-[var(--lpv-paper-light)] md:min-h-[760px]">

            {imageSrc ? (
              <img
                src={imageSrc}
                alt={producer.name}
                className="h-full max-h-[820px] w-full object-cover"
              />
            ) : (
              <p className="text-sm text-[var(--lpv-muted)]">
                Photo à ajouter dans Sanity.
              </p>
            )}

          </div>
        </section>

        {/* QUI SONT-ILS */}

        {producer.bio?.length ? (
          <section className="grid gap-12 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.34fr_0.66fr] md:py-24">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Le domaine
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                Qui sont-ils?
              </h2>
            </div>

            <div className="lpv-prose max-w-3xl text-lg leading-9">
              <PortableText value={producer.bio} />
            </div>

          </section>
        ) : null}

        {/* APPROCHE */}

        {producer.approach?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="border-b border-[var(--lpv-line)] pb-7">

              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Leur approche
              </p>

              <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                Ce qui les distingue.
              </h2>

            </div>

            <div className="grid md:grid-cols-3">

              {producer.approach.map((item, index) => (
                <div
                  key={item._key || `${item.title}-${index}`}
                  className={`py-10 md:py-14 ${
                    index < producer.approach!.length - 1
                      ? "border-b border-[var(--lpv-line)] md:border-b-0 md:border-r md:pr-10"
                      : ""
                  } ${
                    index > 0 ? "md:pl-10" : ""
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
                    <p className="mt-5 max-w-md text-sm leading-7 text-[var(--lpv-muted)]">
                      {item.text}
                    </p>
                  ) : null}
                </div>
              ))}

            </div>
          </section>
        ) : null}

        {/* CÉPAGES */}

        {producer.signatureGrapes?.length ? (
          <section className="grid gap-12 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.34fr_0.66fr] md:py-20">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Dans les vignes
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                Ce qu’ils cultivent.
              </h2>
            </div>

            <div className="border-b border-[var(--lpv-line)]">

              {producer.signatureGrapes.map((grape) => (
                <div
                  key={grape._id || grape.name}
                  className="border-t border-[var(--lpv-line)] py-5 text-xl"
                >
                  {grape.name}
                </div>
              ))}

            </div>
          </section>
        ) : null}

        {/* POURQUOI ON LES SUIT */}

        {producer.whyWeFollow ? (
          <section className="grid gap-12 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.34fr_0.66fr] md:py-24">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Le Premier Verre
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                Pourquoi on les suit.
              </h2>
            </div>

            <p className="max-w-3xl text-[clamp(1.5rem,2.5vw,2.3rem)] leading-[1.3] tracking-[-0.025em]">
              {producer.whyWeFollow}
            </p>

          </section>
        ) : null}

        {/* À DÉCOUVRIR */}

        {producer.wines?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">

            <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-7">

              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  À découvrir
                </p>

                <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                  Leurs vins.
                </h2>
              </div>

              <Link href="/vins" className="lpv-text-link hidden sm:inline-flex">
                Tous les vins <span>→</span>
              </Link>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3">

              {producer.wines.map((wine, index) => {
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

        {/* VISITER */}

        {hasVisitInformation ? (
          <section className="grid gap-12 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.34fr_0.66fr] md:py-24">

            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Sur place
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
                Visiter.
              </h2>
            </div>

            <div className="border-b border-[var(--lpv-line)]">

              <div className="grid gap-3 border-t border-[var(--lpv-line)] py-5 sm:grid-cols-[190px_1fr]">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                  Visites
                </p>

                <p>
                  {producer.openToVisitors
                    ? "Oui"
                    : "Non ouvert au public"}
                </p>
              </div>

              {producer.address ? (
                <div className="grid gap-3 border-t border-[var(--lpv-line)] py-5 sm:grid-cols-[190px_1fr]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                    Adresse
                  </p>

                  <p>{producer.address}</p>
                </div>
              ) : null}

              {producer.openToVisitors &&
              producer.reservationRequired !== undefined ? (
                <div className="grid gap-3 border-t border-[var(--lpv-line)] py-5 sm:grid-cols-[190px_1fr]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                    Réservation
                  </p>

                  <p>
                    {producer.reservationRequired
                      ? "Requise"
                      : "Non requise"}
                  </p>
                </div>
              ) : null}

              {producer.visitDetails ? (
                <div className="grid gap-3 border-t border-[var(--lpv-line)] py-5 sm:grid-cols-[190px_1fr]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                    À savoir
                  </p>

                  <p className="max-w-xl leading-7 text-[var(--lpv-muted)]">
                    {producer.visitDetails}
                  </p>
                </div>
              ) : null}

              {producer.website ? (
                <div className="grid gap-3 border-t border-[var(--lpv-line)] py-5 sm:grid-cols-[190px_1fr]">
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                    En ligne
                  </p>

                  <a
                    href={producer.website}
                    target="_blank"
                    rel="noreferrer"
                    className="lpv-text-link w-fit"
                  >
                    Site officiel <span>↗</span>
                  </a>
                </div>
              ) : null}

            </div>
          </section>
        ) : null}

        {/* CONTENU ASSOCIÉ */}

        {producer.articles?.length || producer.guides?.length ? (
          <section className="py-16 md:py-24">

            <div className="border-b border-[var(--lpv-line)] pb-6">

              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Pour aller plus loin
              </p>

              <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                À lire.
              </h2>

            </div>

            <div className="grid md:grid-cols-2">

              {producer.articles?.map((article, index) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug}`}
                  className={`group border-b border-[var(--lpv-line)] py-10 ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                    Article
                  </p>

                  <h3 className="lpv-display mt-5 text-4xl leading-[0.92]">
                    {article.title}
                  </h3>

                  {article.excerpt ? (
                    <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                      {article.excerpt}
                    </p>
                  ) : null}

                  <span className="lpv-text-link mt-7">
                    Lire <span>→</span>
                  </span>
                </Link>
              ))}

              {producer.guides?.map((guide, index) => (
                <Link
                  key={guide._id}
                  href={`/guides/${guide.slug}`}
                  className={`group border-b border-[var(--lpv-line)] py-10 ${
                    index % 2 === 0
                      ? "md:border-r md:pr-10"
                      : "md:pl-10"
                  }`}
                >
                  <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                    Guide
                  </p>

                  <h3 className="lpv-display mt-5 text-4xl leading-[0.92]">
                    {guide.title}
                  </h3>

                  <span className="lpv-text-link mt-7">
                    Lire <span>→</span>
                  </span>
                </Link>
              ))}

            </div>
          </section>
        ) : null}

      </article>
    </main>
  );
}
