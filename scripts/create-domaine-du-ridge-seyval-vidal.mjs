import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("bb61af16-e4c6-42ad-968c-edd0752d054c");
const appellation = await client.getDocument("appellation-igp-vin-du-quebec");
const seyval = await client.getDocument("grape-seyval-blanc");
const vidal = await client.getDocument("grape-vidal");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références du Domaine du Ridge introuvables.");
}

if (!appellation || !seyval || !vidal) {
  throw new Error("Appellation ou cépages requis introuvables.");
}

const id = "wine-domaine-du-ridge-seyval-vidal";

if (await client.getDocument(id)) {
  throw new Error("La fiche Domaine du Ridge Seyval-Vidal existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Domaine du Ridge Seyval-Vidal",

  slug: {
    _type: "slug",
    current: "domaine-du-ridge-seyval-vidal"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  color: "white",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "seyval-blanc",
      _type: "reference",
      _ref: seyval._id
    },
    {
      _key: "vidal",
      _type: "reference",
      _ref: vidal._id
    }
  ],

  approxPrice: 21.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/15378233",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un blanc québécois léger et vif où la poire rencontre l’ananas, la pêche et une belle fraîcheur d’agrumes.",

  tastingKeywords: [
    "poire",
    "ananas",
    "pêche",
    "agrumes",
    "fraîcheur"
  ],

  perfectFor: [
    "Apéro",
    "Sushis",
    "Ceviche"
  ],

  whyWeRecommend: "Parce qu’il offre une introduction très accessible aux blancs québécois : sec, léger, fruité et vif, avec un assemblage simple de Seyval et de Vidal qui fonctionne particulièrement bien à l’apéro et avec les poissons crus.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Blanc sec, léger, vif et fruité",

  aromas: [
    "Agrumes",
    "Ananas",
    "Pêche",
    "Poire"
  ],

  flavors: [
    "Agrumes",
    "Ananas",
    "Pêche",
    "Poire"
  ],

  texture: "Délicate et légère",
  finish: "Fraîche et vive",

  intensity: 3,
  complexity: 2,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 10.2,
  sugar: "<1,2 g/L",

  bottleSize: "750 ml",
  sku: "15378233",

  occasionTags: [
    "Apéro",
    "Sushis",
    "Poisson",
    "Repas léger"
  ],

  aiSummary: "Domaine du Ridge Seyval-Vidal est un blanc québécois sec et léger composé à parts égales de Seyval et de Vidal.",

  seoTitle: "Domaine du Ridge Seyval-Vidal | Le Premier Verre",
  seoDescription: "Découvrez le Seyval-Vidal du Domaine du Ridge, un blanc québécois sec, léger et vif aux notes de poire, d’ananas et de pêche.",

  published: false
});

console.log("✓ Domaine du Ridge Seyval-Vidal créé");
console.log("✓ Données analytiques basées sur le produit SAQ 15378233");
console.log("✓ Aucun millésime incertain ajouté");
console.log("✓ Fiche laissée en brouillon");
