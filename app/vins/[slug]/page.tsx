import Link from "next/link";
import { WineJournalButton } from "@/components/journal/WineJournalButton";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";
import { wineBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Wine = {
  name: string;
  vintage?: number;
  color?: string;
  style?: string;
  producer?: { name?: string; slug?: string };
  vineyard?: { name?: string; slug?: string };
  country?: { name?: string };
  region?: { name?: string };
  appellation?: { name?: string };
  grapes?: { name?: string }[];
  saqPrice?: number;
  domainPrice?: number;
  availableAtSaq?: boolean;
  availableAtDomain?: boolean;
  servingTemperature?: string;
  cellaringPotential?: string;
  alcohol?: number;
  sugar?: string;
  acidity?: number;
  body?: number;
  tannins?: number;
  isOrganic?: boolean;
  isNatural?: boolean;
  isBiodynamic?: boolean;
  isVegan?: boolean;
  foodPairings?: { _id: string; name: string; slug: string; category?: string }[];
  articles?: { _id: string; title: string; slug: string; excerpt?: string }[];
  tastingNotes?: PortableTextBlock[];
};

export default async function WinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wine = await client.fetch<Wine | null>(wineBySlugQuery, { slug });

  if (!wine) notFound();

  const badges = [
    wine.isOrganic ? "Bio" : null,
    wine.isNatural ? "Nature" : null,
    wine.isBiodynamic ? "Biodynamie" : null,
    wine.isVegan ? "Végan" : null,
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-24 text-[#f4ede5]">
      <article className="mx-auto max-w-5xl">
        <Link href="/vins" className="text-sm text-[#d8c2b2]">
          ← Retour aux vins
        </Link>

        <h1 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
          {wine.name}
        </h1>

        <p className="mt-6 text-[#d7c2b5]">
          {[wine.vintage, wine.color, wine.style, wine.region?.name]
            .filter(Boolean)
            .join(" · ")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {wine.producer?.slug ? (
            <Link href={`/producteurs/${wine.producer.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm">
              Producteur : {wine.producer.name}
            </Link>
          ) : null}

          {wine.vineyard?.slug ? (
            <Link href={`/vignobles/${wine.vineyard.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm">
              Vignoble : {wine.vineyard.name}
            </Link>
          ) : null}
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Pays", wine.country?.name],
            ["Appellation", wine.appellation?.name],
            ["Cépages", wine.grapes?.map((grape) => grape.name).filter(Boolean).join(", ")],
            ["Prix SAQ", wine.saqPrice ? `${wine.saqPrice} $` : null],
            ["Prix domaine", wine.domainPrice ? `${wine.domainPrice} $` : null],
            ["Température", wine.servingTemperature],
            ["Garde", wine.cellaringPotential],
            ["Alcool", wine.alcohol ? `${wine.alcohol} %` : null],
            ["Sucre", wine.sugar],
            ["Acidité", wine.acidity],
            ["Corps", wine.body],
            ["Tanins", wine.tannins],
          ]
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#9ab3a1]">
                  {label}
                </p>
                <p className="mt-2 text-[#fff8f1]">{value}</p>
              </div>
            ))}
          <div className="mt-8">
            <WineJournalButton wineId={slug} />
          </div>
        </section>

        {badges.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="rounded-full border border-[#6f8f7a] bg-[rgba(111,143,122,0.12)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#e1eee5]">
                {badge}
              </span>
            ))}
          </div>
        ) : null}

        {wine.tastingNotes ? (
          <section className="mt-12 space-y-6 text-[1.03rem] leading-8 text-[#eadfd6]">
            <h2 className="text-2xl font-semibold">Notes de dégustation</h2>
            <PortableText value={wine.tastingNotes} />
          </section>
        ) : null}

        {wine.foodPairings && wine.foodPairings.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Accords mets-vins</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {wine.foodPairings.map((food) => (
                <span key={food._id} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                  {food.name}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {wine.articles && wine.articles.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Articles liés</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {wine.articles.map((article) => (
                <Link key={article._id} href={`/blog/${article.slug}`} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                  <p className="font-semibold">{article.title}</p>
                  {article.excerpt ? (
                    <p className="mt-2 text-sm leading-6 text-[#d5c0b3]">
                      {article.excerpt}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
