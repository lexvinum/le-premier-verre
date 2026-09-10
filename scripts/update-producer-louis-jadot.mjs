import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-louis-jadot";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Louis Jadot est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Beaune",

  oneLiner: "Une maison historique de Beaune qui permet d’explorer la Bourgogne du vin accessible aux grands terroirs, avec le Pinot Noir et le Chardonnay comme fils conducteurs.",

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
          text: "Fondée à Beaune en 1859, la Maison Louis Jadot est devenue l’un des grands noms de la Bourgogne. Sa force tient à l’étendue de sa gamme : elle permet de passer d’appellations régionales accessibles à des villages, Premiers Crus et Grands Crus issus de nombreux terroirs bourguignons. Pinot Noir et Chardonnay occupent naturellement une place centrale. La maison travaille à la fois ses propres vignobles et des raisins provenant de partenaires, avec une volonté constante de respecter l’identité de chaque appellation. Pour découvrir la Bourgogne sans se perdre dans sa complexité, Louis Jadot offre un excellent fil conducteur."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "burgundy",
      _type: "producerApproachItem",
      title: "Toute la Bourgogne comme terrain de jeu",
      text: "La maison propose des vins provenant d’un grand nombre d’appellations, permettant de comparer régions, villages et climats sans changer complètement de repères."
    },
    {
      _key: "terroir",
      _type: "producerApproachItem",
      title: "L’appellation avant le style",
      text: "L’objectif est de préserver le caractère propre de chaque terroir plutôt que d’imposer une signature uniforme à l’ensemble des vins."
    },
    {
      _key: "accessibility",
      _type: "producerApproachItem",
      title: "Une porte d’entrée vers la Bourgogne",
      text: "Des cuvées régionales comme Couvent des Jacobins permettent de découvrir les grands cépages bourguignons avant d’explorer progressivement des appellations plus précises."
    }
  ],

  signatureGrapes: [
    {
      _key: "pinot-noir",
      _type: "reference",
      _ref: "grape-pinot-noir"
    },
    {
      _key: "chardonnay",
      _type: "reference",
      _ref: "grape-chardonnay"
    }
  ],

  whyWeFollow: "Parce que Louis Jadot rend la Bourgogne plus facile à comprendre. On peut commencer avec une bouteille accessible comme le Couvent des Jacobins, puis remonter tranquillement vers les villages, Premiers Crus et Grands Crus en découvrant comment Pinot Noir et Chardonnay changent selon leur origine.",

  openToVisitors: false,

  visitDetails: "La Maison Louis Jadot est établie à Beaune. Pour toute possibilité de visite ou de dégustation, il est préférable de communiquer directement avec la maison avant de se déplacer.",

  address: "21 rue Eugène Spuller, 21200 Beaune, France",

  reservationRequired: true,

  website: "https://www.louisjadot.com/",

  foundedYear: 1859,

  founder: "Louis Henry Denis Jadot",

  signatureStyles: [
    "Bourgogne",
    "Pinot Noir",
    "Chardonnay",
    "Vins de terroir",
    "Premiers Crus",
    "Grands Crus"
  ],

  email: "maisonlouisjadot@louisjadot.com",

  phone: "+33 3 80 22 10 57",

  seoTitle: "Louis Jadot | Maison de Bourgogne à Beaune | Le Premier Verre",

  seoDescription: "Découvrez Louis Jadot, maison fondée à Beaune en 1859 et reconnue pour ses Pinot Noir et Chardonnay issus d’un large éventail de terroirs bourguignons.",

  aiSummary: "Louis Jadot est une maison historique de Beaune fondée en 1859, reconnue pour son vaste éventail de vins de Bourgogne et son travail du Pinot Noir et du Chardonnay.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Louis Jadot mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Louis Jadot créé");
}

console.log("✓ Bio et approche ajoutées");
console.log("✓ Pinot Noir et Chardonnay ajoutés");
console.log("✓ Coordonnées et SEO complétés");
console.log("✓ Photo principale à ajouter dans Studio");
