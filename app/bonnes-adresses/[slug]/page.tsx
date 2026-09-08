import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { placeBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Place = {
  name: string;
  type?: string;
  city?: string;
  region?: string;
  address?: string;
  website?: string;
  coverImage?: SanityImageSource;
  description?: PortableTextBlock[];
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

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const place = await client.fetch<Place | null>(
    placeBySlugQuery,
    { slug }
  );

  if (!place) notFound();

  const imageSrc = place.coverImage
    ? urlFor(place.coverImage)
        .width(1600)
        .height(1900)
        .fit("crop")
        .url()
    : null;

  const facts = [
    ["Type", formatType(place.type)],
    ["Ville", place.city],
    ["Région", place.region],
    ["Adresse", place.address],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <article className="lpv-container pb-24">
        <div className="pt-8 md:pt-10">
          <Link href="/bonnes-adresses" className="lpv-text-link">
            <span>←</span> Retour aux bonnes adresses
          </Link>
        </div>

        <section className="grid gap-12 border-b border-[var(--lpv-line)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              {formatType(place.type)}
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.5rem,8vw,8.5rem)] leading-[0.84]">
              {place.name}
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[var(--lpv-muted)]">
              {[place.city, place.region]
                .filter(Boolean)
                .join(" · ") || "Adresse à découvrir"}
            </p>

            <div className="mt-10 flex flex-wrap gap-5 border-t border-[var(--lpv-line)] pt-7">
              {place.website ? (
                <a
                  href={place.website}
                  target="_blank"
                  rel="noreferrer"
                  className="lpv-text-link"
                >
                  Site web <span>↗</span>
                </a>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={place.name}
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

        {place.description?.length ? (
          <section className="grid gap-10 py-16 md:grid-cols-[0.38fr_0.62fr] md:py-24">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Le lieu
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
                Pourquoi y aller.
              </h2>
            </div>

            <div className="lpv-prose max-w-2xl">
              <PortableText value={place.description} />
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
