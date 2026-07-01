import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-01-01",
  useCdn: false,
});

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const articles = [
  ["Accords", "Quoi boire avec des pâtes sauce tomate?", "Des rouges légers, frais et fruités pour accompagner l'acidité de la tomate sans alourdir le repas."],
  ["Accords", "Quel vin servir avec une pizza?", "La pizza aime les vins simples, fruités et légèrement frais. Voici les bons réflexes."],
  ["Recevoir", "Les bouteilles à garder sous la main", "Quelques styles indispensables pour recevoir sans stress : bulles, blanc frais, rouge léger et bouteille cadeau."],
  ["Québec", "Pourquoi boire plus de vins québécois?", "Fraîcheur, proximité, cépages adaptés et producteurs passionnés : les vins d'ici ont leur place à table."],
  ["Guide", "Comment choisir un vin quand on débute?", "Partir du repas, du budget et du moment est souvent plus utile que de partir d'une note ou d'un cépage."],
  ["Accords", "Que boire avec des fromages?", "Les bulles, les blancs aromatiques et les rouges légers sont souvent plus polyvalents qu'on pense."],
  ["Style", "Rouge léger : le style le plus pratique", "Servi légèrement frais, le rouge léger est parfait pour l'apéro, la pizza, les pâtes et les soupers simples."],
  ["Guide", "Comprendre l'acidité dans le vin", "L'acidité apporte fraîcheur, énergie et équilibre. Elle est essentielle, surtout dans les vins de climat frais."],
  ["Recevoir", "Recevoir sans se compliquer", "Une formule simple : une bulle, un blanc frais, un rouge léger et une bouteille plus structurée."],
  ["Québec", "Les rouges québécois à servir frais", "Plusieurs rouges d'ici gagnent à être servis autour de 13 à 15 degrés."],
  ["Accords", "Que boire avec un BBQ?", "Entre fumée, gras et sauces, les rouges souples et les rosés structurés sont souvent gagnants."],
  ["Guide", "Comment lire une fiche vin?", "Arômes, corps, acidité, sucre, température : les informations vraiment utiles à regarder."],
  ["Achat", "Comment choisir une bouteille à offrir?", "Miser sur le contexte : hôte, repas, budget, style et niveau de curiosité de la personne."],
  ["Style", "Le vin sec expliqué simplement", "Un vin sec contient peu de sucre perceptible, mais peut tout de même donner une impression fruitée."],
  ["Québec", "Cépages hybrides : pourquoi ils comptent", "Maréchal Foch, Frontenac, Sabrevois et Sainte-Croix sont adaptés aux réalités du climat québécois."],
  ["Accords", "Que boire avec du porc?", "Le porc aime les rouges souples, les blancs avec du corps et les vins qui gardent de la fraîcheur."],
  ["Guide", "À quelle température servir le rouge?", "Beaucoup de rouges sont meilleurs légèrement rafraîchis, surtout les vins fruités et peu boisés."],
  ["Recevoir", "Une soirée vin sans prétention", "Le but n'est pas d'impressionner : c'est de créer un moment simple, beau et agréable."],
  ["Achat", "Avant d'aller à la SAQ", "Définir le repas, le budget et l'ambiance permet d'éviter les achats au hasard."],
  ["Découverte", "Comment découvrir un nouveau producteur?", "Commencer par une cuvée accessible, regarder la région, puis revenir vers les styles qui plaisent."],
];

async function main() {
  for (const [category, title, excerpt] of articles) {
    const slug = slugify(title);

    await client.createOrReplace({
      _id: `article-${slug}`,
      _type: "article",
      title,
      slug: { _type: "slug", current: slug },
      excerpt,
      content: `${excerpt}

Le Premier Verre propose une approche simple : partir du contexte réel. Qu'est-ce qu'on mange? Qui sera autour de la table? Cherche-t-on quelque chose de facile, de surprenant ou de plus sérieux?

Un bon choix de vin n'a pas besoin d'être compliqué. Il doit surtout être cohérent avec le moment. Les meilleurs accords sont souvent ceux qui rendent le repas plus fluide, plus agréable et plus mémorable.

Cette fiche est un point de départ pratique. Elle sera progressivement enrichie avec des exemples de bouteilles, des producteurs liés et des recommandations du Sommelier IA.`,
      category,
      author: "Le Premier Verre",
      tags: [category, "vin", "conseil", "lifestyle"],
      featured: ["Accords", "Québec", "Recevoir"].includes(category),
      published: true,
      publishedAt: new Date().toISOString(),
      seoTitle: `${title} | Le Premier Verre`,
      seoDescription: excerpt,
    });
  }

  console.log(`Import terminé : ${articles.length} articles.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
