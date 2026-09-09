import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const articleSlug =
  "comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin";

const article = await client.fetch(
  `*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    published,
    featured
  }`,
  { slug: articleSlug }
);

console.log("\n================ ARTICLE ================");
console.log(article || "ARTICLE INTROUVABLE");

const wineSearches = [
  "La Sablette",
  "Lois Grüner Veltliner",
  "Georges Duboeuf Brouilly",
  "Vidal-Fleury Côtes-du-Rhône",
  "L'Orpailleur Brut",
  "Zenato Valpolicella Superiore",
];

console.log("\n================ VINS ====================");

for (const name of wineSearches) {
  const docs = await client.fetch(
    `*[_type == "wine" && lower(name) == lower($name)]{
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
    }`,
    { name }
  );

  console.log(`\n--- ${name} ---`);

  if (!docs.length) {
    console.log("INTROUVABLE");
  } else {
    console.dir(docs, { depth: null });
  }
}
