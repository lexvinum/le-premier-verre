import { getCliClient } from "sanity/cli";

const client = getCliClient();

await client
  .patch("grape-gamay")
  .set({
    color: "red",

    oneLiner:
      "Le rouge à sortir quand tu veux du fruit, de la fraîcheur et quelque chose qui se boit sans effort.",

    aromas: [
      "Cerise rouge",
      "Framboise",
      "Violette",
      "Poivre",
    ],

    body: 2,
    acidity: 4,
    tannins: 2,

    servingTemperature: "13–15 °C",

    simplePairings: [
      "Charcuteries",
      "Poulet rôti",
      "Pizza",
      "Saumon grillé",
    ],

    mainRegions: [
      {
        _type: "reference",
        _key: "beaujolais",
        _ref: "region-beaujolais",
      },
    ],

    tryNext: [
      {
        _type: "grapeSuggestion",
        _key: "pinot-noir",
        grape: {
          _type: "reference",
          _ref: "grape-pinot-noir",
        },
        reason:
          "Pour rester dans les rouges frais et délicats, avec un peu plus de finesse et de structure.",
      },
      {
        _type: "grapeSuggestion",
        _key: "zweigelt",
        grape: {
          _type: "reference",
          _ref: "grape-zweigelt",
        },
        reason:
          "Pour son fruit éclatant, sa fraîcheur et son côté facile à boire.",
      },
    ],

    seoTitle: "Gamay : profil, arômes et accords | Le Premier Verre",

    seoDescription:
      "Découvre le Gamay : un cépage rouge léger et frais, ses arômes typiques, ses accords, ses régions et les vins à essayer.",

    published: true,
  })
  .commit();

console.log("✅ Fiche Gamay LPV complétée et publiée.");
