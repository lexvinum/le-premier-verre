import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("bb61af16-e4c6-42ad-968c-edd0752d054c");
const region = await client.getDocument("region-monteregie");
const appellation = await client.getDocument("appellation-igp-vin-du-quebec");

const seyvalNoir = await client.getDocument("grape-seyval-noir");
const seyvalBlanc = await client.getDocument("grape-seyval-blanc");
const vidal = await client.getDocument("grape-vidal");
const lucie = await client.getDocument("grape-lucie-kuhlmann");

if (!producer?.country?._ref) {
  throw new Error("Référence pays du Domaine du Ridge introuvable.");
}

if (!region || !appellation || !seyvalNoir || !seyvalBlanc || !vidal || !lucie) {
  throw new Error("Une région, appellation ou un cépage requis est introuvable.");
}

const id = "wine-domaine-du-ridge-le-litre-du-ridge-rose";

if (await client.getDocument(id)) {
  throw new Error("La fiche Le Litre du Ridge Rosé existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Domaine du Ridge Le Litre du Ridge Rosé",

  slug: {
    _type: "slug",
    current: "domaine-du-ridge-le-litre-du-ridge-rose"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  color: "rose",

  country: producer.country,

  region: {
    _type: "reference",
    _ref: region._id
  },

  appellation: {
    _type: "reference",
    _ref: appellation._id
  },

  grapes: [
    {
      _key: "seyval-noir",
      _type: "reference",
      _ref: seyvalNoir._id
    },
    {
      _key: "seyval-blanc",
      _type: "reference",
      _ref: seyvalBlanc._id
    },
    {
      _key: "vidal",
      _type: "reference",
      _ref: vidal._id
    },
    {
      _key: "lucie-kuhlmann",
      _type: "reference",
      _ref: lucie._id
    }
  ],

  approxPrice: 21.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ — format 1 L",
  purchaseUrl: "https://www.saq.com/fr/15609716",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un litre de rosé québécois sec, léger et généreux, rempli de fraise, de framboise et de fraîcheur.",

  tastingKeywords: [
    "fraise",
    "framboise",
    "floral",
    "sucre d’orge",
    "fraîcheur"
  ],

  perfectFor: [
    "Pique-nique",
    "Apéro",
    "Grande tablée"
  ],

  whyWeRecommend: "Parce que son format d’un litre et son profil léger en font une bouteille particulièrement conviviale. Sec, fruité et peu alcoolisé, c’est le genre de rosé qu’on ouvre sans cérémonie pour un pique-nique, un apéro ou une grande tablée.",

  body: 2,
  sweetness: 1,
  roundness: 3,

  servingTemperature: "6–8 °C",
  decant: false,

  style: "Rosé sec, léger, fruité et généreux",

  aromas: [
    "Fraise",
    "Framboise",
    "Notes florales",
    "Sucre d’orge"
  ],

  flavors: [
    "Fraise",
    "Framboise",
    "Petits fruits rouges"
  ],

  texture: "Légère, fraîche et généreuse",
  finish: "Fraîche et fruitée",

  intensity: 3,
  complexity: 2,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 10.3,
  sugar: "1,2 g/L",

  bottleSize: "1 L",
  sku: "15609716",

  occasionTags: [
    "Pique-nique",
    "Apéro",
    "Terrasse",
    "Grande tablée",
    "Été"
  ],

  aiSummary: "Le Litre du Ridge Rosé est un rosé québécois sec et léger de 1 litre, assemblant Seyval Noir, Seyval Blanc, Vidal et Lucie Kuhlmann.",

  seoTitle: "Le Litre du Ridge Rosé | Domaine du Ridge | Le Premier Verre",
  seoDescription: "Découvrez Le Litre du Ridge Rosé, un rosé québécois sec, léger et fruité en format 1 litre, aux notes de fraise et de framboise.",

  published: false
});

console.log("✓ Le Litre du Ridge Rosé créé");
console.log("✓ Format : 1 L");
console.log("✓ Données basées sur le produit SAQ 15609716");
console.log("✓ Aucun millésime incertain ajouté");
console.log("✓ Fiche laissée en brouillon");
