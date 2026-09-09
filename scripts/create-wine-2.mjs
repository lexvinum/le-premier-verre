import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
});

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function findOrCreate(type, name, extra = {}) {
  const existing = await client.fetch(
    `*[_type == $type && name == $name][0]{_id}`,
    { type, name }
  );

  if (existing?._id) {
    console.log(`✓ ${type}: ${name} déjà présent`);
    return existing._id;
  }

  const id = `${type}-${slugify(name)}`;

  await client.createIfNotExists({
    _id: id,
    _type: type,
    name,
    slug: {
      _type: "slug",
      current: slugify(name),
    },
    ...extra,
  });

  console.log(`+ ${type}: ${name} créé`);
  return id;
}

const countryId = await findOrCreate(
  "country",
  "Autriche"
);

const regionId = await findOrCreate(
  "region",
  "Basse-Autriche (Niederösterreich)",
  {
    country: {
      _type: "reference",
      _ref: countryId,
    },
  }
);

const appellationId = await findOrCreate(
  "appellation",
  "Kamptal DAC",
  {
    country: {
      _type: "reference",
      _ref: countryId,
    },
    region: {
      _type: "reference",
      _ref: regionId,
    },
  }
);

const grapeId = await findOrCreate(
  "grape",
  "Grüner Veltliner"
);

const producerId = await findOrCreate(
  "producer",
  "Weingut Loimer"
);

const wineId = "wine-loimer-lois-gruner-veltliner-2023";

const wine = {
  _id: wineId,
  _type: "wine",

  name: "Lois Grüner Veltliner",

  slug: {
    _type: "slug",
    current: "loimer-lois-gruner-veltliner-2023",
  },

  producer: {
    _type: "reference",
    _ref: producerId,
  },

  vintage: 2023,

  color: "white",

  country: {
    _type: "reference",
    _ref: countryId,
  },

  region: {
    _type: "reference",
    _ref: regionId,
  },

  appellation: {
    _type: "reference",
    _ref: appellationId,
  },

  grapes: [
    {
      _key: "gruner-veltliner",
      _type: "reference",
      _ref: grapeId,
    },
  ],

  approxPrice: 22.05,

  purchaseChannel: "saq",

  purchaseChannelDetails: "SAQ — Produit Cellier",

  purchaseUrl: "https://www.saq.com/fr/11990492",

  purchaseLastChecked: "2026-09-09",

  oneLiner:
    "Un blanc autrichien vif, minéral et désaltérant, parfait pour découvrir le Grüner Veltliner sans se compliquer la vie.",

  tastingKeywords: [
    "pomme verte",
    "mandarine",
    "minéral",
    "floral",
    "agrumes",
  ],

  perfectFor: [
    "Apéro",
    "Fruits de mer",
    "Cuisine asiatique",
  ],

  whyWeRecommend:
    "Parce qu’il permet de sortir des éternels sauvignons et chardonnays sans dérouter personne. Il est frais, précis et très facile à comprendre dès la première gorgée. C’est exactement le genre de bouteille que Le Premier Verre aime proposer pour découvrir un nouveau cépage sans intimidation.",

  body: 3,
  sweetness: 1,
  roundness: 2,

  servingTemperature: "6–8 °C",

  decant: false,

  style:
    "Blanc sec, vif, minéral et fruité",

  cellaringPotential:
    "À boire maintenant ou à conserver jusqu’en 2028 pour le millésime 2023.",

  alcohol: 12,

  sugar: "2 g/L",

  acidity: 4,

  tannins: 1,

  isOrganic: true,

  isNatural: true,

  isBiodynamic: true,

  isVegan: true,

  certifications: [
    "Agriculture biologique",
    "Biodynamie",
  ],

  aromas: [
    "Pomme Granny Smith",
    "Mandarine",
    "Notes florales",
    "Notes minérales",
    "Calcaire",
  ],

  flavors: [
    "Pomme verte",
    "Agrumes",
    "Citron",
    "Minéral",
  ],

  texture:
    "Fraîche, tendue et légèrement généreuse",

  finish:
    "Fraîche, minérale et citronnée",

  intensity: 3,

  complexity: 3,

  oakInfluence: 1,

  vinification: [
    {
      _key: "vinification-1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "vinification-text",
          _type: "span",
          marks: [],
          text:
            "Vendanges manuelles et sélectives. Pressurage principalement en grappes entières, fermentation spontanée en cuves inox. Élevage sur lies en cuves inox.",
        },
      ],
    },
  ],

  aging:
    "Élevage en cuves inox sur lies complètes puis sur lies fines.",

  harvestMethod: "manual",

  bottleSize: "750 ml",

  sku: "11990492",

  experienceLevel: "beginner",

  occasionTags: [
    "Apéro",
    "Été",
    "Découverte",
    "Fruits de mer",
    "Souper léger",
  ],

  aiSummary:
    "Lois Grüner Veltliner de Weingut Loimer est un blanc autrichien sec, vif et minéral. Accessible aux débutants, il offre des notes de pomme verte, de mandarine, d’agrumes et de minéralité. Excellent à l’apéro et avec les fruits de mer.",

  seoTitle:
    "Loimer Lois Grüner Veltliner | Le Premier Verre",

  seoDescription:
    "Découvrez Lois Grüner Veltliner de Weingut Loimer : un blanc autrichien frais, minéral et accessible, parfait à l’apéro et avec les fruits de mer.",

  published: false,
};

await client.createOrReplace(wine);

console.log("");
console.log("🍷 FICHE 2 CRÉÉE");
console.log("Lois Grüner Veltliner — Weingut Loimer");
console.log("ID :", wineId);
console.log("");
console.log("⚠️ Il reste seulement la PHOTO BOUTEILLE à ajouter dans Sanity.");
