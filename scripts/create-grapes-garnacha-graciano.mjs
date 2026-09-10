import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const grapes = [
  {
    _id: "grape-garnacha",
    _type: "grape",
    name: "Garnacha",
    slug: {
      _type: "slug",
      current: "garnacha"
    }
  },
  {
    _id: "grape-graciano",
    _type: "grape",
    name: "Graciano",
    slug: {
      _type: "slug",
      current: "graciano"
    }
  }
];

for (const grape of grapes) {
  const existing = await client.getDocument(grape._id);

  if (existing) {
    console.log(`✓ ${grape.name} existe déjà`);
    continue;
  }

  await client.create(grape);
  console.log(`✓ ${grape.name} créé`);
}
