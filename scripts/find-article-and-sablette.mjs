import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

console.log("\n================ ARTICLES EXISTANTS ================\n");

const articles = await client.fetch(`
  *[_type == "article"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    published,
    publishedAt
  }
`);

if (!articles.length) {
  console.log("AUCUN ARTICLE TROUVÉ");
} else {
  console.dir(articles, { depth: null });
}

console.log("\n================ RECHERCHE SABLETTE ================\n");

const sablette = await client.fetch(`
  *[
    _type == "wine" &&
    (
      lower(name) match "*sablette*" ||
      lower(slug.current) match "*sablette*"
    )
  ]{
    _id,
    name,
    "slug": slug.current,
    published,
    producer->{
      _id,
      name,
      "slug": slug.current
    },
    country->{
      _id,
      name,
      "slug": slug.current
    },
    region->{
      _id,
      name,
      "slug": slug.current
    },
    appellation->{
      _id,
      name,
      "slug": slug.current
    },
    grapes[]->{
      _id,
      name,
      "slug": slug.current
    },
    vineyard->{
      _id,
      name,
      "slug": slug.current
    }
  }
`);

if (!sablette.length) {
  console.log("AUCUN VIN CONTENANT « SABLETTE »");
} else {
  console.dir(sablette, { depth: null });
}
