"use client";

import type { SearchResult } from "@/types/search";
import { SearchItem } from "./SearchItem";

const typeLabels: Record<string, string> = {
  wine: "Vins",
  producer: "Producteurs",
  vineyard: "Vignobles",
  country: "Pays",
  region: "Régions",
  appellation: "Appellations",
  grape: "Cépages",
  article: "Journal",
  guide: "Guides",
};

export function SearchResults({
  results,
  onNavigate,
}: {
  results?: SearchResult[];
  onNavigate?: () => void;
}) {
  if (!results?.length) {
    return (
      <div className="border-t border-[var(--lpv-line)] px-5 py-20 text-center md:px-8">
        <p className="lpv-kicker text-[var(--lpv-cocoa)]">
          Aucun résultat
        </p>

        <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
          Rien dans la bibliothèque.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
          Essaie avec un nom de vin, un producteur, une région ou un terme plus
          général.
        </p>
      </div>
    );
  }

  const grouped = results.reduce<Record<string, SearchResult[]>>(
    (accumulator, result) => {
      accumulator[result._type] ||= [];
      accumulator[result._type].push(result);
      return accumulator;
    },
    {}
  );

  return (
    <div className="border-t border-[var(--lpv-line)]">
      <div className="px-5 py-5 md:px-8">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--lpv-muted)]">
          {results.length} résultat{results.length > 1 ? "s" : ""}
        </p>
      </div>

      {Object.entries(grouped).map(([type, items]) => (
        <section
          key={type}
          className="grid border-t border-[var(--lpv-line)] md:grid-cols-[0.25fr_0.75fr]"
        >
          <div className="px-5 py-6 md:px-8">
            <p className="lpv-kicker text-[var(--lpv-cocoa)]">
              {typeLabels[type] || type}
            </p>
          </div>

          <div className="border-t border-[var(--lpv-line)] md:border-l md:border-t-0">
            {items.map((item, index) => (
              <SearchItem
                key={item._id}
                result={item}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
