import type { SearchResult, SearchType } from "@/types/search";

export function buildSearchHref(item: SearchResult): string {
  switch (item._type) {
    case "wine":
      return `/vins/${item.slug}`;
    case "producer":
      return `/producteurs/${item.slug}`;
    case "vineyard":
      return `/vignobles/${item.slug}`;
    case "country":
      return `/pays/${item.slug}`;
    case "region":
      return `/regions/${item.slug}`;
    case "appellation":
      return `/appellations/${item.slug}`;
    case "grape":
      return `/cepages/${item.slug}`;
    case "article":
      return `/blog/${item.slug}`;
    case "guide":
      return `/guides/${item.slug}`;
    default:
      return "/";
  }
}

export function getSearchTypeLabel(type: SearchType): string {
  switch (type) {
    case "wine":
      return "Vin";
    case "producer":
      return "Producteur";
    case "vineyard":
      return "Vignoble";
    case "country":
      return "Pays";
    case "region":
      return "Région";
    case "appellation":
      return "Appellation";
    case "grape":
      return "Cépage";
    case "article":
      return "Article";
    case "guide":
      return "Guide";
    default:
      return "Contenu";
  }
}
