import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-les-pervenches";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Les Pervenches est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Farnham",

  oneLiner: "Un domaine pionnier de Farnham où viticulture biologique, biodynamie et vinification peu interventionniste donnent des vins libres et profondément liés à leur lieu.",

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
          text: "À Farnham, Les Pervenches fait partie des domaines qui ont contribué à transformer le regard porté sur le vin québécois. Véronique Hupin et Michael Marler travaillent leurs vignes en agriculture biologique et biodynamique, en cherchant avant tout à préserver la vitalité des sols et l’identité de chaque parcelle. Chardonnay, Seyval blanc, Pinot noir, Pinot gris, Zweigelt et Gewurztraminer composent une mosaïque de cépages adaptée à leur réalité. Au chai, le même principe domine : intervenir le moins possible pour laisser le raisin et le millésime s’exprimer. Fermentations spontanées, travail sans filtration et cuvées sans sulfite ajouté donnent des vins précis, vivants et profondément ancrés dans leur lieu."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "culture",
      _type: "producerApproachItem",
      title: "À la vigne",
      text: "Les vignes sont conduites en agriculture biologique et biodynamique, avec vendanges manuelles et un travail attentif adapté à chaque parcelle."
    },
    {
      _key: "vinification",
      _type: "producerApproachItem",
      title: "Au chai",
      text: "Les fermentations sont spontanées et les cuvées sont élaborées dans une logique très peu interventionniste, notamment sans filtration et sans sulfite ajouté."
    },
    {
      _key: "terroir",
      _type: "producerApproachItem",
      title: "Le terroir",
      text: "Les sols de Farnham mêlent notamment loams sableux, graves et argile. Le domaine cherche à révéler les différences de parcelles plutôt qu’à imposer un style uniforme."
    }
  ],

  whyWeFollow: "Parce que Les Pervenches prouve depuis longtemps qu’on peut faire au Québec des vins d’une grande finesse sans chercher à gommer leur origine. Leur constance, leur travail biodynamique et leur façon de laisser chaque parcelle et chaque millésime parler en font un domaine qu’on a envie de suivre année après année.",

  openToVisitors: false,

  visitDetails: "Le vignoble n’est actuellement pas ouvert au public. Les nouvelles concernant les cuvées, les disponibilités et les activités ponctuelles sont annoncées par le domaine sur son site et ses réseaux sociaux.",

  address: "150, chemin Boulais, Farnham, Québec J2N 2P9",

  website: "https://lespervenches.com/",

  currentOwner: "Véronique Hupin et Michael Marler",

  farmingPractices: [
    "Agriculture biologique",
    "Biodynamie",
    "Vendanges manuelles",
    "Fermentations spontanées",
    "Vinification peu interventionniste",
    "Sans filtration",
    "Sans sulfite ajouté"
  ],

  certifications: [
    "Vignes et vins certifiés en agriculture biologique et biodynamique"
  ],

  signatureStyles: [
    "Vins nature",
    "Vins québécois",
    "Blancs de terroir",
    "Rouges de climat frais",
    "Mousseux méthode traditionnelle",
    "Cuvées parcellaires"
  ],

  email: "info@lespervenches.com",

  phone: "450 293-8311",

  seoTitle: "Les Pervenches | Vignoble biodynamique à Farnham | Le Premier Verre",

  seoDescription: "Découvrez Les Pervenches à Farnham, domaine pionnier du vin québécois reconnu pour sa viticulture biologique et biodynamique et ses vinifications peu interventionnistes.",

  aiSummary: "Les Pervenches est un vignoble de Farnham mené par Véronique Hupin et Michael Marler, reconnu pour sa viticulture biologique et biodynamique, ses fermentations spontanées et ses vins québécois peu interventionnistes.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Les Pervenches mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Les Pervenches créé");
}

console.log("✓ Photo actuelle conservée");
console.log("✓ Bio et approche affinées");
console.log("✓ Pratiques et certifications ajoutées");
console.log("✓ Coordonnées et SEO complétés");
