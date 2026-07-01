import Link from "next/link";

import { EditorialCard } from "@/components/design/EditorialCard";
import { LPVButton } from "@/components/design/LPVButton";
import { MagazineFeature } from "@/components/design/MagazineFeature";
import { QuoteBlock } from "@/components/design/QuoteBlock";
import { SectionHeader } from "@/components/design/SectionHeader";

import { EditorialImage } from "./EditorialImage";
import { ProducerMiniCard } from "./ProducerMiniCard";
import { WineMiniCard } from "./WineMiniCard";
import type { PageSection } from "./types";

type PageBuilderProps = {
  sections?: PageSection[];
};

function HeroSection({ section }: { section: PageSection }) {
  return (
    <section className="lpv-container relative grid min-h-[calc(100vh-76px)] items-center gap-10 py-12 md:grid-cols-[0.95fr_1.05fr] md:py-20">
      <div className="lpv-reveal relative z-10">
        {section.eyebrow && (
          <p className="mb-6 text-[10px] uppercase tracking-[0.44em] text-[var(--lpv-muted)]">
            {section.eyebrow}
          </p>
        )}

        <h1 className="lpv-display max-w-5xl text-[clamp(4.4rem,10vw,11rem)] leading-[0.78] tracking-[-0.08em] text-[var(--lpv-ink)]">
          {section.title}
        </h1>

        {section.description && (
          <p className="mt-8 max-w-xl text-base leading-8 text-[var(--lpv-muted)] md:text-lg">
            {section.description}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          {section.href && (
            <LPVButton href={section.href}>
              {section.buttonLabel ?? "Commencer"}
            </LPVButton>
          )}

          <Link
            href="/recherche"
            className="rounded-full border border-[var(--lpv-border-strong)] px-6 py-3 text-xs uppercase tracking-[0.22em] text-[var(--lpv-ink)] transition duration-500 hover:bg-[var(--lpv-ink)] hover:text-white"
          >
            Explorer
          </Link>
        </div>

        <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
          {["Choisir", "Servir", "Recevoir"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--lpv-border)] bg-[rgba(251,247,239,0.66)] px-4 py-4"
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--lpv-muted)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lpv-reveal-delay relative z-10 grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4 md:pt-24">
          <div className="rounded-[2rem] border border-[var(--lpv-border)] bg-[rgba(251,247,239,0.82)] p-5 shadow-sm">
            <p className="mb-3 text-[10px] uppercase tracking-[0.32em] text-[var(--lpv-muted)]">
              Sommelier IA
            </p>
            <p className="lpv-display text-4xl leading-[0.9]">
              Qu’est-ce qu’on boit ce soir?
            </p>
          </div>

          <EditorialImage
            image={section.secondaryImage}
            alt={section.title ?? "Image secondaire"}
            className="h-[360px] rounded-[2rem]"
          />
        </div>

        <div className="lpv-image-zoom rounded-[2.5rem]">
          <EditorialImage
            image={section.editorialAsset?.image ?? section.image}
            alt={section.editorialAsset?.alt ?? section.title ?? "Image éditoriale"}
            className="h-[620px] rounded-[2.5rem]"
          />
        </div>
      </div>
    </section>
  );
}

function ImageMosaicSection({ section }: { section: PageSection }) {
  return (
    <section className="lpv-container py-14 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          {section.eyebrow && (
            <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-[var(--lpv-muted)]">
              {section.eyebrow}
            </p>
          )}

          {section.title && (
            <h2 className="lpv-display text-[clamp(3.6rem,7vw,8rem)] leading-[0.82] tracking-[-0.075em]">
              {section.title}
            </h2>
          )}
        </div>

        {section.description && (
          <p className="max-w-md text-sm leading-7 text-[var(--lpv-muted)]">
            {section.description}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="lpv-image-zoom rounded-[2.5rem]">
          <EditorialImage
            image={section.editorialAsset?.image ?? section.image}
            alt={section.editorialAsset?.alt ?? section.title ?? "Image principale"}
            className="min-h-[680px] rounded-[2.5rem]"
          />
        </div>

        <div className="grid gap-4">
          <EditorialImage
            image={section.secondaryImage}
            alt="Image secondaire"
            className="min-h-[332px] rounded-[2.25rem]"
          />
          <EditorialImage
            image={section.thirdImage}
            alt="Troisième image"
            className="min-h-[332px] rounded-[2.25rem]"
          />
        </div>
      </div>
    </section>
  );
}

function EditorialGridSection({ section }: { section: PageSection }) {
  return (
    <section className="lpv-container py-14 md:py-24">
      <SectionHeader
        eyebrow={section.eyebrow}
        title={section.title ?? ""}
        description={section.description}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {(section.cards ?? []).map((card, index) => (
          <div
            key={`${card.href}-${card.title}`}
            className={index === 0 ? "md:col-span-2" : ""}
          >
            <EditorialCard
              eyebrow={card.eyebrow ?? ""}
              title={card.title ?? ""}
              description={card.description ?? ""}
              href={card.href ?? "/"}
              tone={card.tone ?? "cream"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureSection({ section }: { section: PageSection }) {
  const featureImage = section.editorialAsset?.image ?? section.image;

  if (!featureImage?.asset?._ref) {
    return (
      <MagazineFeature
        eyebrow={section.eyebrow ?? ""}
        title={section.title ?? ""}
        description={section.description ?? ""}
        href={section.href ?? "/"}
      />
    );
  }

  return (
    <section className="lpv-container grid gap-4 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-24">
      <div className="flex min-h-[560px] flex-col justify-between rounded-[2.5rem] border border-[var(--lpv-border)] bg-[rgba(251,247,239,0.84)] p-8 md:p-12">
        <div>
          {section.eyebrow && (
            <p className="mb-7 text-[10px] uppercase tracking-[0.4em] text-[var(--lpv-muted)]">
              {section.eyebrow}
            </p>
          )}

          <h2 className="lpv-display max-w-2xl text-[clamp(4rem,7vw,8rem)] leading-[0.8] tracking-[-0.08em]">
            {section.title}
          </h2>

          {section.description && (
            <p className="mt-8 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
              {section.description}
            </p>
          )}
        </div>

        <Link
          href={section.href ?? "/"}
          className="mt-10 inline-flex w-fit rounded-full border border-[var(--lpv-border-strong)] px-6 py-3 text-xs uppercase tracking-[0.22em] text-[var(--lpv-ink)] transition duration-500 hover:bg-[var(--lpv-ink)] hover:text-white"
        >
          Découvrir
        </Link>
      </div>

      <div className="lpv-image-zoom rounded-[2.5rem]">
        <EditorialImage
          image={featureImage}
          alt={section.editorialAsset?.alt ?? section.title ?? "Image"}
          className="min-h-[560px] rounded-[2.5rem]"
        />
      </div>
    </section>
  );
}

function FeaturedWinesSection({ section }: { section: PageSection }) {
  return (
    <section className="lpv-container py-14 md:py-24">
      <SectionHeader
        eyebrow={section.eyebrow ?? "À boire"}
        title={section.title ?? "Les bouteilles qui sauvent la soirée."}
        description={section.description}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {(section.wines ?? []).map((wine) => (
          <WineMiniCard key={wine._id} wine={wine} />
        ))}
      </div>
    </section>
  );
}

function FeaturedProducersSection({ section }: { section: PageSection }) {
  return (
    <section className="lpv-container py-14 md:py-24">
      <SectionHeader
        eyebrow={section.eyebrow ?? "À connaître"}
        title={section.title ?? "Les producteurs à garder en tête."}
        description={section.description}
      />

      <div className="grid gap-4 md:grid-cols-3">
        {(section.producers ?? []).map((producer) => (
          <ProducerMiniCard key={producer._id} producer={producer} />
        ))}
      </div>
    </section>
  );
}

function SommelierCtaSection({ section }: { section: PageSection }) {
  return (
    <section className="lpv-container py-14 md:py-24">
      <div className="relative overflow-hidden rounded-[2.75rem] border border-[var(--lpv-border)] bg-[var(--lpv-ink)] p-8 text-white md:p-14">
        <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative grid gap-12 md:grid-cols-[1fr_0.75fr] md:items-end">
          <div>
            {section.eyebrow && (
              <p className="mb-6 text-[10px] uppercase tracking-[0.44em] text-white/45">
                {section.eyebrow}
              </p>
            )}

            <h2 className="lpv-display max-w-4xl text-[clamp(4rem,8vw,9rem)] leading-[0.8] tracking-[-0.08em]">
              {section.title}
            </h2>
          </div>

          <div>
            {section.description && (
              <p className="mb-8 text-base leading-8 text-white/58">
                {section.description}
              </p>
            )}

            <Link
              href={section.href ?? "/sommelier"}
              className="inline-flex rounded-full bg-white px-7 py-3 text-xs uppercase tracking-[0.22em] text-[var(--lpv-ink)] transition duration-500 hover:bg-[var(--lpv-sand)]"
            >
              {section.buttonLabel ?? "Demander"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderSection(section: PageSection, index: number) {
  const key = section._key ?? `${section.sectionType}-${index}`;

  switch (section.sectionType) {
    case "hero":
      return <HeroSection key={key} section={section} />;

    case "imageMosaic":
      return <ImageMosaicSection key={key} section={section} />;

    case "editorialGrid":
      return <EditorialGridSection key={key} section={section} />;

    case "feature":
      return <FeatureSection key={key} section={section} />;

    case "quote":
      return (
        <QuoteBlock
          key={key}
          quote={section.title ?? ""}
          caption={section.eyebrow}
        />
      );

    case "featuredWines":
      return <FeaturedWinesSection key={key} section={section} />;

    case "featuredProducers":
      return <FeaturedProducersSection key={key} section={section} />;

    case "sommelierCta":
      return <SommelierCtaSection key={key} section={section} />;

    default:
      return null;
  }
}

export function PageBuilder({ sections = [] }: PageBuilderProps) {
  if (sections.length === 0) return null;

  return <>{sections.map(renderSection)}</>;
}
