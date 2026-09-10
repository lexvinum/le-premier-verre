import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "bb61af16-e4c6-42ad-968c-edd0752d054c";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Domaine du Ridge est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Saint-Armand",

  oneLiner: "Un vignoble pionnier de Saint-Armand qui mise sur les cépages adaptés au climat québécois et une approche accessible du vin d’ici.",

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
          text: "Fondé en 1996 à Saint-Armand, le Domaine du Ridge fait partie des vignobles qui ont contribué au développement du vin québécois dans les Cantons-de-l’Est. Le domaine travaille des cépages adaptés au climat d’ici, dont le Seyval blanc, le Seyval noir, le Vidal, le Maréchal Foch et le Lucie Kuhlmann. Sur une vaste propriété comprenant champs, boisés et plus de 40 acres de vignes, l’équipe produit une gamme très diversifiée de vins tranquilles, mousseux et autres cuvées. Aujourd’hui, la relève familiale est bien présente et poursuit le développement du domaine avec le même désir de faire rayonner les vins du Québec."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "climate",
      _type: "producerApproachItem",
      title: "Pensé pour le climat d’ici",
      text: "Le domaine travaille principalement avec des cépages capables de bien s’adapter aux conditions québécoises, en cherchant fraîcheur, équilibre et expression du fruit."
    },
    {
      _key: "diversity",
      _type: "producerApproachItem",
      title: "Une grande diversité de styles",
      text: "Blancs, rouges, rosés, mousseux et autres cuvées permettent au domaine d’explorer plusieurs facettes du terroir québécois et de rejoindre des amateurs aux goûts très différents."
    },
    {
      _key: "experience",
      _type: "producerApproachItem",
      title: "Le vignoble comme expérience",
      text: "Visites, dégustations, forfaits gourmands et vendanges participatives font partie intégrante de l’identité du domaine et de sa volonté de rapprocher le public du vin québécois."
    }
  ],

  signatureGrapes: [
    {
      _key: "seyval-blanc",
      _type: "reference",
      _ref: "grape-seyval-blanc"
    },
    {
      _key: "seyval-noir",
      _type: "reference",
      _ref: "grape-seyval-noir"
    },
    {
      _key: "vidal",
      _type: "reference",
      _ref: "grape-vidal"
    },
    {
      _key: "marechal-foch",
      _type: "reference",
      _ref: "grape-marechal-foch"
    },
    {
      _key: "lucie-kuhlmann",
      _type: "reference",
      _ref: "grape-lucie-kuhlmann"
    }
  ],

  whyWeFollow: "Parce que le Domaine du Ridge permet de découvrir plusieurs visages du vin québécois au même endroit. On aime autant la diversité des cuvées que leur façon très simple et conviviale d’ouvrir le vignoble au public et de faire connaître les cépages adaptés à notre climat.",

  openToVisitors: true,

  visitDetails: "Le domaine accueille les visiteurs en saison pour dégustations, visites et différents forfaits au vignoble. Certaines expériences nécessitent une réservation. Les horaires varient selon la période de l’année; il est préférable de consulter le site officiel avant de se déplacer.",

  address: "205, chemin Ridge, Saint-Armand, Québec J0J 1T0",

  reservationRequired: false,

  website: "https://domaineduridge.com/",

  foundedYear: 1996,

  farmingPractices: [
    "Viticulture adaptée au climat québécois",
    "Travail de cépages hybrides rustiques"
  ],

  signatureStyles: [
    "Vins du Québec",
    "Blancs frais",
    "Rosés",
    "Mousseux",
    "Rouges de climat frais"
  ],

  instagram: "https://www.instagram.com/domaineduridge",

  email: "info@domaineduridge.com",

  phone: "450 248-3987",

  seoTitle: "Domaine du Ridge | Vignoble à Saint-Armand | Le Premier Verre",

  seoDescription: "Découvrez le Domaine du Ridge à Saint-Armand, vignoble québécois fondé en 1996 et reconnu pour ses cépages adaptés au climat, ses vins variés et son accueil au domaine.",

  aiSummary: "Le Domaine du Ridge est un vignoble québécois de Saint-Armand fondé en 1996, reconnu pour sa diversité de vins, ses cépages adaptés au climat et son offre agrotouristique.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Domaine du Ridge mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Domaine du Ridge créé");
}

console.log("✓ Bio, approche et cépages ajoutés");
console.log("✓ Informations de visite et coordonnées ajoutées");
console.log("✓ SEO et résumé IA ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
