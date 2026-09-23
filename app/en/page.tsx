import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { articlesQuery } from "@/sanity/lib/queries";
import BottleStage from "@/components/wine/BottleStage";

export const revalidate = 60;

type HomeArticle = {
  _id: string;
  title: string;
  titleEn?: string;
  slug: string;
  excerpt?: string;
  excerptEn?: string;
  coverImage?: SanityImageSource;
};

type FeaturedWine = {
  name: string;
  slug: string;
  vintage?: number;
  beverageType?: "wine" | "cider";
  alcoholFree?: boolean;
  color?: string;
  bottleImage?: SanityImageSource;
  producer?: {
    name?: string;
  };
};

function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export default async function HomePage() {
  const homeWines = await client.fetch<FeaturedWine[]>(
    `*[_type == "wine" && published == true] | order(_updatedAt desc)[0...4] {
      name,
      "slug": slug.current,
      vintage,
      beverageType,
      alcoholFree,
      color,
      bottleImage,
      producer->{name}
    }`
  );

  const featuredWine = homeWines[0] ?? null;
  const selectionWines = homeWines.slice(1, 4);

  const articles = await client.fetch<HomeArticle[]>(articlesQuery);
  const featuredArticle = articles[0] ?? null;

  const bottleImage = featuredWine?.bottleImage
    ? urlFor(featuredWine.bottleImage)
        .width(900)
        .height(1200)
        .fit("max")
        .url()
    : null;

  const featuredProducer = await client.fetch<{
    name: string;
    slug: string;
    image?: SanityImageSource;
  } | null>(
    `*[_type == "producer" && defined(slug.current)] | order(_updatedAt desc)[0] {
      name,
      "slug": slug.current,
      "image": coalesce(image, mainImage, heroImage, photo, coverImage)
    }`
  );

  const producerImage = featuredProducer?.image
    ? urlFor(featuredProducer.image)
        .width(1200)
        .height(900)
        .fit("crop")
        .url()
    : null;

  return (
    <main className="bg-[var(--lpv-paper)] text-[var(--lpv-ink)]">
          {/* HERO */}
          <section className="relative min-h-[78vh] overflow-hidden">
            <Photo
              src="/images/lpv/table-vin.jpg"
              alt="Friends gathered around a table with bottles of wine"
              className="absolute inset-0 grayscale"
            />

            <div className="absolute inset-0 bg-black/38" />

            <div className="lpv-container relative z-10 flex min-h-[78vh] flex-col justify-end pb-12 pt-24 text-[var(--lpv-paper-light)] md:pb-16">
              <p className="lpv-kicker mb-6 text-white/72">
                Le Premier Verre
              </p>

              <h1 className="lpv-display max-w-5xl text-[clamp(4rem,15vw,5.2rem)] md:text-[clamp(4.6rem,11vw,10.5rem)] leading-[0.82]">
                Wine made
                <br />
                simpler.
              </h1>

              <div className="mt-8 flex flex-col gap-6 border-t border-white/35 pt-6 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-base leading-7 text-white/82 md:text-lg">
                  Bottles, producers and places worth taking the time
                  to discover.
                </p>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <Link
                    href="/en/wines"
                    className="lpv-text-link w-fit text-white"
                  >
                    Find a bottle <span>→</span>
                  </Link>

                  <Link
                href="/en/tonight"
                className="lpv-text-link w-fit text-white/75"
              >
                What are we drinking tonight? <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BLOC ÉDITORIAL */}
      <section className="border-y border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-0 py-[3.5vw] md:grid-cols-2">
          <div className="h-[500px] overflow-hidden md:h-auto md:min-h-[720px]">
            <Photo
              src="/images/lpv/bouteille-ce-soir.jpg"
              alt="A moment around the table and wine"
              className="transition duration-700 hover:scale-[1.015]"
            />
          </div>

          <div className="flex flex-col justify-between border-t border-[var(--lpv-line)] px-0 py-10 md:border-l md:border-t-0 md:px-12 md:py-14 lg:px-16">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Start here
              </p>

              <h2 className="lpv-display mt-8 text-[clamp(3.7rem,6vw,6.5rem)] leading-[0.9]">
                A bottle
                <br />
                for tonight.
              </h2>

              <p className="mt-8 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
                Choose by the meal, the mood or simply what you feel like
                tonight. No need to know all the terminology.
              </p>
            </div>

            <div className="mt-14 border-t border-[var(--lpv-line)] pt-7">
              <Link href="/en/tonight" className="lpv-text-link w-fit">
                What are we drinking tonight? <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SÉLECTION DU MOMENT */}
      <section className="lpv-container py-20 md:py-28">
        <div className="mb-10 flex flex-col gap-6 border-b border-[var(--lpv-line)] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Current selection
            </p>

            <h2 className="lpv-display mt-6 max-w-4xl text-[clamp(3.15rem,13vw,4.2rem)] leading-[0.92] md:text-[clamp(3.6rem,6vw,6.5rem)] md:leading-[0.9]">
              Three bottles we would open right now.
            </h2>
          </div>

          <Link href="/en/wines" className="lpv-text-link w-fit">
            See the full selection <span>→</span>
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {selectionWines.map((wine) => {
            const image = wine.bottleImage
              ? urlFor(wine.bottleImage)
                  .ignoreImageParams()
                  .width(900)
                  .height(1200)
                  .fit("max")
                  .url()
              : null;

            return (
              <Link
                key={wine.slug}
                href={`/en/wines/${wine.slug}`}
                className="group"
              >
                <div className="aspect-[4/5]">
                  <BottleStage
                    image={wine.bottleImage}
                    alt={wine.name}
                    color={wine.beverageType === "cider" ? undefined : wine.color}
                    variant="card"
                    className="h-full transition duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="border-t border-[var(--lpv-line)] pt-5">
                  <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                    {[
                      wine.beverageType === "cider"
                        ? "Cider"
                        : wine.color || "Wine",
                      wine.alcoholFree ? "Alcohol-free" : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>

                  <h3 className="lpv-display mt-4 text-3xl leading-[0.95]">
                    {wine.name}
                  </h3>

                  {wine.producer?.name ? (
                    <p className="mt-3 text-sm leading-6 text-[var(--lpv-muted)]">
                      {wine.producer.name}
                      {wine.vintage ? ` · ${wine.vintage}` : ""}
                    </p>
                  ) : null}

                  <span className="lpv-text-link mt-5">
                    View the bottle <span>→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ALCOHOL-FREE */}
      <section className="border-t border-[var(--lpv-line)]">
        <div className="lpv-container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.28fr_0.72fr] md:gap-16">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Alcohol-free
            </p>

            <div className="max-w-4xl">
              <h2 className="lpv-display text-[clamp(3.5rem,12vw,4.5rem)] leading-[0.9] md:text-[clamp(4rem,6vw,6.5rem)]">
                What’s in
                <br />
                the glass.
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--lpv-muted)]">
                What we love in a bottle goes far beyond alcohol. There is
                taste, texture, balance, craft, place and the people behind
                what we drink.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--lpv-muted)]">
                Some alcohol-free bottles are simply good, precise and
                thoughtfully made — and deserve a place at the table.
              </p>

              <div className="mt-10 border-t border-[var(--lpv-line)] pt-6">
                <Link
                  href="/en/alcohol-free"
                  className="lpv-text-link w-fit"
                >
                  Explore alcohol-free <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTEUR À DÉCOUVRIR */}
      <section className="border-t border-[var(--lpv-line)]">
        <div className="lpv-container py-12 md:py-16">
          <p className="lpv-kicker mb-6 text-[var(--lpv-cocoa)]">
            Producer to discover
          </p>

          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <Link
              href={
                featuredProducer
                  ? `/en/producers/${featuredProducer.slug}`
                  : "/en/producers"
              }
              className="group overflow-hidden"
            >
              {producerImage ? (
                <img
                  src={producerImage}
                  alt={featuredProducer?.name || "Producer to discover"}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[var(--lpv-paper-light)]">
                  <p className="text-sm text-[var(--lpv-muted)]">
                    Producer photo coming soon
                  </p>
                </div>
              )}
            </Link>

            <div className="md:pl-8 lg:pl-14">
              <h2 className="lpv-display text-[clamp(3.6rem,5vw,5.8rem)] leading-[0.9]">
                {featuredProducer?.name ||
                  "Meet the people behind the wine."}
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
                Behind every bottle is a place, people and a way of seeing
                  wine. Come meet them with us.
              </p>

              <div className="mt-10 border-t border-[var(--lpv-line)] pt-6">
                <Link
                  href={
                    featuredProducer
                      ? `/en/producers/${featuredProducer.slug}`
                      : "/en/producers"
                  }
                  className="lpv-text-link w-fit"
                >
                  Discover the producer <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE DU MOMENT */}
      <section className="border-t border-[var(--lpv-line)]">
        <div className="lpv-container grid gap-10 py-12 md:grid-cols-[0.75fr_1.25fr] md:items-center md:py-16">
          <div className="md:pr-8 lg:pr-14">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Featured guide
            </p>

            <h2 className="lpv-display mt-6 text-[clamp(3.1rem,12.5vw,4rem)] leading-[0.92] md:text-[clamp(3.5rem,5vw,5.6rem)] md:leading-[0.9]">
              Guides to help you choose.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
              Regions, grapes, pairings and advice without unnecessary jargon.
            </p>

            <div className="mt-10 border-t border-[var(--lpv-line)] pt-6">
              <Link href="/en/guides" className="lpv-text-link w-fit">
                View the guides <span>→</span>
              </Link>
            </div>
          </div>

          <Link href="/en/guides" className="group overflow-hidden">
            <Photo
              src="/images/lpv/guides.jpg"
              alt="Wine guide and discovery"
              className="aspect-[4/3] transition duration-700 group-hover:scale-[1.015]"
            />
          </Link>
        </div>
      </section>

      {/* ARTICLE À LA UNE */}
      {featuredArticle && (
        <section className="lpv-container py-20 md:py-28">
          <div className="mb-10 flex items-end justify-between border-b border-[var(--lpv-line)] pb-5">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Journal
            </p>

            <Link href="/en/journal" className="lpv-text-link hidden sm:inline-flex">
              All articles <span>→</span>
            </Link>
          </div>

          <Link
            href={`/en/journal/${featuredArticle.slug}`}
            className="group grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-start md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          >
            <div className="overflow-hidden bg-[var(--lpv-paper-light)]">
              {featuredArticle.coverImage ? (
                <img
                  src={urlFor(featuredArticle.coverImage)
                    .width(1600)
                    .height(1200)
                    .fit("crop")
                    .url()}
                  alt={featuredArticle.titleEn || featuredArticle.title}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center">
                  <p className="text-sm text-[var(--lpv-muted)]">
                    Image coming soon
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col md:pt-4">
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Featured article
              </p>

              <h2 className="lpv-display mt-6 text-[clamp(2.9rem,4.2vw,4.9rem)] leading-[0.92] md:max-w-[9.5em]">
                {featuredArticle.titleEn || featuredArticle.title}
              </h2>

              {(featuredArticle.excerptEn || featuredArticle.excerpt) && (
                <p className="mt-7 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
                  {featuredArticle.excerptEn || featuredArticle.excerpt}
                </p>
              )}

              <span className="lpv-text-link mt-9 w-fit">
                Read the article <span>→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* EXPLORER LES VINS */}
      <section className="border-t border-[var(--lpv-line)]">
        <div className="lpv-container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Explore
              </p>

              <h2 className="lpv-display mt-6 text-[clamp(3.8rem,6vw,6.8rem)] leading-[0.9]">
                Find a bottle your way.
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              By colour, mood, budget or simply the moment.
              Start wherever feels right.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-4 border-t border-[var(--lpv-line)]">
            <Link
              href="/en/wines?color=red"
              className="group border-r border-[var(--lpv-line)] px-2 py-5 sm:px-4 md:px-6 md:py-6 md:first:pl-0"
            >
              <span className="lpv-display text-lg sm:text-2xl md:text-3xl">Reds</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/en/wines?color=white"
              className="group border-r border-[var(--lpv-line)] px-2 py-5 sm:px-4 md:px-6 md:py-6"
            >
              <span className="lpv-display text-lg sm:text-2xl md:text-3xl">Whites</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/en/wines?color=rose"
              className="group border-r border-[var(--lpv-line)] px-2 py-5 sm:px-4 md:px-6 md:py-6"
            >
              <span className="lpv-display text-lg sm:text-2xl md:text-3xl">Rosés</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/en/wines?color=sparkling"
              className="group px-2 py-5 sm:px-4 md:px-6 md:py-6 md:pr-0"
            >
              <span className="lpv-display text-lg sm:text-2xl md:text-3xl">Sparkling</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--lpv-line)] pt-6">
            <Link href="/en/wines" className="lpv-text-link">
              View all wines <span>→</span>
            </Link>

            <Link href="/en/tonight" className="lpv-text-link">
              Choose for tonight <span>→</span>
            </Link>

            <Link href="/en/producers" className="lpv-text-link">
              Explore producers <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[var(--lpv-cocoa)] text-[var(--lpv-paper-light)]">
        <div className="lpv-container grid gap-0 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
          <div className="overflow-hidden">
            <Photo
              src="/images/lpv/infolettre.jpg"
              alt="Le Premier Verre wine country landscape"
              className="aspect-[4/5]"
            />
          </div>

          <div className="flex flex-col justify-center border-white/20 pt-10 md:border-l md:px-14 md:pt-0 lg:px-20">
            <p className="lpv-kicker text-white/55">
              Newsletter
            </p>

            <h2 className="lpv-display mt-8 max-w-3xl text-[clamp(4rem,7vw,7.5rem)] leading-[0.86]">
              Before the
              <br />
              weekend.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/68">
              One bottle, one place and one idea worth keeping close.
            </p>

            <Link
              href="/en/newsletter"
              className="lpv-text-link mt-10 w-fit text-white"
            >
              Subscribe <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
