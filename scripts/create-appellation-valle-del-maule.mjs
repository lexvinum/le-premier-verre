import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const id = "appellation-valle-del-maule";

if (await client.getDocument(id)) {
  throw new Error("L’appellation Valle del Maule existe déjà.");
}

await client.create({
  _id: id,
  _type: "appellation",
  name: "Valle del Maule",
  slug: {
    _type: "slug",
    current: "valle-del-maule"
  },
  region: {
    _type: "reference",
    _ref: "region-valle-del-maule"
  }
});

console.log("✓ Appellation Valle del Maule créée");
