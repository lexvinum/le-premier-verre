import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const docs = [
  {
    _id: "country-chili",
    _type: "country",
    name: "Chili",
    slug: {
      _type: "slug",
      current: "chili"
    }
  },
  {
    _id: "region-valle-central",
    _type: "region",
    name: "Valle Central",
    slug: {
      _type: "slug",
      current: "valle-central"
    },
    country: {
      _type: "reference",
      _ref: "country-chili"
    }
  },
  {
    _id: "region-valle-del-maule",
    _type: "region",
    name: "Valle del Maule",
    slug: {
      _type: "slug",
      current: "valle-del-maule"
    },
    country: {
      _type: "reference",
      _ref: "country-chili"
    }
  },
  {
    _id: "grape-carmenere",
    _type: "grape",
    name: "Carmenère",
    slug: {
      _type: "slug",
      current: "carmenere"
    }
  }
];

for (const doc of docs) {
  const existing = await client.getDocument(doc._id);

  if (existing) {
    console.log(`↪ ${doc.name} existe déjà`);
    continue;
  }

  await client.create(doc);
  console.log(`✓ ${doc.name} créé`);
}
