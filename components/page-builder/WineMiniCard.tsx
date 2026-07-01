import Link from "next/link";
import { EditorialImage } from "./EditorialImage";
import type { BuilderWine } from "./types";

export function WineMiniCard({ wine }: { wine: BuilderWine }) {
  return (
    <Link
      href={`/vins/${wine.slug}`}
      className="group lpv-soft-border lpv-shadow block overflow-hidden rounded-[2.25rem] bg-[rgba(251,247,239,0.86)] p-3 transition duration-700 hover:-translate-y-1 md:p-4"
    >
      <div className="lpv-image-zoom rounded-[1.85rem] bg-[var(--lpv-surface-2)]">
        <EditorialImage
          image={wine.bottleImage}
          alt={wine.name ?? "Vin"}
          className="h-[360px] rounded-[1.85rem] md:h-[430px]"
        />
      </div>

      <div className="px-2 pb-3 pt-7 md:px-4 md:pb-5">
        <p className="mb-4 text-[10px] uppercase tracking-[0.36em] text-[var(--lpv-muted)]">
          {wine.region?.name ?? wine.color ?? "Vin"}
        </p>

        <h3 className="lpv-display text-[clamp(2.6rem,4vw,4.5rem)] leading-[0.82] tracking-[-0.07em] text-[var(--lpv-ink)]">
          {wine.name}
        </h3>

        <p className="mt-5 min-h-6 text-sm text-[var(--lpv-muted)]">
          {[wine.producer?.name, wine.vintage].filter(Boolean).join(" · ")}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-[var(--lpv-border)] pt-5 text-xs uppercase tracking-[0.22em] text-[var(--lpv-muted)]">
          <span>Fiche vin</span>
          <span className="transition duration-500 group-hover:translate-x-1 group-hover:text-[var(--lpv-ink)]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
