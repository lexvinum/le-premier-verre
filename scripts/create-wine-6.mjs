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

const italyId = "country-italie";
const venetoId = "region-venetie";
const valpolicellaId = "appellation-valpolicella";

const corvinaId = "grape-corvina-veronese";
const rondinellaId = "grape-rondinella";
const corvinoneId = "grape-corvinone";

const producerId = "producer-zenato";
const wineId = "wine-zenato-valpolicella-superiore";

/* =========================================================
   1. ITALIE
========================================================= */

await upsert(italyId, {
  _type: "country",
  name: "Italie",
  nativeName: "Italia",
  slug: {
    _type: "slug",
    current: "italie"
  },
  isoCode: "IT",
  flagEmoji: "🇮🇹",
  description:
    "L’Italie est l’un des grands pays du vin, avec une immense diversité de cépages indigènes, de climats et de traditions régionales.",
  wineHistory: [
    block(
      "La vigne fait partie de l’histoire de la péninsule italienne depuis l’Antiquité. Aujourd’hui, presque toutes les régions du pays produisent du vin et plusieurs centaines de cépages indigènes y sont encore cultivés.",
      "history-italie"
    )
  ],
  climate:
    "Très varié selon les régions, des influences alpines du nord aux climats méditerranéens du sud.",
  mainWineStyles: [
    "Rouges",
    "Blancs",
    "Effervescents",
    "Rosés",
    "Vins doux"
  ],
  seoTitle:
    "Vins d'Italie | Le Premier Verre",
  seoDescription:
    "Découvrir les vins d'Italie simplement : régions, cépages, appellations et bouteilles à connaître."
});

/* =========================================================
   2. CÉPAGES
========================================================= */

await upsert(corvinaId, {
  _type: "grape",
  name: "Corvina Veronese",
  slug: {
    _type: "slug",
    current: "corvina-veronese"
  },
  color: "red",
  oneLiner:
    "Le cépage emblématique de la Valpolicella, reconnu pour ses notes de cerise, sa fraîcheur et son élégance.",
  aromas: [
    "Cerise",
    "Griotte",
    "Fruits rouges",
    "Violette",
    "Épices"
  ],
  body: 3,
  acidity: 4,
  tannins: 3,
  servingTemperature: "15–18 °C",
  simplePairings: [
    "Pâtes",
    "Poulet rôti",
    "Charcuteries",
    "Viandes grillées"
  ],
  originCountry: ref(italyId),
  description:
    "La Corvina Veronese est l’un des cépages les plus importants de la Vénétie et le cœur de nombreux vins de Valpolicella. Elle apporte souvent fraîcheur, cerise, finesse et structure.",
  history: [
    block(
      "Cultivée depuis longtemps dans la province de Vérone, la Corvina est intimement liée aux vins de Valpolicella et d’Amarone.",
      "history-corvina"
    )
  ],
  flavors: [
    "Cerise",
    "Fruits rouges",
    "Herbes",
    "Épices"
  ],
  agingPotential:
    "Variable selon le style, de quelques années pour les Valpolicella frais à beaucoup plus pour les cuvées plus structurées.",
  seoTitle:
    "Corvina Veronese : comprendre ce cépage | Le Premier Verre",
  seoDescription:
    "La Corvina Veronese expliquée simplement : goût, arômes, accords et vins de Valpolicella.",
  published: false
});

await upsert(rondinellaId, {
  _type: "grape",
  name: "Rondinella",
  slug: {
    _type: "slug",
    current: "rondinella"
  },
  color: "red",
  oneLiner:
    "Un cépage traditionnel de Vénétie souvent utilisé avec la Corvina pour apporter couleur, fruit et équilibre.",
  aromas: [
    "Cerise",
    "Fruits rouges",
    "Herbes",
    "Épices",
    "Violette"
  ],
  body: 3,
  acidity: 3,
  tannins: 3,
  servingTemperature: "15–18 °C",
  simplePairings: [
    "Pâtes",
    "Pizza",
    "Charcuteries",
    "Poulet"
  ],
  originCountry: ref(italyId),
  description:
    "La Rondinella est un cépage rouge traditionnel de la région de Vérone. Elle est fréquemment assemblée avec la Corvina dans les vins de Valpolicella.",
  history: [
    block(
      "Présente depuis longtemps dans les assemblages vénitiens, la Rondinella joue surtout un rôle complémentaire aux côtés de la Corvina.",
      "history-rondinella"
    )
  ],
  flavors: [
    "Fruits rouges",
    "Cerise",
    "Herbes",
    "Épices"
  ],
  agingPotential:
    "Principalement utilisée en assemblage; le potentiel dépend surtout du style final du vin.",
  seoTitle:
    "Rondinella : cépage de Valpolicella | Le Premier Verre",
  seoDescription:
    "Découvrez la Rondinella, cépage rouge traditionnel de la Vénétie utilisé dans les vins de Valpolicella.",
  published: false
});

await upsert(corvinoneId, {
  _type: "grape",
  name: "Corvinone",
  slug: {
    _type: "slug",
    current: "corvinone"
  },
  color: "red",
  oneLiner:
    "Un cépage vénitien qui apporte structure, couleur et fruit aux assemblages de Valpolicella.",
  aromas: [
    "Cerise noire",
    "Prune",
    "Fruits rouges",
    "Épices",
    "Herbes"
  ],
  body: 4,
  acidity: 3,
  tannins: 4,
  servingTemperature: "16–18 °C",
  simplePairings: [
    "Viandes rouges",
    "Pâtes",
    "Rôtis",
    "Fromages"
  ],
  originCountry: ref(italyId),
  description:
    "Le Corvinone est un cépage rouge traditionnel de la Vénétie souvent utilisé avec la Corvina et la Rondinella. Il peut apporter structure, intensité et profondeur.",
  history: [
    block(
      "Longtemps confondu avec la Corvina, le Corvinone est aujourd’hui reconnu comme un cépage distinct et fait partie des assemblages classiques de Valpolicella.",
      "history-corvinone"
    )
  ],
  flavors: [
    "Fruits noirs",
    "Cerise",
    "Prune",
    "Épices"
  ],
  agingPotential:
    "Bon potentiel lorsqu’il est intégré à des vins structurés destinés à évoluer.",
  seoTitle:
    "Corvinone : cépage de Vénétie | Le Premier Verre",
  seoDescription:
    "Découvrez le Corvinone, cépage rouge utilisé dans les assemblages traditionnels de Valpolicella.",
  published: false
});

/* =========================================================
   3. VÉNÉTIE
========================================================= */

await upsert(venetoId, {
  _type: "region",
  name: "Vénétie",
  slug: {
    _type: "slug",
    current: "venetie"
  },
  country: ref(italyId),
  introduction: [
    block(
      "La Vénétie est l’une des grandes régions viticoles du nord-est de l’Italie. Elle abrite des styles très différents, du Prosecco aux rouges de Valpolicella, en passant par les blancs de Soave. Autour de Vérone, la Corvina et ses partenaires donnent des rouges allant de très frais et fruités à puissants et concentrés.",
      "intro-venetie"
    )
  ],
  locationText:
    "Région du nord-est de l’Italie, entre les Alpes, le lac de Garde et la mer Adriatique.",
  latitude: 45.6,
  longitude: 11.9,
  mapZoom: 7,
  climate:
    "Climat varié avec influences alpines, continentales et adriatiques. Les collines autour de Vérone bénéficient de conditions favorables à la viticulture.",
  signatureGrapes: [
    ref(corvinaId),
    ref(rondinellaId),
    ref(corvinoneId)
  ],
  characteristics: [
    {
      _key: "diversite",
      _type: "regionCharacteristic",
      title: "Une grande diversité",
      text: "La Vénétie produit aussi bien des vins effervescents que des blancs frais et des rouges puissants."
    },
    {
      _key: "valpolicella",
      _type: "regionCharacteristic",
      title: "Le territoire de Valpolicella",
      text: "Autour de Vérone, les cépages Corvina, Rondinella et Corvinone donnent naissance à plusieurs styles de rouges."
    },
    {
      _key: "cepages",
      _type: "regionCharacteristic",
      title: "Des cépages locaux",
      text: "La région conserve plusieurs cépages indigènes qui contribuent fortement à l’identité de ses vins."
    }
  ],
  soilTypes: [
    "Calcaire",
    "Argile",
    "Sols morainiques",
    "Roches"
  ],
  mainWineStyles: [
    "Rouges fruités",
    "Rouges structurés",
    "Blancs",
    "Effervescents"
  ],
  seoTitle:
    "Vénétie : vins et cépages | Le Premier Verre",
  seoDescription:
    "Découvrir les vins de Vénétie : Valpolicella, Corvina, Prosecco et grandes appellations.",
  published: false
});

/* =========================================================
   4. COMPLÉTER LES CÉPAGES
========================================================= */

await client.patch(corvinaId).set({
  mainRegions: [ref(venetoId)],
  tryNext: [
    {
      _key: "corvina-rondinella",
      _type: "grapeSuggestion",
      grape: ref(rondinellaId),
      reason: "Pour découvrir l’un de ses partenaires traditionnels dans les assemblages de Valpolicella."
    },
    {
      _key: "corvina-corvinone",
      _type: "grapeSuggestion",
      grape: ref(corvinoneId),
      reason: "Pour explorer un cépage voisin qui apporte souvent plus de structure."
    }
  ]
}).commit();

await client.patch(rondinellaId).set({
  mainRegions: [ref(venetoId)],
  tryNext: [
    {
      _key: "rondinella-corvina",
      _type: "grapeSuggestion",
      grape: ref(corvinaId),
      reason: "Pour découvrir le cépage principal des assemblages de Valpolicella."
    },
    {
      _key: "rondinella-corvinone",
      _type: "grapeSuggestion",
      grape: ref(corvinoneId),
      reason: "Pour aller vers davantage de structure et de profondeur."
    }
  ]
}).commit();

await client.patch(corvinoneId).set({
  mainRegions: [ref(venetoId)],
  tryNext: [
    {
      _key: "corvinone-corvina",
      _type: "grapeSuggestion",
      grape: ref(corvinaId),
      reason: "Pour découvrir le cépage emblématique de Valpolicella."
    },
    {
      _key: "corvinone-rondinella",
      _type: "grapeSuggestion",
      grape: ref(rondinellaId),
      reason: "Pour comparer avec un cépage plus souple traditionnellement utilisé en assemblage."
    }
  ]
}).commit();

/* =========================================================
   5. VALPOLICELLA
========================================================= */

await upsert(valpolicellaId, {
  _type: "appellation",
  name: "Valpolicella",
  slug: {
    _type: "slug",
    current: "valpolicella"
  },
  country: ref(italyId),
  region: ref(venetoId),
  classification: "DOC / DOP",
  description: [
    block(
      "Valpolicella est une appellation historique située autour de Vérone, en Vénétie. Les vins rouges y sont principalement élaborés à partir de Corvina, Rondinella et Corvinone. Selon les méthodes de production et l’élevage, le style peut aller du rouge frais et fruité au vin beaucoup plus riche et concentré.",
      "description-valpolicella"
    )
  ],
  climate:
    "Climat tempéré influencé par les Alpes et le lac de Garde, avec des coteaux bien ventilés autour de Vérone.",
  soilTypes: [
    "Calcaire",
    "Argile",
    "Sols pierreux",
    "Sols d’origine morainique"
  ],
  grapes: [
    ref(corvinaId),
    ref(rondinellaId),
    ref(corvinoneId)
  ],
  authorizedWineStyles: [
    "Vin rouge",
    "Valpolicella Superiore",
    "Ripasso",
    "Amarone",
    "Recioto"
  ],
  productionRules: [
    block(
      "Valpolicella est une appellation DOC/DOP de Vénétie fondée sur des assemblages de cépages locaux, notamment Corvina, Corvinone et Rondinella.",
      "rules-valpolicella"
    )
  ],
  foodPairingNotes:
    "Pâtes, charcuteries, volailles, viandes grillées, rôtis et fromages selon le niveau de structure du vin.",
  latitude: 45.52,
  longitude: 10.92,
  seoTitle:
    "Valpolicella : comprendre l'appellation | Le Premier Verre",
  seoDescription:
    "Valpolicella expliqué simplement : Corvina, Rondinella, styles de vins et accords."
});

/* =========================================================
   6. PRODUCTEUR — ZENATO
========================================================= */

await upsert(producerId, {
  _type: "producer",
  name: "Zenato",
  slug: {
    _type: "slug",
    current: "zenato"
  },
  municipality: "Peschiera del Garda",
  country: ref(italyId),
  region: ref(venetoId),
  oneLiner:
    "Une maison familiale de Vénétie qui relie deux grands territoires : Lugana et Valpolicella.",
  bio: [
    block(
      "L’histoire de Zenato débute en 1960 à San Benedetto di Lugana avec Sergio Zenato et Carla Prospero. La famille développe d’abord son travail autour du Lugana avant d’étendre son activité vers la Valpolicella. Aujourd’hui, la maison est dirigée par la génération suivante et travaille près d’une centaine d’hectares de vignobles entre plusieurs terroirs italiens.",
      "bio-zenato"
    )
  ],
  approach: [
    {
      _key: "territoires",
      _type: "producerApproachItem",
      title: "Mettre les territoires en valeur",
      text: "Zenato travaille à la fois dans le Lugana et la Valpolicella, deux régions aux identités très différentes."
    },
    {
      _key: "cepages",
      _type: "producerApproachItem",
      title: "Les cépages locaux au centre",
      text: "La maison mise notamment sur des variétés indigènes comme la Corvina, la Rondinella et le Corvinone en Valpolicella."
    },
    {
      _key: "famille",
      _type: "producerApproachItem",
      title: "Une histoire familiale",
      text: "Le projet fondé par Sergio et Carla Zenato est aujourd’hui poursuivi par leurs enfants."
    }
  ],
  signatureGrapes: [
    ref(corvinaId),
    ref(rondinellaId),
    ref(corvinoneId)
  ],
  whyWeFollow:
    "Parce que Zenato offre une façon très accessible de découvrir les vins de Vénétie. Cette Valpolicella Superiore est particulièrement intéressante pour comprendre les cépages locaux sans aller immédiatement vers un Amarone plus riche et plus coûteux.",
  openToVisitors: true,
  visitDetails:
    "La maison est établie à Peschiera del Garda. Vérifier directement auprès de Zenato les modalités de visite et de dégustation avant de se déplacer.",
  address:
    "Via San Benedetto 8, 37019 Peschiera del Garda, Italie",
  website:
    "https://www.zenato.it/",
  foundedYear: 1960,
  founder: "Sergio Zenato",
  appellation: ref(valpolicellaId),
  signatureStyles: [
    "Valpolicella",
    "Amarone",
    "Ripasso",
    "Lugana"
  ],
  aiSummary:
    "Zenato est une maison familiale de Vénétie fondée en 1960 par Sergio Zenato, active notamment dans le Lugana et la Valpolicella.",
  seoTitle:
    "Zenato | Producteur | Le Premier Verre",
  seoDescription:
    "Découvrez Zenato, maison familiale de Vénétie fondée en 1960 et reconnue pour ses vins de Lugana et Valpolicella.",
  published: false
});

/* =========================================================
   7. VIN — ZENATO VALPOLICELLA SUPERIORE
========================================================= */

await upsert(wineId, {
  _type: "wine",
  name: "Zenato Valpolicella Superiore",
  slug: {
    _type: "slug",
    current: "zenato-valpolicella-superiore"
  },
  producer: ref(producerId),
  color: "red",
  country: ref(italyId),
  region: ref(venetoId),
  appellation: ref(valpolicellaId),
  grapes: [
    ref(corvinaId),
    ref(rondinellaId),
    ref(corvinoneId)
  ],
  approxPrice: 19.70,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl:
    "https://www.saq.com/fr/908186",
  purchaseLastChecked:
    "2026-09-09",
  oneLiner:
    "Un rouge italien croquant, souple et gourmand qui donne beaucoup de plaisir sans devenir lourd.",
  tastingKeywords: [
    "cerise",
    "prune",
    "fruits rouges",
    "velouté",
    "épices"
  ],
  perfectFor: [
    "Pâtes",
    "Pizza",
    "Souper de semaine"
  ],
  whyWeRecommend:
    "Parce qu’il combine exactement ce qu’on cherche dans un rouge accessible : du fruit, de la fraîcheur, une texture souple et assez de structure pour accompagner un repas. C’est aussi une excellente façon de découvrir les cépages traditionnels de Valpolicella avant de passer aux styles plus riches comme le Ripasso ou l’Amarone.",
  body: 3,
  sweetness: 1,
  roundness: 3,
  servingTemperature:
    "16–18 °C",
  decant: false,
  style:
    "Rouge sec, frais, fruité et velouté",
  cellaringPotential:
    "À boire maintenant ou à conserver quelques années selon le millésime.",
  alcohol: 13.5,
  sugar:
    "7,5 g/L",
  acidity: 4,
  tannins: 3,
  aromas: [
    "Cerise griotte",
    "Fruits des bois",
    "Violette",
    "Amande"
  ],
  flavors: [
    "Cerise",
    "Prune",
    "Fruits rouges",
    "Épices"
  ],
  texture:
    "Souple, sèche et veloutée",
  finish:
    "Persistante, fruitée et légèrement épicée",
  intensity: 3,
  complexity: 3,
  oakInfluence: 2,
  vinification: [
    block(
      "Vendanges manuelles suivies d’un égrappage, d’un foulage doux et d’une macération traditionnelle d’environ 10 jours en cuves d’acier inoxydable.",
      "vinification-zenato-1"
    ),
    block(
      "Après fermentation, le vin est séparé des peaux par pressurage doux avant l’élevage.",
      "vinification-zenato-2"
    )
  ],
  aging:
    "Environ 12 mois en tonneaux de chêne.",
  soil:
    "Sols principalement calcaires, riches en éléments pierreux.",
  harvestMethod:
    "manual",
  bottleSize:
    "750 ml",
  sku:
    "908186",
  experienceLevel:
    "beginner",
  occasionTags: [
    "Pâtes",
    "Pizza",
    "Souper de semaine",
    "Italie",
    "Entre amis"
  ],
  aiSummary:
    "Zenato Valpolicella Superiore est un rouge de Vénétie composé de 85 % Corvina Veronese, 10 % Rondinella et 5 % Corvinone, frais, fruité et velouté.",
  seoTitle:
    "Zenato Valpolicella Superiore | Le Premier Verre",
  seoDescription:
    "Découvrez Zenato Valpolicella Superiore : un rouge italien frais, fruité et souple à moins de 20 $.",
  published: false
});

console.log("");
console.log("============================================");
console.log("🍷 FICHE 6 CRÉÉE AVEC SON ÉCOSYSTÈME");
console.log("============================================");
console.log("✓ Italie");
console.log("✓ Vénétie");
console.log("✓ Valpolicella");
console.log("✓ Corvina Veronese");
console.log("✓ Rondinella");
console.log("✓ Corvinone");
console.log("✓ Zenato");
console.log("✓ Zenato Valpolicella Superiore");
console.log("");
console.log("Photos : à ajouter plus tard.");
console.log("Aucun vignoble séparé créé.");
