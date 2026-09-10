import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const wineIds = [
  "wine-les-pervenches-seyval-chardo-2025",
  "wine-domaine-du-nival-matiere-a-discussion-2025",
  "wine-domaine-du-nival-ces-petits-imprevus-2025",
  "wine-domaine-du-ridge-seyval-vidal",
  "wine-domaine-du-ridge-lucy-k",
  "wine-domaine-du-ridge-le-litre-du-ridge",
  "wine-famille-perrin-cotes-du-rhone-signature-2023",
  "wine-louis-jadot-bourgogne-couvent-des-jacobins-2023",
  "wine-william-fevre-chablis-les-champs-royaux-2023",
  "wine-mouton-cadet-bordeaux-rouge",
  "wine-ruffino-chianti",
  "wine-masi-campofiorin-verona",
  "wine-pieropan-soave-classico-2024",
  "wine-campo-viejo-tempranillo-rioja",
  "wine-martin-codax-albarino-rias-baixas-2025",
  "wine-aveleda-fonte-vinho-verde",
  "wine-casa-ferreirinha-papa-figos-douro-2024",
  "wine-dr-loosen-riesling-mosel-2025",
  "wine-domane-wachau-gruner-veltliner-selection-2024",
  "wine-segura-viudas-brut-organic"
];

for (const id of wineIds) {
  const existing = await client.getDocument(id);

  if (existing) {
    await client.delete(id);
    console.log(`− ${existing.name || id} supprimé`);
  } else {
    console.log(`○ ${id} déjà absent`);
  }
}

console.log("");
console.log(`✓ ${wineIds.length} fiches vérifiées`);
console.log("✓ Les pays, régions, appellations, cépages et producteurs sont conservés");
