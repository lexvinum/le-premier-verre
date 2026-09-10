import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-pieropan");
const appellation = await client.getDocument("appellation-soave");
const garganega = await client.getDocument("grape-garganega");
const trebbiano = await client.getDocument("grape-trebbiano-di-soave");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Pieropan introuvables.");
}

if (!appellation || !garganega || !trebbiano) {
  throw new Error("Appellation Soave ou cépages requis introuvables.");
}

const id = "wine-pieropan-soave-classico";

if (await client.getDocument(id)) {
  throw new Error("La fiche Pieropan Soave Classico existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Pieropan Soave Classico",

  slug: {
    _type: "slug",
    current: "pieropan-soave-classico"
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
      _key: "garganega",
      _type: "reference",
      _ref: garganega._id
    },
    {
      _key: "trebbiano-di-soave",
      _type: "reference",
      _ref: trebbiano._id
    }
  ],

  approxPrice: 21.70,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/11027743",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un blanc italien frais et précis, tout en pomme, agrumes et fleurs blanches, avec une belle trame minérale.",

  tastingKeywords: [
    "pomme",
    "agrumes",
    "fleurs blanches",
    "minéral",
    "fraîcheur"
  ],

  perfectFor: [
    "Poisson",
    "Antipasti",
    "Apéro"
  ],

  whyWeRecommend: "Parce qu’il montre à quel point un blanc italien peut être simple à aimer tout en restant précis. Frais, sec et minéral, il accompagne facilement les poissons, les antipasti et les repas légers.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Blanc sec, frais, floral et minéral",

  aromas: [
    "Pomme",
    "Agrumes",
    "Fleurs blanches",
    "Notes minérales"
  ],

  flavors: [
    "Pomme",
    "Citron",
    "Agrumes",
    "Minéral"
  ],

  texture: "Fine, fraîche et droite",
  finish: "Nette, fraîche et minérale",

  intensity: 3,
  complexity: 3,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 12,
  sugar: "5,2 g/L",

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
          text: "Vinification en cuves, suivie d’un élevage sur lies fines afin de conserver fraîcheur, précision et texture."
        }
      ]
    }
  ],

  aging: "Élevage sur lies fines en cuves de béton vitrifiées.",

  bottleSize: "750 ml",
  sku: "11027743",

  occasionTags: [
    "Apéro",
    "Poisson",
    "Fruits de mer",
    "Cuisine italienne",
    "Repas léger"
  ],

  aiSummary: "Pieropan Soave Classico est un blanc italien biologique à base de Garganega et Trebbiano di Soave, frais, floral et minéral.",

  seoTitle: "Pieropan Soave Classico | Le Premier Verre",
  seoDescription: "Découvrez Pieropan Soave Classico, un blanc italien biologique frais et minéral à base de Garganega et Trebbiano di Soave.",

  published: false
});

console.log("✓ Pieropan Soave Classico créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Vendanges manuelles et élevage sur lies ajoutés");
console.log("✓ Fiche laissée en brouillon");
