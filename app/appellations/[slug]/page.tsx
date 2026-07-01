import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { appellationBySlugQuery } from "@/sanity/lib/queries";
import { EntitySection, type EntityItem } from "@/components/knowledge/entity-section";
import { KnowledgeLayout } from "@/components/knowledge/knowledge-layout";

type AppellationDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: any[];
  country?: EntityItem;
  region?: EntityItem;
  grapes?: EntityItem[];
  wines?: EntityItem[];
  producers?: EntityItem[];
};

function blocksToText(blocks: any[] = []) {
  return blocks
    .map((block) => block.children?.map((child: any) => child.text).join(""))
    .filter(Boolean)
    .join("\n\n");
}

export default async function AppellationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const appellation = await client.fetch<AppellationDetail | null>(
    appellationBySlugQuery,
    { slug }
  );

  if (!appellation) notFound();

  const description = blocksToText(appellation.description);

  return (
    <KnowledgeLayout
      breadcrumb={[
        { label: "Pays", href: "/pays" },
        ...(appellation.country?.slug
          ? [{ label: appellation.country.name, href: `/pays/${appellation.country.slug}` }]
          : []),
        ...(appellation.region?.slug
          ? [{ label: appellation.region.name, href: `/regions/${appellation.region.slug}` }]
          : []),
        { label: "Appellations", href: "/appellations" },
        { label: appellation.name },
      ]}
      eyebrow="Appellation"
      title={appellation.name}
      description={description}
    >
      <div className="mb-10 flex flex-wrap gap-3 text-sm text-neutral-500">
        {appellation.region?.slug && (
          <Link href={`/regions/${appellation.region.slug}`} className="underline">
            {appellation.region.name}
          </Link>
        )}

        {appellation.country?.slug && (
          <Link href={`/pays/${appellation.country.slug}`} className="underline">
            {appellation.country.name}
          </Link>
        )}
      </div>

      <EntitySection title="Cépages associés" items={appellation.grapes} basePath="/cepages" />
      <EntitySection title="Vins" items={appellation.wines} basePath="/vins" />
      <EntitySection title="Producteurs" items={appellation.producers} basePath="/producteurs" />
    </KnowledgeLayout>
  );
}
