import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";

const BASE_URL = "https://www.lepremierverre.com";

type SlugDocument = {
  slug?: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/vins`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/producteurs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bonnes-adresses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/ce-soir`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const documents = await client.fetch<{
    wines: SlugDocument[];
    producers: SlugDocument[];
    places: SlugDocument[];
    guides: SlugDocument[];
    articles: SlugDocument[];
    pages: SlugDocument[];
  }>(`{
    "wines": *[_type == "wine" && published == true]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "producers": *[_type == "producer" && published == true]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "places": *[_type == "place" && published == true]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "guides": *[_type == "guide" && published == true]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "articles": *[_type == "article" && published == true]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    },
    "pages": *[_type == "page" && published == true]{
      "slug": slug.current,
      "updatedAt": _updatedAt
    }
  }`);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...documents.wines.map((item) => ({
      url: `${BASE_URL}/vins/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...documents.producers.map((item) => ({
      url: `${BASE_URL}/producteurs/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...documents.places.map((item) => ({
      url: `${BASE_URL}/bonnes-adresses/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...documents.guides.map((item) => ({
      url: `${BASE_URL}/guides/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...documents.articles.map((item) => ({
      url: `${BASE_URL}/blog/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...documents.pages.map((item) => ({
      url: `${BASE_URL}/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ].filter((item) => !item.url.endsWith("/undefined"));

  const uniqueRoutes = new Map(
    [...staticRoutes, ...dynamicRoutes].map((route) => [route.url, route])
  );

  return [...uniqueRoutes.values()];
}
