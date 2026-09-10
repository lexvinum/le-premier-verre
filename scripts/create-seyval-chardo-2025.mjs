import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.fetch(
  `*[_type == "producer" && _id == "producer-les-pervenches"][0]{
    _id,
    country,
    region
  }`
);

const appellation = await client.fetch(
  `*[_type == "appellation" && _id == "appellation-igp-vin-du-quebec"][0]{_id}`
);

const seyval = await client.fetch(
  `*[_type == "grape" && _id == "grape-seyval-blanc"][0]{_id}`
);

const chardonnay = await client.fetch(
  `*[_type == "grape" && _id == "grape-chardonnay"][0]{_id}`
);

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Producteur Les Pervenches ou ses références pays/région introuvables.");
}

if (!appellation?._id || !seyval?._id || !chardonnay?._id) {
  throw new Error("Appellation ou cépages requis introuvables.");
}

const id = "wine-les-pervenches-seyval-chardo-2025";

const existing = await client.getDocument(id);

if (existing) {
  throw new Error("La fiche Seyval Chardo 2025 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Les Pervenches Seyval Chardo",
  slug: {
    _type: "slug",
    current: "les-pervenches-seyval-chardo-2025"
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
      _key: "seyval-blanc",
      _type: "reference",
      _ref: seyval._id
    },
    {
      _key: "chardonnay",
      _type: "reference",
      _ref: chardonnay._id
    }
  ],

  approxPrice: 29.89,
  purchaseChannel: "producer",
  purchaseChannelDetails: "Boutique du producteur — actuellement non disponible",
  purchaseUrl: "https://lespervenches.com/collections/frontpage/products/seyval-chardo-2025",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un blanc québécois ample et vibrant où le fruit mûr rencontre une tension d’agrumes qui garde chaque gorgée bien éveillée.",

  tastingKeywords: [
    "ananas",
    "mangue",
    "poire",
    "agrumes",
    "épices"
  ],

  perfectFor: [
    "Apéro qui s’étire",
    "Poisson grillé",
    "Souper entre amis"
  ],

  whyWeRecommend: "Parce qu’il montre à quel point un assemblage de Seyval et de Chardonnay peut être à la fois mûr, texturé et énergique au Québec. Un vin de caractère qui demeure vivant et digeste.",

  body: 3,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "9–11 °C",
  decant: false,

  style: "Blanc sec, texturé, fruité et vibrant",

  aromas: [
    "Ananas",
    "Mangue",
    "Poire",
    "Agrumes",
    "Épices"
  ],

  flavors: [
    "Fruits tropicaux",
    "Poire",
    "Agrumes"
  ],

  texture: "Ample, souple et tendue",
  finish: "Longue, fraîche et salivante",
  intensity: 3,
  complexity: 3,
  acidity: 4,
  oakInfluence: 2,

  alcohol: 12.3,

  isOrganic: true,
  isBiodynamic: true,

  harvestMethod: "Vendanges manuelles, avec tri soigné en deux passages.",

  vinification: "Seyval fermenté avec levures spontanées à partir d’un assemblage de macérations pelliculaires de 4 jours, de macération carbonique de grappes entières de 10 jours et de pressurage direct. Chardonnay en pressurage direct de grappes entières. Assemblage et soutirage en mars 2026. Aucun intrant ni SO₂ ajouté.",

  aging: "Fermentation et élevage sur lies en fûts de chêne français de 225 L pendant environ 6 mois. Mise en bouteille sans ajout de SO₂ en mai 2026.",

  soil: "Shefford loam sableux et Rubicon loam sableux",

  bottleSize: "750 ml",

  occasionTags: [
    "Apéro",
    "Poisson",
    "Repas entre amis",
    "Cuisine végétale"
  ],

  aiSummary: "Les Pervenches Seyval Chardo 2025 est un blanc québécois biologique et biodynamique élaboré à partir de Seyval et de Chardonnay, élevé sur lies en fûts de chêne français.",

  seoTitle: "Les Pervenches Seyval Chardo 2025 | Le Premier Verre",
  seoDescription: "Découvrez Seyval Chardo 2025 des Pervenches, un blanc québécois de Seyval et Chardonnay, biologique et biodynamique.",

  published: false
});

console.log("✓ Seyval Chardo 2025 créé");
console.log("✓ Producteur, pays, région, appellation et cépages existants réutilisés");
console.log("✓ Fiche laissée en brouillon");
