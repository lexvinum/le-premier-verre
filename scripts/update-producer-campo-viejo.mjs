import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-campo-viejo";
const draftId = "drafts.producer-campo-viejo";

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Campo Viejo est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Logroño",

  oneLiner: "Une maison emblématique de Rioja qui marie tradition, innovation et accessibilité dans des vins modernes et expressifs.",

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
          text: "Campo Viejo est une maison emblématique de Rioja, installée à quelques kilomètres de Logroño. Son identité repose sur une lecture contemporaine des grands classiques de la région, avec le Tempranillo au cœur de nombreuses cuvées. La bodega actuelle, inaugurée en 2001, a été conçue en grande partie sous terre afin de créer naturellement des conditions favorables à l’élaboration et à l’élevage des vins. Campo Viejo combine méthodes traditionnelles et techniques modernes, avec une volonté claire de produire des Rioja expressifs, accessibles et faciles à découvrir."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "rioja",
      _type: "producerApproachItem",
      title: "Une Rioja contemporaine",
      text: "Campo Viejo s’appuie sur les traditions de Rioja tout en cherchant des expressions plus modernes, accessibles et adaptées aux façons actuelles de boire le vin."
    },
    {
      _key: "underground",
      _type: "producerApproachItem",
      title: "Une bodega pensée pour le vin",
      text: "Construite en grande partie sous terre, la bodega utilise naturellement l’obscurité et la stabilité thermique pour favoriser l’élaboration et l’élevage des vins."
    },
    {
      _key: "sustainability",
      _type: "producerApproachItem",
      title: "Innovation et durabilité",
      text: "Le domaine intègre architecture, œnologie et développement durable, et Campo Viejo a été la première bodega espagnole à faire certifier son empreinte carbone par AENOR."
    }
  ],

  signatureGrapes: [
    {
      _key: "tempranillo",
      _type: "reference",
      _ref: "grape-tempranillo"
    },
    {
      _key: "garnacha",
      _type: "reference",
      _ref: "grape-garnacha"
    },
    {
      _key: "graciano",
      _type: "reference",
      _ref: "grape-graciano"
    }
  ],

  whyWeFollow: "Parce que Campo Viejo offre une porte d’entrée très simple vers Rioja. Leurs vins permettent de comprendre le Tempranillo, les assemblages de la région et l’effet de l’élevage sans avoir besoin de connaître toutes les règles de l’appellation avant d’ouvrir la bouteille.",

  openToVisitors: true,

  visitDetails: "La bodega propose des visites, dégustations et expériences autour des vins de Rioja. Certaines activités nécessitent une réservation; il est préférable de vérifier les disponibilités sur le site officiel avant la visite.",

  address: "Camino de Lapuebla 50, 26006 Logroño, La Rioja, Espagne",

  reservationRequired: true,

  website: "https://www.campoviejo.com/",

  signatureStyles: [
    "Rioja",
    "Tempranillo",
    "Rouges élevés en fût",
    "Assemblages espagnols"
  ],

  certifications: [
    "Empreinte carbone certifiée AENOR"
  ],

  email: "info@campoviejo.com",

  phone: "+34 941 279 900",

  seoTitle: "Campo Viejo | Producteur de Rioja | Le Premier Verre",

  seoDescription: "Découvrez Campo Viejo, maison emblématique de Rioja installée près de Logroño, reconnue pour ses Tempranillo accessibles, son innovation et sa bodega durable.",

  aiSummary: "Campo Viejo est une maison emblématique de Rioja connue pour ses expressions modernes et accessibles du Tempranillo, sa bodega souterraine et son engagement envers l’innovation et la durabilité.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Campo Viejo mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Campo Viejo créé");
}

console.log("✓ Bio, approche et cépages ajoutés");
console.log("✓ Informations de visite ajoutées");
console.log("✓ SEO et résumé IA ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
