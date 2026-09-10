import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-william-fevre");
const appellation = await client.getDocument("appellation-chablis");
const chardonnay = await client.getDocument("grape-chardonnay");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de William Fèvre introuvables.");
}

if (!appellation || !chardonnay) {
  throw new Error("Appellation Chablis ou Chardonnay introuvable.");
}

const id = "wine-william-fevre-chablis-les-champs-royaux-2023";

if (await client.getDocument(id)) {
  throw new Error("La fiche William Fèvre Chablis Les Champs Royaux 2023 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "William Fèvre Chablis Les Champs Royaux",

  slug: {
    _type: "slug",
    current: "william-fevre-chablis-les-champs-royaux-2023"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  vintage: 2023,
  color: "white",

  country: producer.country,
  region: producer.region,

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "chardonnay",
      _type: "reference",
      _ref: chardonnay._id
    }
  ],

  approxPrice: 39.75,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/276436",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Chablis précis et lumineux, tout en citron, pomme croquante et minéralité, avec une fraîcheur qui donne envie d’y revenir.",

  tastingKeywords: [
    "citron",
    "pomme Granny Smith",
    "fleurs blanches",
    "minéral",
    "fraîcheur"
  ],

  perfectFor: [
    "Huîtres",
    "Poisson blanc",
    "Apéro chic"
  ],

  whyWeRecommend: "Parce qu’il montre très clairement ce qui rend Chablis si distinctif : un Chardonnay sans lourdeur, tendu, frais et minéral. C’est une excellente bouteille pour comprendre la région sans tomber dans un style boisé ou opulent.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Blanc sec, vif, minéral et précis",

  aromas: [
    "Citron",
    "Pomme Granny Smith",
    "Fleurs blanches",
    "Notes minérales",
    "Notes lactées"
  ],

  flavors: [
    "Agrumes",
    "Pomme verte",
    "Minéral",
    "Fleurs blanches"
  ],

  texture: "Fine, droite et fraîche",
  finish: "Vive, nette et minérale",

  intensity: 3,
  complexity: 3,
  acidity: 5,
  oakInfluence: 1,

  alcohol: 12.5,
  sugar: "1,3 g/L",

  bottleSize: "750 ml",
  sku: "276436",

  occasionTags: [
    "Huîtres",
    "Fruits de mer",
    "Poisson",
    "Apéro chic",
    "Souper élégant"
  ],

  aiSummary: "William Fèvre Chablis Les Champs Royaux 2023 est un Chardonnay bourguignon sec, vif et minéral, marqué par les agrumes, la pomme verte et les fleurs blanches.",

  seoTitle: "William Fèvre Chablis Les Champs Royaux 2023 | Le Premier Verre",
  seoDescription: "Découvrez Les Champs Royaux 2023 de William Fèvre, un Chablis sec et minéral aux notes de citron, pomme verte et fleurs blanches.",

  published: false
});

console.log("✓ William Fèvre Chablis Les Champs Royaux 2023 créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Données SAQ intégrées");
console.log("✓ Fiche laissée en brouillon");
