import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-martin-codax");
const appellation = await client.getDocument("appellation-rias-baixas");
const albarino = await client.getDocument("grape-albarino");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Martín Códax introuvables.");
}

if (!appellation || !albarino) {
  throw new Error("Appellation Rías Baixas ou Albariño introuvable.");
}

const id = "wine-martin-codax-albarino-rias-baixas-2025";

if (await client.getDocument(id)) {
  throw new Error("La fiche Martín Códax Albariño Rías Baixas 2025 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Martín Códax Albariño Rías Baixas",

  slug: {
    _type: "slug",
    current: "martin-codax-albarino-rias-baixas-2025"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  vintage: 2025,
  color: "white",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "albarino",
      _type: "reference",
      _ref: albarino._id
    }
  ],

  approxPrice: 27.15,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/15409183",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Albariño lumineux et salivant, tout en pêche, agrumes et fleurs blanches, avec cette fraîcheur qui appelle les fruits de mer.",

  tastingKeywords: [
    "pêche",
    "agrumes",
    "fleurs blanches",
    "fraîcheur",
    "salin"
  ],

  perfectFor: [
    "Fruits de mer",
    "Poisson",
    "Apéro"
  ],

  whyWeRecommend: "Parce qu’il offre une lecture très claire de l’Albariño : aromatique sans être lourd, frais, vif et facile à accorder. C’est une excellente bouteille pour découvrir les blancs atlantiques de Galice.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Blanc sec, vif, aromatique et frais",

  aromas: [
    "Pêche",
    "Agrumes",
    "Fleurs blanches",
    "Notes végétales"
  ],

  flavors: [
    "Pêche",
    "Citron",
    "Agrumes",
    "Fruits à chair blanche"
  ],

  texture: "Légère, vive et fraîche",
  finish: "Nette, fraîche et légèrement saline",

  intensity: 3,
  complexity: 3,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 12.5,
  sugar: "5,3 g/L",

  bottleSize: "750 ml",
  sku: "15409183",

  occasionTags: [
    "Apéro",
    "Fruits de mer",
    "Poisson",
    "Sushis",
    "Repas léger"
  ],

  aiSummary: "Martín Códax Albariño Rías Baixas 2025 est un blanc espagnol 100 % Albariño, sec, vif et aromatique, aux notes de pêche, d’agrumes et de fleurs blanches.",

  seoTitle: "Martín Códax Albariño Rías Baixas 2025 | Le Premier Verre",
  seoDescription: "Découvrez Martín Códax Albariño Rías Baixas 2025, un blanc espagnol vif et aromatique aux notes de pêche, agrumes et fleurs blanches.",

  published: false
});

console.log("✓ Martín Códax Albariño Rías Baixas 2025 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Millésime 2025 conservé");
console.log("✓ Fiche laissée en brouillon");
