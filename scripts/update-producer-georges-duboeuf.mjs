import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-georges-duboeuf";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Georges Duboeuf est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Romanèche-Thorins",

  oneLiner: "Une maison emblématique qui a fait rayonner le Beaujolais dans le monde tout en mettant le Gamay et ses crus à la portée d’un large public.",

  bio: [
    {
      _key: "bio-duboeuf",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "bio-duboeuf-span",
          _type: "span",
          marks: [],
          text: "Fondée en 1964 à Romanèche-Thorins par Georges Duboeuf, la maison est devenue l’un des grands ambassadeurs du Beaujolais. Issue d’une longue histoire familiale liée à la vigne, elle travaille aujourd’hui avec plus de 300 vignerons et propose une lecture très large des crus et appellations du Beaujolais et du Mâconnais. Georges Duboeuf a aussi joué un rôle majeur dans la popularisation internationale du Beaujolais Nouveau. Derrière cette notoriété se trouve une volonté constante de sélectionner des vins expressifs, accessibles et fidèles à leur origine, avec le Gamay comme fil conducteur."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "growers",
      _type: "producerApproachItem",
      title: "Le travail des vignerons au centre",
      text: "La maison collabore avec plus de 300 vignerons et domaines, en cherchant à préserver l’identité des différents crus et terroirs du Beaujolais et du Mâconnais."
    },
    {
      _key: "gamay",
      _type: "producerApproachItem",
      title: "Le Gamay sous toutes ses formes",
      text: "Du Beaujolais Nouveau aux grands crus, la maison montre combien le Gamay peut être gourmand, frais, délicat ou plus structuré selon son origine."
    },
    {
      _key: "accessibility",
      _type: "producerApproachItem",
      title: "Faire connaître le Beaujolais",
      text: "Georges Duboeuf a consacré une grande partie de son travail à rendre les vins de la région visibles et accessibles bien au-delà de leurs frontières."
    }
  ],

  signatureGrapes: [
    {
      _key: "gamay",
      _type: "reference",
      _ref: "grape-gamay"
    }
  ],

  whyWeFollow: "Parce que Georges Duboeuf est une porte d’entrée idéale pour découvrir le Beaujolais sans se compliquer la vie. On peut commencer par un vin simple et gourmand, puis explorer progressivement Brouilly, Fleurie, Morgon, Moulin-à-Vent et les autres crus pour comprendre à quel point le Gamay change selon son terroir.",

  openToVisitors: true,

  visitDetails: "Le Hameau Duboeuf, à Romanèche-Thorins, propose un parcours consacré à la vigne et au vin, des dégustations, un restaurant ainsi qu’une boutique. Les horaires varient selon la saison; il est préférable de consulter le site officiel avant la visite.",

  address: "796 Route de la Gare, 71570 Romanèche-Thorins, France",

  reservationRequired: false,

  website: "https://www.duboeuf.com/",

  foundedYear: 1964,

  founder: "Georges Duboeuf",

  currentOwner: "Famille Duboeuf",

  signatureStyles: [
    "Beaujolais",
    "Crus du Beaujolais",
    "Beaujolais Nouveau",
    "Gamay",
    "Vins du Mâconnais"
  ],

  seoTitle: "Georges Duboeuf | Beaujolais et Gamay | Le Premier Verre",

  seoDescription: "Découvrez Georges Duboeuf, maison emblématique fondée en 1964 qui a largement contribué à faire connaître le Gamay, le Beaujolais et ses crus dans le monde.",

  aiSummary: "Georges Duboeuf est une maison familiale de Romanèche-Thorins fondée en 1964, reconnue pour son rôle majeur dans le rayonnement du Beaujolais, du Gamay et du Beaujolais Nouveau.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Georges Duboeuf mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Georges Duboeuf créé");
}

console.log("✓ Bio et approche enrichies");
console.log("✓ Gamay conservé comme cépage signature");
console.log("✓ Informations de visite précisées");
console.log("✓ SEO et résumé IA mis à jour");
console.log("✓ Photo principale à ajouter dans Studio");
