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
  name: string;
  shortBio?: string;
  bio?: PortableTextBlock[];
  philosophy?: PortableTextBlock[];
  logo?: SanityImageSource;
  photo?: SanityImageSource;
  heroImage?: SanityImageSource;
  foundedYear?: number;
  founder?: string;
  currentOwner?: string;
  winemaker?: string;
  country?: {
    name?: string;
  };
  region?: {
    name?: string;
  };
  appellation?: {
    name?: string;
  };
  farmingPractices?: string[];
  certifications?: string[];
  signatureGrapes?: {
    name?: string;
  }[];
  signatureStyles?: string[];
  website?: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  phone?: string;
  wines?: {
    _id: string;
    name: string;
    slug: string;
    vintage?: number;
    color?: string;
    bottleImage?: SanityImageSource;
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
        .width(1400)
        .height(1800)
        .fit("crop")
        .url()
    : null;

  const facts = [
    ["Fondation", producer.foundedYear],
    ["Fondateur", producer.founder],
    ["Propriétaire", producer.currentOwner],
    ["Œnologue", producer.winemaker],
    ["Appellation", producer.appellation?.name],
  ].filter(([, value]) => Boolean(value)) as [
    string,
    string | number
  ][];

  const approach = [
    ...(producer.farmingPractices || []),
    ...(producer.certifications || []),
    ...(producer.signatureGrapes || [])
      .map((grape) => grape.name)
      .filter((name): name is string => Boolean(name)),
    ...(producer.signatureStyles || []),
  ];

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <article className="lpv-container pb-24">
        <div className="pt-8 md:pt-10">
          <Link href="/producteurs" className="lpv-text-link">
            <span>←</span> Retour aux producteurs
          </Link>
        </div>

        <section className="grid gap-12 border-b border-[var(--lpv-line)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              {[producer.region?.name, producer.country?.name]
                .filter(Boolean)
                .join(" · ") || "Producteur"}
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.5rem,8vw,8.5rem)] leading-[0.84]">
              {producer.name}
            </h1>

            {producer.shortBio ? (
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
                  Site web <span>↗</span>
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

              {producer.facebook ? (
                <a
                  href={producer.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="lpv-text-link"
                >
                  Facebook <span>↗</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={producer.name}
                className="min-h-[620px] w-full object-cover md:min-h-[780px]"
              />
            ) : (
              <div className="flex min-h-[620px] items-center justify-center">
                <p className="text-sm text-[var(--lpv-muted)]">
                  Photo à ajouter dans Sanity.
                </p>
              </div>
            )}
          </div>
        </section>

        {facts.length > 0 ? (
          <section className="grid gap-10 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.38fr_0.62fr] md:py-20">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Informations
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                En bref.
              </h2>
            </div>

            <dl className="border-b border-[var(--lpv-line)]">
              {facts.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 border-t border-[var(--lpv-line)] py-5 sm:grid-cols-[180px_1fr]"
                >
                  <dt className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
                    {label}
                  </dt>

                  <dd className="text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {producer.bio?.length ? (
          <section className="grid gap-10 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.38fr_0.62fr] md:py-24">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Le domaine
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                L’histoire.
              </h2>
            </div>

            <div className="lpv-prose max-w-2xl">
              <PortableText value={producer.bio} />
            </div>
          </section>
        ) : null}

        {producer.philosophy?.length ? (
          <section className="grid gap-10 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.38fr_0.62fr] md:py-24">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Le geste
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                La philosophie.
              </h2>
            </div>

            <div className="lpv-prose max-w-2xl">
              <PortableText value={producer.philosophy} />
            </div>
          </section>
        ) : null}

        {approach.length > 0 ? (
          <section className="grid gap-10 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.38fr_0.62fr] md:py-20">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Approche
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                Les signatures.
              </h2>
            </div>

            <div className="border-b border-[var(--lpv-line)]">
              {approach.map((item) => (
                <div
                  key={item}
                  className="border-t border-[var(--lpv-line)] py-5 text-xl"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {producer.wines?.length ? (
          <section className="border-b border-[var(--lpv-line)] py-16 md:py-24">
            <div className="flex items-end justify-between border-b border-[var(--lpv-line)] pb-6">
              <div>
                <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                  Les bouteilles
                </p>

                <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
                  Les vins.
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3">
              {producer.wines.map((wine, index) => {
                const bottleSrc = wine.bottleImage
                  ? urlFor(wine.bottleImage)
                      .width(700)
                      .height(1000)
                      .fit("max")
                      .url()
                  : null;

                return (
                  <Link
                    key={wine._id}
                    href={`/vins/${wine.slug}`}
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
                    <div className="flex min-h-[420px] items-center justify-center bg-[var(--lpv-paper-light)] p-10">
                      {bottleSrc ? (
                        <img
                          src={bottleSrc}
                          alt={wine.name}
                          className="max-h-[380px] max-w-full object-contain transition duration-700 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--lpv-muted)]">
                          Photo à venir
                        </p>
                      )}
                    </div>

                    <p className="lpv-kicker mt-7 text-[var(--lpv-cocoa)]">
                      {[wine.color, wine.vintage]
                        .filter(Boolean)
                        .join(" · ") || "Vin"}
                    </p>

                    <h3 className="lpv-display mt-5 text-4xl leading-[0.92] md:text-5xl">
                      {wine.name}
                    </h3>

                    <span className="lpv-text-link mt-7">
                      Voir la fiche <span>→</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

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
