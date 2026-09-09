import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const countryId = "country-france";
const regionId = "region-vallee-de-la-loire";
const grapeId = "grape-melon-de-bourgogne";
const producerId = "producer-marcel-martin";
const appellationId = "appellation-muscadet-sevre-et-maine";
const wineId = "wine-la-sablette-muscadet-sevre-et-maine-sur-lie";

const ref = (_ref: string) => ({
  _type: "reference",
  _ref,
});

const pt = (text: string) => [
  {
    _type: "block",
    _key: "block1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "span1",
        text,
        marks: [],
      },
    ],
  },
];

async function run() {
  console.log("🍷 Création de La Sablette dans Sanity...");

  // 1. Vérifier France
  const france = await client.getDocument(countryId);

  if (!france) {
    throw new Error(
      'Le document "country-france" est introuvable. Import annulé.'
    );
  }

  // 2. Créer d'abord la région minimale.
  // Cela permet ensuite au cépage de la référencer.
  await client.createIfNotExists({
    _id: regionId,
    _type: "region",
    name: "Vallée de la Loire",
    slug: {
      _type: "slug",
      current: "vallee-de-la-loire",
    },
    country: ref(countryId),
    published: false,
  });

  // Chercher des cépages déjà présents pour les suggestions "À essayer".
  const alternatives = await client.fetch<
    Array<{ _id: string; name: string }>
  >(
    `*[
      _type == "grape" &&
      name in [
        "Picpoul",
        "Albariño",
        "Alvarinho",
        "Sauvignon Blanc",
        "Chenin Blanc",
        "Riesling",
        "Chardonnay"
      ]
    ][0...2]{_id, name}`
  );

  const tryNext =
    alternatives.length >= 2
      ? alternatives.map((g, index) => ({
          _key: `suggestion${index + 1}`,
          _type: "grapeSuggestion",
          grape: ref(g._id),
          reason:
            "Pour rester dans un registre frais et vif tout en découvrant un autre profil.",
        }))
      : undefined;

  // 3. Melon de Bourgogne
  const grapeDoc: Record<string, any> = {
    _id: grapeId,
    _type: "grape",
    name: "Melon de Bourgogne",
    slug: {
      _type: "slug",
      current: "melon-de-bourgogne",
    },
    color: "white",

    oneLiner:
      "Un cépage blanc vif et discret, surtout connu pour le Muscadet, qui mise davantage sur la fraîcheur que sur la puissance.",

    aromas: [
      "agrumes",
      "pomme verte",
      "fruits blancs",
      "notes salines",
    ],

    body: 1,
    acidity: 5,
    tannins: 1,
    servingTemperature: "6–10 °C",

    simplePairings: [
      "Huîtres",
      "Fruits de mer",
      "Poisson blanc",
      "Apéro",
    ],

    mainRegions: [ref(regionId)],

    originCountry: ref(countryId),

    description:
      "Cépage blanc emblématique du Muscadet, apprécié pour des vins secs, légers et très frais.",

    agingPotential:
      "Généralement à boire jeune, même si certaines cuvées sur lie ou de terroir peuvent évoluer plus longtemps.",

    seoTitle:
      "Melon de Bourgogne : le cépage du Muscadet | Le Premier Verre",

    seoDescription:
      "Découvrir le Melon de Bourgogne : un cépage blanc frais et léger, intimement lié au Muscadet et au Pays Nantais.",

    published: false,
  };

  if (tryNext) {
    grapeDoc.tryNext = tryNext;
  }

  await client.createIfNotExists(grapeDoc as any);

  // 4. Compléter Vallée de la Loire
  await client
    .patch(regionId)
    .setIfMissing({
      introduction: pt(
        "La Vallée de la Loire suit le fleuve sur plusieurs centaines de kilomètres et rassemble une grande diversité de styles. Pour commencer à s’y retrouver, inutile de tout apprendre : on peut simplement retenir qu’on y trouve beaucoup de vins qui misent sur la fraîcheur, qu’ils soient blancs, rouges, rosés ou effervescents. À l’ouest, près de l’Atlantique, le Muscadet en est l’un des exemples les plus faciles à reconnaître."
      ),

      locationText:
        "La Vallée de la Loire traverse une large partie du centre et de l’ouest de la France jusqu’à l’Atlantique. Le Muscadet se situe à son extrémité occidentale, autour de Nantes.",

      latitude: 47.3,
      longitude: 0.7,
      mapZoom: 6,

      climate:
        "Le climat varie beaucoup d’un bout à l’autre de la Loire. L’influence océanique est particulièrement importante dans la partie occidentale, où elle contribue à conserver de la fraîcheur dans les vins.",

      signatureGrapes: [ref(grapeId)],

      characteristics: [
        {
          _key: "freshness",
          _type: "regionCharacteristic",
          title: "La fraîcheur comme fil conducteur",
          text:
            "Même si la région est très vaste, de nombreux vins de Loire se distinguent par leur vivacité et leur facilité à table.",
        },
        {
          _key: "diversity",
          _type: "regionCharacteristic",
          title: "Beaucoup plus qu’un seul style",
          text:
            "Blancs secs, rouges légers, bulles, vins doux : la Loire permet de découvrir plusieurs styles sans changer complètement de région.",
        },
        {
          _key: "muscadet",
          _type: "regionCharacteristic",
          title: "Le Muscadet à l’ouest",
          text:
            "Près de Nantes et de l’Atlantique, le Melon de Bourgogne donne des blancs secs et vifs particulièrement à l’aise avec les fruits de mer.",
        },
      ],

      soilTypes: [
        "schistes",
        "gneiss",
        "granite",
        "calcaire",
        "argile",
      ],

      mainWineStyles: [
        "blanc sec",
        "rouge",
        "rosé",
        "effervescent",
        "moelleux",
      ],

      seoTitle:
        "Vallée de la Loire : vins, cépages et régions | Le Premier Verre",

      seoDescription:
        "Découvrir les vins de la Vallée de la Loire simplement : styles, cépages, repères et bouteilles à essayer.",

      published: false,
    })
    .commit();

  // 5. Appellation
  await client.createIfNotExists({
    _id: appellationId,
    _type: "appellation",

    name: "Muscadet-Sèvre et Maine",

    slug: {
      _type: "slug",
      current: "muscadet-sevre-et-maine",
    },

    country: ref(countryId),
    region: ref(regionId),

    classification: "AOC / AOP",

    description: pt(
      "Le Muscadet-Sèvre et Maine est une appellation du Pays Nantais, à l’ouest de la Vallée de la Loire. Ses vins blancs secs sont élaborés à partir du Melon de Bourgogne et sont particulièrement connus pour leur fraîcheur et leur affinité naturelle avec les produits de la mer."
    ),

    grapes: [ref(grapeId)],

    authorizedWineStyles: [
      "blanc sec",
      "blanc sur lie",
    ],

    foodPairingNotes:
      "Huîtres, coquillages, fruits de mer, poissons et apéro.",

    seoTitle:
      "Muscadet-Sèvre et Maine : comprendre l’appellation | Le Premier Verre",

    seoDescription:
      "Muscadet-Sèvre et Maine expliqué simplement : Melon de Bourgogne, style des vins et accords à table.",
  });

  // 6. Producteur Marcel Martin
  await client.createIfNotExists({
    _id: producerId,
    _type: "producer",

    name: "Marcel Martin",

    slug: {
      _type: "slug",
      current: "marcel-martin",
    },

    municipality: "Vallet",

    country: ref(countryId),
    region: ref(regionId),

    oneLiner:
      "Une maison associée à la Loire qui propose des vins accessibles et largement distribués, dont La Sablette en Muscadet.",

    bio: pt(
      "Marcel Martin est une marque de vins associée à la Vallée de la Loire et aujourd’hui rattachée à Lacheteau. Sa gamme couvre plusieurs appellations et styles de la région. Pour Le Premier Verre, son intérêt est surtout très concret : des bouteilles faciles à trouver qui peuvent servir de premiers repères avant d’aller plus loin dans la découverte des producteurs et des terroirs."
    ),

    approach: [
      {
        _key: "accessibility",
        _type: "producerApproachItem",
        title: "Des vins accessibles",
        text:
          "La gamme mise sur des styles faciles à comprendre et disponibles à un prix qui permet de découvrir une région sans en faire une grande occasion.",
      },
      {
        _key: "loire",
        _type: "producerApproachItem",
        title: "Plusieurs visages de la Loire",
        text:
          "Marcel Martin propose des cuvées issues de plusieurs appellations de la Vallée de la Loire, des blancs secs aux vins effervescents.",
      },
    ],

    signatureGrapes: [ref(grapeId)],

    whyWeFollow:
      "Parce que certaines bouteilles simples sont d’excellentes portes d’entrée. La Sablette permet notamment de découvrir le Muscadet sans dépasser 20 $ et sans avoir besoin de connaître l’appellation avant de l’ouvrir.",

    openToVisitors: false,

    published: false,
  });

  // 7. LA SABLETTE
  await client.createIfNotExists({
    _id: wineId,
    _type: "wine",

    name: "La Sablette Muscadet-Sèvre et Maine sur Lie",

    slug: {
      _type: "slug",
      current: "la-sablette-muscadet-sevre-et-maine-sur-lie",
    },

    producer: ref(producerId),

    // Millésime volontairement absent :
    // la référence 750 ml de la SAQ n'affiche pas de millésime précis.

    color: "white",

    country: ref(countryId),
    region: ref(regionId),
    appellation: ref(appellationId),

    grapes: [ref(grapeId)],

    approxPrice: 17.7,

    purchaseChannel: "saq",

    purchaseUrl: "https://www.saq.com/fr/134445",

    purchaseLastChecked: "2026-09-08",

    oneLiner:
      "Un blanc sec, léger et franchement frais qui montre qu’on n’a pas besoin de dépasser 20 $ pour trouver une bouteille avec du caractère.",

    tastingKeywords: [
      "agrumes",
      "fruits blancs",
      "pomme verte",
      "fraîcheur saline",
    ],

    perfectFor: [
      "Huîtres et fruits de mer",
      "Poisson grillé ou citronné",
      "Apéro au soleil",
    ],

    whyWeRecommend:
      "Parce que c’est exactement le genre de bouteille qui enlève un peu de pression au choix du vin. Elle coûte moins de 20 $, elle est fraîche, légère et facile à placer à table. Elle illustre parfaitement une idée du Premier Verre : une bonne bouteille n’a pas besoin d’être chère ni compliquée à expliquer.",

    body: 1,
    sweetness: 1,
    roundness: 1,

    servingTemperature: "6–8 °C",
    decant: false,

    style: "Blanc sec, léger et vif",

    cellaringPotential: "À boire jeune",

    alcohol: 11.5,
    sugar: "1,3 g/L",
    acidity: 5,
    tannins: 1,

    isOrganic: false,
    isNatural: false,
    isBiodynamic: false,
    isVegan: false,

    aromas: [
      "agrumes",
      "fruits blancs",
    ],

    flavors: [
      "citron",
      "pomme",
      "fruits blancs",
    ],

    texture: "Légère et vive",

    finish: "Fraîche et nette",

    intensity: 2,
    complexity: 2,
    oakInfluence: 1,

    bottleSize: "750 ml",

    sku: "134445",

    // Anciens champs remplis aussi pour compatibilité
    saqPrice: 17.7,
    availableAtSaq: true,
    saqUrl: "https://www.saq.com/fr/134445",

    occasionTags: [
      "apéro",
      "fruits de mer",
      "souper de semaine",
    ],

    experienceLevel: "beginner",

    aiSummary:
      "Blanc sec et très frais de Muscadet-Sèvre et Maine, fait de Melon de Bourgogne. Une bouteille accessible sous les 20 $, particulièrement adaptée aux fruits de mer et à l’apéro.",

    seoTitle:
      "La Sablette Muscadet-Sèvre et Maine sur Lie | Le Premier Verre",

    seoDescription:
      "La Sablette de Marcel Martin : un Muscadet sec, léger et vif à moins de 20 $, parfait pour l’apéro, les huîtres et les fruits de mer.",

    published: false,
  });

  console.log("");
  console.log("✅ Import terminé.");
  console.log("✅ Vallée de la Loire");
  console.log("✅ Melon de Bourgogne");
  console.log("✅ Muscadet-Sèvre et Maine");
  console.log("✅ Marcel Martin");
  console.log("✅ La Sablette Muscadet-Sèvre et Maine sur Lie");
  console.log("");
  console.log("📸 Il reste à ajouter les images dans Sanity.");
  console.log("🔒 Tout est laissé non publié pour vérification.");
}

run().catch((error) => {
  console.error("");
  console.error("❌ Import interrompu :");
  console.error(error);
  process.exit(1);
});
