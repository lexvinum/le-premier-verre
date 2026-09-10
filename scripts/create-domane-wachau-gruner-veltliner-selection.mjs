import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-domane-wachau");
const appellation = await client.getDocument("appellation-wachau");
const grunerVeltliner = await client.getDocument("grape-gruner-veltliner");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Domäne Wachau introuvables.");
}

if (!appellation || !grunerVeltliner) {
  throw new Error("Appellation Wachau ou Grüner Veltliner introuvable.");
}

const id = "wine-domane-wachau-gruner-veltliner-selection";

if (await client.getDocument(id)) {
  throw new Error("La fiche Domäne Wachau Grüner Veltliner Selection existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Domäne Wachau Grüner Veltliner Selection",

  slug: {
    _type: "slug",
    current: "domane-wachau-gruner-veltliner-selection"
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
      _key: "gruner-veltliner",
      _type: "reference",
      _ref: grunerVeltliner._id
    }
  ],

  approxPrice: 21.10,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/13750089",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un blanc autrichien sec et vif, entre pomme verte, citron et poivre blanc, avec cette fraîcheur croquante typique du Grüner Veltliner.",

  tastingKeywords: [
    "pomme verte",
    "citron",
    "poivre blanc",
    "minéral",
    "vif"
  ],

  perfectFor: [
    "Apéro",
    "Poisson",
    "Légumes"
  ],

  whyWeRecommend: "Parce qu’il permet de découvrir facilement le Grüner Veltliner dans un style net, sec et rafraîchissant. Son mélange de fruit croquant, de minéralité et de poivre blanc lui donne beaucoup de personnalité sans le rendre compliqué.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Blanc sec, léger, vif et minéral",

  aromas: [
    "Pomme Granny Smith",
    "Citron",
    "Poivre blanc",
    "Notes minérales"
  ],

  flavors: [
    "Pomme verte",
    "Agrumes",
    "Citron",
    "Poivre blanc"
  ],

  texture: "Légère, tendue et croquante",
  finish: "Fraîche, minérale et légèrement poivrée",

  intensity: 3,
  complexity: 3,
  acidity: 5,
  oakInfluence: 1,

  alcohol: 12.5,
  sugar: "<1,2 g/L",

  bottleSize: "750 ml",
  sku: "13750089",

  occasionTags: [
    "Apéro",
    "Poisson",
    "Fruits de mer",
    "Légumes",
    "Repas léger"
  ],

  aiSummary: "Domäne Wachau Grüner Veltliner Selection est un blanc autrichien sec, léger et vif, marqué par la pomme verte, le citron, la minéralité et le poivre blanc.",

  seoTitle: "Domäne Wachau Grüner Veltliner Selection | Le Premier Verre",
  seoDescription: "Découvrez Domäne Wachau Grüner Veltliner Selection, un blanc autrichien sec et vif aux notes de pomme verte, citron et poivre blanc.",

  published: false
});

console.log("✓ Domäne Wachau Grüner Veltliner Selection créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Aucun millésime figé");
console.log("✓ Fiche laissée en brouillon");
