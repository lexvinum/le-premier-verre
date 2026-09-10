import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-domane-wachau";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Domäne Wachau est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Dürnstein",

  oneLiner: "Une coopérative nouvelle génération au cœur de la Wachau, réputée pour ses Grüner Veltliner et Riesling issus de vignobles en terrasses.",

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
          text: "Installée à Dürnstein, au cœur de la Wachau, Domäne Wachau réunit environ 200 vignerons qui cultivent de petites parcelles réparties dans les coteaux escarpés de la région. Sous la direction de Roman Horvath MW et Heinz Frischengruber, la coopérative mise sur la précision, le terroir et un travail étroit avec ses membres. Plus de 160 hectares de vignes sont cultivés en agriculture biologique et une grande partie du travail dans les terrasses est réalisée à la main. Grüner Veltliner et Riesling occupent une place centrale, avec des vins qui vont des cuvées fraîches et accessibles aux expressions parcellaires plus profondes de grands vignobles comme Kellerberg et Achleiten."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "coop",
      _type: "producerApproachItem",
      title: "Une coopérative autrement",
      text: "Domäne Wachau travaille avec environ 200 vignerons qui cultivent chacun de petites surfaces, permettant un suivi précis des parcelles et une relation très étroite entre le vignoble et la cave."
    },
    {
      _key: "terraces",
      _type: "producerApproachItem",
      title: "Le travail des terrasses",
      text: "Les coteaux abrupts de la Wachau imposent un travail largement manuel. Ces terrasses façonnent autant le paysage que le caractère frais, tendu et minéral des vins."
    },
    {
      _key: "organic",
      _type: "producerApproachItem",
      title: "Le bio à grande échelle",
      text: "Avec plus de 160 hectares de vignes cultivées biologiquement, le domaine place la santé des sols, la biodiversité et le respect du vignoble au centre de son approche."
    }
  ],

  signatureGrapes: [
    {
      _key: "gruner-veltliner",
      _type: "reference",
      _ref: "grape-gruner-veltliner"
    },
    {
      _key: "riesling",
      _type: "reference",
      _ref: "grape-riesling"
    }
  ],

  whyWeFollow: "Parce que Domäne Wachau montre qu’une coopérative peut produire des vins précis, identitaires et profondément liés à leurs parcelles. C’est aussi une excellente porte d’entrée pour comprendre le Grüner Veltliner, le Riesling et les célèbres terrasses de la Wachau.",

  openToVisitors: true,

  visitDetails: "La vinothèque accueille les visiteurs toute l’année et le domaine propose dégustations, visites de cave et différentes expériences dans les vignobles. Certaines activités sont offertes sur réservation; il est préférable de consulter le site officiel avant la visite.",

  address: "Dürnstein 107, 3601 Dürnstein, Autriche",

  reservationRequired: false,

  website: "https://www.domaene-wachau.at/",

  currentOwner: "Coopérative de vignerons",

  winemaker: "Heinz Frischengruber",

  farmingPractices: [
    "Agriculture biologique",
    "Travail manuel des terrasses",
    "Viticulture parcellaire",
    "Respect des sols et de la biodiversité"
  ],

  certifications: [
    "Viticulture biologique"
  ],

  signatureStyles: [
    "Grüner Veltliner",
    "Riesling",
    "Federspiel",
    "Smaragd",
    "Vins parcellaires"
  ],

  email: "office@domaene-wachau.at",

  phone: "+43 2711 371",

  seoTitle: "Domäne Wachau | Vins de la Wachau | Le Premier Verre",

  seoDescription: "Découvrez Domäne Wachau, coopérative de Dürnstein reconnue pour ses Grüner Veltliner et Riesling issus des vignobles en terrasses de la Wachau.",

  aiSummary: "Domäne Wachau est une coopérative autrichienne basée à Dürnstein réunissant environ 200 vignerons et reconnue pour ses Grüner Veltliner et Riesling issus des terrasses de la Wachau.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Domäne Wachau mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Domäne Wachau créé");
}

console.log("✓ Bio, approche et cépages ajoutés");
console.log("✓ Informations de visite ajoutées");
console.log("✓ SEO et résumé IA ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
