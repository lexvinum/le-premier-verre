import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-domaine-du-nival";
const draftId = "drafts.producer-domaine-du-nival";

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Domaine du Nival est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  oneLiner: "Un petit vignoble familial de Saint-Louis qui cultive ses parcelles biologiques comme un écosystème et intervient le moins possible au chai.",

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
          text: "À Saint-Louis, en bordure de la Yamaska, le Domaine du Nival cultive trois hectares de vignes depuis 2013. Ici, le vignoble est pensé comme un écosystème avant d’être une simple production de raisins. Pinot noir, Gamaret, Vidal et Albariño côtoient engrais verts, légumes, plantes et une multitude d’organismes vivants que le domaine cherche à nourrir plutôt qu’à contrôler. Certifié biologique, Nival va toutefois beaucoup plus loin que le cahier des charges en s’inspirant de l’agriculture régénératrice, de la permaculture et d’une observation constante du vivant. Au chai, cette philosophie se poursuit avec des fermentations indigènes et une intervention minimale. Des vins singuliers, parfois déroutants, mais toujours intimement liés au lieu et au millésime."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "culture",
      _type: "producerApproachItem",
      title: "À la vigne",
      text: "Certifié biologique, le domaine s’inspire aussi de l’agriculture régénératrice et de la permaculture. Engrais verts, plantes, micro-organismes et travail manuel participent à créer un vignoble vivant."
    },
    {
      _key: "vinification",
      _type: "producerApproachItem",
      title: "Au chai",
      text: "Les fermentations reposent sur les levures et bactéries indigènes. Les vins ne sont ni collés ni filtrés et le domaine n’utilise plus de sulfites dans ses cuvées depuis 2020."
    },
    {
      _key: "terroir",
      _type: "producerApproachItem",
      title: "Le lieu",
      text: "Les parcelles occupent des vallons en bordure de la Yamaska, avec des expositions et des sols variés que le domaine cherche à traduire le plus fidèlement possible dans chaque millésime."
    }
  ],

  whyWeFollow: "Parce que Nival pousse la réflexion bien au-delà de la bouteille. Leur façon de penser le vignoble comme un écosystème complet, puis de laisser le fruit s’exprimer avec très peu d’intervention au chai, donne des vins qui ont quelque chose de profondément personnel.",

  openToVisitors: true,

  visitDetails: "Le domaine n’est pas ouvert au public de façon régulière. Les récupérations de commandes se font sur rendez-vous en semaine et des journées portes ouvertes sont organisées ponctuellement pour les achats, visites et dégustations.",

  reservationRequired: true,

  farmingPractices: [
    "Agriculture biologique",
    "Agriculture régénératrice",
    "Permaculture",
    "Engrais verts",
    "Travail manuel",
    "Fermentations indigènes",
    "Sans collage",
    "Sans filtration",
    "Sans sulfites ajoutés depuis 2020"
  ],

  certifications: [
    "Certifié biologique par Ecocert Canada"
  ],

  signatureStyles: [
    "Vins nature",
    "Vins québécois",
    "Microcuvées",
    "Vinification peu interventionniste"
  ],

  email: "info@nival.ca",

  phone: "450-518-4818",

  seoTitle: "Domaine du Nival | Vignoble québécois | Le Premier Verre",

  seoDescription: "Découvrez le Domaine du Nival à Saint-Louis, vignoble québécois biologique reconnu pour ses vins vivants, ses fermentations indigènes et son approche peu interventionniste.",

  aiSummary: "Le Domaine du Nival est un petit vignoble familial de Saint-Louis, en Montérégie, certifié biologique et reconnu pour son approche régénératrice et ses vinifications très peu interventionnistes.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Domaine du Nival mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Domaine du Nival créé");
}

console.log("✓ Photo principale conservée");
console.log("✓ Bio et textes corrigés");
console.log("✓ Pratiques, certification et coordonnées ajoutées");
console.log("✓ SEO et résumé IA ajoutés");
