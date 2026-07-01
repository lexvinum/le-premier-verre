export type SearchType =
  | "wine"
  | "producer"
  | "vineyard"
  | "country"
  | "region"
  | "appellation"
  | "grape"
  | "article"
  | "guide";

export interface SearchResult {
  _id: string;
  _type: SearchType;
  title: string;
  slug: string;
}
