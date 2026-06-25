import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { appellationsQuery } from "@/sanity/lib/queries";

type Appellation = {
  _id: string;
  name: string;
  slug: string;
  country?: {
    name: string;
    slug: string;
  };
  region?: {
    name: string;
    slug: string;
  };
};

export default async function AppellationsPage() {
  const appellations = await client.fetch<Appellation[]>(appellationsQuery);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Référentiel
      </p>

      <h1 className="mb-6 text-4xl font-serif">
        Appellations viticoles
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        {appellations.map((appellation) => (
          <Link
            key={appellation._id}
            href={`/appellations/${appellation.slug}`}
            className="rounded-2xl border border-neutral-200 p-6 transition hover:bg-neutral-50"
          >
            <h2 className="text-xl font-semibold">
              {appellation.name}
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              {[
                appellation.region?.name,
                appellation.country?.name,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}