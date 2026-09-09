import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const ref = (_ref) => ({ _type: "reference", _ref });

const block = (text, key = "block1") => ({
  _key: key,
  _type: "block",
  style: "normal",
  markDefs: [],
  children: [{
    _key: `${key}-span`,
    _type: "span",
    marks: [],
    text
  }]
});

async function upsert(id, data) {
  const existing = await client.getDocument(id);

  if (existing) {
    await client.patch(id).set(data).commit();
    console.log(`✓ ${data._type}: ${data.name || id} complété`);
  } else {
    await client.create({
      _id: id,
      ...data
    });
    console.log(`+ ${data._type}: ${data.name || id} créé`);
  }
}

const canadaId = "d9fc0ce6-5f30-4e00-8bc5-63146a0a6407";
const quebecId = "region-quebec";
const cantonsId = "55a9fe9a-b3fe-41d6-8145-6adca1a818a8";
const appellationId = "appellation-igp-vin-du-quebec";
const seyvalId = "grape-seyval";
const vidalId = "grape-vidal";
const producerId = "producer-vignoble-de-l-orpailleur";
const vineyardId = "vineyard-vignoble-de-l-orpailleur";
const wineId = "wine-l-orpailleur-brut";

/* =========================================================
   1. VIGNOBLE D'ABORD
========================================================= */

await upsert(vineyardId, {
  _type: "vineyard",

  name: "Vignoble de l'Orpailleur",

  slug: {
    _type: "slug",
    current: "vignoble-de-l-orpailleur"
  },

  country: ref(canadaId),

  region: ref(cantonsId),

  appellation: ref(appellationId),

  municipality: "Dunham",

  latitude: 45.13,

  longitude: -72.80,

  website: "https://orpailleur.ca/",

  openToVisitors: true,

  description:
    "Vignoble historique de Dunham dans les Cantons-de-l’Est, reconnu comme l’un des pionniers de la viticulture québécoise.",

  seoTitle:
    "Vignoble de l'Orpailleur à Dunham | Le Premier Verre",

  seoDescription:
    "Découvrez le Vignoble de l'Orpailleur, domaine historique situé à Dunham dans les Cantons-de-l'Est.",

  published: false
});

/* =========================================================
   2. PRODUCTEUR
========================================================= */

await upsert(producerId, {
  _type: "producer",

  name: "Vignoble de l'Orpailleur",

  slug: {
    _type: "slug",
    current: "vignoble-de-l-orpailleur"
  },

  municipality: "Dunham",

  country: ref(canadaId),

  region: ref(cantonsId),

  oneLiner:
    "Un pionnier du vin québécois qui a contribué à démontrer que la vigne pouvait s’enraciner durablement dans les Cantons-de-l’Est.",

  bio: [
    block(
      "Fondé à Dunham au début des années 1980, le Vignoble de l’Orpailleur fait partie des pionniers de la viticulture québécoise. Le domaine a joué un rôle important dans le développement et la reconnaissance du vin produit au Québec.",
      "bio-orpailleur"
    )
  ],

  approach: [
    {
      _key: "quebec",
      _type: "producerApproachItem",
      title: "Faire du vin au Québec",
      text: "Le domaine travaille avec des cépages adaptés au climat québécois et développe des vins qui mettent en valeur la fraîcheur naturelle du terroir."
    },
    {
      _key: "experience",
      _type: "producerApproachItem",
      title: "Plus de quatre décennies d’expérience",
      text: "L’Orpailleur fait partie des domaines qui ont contribué à bâtir les bases de la viticulture québécoise moderne."
    },
    {
      _key: "styles",
      _type: "producerApproachItem",
      title: "Plusieurs styles de vins",
      text: "Le vignoble produit notamment des blancs, rouges, rosés et vins effervescents."
    }
  ],

  signatureGrapes: [
    ref(seyvalId),
    ref(vidalId)
  ],

  whyWeFollow:
    "Parce qu’il est difficile de raconter l’histoire récente du vin québécois sans parler de L’Orpailleur. Son Brut est aussi une excellente porte d’entrée vers les bulles produites ici.",

  openToVisitors: true,

  visitDetails:
    "Le vignoble accueille les visiteurs à Dunham. Vérifier les heures et modalités de visite directement auprès du domaine avant de se déplacer.",

  address:
    "Dunham, Québec, Canada",

  website:
    "https://orpailleur.ca/",

  foundedYear: 1982,

  appellation: ref(appellationId),

  vineyard: ref(vineyardId),

  farmingPractices: [
    "Viticulture adaptée au climat québécois"
  ],

  signatureStyles: [
    "Vins blancs",
    "Vins rouges",
    "Vins rosés",
    "Vins effervescents"
  ],

  aiSummary:
    "Le Vignoble de l'Orpailleur, fondé à Dunham en 1982, est l’un des pionniers de la viticulture québécoise.",

  seoTitle:
    "Vignoble de l'Orpailleur | Le Premier Verre",

  seoDescription:
    "Découvrez le Vignoble de l'Orpailleur à Dunham, pionnier du vin québécois.",

  published: false
});

/* =========================================================
   3. RELIER LE VIGNOBLE AU PRODUCTEUR
========================================================= */

await client.patch(vineyardId).set({
  producer: ref(producerId)
}).commit();

console.log("✓ vineyard: relié au producteur");

/* =========================================================
   4. VIN
========================================================= */

await upsert(wineId, {
  _type: "wine",

  name: "L'Orpailleur Brut",

  slug: {
    _type: "slug",
    current: "l-orpailleur-brut"
  },

  producer: ref(producerId),

  vineyard: ref(vineyardId),

  color: "sparkling",

  country: ref(canadaId),

  region: ref(cantonsId),

  appellation: ref(appellationId),

  grapes: [
    ref(seyvalId),
    ref(vidalId)
  ],

  approxPrice: 31.50,

  purchaseChannel: "saq",

  purchaseChannelDetails:
    "SAQ — Produit Origine Québec",

  purchaseUrl:
    "https://www.saq.com/fr/12685625",

  purchaseLastChecked:
    "2026-09-09",

  oneLiner:
    "Des bulles québécoises fraîches et élégantes qui prouvent qu’on n’a pas besoin de traverser l’Atlantique pour bien commencer l’apéro.",

  tastingKeywords: [
    "bulles fines",
    "pomme",
    "agrumes",
    "brioche",
    "fraîcheur"
  ],

  perfectFor: [
    "Apéro",
    "Brunch",
    "Célébration"
  ],

  whyWeRecommend:
    "Parce qu’il représente très bien l’évolution du vin québécois. La méthode traditionnelle lui apporte des bulles fines et davantage de complexité, tout en conservant une fraîcheur très agréable. C’est une bouteille locale qu’on peut servir aussi bien pour célébrer que simplement pour commencer un repas.",

  body: 2,

  sweetness: 2,

  roundness: 3,

  servingTemperature:
    "6–8 °C",

  decant: false,

  style:
    "Vin effervescent brut, frais et équilibré",

  cellaringPotential:
    "À boire maintenant pour profiter de sa fraîcheur et de ses bulles.",

  alcohol: 12,

  sugar:
    "5,1 g/L",

  acidity: 4,

  tannins: 1,

  aromas: [
    "Pomme",
    "Agrumes",
    "Brioche",
    "Notes de pâtisserie"
  ],

  flavors: [
    "Pomme",
    "Agrumes",
    "Fruits blancs",
    "Notes briochées"
  ],

  texture:
    "Bulles fines, bouche souple et fraîche",

  finish:
    "Fraîche, nette et légèrement briochée",

  intensity: 3,

  complexity: 3,

  oakInfluence: 1,

  vinification: [
    block(
      "Élaboré selon la méthode traditionnelle, avec une deuxième fermentation en bouteille.",
      "vinification-brut"
    )
  ],

  aging:
    "Élevage sur lies en bouteille pendant environ 18 mois.",

  bottleSize:
    "750 ml",

  sku:
    "12685625",

  experienceLevel:
    "beginner",

  occasionTags: [
    "Apéro",
    "Brunch",
    "Célébration",
    "Vin québécois",
    "Bulles"
  ],

  aiSummary:
    "L'Orpailleur Brut est un vin effervescent québécois élaboré en méthode traditionnelle, principalement à partir de Seyval et de Vidal.",

  seoTitle:
    "L'Orpailleur Brut | Le Premier Verre",

  seoDescription:
    "Découvrez L'Orpailleur Brut : des bulles québécoises fraîches élaborées en méthode traditionnelle à Dunham.",

  published: false
});

console.log("");
console.log("============================================");
console.log("🥂 FICHE 5 TERMINÉE");
console.log("============================================");
console.log("✓ Québec déjà créé");
console.log("✓ Cantons-de-l'Est déjà relié");
console.log("✓ IGP Vin du Québec déjà créé");
console.log("✓ Seyval déjà créé");
console.log("✓ Vidal réutilisé");
console.log("✓ Vignoble de l'Orpailleur — vignoble");
console.log("✓ Vignoble de l'Orpailleur — producteur");
console.log("✓ L'Orpailleur Brut");
console.log("");
console.log("Photos : à ajouter plus tard.");
