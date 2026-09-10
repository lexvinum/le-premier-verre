import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-pieropan";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Pieropan est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Soave",

  oneLiner: "Une famille emblématique de Soave qui révèle la profondeur de la Garganega à travers des blancs précis, parcellaires et profondément liés à leurs sols.",

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
          text: "L’histoire de Pieropan commence à Soave en 1901, lorsque Leonildo Pieropan acquiert le domaine familial de Calvarino. À partir des années 1960, son petit-fils Leonildo transforme profondément la maison en mettant l’accent sur l’identité des vignobles et sur le lien entre cépage, sol et lieu. Cette vision donne naissance à Calvarino en 1971, puis à La Rocca en 1978, deux cuvées devenues emblématiques du Soave. Aujourd’hui, Andrea et Dario Pieropan représentent la quatrième génération. La Garganega demeure au cœur du domaine, accompagnée notamment du Trebbiano di Soave, dans des vins qui peuvent être à la fois frais, minéraux, texturés et capables de vieillir."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "vineyards",
      _type: "producerApproachItem",
      title: "Le vignoble avant tout",
      text: "Pieropan a été l’une des maisons pionnières à mettre en valeur l’identité de parcelles précises de Soave, en laissant les différences de sols et d’exposition guider le style des vins."
    },
    {
      _key: "soils",
      _type: "producerApproachItem",
      title: "Deux visages de Soave",
      text: "Calvarino repose sur des sols volcaniques riches en basalte, tandis que La Rocca exprime des sols calcaires d’origine marine : deux terroirs qui montrent toute la diversité de la Garganega."
    },
    {
      _key: "organic",
      _type: "producerApproachItem",
      title: "Une viticulture biologique",
      text: "Après l’abandon du désherbage chimique en 2002, Pieropan a entrepris la conversion de l’ensemble de sa production vers l’agriculture biologique à partir de 2008."
    }
  ],

  signatureGrapes: [
    {
      _key: "garganega",
      _type: "reference",
      _ref: "grape-garganega"
    },
    {
      _key: "trebbiano-di-soave",
      _type: "reference",
      _ref: "grape-trebbiano-di-soave"
    }
  ],

  whyWeFollow: "Parce que Pieropan montre à quel point Soave peut aller plus loin qu’un simple blanc léger. C’est une excellente maison pour comprendre la Garganega, comparer des terroirs différents et découvrir que les grands blancs italiens peuvent être à la fois accessibles, gastronomiques et capables de vieillir.",

  openToVisitors: true,

  visitDetails: "La nouvelle cave Leonildo Pieropan à Soave accueille les visiteurs pour des visites et dégustations. Un wine shop est également accessible sur place. La réservation est recommandée pour les visites organisées.",

  address: "Via Giacomo Matteotti, 37038 Soave, Verona, Italie",

  reservationRequired: true,

  website: "https://www.pieropan.it/",

  foundedYear: 1901,

  founder: "Leonildo Pieropan",

  currentOwner: "Famille Pieropan",

  winemaker: "Andrea et Dario Pieropan",

  farmingPractices: [
    "Viticulture biologique",
    "Vendanges manuelles",
    "Travail parcellaire",
    "Valorisation des sols volcaniques et calcaires",
    "Absence de désherbage chimique"
  ],

  certifications: [
    "Viticulture biologique certifiée"
  ],

  signatureStyles: [
    "Soave Classico",
    "Garganega",
    "Blancs parcellaires",
    "Blancs volcaniques",
    "Blancs de garde"
  ],

  email: "info@pieropan.it",

  phone: "+39 045 6190171",

  seoTitle: "Pieropan | Soave et Garganega | Le Premier Verre",

  seoDescription: "Découvrez Pieropan, famille historique de Soave reconnue pour la Garganega, Calvarino, La Rocca et ses grands blancs issus de terroirs volcaniques et calcaires.",

  aiSummary: "Pieropan est une maison familiale historique de Soave fondée en 1901, reconnue pour ses grands blancs de Garganega, notamment les crus Calvarino et La Rocca.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Pieropan mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Pieropan créé");
}

console.log("✓ Bio et approche ajoutées");
console.log("✓ Garganega et Trebbiano di Soave ajoutés");
console.log("✓ Informations de visite ajoutées");
console.log("✓ SEO et résumé IA complétés");
console.log("✓ Photo principale à ajouter dans Studio");
