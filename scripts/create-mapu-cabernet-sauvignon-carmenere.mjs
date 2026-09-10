import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-baron-philippe-de-rothschild");
const country = await client.getDocument("country-chili");
const region = await client.getDocument("region-valle-del-maule");
const appellation = await client.getDocument("appellation-valle-del-maule");
const cabernetSauvignon = await client.getDocument("grape-cabernet-sauvignon");
const carmenere = await client.getDocument("grape-carmenere");

if (!producer || !country || !region || !appellation || !cabernetSauvignon || !carmenere) {
  throw new Error("Une ou plusieurs références requises sont introuvables.");
}

const id = "wine-mapu-cabernet-sauvignon-carmenere";

if (await client.getDocument(id)) {
  throw new Error("La fiche Mapu Cabernet-Sauvignon/Carmenère existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Mapu Cabernet-Sauvignon/Carmenère",

  slug: {
    _type: "slug",
    current: "mapu-cabernet-sauvignon-carmenere"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  color: "red",

  country: {
    _type: "reference",
    _ref: country._id
  },

  region: {
    _type: "reference",
    _ref: region._id
  },

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "cabernet-sauvignon",
      _type: "reference",
      _ref: cabernetSauvignon._id
    },
    {
      _key: "carmenere",
      _type: "reference",
      _ref: carmenere._id
    }
  ],

  approxPrice: 11.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/10530283",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un rouge chilien souple et généreux, rempli de fruits noirs, d’épices et d’eucalyptus, à un prix franchement difficile à battre.",

  tastingKeywords: [
    "fruits noirs",
    "eucalyptus",
    "épices",
    "souple",
    "généreux"
  ],

  perfectFor: [
    "Burger",
    "Grillades",
    "Souper de semaine"
  ],

  whyWeRecommend: "Parce qu’il fait exactement ce qu’un bon vin de tous les jours devrait faire : être savoureux, facile à boire, polyvalent à table et vraiment abordable. À ce prix, c’est une excellente façon de découvrir le duo Cabernet-Sauvignon et Carmenère chilien.",

  body: 3,
  sweetness: 1,
  roundness: 4,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, mi-corsé, souple et généreux",

  aromas: [
    "Fruits noirs",
    "Eucalyptus",
    "Épices",
    "Notes végétales"
  ],

  flavors: [
    "Mûre",
    "Cassis",
    "Épices",
    "Herbes"
  ],

  texture: "Souple et généreuse",
  finish: "Fruitée, épicée et légèrement végétale",

  intensity: 3,
  complexity: 2,
  acidity: 3,
  tannins: 3,
  oakInfluence: 2,

  alcohol: 13.5,
  sugar: "2,2 g/L",

  bottleSize: "750 ml",
  sku: "10530283",

  occasionTags: [
    "Burger",
    "Grillades",
    "BBQ",
    "Souper de semaine",
    "Petit budget"
  ],

  aiSummary: "Mapu Cabernet-Sauvignon/Carmenère est un rouge chilien sec, souple et généreux aux notes de fruits noirs, d’eucalyptus et d’épices, offert à un prix très accessible.",

  seoTitle: "Mapu Cabernet-Sauvignon/Carmenère | Le Premier Verre",
  seoDescription: "Découvrez Mapu Cabernet-Sauvignon/Carmenère, un rouge chilien souple et généreux aux notes de fruits noirs, d’eucalyptus et d’épices.",

  published: false
});

console.log("✓ Mapu Cabernet-Sauvignon/Carmenère créé");
console.log("✓ Chili + Valle del Maule utilisés");
console.log("✓ Cabernet Sauvignon + Carmenère ajoutés");
console.log("✓ 30e vin créé et laissé en brouillon");
