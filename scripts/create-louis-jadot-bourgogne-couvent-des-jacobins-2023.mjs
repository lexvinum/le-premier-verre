import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-louis-jadot");
const appellation = await client.getDocument("appellation-bourgogne");
const pinotNoir = await client.getDocument("grape-pinot-noir");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Louis Jadot introuvables.");
}

if (!appellation || !pinotNoir) {
  throw new Error("Appellation Bourgogne ou Pinot noir introuvable.");
}

const id = "wine-louis-jadot-bourgogne-couvent-des-jacobins-2023";

if (await client.getDocument(id)) {
  throw new Error("La fiche Louis Jadot Bourgogne Couvent des Jacobins 2023 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Louis Jadot Bourgogne Couvent des Jacobins",

  slug: {
    _type: "slug",
    current: "louis-jadot-bourgogne-couvent-des-jacobins-2023"
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
      _key: "pinot-noir",
      _type: "reference",
      _ref: pinotNoir._id
    }
  ],

  approxPrice: 33.00,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/966804",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Bourgogne rouge délicat et classique, tout en cerise, griotte et fraîcheur, avec une touche minérale et un boisé discret.",

  tastingKeywords: [
    "cerise",
    "griotte",
    "floral",
    "minéral",
    "fraîcheur"
  ],

  perfectFor: [
    "Volaille rôtie",
    "Porc",
    "Souper élégant"
  ],

  whyWeRecommend: "Parce qu’il offre une porte d’entrée très lisible vers le Pinot noir bourguignon : du fruit rouge, de la fraîcheur, une texture délicate et juste assez de boisé pour lui donner de la profondeur sans masquer le vin.",

  body: 3,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, délicat, fruité et légèrement boisé",

  aromas: [
    "Cerise",
    "Griotte",
    "Notes florales",
    "Notes minérales"
  ],

  flavors: [
    "Cerise",
    "Griotte",
    "Fruits rouges",
    "Minéral"
  ],

  texture: "Délicate et souple",
  finish: "Fraîche, fruitée et légèrement minérale",

  intensity: 3,
  complexity: 3,
  acidity: 4,
  tannins: 2,
  oakInfluence: 2,

  alcohol: 13,
  sugar: "2,2 g/L",

  bottleSize: "750 ml",
  sku: "966804",

  occasionTags: [
    "Souper élégant",
    "Volaille",
    "Porc",
    "Fromages",
    "Entre amis"
  ],

  aiSummary: "Louis Jadot Bourgogne Couvent des Jacobins 2023 est un Pinot noir bourguignon sec et délicat aux notes de cerise, de griotte, de fleurs et de minéralité.",

  seoTitle: "Louis Jadot Bourgogne Couvent des Jacobins 2023 | Le Premier Verre",
  seoDescription: "Découvrez le Bourgogne Couvent des Jacobins 2023 de Louis Jadot, un Pinot noir délicat aux notes de cerise, griotte et minéralité.",

  published: false
});

console.log("✓ Louis Jadot Bourgogne Couvent des Jacobins 2023 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Données basées sur le produit SAQ 966804");
console.log("✓ Fiche laissée en brouillon");
