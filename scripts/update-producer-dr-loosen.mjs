import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-dr-loosen";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Dr. Loosen est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Bernkastel-Kues",

  oneLiner: "Une maison emblématique de la Mosel qui révèle toute la finesse du Riesling à travers ses grands coteaux de schiste.",

  bio: [
    {
      _key: "bio1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "bio1span",
          _type: "span",
          marks: [],
          text: "Installé à Bernkastel-Kues, au cœur de la Mosel, Weingut Dr. Loosen est dirigé par Ernst Loosen et fait partie des références internationales du Riesling allemand. Le domaine travaille plusieurs des coteaux les plus réputés de la région, dont Wehlener Sonnenuhr, Ürziger Würzgarten, Erdener Treppchen et Erdener Prälat. Sur ces pentes abruptes aux sols de schiste, les vendanges sont largement réalisées à la main. Le domaine cherche à exprimer chaque parcelle avec précision, dans des styles allant des Rieslings délicats et fruités aux grands vins secs, profonds et capables de vieillir."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "riesling",
      _type: "producerApproachItem",
      title: "Le Riesling avant tout",
      text: "Le domaine explore les multiples visages du Riesling, des vins frais et accessibles aux cuvées parcellaires de grande profondeur."
    },
    {
      _key: "slate",
      _type: "producerApproachItem",
      title: "Des coteaux de schiste",
      text: "Les vignes poussent sur les pentes abruptes de la Mosel, où différents types de schiste donnent aux vins tension, finesse et une identité très marquée."
    },
    {
      _key: "precision",
      _type: "producerApproachItem",
      title: "Précision et patience",
      text: "Sur les grandes cuvées, les raisins sont sélectionnés manuellement, les fermentations peuvent être spontanées et les vins élevés longuement sur lies dans de vieux foudres."
    }
  ],

  signatureGrapes: [
    {
      _key: "riesling",
      _type: "reference",
      _ref: "grape-riesling"
    }
  ],

  whyWeFollow: "Parce que Dr. Loosen est une excellente porte d’entrée pour comprendre pourquoi le Riesling peut être à la fois léger, vibrant, complexe et profondément lié à son terroir. C’est aussi une maison idéale pour découvrir la Mosel sans rendre le sujet intimidant.",

  openToVisitors: false,

  visitDetails: "Le domaine est établi à Bernkastel-Kues. Pour toute possibilité de visite ou de dégustation, il est préférable de communiquer directement avec la maison avant de se déplacer.",

  address: "St. Johannishof, 54470 Bernkastel-Kues, Allemagne",

  reservationRequired: true,

  website: "https://drloosen.com/",

  currentOwner: "Ernst Loosen",

  winemaker: "Ernst Loosen",

  farmingPractices: [
    "Vendanges manuelles sélectives",
    "Viticulture de coteaux",
    "Fermentations spontanées sur certaines cuvées",
    "Élevage sur lies"
  ],

  signatureStyles: [
    "Riesling",
    "Mosel",
    "Rieslings secs",
    "Rieslings demi-secs et doux",
    "Grosses Gewächs"
  ],

  email: "info@drloosen.de",

  phone: "+49 6531 3426",

  seoTitle: "Dr. Loosen | Riesling de Mosel | Le Premier Verre",

  seoDescription: "Découvrez Dr. Loosen, maison emblématique de la Mosel dirigée par Ernst Loosen et reconnue pour ses Rieslings issus des grands coteaux de schiste.",

  aiSummary: "Dr. Loosen est un domaine de Bernkastel-Kues dirigé par Ernst Loosen, reconnu mondialement pour ses Rieslings de Mosel issus de grands vignobles en pente sur sols de schiste.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Dr. Loosen mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Dr. Loosen créé");
}

console.log("✓ Bio, approche et cépage ajoutés");
console.log("✓ Coordonnées et informations de visite ajoutées");
console.log("✓ SEO et résumé IA ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
