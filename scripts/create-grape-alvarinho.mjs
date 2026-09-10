import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const id = "grape-alvarinho";

if (await client.getDocument(id)) {
  throw new Error("Le cépage Alvarinho existe déjà.");
}

await client.create({
  _id: id,
  _type: "grape",
  name: "Alvarinho",
  slug: {
    _type: "slug",
    current: "alvarinho"
  }
});

console.log("✓ Cépage Alvarinho créé");
