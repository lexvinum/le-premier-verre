import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-01-01",
  useCdn: false,
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function block(text: string) {
  return [
    {
      _type: "block",
      _key: slugify(text).slice(0, 20),
      style: "normal",
      children: [
        {
          _type: "span",
          _key: "span",
          text,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ];
}

function ref(id: string) {
  return { _type: "reference", _ref: id };
}

function refArray(ids: string[]) {
  return ids.map((id, index) => ({
    _key: `${slugify(id)}-${index}`,
    _type: "reference",
    _ref: id,
  }));
}

const regions = [
  "Québec, Montérégie",
  "Québec, Cantons de l'Est",
  "Québec, Basses-Laurentides",
  "Québec, Lanaudière",
];

const grapes = [
  ["Maréchal Foch", "red"],
  ["Frontenac", "red"],
  ["Frontenac Noir", "red"],
  ["Sabrevois", "red"],
  ["Sainte-Croix", "red"],
  ["Lucie Kuhlmann", "red"],
];

const producers = [
  {
    name: "Ferme C.M.J.I Robert inc.",
    region: "Québec, Montérégie",
    shortBio:
      "Producteur québécois associé à Coteau Rougemont, en Montérégie, avec des vins accessibles et pensés pour les moments de partage.",
  },
  {
    name: "Domaine du Ridge",
    region: "Québec, Cantons de l'Est",
    shortBio:
      "Domaine de Saint-Armand, figure importante de la Route des vins du Québec, reconnu pour ses cuvées locales accessibles.",
  },
  {
    name: "Domaine St-Jacques",
    region: "Québec, Montérégie",
    shortBio:
      "Domaine montérégien produisant des vins québécois expressifs, dont une réserve rouge biologique au profil ample.",
  },
  {
    name: "La Halte des Pèlerins",
    region: "Québec, Cantons de l'Est",
    shortBio:
      "Vignoble urbain de Sherbrooke fondé sur une approche conviviale, familiale et épicurienne du vin québécois.",
  },
  {
    name: "Léon Courville vigneron",
    region: "Québec, Cantons de l'Est",
    shortBio:
      "Vignoble de Lac-Brome installé sur les flancs du mont Brome, reconnu pour ses vins de climat frais.",
  },
  {
    name: "Vignobles Les Petits Cailloux",
    region: "Québec, Montérégie",
    shortBio:
      "Vignoble familial de Saint-Paul-d'Abbotsford, au pied du mont Yamaska, travaillant des cépages adaptés au Québec.",
  },
  {
    name: "Vignoble Les Vents d'Ange",
    region: "Québec, Basses-Laurentides",
    shortBio:
      "Domaine de Saint-Joseph-du-Lac fondé en 1998, reconnu pour des vins accessibles, fruités et conviviaux.",
  },
  {
    name: "Vignoble Gagliano",
    region: "Québec, Cantons de l'Est",
    shortBio:
      "Producteur québécois offrant des vins légers, frais et fruités issus notamment de cépages hybrides adaptés au climat local.",
  },
  {
    name: "Vignoble le Mernois",
    region: "Québec, Lanaudière",
    shortBio:
      "Producteur lanaudois associé au terroir Saint-Thomas, avec des rouges marqués par la fraîcheur et des notes boisées.",
  },
];

const wines = [
  {
    name: "Coteau Rougemont Versant Rouge",
    vintage: 2022,
    price: 16.95,
    producer: "Ferme C.M.J.I Robert inc.",
    region: "Québec, Montérégie",
    sku: "12204086",
    alcohol: 12,
    sugar: "2,6 g/L",
    aromas: ["cerise", "framboise", "herbe séchée", "mûre"],
    grapes: [],
    acidity: 3,
    body: 3,
    tannins: 2,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge québécois fruité, léger à mi-corsé, pensé pour être servi légèrement frais avec des plats simples et conviviaux.",
  },
  {
    name: "Domaine du Ridge Le Bâtonnier",
    vintage: 2023,
    price: 16.95,
    producer: "Domaine du Ridge",
    region: "Québec, Cantons de l'Est",
    sku: "11633161",
    alcohol: 12,
    sugar: "2,5 g/L",
    aromas: ["betterave", "fruits noirs", "réglisse"],
    grapes: ["Maréchal Foch"],
    acidity: 3,
    body: 2,
    tannins: 2,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge léger de Maréchal Foch, sec et généreux, avec un profil original de fruits noirs, betterave et réglisse.",
  },
  {
    name: "Domaine St-Jacques Réserve Rouge",
    vintage: 2023,
    price: 21.75,
    producer: "Domaine St-Jacques",
    region: "Québec, Montérégie",
    sku: "11506365",
    alcohol: 12,
    sugar: "3,5 g/L",
    aromas: ["cassis", "cerise", "épices", "notes grillées", "violette"],
    grapes: ["Lucie Kuhlmann", "Maréchal Foch"],
    acidity: 3,
    body: 3,
    tannins: 3,
    servingTemperature: "De 14°C à 16°C",
    isOrganic: true,
    aiSummary:
      "Un rouge québécois biologique, ample et épicé, avec une belle profondeur pour accompagner viandes grillées, volailles et fromages.",
  },
  {
    name: "La Halte des Pèlerins",
    vintage: 2022,
    price: 18.05,
    producer: "La Halte des Pèlerins",
    region: "Québec, Cantons de l'Est",
    sku: "12263422",
    alcohol: 13.6,
    sugar: "2,8 g/L",
    aromas: ["cerise", "épices", "fraise", "notes végétales"],
    grapes: ["Frontenac", "Sabrevois"],
    acidity: 4,
    body: 2,
    tannins: 2,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge léger et vif, aux notes de petits fruits et d'épices, idéal servi frais avec plats italiens, veau ou fromages.",
  },
  {
    name: "La Halte des Pèlerins Le Prestige",
    vintage: 2020,
    price: 25.55,
    producer: "La Halte des Pèlerins",
    region: "Québec, Cantons de l'Est",
    sku: "11833770",
    alcohol: 13,
    sugar: "2,1 g/L",
    aromas: ["épices", "petits fruits rouges", "tabac"],
    grapes: [],
    acidity: 3,
    body: 3,
    tannins: 3,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge québécois plus généreux, sec et épicé, pensé pour les viandes grillées, plats fumés et repas réconfortants.",
  },
  {
    name: "Léon Courville Vigneron Cuvée Julien",
    vintage: 2023,
    price: 18.85,
    producer: "Léon Courville vigneron",
    region: "Québec, Cantons de l'Est",
    sku: "10680118",
    alcohol: 12,
    sugar: "2,4 g/L",
    aromas: ["cerise", "mûre", "notes végétales", "poivre"],
    grapes: ["Maréchal Foch"],
    acidity: 3,
    body: 3,
    tannins: 2,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge de climat frais, fruité et poivré, très polyvalent avec charcuteries, tajines, agneau ou plats mijotés.",
  },
  {
    name: "Les Petits Cailloux",
    vintage: 2022,
    price: 19.55,
    producer: "Vignobles Les Petits Cailloux",
    region: "Québec, Montérégie",
    sku: "11679944",
    alcohol: 12.5,
    sugar: "3,7 g/L",
    aromas: ["cacao", "chêne grillé", "mûre", "petits fruits rouges"],
    grapes: ["Frontenac Noir", "Sainte-Croix", "Maréchal Foch"],
    acidity: 3,
    body: 3,
    tannins: 3,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge québécois mi-corsé, boisé et gourmand, avec une belle présence de fruits noirs, cacao et notes grillées.",
  },
  {
    name: "Les Vents d'Ange Alexandra",
    vintage: 2023,
    price: 15.15,
    producer: "Vignoble Les Vents d'Ange",
    region: "Québec, Basses-Laurentides",
    sku: "11576275",
    alcohol: 12,
    sugar: "1,9 g/L",
    aromas: ["bleuet", "cannelle", "cerise", "notes animales"],
    grapes: [],
    acidity: 4,
    body: 2,
    tannins: 2,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge léger, frais et convivial, parfait pour pizza, pâtes sauce tomate, apéro et repas entre amis.",
  },
  {
    name: "Vignoble Gagliano Tinello",
    vintage: 2024,
    price: 20.3,
    producer: "Vignoble Gagliano",
    region: "Québec, Cantons de l'Est",
    sku: "11398270",
    alcohol: 12,
    sugar: "2,1 g/L",
    aromas: ["épices", "notes végétales", "petits fruits rouges"],
    grapes: ["Frontenac", "Sabrevois"],
    acidity: 4,
    body: 2,
    tannins: 3,
    servingTemperature: "De 13°C à 15°C",
    aiSummary:
      "Un rouge léger et frais, issu de Frontenac et Sabrevois, à servir légèrement rafraîchi avec pizza, légumes grillés ou plats simples.",
  },
  {
    name: "Vignoble Saint-Thomas Terratabac",
    vintage: 2021,
    price: 22.25,
    producer: "Vignoble le Mernois",
    region: "Québec, Lanaudière",
    sku: "11441400",
    alcohol: 13,
    sugar: "1,9 g/L",
    aromas: ["cerise", "fruits cuits", "notes boisées", "notes grillées"],
    grapes: [],
    acidity: 4,
    body: 3,
    tannins: 3,
    servingTemperature: "De 14°C à 16°C",
    aiSummary:
      "Un rouge québécois boisé et fruité, avec une acidité vive et un profil chaleureux pour viandes, dinde rôtie et tartare.",
  },
];

async function main() {
  console.log("Import SAQ Québec — départ");

  await client.createOrReplace({
    _id: "country-canada",
    _type: "country",
    name: "Canada",
    slug: { _type: "slug", current: "canada" },
  });

  for (const region of regions) {
    await client.createOrReplace({
      _id: `region-${slugify(region)}`,
      _type: "region",
      name: region,
      slug: { _type: "slug", current: slugify(region) },
      country: ref("country-canada"),
      description: `Région viticole canadienne présente dans le répertoire du Premier Verre.`,
      seoTitle: `${region} | Le Premier Verre`,
      seoDescription: `Explorer les vins de ${region}.`,
    });
  }

  for (const [name, color] of grapes) {
    await client.createOrReplace({
      _id: `grape-${slugify(name)}`,
      _type: "grape",
      name,
      slug: { _type: "slug", current: slugify(name) },
      color,
      description: `Cépage utilisé dans plusieurs vins québécois du répertoire.`,
      seoTitle: `${name} | Le Premier Verre`,
      seoDescription: `Découvrir le cépage ${name}.`,
    });
  }

  for (const producer of producers) {
    await client.createOrReplace({
      _id: `producer-${slugify(producer.name)}`,
      _type: "producer",
      name: producer.name,
      slug: { _type: "slug", current: slugify(producer.name) },
      region: ref(`region-${slugify(producer.region)}`),
      country: ref("country-canada"),
      shortBio: producer.shortBio,
      bio: block(producer.shortBio),
      aiSummary: producer.shortBio,
      published: true,
      seoTitle: `${producer.name} | Le Premier Verre`,
      seoDescription: producer.shortBio,
    });
  }

  for (const wine of wines) {
    await client.createOrReplace({
      _id: `wine-saq-${wine.sku}`,
      _type: "wine",
      name: wine.name,
      slug: { _type: "slug", current: slugify(`${wine.name}-${wine.vintage}`) },
      vintage: wine.vintage,
      color: "red",
      style: "dry",
      producer: ref(`producer-${slugify(wine.producer)}`),
      country: ref("country-canada"),
      region: ref(`region-${slugify(wine.region)}`),
      grapes: refArray(wine.grapes.map((g) => `grape-${slugify(g)}`)),
      saqPrice: wine.price,
      availableAtSaq: true,
      servingTemperature: wine.servingTemperature,
      cellaringPotential: "Prêt à boire",
      alcohol: wine.alcohol,
      sugar: wine.sugar,
      acidity: wine.acidity,
      body: wine.body,
      tannins: wine.tannins,
      aromas: wine.aromas,
      flavors: wine.aromas,
      texture: "généreuse",
      finish: "moyenne",
      intensity: 3,
      sweetness: 1,
      complexity: 3,
      oakInfluence: wine.aromas.some((a) => a.includes("bois") || a.includes("chêne") || a.includes("grill"))
        ? 3
        : 1,
      bottleSize: "750 ml",
      sku: wine.sku,
      isOrganic: wine.isOrganic ?? false,
      isNatural: false,
      isBiodynamic: false,
      isVegan: false,
      occasionTags: ["souper", "vin québécois", "découverte", "recevoir"],
      experienceLevel: "beginner",
      aiSummary: wine.aiSummary,
      tastingNotes: block(wine.aiSummary),
      editorialNote: block(wine.aiSummary),
      seoTitle: `${wine.name} ${wine.vintage} | Le Premier Verre`,
      seoDescription: wine.aiSummary,
      published: true,
    });
  }

  console.log(`Import terminé : ${wines.length} vins, ${producers.length} producteurs, ${regions.length} régions, ${grapes.length} cépages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
