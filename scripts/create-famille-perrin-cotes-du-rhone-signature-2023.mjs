import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-famille-perrin");
const appellation = await client.getDocument("appellation-cotes-du-rhone");
const grenache = await client.getDocument("grape-grenache");
const syrah = await client.getDocument("grape-syrah");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Famille Perrin introuvables.");
}

if (!appellation || !grenache || !syrah) {
  throw new Error("Appellation Côtes du Rhône ou cépages requis introuvables.");
}

const id = "wine-famille-perrin-cotes-du-rhone-signature-2023";

if (await client.getDocument(id)) {
  throw new Error("La fiche Famille Perrin Côtes du Rhône Signature 2023 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Famille Perrin Côtes du Rhône Signature",

  slug: {
    _type: "slug",
    current: "famille-perrin-cotes-du-rhone-signature-2023"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  vintage: 2023,
  color: "red",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "grenache",
      _type: "reference",
      _ref: grenache._id
    },
    {
      _key: "syrah",
      _type: "reference",
      _ref: syrah._id
    }
  ],

  approxPrice: 20.00,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/918821",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un rouge du Rhône généreux mais facile à boire, rempli de fruits noirs, d’épices et juste assez de structure pour passer à table.",

  tastingKeywords: [
    "cerise noire",
    "mûre",
    "cassis",
    "réglisse",
    "épices"
  ],

  perfectFor: [
    "Poulet rôti",
    "Grillades",
    "Souper de semaine"
  ],

  whyWeRecommend: "Parce qu’il offre une très bonne porte d’entrée vers les rouges du Rhône méridional. Le Grenache apporte le fruit et la souplesse, la Syrah un peu de structure et d’épices, dans un ensemble accessible et polyvalent à table.",

  body: 3,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, fruité, épicé et souple",

  aromas: [
    "Cerise noire",
    "Mûre",
    "Cassis",
    "Réglisse",
    "Épices"
  ],

  flavors: [
    "Fruits noirs",
    "Cerise",
    "Épices",
    "Réglisse"
  ],

  texture: "Souple, ronde et légèrement charnue",
  finish: "Fruitée et épicée",

  intensity: 3,
  complexity: 3,
  acidity: 3,
  tannins: 3,
  oakInfluence: 2,

  alcohol: 13.5,
  sugar: "2,5 g/L",

  isOrganic: true,

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
          text: "Vinification en cuves inox thermorégulées. L’assemblage est composé de 95 % Grenache et 5 % Syrah."
        }
      ]
    }
  ],

  aging: "Élevage d’environ un an, en partie en cuves bois et en partie en cuves inox.",

  bottleSize: "750 ml",
  sku: "918821",

  occasionTags: [
    "Souper de semaine",
    "Grillades",
    "Poulet rôti",
    "Pizza",
    "Entre amis"
  ],

  aiSummary: "Famille Perrin Côtes du Rhône Signature 2023 est un rouge biologique du Rhône composé de 95 % Grenache et 5 % Syrah, fruité, épicé et souple.",

  seoTitle: "Famille Perrin Côtes du Rhône Signature 2023 | Le Premier Verre",
  seoDescription: "Découvrez le Côtes du Rhône Signature 2023 de Famille Perrin, un rouge biologique de Grenache et Syrah, fruité, épicé et accessible.",

  published: false
});

console.log("✓ Famille Perrin Côtes du Rhône Signature 2023 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Schéma Sanity respecté");
console.log("✓ Fiche laissée en brouillon");
