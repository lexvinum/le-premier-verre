import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type FeaturedWine = {
  name: string;
  slug: string;
  vintage?: number;
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
      color,
      bottleImage,
      producer->{name}
    }`
  );

  const featuredWine = homeWines[0] ?? null;
  const selectionWines = homeWines.slice(1, 4);

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
              alt="Des amis réunis autour d’une table et de bouteilles de vin"
              className="absolute inset-0 grayscale"
            />

            <div className="absolute inset-0 bg-black/38" />

            <div className="lpv-container relative z-10 flex min-h-[78vh] flex-col justify-end pb-12 pt-24 text-[var(--lpv-paper-light)] md:pb-16">
              <p className="lpv-kicker mb-6 text-white/72">
                Le Premier Verre
              </p>

              <h1 className="lpv-display max-w-5xl text-[clamp(4rem,15vw,5.2rem)] md:text-[clamp(4.6rem,11vw,10.5rem)] leading-[0.82]">
                Boire moins
                <br />
                compliqué.
              </h1>

              <div className="mt-8 flex flex-col gap-6 border-t border-white/35 pt-6 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-base leading-7 text-white/82 md:text-lg">
                  Des bouteilles, des producteurs et des endroits qui méritent
                  qu’on s’y attarde.
                </p>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                  <Link
                    href="/vins"
                    className="lpv-text-link w-fit text-white"
                  >
                    Trouver un vin <span>→</span>
                  </Link>

                  <Link
                href="/ce-soir"
                className="lpv-text-link w-fit text-white/75"
              >
                Ce soir, on boit quoi? <span>→</span>
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
              alt="Moment de table autour du vin"
              className="transition duration-700 hover:scale-[1.015]"
            />
          </div>

          <div className="flex flex-col justify-between border-t border-[var(--lpv-line)] px-0 py-10 md:border-l md:border-t-0 md:px-12 md:py-14 lg:px-16">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Commencer ici
              </p>

              <h2 className="lpv-display mt-8 text-[clamp(3.7rem,6vw,6.5rem)] leading-[0.9]">
                Une bouteille
                <br />
                pour ce soir.
              </h2>

              <p className="mt-8 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
                Choisis selon le repas, l’ambiance ou simplement l’envie du
                moment. Pas besoin de connaître tous les mots.
              </p>
            </div>

            <div className="mt-14 border-t border-[var(--lpv-line)] pt-7">
              <Link href="/ce-soir" className="lpv-text-link w-fit">
                Ce soir, on boit quoi? <span>→</span>
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
              Sélection du moment
            </p>

            <h2 className="lpv-display mt-6 max-w-4xl text-[clamp(3.15rem,13vw,4.2rem)] leading-[0.92] md:text-[clamp(3.6rem,6vw,6.5rem)] md:leading-[0.9]">
              Trois bouteilles qu’on ouvrirait maintenant.
            </h2>
          </div>

          <Link href="/vins" className="lpv-text-link w-fit">
            Voir toute la sélection <span>→</span>
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {selectionWines.map((wine) => {
            const image = wine.bottleImage
              ? urlFor(wine.bottleImage)
                  .width(700)
                  .height(900)
                  .fit("max")
                  .url()
              : null;

            return (
              <Link
                key={wine.slug}
                href={`/vins/${wine.slug}`}
                className="group"
              >
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-[var(--lpv-paper-light)] p-8">
                  {image ? (
                    <img
                      src={image}
                      alt={wine.name}
                      className="max-h-full max-w-full object-contain transition duration-700 group-hover:scale-[1.025]"
                    />
                  ) : (
                    <span className="text-sm text-[var(--lpv-muted)]">
                      Image à venir
                    </span>
                  )}
                </div>

                <div className="border-t border-[var(--lpv-line)] pt-5">
                  {wine.color ? (
                    <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                      {wine.color}
                    </p>
                  ) : null}

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
                    Voir la bouteille <span>→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* PRODUCTEUR À DÉCOUVRIR */}
      <section className="border-t border-[var(--lpv-line)]">
        <div className="lpv-container py-12 md:py-16">
          <p className="lpv-kicker mb-6 text-[var(--lpv-cocoa)]">
            Producteur à découvrir
          </p>

          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <Link
              href={
                featuredProducer
                  ? `/producteurs/${featuredProducer.slug}`
                  : "/producteurs"
              }
              className="group overflow-hidden"
            >
              {producerImage ? (
                <img
                  src={producerImage}
                  alt={featuredProducer?.name || "Producteur à découvrir"}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.015]"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[var(--lpv-paper-light)]">
                  <p className="text-sm text-[var(--lpv-muted)]">
                    Photo du producteur à venir
                  </p>
                </div>
              )}
            </Link>

            <div className="md:pl-8 lg:pl-14">
              <h2 className="lpv-display text-[clamp(3.6rem,5vw,5.8rem)] leading-[0.9]">
                {featuredProducer?.name ||
                  "À la rencontre de ceux qui font le vin."}
              </h2>

              <p className="mt-7 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
                Derrière chaque bouteille, il y a un lieu, des gens et une façon
                de voir le vin. On vous emmène à leur rencontre.
              </p>

              <div className="mt-10 border-t border-[var(--lpv-line)] pt-6">
                <Link
                  href={
                    featuredProducer
                      ? `/producteurs/${featuredProducer.slug}`
                      : "/producteurs"
                  }
                  className="lpv-text-link w-fit"
                >
                  Découvrir le producteur <span>→</span>
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
              Guide du moment
            </p>

            <h2 className="lpv-display mt-6 text-[clamp(3.1rem,12.5vw,4rem)] leading-[0.92] md:text-[clamp(3.5rem,5vw,5.6rem)] md:leading-[0.9]">
              Des guides pour mieux choisir.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
              Régions, cépages, accords et conseils sans jargon inutile.
            </p>

            <div className="mt-10 border-t border-[var(--lpv-line)] pt-6">
              <Link href="/guides" className="lpv-text-link w-fit">
                Voir les guides <span>→</span>
              </Link>
            </div>
          </div>

          <Link href="/guides" className="group overflow-hidden">
            <Photo
              src="/images/lpv/guides.jpg"
              alt="Guide et découverte autour du vin"
              className="aspect-[4/3] transition duration-700 group-hover:scale-[1.015]"
            />
          </Link>
        </div>
      </section>

      {/* ARTICLE À LA UNE */}
      <section className="lpv-container py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between border-b border-[var(--lpv-line)] pb-5">
          <p className="lpv-kicker text-[var(--lpv-cocoa)]">
            Le journal
          </p>

          <Link href="/blog" className="lpv-text-link hidden sm:inline-flex">
            Tous les articles <span>→</span>
          </Link>
        </div>

        <Link
          href="/blog"
          className="group grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-end"
        >
          <div className="overflow-hidden">
            <Photo
              src="/images/lpv/home-article.jpg"
              alt="Article éditorial du Premier Verre"
              className="aspect-[4/3] transition duration-700 group-hover:scale-[1.015]"
            />
          </div>

          <div className="md:pb-4">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              Article à la une
            </p>

            <h2 className="lpv-display mt-6 text-[clamp(3.4rem,5vw,5.8rem)] leading-[0.91]">
              Recevoir sans cérémonie.
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-[var(--lpv-muted)]">
              Une façon plus simple de penser la table, la bouteille et les
              gens qu’on rassemble autour.
            </p>

            <span className="lpv-text-link mt-9">
              Lire l’article <span>→</span>
            </span>
          </div>
        </Link>
      </section>

      {/* EXPLORER LES VINS */}
      <section className="border-t border-[var(--lpv-line)]">
        <div className="lpv-container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="lpv-kicker text-[var(--lpv-cocoa)]">
                Explorer
              </p>

              <h2 className="lpv-display mt-6 text-[clamp(3.8rem,6vw,6.8rem)] leading-[0.9]">
                Trouver une bouteille à ta façon.
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              Par couleur, par envie, par budget ou simplement selon le moment.
              Commence là où ça te parle.
            </p>
          </div>

          <div className="mt-12 grid border-t border-[var(--lpv-line)] sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/vins?color=rouge"
              className="group border-b border-[var(--lpv-line)] py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:border-b-0"
            >
              <span className="lpv-display text-3xl">Rouges</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/vins?color=blanc"
              className="group border-b border-[var(--lpv-line)] py-6 sm:px-6 lg:border-b-0 lg:border-r"
            >
              <span className="lpv-display text-3xl">Blancs</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/vins?color=rose"
              className="group border-b border-[var(--lpv-line)] py-6 sm:border-r sm:px-6 lg:border-b-0"
            >
              <span className="lpv-display text-3xl">Rosés</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/vins?color=bulles"
              className="group py-6 sm:px-6 lg:pr-0"
            >
              <span className="lpv-display text-3xl">Bulles</span>
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--lpv-line)] pt-6">
            <Link href="/vins" className="lpv-text-link">
              Voir tous les vins <span>→</span>
            </Link>

            <Link href="/ce-soir" className="lpv-text-link">
              Choisir pour ce soir <span>→</span>
            </Link>

            <Link href="/producteurs" className="lpv-text-link">
              Explorer les producteurs <span>→</span>
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
              alt="Paysage viticole du Premier Verre"
              className="aspect-[4/5]"
            />
          </div>

          <div className="flex flex-col justify-center border-white/20 pt-10 md:border-l md:px-14 md:pt-0 lg:px-20">
            <p className="lpv-kicker text-white/55">
              L’infolettre
            </p>

            <h2 className="lpv-display mt-8 max-w-3xl text-[clamp(4rem,7vw,7.5rem)] leading-[0.86]">
              Avant le
              <br />
              week-end.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/68">
              Une bouteille, une adresse et une idée à garder sous la main.
            </p>

            <Link
              href="/newsletter"
              className="lpv-text-link mt-10 w-fit text-white"
            >
              S’inscrire <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
