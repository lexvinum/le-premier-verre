import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { appellationBySlugQuery } from "@/sanity/lib/queries";

type LinkedItem = {
  _id?: string;
  name: string;
  slug: string;
};

type AppellationDetail = {
  _id: string;
  name: string;
  slug: string;
  description?: any[];
  country?: LinkedItem;
  region?: LinkedItem;
  grapes?: LinkedItem[];
  wines?: LinkedItem[];
  producers?: LinkedItem[];
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
    <main className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
        Appellation
      </p>

      <h1 className="mb-4 text-4xl font-serif">{appellation.name}</h1>

      <div className="mb-8 flex flex-wrap gap-3 text-sm text-neutral-500">
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

      {description && (
        <p className="mb-12 max-w-3xl whitespace-pre-line text-lg text-neutral-700">
          {description}
        </p>
      )}

      <Section title="Cépages associés" items={appellation.grapes} basePath="/cepages" />
      <Section title="Vins" items={appellation.wines} basePath="/vins" />
      <Section title="Producteurs" items={appellation.producers} basePath="/producteurs" />
    </main>
  );
}

function Section({
  title,
  items,
  basePath,
}: {
  title: string;
  items?: LinkedItem[];
  basePath: string;
}) {
  if (!items?.length) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-serif">{title}</h2>

      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item._id ?? item.slug}
            href={`${basePath}/${item.slug}`}
            className="rounded-xl border border-neutral-200 p-4 transition hover:bg-neutral-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
