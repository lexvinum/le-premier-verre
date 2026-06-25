import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { regionBySlugQuery } from "@/sanity/lib/queries";

type LinkedItem = {
  _id: string;
  name: string;
  slug: string;
};

type RegionDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  country?: {
    name: string;
    slug: string;
  };
  appellations?: LinkedItem[];
  producers?: LinkedItem[];
  vineyards?: LinkedItem[];
  wines?: LinkedItem[];
};

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = await client.fetch<RegionDetail | null>(regionBySlugQuery, {
    slug,
  });

  if (!region) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Région viticole
      </p>

      <h1 className="mb-4 text-4xl font-serif">{region.name}</h1>

      {region.country?.slug && (
        <Link
          href={`/pays/${region.country.slug}`}
          className="mb-8 inline-block text-sm text-neutral-500 underline"
        >
          {region.country.name}
        </Link>
      )}

      {region.description && (
        <p className="mb-12 max-w-3xl text-lg text-neutral-700">
          {region.description}
        </p>
      )}

      <Section
        title="Appellations"
        items={region.appellations}
        basePath="/appellations"
      />
      <Section
        title="Vignobles"
        items={region.vineyards}
        basePath="/vignobles"
      />
      <Section
        title="Producteurs"
        items={region.producers}
        basePath="/producteurs"
      />
      <Section title="Vins" items={region.wines} basePath="/vins" />
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
