import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-marcel-lapierre";
const draftId = "drafts.producer-marcel-lapierre";

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Domaine Marcel Lapierre est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Villié-Morgon",

  country: {
    _type: "reference",
    _ref: "country-france"
  },

  region: {
    _type: "reference",
    _ref: "region-beaujolais"
  },

  oneLiner: "Un domaine culte de Morgon, pionnier d’une approche naturelle qui cherche avant tout la pureté du Gamay et l’expression du terroir.",

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
          text: "Créé en 1909 à Villié-Morgon, le Domaine Marcel Lapierre est devenu une référence incontournable du Beaujolais. Marcel Lapierre reprend l’exploitation familiale en 1973 et, quelques années plus tard, développe avec l’influence de Jules Chauvet une façon de travailler fondée sur des raisins sains, des sols vivants et des vinifications très peu interventionnistes. Aujourd’hui, ses enfants Mathieu et Camille poursuivent cette vision sur environ 18 hectares, principalement en appellation Morgon. Le Gamay y est travaillé avec précision pour produire des vins à la fois gourmands, vivants et profondément attachés à leur terroir."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "organic",
      _type: "producerApproachItem",
      title: "Des sols vivants",
      text: "Le domaine cultive ses vignes en agriculture biologique et cherche à préserver la vie des sols afin de laisser le terroir s’exprimer avec le moins d’interventions possible."
    },
    {
      _key: "natural",
      _type: "producerApproachItem",
      title: "Des vinifications peu interventionnistes",
      text: "Les fermentations sont menées sans intrants, dans une recherche de pureté et d’authenticité qui a largement contribué à faire du domaine une référence du vin naturel."
    },
    {
      _key: "gamay",
      _type: "producerApproachItem",
      title: "Le Gamay au centre",
      text: "Le domaine travaille presque exclusivement le Gamay noir à jus blanc, principalement sur les terroirs de Morgon, pour en révéler la fraîcheur, le fruit et la profondeur."
    }
  ],

  signatureGrapes: [
    {
      _key: "gamay",
      _type: "reference",
      _ref: "grape-gamay"
    }
  ],

  whyWeFollow: "Parce que Marcel Lapierre permet de comprendre tout ce que le Gamay peut devenir lorsqu’on le prend au sérieux. Les vins restent faciles à boire et pleins de fruit, mais derrière cette simplicité apparente se trouvent une vraie précision, un terroir et une philosophie qui ont influencé toute une génération de vignerons.",

  openToVisitors: false,

  website: "https://www.marcel-lapierre.com/",

  foundedYear: 1909,

  founder: "Michel Lapierre",

  currentOwner: "Mathieu et Camille Lapierre",

  winemaker: "Mathieu et Camille Lapierre",

  farmingPractices: [
    "Agriculture biologique",
    "Travail des sols",
    "Vinification peu interventionniste",
    "Fermentations sans intrants"
  ],

  signatureStyles: [
    "Morgon",
    "Gamay",
    "Vin naturel",
    "Rouges frais et gourmands"
  ],

  email: "informations@marcel-lapierre.com",

  phone: "+33 4 74 04 23 89",

  seoTitle: "Domaine Marcel Lapierre | Morgon | Le Premier Verre",

  seoDescription: "Découvrez le Domaine Marcel Lapierre à Villié-Morgon, référence du Beaujolais et pionnier des vinifications naturelles autour du Gamay.",

  aiSummary: "Le Domaine Marcel Lapierre est une référence historique de Morgon, reconnue pour son Gamay, son agriculture biologique et ses vinifications très peu interventionnistes.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Domaine Marcel Lapierre mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Domaine Marcel Lapierre créé");
}

console.log("✓ Pays et région ajoutés");
console.log("✓ Bio, approche et Gamay ajoutés");
console.log("✓ Informations avancées et SEO ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
