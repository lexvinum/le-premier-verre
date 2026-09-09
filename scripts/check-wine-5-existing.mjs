import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const checks = [
  ["country", "Canada"],
  ["region", "Québec"],
  ["region", "Cantons-de-l'Est"],
  ["appellation", "IGP Vin du Québec"],
  ["grape", "Seyval"],
  ["grape", "Vidal"],
  ["producer", "Vignoble de l'Orpailleur"],
  ["vineyard", "Vignoble de l'Orpailleur"],
  ["wine", "L'Orpailleur Brut"],
];

for (const [type, name] of checks) {
  const docs = await client.fetch(
    `*[
      _type == $type &&
      (
        lower(name) == lower($name) ||
        lower(slug.current) == lower($slug)
      )
    ]{
      _id,
      _type,
      name,
      "slug": slug.current
    }`,
    {
      type,
      name,
      slug: name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }
  );

  console.log("");
  console.log(`=== ${type}: ${name} ===`);

  if (!docs.length) {
    console.log("AUCUN — à créer");
  } else {
    for (const doc of docs) {
      console.log(
        `EXISTE — ${doc._id} — ${doc.name || "(sans nom)"} — slug: ${doc.slug || "(aucun)"}`
      );
    }
  }
}
