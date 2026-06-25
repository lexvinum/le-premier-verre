import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Place = {
  name: string;
  type?: string;
  city?: string;
  region?: string;
  address?: string;
  website?: string;
  description?: PortableTextBlock[];
};

const placeQuery = `*[_type == "place" && slug.current == $slug && published == true][0] {
  name,
  type,
  city,
  region,
  address,
  website,
  description
}`;

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = await client.fetch<Place | null>(placeQuery, { slug });

  if (!place) notFound();

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <article className="mx-auto max-w-3xl">
        <Link href="/bonnes-adresses" className="text-sm text-[#d8c2b2]">
          ← Retour aux bonnes adresses
        </Link>

        <h1 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
          {place.name}
        </h1>

        <div className="mt-6 space-y-2 text-[#d7c2b5]">
          <p>{[place.type, place.city, place.region].filter(Boolean).join(" · ")}</p>
          {place.address ? <p>{place.address}</p> : null}
          {place.website ? (
            <a
              href={place.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-[#d8eadf]"
            >
              Site web →
            </a>
          ) : null}
        </div>

        <div className="mt-10 space-y-6 text-[1.03rem] leading-8 text-[#eadfd6]">
          {place.description ? <PortableText value={place.description} /> : null}
        </div>
      </article>
    </main>
  );
}