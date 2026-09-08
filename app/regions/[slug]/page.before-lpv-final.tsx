import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { regionBySlugQuery } from "@/sanity/lib/queries";
import { EntitySection, type EntityItem } from "@/components/knowledge/entity-section";
import { KnowledgeLayout } from "@/components/knowledge/knowledge-layout";

type RegionDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  country?: {
    name: string;
    slug: string;
  };
  appellations?: EntityItem[];
  producers?: EntityItem[];
  vineyards?: EntityItem[];
  wines?: EntityItem[];
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
    <KnowledgeLayout
      breadcrumb={[
        { label: "Pays", href: "/pays" },
        ...(region.country?.slug
          ? [{ label: region.country.name, href: `/pays/${region.country.slug}` }]
          : []),
        { label: "Régions", href: "/regions" },
        { label: region.name },
      ]}
      eyebrow="Région viticole"
      title={region.name}
      description={region.description}
    >
      {region.country?.slug && (
        <Link
          href={`/pays/${region.country.slug}`}
          className="mb-10 inline-block text-sm text-neutral-500 underline"
        >
          {region.country.name}
        </Link>
      )}

      <EntitySection title="Appellations" items={region.appellations} basePath="/appellations" />
      <EntitySection title="Vignobles" items={region.vineyards} basePath="/vignobles" />
      <EntitySection title="Producteurs" items={region.producers} basePath="/producteurs" />
      <EntitySection title="Vins" items={region.wines} basePath="/vins" />
    </KnowledgeLayout>
  );
}
