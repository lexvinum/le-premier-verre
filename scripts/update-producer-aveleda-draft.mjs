import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const id = "drafts.producer-aveleda";

const draft = await client.getDocument(id);

if (!draft) {
  throw new Error("Le draft Aveleda est introuvable.");
}

await client.patch(id).set({
  municipality: "Penafiel",

  oneLiner: "Une maison familiale historique de Vinho Verde, portée par cinq générations et profondément liée à la fraîcheur des vins du nord du Portugal.",

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
          text: "Fondée en 1870 à Penafiel par Manoel Pedro Guedes, Aveleda est une maison familiale profondément liée à Vinho Verde. Cinq générations plus tard, la famille poursuit le développement du domaine tout en conservant un lien fort avec les cépages locaux, la fraîcheur des vins du nord du Portugal et l’identité de la Quinta da Aveleda. La maison est aujourd’hui active dans plusieurs régions du pays, mais son nom reste intimement associé à Vinho Verde et à des blancs accessibles, aromatiques et faciles à découvrir."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "family",
      _type: "producerApproachItem",
      title: "Une histoire de famille",
      text: "Depuis 1870, cinq générations de la famille Guedes participent au développement d’Aveleda et à la transmission de son identité."
    },
    {
      _key: "biodiversity",
      _type: "producerApproachItem",
      title: "La biodiversité au cœur du domaine",
      text: "Aveleda met de l’avant la protection de la biodiversité, la santé des sols et une gestion plus durable de ses propriétés viticoles."
    },
    {
      _key: "vinhoverde",
      _type: "producerApproachItem",
      title: "La fraîcheur de Vinho Verde",
      text: "La maison travaille plusieurs cépages locaux et différents terroirs de Vinho Verde pour créer des blancs frais, aromatiques et immédiatement accessibles."
    }
  ],

  signatureGrapes: [
    {
      _key: "loureiro",
      _type: "reference",
      _ref: "grape-loureiro"
    },
    {
      _key: "alvarinho",
      _type: "reference",
      _ref: "grape-alvarinho"
    },
    {
      _key: "arinto",
      _type: "reference",
      _ref: "grape-arinto"
    },
    {
      _key: "trajadura",
      _type: "reference",
      _ref: "grape-trajadura"
    },
    {
      _key: "fernao-pires",
      _type: "reference",
      _ref: "grape-fernao-pires"
    }
  ],

  whyWeFollow: "Parce qu’Aveleda montre qu’un vin simple et accessible peut tout de même raconter un lieu. On aime leur façon de rendre Vinho Verde facile à découvrir, sans perdre le lien avec les cépages locaux, la fraîcheur et l’identité du nord du Portugal.",

  openToVisitors: true,

  visitDetails: "Quinta da Aveleda accueille les visiteurs pour des visites du domaine, des dégustations et différentes expériences d’œnotourisme. Il est préférable de consulter le site officiel avant de planifier une visite.",

  address: "Rua da Aveleda, nº2, 4560-570 Penafiel, Portugal",

  reservationRequired: false,

  website: "https://www.aveleda.com/",

  foundedYear: 1870,

  founder: "Manoel Pedro Guedes",

  signatureStyles: [
    "Vinho Verde",
    "Blancs frais",
    "Blancs aromatiques"
  ],

  seoTitle: "Aveleda | Producteur de Vinho Verde | Le Premier Verre",

  seoDescription: "Découvrez Aveleda, maison familiale historique de Penafiel associée à Vinho Verde, aux cépages locaux et à des blancs frais et accessibles.",

  aiSummary: "Aveleda est une maison familiale portugaise fondée en 1870 à Penafiel, reconnue pour son rôle historique dans Vinho Verde et pour ses blancs frais, aromatiques et accessibles.",

  published: false
}).commit();

console.log("✓ Draft Aveleda enrichi");
console.log("✓ Photo principale conservée");
console.log("✓ Tous les champs principaux ajoutés dans Studio");
