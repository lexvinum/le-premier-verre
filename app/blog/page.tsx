import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { articlesQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  coverImage?: SanityImageSource;
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

export default async function BlogPage() {
  const articles = await client.fetch<Article[]>(articlesQuery);

  const featured = articles[0];
  const remaining = articles.slice(1);

  return (
    <main className="min-h-screen bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
      <section className="border-b border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-16 md:grid-cols-[0.68fr_0.32fr] md:items-end md:py-24">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Le journal
            </p>

            <h1 className="lpv-display mt-7 max-w-5xl text-[clamp(4.8rem,10vw,10rem)] leading-[0.82]">
              Des histoires
              <br />
              à ouvrir.
            </h1>
          </div>

          <div className="border-t border-[var(--lpv-line)] pt-6 md:border-t-0 md:pb-2">
            <p className="max-w-md text-base leading-8 text-[var(--lpv-muted)]">
              Des idées, des rencontres et des façons plus simples de penser le
              vin, la table et les moments qu’on partage.
            </p>

            <p className="mt-7 text-xs uppercase tracking-[0.18em] text-[var(--lpv-cocoa)]">
              {articles.length} article{articles.length > 1 ? "s" : ""} publié
              {articles.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="border-b border-[var(--lpv-line)]">
          <Link
            href={`/blog/${featured.slug}`}
            className="group lpv-container grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-24"
          >
            <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
              {featured.coverImage ? (
                <img
                  src={urlFor(featured.coverImage)
                    .width(1600)
                    .height(1200)
                    .fit("crop")
                    .url()}
                  alt={featured.title}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center">
                  <p className="text-sm text-[var(--lpv-muted)]">
                    Image à venir
                  </p>
                </div>
              )}
            </div>

            <div className="md:pb-4">
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                À la une
                {featured.category ? ` · ${featured.category}` : ""}
              </p>

              <h2 className="lpv-display mt-6 text-[clamp(3.8rem,6vw,7rem)] leading-[0.88]">
                {featured.title}
              </h2>

              {featured.excerpt ? (
                <p className="mt-7 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
                  {featured.excerpt}
                </p>
              ) : null}

              <div className="mt-8 flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] text-[var(--lpv-muted)]">
                {featured.author ? <span>{featured.author}</span> : null}

                {formatDate(featured.publishedAt || featured._createdAt) ? (
                  <span>
                    · {formatDate(featured.publishedAt || featured._createdAt)}
                  </span>
                ) : null}
              </div>

              <span className="lpv-text-link mt-9">
                Lire l’article <span>→</span>
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="lpv-container py-16 md:py-24">
        <div className="border-b border-[var(--lpv-line)] pb-6">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Dernières parutions
          </p>

          <h2 className="lpv-display mt-5 text-5xl leading-none md:text-7xl">
            À lire.
          </h2>
        </div>

        {remaining.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {remaining.map((article, index) => {
              const imageSrc = article.coverImage
                ? urlFor(article.coverImage)
                    .width(1000)
                    .height(1200)
                    .fit("crop")
                    .url()
                : null;

              return (
                <article
                  key={article._id}
                  className={`group border-b border-[var(--lpv-line)] py-10 ${
                    index % 3 !== 2
                      ? "xl:border-r xl:pr-10"
                      : "xl:pl-10"
                  } ${
                    index % 3 === 1
                      ? "xl:px-10"
                      : ""
                  }`}
                >
                  <Link href={`/blog/${article.slug}`} className="block">
                    <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={article.title}
                          className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                        />
                      ) : (
                        <div className="flex aspect-[4/5] items-center justify-center">
                          <p className="text-sm text-[var(--lpv-muted)]">
                            Image à venir
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="pt-7">
                    <div className="flex items-start justify-between gap-6">
                      <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                        {article.category || "Article"}
                      </p>

                      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
                        {String(index + 2).padStart(2, "0")}
                      </span>
                    </div>

                    <Link href={`/blog/${article.slug}`}>
                      <h2 className="lpv-display mt-5 text-[clamp(3rem,4vw,4.8rem)] leading-[0.9] transition-opacity group-hover:opacity-60">
                        {article.title}
                      </h2>
                    </Link>

                    {article.excerpt ? (
                      <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--lpv-muted)]">
                        {article.excerpt}
                      </p>
                    ) : null}

                    <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[var(--lpv-muted)]">
                      {[
                        article.author,
                        formatDate(article.publishedAt || article._createdAt),
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="lpv-text-link mt-8"
                    >
                      Lire <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : featured ? (
          <div className="py-16 text-center">
            <p className="text-sm text-[var(--lpv-muted)]">
              D’autres articles arrivent bientôt.
            </p>
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Bientôt
            </p>

            <h2 className="lpv-display mt-6 text-5xl md:text-7xl">
              Le journal prend forme.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Les premiers articles seront publiés progressivement.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
