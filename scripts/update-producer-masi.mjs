import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-masi";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Masi est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Gargagnago di Valpolicella",

  oneLiner: "Une maison historique de Valpolicella, reconnue pour sa maîtrise de l’appassimento et ses rouges généreux qui restent profondément ancrés dans les cépages de Vérone.",

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
          text: "L’histoire de Masi est liée à la famille Boscaini depuis 1772, année de sa première vendange dans le Vaio dei Masi, au cœur de la Valpolicella Classica. Au fil des générations, la maison s’est imposée comme une grande spécialiste des techniques traditionnelles de séchage des raisins, notamment l’appassimento. Elle est aussi à l’origine de Campofiorin, créé avec le millésime 1964 pour proposer un rouge plus riche et complexe qu’un Valpolicella classique, tout en restant plus accessible qu’un Amarone. Corvina, Rondinella et Molinara demeurent au centre de cette identité profondément vénitienne."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "appassimento",
      _type: "producerApproachItem",
      title: "L’art de l’appassimento",
      text: "Masi a développé une expertise particulière dans le séchage des raisins, une tradition essentielle à l’Amarone et à plusieurs de ses cuvées les plus emblématiques."
    },
    {
      _key: "innovation",
      _type: "producerApproachItem",
      title: "Tradition et innovation",
      text: "La maison s’appuie sur les traditions de Valpolicella tout en poursuivant un important travail technique et expérimental autour de la vinification et de l’appassimento."
    },
    {
      _key: "local-grapes",
      _type: "producerApproachItem",
      title: "Des cépages profondément locaux",
      text: "Corvina, Rondinella et Molinara donnent aux vins leur caractère typiquement véronais, entre cerise, épices, fraîcheur et profondeur."
    }
  ],

  signatureGrapes: [
    {
      _key: "corvina",
      _type: "reference",
      _ref: "grape-corvina"
    },
    {
      _key: "rondinella",
      _type: "reference",
      _ref: "grape-rondinella"
    },
    {
      _key: "molinara",
      _type: "reference",
      _ref: "grape-molinara"
    }
  ],

  whyWeFollow: "Parce que Masi permet de comprendre très facilement une technique qui définit une partie importante des vins de Vérone : l’appassimento. Campofiorin est une excellente porte d’entrée, avec suffisamment de richesse pour être gourmand sans demander le budget ni la puissance d’un Amarone.",

  openToVisitors: true,

  visitDetails: "Les caves historiques de Masi à Gargagnago accueillent les visiteurs pour des visites et dégustations. Plusieurs expériences permettent notamment de découvrir les caves d’élevage, les locaux dédiés à l’appassimento et les vins de Valpolicella. Réservation recommandée.",

  address: "Via Monteleone 26, 37015 Gargagnago di Valpolicella, Verona, Italie",

  reservationRequired: true,

  website: "https://www.masi.it/",

  foundedYear: 1772,

  founder: "Famille Boscaini",

  currentOwner: "Famille Boscaini",

  farmingPractices: [
    "Appassimento traditionnel",
    "Travail des cépages autochtones",
    "Recherche œnologique",
    "Sélection des raisins"
  ],

  signatureStyles: [
    "Valpolicella",
    "Amarone",
    "Appassimento",
    "Rouges de Vérone",
    "Campofiorin"
  ],

  email: "wine.experience@masi.it",

  phone: "+39 045 6832532",

  seoTitle: "Masi | Valpolicella et appassimento | Le Premier Verre",

  seoDescription: "Découvrez Masi, maison historique de Valpolicella reconnue pour l’appassimento, l’Amarone et Campofiorin, sa cuvée emblématique créée en 1964.",

  aiSummary: "Masi est une maison familiale de Valpolicella liée à la famille Boscaini depuis 1772 et reconnue pour son expertise de l’appassimento, de l’Amarone et de Campofiorin.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Masi mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Masi créé");
}

console.log("✓ Bio et approche ajoutées");
console.log("✓ Corvina, Rondinella et Molinara ajoutés");
console.log("✓ Informations de visite ajoutées");
console.log("✓ SEO et résumé IA complétés");
console.log("✓ Photo principale à ajouter dans Studio");
