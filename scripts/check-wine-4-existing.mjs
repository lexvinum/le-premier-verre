import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const checks = [
  ["country", "France"],
  ["region", "Vallée du Rhône"],
  ["appellation", "Côtes du Rhône"],
  ["grape", "Grenache"],
  ["grape", "Carignan"],
  ["grape", "Syrah"],
  ["grape", "Mourvèdre"],
  ["producer", "Vidal-Fleury"],
  ["wine", "Vidal-Fleury Côtes-du-Rhône"],
];

for (const [type, name] of checks) {
  const docs = await client.fetch(
    `*[_type == $type && lower(name) == lower($name)]{
      _id,
      _type,
      name,
      "slug": slug.current
    }`,
    { type, name }
  );

  console.log("");
  console.log(`=== ${type}: ${name} ===`);

  if (!docs.length) {
    console.log("AUCUN — à créer");
  } else {
    for (const doc of docs) {
      console.log(`EXISTE — ${doc._id} — slug: ${doc.slug || "(aucun)"}`);
    }
  }
}
