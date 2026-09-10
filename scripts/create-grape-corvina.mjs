import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const id = "grape-corvina";

if (await client.getDocument(id)) {
  console.log("✓ Corvina existe déjà");
  process.exit(0);
}

await client.create({
  _id: id,
  _type: "grape",
  name: "Corvina",
  slug: {
    _type: "slug",
    current: "corvina"
  },
  published: false
});

console.log("✓ Cépage Corvina créé");
