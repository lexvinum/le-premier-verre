import type { SearchResult, SearchType } from "@/types/search";

export type SearchLocale = "fr" | "en";

export function buildSearchHref(
  item: SearchResult,
  locale: SearchLocale = "fr"
): string {
  const routes =
    locale === "en"
      ? {
          wine: "/en/wines",
          producer: "/en/producers",
          country: "/en/regions",
          region: "/en/regions",
          grape: "/en/grapes",
          article: "/en/journal",
          guide: "/en/guides",
        }
      : {
          wine: "/vins",
          producer: "/producteurs",
          country: "/regions",
          region: "/regions",
          grape: "/cepages",
          article: "/blog",
          guide: "/guides",
        };

  return `${routes[item._type]}/${item.slug}`;
}

export function getSearchTypeLabel(
  type: SearchType,
  locale: SearchLocale = "fr"
): string {
  const labels =
    locale === "en"
      ? {
          wine: "Bottle",
          producer: "Producer",
          country: "Country",
          region: "Region",
          grape: "Grape",
          article: "Article",
          guide: "Guide",
        }
      : {
          wine: "Bouteille",
          producer: "Producteur",
          country: "Pays",
          region: "Région",
          grape: "Cépage",
          article: "Article",
          guide: "Guide",
        };

  return labels[type] || (locale === "en" ? "Content" : "Contenu");
}
