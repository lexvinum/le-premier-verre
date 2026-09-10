import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-aveleda");
const appellation = await client.getDocument("appellation-vinho-verde");
const loureiro = await client.getDocument("grape-loureiro");
const arinto = await client.getDocument("grape-arinto");
const trajadura = await client.getDocument("grape-trajadura");
const fernaoPires = await client.getDocument("grape-fernao-pires");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références d’Aveleda introuvables.");
}

if (!appellation || !loureiro || !arinto || !trajadura || !fernaoPires) {
  throw new Error("Appellation Vinho Verde ou cépages requis introuvables.");
}

const id = "wine-aveleda-fonte-vinho-verde-2024";

if (await client.getDocument(id)) {
  throw new Error("La fiche Aveleda Fonte Vinho Verde 2024 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Aveleda Fonte Vinho Verde",

  slug: {
    _type: "slug",
    current: "aveleda-fonte-vinho-verde-2024"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  vintage: 2024,
  color: "white",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "loureiro",
      _type: "reference",
      _ref: loureiro._id
    },
    {
      _key: "arinto",
      _type: "reference",
      _ref: arinto._id
    },
    {
      _key: "trajadura",
      _type: "reference",
      _ref: trajadura._id
    },
    {
      _key: "fernao-pires",
      _type: "reference",
      _ref: fernaoPires._id
    }
  ],

  approxPrice: 13.85,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/5322",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Vinho Verde léger et ultra frais, entre pomme verte, agrumes et craie, avec une petite douceur qui le rend très facile à aimer.",

  tastingKeywords: [
    "pomme verte",
    "agrumes",
    "craie",
    "fraîcheur",
    "léger"
  ],

  perfectFor: [
    "Apéro",
    "Poisson",
    "Terrasse"
  ],

  whyWeRecommend: "Parce qu’il est simple, rafraîchissant et peu alcoolisé, avec juste assez de douceur pour plaire facilement. C’est une excellente bouteille pour découvrir le style Vinho Verde sans intimidation.",

  body: 2,
  sweetness: 2,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Blanc demi-sec, léger, vif et rafraîchissant",

  aromas: [
    "Pomme Granny Smith",
    "Agrumes",
    "Craie"
  ],

  flavors: [
    "Pomme verte",
    "Citron",
    "Agrumes"
  ],

  texture: "Légère, vive et délicate",
  finish: "Fraîche, croquante et légèrement douce",

  intensity: 2,
  complexity: 2,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 9.5,
  sugar: "18 g/L",

  soil: "Sols à dominante granitique.",

  bottleSize: "750 ml",
  sku: "5322",

  occasionTags: [
    "Apéro",
    "Terrasse",
    "Poisson",
    "Fruits de mer",
    "Repas léger"
  ],

  aiSummary: "Aveleda Fonte Vinho Verde 2024 est un blanc portugais léger et vif à base de Loureiro, Arinto, Trajadura et Fernão Pires, marqué par la pomme verte et les agrumes.",

  seoTitle: "Aveleda Fonte Vinho Verde 2024 | Le Premier Verre",
  seoDescription: "Découvrez Aveleda Fonte Vinho Verde 2024, un blanc portugais léger, vif et rafraîchissant aux notes de pomme verte et d’agrumes.",

  published: false
});

console.log("✓ Aveleda Fonte Vinho Verde 2024 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Cépages officiels ajoutés");
console.log("✓ Fiche laissée en brouillon");
