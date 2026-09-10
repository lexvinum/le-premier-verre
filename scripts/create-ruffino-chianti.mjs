import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-ruffino");
const appellation = await client.getDocument("appellation-chianti");
const sangiovese = await client.getDocument("grape-sangiovese");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Ruffino introuvables.");
}

if (!appellation || !sangiovese) {
  throw new Error("Appellation Chianti ou Sangiovese introuvable.");
}

const id = "wine-ruffino-chianti";

if (await client.getDocument(id)) {
  throw new Error("La fiche Ruffino Chianti existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Ruffino Chianti",

  slug: {
    _type: "slug",
    current: "ruffino-chianti"
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
      _key: "sangiovese",
      _type: "reference",
      _ref: sangiovese._id
    }
  ],

  approxPrice: 17.60,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/1743",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Chianti simple, fruité et vivant, parfait pour comprendre le charme du Sangiovese sans se compliquer la vie.",

  tastingKeywords: [
    "fruits rouges",
    "cerise",
    "floral",
    "herbes",
    "fraîcheur"
  ],

  perfectFor: [
    "Pizza",
    "Pâtes tomate",
    "Souper de semaine"
  ],

  whyWeRecommend: "Parce qu’il représente très bien le côté convivial du Chianti : du fruit rouge, de la fraîcheur, une structure modérée et une facilité à table qui en font une bouteille idéale pour découvrir le Sangiovese.",

  body: 3,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, fruité, frais et mi-corsé",

  aromas: [
    "Fruits rouges",
    "Cerise",
    "Notes florales",
    "Herbes"
  ],

  flavors: [
    "Cerise",
    "Petits fruits rouges",
    "Herbes",
    "Épices douces"
  ],

  texture: "Souple et fraîche",
  finish: "Fruitée et légèrement herbacée",

  intensity: 3,
  complexity: 2,
  acidity: 4,
  tannins: 3,
  oakInfluence: 1,

  alcohol: 13,
  sugar: "2,1 g/L",

  bottleSize: "750 ml",
  sku: "1743",

  occasionTags: [
    "Pizza",
    "Pâtes",
    "Souper de semaine",
    "Entre amis",
    "Cuisine italienne"
  ],

  aiSummary: "Ruffino Chianti est un rouge toscan sec et accessible dominé par le Sangiovese, avec des notes de fruits rouges, de cerise et une belle fraîcheur.",

  seoTitle: "Ruffino Chianti | Le Premier Verre",
  seoDescription: "Découvrez Ruffino Chianti, un rouge toscan accessible dominé par le Sangiovese, fruité, frais et facile à accorder.",

  published: false
});

console.log("✓ Ruffino Chianti créé");
console.log("✓ Aucun millésime incertain ajouté");
console.log("✓ Sangiovese utilisé comme cépage principal confirmé");
console.log("✓ Fiche laissée en brouillon");
