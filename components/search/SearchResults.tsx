"use client";

import { SearchResult } from "@/types/search";
import { SearchItem } from "./SearchItem";

export function SearchResults({
  results,
}: {
  results?: SearchResult[];
}) {
  if (!results?.length) {
    return (
      <div className="p-10 text-center text-neutral-500">
        Aucun résultat.
      </div>
    );
  }

  const grouped = Object.groupBy(
    results,
    (result) => result._type
  );

  return (
    <div className="max-h-[550px] overflow-y-auto border-t">
      {Object.entries(grouped).map(([type, items]) => (
        <section
          key={type}
          className="border-b last:border-b-0"
        >
          <h3 className="bg-neutral-50 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {type}
          </h3>

          {items?.map((item) => (
            <SearchItem
              key={item._id}
              result={item}
            />
          ))}
        </section>
      ))}
    </div>
  );
}