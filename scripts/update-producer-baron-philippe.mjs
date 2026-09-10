import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-baron-philippe-de-rothschild";
const draftId = "drafts.producer-baron-philippe-de-rothschild";

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Baron Philippe de Rothschild est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Pauillac",

  oneLiner: "Une grande maison de Pauillac qui a contribué à faire rayonner Bordeaux bien au-delà de ses grands crus, notamment avec Mouton Cadet.",

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
          text: "Baron Philippe de Rothschild est une maison familiale installée à Pauillac, au cœur du Médoc. Son histoire est indissociable du baron Philippe de Rothschild, figure pionnière du vignoble bordelais, qui crée Mouton Cadet en 1930 avec l’idée de proposer un Bordeaux de marque accessible et régulier. Sa fille Philippine, puis la génération suivante, poursuivent cette volonté de transmettre la culture du vin de Bordeaux tout en faisant évoluer la maison. Aujourd’hui, ses activités réunissent grands crus classés, vins de marque et projets internationaux. Son savoir-faire s’est notamment étendu au Chili, où la maison produit entre autres la gamme Mapu."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "pioneer",
      _type: "producerApproachItem",
      title: "Un esprit pionnier",
      text: "Depuis le baron Philippe de Rothschild, la maison cultive une volonté d’innover, de remettre les habitudes en question et de faire évoluer la manière de présenter les vins de Bordeaux."
    },
    {
      _key: "accessible",
      _type: "producerApproachItem",
      title: "Bordeaux plus accessible",
      text: "Avec Mouton Cadet, créé en 1930, la maison développe un vin issu de différents terroirs bordelais avec l’objectif d’offrir un style régulier, reconnaissable et facile à découvrir."
    },
    {
      _key: "international",
      _type: "producerApproachItem",
      title: "Un savoir-faire qui voyage",
      text: "Tout en restant profondément ancrée à Pauillac, la maison a développé des projets hors de Bordeaux, notamment au Chili, où elle travaille des cépages comme le Cabernet Sauvignon et le Carmenère."
    }
  ],

  signatureGrapes: [
    {
      _key: "merlot",
      _type: "reference",
      _ref: "grape-merlot"
    },
    {
      _key: "cabernet-sauvignon",
      _type: "reference",
      _ref: "grape-cabernet-sauvignon"
    },
    {
      _key: "cabernet-franc",
      _type: "reference",
      _ref: "grape-cabernet-franc"
    },
    {
      _key: "carmenere",
      _type: "reference",
      _ref: "grape-carmenere"
    }
  ],

  whyWeFollow: "Parce que cette maison permet de raconter Bordeaux autrement que par les grands crus et les bouteilles intimidantes. Mouton Cadet comme Mapu offrent une porte d’entrée simple vers des régions et des cépages connus, à des prix qui permettent réellement de les découvrir.",

  openToVisitors: false,

  website: "https://www.bpdr.com/",

  foundedYear: 1933,

  currentOwner: "Famille Rothschild",

  signatureStyles: [
    "Assemblages bordelais",
    "Rouges accessibles",
    "Vins de marque"
  ],

  seoTitle: "Baron Philippe de Rothschild | Le Premier Verre",

  seoDescription: "Découvrez Baron Philippe de Rothschild, maison familiale de Pauillac derrière Mouton Cadet et plusieurs projets viticoles internationaux, dont Mapu au Chili.",

  aiSummary: "Baron Philippe de Rothschild est une maison familiale de Pauillac connue pour ses grands crus, Mouton Cadet et des projets internationaux comme Mapu au Chili.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Baron Philippe de Rothschild mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Baron Philippe de Rothschild créé");
}

console.log("✓ Bio, approche et cépages ajoutés");
console.log("✓ Informations SEO ajoutées");
console.log("✓ Photo principale à ajouter dans Studio");
