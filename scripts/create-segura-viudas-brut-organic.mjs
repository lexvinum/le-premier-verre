import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-segura-viudas");
const appellation = await client.getDocument("appellation-cava");
const macabeo = await client.getDocument("grape-macabeo");
const parellada = await client.getDocument("grape-parellada");
const xarello = await client.getDocument("grape-xarello");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Segura Viudas introuvables.");
}

if (!appellation || !macabeo || !parellada || !xarello) {
  throw new Error("Appellation Cava ou cépages requis introuvables.");
}

const id = "wine-segura-viudas-brut-organic";

if (await client.getDocument(id)) {
  throw new Error("La fiche Segura Viudas Brut Organic existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Segura Viudas Brut Organic",

  slug: {
    _type: "slug",
    current: "segura-viudas-brut-organic"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  color: "sparkling",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "macabeo",
      _type: "reference",
      _ref: macabeo._id
    },
    {
      _key: "parellada",
      _type: "reference",
      _ref: parellada._id
    },
    {
      _key: "xarello",
      _type: "reference",
      _ref: xarello._id
    }
  ],

  approxPrice: 17.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/15416560",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Cava bio sec et frais, aux notes de citron, de craie et de fleurs, avec des bulles fines et une belle énergie à petit prix.",

  tastingKeywords: [
    "citron",
    "craie",
    "floral",
    "bulles fines",
    "frais"
  ],

  perfectFor: [
    "Apéro",
    "Brunch",
    "Fruits de mer"
  ],

  whyWeRecommend: "Parce qu’il offre tout ce qu’on cherche dans un bon mousseux accessible : de la fraîcheur, des bulles nettes, un profil sec et une vraie polyvalence à table. C’est aussi une belle porte d’entrée vers le Cava bio.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Mousseux sec, frais, vif et minéral",

  aromas: [
    "Citron",
    "Craie",
    "Fleurs blanches",
    "Fruits frais"
  ],

  flavors: [
    "Agrumes",
    "Citron",
    "Pomme",
    "Notes minérales"
  ],

  texture: "Bulles fines, texture vive et légère",
  finish: "Fraîche, sèche et citronnée",

  intensity: 3,
  complexity: 3,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 11.5,
  sugar: "8,8 g/L",

  aging: "Environ 12 à 15 mois sur lies.",

  isOrganic: true,

  bottleSize: "750 ml",
  sku: "15416560",

  occasionTags: [
    "Apéro",
    "Brunch",
    "Fruits de mer",
    "Célébration",
    "Repas léger"
  ],

  aiSummary: "Segura Viudas Brut Organic est un Cava bio sec et frais élaboré à partir de Macabeo, Parellada et Xarel·lo, avec des notes de citron, de craie et de fleurs.",

  seoTitle: "Segura Viudas Brut Organic | Le Premier Verre",
  seoDescription: "Découvrez Segura Viudas Brut Organic, un Cava bio sec, frais et accessible aux notes de citron, de craie et de fleurs.",

  published: false
});

console.log("✓ Segura Viudas Brut Organic créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Cépages ajoutés sans pourcentages");
console.log("✓ Fiche laissée en brouillon");
