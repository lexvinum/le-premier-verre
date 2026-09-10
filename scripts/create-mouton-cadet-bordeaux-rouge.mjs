import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-baron-philippe-de-rothschild");
const appellation = await client.getDocument("appellation-bordeaux");
const merlot = await client.getDocument("grape-merlot");
const cabernetSauvignon = await client.getDocument("grape-cabernet-sauvignon");
const cabernetFranc = await client.getDocument("grape-cabernet-franc");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Baron Philippe de Rothschild introuvables.");
}

if (!appellation || !merlot || !cabernetSauvignon || !cabernetFranc) {
  throw new Error("Appellation Bordeaux ou cépages requis introuvables.");
}

const id = "wine-mouton-cadet-bordeaux-rouge";

if (await client.getDocument(id)) {
  throw new Error("La fiche Mouton Cadet Bordeaux rouge existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Mouton Cadet Bordeaux Rouge",

  slug: {
    _type: "slug",
    current: "mouton-cadet-bordeaux-rouge"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  color: "red",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "merlot",
      _type: "reference",
      _ref: merlot._id
    },
    {
      _key: "cabernet-sauvignon",
      _type: "reference",
      _ref: cabernetSauvignon._id
    },
    {
      _key: "cabernet-franc",
      _type: "reference",
      _ref: cabernetFranc._id
    }
  ],

  approxPrice: 18.45,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/943",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Bordeaux accessible et classique, souple, fruité et légèrement boisé, parfait pour découvrir le style sans se compliquer la vie.",

  tastingKeywords: [
    "fruits rouges",
    "boisé",
    "épices",
    "végétal",
    "souplesse"
  ],

  perfectFor: [
    "Boeuf",
    "Burger",
    "Souper de semaine"
  ],

  whyWeRecommend: "Parce qu’il offre un profil bordelais facile à comprendre et à aimer : beaucoup de Merlot pour la souplesse, un peu de Cabernet pour la structure, et un prix qui en fait une bonne bouteille d’introduction à Bordeaux.",

  body: 3,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, mi-corsé, souple et légèrement boisé",

  aromas: [
    "Fruits rouges",
    "Notes boisées",
    "Notes végétales",
    "Épices"
  ],

  flavors: [
    "Fruits rouges",
    "Cassis",
    "Épices",
    "Boisé"
  ],

  texture: "Souple et équilibrée",
  finish: "Fruitée, légèrement boisée et épicée",

  intensity: 3,
  complexity: 2,
  acidity: 3,
  tannins: 3,
  oakInfluence: 2,

  alcohol: 14.5,
  sugar: "2,9 g/L",

  aging: "Élevage d’environ 10 mois en cuves sur lies.",

  bottleSize: "750 ml",
  sku: "943",

  occasionTags: [
    "Souper de semaine",
    "Burger",
    "Boeuf",
    "Pizza",
    "Entre amis"
  ],

  aiSummary: "Mouton Cadet Bordeaux Rouge est un Bordeaux accessible dominé par le Merlot, complété par le Cabernet-Sauvignon et le Cabernet Franc, avec un profil souple, fruité et légèrement boisé.",

  seoTitle: "Mouton Cadet Bordeaux Rouge | Le Premier Verre",
  seoDescription: "Découvrez Mouton Cadet Bordeaux Rouge, un Bordeaux accessible à base de Merlot, Cabernet-Sauvignon et Cabernet Franc, souple et fruité.",

  published: false
});

console.log("✓ Mouton Cadet Bordeaux Rouge créé");
console.log("✓ Aucun millésime incertain ajouté");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Fiche laissée en brouillon");
