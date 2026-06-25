import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { producersQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Producer = {
  _id: string;
  name: string;
  slug: string;
  country?: { name?: string };
  region?: { name?: string };
};

export default async function ProducersPage() {
  const producers = await client.fetch<Producer[]>(producersQuery);

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-24 text-[#f4ede5]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9ab3a1]">
          Répertoire
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Producteurs
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {producers.map((producer) => (
            <Link
              key={producer._id}
              href={`/producteurs/${producer.slug}`}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-[#6f8f7a]"
            >
              <h2 className="text-2xl font-semibold">{producer.name}</h2>

              <p className="mt-4 text-sm text-[#d5c0b3]">
                {[producer.region?.name, producer.country?.name]
                  .filter(Boolean)
                  .join(" · ")}
              </p>

              <p className="mt-6 text-sm text-[#d8eadf]">Découvrir →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
