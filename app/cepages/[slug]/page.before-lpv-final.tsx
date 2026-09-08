import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { grapeBySlugQuery } from "@/sanity/lib/queries";
import { EntitySection, type EntityItem } from "@/components/knowledge/entity-section";
import { KnowledgeLayout } from "@/components/knowledge/knowledge-layout";

type GrapeDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  appellations?: EntityItem[];
  wines?: EntityItem[];
};

export default async function GrapePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const grape = await client.fetch<GrapeDetail | null>(grapeBySlugQuery, {
    slug,
  });

  if (!grape) notFound();

  const description = [grape.color, grape.description].filter(Boolean).join(" · ");

  return (
    <KnowledgeLayout
      breadcrumb={[
        { label: "Cépages", href: "/cepages" },
        { label: grape.name },
      ]}
      eyebrow="Cépage"
      title={grape.name}
      description={description}
    >
      <EntitySection
        title="Appellations associées"
        items={grape.appellations}
        basePath="/appellations"
      />

      <EntitySection
        title="Vins associés"
        items={grape.wines}
        basePath="/vins"
      />
    </KnowledgeLayout>
  );
}
