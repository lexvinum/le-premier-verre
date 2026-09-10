import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-marcel-martin";
const draftId = `drafts.${publishedId}`;

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Marcel Martin est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Vallet",

  oneLiner: "Une marque de Loire accessible et largement distribuée, idéale pour découvrir simplement quelques grandes appellations de la région.",

  bio: [
    {
      _key: "block1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "span1",
          _type: "span",
          marks: [],
          text: "Marcel Martin est une marque associée à la Vallée de la Loire et aujourd’hui rattachée à Lacheteau. Sa gamme parcourt plusieurs appellations et styles de la région, notamment le Muscadet-Sèvre et Maine et le Saumur. Pour Le Premier Verre, son intérêt est surtout très concret : proposer des bouteilles accessibles, faciles à trouver et simples à comprendre. La Sablette en est un bon exemple, avec un Muscadet sec, vif et léger qui permet de découvrir le Melon de Bourgogne sans transformer l’achat d’une bouteille en exercice compliqué."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "accessibility",
      _type: "producerApproachItem",
      title: "Des vins accessibles",
      text: "La gamme mise sur des cuvées faciles à comprendre et offertes à des prix qui permettent de découvrir une région ou une appellation sans attendre une grande occasion."
    },
    {
      _key: "loire",
      _type: "producerApproachItem",
      title: "Plusieurs portes d’entrée sur la Loire",
      text: "Muscadet, Saumur et autres appellations permettent d’aborder différents cépages et styles de la Vallée de la Loire avec des repères simples."
    },
    {
      _key: "everyday",
      _type: "producerApproachItem",
      title: "Le vin du quotidien",
      text: "Ici, l’objectif n’est pas de chercher la rareté : ce sont plutôt des bouteilles franches et disponibles qui peuvent devenir de bons premiers repères."
    }
  ],

  signatureGrapes: [
    {
      _key: "melon-de-bourgogne",
      _type: "reference",
      _ref: "grape-melon-de-bourgogne"
    }
  ],

  whyWeFollow: "Parce qu’une bonne découverte n’a pas besoin d’être rare ou coûteuse. La Sablette est exactement le genre de bouteille qu’on aime chez Le Premier Verre : simple, fraîche, largement disponible et capable de donner envie d’en apprendre davantage sur le Muscadet et la Loire.",

  openToVisitors: false,

  visitDetails: "Marcel Martin est une marque rattachée à Lacheteau plutôt qu’un domaine présenté comme une destination œnotouristique indépendante.",

  website: "https://www.lacheteau.fr/",

  currentOwner: "Lacheteau",

  signatureStyles: [
    "Vallée de la Loire",
    "Muscadet",
    "Blancs secs",
    "Vins accessibles"
  ],

  seoTitle: "Marcel Martin | Vins accessibles de Loire | Le Premier Verre",

  seoDescription: "Découvrez Marcel Martin, marque de vins de Loire connue notamment pour La Sablette, un Muscadet accessible et facile à découvrir.",

  aiSummary: "Marcel Martin est une marque de vins de la Vallée de la Loire rattachée à Lacheteau, connue au Québec notamment pour La Sablette en Muscadet-Sèvre et Maine.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Marcel Martin mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Marcel Martin créé");
}

console.log("✓ Bio et approche clarifiées");
console.log("✓ Positionnement LPV recentré sur l’accessibilité");
console.log("✓ Relation avec Lacheteau précisée");
console.log("✓ SEO et résumé IA ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
