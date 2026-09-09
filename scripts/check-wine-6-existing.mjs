import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const checks = [
  ["country", "Italie"],
  ["region", "Vénétie"],
  ["appellation", "Valpolicella"],
  ["grape", "Corvina Veronese"],
  ["grape", "Rondinella"],
  ["grape", "Corvinone"],
  ["producer", "Zenato"],
  ["producer", "Zenato Azienda Vitivinicola"],
  ["wine", "Zenato Valpolicella Superiore"],
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
