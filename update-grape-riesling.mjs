import { getCliClient } from "sanity/cli";

const client = getCliClient();

await client
  .patch("grape-riesling")
  .set({
    color: "white",

    oneLiner:
      "Le blanc à choisir quand tu veux quelque chose de vif, aromatique et précis, avec une belle fraîcheur.",

    aromas: [
      "Citron",
      "Pomme verte",
      "Pêche",
      "Fleurs blanches",
    ],

    body: 2,
    acidity: 5,
    tannins: 1,

    servingTemperature: "8–10 °C",

    simplePairings: [
      "Sushi",
      "Poisson grillé",
      "Cuisine asiatique",
      "Fromage de chèvre",
    ],

    mainRegions: [
      {
        _type: "reference",
        _key: "alsace",
        _ref: "region-alsace",
      },
    ],

    tryNext: [
      {
        _type: "grapeSuggestion",
        _key: "seyval-blanc",
        grape: {
          _type: "reference",
          _ref: "grape-seyval-blanc",
        },
        reason:
          "Pour rester dans les blancs frais et vifs, avec un profil droit et désaltérant.",
      },
      {
        _type: "grapeSuggestion",
        _key: "vidal",
        grape: {
          _type: "reference",
          _ref: "grape-vidal",
        },
        reason:
          "Pour son fruit expressif, sa fraîcheur et son côté aromatique.",
      },
    ],

    seoTitle: "Riesling : profil, arômes et accords | Le Premier Verre",

    seoDescription:
      "Découvre le Riesling : un cépage blanc vif et aromatique, ses arômes typiques, ses accords, ses régions et les vins à essayer.",

    published: true,
  })
  .commit();

console.log("✅ Fiche Riesling LPV complétée et publiée.");
