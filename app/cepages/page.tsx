import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { grapesQuery } from "@/sanity/lib/queries";

type Grape = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
};

export default async function GrapesPage() {
  const grapes = await client.fetch<Grape[]>(grapesQuery);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Référentiel
      </p>

      <h1 className="mb-6 text-4xl font-serif">Cépages</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {grapes.map((grape) => (
          <Link
            key={grape._id}
            href={`/cepages/${grape.slug}`}
            className="rounded-2xl border border-neutral-200 p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">{grape.name}</h2>

            {grape.color && (
              <p className="mt-2 text-sm text-neutral-500">{grape.color}</p>
            )}

            {grape.description && (
              <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
                {grape.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
