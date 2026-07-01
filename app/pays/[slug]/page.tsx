import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { countryBySlugQuery } from "@/sanity/lib/queries";
import { EntitySection, type EntityItem } from "@/components/knowledge/entity-section";
import { KnowledgeLayout } from "@/components/knowledge/knowledge-layout";
import { KnowledgeStats } from "@/components/knowledge/knowledge-stats";

type CountryDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string;

  regionCount: number;
  appellationCount: number;
  producerCount: number;
  vineyardCount: number;
  wineCount: number;

  regions?: EntityItem[];
  appellations?: EntityItem[];
  producers?: EntityItem[];
  vineyards?: EntityItem[];
  wines?: EntityItem[];
};

export default async function CountryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const country = await client.fetch<CountryDetail | null>(
    countryBySlugQuery,
    { slug }
  );

  if (!country) notFound();

  return (
    <KnowledgeLayout
      breadcrumb={[
        { label: "Pays", href: "/pays" },
        { label: country.name },
      ]}
      eyebrow="Pays viticole"
      title={country.name}
      description={country.description}
    >
      <KnowledgeStats
        stats={[
          { label: "Régions", value: country.regionCount },
          { label: "Appellations", value: country.appellationCount },
          { label: "Producteurs", value: country.producerCount },
          { label: "Vignobles", value: country.vineyardCount },
          { label: "Vins", value: country.wineCount },
        ]}
      />

      <EntitySection
        title="Régions"
        items={country.regions}
        basePath="/regions"
      />

      <EntitySection
        title="Appellations"
        items={country.appellations}
        basePath="/appellations"
      />

      <EntitySection
        title="Vignobles"
        items={country.vineyards}
        basePath="/vignobles"
      />

      <EntitySection
        title="Producteurs"
        items={country.producers}
        basePath="/producteurs"
      />

      <EntitySection
        title="Vins"
        items={country.wines}
        basePath="/vins"
      />
    </KnowledgeLayout>
  );
}
