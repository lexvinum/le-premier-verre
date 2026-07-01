import { client } from "@/sanity/lib/client";
import { countriesQuery } from "@/sanity/lib/queries";
import { KnowledgeCard } from "@/components/knowledge/knowledge-card";

type Country = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
};

export default async function CountriesPage() {
  const countries = await client.fetch<Country[]>(countriesQuery);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Référentiel
      </p>

      <h1 className="mb-6 text-4xl font-serif">Pays viticoles</h1>

      <p className="mb-10 max-w-2xl text-neutral-600">
        Explorez les pays liés aux vins, régions, appellations, producteurs et
        vignobles du Premier Verre.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {countries.map((country) => (
          <KnowledgeCard
            key={country._id}
            href={`/pays/${country.slug}`}
            title={country.name}
            description={country.description}
          />
        ))}
      </div>
    </main>
  );
}
