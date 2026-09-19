import { client } from "@/sanity/lib/client";
import { articlesQuery } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  _createdAt?: string;
};

function escapeXml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await client.fetch<Article[]>(articlesQuery);

  const items = articles
    .filter((article) => article.slug)
    .map((article) => {
      const url = `https://lepremierverre.com/blog/${article.slug}`;
      const date = article.publishedAt || article._createdAt;

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${date ? `<pubDate>${new Date(date).toUTCString()}</pubDate>` : ""}
      <description>${escapeXml(article.excerpt || "")}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Le Premier Verre</title>
    <link>https://lepremierverre.com</link>
    <description>Vins, accords, producteurs, bonnes adresses et découvertes autour du vin.</description>
    <language>fr-CA</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
