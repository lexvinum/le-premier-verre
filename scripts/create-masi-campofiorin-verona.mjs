import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-masi");
const appellation = await client.getDocument("appellation-rosso-verona-igt");
const corvina = await client.getDocument("grape-corvina");
const rondinella = await client.getDocument("grape-rondinella");
const molinara = await client.getDocument("grape-molinara");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Masi introuvables.");
}

if (!appellation || !corvina || !rondinella || !molinara) {
  throw new Error("Appellation Verona IGT ou cépages requis introuvables.");
}

const id = "wine-masi-campofiorin-verona";

if (await client.getDocument(id)) {
  throw new Error("La fiche Masi Campofiorin Verona existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Masi Campofiorin Verona",

  slug: {
    _type: "slug",
    current: "masi-campofiorin-verona"
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
      _key: "corvina",
      _type: "reference",
      _ref: corvina._id
    },
    {
      _key: "rondinella",
      _type: "reference",
      _ref: rondinella._id
    },
    {
      _key: "molinara",
      _type: "reference",
      _ref: molinara._id
    }
  ],

  approxPrice: 24.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/155051",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un rouge de Vérone généreux et gourmand, rempli de cerise mûre, d’épices et de fruits cuits, avec juste assez de fraîcheur pour rester équilibré.",

  tastingKeywords: [
    "cerise",
    "fruits cuits",
    "épices",
    "boisé",
    "générosité"
  ],

  perfectFor: [
    "Pâtes en sauce",
    "Viandes grillées",
    "Souper réconfortant"
  ],

  whyWeRecommend: "Parce qu’il permet de découvrir une signature très vénitienne sans aller jusqu’à la puissance d’un Amarone. La technique de refermentation sur raisins semi-séchés apporte davantage de profondeur et de gourmandise tout en conservant un vin accessible à table.",

  body: 4,
  sweetness: 1,
  roundness: 4,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, généreux, fruité et épicé",

  aromas: [
    "Cerise mûre",
    "Fruits cuits",
    "Épices",
    "Notes boisées"
  ],

  flavors: [
    "Cerise",
    "Prune",
    "Fruits noirs",
    "Épices"
  ],

  texture: "Ronde, ample et souple",
  finish: "Généreuse, fruitée et épicée",

  intensity: 4,
  complexity: 3,
  acidity: 3,
  tannins: 3,
  oakInfluence: 2,

  alcohol: 13,
  sugar: "5 g/L",

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
          text: "Campofiorin est élaboré selon une technique de double fermentation : le vin refermente sur une proportion de raisins semi-séchés selon le savoir-faire d'appassimento de Masi."
        }
      ]
    }
  ],

  bottleSize: "750 ml",
  sku: "155051",

  occasionTags: [
    "Pâtes",
    "Grillades",
    "Cuisine italienne",
    "Souper réconfortant",
    "Entre amis"
  ],

  aiSummary: "Masi Campofiorin Verona est un rouge vénitien à base de Corvina, Rondinella et Molinara, élaboré avec une refermentation sur raisins semi-séchés pour un style généreux, fruité et épicé.",

  seoTitle: "Masi Campofiorin Verona | Le Premier Verre",
  seoDescription: "Découvrez Masi Campofiorin Verona, un rouge vénitien généreux à base de Corvina, Rondinella et Molinara, aux notes de cerise et d’épices.",

  published: false
});

console.log("✓ Masi Campofiorin Verona créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Vinification ajoutée au format Portable Text");
console.log("✓ Aucun millésime incertain ajouté");
console.log("✓ Fiche laissée en brouillon");
