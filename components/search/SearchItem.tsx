"use client";

import Link from "next/link";
import type { SearchResult } from "@/types/search";

const routes: Record<SearchResult["_type"], string> = {
  wine: "/vins",
  producer: "/producteurs",
  vineyard: "/vignobles",
  country: "/pays",
  region: "/regions",
  appellation: "/appellations",
  grape: "/cepages",
  article: "/blog",
  guide: "/guides",
};

const labels: Record<SearchResult["_type"], string> = {
  wine: "Vin",
  producer: "Producteur",
  vineyard: "Vignoble",
  country: "Pays",
  region: "Région",
  appellation: "Appellation",
  grape: "Cépage",
  article: "Article",
  guide: "Guide",
};

export function SearchItem({
  result,
  index,
  onNavigate,
}: {
  result: SearchResult;
  index: number;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={`${routes[result._type]}/${result.slug}`}
      onClick={onNavigate}
      className="group grid grid-cols-[42px_1fr_24px] items-center gap-4 border-b border-[var(--lpv-line)] px-5 py-6 transition-opacity last:border-b-0 hover:opacity-55 md:px-8"
    >
      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <p className="lpv-kicker text-[var(--lpv-cocoa)]">
          {labels[result._type]}
        </p>

        <h3 className="lpv-display mt-3 text-3xl leading-[0.92] md:text-4xl">
          {result.title}
        </h3>
      </div>

      <span className="text-xl transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
