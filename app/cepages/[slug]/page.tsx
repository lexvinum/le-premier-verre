import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { grapeBySlugQuery } from "@/sanity/lib/queries";

type LinkedItem = {
  _id: string;
  name: string;
  slug: string;
};

type GrapeDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  appellations?: LinkedItem[];
  wines?: LinkedItem[];
};

export default async function GrapePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const grape = await client.fetch<GrapeDetail | null>(grapeBySlugQuery, {
    slug,
  });

  if (!grape) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Cépage
      </p>

      <h1 className="mb-4 text-4xl font-serif">{grape.name}</h1>

      {grape.color && (
        <p className="mb-6 text-sm uppercase tracking-[0.2em] text-neutral-500">
          {grape.color}
        </p>
      )}

      {grape.description && (
        <p className="mb-12 max-w-3xl text-lg text-neutral-700">
          {grape.description}
        </p>
      )}

      <Section
        title="Appellations associées"
        items={grape.appellations}
        basePath="/appellations"
      />

      <Section title="Vins associés" items={grape.wines} basePath="/vins" />
    </main>
  );
}

function Section({
  title,
  items,
  basePath,
}: {
  title: string;
  items?: LinkedItem[];
  basePath: string;
}) {
  if (!items?.length) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-serif">{title}</h2>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item._id}
            href={`${basePath}/${item.slug}`}
            className="rounded-xl border border-neutral-200 p-4 transition hover:bg-neutral-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
