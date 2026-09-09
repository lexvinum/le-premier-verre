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
    await client.create({ _id: id, ...data });
    console.log(`+ ${data._type}: ${data.name || id} créé`);
  }
}

const franceId = "country-france";
const gamayId = "grape-gamay";
const beaujolaisId = "region-beaujolais";
const brouillyId = "appellation-brouilly";
const producerId = "producer-georges-duboeuf";
const wineId = "wine-georges-duboeuf-brouilly";

await upsert(franceId, {
  _type: "country",
  name: "France",
  nativeName: "France",
  slug: { _type: "slug", current: "france" },
  isoCode: "FR",
  flagEmoji: "🇫🇷",
  description:
    "Un pays incontournable pour comprendre le vin : une mosaïque de régions, de cépages et d’appellations où le lieu compte souvent autant que le raisin.",
  wineHistory: [
    block(
      "La vigne est cultivée en France depuis l’Antiquité. Au fil des siècles, les différentes régions ont développé leurs propres traditions, cépages et façons de définir l’origine des vins.",
      "history-france"
    )
  ],
  climate:
    "La France possède une grande diversité climatique, des influences océaniques de l’ouest aux climats continentaux de l’est et méditerranéens du sud.",
  mainWineStyles: ["Rouges", "Blancs", "Rosés", "Effervescents", "Liquoreux"],
  seoTitle: "Vins de France | Le Premier Verre",
  seoDescription:
    "Découvrir les vins de France simplement : grandes régions, cépages, appellations et styles à connaître."
});

await upsert(gamayId, {
  _type: "grape",
  name: "Gamay",
  slug: { _type: "slug", current: "gamay" },
  color: "red",
  oneLiner:
    "Un rouge plein de fruit, généralement léger et frais, qui montre qu’un vin rouge n’a pas besoin d’être puissant pour avoir du caractère.",
  aromas: ["Fraise", "Framboise", "Cerise", "Violette", "Poivre"],
  body: 2,
  acidity: 4,
  tannins: 2,
  servingTemperature: "13–15 °C",
  simplePairings: ["Charcuteries", "Poulet rôti", "Burger", "Fromages"],
  originCountry: ref(franceId),
  description:
    "Le Gamay est surtout associé au Beaujolais. Il donne généralement des rouges frais, fruités, souples et peu tanniques.",
  history: [
    block(
      "Le Gamay est un cépage rouge français aujourd’hui intimement lié au Beaujolais.",
      "history-gamay"
    )
  ],
  flavors: ["Fruits rouges", "Cerise", "Épices", "Notes florales"],
  agingPotential:
    "Souvent délicieux jeune; certains crus du Beaujolais peuvent évoluer plusieurs années.",
  seoTitle: "Gamay : comprendre ce cépage | Le Premier Verre",
  seoDescription:
    "Le Gamay expliqué simplement : goût, arômes, accords et régions.",
  published: false
});

await upsert(beaujolaisId, {
  _type: "region",
  name: "Beaujolais",
  slug: { _type: "slug", current: "beaujolais" },
  country: ref(franceId),
  introduction: [
    block(
      "Au sud de la Bourgogne et aux portes de Lyon, le Beaujolais est le royaume du Gamay. Derrière l’image festive du Beaujolais nouveau se cache une région beaucoup plus diverse, avec dix crus capables de produire des rouges précis, gourmands et parfois étonnamment complexes.",
      "intro-beaujolais"
    )
  ],
  locationText:
    "Le Beaujolais se trouve dans l’est de la France, principalement au nord de Lyon.",
  latitude: 46.10,
  longitude: 4.72,
  mapZoom: 8,
  climate:
    "Climat tempéré avec des influences continentales, océaniques et méditerranéennes.",
  signatureGrapes: [ref(gamayId)],
  characteristics: [
    {
      _key: "gamay",
      _type: "regionCharacteristic",
      title: "Le royaume du Gamay",
      text: "Le Gamay domine largement la région et produit des rouges axés sur le fruit et la fraîcheur."
    },
    {
      _key: "crus",
      _type: "regionCharacteristic",
      title: "10 crus à découvrir",
      text: "Brouilly, Morgon, Fleurie, Moulin-à-Vent et six autres crus montrent des expressions très différentes du Gamay."
    },
    {
      _key: "granite",
      _type: "regionCharacteristic",
      title: "Des sols variés",
      text: "Le granite joue un rôle majeur dans plusieurs secteurs, mais la région possède une mosaïque géologique très diversifiée."
    }
  ],
  soilTypes: ["Granite", "Schiste", "Argile", "Calcaire"],
  mainWineStyles: ["Rouges fruités et légers", "Crus du Beaujolais", "Blancs"],
  seoTitle: "Beaujolais : vins et cépages | Le Premier Verre",
  seoDescription:
    "Découvrir le Beaujolais simplement : Gamay, crus, terroirs et bouteilles à connaître.",
  published: false
});

await client.patch(gamayId).set({
  mainRegions: [ref(beaujolaisId)]
}).commit();

await upsert(brouillyId, {
  _type: "appellation",
  name: "Brouilly",
  slug: { _type: "slug", current: "brouilly" },
  country: ref(franceId),
  region: ref(beaujolaisId),
  classification: "AOC / AOP",
  description: [
    block(
      "Brouilly est l’un des dix crus du Beaujolais et l’un des plus accessibles pour découvrir le Gamay.",
      "description-brouilly"
    )
  ],
  climate:
    "Climat tempéré du Beaujolais, avec des coteaux et expositions variés autour du Mont Brouilly.",
  soilTypes: ["Granite rose", "Pierres bleues", "Argiles"],
  grapes: [ref(gamayId)],
  authorizedWineStyles: ["Vin rouge"],
  productionRules: [
    block(
      "Brouilly est une appellation d’origine contrôlée du Beaujolais. Le Gamay noir à jus blanc en est le cépage emblématique.",
      "rules-brouilly"
    )
  ],
  foodPairingNotes:
    "Charcuteries, volailles, cuisine de bistrot, viandes légères et fromages.",
  latitude: 46.10,
  longitude: 4.66,
  seoTitle: "Brouilly : cru du Beaujolais | Le Premier Verre",
  seoDescription:
    "Brouilly expliqué simplement : Gamay, goût, terroirs et accords."
});

await upsert(producerId, {
  _type: "producer",
  name: "Georges Duboeuf",
  slug: { _type: "slug", current: "georges-duboeuf" },
  municipality: "Romanèche-Thorins",
  country: ref(franceId),
  region: ref(beaujolaisId),
  oneLiner:
    "Une maison emblématique qui a largement contribué à faire connaître le Beaujolais et ses crus partout dans le monde.",
  bio: [
    block(
      "Fondée par Georges Duboeuf, la maison est devenue l’un des noms les plus connus du Beaujolais. Elle a largement contribué à faire connaître le Gamay et les différents crus de la région à l’international.",
      "bio-duboeuf"
    )
  ],
  approach: [
    {
      _key: "region",
      _type: "producerApproachItem",
      title: "Mettre le Beaujolais en valeur",
      text: "La maison travaille avec de nombreux vignerons et domaines afin de proposer une large lecture des appellations du Beaujolais."
    },
    {
      _key: "fruit",
      _type: "producerApproachItem",
      title: "Le fruit au premier plan",
      text: "Plusieurs cuvées privilégient une expression franche du Gamay, avec fraîcheur et facilité d’approche."
    }
  ],
  signatureGrapes: [ref(gamayId)],
  whyWeFollow:
    "Parce que c’est une porte d’entrée simple vers le Beaujolais et ses différents crus.",
  openToVisitors: true,
  visitDetails:
    "La maison est associée au Hameau Duboeuf à Romanèche-Thorins.",
  address:
    "796 Route de la Gare, 71570 Romanèche-Thorins, France",
  latitude: 46.184,
  longitude: 4.741,
  website: "https://www.duboeuf.com/",
  foundedYear: 1964,
  founder: "Georges Duboeuf",
  appellation: ref(brouillyId),
  signatureStyles: ["Beaujolais", "Crus du Beaujolais", "Gamay"],
  aiSummary:
    "Georges Duboeuf est une maison emblématique du Beaujolais, reconnue pour avoir contribué à faire connaître le Gamay.",
  seoTitle:
    "Georges Duboeuf | Producteur | Le Premier Verre",
  seoDescription:
    "Découvrez Georges Duboeuf, maison emblématique du Beaujolais.",
  published: false
});

await upsert(wineId, {
  _type: "wine",
  name: "Georges Duboeuf Brouilly",
  slug: { _type: "slug", current: "georges-duboeuf-brouilly" },
  producer: ref(producerId),
  color: "red",
  country: ref(franceId),
  region: ref(beaujolaisId),
  appellation: ref(brouillyId),
  grapes: [ref(gamayId)],
  approxPrice: 24.85,
  purchaseChannel: "saq",
  purchaseChannelDetails: "SAQ",
  purchaseUrl: "https://www.saq.com/fr/70540",
  purchaseLastChecked: "2026-09-09",
  oneLiner:
    "Un rouge léger, fruité et souple qui montre pourquoi le Gamay est l’un des meilleurs alliés des soupers sans complication.",
  tastingKeywords: ["cerise", "framboise", "pivoine", "fruits rouges", "épices"],
  perfectFor: ["Charcuteries", "Poulet rôti", "Souper entre amis"],
  whyWeRecommend:
    "Parce qu’il est facile à aimer sans être banal. Léger, fruité et peu tannique, il constitue une excellente introduction au Gamay et aux crus du Beaujolais.",
  body: 2,
  sweetness: 1,
  roundness: 2,
  servingTemperature: "13–15 °C",
  decant: false,
  style: "Rouge sec, fruité, léger et souple",
  cellaringPotential:
    "Prêt à boire. À privilégier dans sa jeunesse pour profiter de son fruit.",
  alcohol: 13,
  sugar: "1,8 g/L",
  acidity: 4,
  tannins: 2,
  isOrganic: false,
  isNatural: false,
  isBiodynamic: false,
  isVegan: false,
  aromas: ["Cerise", "Framboise", "Pivoine", "Petits fruits rouges", "Notes florales"],
  flavors: ["Fruits rouges", "Cerise", "Framboise", "Épices"],
  texture: "Délicate, souple et légère",
  finish: "Fraîche et fruitée",
  intensity: 3,
  complexity: 2,
  oakInfluence: 1,
  bottleSize: "750 ml",
  sku: "70540",
  experienceLevel: "beginner",
  occasionTags: ["Souper de semaine", "Apéro", "Charcuteries", "BBQ", "Entre amis"],
  aiSummary:
    "Georges Duboeuf Brouilly est un rouge du Beaujolais 100 % Gamay, léger, sec et fruité.",
  seoTitle:
    "Georges Duboeuf Brouilly | Le Premier Verre",
  seoDescription:
    "Découvrez Georges Duboeuf Brouilly : un Gamay du Beaujolais léger, fruité et accessible.",
  published: false
});

await client.patch(franceId).set({
  signatureGrapes: [ref(gamayId)]
}).commit();

console.log("");
console.log("🍷 FICHE 3 CRÉÉE");
console.log("✓ France");
console.log("✓ Beaujolais");
console.log("✓ Brouilly");
console.log("✓ Gamay");
console.log("✓ Georges Duboeuf");
console.log("✓ Georges Duboeuf Brouilly");
