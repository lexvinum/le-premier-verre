import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-08-15",
});

await client
  .patch("55a9fe9a-b3fe-41d6-8145-6adca1a818a8")
  .set({
    mapPolygon: [
      {
        _type: "mapPoint",
        _key: "p1",
        latitude: 45.43,
        longitude: -73.05,
      },
      {
        _type: "mapPoint",
        _key: "p2",
        latitude: 45.40,
        longitude: -72.65,
      },
      {
        _type: "mapPoint",
        _key: "p3",
        latitude: 45.30,
        longitude: -72.20,
      },
      {
        _type: "mapPoint",
        _key: "p4",
        latitude: 45.02,
        longitude: -71.95,
      },
      {
        _type: "mapPoint",
        _key: "p5",
        latitude: 44.78,
        longitude: -72.15,
      },
      {
        _type: "mapPoint",
        _key: "p6",
        latitude: 44.72,
        longitude: -72.55,
      },
      {
        _type: "mapPoint",
        _key: "p7",
        latitude: 44.80,
        longitude: -72.95,
      },
      {
        _type: "mapPoint",
        _key: "p8",
        latitude: 45.05,
        longitude: -73.10,
      },
    ],
  })
  .commit();

console.log("✅ Polygone Cantons-de-l’Est enregistré dans Sanity.");
