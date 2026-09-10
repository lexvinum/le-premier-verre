import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const id = "grape-xarello";

if (await client.getDocument(id)) {
  throw new Error("Le cépage Xarel·lo existe déjà.");
}

await client.create({
  _id: id,
  _type: "grape",
  name: "Xarel·lo",
  slug: {
    _type: "slug",
    current: "xarello"
  }
});

console.log("✓ Cépage Xarel·lo créé");
