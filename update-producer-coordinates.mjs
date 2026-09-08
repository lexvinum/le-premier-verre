import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2026-09-02" });

const producers = [
  {
    id: "producer-pinard-et-filles",
    latitude: 45.2306848,
    longitude: -72.2233455,
  },
  {
    id: "producer-les-pervenches",
    latitude: 45.2481333,
    longitude: -72.9363710,
  },
  {
    id: "producer-domaine-du-nival",
    latitude: 45.8403288,
    longitude: -72.9584949,
  },
];

for (const producer of producers) {
  await client
    .patch(producer.id)
    .set({
      latitude: producer.latitude,
      longitude: producer.longitude,
    })
    .commit();

  console.log(`✅ ${producer.id}`);
}

console.log("✅ Coordonnées des trois producteurs enregistrées dans Sanity.");
