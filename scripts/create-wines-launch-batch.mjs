import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });
const CHECKED = "2026-09-10";

const ref = (_ref) => ({ _type: "reference", _ref });

async function upsertUnique(type, desiredId, data) {
  const existing = await client.fetch(
    `*[
      _type == $type &&
      (
        (defined(slug.current) && slug.current == $slug) ||
        name == $name
      )
    ][0]{_id}`,
    {
      type,
      slug: data.slug?.current || "",
      name: data.name || ""
    }
  );

  const id = existing?._id || desiredId;

  if (existing) {
    await client.patch(id).set(data).commit();
    console.log(`✓ ${type}: ${data.name} réutilisé / complété`);
  } else {
    await client.create({
      _id: id,
      ...data
    });
    console.log(`+ ${type}: ${data.name} créé`);
  }

  return id;
}

const countries = {};

async function country(key, name, slug, extras = {}) {
  countries[key] = await upsertUnique("country", `country-${slug}`, {
    _type: "country",
    name,
    slug: { _type: "slug", current: slug },
    ...extras
  });
}

await country("canada", "Canada", "canada", {
  isoCode: "CA",
  flagEmoji: "🇨🇦"
});

await country("france", "France", "france", {
  isoCode: "FR",
  flagEmoji: "🇫🇷"
});

await country("italie", "Italie", "italie", {
  isoCode: "IT",
  flagEmoji: "🇮🇹"
});

await country("espagne", "Espagne", "espagne", {
  isoCode: "ES",
  flagEmoji: "🇪🇸"
});

await country("portugal", "Portugal", "portugal", {
  isoCode: "PT",
  flagEmoji: "🇵🇹"
});

await country("allemagne", "Allemagne", "allemagne", {
  isoCode: "DE",
  flagEmoji: "🇩🇪"
});

await country("autriche", "Autriche", "autriche", {
  isoCode: "AT",
  flagEmoji: "🇦🇹"
});

const regions = {};

async function region(key, name, slug, countryKey) {
  regions[key] = await upsertUnique("region", `region-${slug}`, {
    _type: "region",
    name,
    slug: { _type: "slug", current: slug },
    country: ref(countries[countryKey]),
    published: false
  });
}

await region("cantons", "Cantons-de-l'Est", "cantons-de-l-est", "canada");
await region("monteregie", "Montérégie", "monteregie", "canada");
await region("rhone", "Vallée du Rhône", "vallee-du-rhone", "france");
await region("bourgogne", "Bourgogne", "bourgogne", "france");
await region("bordeaux", "Bordeaux", "bordeaux", "france");
await region("toscane", "Toscane", "toscane", "italie");
await region("venetie", "Vénétie", "venetie", "italie");
await region("ebre", "Vallée de l'Ebre", "vallee-de-l-ebre", "espagne");
await region("espagne-verte", "L'Espagne Verte", "espagne-verte", "espagne");
await region("catalogne", "Catalogne", "catalogne", "espagne");
await region("vinho-verde", "Vinho Verde", "vinho-verde", "portugal");
await region("douro", "Porto/Douro", "porto-douro", "portugal");
await region("mosel", "Mosel", "mosel", "allemagne");
await region(
  "basse-autriche",
  "Basse-Autriche (Niederösterreich)",
  "basse-autriche-niederosterreich",
  "autriche"
);

const appellations = {};

async function appellation(key, name, slug, countryKey, regionKey, classification) {
  appellations[key] = await upsertUnique(
    "appellation",
    `appellation-${slug}`,
    {
      _type: "appellation",
      name,
      slug: { _type: "slug", current: slug },
      country: ref(countries[countryKey]),
      region: ref(regions[regionKey]),
      classification
    }
  );
}

await appellation(
  "quebec",
  "IGP Vin du Québec",
  "igp-vin-du-quebec",
  "canada",
  "monteregie",
  "Indication géographique protégée (IGP)"
);

await appellation(
  "cotes-rhone",
  "Côtes du Rhône",
  "cotes-du-rhone",
  "france",
  "rhone",
  "AOC / AOP"
);

await appellation(
  "bourgogne",
  "Bourgogne",
  "bourgogne",
  "france",
  "bourgogne",
  "AOC / AOP"
);

await appellation(
  "chablis",
  "Chablis",
  "chablis",
  "france",
  "bourgogne",
  "AOC / AOP"
);

await appellation(
  "bordeaux",
  "Bordeaux",
  "bordeaux",
  "france",
  "bordeaux",
  "AOC / AOP"
);

await appellation(
  "chianti",
  "Chianti",
  "chianti",
  "italie",
  "toscane",
  "DOCG"
);

await appellation(
  "rosso-verona",
  "Rosso Verona IGT",
  "rosso-verona-igt",
  "italie",
  "venetie",
  "IGT / IGP"
);

await appellation(
  "soave",
  "Soave",
  "soave",
  "italie",
  "venetie",
  "DOC / DOP"
);

await appellation(
  "rioja",
  "Rioja",
  "rioja",
  "espagne",
  "ebre",
  "DOCa"
);

await appellation(
  "rias-baixas",
  "Rías Baixas",
  "rias-baixas",
  "espagne",
  "espagne-verte",
  "DO"
);

await appellation(
  "cava",
  "Cava",
  "cava",
  "espagne",
  "catalogne",
  "DO"
);

await appellation(
  "vinho-verde",
  "Vinho Verde",
  "vinho-verde",
  "portugal",
  "vinho-verde",
  "DOC"
);

await appellation(
  "douro",
  "Douro",
  "douro",
  "portugal",
  "douro",
  "DOC"
);

await appellation(
  "mosel",
  "Mosel",
  "mosel",
  "allemagne",
  "mosel",
  "Qualitätswein"
);

await appellation(
  "wachau",
  "Wachau",
  "wachau",
  "autriche",
  "basse-autriche",
  "Qualitätswein"
);

const grapes = {};

async function grape(key, name, slug, color) {
  grapes[key] = await upsertUnique("grape", `grape-${slug}`, {
    _type: "grape",
    name,
    slug: { _type: "slug", current: slug },
    color,
    published: false
  });
}

await grape("seyval", "Seyval", "seyval", "white");
await grape("chardonnay", "Chardonnay", "chardonnay", "white");
await grape("vidal", "Vidal", "vidal", "white");
await grape("lucie-kuhlmann", "Lucie Kuhlmann", "lucie-kuhlmann", "red");
await grape("sabrevois", "Sabrevois", "sabrevois", "red");
await grape("frontenac", "Frontenac noir", "frontenac-noir", "red");
await grape("chancellor", "Chancellor", "chancellor", "red");
await grape("seyval-noir", "Seyval noir", "seyval-noir", "red");
await grape("seyval-blanc", "Seyval blanc", "seyval-blanc", "white");

await grape("grenache", "Grenache", "grenache", "red");
await grape("syrah", "Syrah", "syrah", "red");
await grape("pinot-noir", "Pinot noir", "pinot-noir", "red");

await grape("merlot", "Merlot", "merlot", "red");
await grape(
  "cabernet-sauvignon",
  "Cabernet Sauvignon",
  "cabernet-sauvignon",
  "red"
);
await grape(
  "cabernet-franc",
  "Cabernet Franc",
  "cabernet-franc",
  "red"
);

await grape("sangiovese", "Sangiovese", "sangiovese", "red");
await grape("corvina", "Corvina Veronese", "corvina-veronese", "red");
await grape("rondinella", "Rondinella", "rondinella", "red");
await grape("molinara", "Molinara", "molinara", "red");

await grape("garganega", "Garganega", "garganega", "white");
await grape(
  "trebbiano-soave",
  "Trebbiano di Soave",
  "trebbiano-di-soave",
  "white"
);

await grape("tempranillo", "Tempranillo", "tempranillo", "red");
await grape("albarino", "Albariño", "albarino", "white");

await grape("loureiro", "Loureiro", "loureiro", "white");
await grape("arinto", "Arinto", "arinto", "white");
await grape("trajadura", "Trajadura", "trajadura", "white");
await grape("fernao-pires", "Fernão Pires", "fernao-pires", "white");

await grape("tinta-roriz", "Tinta Roriz", "tinta-roriz", "red");
await grape("tinta-barroca", "Tinta Barroca", "tinta-barroca", "red");
await grape("touriga-franca", "Touriga Franca", "touriga-franca", "red");
await grape(
  "touriga-nacional",
  "Touriga Nacional",
  "touriga-nacional",
  "red"
);

await grape("riesling", "Riesling", "riesling", "white");
await grape(
  "gruner",
  "Grüner Veltliner",
  "gruner-veltliner",
  "white"
);

await grape("macabeo", "Macabeo", "macabeo", "white");
await grape("parellada", "Parellada", "parellada", "white");
await grape("xarel-lo", "Xarel-lo", "xarel-lo", "white");

const producers = {};

async function producer(key, name, slug, countryKey, regionKey, oneLiner) {
  producers[key] = await upsertUnique(
    "producer",
    `producer-${slug}`,
    {
      _type: "producer",
      name,
      slug: { _type: "slug", current: slug },
      country: ref(countries[countryKey]),
      region: ref(regions[regionKey]),
      oneLiner,
      published: false
    }
  );
}

await producer(
  "pervenches",
  "Les Pervenches",
  "les-pervenches",
  "canada",
  "cantons",
  "Un domaine de Farnham reconnu pour une approche biologique, biodynamique et peu interventionniste."
);

await producer(
  "nival",
  "Domaine du Nival",
  "domaine-du-nival",
  "canada",
  "monteregie",
  "Un vignoble de Saint-Louis qui travaille ses parcelles biologiques avec une approche minimaliste au chai."
);

await producer(
  "ridge",
  "Domaine du Ridge",
  "domaine-du-ridge",
  "canada",
  "cantons",
  "Un domaine québécois de Saint-Armand qui propose des cuvées franches, fraîches et accessibles."
);

await producer(
  "perrin",
  "Famille Perrin",
  "famille-perrin",
  "france",
  "rhone",
  "Une famille incontournable du Rhône méridional, connue pour des vins accessibles et fidèles à leur origine."
);

await producer(
  "jadot",
  "Louis Jadot",
  "louis-jadot",
  "france",
  "bourgogne",
  "Une maison historique de Bourgogne qui offre une porte d'entrée claire vers les grands styles de la région."
);

await producer(
  "fevre",
  "William Fèvre",
  "william-fevre",
  "france",
  "bourgogne",
  "Une référence de Chablis dont les vins mettent en avant fraîcheur, précision et minéralité."
);

await producer(
  "mouton",
  "Baron Philippe de Rothschild",
  "baron-philippe-de-rothschild",
  "france",
  "bordeaux",
  "Une maison bordelaise historique derrière Mouton Cadet, créé pour rendre Bordeaux plus accessible."
);

await producer(
  "ruffino",
  "Ruffino",
  "ruffino",
  "italie",
  "toscane",
  "Une maison toscane historique dont le Chianti est devenu un classique accessible."
);

await producer(
  "masi",
  "Masi",
  "masi",
  "italie",
  "venetie",
  "Une maison vénitienne reconnue pour son expertise de l'appassimento et ses rouges de Vérone."
);

await producer(
  "pieropan",
  "Pieropan",
  "pieropan",
  "italie",
  "venetie",
  "Une maison emblématique de Soave, spécialisée dans des blancs précis issus de cépages locaux."
);

await producer(
  "campo-viejo",
  "Campo Viejo",
  "campo-viejo",
  "espagne",
  "ebre",
  "Une maison de Rioja connue pour des interprétations modernes et accessibles du Tempranillo."
);

await producer(
  "martin-codax",
  "Martín Códax",
  "martin-codax",
  "espagne",
  "espagne-verte",
  "Une référence de Rías Baixas qui met l'Albariño au premier plan."
);

await producer(
  "aveleda",
  "Aveleda",
  "aveleda",
  "portugal",
  "vinho-verde",
  "Une maison portugaise historique associée aux blancs frais et légers de Vinho Verde."
);

await producer(
  "casa-ferreirinha",
  "Casa Ferreirinha",
  "casa-ferreirinha",
  "portugal",
  "douro",
  "Une maison pionnière des vins tranquilles du Douro, mettant en valeur les cépages autochtones."
);

await producer(
  "dr-loosen",
  "Dr. Loosen",
  "dr-loosen",
  "allemagne",
  "mosel",
  "Une maison de Mosel emblématique du Riesling allemand et de son équilibre entre fruit et fraîcheur."
);

await producer(
  "domane-wachau",
  "Domäne Wachau",
  "domane-wachau",
  "autriche",
  "basse-autriche",
  "Une référence autrichienne de la Wachau, particulièrement reconnue pour le Grüner Veltliner."
);

await producer(
  "segura",
  "Segura Viudas",
  "segura-viudas",
  "espagne",
  "catalogne",
  "Une maison catalane spécialisée dans le Cava et les vins effervescents traditionnels."
);

const wines = [
  {
    id: "wine-les-pervenches-seyval-chardo-2025",
    name: "Seyval Chardo",
    slug: "les-pervenches-seyval-chardo-2025",
    producer: "pervenches",
    vintage: 2025,
    color: "white",
    country: "canada",
    region: "cantons",
    appellation: "quebec",
    grapes: ["seyval", "chardonnay"],
    approxPrice: 29.89,
    purchaseChannel: "producer",
    purchaseChannelDetails: "Boutique du producteur — disponibilité ponctuelle",
    purchaseUrl: "https://lespervenches.com/collections/frontpage/products/seyval-chardo-2025",
    oneLiner: "Un blanc québécois texturé, exotique et tendu qui montre jusqu'où peuvent aller le Seyval et le Chardonnay d'ici.",
    tastingKeywords: ["ananas", "mangue", "poire", "agrumes", "texture"],
    perfectFor: ["Apéro", "Poisson grillé", "Cuisine végétale"],
    whyWeRecommend: "Parce qu'il sort complètement de l'image qu'on peut encore avoir du vin québécois. Il combine maturité, tension et texture tout en restant très vivant. Une bouteille parfaite pour découvrir le travail précis et sans artifice des Pervenches.",
    body: 3,
    sweetness: 1,
    roundness: 3,
    servingTemperature: "10–12 °C",
    decant: false,
    alcohol: 12.3,
    isOrganic: true,
    isBiodynamic: true,
    isNatural: true,
    style: "Blanc sec, texturé, aromatique et tendu",
    bottleSize: "750 ml",
    experienceLevel: "intermediate"
  },
  {
    id: "wine-domaine-du-nival-matiere-a-discussion-2025",
    name: "Matière à discussion",
    slug: "domaine-du-nival-matiere-a-discussion-2025",
    producer: "nival",
    vintage: 2025,
    color: "white",
    country: "canada",
    region: "monteregie",
    appellation: "quebec",
    grapes: ["vidal"],
    approxPrice: 28.75,
    purchaseChannel: "producer",
    purchaseChannelDetails: "Boutique du Domaine du Nival",
    purchaseUrl: "https://www.nival.ca/collections/disponible/products/matiere-a-discussion-2025",
    oneLiner: "Un Vidal québécois précis, croquant et expressif, avec du fruit mûr et une finale légèrement amère qui appelle la table.",
    tastingKeywords: ["poire", "pêche", "fleurs", "pamplemousse", "fraîcheur"],
    perfectFor: ["Premier verre", "Poisson", "Repas d'été"],
    whyWeRecommend: "Parce qu'il transforme un cépage hybride souvent sous-estimé en véritable vin de table. La fraîcheur est là, mais aussi de la matière et une belle longueur. C'est exactement le genre de bouteille qui fait évoluer les idées reçues sur le vin québécois.",
    body: 3,
    sweetness: 1,
    roundness: 3,
    servingTemperature: "10–12 °C",
    decant: false,
    alcohol: 10.6,
    sugar: "0 g/L",
    isOrganic: true,
    style: "Blanc sec, croquant, texturé et floral",
    bottleSize: "750 ml",
    experienceLevel: "intermediate"
  },
  {
    id: "wine-domaine-du-nival-ces-petits-imprevus-2025",
    name: "Ces petits imprévus",
    slug: "domaine-du-nival-ces-petits-imprevus-2025",
    producer: "nival",
    vintage: 2025,
    color: "sparkling",
    country: "canada",
    region: "monteregie",
    appellation: "quebec",
    grapes: ["vidal"],
    approxPrice: 28.25,
    purchaseChannel: "producer",
    purchaseChannelDetails: "Boutique du Domaine du Nival — vente par caisse selon disponibilité",
    purchaseUrl: "https://www.nival.ca/products/ces-petits-imprevus-2025",
    oneLiner: "Un pétillant naturel québécois de Vidal, léger, frais et généreux, fait pour les premiers beaux jours.",
    tastingKeywords: ["poire", "fruits mûrs", "bulles fines", "fraîcheur", "rondeur"],
    perfectFor: ["Apéro", "Terrasse", "Brunch"],
    whyWeRecommend: "Parce qu'il démontre que les bulles québécoises peuvent être à la fois sérieuses et complètement décontractées. Son faible degré d'alcool, sa fraîcheur et sa bulle fine en font une bouteille particulièrement facile à partager.",
    body: 2,
    sweetness: 1,
    roundness: 3,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 10.5,
    isOrganic: true,
    isNatural: true,
    style: "Pétillant naturel frais et fruité",
    bottleSize: "750 ml",
    experienceLevel: "beginner"
  },
  {
    id: "wine-domaine-du-ridge-seyval-vidal",
    name: "Domaine du Ridge Seyval-Vidal",
    slug: "domaine-du-ridge-seyval-vidal",
    producer: "ridge",
    color: "white",
    country: "canada",
    region: "cantons",
    appellation: "quebec",
    grapes: ["seyval", "vidal"],
    approxPrice: 21.95,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/15378233",
    oneLiner: "Un blanc québécois très vif où la poire, la pêche et l'ananas donnent envie d'en reprendre une gorgée.",
    tastingKeywords: ["poire", "ananas", "pêche", "agrumes", "vivacité"],
    perfectFor: ["Apéro", "Sushis", "Ceviche"],
    whyWeRecommend: "Parce qu'il est simple à comprendre sans être simpliste. Le fruit est évident, la fraîcheur aussi, et son prix en fait une excellente porte d'entrée vers les vins québécois.",
    body: 2,
    sweetness: 1,
    roundness: 1,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 10.2,
    sugar: "<1,2 g/L",
    style: "Blanc sec, léger et très vif",
    bottleSize: "750 ml",
    sku: "15378233",
    experienceLevel: "beginner"
  },
  {
    id: "wine-domaine-du-ridge-lucy-k",
    name: "Domaine du Ridge Lucy K.",
    slug: "domaine-du-ridge-lucy-k",
    producer: "ridge",
    vintage: 2024,
    color: "red",
    country: "canada",
    region: "monteregie",
    appellation: "quebec",
    grapes: ["lucie-kuhlmann", "sabrevois", "frontenac", "chancellor"],
    approxPrice: 21.95,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/15545038",
    oneLiner: "Un rouge québécois léger, acidulé et désaltérant qu'on sert légèrement rafraîchi.",
    tastingKeywords: ["canneberge", "griotte", "fleurs", "fraîcheur", "léger"],
    perfectFor: ["Brunch", "Charcuteries", "Tacos"],
    whyWeRecommend: "Parce qu'il montre une autre façon de boire du rouge : peu alcoolisé, vif, frais et sans lourdeur. Une excellente bouteille pour ceux qui pensent ne pas aimer les rouges ou qui cherchent quelque chose de très digeste.",
    body: 2,
    sweetness: 1,
    roundness: 1,
    servingTemperature: "12–14 °C",
    decant: false,
    alcohol: 10.6,
    sugar: "1,3 g/L",
    style: "Rouge léger, sec et très frais",
    bottleSize: "750 ml",
    sku: "15545038",
    experienceLevel: "beginner"
  },
  {
    id: "wine-domaine-du-ridge-le-litre-du-ridge",
    name: "Le Litre du Ridge",
    slug: "domaine-du-ridge-le-litre-du-ridge",
    producer: "ridge",
    vintage: 2024,
    color: "rose",
    country: "canada",
    region: "monteregie",
    appellation: "quebec",
    grapes: ["seyval-noir", "seyval-blanc", "vidal", "lucie-kuhlmann"],
    approxPrice: 21.95,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/15609716",
    oneLiner: "Un litre de rosé québécois sec, fruité et joyeux, pensé pour être mis au centre de la table.",
    tastingKeywords: ["fraise", "framboise", "fleurs", "fraîcheur", "gourmand"],
    perfectFor: ["Terrasse", "Brunch", "Repas entre amis"],
    whyWeRecommend: "Parce qu'il ne se prend pas trop au sérieux tout en étant très bien fait. Le format d'un litre renforce son côté convivial et son profil sec et frais permet de le servir avec beaucoup plus qu'un simple apéro.",
    body: 2,
    sweetness: 1,
    roundness: 2,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 10.3,
    sugar: "1,2 g/L",
    style: "Rosé sec, léger, fruité et convivial",
    bottleSize: "1 L",
    sku: "15609716",
    experienceLevel: "beginner"
  },
  {
    id: "wine-famille-perrin-cotes-du-rhone-signature-2023",
    name: "Famille Perrin Côtes du Rhône Signature",
    slug: "famille-perrin-cotes-du-rhone-signature-2023",
    producer: "perrin",
    vintage: 2023,
    color: "red",
    country: "france",
    region: "rhone",
    appellation: "cotes-rhone",
    grapes: ["grenache", "syrah"],
    approxPrice: 20,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/918821",
    oneLiner: "Un Côtes du Rhône bio généreux et souple qui met le Grenache au premier plan.",
    tastingKeywords: ["cerise noire", "mûre", "cassis", "épices", "réglisse"],
    perfectFor: ["Pizza", "Poulet grillé", "Cuisine méditerranéenne"],
    whyWeRecommend: "Parce qu'il offre exactement ce qu'un premier Côtes du Rhône devrait offrir : du fruit, des épices, de la générosité et beaucoup de polyvalence à table. Une introduction rassurante à une grande région française.",
    body: 4,
    sweetness: 1,
    roundness: 4,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 13.5,
    sugar: "2,5 g/L",
    isOrganic: true,
    style: "Rouge sec, généreux et épicé",
    bottleSize: "750 ml",
    sku: "918821",
    experienceLevel: "beginner"
  },
  {
    id: "wine-louis-jadot-bourgogne-couvent-des-jacobins-2023",
    name: "Louis Jadot Bourgogne Couvent des Jacobins",
    slug: "louis-jadot-bourgogne-couvent-des-jacobins-2023",
    producer: "jadot",
    vintage: 2023,
    color: "red",
    country: "france",
    region: "bourgogne",
    appellation: "bourgogne",
    grapes: ["pinot-noir"],
    approxPrice: 33,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/966804",
    oneLiner: "Un Pinot noir bourguignon délicat et frais, tout en cerise, fleurs et finesse.",
    tastingKeywords: ["cerise", "griotte", "fleurs", "minéral", "délicat"],
    perfectFor: ["Poulet rôti", "Champignons", "Souper à deux"],
    whyWeRecommend: "Parce qu'il donne un repère clair pour comprendre le Pinot noir de Bourgogne sans commencer par une bouteille très coûteuse. Le fruit, la fraîcheur et la finesse sont faciles à saisir dès le premier verre.",
    body: 3,
    sweetness: 1,
    roundness: 2,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 13,
    sugar: "2,2 g/L",
    style: "Rouge sec, délicat et frais",
    bottleSize: "750 ml",
    sku: "966804",
    experienceLevel: "beginner"
  },
  {
    id: "wine-william-fevre-chablis-les-champs-royaux-2023",
    name: "William Fèvre Chablis Les Champs Royaux",
    slug: "william-fevre-chablis-les-champs-royaux-2023",
    producer: "fevre",
    vintage: 2023,
    color: "white",
    country: "france",
    region: "bourgogne",
    appellation: "chablis",
    grapes: ["chardonnay"],
    approxPrice: 39.75,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ — disponibilité variable selon les succursales",
    purchaseUrl: "https://www.saq.com/fr/276436",
    oneLiner: "Un Chardonnay de Chablis droit, citronné et minéral, sans le profil boisé souvent associé au cépage.",
    tastingKeywords: ["citron", "pomme verte", "fleurs blanches", "minéral", "frais"],
    perfectFor: ["Huîtres", "Crabe", "Fruits de mer"],
    whyWeRecommend: "Parce qu'il permet de comprendre instantanément que Chardonnay ne veut pas forcément dire beurre et bois. Ici, tout passe par la fraîcheur, la tension et la minéralité.",
    body: 2,
    sweetness: 1,
    roundness: 1,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 12.5,
    sugar: "1,3 g/L",
    style: "Blanc sec, vif et minéral",
    bottleSize: "750 ml",
    sku: "276436",
    experienceLevel: "beginner"
  },
  {
    id: "wine-mouton-cadet-bordeaux-rouge",
    name: "Mouton Cadet Bordeaux",
    slug: "mouton-cadet-bordeaux-rouge",
    producer: "mouton",
    color: "red",
    country: "france",
    region: "bordeaux",
    appellation: "bordeaux",
    grapes: ["merlot", "cabernet-sauvignon", "cabernet-franc"],
    approxPrice: 18.45,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/943",
    oneLiner: "Un Bordeaux accessible et rond où le Merlot apporte du fruit et les Cabernets juste assez de structure.",
    tastingKeywords: ["fruits rouges", "chêne", "herbes", "rond", "structuré"],
    perfectFor: ["Poulet rôti", "Pâtes à la viande", "Grillades"],
    whyWeRecommend: "Parce qu'il donne un point de repère simple pour comprendre l'assemblage bordelais. Il est facile à trouver, facile à servir et assez typé pour commencer à reconnaître le rôle du Merlot et des Cabernets.",
    body: 3,
    sweetness: 1,
    roundness: 4,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 14.5,
    sugar: "2,9 g/L",
    style: "Rouge sec, rond et moyennement corsé",
    bottleSize: "750 ml",
    sku: "943",
    experienceLevel: "beginner"
  },
  {
    id: "wine-ruffino-chianti",
    name: "Ruffino Chianti",
    slug: "ruffino-chianti",
    producer: "ruffino",
    color: "red",
    country: "italie",
    region: "toscane",
    appellation: "chianti",
    grapes: ["sangiovese"],
    approxPrice: 17.60,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/1743",
    oneLiner: "Un Chianti simple, fruité et floral qui aime tout ce qui contient tomate, parmesan et huile d'olive.",
    tastingKeywords: ["fruits rouges", "fleurs", "herbes", "épices", "frais"],
    perfectFor: ["Pizza", "Pâtes", "Poulet"],
    whyWeRecommend: "Parce qu'il constitue un repère abordable pour commencer à reconnaître l'acidité et le fruit du Chianti. C'est une bouteille sans complication, particulièrement facile à comprendre avec un plat italien.",
    body: 3,
    sweetness: 1,
    roundness: 3,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 13,
    sugar: "2,1 g/L",
    style: "Rouge sec, fruité et floral",
    bottleSize: "750 ml",
    sku: "1743",
    experienceLevel: "beginner"
  },
  {
    id: "wine-masi-campofiorin-verona",
    name: "Masi Campofiorin Verona",
    slug: "masi-campofiorin-verona",
    producer: "masi",
    color: "red",
    country: "italie",
    region: "venetie",
    appellation: "rosso-verona",
    grapes: ["corvina", "rondinella", "molinara"],
    approxPrice: 24.95,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/155051",
    oneLiner: "Un rouge vénitien riche et velouté qui se situe entre la fraîcheur d'un Valpolicella et la concentration d'un Amarone.",
    tastingKeywords: ["cerise mûre", "fruits cuits", "épices", "velouté", "boisé"],
    perfectFor: ["Pâtes à la viande", "Grillades", "Souper réconfortant"],
    whyWeRecommend: "Parce qu'il permet de découvrir l'effet de l'appassimento sans passer directement à la puissance et au prix d'un Amarone. Généreux mais encore polyvalent, c'est une belle étape pour explorer la Vénétie.",
    body: 4,
    sweetness: 1,
    roundness: 4,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 13,
    sugar: "5 g/L",
    style: "Rouge sec, riche et velouté",
    bottleSize: "750 ml",
    sku: "155051",
    experienceLevel: "intermediate"
  },
  {
    id: "wine-pieropan-soave-classico-2024",
    name: "Pieropan Soave Classico",
    slug: "pieropan-soave-classico-2024",
    producer: "pieropan",
    vintage: 2024,
    color: "white",
    country: "italie",
    region: "venetie",
    appellation: "soave",
    grapes: ["garganega", "trebbiano-soave"],
    approxPrice: 21.70,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/11027743",
    oneLiner: "Un blanc italien bio, citronné et floral, avec juste assez de texture pour passer facilement de l'apéro à la table.",
    tastingKeywords: ["agrumes", "pomme", "fleurs blanches", "craie", "frais"],
    perfectFor: ["Apéro", "Salades", "Poisson blanc"],
    whyWeRecommend: "Parce qu'il fait découvrir deux cépages italiens moins connus dans un style immédiatement accessible. Frais sans être maigre, il offre énormément de polyvalence pour son prix.",
    body: 2,
    sweetness: 1,
    roundness: 2,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 12,
    sugar: "5,2 g/L",
    isOrganic: true,
    style: "Blanc sec, frais, floral et légèrement texturé",
    bottleSize: "750 ml",
    sku: "11027743",
    experienceLevel: "beginner"
  },
  {
    id: "wine-campo-viejo-tempranillo-rioja",
    name: "Campo Viejo Tempranillo Rioja",
    slug: "campo-viejo-tempranillo-rioja",
    producer: "campo-viejo",
    color: "red",
    country: "espagne",
    region: "ebre",
    appellation: "rioja",
    grapes: ["tempranillo"],
    approxPrice: 16.45,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/11462446",
    oneLiner: "Un Tempranillo de Rioja fruité et épicé avec une touche de bois facile à reconnaître.",
    tastingKeywords: ["cerise", "prune", "vanille", "épices", "boisé"],
    perfectFor: ["Pâtes", "Poulet grillé", "Tapas"],
    whyWeRecommend: "Parce qu'il fournit un excellent point de départ pour comprendre le Tempranillo et le style Rioja. Son fruit reste bien présent malgré les notes de bois, et son prix permet de l'essayer sans hésitation.",
    body: 3,
    sweetness: 1,
    roundness: 3,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 13,
    sugar: "2 g/L",
    style: "Rouge sec, fruité, épicé et légèrement boisé",
    bottleSize: "750 ml",
    sku: "11462446",
    experienceLevel: "beginner"
  },
  {
    id: "wine-martin-codax-albarino-rias-baixas-2025",
    name: "Martín Códax Albariño Rías Baixas",
    slug: "martin-codax-albarino-rias-baixas-2025",
    producer: "martin-codax",
    vintage: 2025,
    color: "white",
    country: "espagne",
    region: "espagne-verte",
    appellation: "rias-baixas",
    grapes: ["albarino"],
    approxPrice: 27.15,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ — actuellement épuisé, disponibilité à revérifier",
    purchaseUrl: "https://www.saq.com/fr/15409183",
    oneLiner: "Un Albariño galicien frais, floral et salin qui semble avoir été inventé pour les fruits de mer.",
    tastingKeywords: ["agrumes", "pêche", "fleurs blanches", "salin", "frais"],
    perfectFor: ["Fruits de mer", "Poisson", "Apéro"],
    whyWeRecommend: "Parce qu'il permet de découvrir un cépage extrêmement facile à aimer tout en ouvrant la porte aux vins de la côte atlantique espagnole. Une bouteille lumineuse, nette et très gastronomique.",
    body: 2,
    sweetness: 1,
    roundness: 2,
    servingTemperature: "8–10 °C",
    decant: false,
    alcohol: 12.5,
    sugar: "5,3 g/L",
    style: "Blanc sec, floral, fruité et frais",
    bottleSize: "750 ml",
    sku: "15409183",
    experienceLevel: "beginner"
  },
  {
    id: "wine-aveleda-fonte-vinho-verde",
    name: "Aveleda Fonte Vinho Verde",
    slug: "aveleda-fonte-vinho-verde",
    producer: "aveleda",
    color: "white",
    country: "portugal",
    region: "vinho-verde",
    appellation: "vinho-verde",
    grapes: ["loureiro", "arinto", "trajadura", "fernao-pires"],
    approxPrice: 13.85,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/5322",
    oneLiner: "Un Vinho Verde léger, citronné et légèrement perlant qui coûte moins cher que bien des verres au restaurant.",
    tastingKeywords: ["lime", "pomme verte", "agrumes", "minéral", "léger"],
    perfectFor: ["Apéro", "Tacos de poisson", "Fruits de mer"],
    whyWeRecommend: "Parce qu'à ce prix, il devient un formidable outil pour découvrir un style plutôt qu'une bouteille intimidante. Léger en alcool, très frais et légèrement doux, il est particulièrement facile d'approche.",
    body: 1,
    sweetness: 3,
    roundness: 2,
    servingTemperature: "8–10 °C",
    decant: false,
    alcohol: 9.5,
    sugar: "18 g/L",
    style: "Blanc léger, frais, légèrement doux et perlant",
    bottleSize: "750 ml",
    sku: "5322",
    experienceLevel: "beginner"
  },
  {
    id: "wine-casa-ferreirinha-papa-figos-douro-2024",
    name: "Casa Ferreirinha Papa Figos Douro",
    slug: "casa-ferreirinha-papa-figos-douro-2024",
    producer: "casa-ferreirinha",
    vintage: 2024,
    color: "red",
    country: "portugal",
    region: "douro",
    appellation: "douro",
    grapes: ["tinta-roriz", "tinta-barroca", "touriga-franca", "touriga-nacional"],
    approxPrice: 17.95,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/13385325",
    oneLiner: "Un rouge du Douro généreux et fruité qui fait découvrir les cépages du Porto dans un vin tranquille.",
    tastingKeywords: ["fruits noirs", "prune", "fruits mûrs", "tabac", "épices"],
    perfectFor: ["Grillades", "Porc", "Burger"],
    whyWeRecommend: "Parce qu'il permet de découvrir le Douro autrement que par le Porto. Les cépages locaux donnent beaucoup de fruit et de caractère tout en restant souples et accessibles à table.",
    body: 3,
    sweetness: 1,
    roundness: 4,
    servingTemperature: "15–17 °C",
    decant: false,
    alcohol: 13,
    sugar: "2,2 g/L",
    style: "Rouge sec, généreux et fruité",
    bottleSize: "750 ml",
    sku: "13385325",
    experienceLevel: "beginner"
  },
  {
    id: "wine-dr-loosen-riesling-mosel-2025",
    name: "Dr. Loosen Riesling Mosel",
    slug: "dr-loosen-riesling-mosel-2025",
    producer: "dr-loosen",
    vintage: 2025,
    color: "white",
    country: "allemagne",
    region: "mosel",
    appellation: "mosel",
    grapes: ["riesling"],
    approxPrice: 19.85,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ — disponibilité variable selon les succursales",
    purchaseUrl: "https://www.saq.com/fr/10685251",
    oneLiner: "Un Riesling allemand léger en alcool, fruité et franchement tendre, équilibré par une acidité vive.",
    tastingKeywords: ["agrumes", "pêche", "fruit", "acidité", "doux"],
    perfectFor: ["Cuisine épicée", "Cari", "Apéro"],
    whyWeRecommend: "Parce qu'il est parfait pour comprendre qu'un peu de sucre dans un vin n'est pas un défaut. La vivacité du Riesling équilibre le fruit et la douceur, surtout avec des plats épicés ou salés.",
    body: 2,
    sweetness: 4,
    roundness: 3,
    servingTemperature: "8–10 °C",
    decant: false,
    alcohol: 8.5,
    sugar: "44 g/L",
    style: "Blanc fruité, tendre, vif et peu alcoolisé",
    bottleSize: "750 ml",
    sku: "10685251",
    experienceLevel: "beginner"
  },
  {
    id: "wine-domane-wachau-gruner-veltliner-selection-2024",
    name: "Domäne Wachau Grüner Veltliner Selection",
    slug: "domane-wachau-gruner-veltliner-selection-2024",
    producer: "domane-wachau",
    vintage: 2024,
    color: "white",
    country: "autriche",
    region: "basse-autriche",
    appellation: "wachau",
    grapes: ["gruner"],
    approxPrice: 21.10,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/13750089",
    oneLiner: "Un blanc autrichien très sec, citronné et poivré, précis sans être sévère.",
    tastingKeywords: ["citron", "pomme", "poivre blanc", "minéral", "vif"],
    perfectFor: ["Sushis", "Poisson blanc", "Apéro"],
    whyWeRecommend: "Parce qu'il est l'une des façons les plus simples de rencontrer le Grüner Veltliner. Son profil sec, citronné et légèrement poivré est distinctif tout en demeurant extrêmement polyvalent.",
    body: 2,
    sweetness: 1,
    roundness: 1,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 12.5,
    sugar: "<1,2 g/L",
    style: "Blanc très sec, vif, minéral et légèrement poivré",
    bottleSize: "750 ml",
    sku: "13750089",
    experienceLevel: "beginner"
  },
  {
    id: "wine-segura-viudas-brut-organic",
    name: "Segura Viudas Brut Organic",
    slug: "segura-viudas-brut-organic",
    producer: "segura",
    color: "sparkling",
    country: "espagne",
    region: "catalogne",
    appellation: "cava",
    grapes: ["macabeo", "parellada", "xarel-lo"],
    approxPrice: 17.95,
    purchaseChannel: "saq",
    purchaseChannelDetails: "SAQ",
    purchaseUrl: "https://www.saq.com/fr/15416560",
    oneLiner: "Un Cava bio frais, citronné et très abordable qui prouve qu'on n'a pas besoin d'une grande occasion pour ouvrir des bulles.",
    tastingKeywords: ["citron", "fruits blancs", "fleurs", "craie", "bulles fines"],
    perfectFor: ["Apéro", "Saumon fumé", "Soirée improvisée"],
    whyWeRecommend: "Parce qu'il enlève complètement le cérémonial autour des bulles. Sec, frais, polyvalent et offert sous les 20 $, il est parfait pour apprendre à connaître le Cava et pour toujours avoir une bouteille de mousseux sous la main.",
    body: 2,
    sweetness: 2,
    roundness: 2,
    servingTemperature: "6–8 °C",
    decant: false,
    alcohol: 11.5,
    sugar: "8,8 g/L",
    isOrganic: true,
    style: "Mousseux sec, frais et citronné",
    bottleSize: "750 ml",
    sku: "15416560",
    experienceLevel: "beginner"
  }
];

for (const wine of wines) {
  const {
    id,
    producer,
    country,
    region,
    appellation,
    grapes: wineGrapes,
    ...data
  } = wine;

  await upsertUnique("wine", id, {
    _type: "wine",
    ...data,
    producer: ref(producers[producer]),
    country: ref(countries[country]),
    region: ref(regions[region]),
    appellation: ref(appellations[appellation]),
    grapes: wineGrapes.map((g) => ref(grapes[g])),
    purchaseLastChecked: CHECKED,
    occasionTags: data.perfectFor,
    aiSummary: data.oneLiner,
    seoTitle: `${data.name} | Le Premier Verre`,
    seoDescription: `${data.oneLiner} Découvrez son profil, ses accords, son prix et pourquoi Le Premier Verre le recommande.`,
    published: false
  });
}

console.log("");
console.log("=================================================");
console.log("🍷 LOT DE 20 FICHES DE LANCEMENT PRÉPARÉ");
console.log("=================================================");
console.log(`✓ ${wines.length} vins traités`);
console.log("✓ doublons vérifiés par type, slug et nom");
console.log("✓ références existantes réutilisées");
console.log("✓ références manquantes créées");
console.log("✓ date achat vérifiée : 2026-09-10");
console.log("✓ photos à ajouter manuellement plus tard");
console.log("✓ toutes les fiches demeurent non publiées");
console.log("");
