import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const producer = await client.getDocument("bb61af16-e4c6-42ad-968c-edd0752d054c");
const region = await client.getDocument("region-monteregie");
const appellation = await client.getDocument("appellation-igp-vin-du-quebec");

const lucie = await client.getDocument("grape-lucie-kuhlmann");
const sabrevois = await client.getDocument("grape-sabrevois");
const frontenac = await client.getDocument("grape-frontenac-noir");
const chancellor = await client.getDocument("grape-chancellor");

if (!producer?.country?._ref) {
  throw new Error("Référence pays du Domaine du Ridge introuvable.");
}

if (!region || !appellation || !lucie || !sabrevois || !frontenac || !chancellor) {
  throw new Error("Une région, appellation ou un cépage requis est introuvable.");
}

const id = "wine-domaine-du-ridge-lucy-k";

if (await client.getDocument(id)) {
  throw new Error("La fiche Domaine du Ridge Lucy K. existe déjà.");
}

await client.create({
  _id: id,
  _type: "wine",

  name: "Domaine du Ridge Lucy K.",

  slug: {
    _type: "slug",
    current: "domaine-du-ridge-lucy-k"
  },

  producer: {
    _type: "reference",
    _ref: producer._id
  },

  color: "red",

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
      _key: "lucie-kuhlmann",
      _type: "reference",
      _ref: lucie._id
    },
    {
      _key: "sabrevois",
      _type: "reference",
      _ref: sabrevois._id
    },
    {
      _key: "frontenac-noir",
      _type: "reference",
      _ref: frontenac._id
    },
    {
      _key: "chancellor",
      _type: "reference",
      _ref: chancellor._id
    }
  ],

  approxPrice: 21.95,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/15545038",
  purchaseLastChecked: "2026-09-10",

  oneLiner: "Un rouge québécois léger et désaltérant, tout en canneberge, griotte et fleurs, à servir légèrement rafraîchi.",

  tastingKeywords: [
    "canneberge",
    "griotte",
    "fleurs mauves",
    "betterave",
    "fraîcheur"
  ],

  perfectFor: [
    "Apéro",
    "Charcuteries",
    "Tacos au poisson"
  ],

  whyWeRecommend: "Parce qu’il montre qu’un rouge québécois peut être léger, frais et franchement désaltérant. Peu alcoolisé, délicat et sans lourdeur boisée, Lucy K. est particulièrement agréable lorsqu’on le sert un peu frais.",

  body: 2,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "12–14 °C",
  decant: false,

  style: "Rouge sec, léger, frais et délicat",

  aromas: [
    "Betterave",
    "Canneberge",
    "Fleurs mauves",
    "Griotte"
  ],

  flavors: [
    "Canneberge",
    "Griotte",
    "Petits fruits rouges"
  ],

  texture: "Délicate, légère et fraîche",
  finish: "Fraîche et fruitée",

  intensity: 3,
  complexity: 2,
  acidity: 4,
  tannins: 2,
  oakInfluence: 1,

  alcohol: 10.6,
  sugar: "1,3 g/L",

  bottleSize: "750 ml",
  sku: "15545038",

  occasionTags: [
    "Apéro",
    "Brunch",
    "Charcuteries",
    "Pique-nique",
    "Repas léger"
  ],

  aiSummary: "Domaine du Ridge Lucy K. est un rouge québécois léger et sec à base de Lucie Kuhlmann, Sabrevois, Frontenac et Chancellor.",

  seoTitle: "Domaine du Ridge Lucy K. | Le Premier Verre",
  seoDescription: "Découvrez Lucy K. du Domaine du Ridge, un rouge québécois léger, frais et délicat aux notes de canneberge, griotte et fleurs.",

  published: false
});

console.log("✓ Domaine du Ridge Lucy K. créé");
console.log("✓ Région du vin : Montérégie");
console.log("✓ Aucun millésime incertain ajouté");
console.log("✓ Données basées sur le produit SAQ 15545038");
console.log("✓ Fiche laissée en brouillon");
