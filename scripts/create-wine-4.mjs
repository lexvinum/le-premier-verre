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

/* =========================================================
   IDS
========================================================= */

const franceId = "country-france";

const rhoneId = "region-vallee-du-rhone";

const grenacheId = "grape-grenache";
const carignanId = "grape-carignan";
const syrahId = "grape-syrah";
const mourvedreId = "grape-mourvedre";

const cdrId = "appellation-cotes-du-rhone";

const producerId = "producer-vidal-fleury";

const wineId = "wine-vidal-fleury-cotes-du-rhone";


/* =========================================================
   1. FRANCE
   On ne recrée pas la France : on conserve la fiche existante.
========================================================= */

const france = await client.getDocument(franceId);

if (!france) {
  await client.create({
    _id: franceId,
    _type: "country",
    name: "France",
    nativeName: "France",
    slug: { _type: "slug", current: "france" },
    isoCode: "FR",
    flagEmoji: "🇫🇷"
  });

  console.log("+ country: France créé");
} else {
  console.log("✓ country: France déjà présent");
}


/* =========================================================
   2. CÉPAGES
========================================================= */

await upsert(grenacheId, {
  _type: "grape",

  name: "Grenache",

  slug: {
    _type: "slug",
    current: "grenache"
  },

  color: "red",

  oneLiner:
    "Un rouge généreux, rond et chaleureux, souvent rempli de fruits mûrs et d’épices.",

  aromas: [
    "Fraise mûre",
    "Cerise",
    "Prune",
    "Poivre",
    "Herbes séchées"
  ],

  body: 4,
  acidity: 2,
  tannins: 3,

  servingTemperature: "15–17 °C",

  simplePairings: [
    "Grillades",
    "Agneau",
    "Poulet rôti",
    "Plats mijotés"
  ],

  originCountry: ref(franceId),

  description:
    "Le Grenache est un cépage rouge particulièrement important dans le sud de la Vallée du Rhône. Il apporte souvent fruit, chaleur, rondeur et générosité aux assemblages.",

  history: [
    block(
      "Le Grenache est aujourd’hui l’un des cépages incontournables du bassin méditerranéen. Dans la Vallée du Rhône méridionale, il joue un rôle central dans de nombreux assemblages rouges.",
      "history-grenache"
    )
  ],

  flavors: [
    "Fruits rouges mûrs",
    "Prune",
    "Épices",
    "Garrigue"
  ],

  agingPotential:
    "Variable selon le terroir et l’assemblage : de quelques années à beaucoup plus pour les grandes appellations.",

  seoTitle:
    "Grenache : comprendre ce cépage | Le Premier Verre",

  seoDescription:
    "Le Grenache expliqué simplement : goût, arômes, accords et régions où le découvrir.",

  published: false
});


await upsert(carignanId, {
  _type: "grape",

  name: "Carignan",

  slug: {
    _type: "slug",
    current: "carignan"
  },

  color: "red",

  oneLiner:
    "Un cépage méditerranéen qui peut apporter couleur, fraîcheur, épices et structure aux assemblages.",

  aromas: [
    "Mûre",
    "Prune",
    "Poivre",
    "Herbes",
    "Réglisse"
  ],

  body: 4,
  acidity: 4,
  tannins: 4,

  servingTemperature: "15–17 °C",

  simplePairings: [
    "Grillades",
    "Saucisses",
    "Agneau",
    "Ragoûts"
  ],

  originCountry: ref(franceId),

  description:
    "Longtemps utilisé comme cépage d’assemblage dans le sud de la France, le Carignan peut apporter fraîcheur, structure et caractère épicé aux vins rouges.",

  history: [
    block(
      "Le Carignan est profondément associé aux vignobles méditerranéens. De vieilles vignes bien cultivées peuvent produire des vins concentrés, frais et expressifs.",
      "history-carignan"
    )
  ],

  flavors: [
    "Fruits noirs",
    "Épices",
    "Réglisse",
    "Herbes séchées"
  ],

  agingPotential:
    "Quelques années dans la plupart des cuvées; davantage lorsque les rendements sont faibles et les vieilles vignes mises en valeur.",

  seoTitle:
    "Carignan : comprendre ce cépage | Le Premier Verre",

  seoDescription:
    "Découvrez le Carignan simplement : ses arômes, son style et son rôle dans les assemblages méditerranéens.",

  published: false
});


await upsert(syrahId, {
  _type: "grape",

  name: "Syrah",

  slug: {
    _type: "slug",
    current: "syrah"
  },

  color: "red",

  oneLiner:
    "Un rouge profond et épicé, capable d’être à la fois puissant, frais et très parfumé.",

  aromas: [
    "Mûre",
    "Violette",
    "Poivre noir",
    "Olive",
    "Épices"
  ],

  body: 4,
  acidity: 4,
  tannins: 4,

  servingTemperature: "15–17 °C",

  simplePairings: [
    "Bœuf",
    "Agneau",
    "Grillades",
    "Champignons"
  ],

  originCountry: ref(franceId),

  description:
    "La Syrah est l’un des grands cépages rouges de la Vallée du Rhône. Elle apporte couleur, structure, fraîcheur et notes épicées.",

  history: [
    block(
      "La Syrah est historiquement associée à la Vallée du Rhône, particulièrement dans sa partie septentrionale, avant de connaître un succès international.",
      "history-syrah"
    )
  ],

  flavors: [
    "Fruits noirs",
    "Poivre",
    "Olive",
    "Épices"
  ],

  agingPotential:
    "Très variable : certaines Syrah sont faites pour être bues jeunes, tandis que les grandes cuvées peuvent évoluer pendant de nombreuses années.",

  seoTitle:
    "Syrah : comprendre ce cépage | Le Premier Verre",

  seoDescription:
    "La Syrah expliquée simplement : arômes, corps, accords et grands terroirs.",

  published: false
});


await upsert(mourvedreId, {
  _type: "grape",

  name: "Mourvèdre",

  slug: {
    _type: "slug",
    current: "mourvedre"
  },

  color: "red",

  oneLiner:
    "Un cépage méditerranéen structuré et épicé qui donne de la profondeur aux assemblages rouges.",

  aromas: [
    "Mûre",
    "Prune",
    "Poivre",
    "Herbes",
    "Épices"
  ],

  body: 5,
  acidity: 3,
  tannins: 5,

  servingTemperature: "16–18 °C",

  simplePairings: [
    "Agneau",
    "Bœuf braisé",
    "Gibier",
    "Plats mijotés"
  ],

  originCountry: ref(franceId),

  description:
    "Le Mourvèdre apprécie les climats chauds. Dans le Rhône méridional, il apporte structure, couleur et notes épicées aux assemblages.",

  history: [
    block(
      "Cultivé depuis longtemps autour de la Méditerranée, le Mourvèdre est souvent utilisé avec le Grenache et la Syrah dans les assemblages du sud de la Vallée du Rhône.",
      "history-mourvedre"
    )
  ],

  flavors: [
    "Fruits noirs",
    "Épices",
    "Herbes",
    "Poivre"
  ],

  agingPotential:
    "Bon potentiel de garde grâce à sa structure et à ses tanins lorsqu’il est produit dans de bonnes conditions.",

  seoTitle:
    "Mourvèdre : comprendre ce cépage | Le Premier Verre",

  seoDescription:
    "Le Mourvèdre expliqué simplement : goût, structure, arômes et accords.",

  published: false
});


/* =========================================================
   3. VALLÉE DU RHÔNE
========================================================= */

await upsert(rhoneId, {
  _type: "region",

  name: "Vallée du Rhône",

  slug: {
    _type: "slug",
    current: "vallee-du-rhone"
  },

  country: ref(franceId),

  introduction: [
    block(
      "La Vallée du Rhône suit le fleuve du même nom et réunit deux univers viticoles assez différents. Au nord, les coteaux escarpés sont notamment le territoire de la Syrah. Plus au sud, le climat devient franchement méditerranéen et les assemblages prennent le devant de la scène, avec le Grenache comme figure centrale. C’est une région idéale pour comprendre comment le climat, les cépages et les assemblages peuvent transformer complètement le style d’un vin.",
      "intro-rhone"
    )
  ],

  locationText:
    "La Vallée du Rhône viticole s’étire le long du Rhône, du secteur de Vienne au nord jusqu’aux environs d’Avignon dans le sud de la France.",

  latitude: 44.8,
  longitude: 4.85,
  mapZoom: 6,

  climate:
    "La vallée traverse plusieurs zones climatiques. Le sud est fortement méditerranéen, avec des étés chauds et secs et l’influence importante du mistral.",

  signatureGrapes: [
    ref(grenacheId),
    ref(syrahId),
    ref(mourvedreId)
  ],

  characteristics: [
    {
      _key: "north-south",
      _type: "regionCharacteristic",
      title: "Deux Rhône très différents",
      text: "Le Rhône septentrional et le Rhône méridional possèdent des climats, cépages et styles de vins bien distincts."
    },
    {
      _key: "assemblages",
      _type: "regionCharacteristic",
      title: "L’art de l’assemblage",
      text: "Dans le sud, plusieurs cépages sont souvent réunis pour équilibrer fruit, chaleur, fraîcheur et structure."
    },
    {
      _key: "grenache",
      _type: "regionCharacteristic",
      title: "Grenache au sud",
      text: "Le Grenache est l’un des cépages les plus importants du Rhône méridional et donne rondeur et générosité aux rouges."
    },
    {
      _key: "mistral",
      _type: "regionCharacteristic",
      title: "Le mistral",
      text: "Ce vent puissant est une caractéristique majeure du sud de la vallée et contribue à assainir les vignobles."
    }
  ],

  soilTypes: [
    "Galets roulés",
    "Argile",
    "Calcaire",
    "Granite",
    "Sable"
  ],

  mainWineStyles: [
    "Rouges généreux",
    "Rouges épicés",
    "Blancs aromatiques",
    "Rosés"
  ],

  seoTitle:
    "Vallée du Rhône : vins et cépages | Le Premier Verre",

  seoDescription:
    "Comprendre les vins de la Vallée du Rhône : Grenache, Syrah, appellations, styles et bouteilles à découvrir.",

  published: false
});


/* =========================================================
   4. COMPLÉTER LES FICHES CÉPAGES
========================================================= */

await client.patch(grenacheId).set({
  mainRegions: [ref(rhoneId)],
  tryNext: [
    {
      _key: "grenache-syrah",
      _type: "grapeSuggestion",
      grape: ref(syrahId),
      reason: "Pour découvrir un rouge plus épicé, sombre et structuré."
    },
    {
      _key: "grenache-mourvedre",
      _type: "grapeSuggestion",
      grape: ref(mourvedreId),
      reason: "Pour aller vers plus de profondeur, de structure et d’épices."
    }
  ]
}).commit();

await client.patch(carignanId).set({
  mainRegions: [ref(rhoneId)],
  tryNext: [
    {
      _key: "carignan-grenache",
      _type: "grapeSuggestion",
      grape: ref(grenacheId),
      reason: "Pour retrouver le soleil méditerranéen dans un style plus rond et fruité."
    },
    {
      _key: "carignan-syrah",
      _type: "grapeSuggestion",
      grape: ref(syrahId),
      reason: "Pour découvrir un rouge plus poivré et plus immédiatement expressif."
    }
  ]
}).commit();

await client.patch(syrahId).set({
  mainRegions: [ref(rhoneId)],
  tryNext: [
    {
      _key: "syrah-grenache",
      _type: "grapeSuggestion",
      grape: ref(grenacheId),
      reason: "Pour un rouge plus rond, chaleureux et généreux."
    },
    {
      _key: "syrah-mourvedre",
      _type: "grapeSuggestion",
      grape: ref(mourvedreId),
      reason: "Pour explorer davantage la structure et les saveurs méditerranéennes."
    }
  ]
}).commit();

await client.patch(mourvedreId).set({
  mainRegions: [ref(rhoneId)],
  tryNext: [
    {
      _key: "mourvedre-syrah",
      _type: "grapeSuggestion",
      grape: ref(syrahId),
      reason: "Pour conserver la structure tout en gagnant en fruit et en notes poivrées."
    },
    {
      _key: "mourvedre-grenache",
      _type: "grapeSuggestion",
      grape: ref(grenacheId),
      reason: "Pour découvrir un style plus rond, souple et chaleureux."
    }
  ]
}).commit();


/* =========================================================
   5. CÔTES DU RHÔNE
========================================================= */

await upsert(cdrId, {
  _type: "appellation",

  name: "Côtes du Rhône",

  slug: {
    _type: "slug",
    current: "cotes-du-rhone"
  },

  country: ref(franceId),

  region: ref(rhoneId),

  classification: "AOC / AOP",

  description: [
    block(
      "Côtes du Rhône est l’une des grandes appellations régionales françaises. Elle s’étend sur une vaste portion de la vallée et produit des rouges, blancs et rosés. Les rouges du sud sont souvent construits autour du Grenache, accompagné notamment de Syrah et de Mourvèdre. Ils offrent généralement du fruit mûr, des épices et une texture généreuse.",
      "description-cdr"
    )
  ],

  climate:
    "Dans le Rhône méridional, le climat est méditerranéen, avec des étés chauds et secs et une forte influence du mistral.",

  soilTypes: [
    "Galets et argiles",
    "Sols caillouteux",
    "Loess",
    "Sables",
    "Calcaires"
  ],

  grapes: [
    ref(grenacheId),
    ref(syrahId),
    ref(mourvedreId),
    ref(carignanId)
  ],

  authorizedWineStyles: [
    "Vin rouge",
    "Vin blanc",
    "Vin rosé"
  ],

  productionRules: [
    block(
      "L’AOC Côtes du Rhône est reconnue depuis 1937. Pour les rouges du Rhône méridional, le Grenache occupe une place centrale dans les assemblages, aux côtés notamment de la Syrah et du Mourvèdre.",
      "rules-cdr-1"
    ),
    block(
      "L’appellation couvre un vaste territoire de la Vallée du Rhône et autorise plusieurs cépages afin de permettre des assemblages adaptés aux différents terroirs.",
      "rules-cdr-2"
    )
  ],

  foodPairingNotes:
    "Les rouges s’accordent particulièrement bien avec les grillades, l’agneau, les plats mijotés, les viandes rôties et les fromages goûteux.",

  latitude: 44.5,
  longitude: 4.85,

  seoTitle:
    "Côtes du Rhône : comprendre l’appellation | Le Premier Verre",

  seoDescription:
    "Côtes du Rhône expliqué simplement : Grenache, Syrah, assemblages, terroirs et accords à connaître."
});


/* =========================================================
   6. VIDAL-FLEURY
========================================================= */

await upsert(producerId, {
  _type: "producer",

  name: "Vidal-Fleury",

  slug: {
    _type: "slug",
    current: "vidal-fleury"
  },

  municipality: "Ampuis",

  country: ref(franceId),

  region: ref(rhoneId),

  oneLiner:
    "Une maison historique du Rhône qui permet d’explorer une grande variété d’appellations de la vallée sous une même signature.",

  bio: [
    block(
      "Fondée en 1781, Vidal-Fleury est l’une des maisons historiques de la Vallée du Rhône et la plus ancienne encore en activité selon la maison. Son histoire débute à Tupin-et-Semons, au cœur du vignoble de Côte-Rôtie. Aujourd’hui établie à Ampuis, elle produit des vins issus de nombreuses appellations rhodaniennes, du Rhône septentrional jusqu’au sud de la vallée. Cette diversité en fait une maison particulièrement intéressante pour découvrir les différents visages du Rhône.",
      "bio-vidal"
    )
  ],

  approach: [
    {
      _key: "terroirs",
      _type: "producerApproachItem",
      title: "Une lecture de la Vallée du Rhône",
      text: "La maison produit une large gamme d’appellations, ce qui permet de comparer les terroirs du nord et du sud de la vallée."
    },
    {
      _key: "assemblage",
      _type: "producerApproachItem",
      title: "Adapter le vin à l’appellation",
      text: "Assemblages, élevages et vinifications sont adaptés au style et à l’identité recherchés pour chaque appellation."
    },
    {
      _key: "tradition",
      _type: "producerApproachItem",
      title: "Tradition et constance",
      text: "La longue histoire de la maison s’accompagne d’une approche visant à préserver l’identité des terroirs tout en maintenant régularité et équilibre."
    }
  ],

  signatureGrapes: [
    ref(grenacheId),
    ref(syrahId),
    ref(mourvedreId)
  ],

  whyWeFollow:
    "Parce qu’elle permet d’explorer plusieurs styles de la Vallée du Rhône sans changer constamment de producteur. Son Côtes-du-Rhône rouge est aussi une façon abordable de découvrir le caractère généreux et épicé des assemblages du sud.",

  openToVisitors: true,

  visitDetails:
    "Maison située dans le secteur de Côte-Rôtie à Ampuis. Vérifier directement auprès de Vidal-Fleury les modalités de dégustation ou de visite avant de se déplacer.",

  address:
    "Ampuis, France",

  website:
    "https://www.vidal-fleury.com/",

  foundedYear: 1781,

  founder: "Joseph Vidal",

  appellation: ref(cdrId),

  farmingPractices: [
    "Viticulture raisonnée sur certaines parcelles et vignobles"
  ],

  signatureStyles: [
    "Côtes du Rhône",
    "Côte-Rôtie",
    "Rhône septentrional",
    "Rhône méridional"
  ],

  aiSummary:
    "Fondée en 1781, Vidal-Fleury est une maison historique de la Vallée du Rhône proposant une large gamme d’appellations du nord au sud de la région.",

  seoTitle:
    "Vidal-Fleury | Producteur | Le Premier Verre",

  seoDescription:
    "Découvrez Vidal-Fleury, maison historique de la Vallée du Rhône fondée en 1781, ses terroirs et ses vins.",

  published: false
});


/* =========================================================
   7. VIN — VIDAL-FLEURY CÔTES-DU-RHÔNE
========================================================= */

await upsert(wineId, {
  _type: "wine",

  name: "Vidal-Fleury Côtes-du-Rhône",

  slug: {
    _type: "slug",
    current: "vidal-fleury-cotes-du-rhone"
  },

  producer: ref(producerId),

  color: "red",

  country: ref(franceId),

  region: ref(rhoneId),

  appellation: ref(cdrId),

  /*
    La SAQ confirme actuellement Grenache 65 % et Carignan 5 %.
    Elle ne détaille pas les 30 % restants :
    on ne les invente donc pas.
  */
  grapes: [
    ref(grenacheId),
    ref(carignanId)
  ],

  approxPrice: 18.05,

  purchaseChannel: "saq",

  purchaseChannelDetails:
    "SAQ",

  purchaseUrl:
    "https://www.saq.com/fr/14278855",

  purchaseLastChecked:
    "2026-09-09",

  oneLiner:
    "Un rouge du Rhône généreux et épicé, parfait quand on veut plus de corps sans dépasser la barre des vingt dollars.",

  tastingKeywords: [
    "cerise",
    "prune",
    "fruits confits",
    "épices",
    "généreux"
  ],

  perfectFor: [
    "BBQ",
    "Viandes rôties",
    "Souper réconfortant"
  ],

  whyWeRecommend:
    "Parce qu’il offre beaucoup de caractère pour son prix. Plus charnu qu’un rouge léger de semaine, il garde assez d’équilibre pour rester facile à boire à table. C’est une bonne bouteille pour comprendre le style chaleureux du Rhône méridional sans investir dans une appellation plus coûteuse.",

  body: 4,

  sweetness: 1,

  roundness: 4,

  servingTemperature:
    "16–18 °C",

  decant: false,

  style:
    "Rouge sec, corsé, chaleureux et épicé",

  cellaringPotential:
    "À boire maintenant ou dans les prochaines années pour profiter de son fruit et de sa générosité.",

  alcohol: 14.5,

  sugar:
    "3,2 g/L",

  acidity: 3,

  tannins: 3,

  isOrganic: false,

  isNatural: false,

  isBiodynamic: false,

  isVegan: false,

  aromas: [
    "Cerise à l’eau-de-vie",
    "Prune",
    "Fruits confits",
    "Épices"
  ],

  flavors: [
    "Cerise",
    "Prune",
    "Fruits mûrs",
    "Épices"
  ],

  texture:
    "Généreuse, ample et ronde",

  finish:
    "Chaleureuse et épicée",

  intensity: 4,

  complexity: 3,

  oakInfluence: 2,

  bottleSize:
    "750 ml",

  sku:
    "14278855",

  experienceLevel:
    "beginner",

  occasionTags: [
    "BBQ",
    "Souper de semaine",
    "Viandes grillées",
    "Automne",
    "Souper entre amis"
  ],

  aiSummary:
    "Vidal-Fleury Côtes-du-Rhône est un rouge généreux et corsé de la Vallée du Rhône, dominé par le Grenache, avec des notes de cerise, prune, fruits confits et épices.",

  seoTitle:
    "Vidal-Fleury Côtes-du-Rhône | Le Premier Verre",

  seoDescription:
    "Découvrez Vidal-Fleury Côtes-du-Rhône : un rouge généreux, épicé et abordable, parfait avec grillades et viandes rôties.",

  published: false
});


console.log("");
console.log("============================================");
console.log("🍷 FICHE 4 CRÉÉE AVEC SON ÉCOSYSTÈME");
console.log("============================================");
console.log("✓ France");
console.log("✓ Vallée du Rhône");
console.log("✓ Côtes du Rhône");
console.log("✓ Grenache");
console.log("✓ Carignan");
console.log("✓ Syrah");
console.log("✓ Mourvèdre");
console.log("✓ Vidal-Fleury");
console.log("✓ Vidal-Fleury Côtes-du-Rhône");
console.log("");
console.log("Photos : tu les ajouteras plus tard.");
console.log("Millésime du vin : volontairement laissé vide.");
