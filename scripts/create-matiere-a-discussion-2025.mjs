import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-domaine-du-nival");
const appellation = await client.getDocument("appellation-igp-vin-du-quebec");
const grape = await client.getDocument("grape-vidal");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références du Domaine du Nival introuvables.");
}

if (!appellation || !grape) {
  throw new Error("Appellation IGP Vin du Québec ou cépage Vidal introuvable.");
}

const id = "wine-domaine-du-nival-matiere-a-discussion-2025";

if (await client.getDocument(id)) {
  throw new Error("La fiche Matière à discussion 2025 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Domaine du Nival Matière à discussion",
  slug: {
    _type: "slug",
    current: "domaine-du-nival-matiere-a-discussion-2025"
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
      _key: "vidal",
      _type: "reference",
      _ref: grape._id
    }
  ],

  approxPrice: 28.75,
  purchaseChannel: "producer",
  purchaseChannelDetails: "Boutique du Domaine du Nival — bouteille et magnum",
  purchaseUrl: "https://www.nival.ca/collections/disponible/products/matiere-a-discussion-2025",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Vidal québécois sec, précis et vivant, porté par la poire, la pêche et une finale fraîche au zeste de pamplemousse.",

  tastingKeywords: [
    "poire",
    "pêche",
    "floral",
    "épices",
    "pamplemousse"
  ],

  perfectFor: [
    "Apéro",
    "Poisson",
    "Cuisine végétale"
  ],

  whyWeRecommend: "Parce qu’il montre une facette particulièrement précise et gastronomique du Vidal québécois. Frais et croquant, il conserve beaucoup de personnalité tout en restant facile à mettre à table.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "9–11 °C",
  decant: false,

  style: "Blanc sec, frais, précis et légèrement texturé",

  aromas: [
    "Poire",
    "Pêche",
    "Fleurs",
    "Épices",
    "Zeste de pamplemousse"
  ],

  flavors: [
    "Poire",
    "Pêche",
    "Agrumes",
    "Pamplemousse"
  ],

  texture: "Fraîche, croquante et légèrement texturée",
  finish: "Longue, fraîche et légèrement amère",
  intensity: 3,
  complexity: 3,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 10.6,
  sugar: "0 g/L",

  isOrganic: true,

  harvestMethod: "manual",

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
          text: "Macération pré-fermentaire de 48 heures après foulage au pied des grappes entières. Pressurage, léger débourbage statique, puis fermentation avec levures indigènes en fûts de chêne neutres à une température maximale de 20 °C. Fermentation malolactique complétée naturellement."
        }
      ]
    }
  ],

  aging: "Élevage de 8 mois en fûts neutres sur lies grossières avec quelques bâtonnages. Mise en bouteille sans filtration ni collage en juillet 2026.",

  soil: "Sol argileux",

  bottleSize: "750 ml",

  occasionTags: [
    "Apéro",
    "Poisson",
    "Cuisine végétale",
    "Repas entre amis"
  ],

  aiSummary: "Matière à discussion 2025 du Domaine du Nival est un Vidal québécois sec et biologique, fermenté avec levures indigènes en fûts neutres puis élevé huit mois sur lies.",

  seoTitle: "Matière à discussion 2025 | Domaine du Nival | Le Premier Verre",
  seoDescription: "Découvrez Matière à discussion 2025 du Domaine du Nival, un Vidal québécois biologique, sec, frais et précis.",

  published: false
});

console.log("✓ Matière à discussion 2025 créé");
console.log("✓ Schéma Sanity respecté");
console.log("✓ Fiche laissée en brouillon");
