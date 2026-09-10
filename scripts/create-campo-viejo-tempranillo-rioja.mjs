import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("producer-campo-viejo");
const appellation = await client.getDocument("appellation-rioja");
const tempranillo = await client.getDocument("grape-tempranillo");

if (!producer?.country?._ref || !producer?.region?._ref) {
  throw new Error("Références de Campo Viejo introuvables.");
}

if (!appellation || !tempranillo) {
  throw new Error("Appellation Rioja ou Tempranillo introuvable.");
}

const id = "wine-campo-viejo-tempranillo-rioja";

if (await client.getDocument(id)) {
  throw new Error("La fiche Campo Viejo Tempranillo Rioja existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Campo Viejo Tempranillo Rioja",

  slug: {
    _type: "slug",
    current: "campo-viejo-tempranillo-rioja"
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
      _key: "tempranillo",
      _type: "reference",
      _ref: tempranillo._id
    }
  ],

  approxPrice: 16.45,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/11462446",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un Rioja accessible et gourmand, tout en cerise mûre, épices et boisé, avec assez de fraîcheur pour rester facile à table.",

  tastingKeywords: [
    "cerise",
    "épices",
    "bois de santal",
    "fumée",
    "boisé"
  ],

  perfectFor: [
    "Tapas",
    "Viandes grillées",
    "Pizza"
  ],

  whyWeRecommend: "Parce qu’il offre une porte d’entrée très simple vers le Tempranillo et le style Rioja : du fruit mûr, des épices et un boisé bien présent, sans devenir lourd ni compliqué.",

  body: 3,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "15–17 °C",
  decant: false,

  style: "Rouge sec, fruité, épicé et boisé",

  aromas: [
    "Cerise confite",
    "Épices",
    "Bois de santal",
    "Fumée",
    "Notes boisées"
  ],

  flavors: [
    "Cerise",
    "Fruits rouges mûrs",
    "Épices",
    "Boisé"
  ],

  texture: "Souple, généreuse et équilibrée",
  finish: "Fruitée, épicée et légèrement boisée",

  intensity: 3,
  complexity: 3,
  acidity: 3,
  tannins: 3,
  oakInfluence: 3,

  alcohol: 13,
  sugar: "2 g/L",

  bottleSize: "750 ml",
  sku: "11462446",

  occasionTags: [
    "Tapas",
    "Pizza",
    "Grillades",
    "Cuisine espagnole",
    "Entre amis"
  ],

  aiSummary: "Campo Viejo Tempranillo Rioja est un rouge espagnol 100 % Tempranillo, sec et accessible, marqué par la cerise, les épices et un boisé équilibré.",

  seoTitle: "Campo Viejo Tempranillo Rioja | Le Premier Verre",
  seoDescription: "Découvrez Campo Viejo Tempranillo Rioja, un rouge espagnol 100 % Tempranillo aux notes de cerise, d’épices et de boisé.",

  published: false
});

console.log("✓ Campo Viejo Tempranillo Rioja créé");
console.log("✓ Producteur et références existantes réutilisés");
console.log("✓ Rioja utilisé comme appellation");
console.log("✓ Fiche laissée en brouillon");
