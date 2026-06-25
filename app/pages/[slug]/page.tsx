import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type EditorialPage = {
  title: string;
  heroTitle?: string;
  heroText?: string;
  content?: PortableTextBlock[];
};

const pageQuery = `*[_type == "page" && slug.current == $slug][0] {
  title,
  heroTitle,
  heroText,
  content
}`;

export default async function EditorialPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await client.fetch<EditorialPage | null>(pageQuery, { slug });

  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-[#d8c2b2]">
          ← Retour à l’accueil
        </Link>

        <h1 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
          {page.heroTitle || page.title}
        </h1>

        {page.heroText ? (
          <p className="mt-6 text-lg leading-8 text-[#d7c2b5]">
            {page.heroText}
          </p>
        ) : null}

        <div className="mt-10 space-y-6 text-[1.03rem] leading-8 text-[#eadfd6]">
          {page.content ? <PortableText value={page.content} /> : null}
        </div>
      </article>
    </main>
  );
}