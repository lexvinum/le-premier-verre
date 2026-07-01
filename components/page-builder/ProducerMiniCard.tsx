import Link from "next/link";
import { EditorialImage } from "./EditorialImage";
import type { BuilderProducer } from "./types";

export function ProducerMiniCard({
  producer,
}: {
  producer: BuilderProducer;
}) {
  return (
    <Link
      href={`/producteurs/${producer.slug}`}
      className="group lpv-soft-border lpv-shadow block overflow-hidden rounded-[2.25rem] bg-[rgba(251,247,239,0.86)] p-3 transition duration-700 hover:-translate-y-1 md:p-4"
    >
      <div className="lpv-image-zoom rounded-[1.85rem] bg-[var(--lpv-surface-2)]">
        <EditorialImage
          image={producer.heroImage ?? producer.photo}
          alt={producer.name ?? "Producteur"}
          className="h-[380px] rounded-[1.85rem] md:h-[470px]"
        />
      </div>

      <div className="px-2 pb-3 pt-7 md:px-4 md:pb-5">
        <p className="mb-4 text-[10px] uppercase tracking-[0.36em] text-[var(--lpv-muted)]">
          {[producer.region?.name, producer.country?.name]
            .filter(Boolean)
            .join(" · ") || "Producteur"}
        </p>

        <h3 className="lpv-display text-[clamp(2.8rem,4vw,4.8rem)] leading-[0.82] tracking-[-0.07em] text-[var(--lpv-ink)]">
          {producer.name}
        </h3>

        {producer.shortBio && (
          <p className="mt-5 line-clamp-3 text-sm leading-7 text-[var(--lpv-muted)]">
            {producer.shortBio}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-[var(--lpv-border)] pt-5 text-xs uppercase tracking-[0.22em] text-[var(--lpv-muted)]">
          <span>Portrait</span>
          <span className="transition duration-500 group-hover:translate-x-1 group-hover:text-[var(--lpv-ink)]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
