import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { regionsQuery } from "@/sanity/lib/queries";

type Region = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  country?: {
    name: string;
    slug: string;
  };
};

export default async function RegionsPage() {
  const regions = await client.fetch<Region[]>(regionsQuery);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Référentiel
      </p>

      <h1 className="mb-6 text-4xl font-serif">Régions viticoles</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region._id}
            href={`/regions/${region.slug}`}
            className="rounded-2xl border border-neutral-200 p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">{region.name}</h2>

            {region.country?.name && (
              <p className="mt-2 text-sm text-neutral-500">
                {region.country.name}
              </p>
            )}

            {region.description && (
              <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
                {region.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
