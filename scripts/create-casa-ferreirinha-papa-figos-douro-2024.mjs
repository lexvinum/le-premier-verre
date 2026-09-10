import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-casa-ferreirinha");
const appellation = await client.getDocument("appellation-douro");
const tintaRoriz = await client.getDocument("grape-tinta-roriz");
const tintaBarroca = await client.getDocument("grape-tinta-barroca");
const tourigaFranca = await client.getDocument("grape-touriga-franca");
const tourigaNacional = await client.getDocument("grape-touriga-nacional");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Casa Ferreirinha introuvables.");
}

if (!appellation || !tintaRoriz || !tintaBarroca || !tourigaFranca || !tourigaNacional) {
  throw new Error("Appellation Douro ou cépages requis introuvables.");
}

const id = "wine-casa-ferreirinha-papa-figos-douro-2024";

if (await client.getDocument(id)) {
  throw new Error("La fiche Casa Ferreirinha Papa Figos Douro 2024 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Casa Ferreirinha Papa Figos Douro",

  slug: {
    _type: "slug",
    current: "casa-ferreirinha-papa-figos-douro-2024"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  vintage: 2024,
  color: "red",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "tinta-roriz",
      _type: "reference",
      _ref: tintaRoriz._id
    },
    {
      _key: "tinta-barroca",
      _type: "reference",
      _ref: tintaBarroca._id
    },
    {
      _key: "touriga-franca",
      _type: "reference",
      _ref: tourigaFranca._id
    },
    {
      _key: "touriga-nacional",
      _type: "reference",
      _ref: tourigaNacional._id
    }
  ],

  approxPrice: 17.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/13385325",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un rouge du Douro généreux et gourmand, rempli de fruits noirs et d’épices, avec des tanins ronds et juste assez de fraîcheur.",

  tastingKeywords: [
    "fruits noirs",
    "fruits cuits",
    "tabac",
    "épices",
    "générosité"
  ],

  perfectFor: [
    "Grillades",
    "Porc",
    "Burger"
  ],

  whyWeRecommend: "Parce qu’il permet de découvrir les cépages rouges du Douro dans un vin accessible et polyvalent. Le fruit est mûr et généreux, les tanins restent souples et l’ensemble offre beaucoup de caractère pour son prix.",

  body: 3,
  sweetness: 1,
  roundness: 4,

  servingTemperature: "16–18 °C",
  decant: false,

  style: "Rouge sec, généreux, fruité et souple",

  aromas: [
    "Fruits noirs",
    "Fruits cuits",
    "Tabac",
    "Épices"
  ],

  flavors: [
    "Mûre",
    "Prune",
    "Fruits rouges",
    "Épices"
  ],

  texture: "Généreuse avec des tanins ronds",
  finish: "Fruitée, équilibrée et persistante",

  intensity: 4,
  complexity: 3,
  acidity: 3,
  tannins: 3,
  oakInfluence: 2,

  alcohol: 13,
  sugar: "2,2 g/L",

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
          text: "Après égrappage et foulage, les raisins fermentent en cuves inox avec une macération douce et à température contrôlée."
        }
      ]
    }
  ],

  bottleSize: "750 ml",
  sku: "13385325",

  occasionTags: [
    "Grillades",
    "Burger",
    "Porc",
    "Souper de semaine",
    "Entre amis"
  ],

  aiSummary: "Casa Ferreirinha Papa Figos Douro 2024 est un rouge portugais sec et généreux composé de Tinta Roriz, Tinta Barroca, Touriga Franca et Touriga Nacional.",

  seoTitle: "Casa Ferreirinha Papa Figos Douro 2024 | Le Premier Verre",
  seoDescription: "Découvrez Papa Figos Douro 2024 de Casa Ferreirinha, un rouge portugais généreux et souple aux notes de fruits noirs et d’épices.",

  published: false
});

console.log("✓ Casa Ferreirinha Papa Figos Douro 2024 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Assemblage SAQ intégré");
console.log("✓ Fiche laissée en brouillon");
