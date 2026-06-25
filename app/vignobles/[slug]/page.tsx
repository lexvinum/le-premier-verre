import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Vineyard = {
  name: string;
  region?: string;
  city?: string;
  website?: string;
  description?: PortableTextBlock[];
};

const vineyardQuery = `*[_type == "vineyard" && slug.current == $slug && published == true][0] {
  name,
  region,
  city,
  website,
  description
}`;

export default async function VineyardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vineyard = await client.fetch<Vineyard | null>(vineyardQuery, { slug });

  if (!vineyard) notFound();

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <article className="mx-auto max-w-3xl">
        <Link href="/vignobles" className="text-sm text-[#d8c2b2]">
          ← Retour aux vignobles
        </Link>

        <h1 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
          {vineyard.name}
        </h1>

        <div className="mt-6 space-y-2 text-[#d7c2b5]">
          <p>{[vineyard.city, vineyard.region].filter(Boolean).join(" · ")}</p>

          {vineyard.website ? (
            <a
              href={vineyard.website}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-[#d8eadf]"
            >
              Site web →
            </a>
          ) : null}
        </div>

        <div className="mt-10 space-y-6 text-[1.03rem] leading-8 text-[#eadfd6]">
          {vineyard.description ? (
            <PortableText value={vineyard.description} />
          ) : null}
        </div>
      </article>
    </main>
  );
}