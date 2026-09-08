import Link from "next/link";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { articleBySlugQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Article = {
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  author?: string;
  coverImage?: SanityImageSource;
  tags?: string[];
  tagsJson?: string;
  publishedAt?: string;
  _createdAt?: string;
};

function formatDate(value?: string) {
  if (!value) return null;

  return new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function parseTags(article: Article) {
  if (Array.isArray(article.tags)) return article.tags;

  if (!article.tagsJson) return [];

  try {
    const parsed = JSON.parse(article.tagsJson);

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await client.fetch<Article | null>(
    articleBySlugQuery,
    { slug }
  );

  if (!article) notFound();

  const imageSrc = article.coverImage
    ? urlFor(article.coverImage)
        .width(2000)
        .height(1400)
        .fit("crop")
        .url()
    : null;

  const tags = parseTags(article);

  const paragraphs =
    article.content
      ?.split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean) || [];

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <article className="pb-24">
        <div className="lpv-container pt-8 md:pt-10">
          <Link href="/blog" className="lpv-text-link">
            <span>←</span> Retour au journal
          </Link>
        </div>

        <header className="lpv-container grid gap-12 border-b border-[var(--lpv-line)] pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              {article.category || "Article"}
            </p>

            <h1 className="lpv-display mt-7 text-[clamp(4.4rem,8vw,8.5rem)] leading-[0.84]">
              {article.title}
            </h1>

            {article.excerpt ? (
              <p className="mt-8 max-w-lg text-lg leading-8 text-[var(--lpv-muted)]">
                {article.excerpt}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-4 border-t border-[var(--lpv-line)] pt-7 text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
              {article.author ? <span>{article.author}</span> : null}

              {formatDate(article.publishedAt || article._createdAt) ? (
                <span>
                  · {formatDate(article.publishedAt || article._createdAt)}
                </span>
              ) : null}
            </div>
          </div>

          <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={article.title}
                className="min-h-[620px] w-full object-cover md:min-h-[780px]"
              />
            ) : (
              <div className="flex min-h-[620px] items-center justify-center">
                <p className="text-sm text-[var(--lpv-muted)]">
                  Image à ajouter dans Sanity.
                </p>
              </div>
            )}
          </div>
        </header>

        <section className="lpv-container grid gap-10 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.3fr_0.7fr] md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Le journal
            </p>

            <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-6xl">
              L’article.
            </h2>
          </div>

          {paragraphs.length > 0 ? (
            <div className="lpv-prose max-w-3xl">
              {paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 24)}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-base leading-8 text-[var(--lpv-muted)]">
              Le contenu détaillé de cet article est en préparation.
            </p>
          )}
        </section>

        {tags.length > 0 ? (
          <section className="lpv-container grid gap-10 border-b border-[var(--lpv-line)] py-16 md:grid-cols-[0.3fr_0.7fr]">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Thèmes
              </p>

              <h2 className="lpv-display mt-6 text-5xl leading-[0.9]">
                À retenir.
              </h2>
            </div>

            <div className="border-b border-[var(--lpv-line)]">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="border-t border-[var(--lpv-line)] py-5 text-xl"
                >
                  {tag}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="lpv-container py-16 md:py-24">
          <div className="border-t border-[var(--lpv-line)] pt-8">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Continuer
            </p>

            <Link href="/blog" className="group mt-6 block">
              <h2 className="lpv-display max-w-4xl text-5xl leading-[0.9] transition-opacity group-hover:opacity-60 md:text-7xl">
                Lire les autres histoires.
              </h2>

              <span className="lpv-text-link mt-8">
                Retour au journal <span>→</span>
              </span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
