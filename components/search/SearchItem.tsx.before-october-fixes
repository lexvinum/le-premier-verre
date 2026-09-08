"use client";

import Link from "next/link";
import { SearchResult } from "@/types/search";

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

const icons: Record<SearchResult["_type"], string> = {
  wine: "🍷",
  producer: "👨‍🌾",
  vineyard: "🍇",
  country: "🌍",
  region: "📍",
  appellation: "🏷️",
  grape: "🍇",
  article: "📰",
  guide: "📚",
};

export function SearchItem({
  result,
}: {
  result: SearchResult;
}) {
  return (
    <Link
      href={`${routes[result._type]}/${result.slug}`}
      className="flex items-center justify-between rounded-lg px-5 py-3 transition hover:bg-neutral-100"
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icons[result._type]}</span>

        <div>
          <div className="font-medium">{result.title}</div>

          <div className="text-xs uppercase tracking-wider text-neutral-500">
            {result._type}
          </div>
        </div>
      </div>

      <span className="text-neutral-300">↵</span>
    </Link>
  );
}