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

const id = "wine-domaine-du-nival-ces-petits-imprevus-2025";

if (await client.getDocument(id)) {
  throw new Error("La fiche Ces petits imprévus 2025 existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Domaine du Nival Ces petits imprévus",
  slug: {
    _type: "slug",
    current: "domaine-du-nival-ces-petits-imprevus-2025"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  vintage: 2025,
  color: "sparkling",

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

  approxPrice: 28.25,
  purchaseChannel: "producer",
  purchaseChannelDetails: "Boutique du Domaine du Nival",
  purchaseUrl: "https://www.nival.ca/products/ces-petits-imprevus-2025",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un pétillant naturel québécois vif et spontané, tout en poire, fruit mûr et fraîcheur.",

  tastingKeywords: [
    "poire",
    "fruits mûrs",
    "bulles fines",
    "fraîcheur",
    "fruit"
  ],

  perfectFor: [
    "Apéro",
    "Brunch",
    "Repas entre amis"
  ],

  whyWeRecommend: "Parce qu’il montre le Vidal sous une forme complètement différente : légère, pétillante et vivante. Une bouteille conviviale qui garde beaucoup de caractère sans devenir compliquée.",

  body: 2,
  sweetness: 2,
  roundness: 2,

  servingTemperature: "7–9 °C",
  decant: false,

  style: "Pétillant naturel, fruité, vif et léger",

  aromas: [
    "Poire",
    "Fruits mûrs",
    "Fruits en sirop"
  ],

  flavors: [
    "Poire",
    "Fruits blancs",
    "Fruits mûrs"
  ],

  texture: "Légère, vive et finement effervescente",
  finish: "Fraîche et fruitée",
  intensity: 3,
  complexity: 2,
  acidity: 4,
  oakInfluence: 1,

  alcohol: 10.5,

  isOrganic: true,
  isNatural: true,

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
          text: "Élaboré à partir de Vidal selon une méthode ancestrale de type pétillant naturel, avec fermentation indigène et mise en bouteille avant la fin de la fermentation afin de créer naturellement l’effervescence."
        }
      ]
    }
  ],

  bottleSize: "750 ml",

  occasionTags: [
    "Apéro",
    "Brunch",
    "Bulles",
    "Repas entre amis"
  ],

  aiSummary: "Ces petits imprévus 2025 du Domaine du Nival est un pétillant naturel québécois biologique élaboré à partir de Vidal.",

  seoTitle: "Ces petits imprévus 2025 | Domaine du Nival | Le Premier Verre",
  seoDescription: "Découvrez Ces petits imprévus 2025 du Domaine du Nival, un pétillant naturel québécois de Vidal, frais et fruité.",

  published: false
});

console.log("✓ Ces petits imprévus 2025 créé");
console.log("✓ Schéma Sanity respecté");
console.log("✓ Fiche laissée en brouillon");
