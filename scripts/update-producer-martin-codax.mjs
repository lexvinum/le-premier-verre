import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-martin-codax";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Martín Códax est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Cambados",

  oneLiner: "Une maison emblématique de Rías Baixas, profondément liée au Val do Salnés et entièrement tournée vers les multiples expressions de l’Albariño.",

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
          text: "Née dans le Val do Salnés, en Galice, Martín Códax est issue d’un projet collaboratif de familles de viticulteurs réunies autour d’une même ambition : faire connaître l’Albariño et les vins de Rías Baixas. Aujourd’hui, la maison travaille avec plus de 500 familles viticoles et fait rayonner ses vins dans plus de 65 pays. L’Albariño demeure au cœur de son identité, avec des cuvées qui montrent autant sa fraîcheur et son caractère maritime que sa capacité à gagner en profondeur et à vieillir. Vendanges manuelles, suivi précis des parcelles, recherche et pratiques plus durables permettent à la maison de préserver le lien entre le vin, le paysage et la culture galicienne."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "collective",
      _type: "producerApproachItem",
      title: "Une histoire collective",
      text: "Martín Códax repose sur un réseau de plus de 500 familles viticoles du Val do Salnés, avec une forte volonté de maintenir la viticulture locale et de faire vivre le territoire."
    },
    {
      _key: "albarino",
      _type: "producerApproachItem",
      title: "L’Albariño sous toutes ses facettes",
      text: "La maison explore la fraîcheur, la salinité, la texture et le potentiel de garde de l’Albariño à travers des cuvées classiques, parcellaires et plus expérimentales."
    },
    {
      _key: "sustainability",
      _type: "producerApproachItem",
      title: "Recherche et durabilité",
      text: "Suivi des parcelles, vendanges manuelles, biodiversité, réduction de l’empreinte carbone et innovation font partie d’une approche pensée pour préserver le Val do Salnés à long terme."
    }
  ],

  signatureGrapes: [
    {
      _key: "albarino",
      _type: "reference",
      _ref: "grape-alvarinho"
    }
  ],

  whyWeFollow: "Parce que Martín Códax est une excellente façon de comprendre l’Albariño. On peut commencer avec une bouteille fraîche et immédiatement séduisante, puis découvrir que ce cépage peut aussi exprimer le lieu, la texture et même un vrai potentiel de garde. Une porte d’entrée très claire vers les vins blancs de Galice.",

  openToVisitors: true,

  visitDetails: "La bodega accueille les visiteurs à Cambados et propose plusieurs formules de visite et de dégustation, ainsi que des expériences autour du vin, de la gastronomie et de la culture galicienne. La réservation est recommandée pour les visites organisées.",

  address: "Burgáns 91, 36633 Vilariño, Cambados, Pontevedra, Espagne",

  reservationRequired: true,

  website: "https://www.martincodax.com/",

  farmingPractices: [
    "Vendanges manuelles",
    "Suivi parcellaire",
    "Couverture végétale des vignobles",
    "Promotion de la biodiversité",
    "Réduction de l’empreinte carbone",
    "Recherche et innovation viticole"
  ],

  certifications: [
    "Sustainable Wineries for Climate Protection"
  ],

  signatureStyles: [
    "Albariño",
    "Rías Baixas",
    "Blancs atlantiques",
    "Blancs frais et salins",
    "Cuvées parcellaires"
  ],

  phone: "+34 986 526 040",

  seoTitle: "Martín Códax | Albariño de Rías Baixas | Le Premier Verre",

  seoDescription: "Découvrez Martín Códax, maison emblématique du Val do Salnés reconnue pour ses Albariño de Rías Baixas, son modèle collaboratif et son engagement envers le territoire.",

  aiSummary: "Martín Códax est une maison de Rías Baixas basée à Cambados, issue d’un projet collaboratif de familles viticoles et reconnue pour ses différentes expressions de l’Albariño.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Martín Códax mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Martín Códax créé");
}

console.log("✓ Bio et approche ajoutées");
console.log("✓ Albariño ajouté comme cépage signature");
console.log("✓ Informations de visite et pratiques ajoutées");
console.log("✓ SEO et résumé IA complétés");
console.log("✓ Photo principale à ajouter dans Studio");
