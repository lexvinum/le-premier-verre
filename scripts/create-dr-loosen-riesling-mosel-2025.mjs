import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-dr-loosen");
const appellation = await client.getDocument("appellation-mosel");
const riesling = await client.getDocument("grape-riesling");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Dr. Loosen introuvables.");
}

if (!appellation || !riesling) {
  throw new Error("Appellation Mosel ou Riesling introuvable.");
}

const id = "wine-dr-loosen-riesling-mosel-2025";

if (await client.getDocument(id)) {
  throw new Error("La fiche Dr. Loosen Riesling Mosel 2025 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Dr. Loosen Riesling Mosel",

  slug: {
    _type: "slug",
    current: "dr-loosen-riesling-mosel-2025"
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
      _key: "riesling",
      _type: "reference",
      _ref: riesling._id
    }
  ],

  approxPrice: 19.85,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/10685251",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Riesling allemand léger et très aromatique, où la douceur du fruit est équilibrée par une acidité vive et rafraîchissante.",

  tastingKeywords: [
    "pêche",
    "agrumes",
    "pomme",
    "fruité",
    "fraîcheur"
  ],

  perfectFor: [
    "Cuisine asiatique",
    "Apéro",
    "Plats épicés"
  ],

  whyWeRecommend: "Parce qu’il montre très bien l’équilibre classique d’un Riesling de Mosel : peu d’alcool, beaucoup de fruit, une douceur assumée et une acidité suffisamment vive pour garder l’ensemble frais et digeste.",

  body: 2,
  sweetness: 4,
  roundness: 3,

  servingTemperature: "8–10 °C",
  decant: false,

  style: "Blanc fruité, doux, léger et vif",

  aromas: [
    "Pêche",
    "Agrumes",
    "Pomme",
    "Fruits à chair blanche"
  ],

  flavors: [
    "Pêche",
    "Pomme",
    "Agrumes",
    "Fruits mûrs"
  ],

  texture: "Légère, souple et fraîche",
  finish: "Fruitée, vive et légèrement douce",

  intensity: 3,
  complexity: 3,
  acidity: 5,
  oakInfluence: 1,

  alcohol: 8.5,
  sugar: "44 g/L",

  bottleSize: "750 ml",
  sku: "10685251",

  occasionTags: [
    "Cuisine asiatique",
    "Plats épicés",
    "Apéro",
    "Brunch",
    "Repas léger"
  ],

  aiSummary: "Dr. Loosen Riesling Mosel 2025 est un Riesling allemand léger, fruité et doux, marqué par une vive acidité et un faible degré d’alcool.",

  seoTitle: "Dr. Loosen Riesling Mosel 2025 | Le Premier Verre",
  seoDescription: "Découvrez Dr. Loosen Riesling Mosel 2025, un blanc allemand fruité, doux et vif à faible teneur en alcool.",

  published: false
});

console.log("✓ Dr. Loosen Riesling Mosel 2025 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Millésime 2025 conservé");
console.log("✓ Fiche laissée en brouillon");
