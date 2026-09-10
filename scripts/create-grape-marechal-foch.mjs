import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const id = "grape-marechal-foch";

if (await client.getDocument(id)) {
  console.log("✓ Maréchal Foch existe déjà");
  process.exit(0);
}

await client.create({
  _id: id,
  _type: "grape",
  name: "Maréchal Foch",
  slug: {
    _type: "slug",
    current: "marechal-foch"
  }
});

console.log("✓ Cépage Maréchal Foch créé");
