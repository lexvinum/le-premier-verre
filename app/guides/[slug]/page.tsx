import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

type Guide = {
  title: string;
  excerpt?: string;
  content?: PortableTextBlock[];
};

const guideQuery = `*[_type == "guide" && slug.current == $slug && published == true][0] {
  title,
  excerpt,
  content
}`;

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await client.fetch<Guide | null>(guideQuery, { slug });

  if (!guide) notFound();

  return (
    <main className="min-h-screen bg-[#0f1713] px-6 py-16 text-[#f4ede5]">
      <article className="mx-auto max-w-3xl">
        <Link href="/guides" className="text-sm text-[#d8c2b2]">
          ← Retour aux guides
        </Link>

        <h1 className="mt-8 text-4xl font-semibold leading-tight md:text-6xl">
          {guide.title}
        </h1>

        {guide.excerpt ? (
          <p className="mt-6 text-lg leading-8 text-[#d7c2b5]">
            {guide.excerpt}
          </p>
        ) : null}

        <div className="mt-10 space-y-6 text-[1.03rem] leading-8 text-[#eadfd6]">
          {guide.content ? <PortableText value={guide.content} /> : null}
        </div>
      </article>
    </main>
  );
}