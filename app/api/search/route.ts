import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const query = `
  *[
    (
      _type == "wine" ||
      _type == "producer" ||
      _type == "vineyard" ||
      _type == "country" ||
      _type == "region" ||
      _type == "appellation" ||
      _type == "grape" ||
      _type == "article" ||
      _type == "guide"
    )
    &&
    (
      name match $search + "*" ||
      title match $search + "*"
    )
  ][0...20]{
    _id,
    _type,
    "title": coalesce(title, name),
    "slug": slug.current
  }
  `;

  const results = await client.fetch(query, {
    search: q,
  });

  return NextResponse.json(results);
}
