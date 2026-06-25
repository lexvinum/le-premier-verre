import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Place = {
  _id: string;
  name: string;
  slug: string;
  type?: string;
  city?: string;
  region?: string;
};

const placesQuery = `*[_type == "place" && published == true] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  type,
  city,
  region
}`;

export default async function PlacesPage() {
  const places = await client.fetch<Place[]>(placesQuery);

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9ab3a1]">
          Répertoire
        </p>

        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Bonnes adresses
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {places.map((place) => (
            <Link
              key={place._id}
              href={`/bonnes-adresses/${place.slug}`}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-[#6f8f7a]"
            >
              <h2 className="text-2xl font-semibold">{place.name}</h2>

              <p className="mt-4 text-sm text-[#d5c0b3]">
                {[place.type, place.city, place.region].filter(Boolean).join(" · ")}
              </p>

              <p className="mt-6 text-sm text-[#d8eadf]">Découvrir →</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}