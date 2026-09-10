import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-famille-perrin";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Famille Perrin est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Orange",

  oneLiner: "Une famille incontournable du Rhône méridional, qui conjugue terroir, agriculture biologique et art de l’assemblage depuis plusieurs générations.",

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
          text: "L’histoire de la Famille Perrin est intimement liée au Rhône méridional et au Château de Beaucastel, acquis en 1909 par Pierre Tramier. De génération en génération, la famille a développé un ensemble de vignobles couvrant plusieurs terroirs emblématiques du sud de la vallée du Rhône. Pionnière dans son approche de la vigne, elle adopte l’agriculture biologique dès 1950 et convertit Beaucastel à la biodynamie en 1974. Aujourd’hui, la cinquième génération poursuit cette vision autour d’une idée simple : laisser chaque terroir s’exprimer avec justesse, tout en conservant fraîcheur, équilibre et élégance."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "terroir",
      _type: "producerApproachItem",
      title: "Le terroir comme point de départ",
      text: "Chaque propriété est travaillée avec l’objectif de préserver son identité propre et de laisser le sol, le climat et l’histoire du lieu s’exprimer dans le vin."
    },
    {
      _key: "organic",
      _type: "producerApproachItem",
      title: "Pionniers du bio",
      text: "La famille pratique l’agriculture biologique depuis 1950 et a converti le vignoble du Château de Beaucastel à la biodynamie dès 1974."
    },
    {
      _key: "assemblage",
      _type: "producerApproachItem",
      title: "L’art de l’assemblage",
      text: "Grenache, Syrah, Mourvèdre et autres cépages rhodaniens sont assemblés avec précision pour rechercher équilibre, fraîcheur et expression du lieu."
    }
  ],

  signatureGrapes: [
    {
      _key: "grenache",
      _type: "reference",
      _ref: "grape-grenache"
    },
    {
      _key: "syrah",
      _type: "reference",
      _ref: "grape-syrah"
    },
    {
      _key: "mourvedre",
      _type: "reference",
      _ref: "grape-mourvedre"
    }
  ],

  whyWeFollow: "Parce que Famille Perrin permet de parcourir presque tout le Rhône méridional à travers une seule maison. On peut commencer avec un Côtes du Rhône très accessible et remonter progressivement vers des crus plus ambitieux, tout en retrouvant une même recherche de fraîcheur, d’équilibre et de fidélité au terroir.",

  openToVisitors: true,

  visitDetails: "Famille Perrin possède notamment une boutique à Châteauneuf-du-Pape où il est possible de découvrir et déguster les vins. Des visites du Château de Beaucastel peuvent aussi être organisées sur rendez-vous. Il est préférable de vérifier les modalités auprès de la maison avant de se déplacer.",

  address: "3333 Route de Jonquières, 84100 Orange, France",

  reservationRequired: false,

  website: "https://www.familleperrin.com/",

  foundedYear: 1909,

  founder: "Pierre Tramier",

  currentOwner: "Famille Perrin",

  farmingPractices: [
    "Agriculture biologique",
    "Biodynamie sur certaines propriétés",
    "Respect des sols et de la biodiversité",
    "Viticulture parcellaire"
  ],

  signatureStyles: [
    "Côtes du Rhône",
    "Rhône méridional",
    "Assemblages de Grenache",
    "Vins de terroir",
    "Vins rouges méditerranéens"
  ],

  email: "perrin@familleperrin.com",

  phone: "+33 4 90 11 12 00",

  seoTitle: "Famille Perrin | Vins du Rhône | Le Premier Verre",

  seoDescription: "Découvrez Famille Perrin, maison familiale emblématique du Rhône méridional, pionnière du bio et reconnue pour ses vins de terroir et ses assemblages.",

  aiSummary: "Famille Perrin est une maison familiale historique du Rhône méridional, liée au Château de Beaucastel et reconnue pour son approche biologique, biodynamique et son travail des grands terroirs rhodaniens.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Famille Perrin mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Famille Perrin créé");
}

console.log("✓ Bio, approche et cépages ajoutés");
console.log("✓ Informations de visite ajoutées");
console.log("✓ SEO et résumé IA ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
