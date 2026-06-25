import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";
import { producerBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Producer = {
  name: string;
  bio?: PortableTextBlock[];
  country?: { name?: string };
  region?: { name?: string };
  vineyard?: { name?: string; slug?: string };
  website?: string;
  instagram?: string;
  facebook?: string;
  wines?: { _id: string; name: string; slug: string; vintage?: number }[];
  articles?: { _id: string; title: string; slug: string; excerpt?: string }[];
};

export default async function ProducerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producer = await client.fetch<Producer | null>(producerBySlugQuery, {
    slug,
  });

  if (!producer) notFound();

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-24 text-[#f4ede5]">
      <article className="mx-auto max-w-4xl">
        <Link href="/producteurs" className="text-sm text-[#d8c2b2]">
          ← Retour aux producteurs
        </Link>

        <h1 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
          {producer.name}
        </h1>

        <p className="mt-6 text-[#d7c2b5]">
          {[producer.region?.name, producer.country?.name]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {producer.vineyard?.slug ? (
          <Link
            href={`/vignobles/${producer.vineyard.slug}`}
            className="mt-4 inline-block text-[#d8eadf]"
          >
            Vignoble lié : {producer.vineyard.name} →
          </Link>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {producer.website ? (
            <a href={producer.website} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-sm">
              Site web
            </a>
          ) : null}
          {producer.instagram ? (
            <a href={producer.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-sm">
              Instagram
            </a>
          ) : null}
          {producer.facebook ? (
            <a href={producer.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-4 py-2 text-sm">
              Facebook
            </a>
          ) : null}
        </div>

        <div className="mt-10 space-y-6 text-[1.03rem] leading-8 text-[#eadfd6]">
          {producer.bio ? <PortableText value={producer.bio} /> : null}
        </div>

        {producer.wines && producer.wines.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Vins liés</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {producer.wines.map((wine) => (
                <Link
                  key={wine._id}
                  href={`/vins/${wine.slug}`}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-semibold">{wine.name}</p>
                  {wine.vintage ? (
                    <p className="mt-1 text-sm text-[#d5c0b3]">
                      {wine.vintage}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {producer.articles && producer.articles.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-2xl font-semibold">Articles liés</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {producer.articles.map((article) => (
                <Link
                  key={article._id}
                  href={`/blog/${article.slug}`}
                  className="rounded-[22px] border border-white/10 bg-white/5 p-5"
                >
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
