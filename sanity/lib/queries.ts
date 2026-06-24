import { client } from "./client";

export async function getArticles() {
  return client.fetch(`
    *[_type == "article" && published == true && defined(slug.current)] | order(featured desc, publishedAt desc, _createdAt desc){
      "id": _id,
      "slug": slug.current,
      title,
      excerpt,
      "category": coalesce(category, "Journal"),
      "featured": coalesce(featured, false),
      "coverImage": coverImage.asset->url,
      author,
      publishedAt,
      "createdAt": _createdAt
    }
  `);
}

export async function getArticle(slug: string) {
  return client.fetch(
    `
    *[_type == "article" && published == true && slug.current == $slug][0]{
      "id": _id,
      "slug": slug.current,
      title,
      excerpt,
      content,
      "coverImage": coverImage.asset->url,
      "category": coalesce(category, "Journal"),
      author,
      "tagsJson": string::join(tags, ","),
      tags,
      publishedAt,
      "createdAt": _createdAt,
      seoTitle,
      seoDescription
    }
    `,
    { slug }
  );
}

export async function getRelatedArticles(slug: string, category?: string | null) {
  return client.fetch(
    `
    *[
      _type == "article" &&
      published == true &&
      defined(slug.current) &&
      slug.current != $slug &&
      (!defined($category) || category == $category)
    ] | order(featured desc, publishedAt desc, _createdAt desc)[0...3]{
      "id": _id,
      "slug": slug.current,
      title,
      excerpt,
      "category": coalesce(category, "Journal"),
      "coverImage": coverImage.asset->url,
      publishedAt,
      "createdAt": _createdAt
    }
    `,
    { slug, category }
  );
}

export async function getWines() {
  return client.fetch(`
    *[_type == "wine" && defined(slug.current)] | order(featured desc, title asc){
      "id": _id,
      "slug": slug.current,
      title,
      vintage,
      summary,
      color,
      style,
      price,
      currency,
      format,
      featured,
      "image": mainImage.asset->url,
      "producer": producer->name,
      "country": country->name,
      "region": region->name,
      "appellation": appellation->name,
      "grapes": grapes[]->name
    }
  `);
}

export async function getWine(slug: string) {
  return client.fetch(
    `
    *[_type == "wine" && slug.current == $slug][0]{
      "id": _id,
      "slug": slug.current,
      title,
      vintage,
      status,
      summary,
      description,
      color,
      style,
      culture,
      aromas,
      flavors,
      body,
      acidity,
      tannins,
      sweetness,
      alcohol,
      servingTemperature,
      agingPotential,
      finish,
      price,
      currency,
      format,
      availability,
      externalCode,
      privateImport,
      whyWeLoveIt,
      sommelierTip,
      occasions,
      seasons,
      featured,
      seoTitle,
      seoDescription,
      "image": mainImage.asset->url,
      "gallery": gallery[].asset->url,
      "producer": producer->{
        name,
        "slug": slug.current
      },
      "country": country->{
        name,
        "slug": slug.current
      },
      "region": region->{
        name,
        "slug": slug.current
      },
      "appellation": appellation->{
        name,
        "slug": slug.current
      },
      "grapes": grapes[]->{
        name,
        "slug": slug.current
      }
    }
    `,
    { slug }
  );
}