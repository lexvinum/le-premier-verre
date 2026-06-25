import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Vineyard = {
  _id: string;
  name: string;
  slug: string;
  city?: string;
  region?: string;
};

const vineyardsQuery = `*[_type == "vineyard" && published == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  city,
  region
}`;

export default async function VineyardsPage() {
  const vineyards = await client.fetch<Vineyard[]>(vineyardsQuery);

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9ab3a1]">
          Répertoire
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Vignobles
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vineyards.map((vineyard) => (
            <Link
              key={vineyard._id}
              href={`/vignobles/${vineyard.slug}`}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-[#6f8f7a]"
            >
              <h2 className="text-2xl font-semibold">{vineyard.name}</h2>

              <p className="mt-4 text-sm text-[#d5c0b3]">
                {[vineyard.city, vineyard.region].filter(Boolean).join(" · ")}
              </p>

              <p className="mt-6 text-sm text-[#d8eadf]">Découvrir →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}