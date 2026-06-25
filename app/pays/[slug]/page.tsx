import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { countryBySlugQuery } from "@/sanity/lib/queries";

type LinkedItem = {
  _id: string;
  name: string;
  slug: string;
};

type CountryDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  regions?: LinkedItem[];
  appellations?: LinkedItem[];
  producers?: LinkedItem[];
  vineyards?: LinkedItem[];
  wines?: LinkedItem[];
};

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = await client.fetch<CountryDetail | null>(countryBySlugQuery, {
    slug,
  });

  if (!country) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Pays viticole
      </p>

      <h1 className="mb-6 text-4xl font-serif">{country.name}</h1>

      {country.description && (
        <p className="mb-12 max-w-3xl text-lg text-neutral-700">
          {country.description}
        </p>
      )}

      <Section title="Régions" items={country.regions} basePath="/regions" />
      <Section
        title="Appellations"
        items={country.appellations}
        basePath="/appellations"
      />
      <Section
        title="Vignobles"
        items={country.vineyards}
        basePath="/vignobles"
      />
      <Section
        title="Producteurs"
        items={country.producers}
        basePath="/producteurs"
      />
      <Section title="Vins" items={country.wines} basePath="/vins" />
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
