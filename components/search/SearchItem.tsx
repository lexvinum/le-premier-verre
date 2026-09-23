"use client";

import Link from "next/link";
import type { SearchResult } from "@/types/search";
import {
  buildSearchHref,
  getSearchTypeLabel,
  type SearchLocale,
} from "@/lib/search/search-utils";

export function SearchItem({
  result,
  index,
  onNavigate,
  locale = "fr",
}: {
  result: SearchResult;
  index: number;
  onNavigate?: () => void;
  locale?: SearchLocale;
}) {
  return (
    <Link
      href={buildSearchHref(result, locale)}
      onClick={onNavigate}
      className="group grid grid-cols-[42px_1fr_24px] items-center gap-4 border-b border-[var(--lpv-line)] px-5 py-6 transition-opacity last:border-b-0 hover:opacity-55 md:px-8"
    >
      <span className="text-[0.6rem] tracking-[0.16em] text-[var(--lpv-muted)]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <p className="lpv-kicker text-[var(--lpv-cocoa)]">
          {getSearchTypeLabel(result._type, locale)}
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
