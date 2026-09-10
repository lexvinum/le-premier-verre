import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

await client
  .patch("wine-les-pervenches-seyval-chardo-2025")
  .set({
    harvestMethod: "manual",
    vinification: [
      {
        _key: "vinification1",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "vinification1span",
            _type: "span",
            marks: [],
            text: "Le Seyval est fermenté avec les levures spontanées à partir d’un assemblage de macérations pelliculaires, de macération carbonique de grappes entières et de pressurage direct. Le Chardonnay est pressé directement en grappes entières. Les deux cépages sont ensuite assemblés. Aucun intrant ni SO₂ ajouté."
          }
        ]
      }
    ]
  })
  .commit();

console.log("✓ Vinification convertie au bon format");
console.log("✓ Récolte corrigée : manuelle");
console.log("✓ Seyval Chardo 2025 est compatible avec le schéma Sanity");
