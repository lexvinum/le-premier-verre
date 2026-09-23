"use client";

import type { SearchResult } from "@/types/search";
import { SearchItem } from "./SearchItem";

const typeLabelsFr: Record<string, string> = {
  wine: "Bouteilles",
  producer: "Producteurs",
  country: "Pays",
  region: "Régions",
  grape: "Cépages",
  article: "Journal",
  guide: "Guides",
};

const typeLabelsEn: Record<string, string> = {
  wine: "Bottles",
  producer: "Producers",
  country: "Countries",
  region: "Regions",
  grape: "Grapes",
  article: "Journal",
  guide: "Guides",
};

export function SearchResults({
  results,
  onNavigate,
  locale = "fr",
}: {
  results?: SearchResult[];
  onNavigate?: () => void;
  locale?: "fr" | "en";
}) {
  const isEn = locale === "en";
  const typeLabels = isEn ? typeLabelsEn : typeLabelsFr;
  if (!results?.length) {
    return (
      <div className="border-t border-[var(--lpv-line)] px-5 py-20 text-center md:px-8">
        <p className="lpv-kicker text-[var(--lpv-cocoa)]">
          {isEn ? "No results" : "Aucun résultat"}
        </p>

        <h2 className="lpv-display mt-6 text-5xl leading-[0.9] md:text-7xl">
          {isEn ? "Nothing in the library." : "Rien dans la bibliothèque."}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[var(--lpv-muted)]">
          {isEn
            ? "Try a bottle, producer, region or a broader search term."
            : "Essaie avec une bouteille, un producteur, une région ou un terme plus général."}
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
          {results.length}{" "}
          {isEn
            ? `result${results.length !== 1 ? "s" : ""}`
            : `résultat${results.length > 1 ? "s" : ""}`}
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
                locale={locale}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
