import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { urlFor } from "@/sanity/lib/image";

type Props = {
  name: string;
  producer?: string;
  producerSlug?: string;
  country?: string;
  region?: string;
  appellation?: string;
  color?: string;
  vintage?: number;
  bottleImage?: SanityImageSource;
};

function formatLabel(value?: string) {
  if (!value) return null;

  const labels: Record<string, string> = {
    red: "Rouge",
    white: "Blanc",
    rose: "Rosé",
    orange: "Orange",
    sparkling: "Effervescent",
    fortified: "Fortifié",
  };

  return labels[value] || value.replace(/-/g, " ");
}

export default function WineHero({
  name,
  producer,
  producerSlug,
  country,
  region,
  appellation,
  color,
  vintage,
  bottleImage,
}: Props) {
  const imageSrc = bottleImage
    ? urlFor(bottleImage)
        .width(1200)
        .height(1600)
        .fit("max")
        .url()
    : null;

  return (
    <section className="border-b border-[var(--lpv-line)] pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            {[formatLabel(color), vintage].filter(Boolean).join(" · ") || "Vin"}
          </p>

          <h1 className="lpv-display mt-7 max-w-3xl text-[clamp(4.2rem,8vw,8rem)] leading-[0.84]">
            {name}
          </h1>

          {producer ? (
            producerSlug ? (
              <Link
                href={`/producteurs/${producerSlug}`}
                className="lpv-text-link mt-8 w-fit"
              >
                {producer} <span>→</span>
              </Link>
            ) : (
              <p className="mt-8 text-lg text-[var(--lpv-muted)]">
                {producer}
              </p>
            )
          ) : null}

          <div className="mt-10 border-t border-[var(--lpv-line)] pt-6">
            <p className="max-w-md text-sm leading-7 text-[var(--lpv-muted)]">
              {[appellation, region, country]
                .filter(Boolean)
                .join(" · ") || "Origine à compléter"}
            </p>
          </div>
        </div>

        <div className="flex min-h-[620px] items-center justify-center bg-[var(--lpv-paper-light)] px-8 py-12 md:min-h-[760px] md:px-16">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={name}
              className="max-h-[660px] max-w-full object-contain"
            />
          ) : (
            <p className="text-sm text-[var(--lpv-muted)]">
              Photo à ajouter dans Sanity.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
