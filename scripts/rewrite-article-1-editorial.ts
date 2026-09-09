import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-08-15" });

const articleId =
  "article-comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin";

let i = 0;
const k = (prefix: string) => `${prefix}-${++i}`;

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: k("s"),
  text,
  marks,
});

const block = (
  text: string,
  style: "normal" | "h2" | "blockquote" = "normal"
) => ({
  _type: "block",
  _key: k("b"),
  style,
  markDefs: [],
  children: [span(text)],
});

const p = (text: string) => block(text);
const h2 = (text: string) => block(text, "h2");
const pull = (text: string) => block(text, "blockquote");

const bullet = (text: string) => ({
  _type: "block",
  _key: k("b"),
  style: "normal",
  listItem: "bullet",
  level: 1,
  markDefs: [],
  children: [span(text)],
});

const link = (prefix: string, label: string, href: string) => {
  const mark = k("link");

  return {
    _type: "block",
    _key: k("b"),
    style: "normal",
    markDefs: [{ _type: "link", _key: mark, href }],
    children: [
      ...(prefix ? [span(prefix)] : []),
      span(label, [mark]),
    ],
  };
};

async function run() {
  const article = await client.getDocument(articleId);

  if (!article) throw new Error("Article introuvable.");

  const content = [
    p("Choisir du vin quand on ne s’y connaît pas beaucoup peut vite devenir ridicule. Tu voulais simplement une bouteille pour ce soir et te voilà devant trois cents étiquettes à essayer de comprendre si tu es davantage Morgon, Rioja ou Côtes-du-Rhône."),

    p("La bonne nouvelle : tu n’as pas besoin de savoir ça tout de suite."),

    p("Au début, trois informations sont beaucoup plus utiles que le reste : ce que tu fais avec la bouteille, ce que tu aimes boire et combien tu veux payer."),

    h2("Commence par ce soir, pas par l’étiquette"),

    p("Avant le cépage, la région ou le millésime, pense à ton souper. Un apéro sur la terrasse, les pâtes de mardi, un steak sur le BBQ, un souper chez des amis où tu arrives avec une bouteille : ce ne sont pas les mêmes besoins."),

    p("Ça paraît évident, mais devant une tablette de vin on a tendance à l’oublier. On regarde les étiquettes avant de se demander ce qu’on veut réellement en faire."),

    p("C’est exactement pour ça qu’on a créé « Ce soir » au Premier Verre. On commence par le moment, pas par un cours de géographie viticole."),

    link("→ ", "Trouver une bouteille pour ce soir", "/ce-soir"),

    h2("Dis combien tu veux payer"),

    p("À la SAQ, dire « je veux rester en bas de 25 $ » est probablement plus utile que la moitié du vocabulaire qu’on associe au vin."),

    p("Une bouteille à 40 $ n’est pas automatiquement meilleure pour toi qu’une bouteille à 19 $. Il y a toutes sortes de raisons pour lesquelles un vin coûte plus cher — le lieu, le travail, la production, la rareté, la réputation — mais son prix ne sait absolument rien de tes goûts."),

    p("Alors donne ton budget. 20 $ pour mercredi soir? Très bien. 35 $ parce que tu reçois samedi? Très bien aussi."),

    p("Ça ne dit rien de ton niveau de connaissance. Ça évite simplement qu’on te recommande une bouteille à 47 $ quand tu voulais en dépenser 22."),

    h2("Parle normalement"),

    p("C’est ici qu’on se complique souvent la vie. On cherche les « bons mots » alors qu’ils ne sont pas nécessaires."),

    pull("J’aime les blancs très frais. Je n’aime pas les rouges lourds. Je veux quelque chose de sec. J’aime quand ça goûte le fruit."),

    p("Voilà. On peut déjà travailler avec ça."),

    p("Tu apprendras peut-être un jour que ce que tu appelles « frais » correspond souvent à une acidité plus vive, ou que certains vins que tu trouves lourds ont davantage de corps ou de tannins. Tant mieux. Le vocabulaire viendra après le goût, pas l’inverse."),

    p("Et si tu ne sais vraiment pas comment décrire ce que tu aimes, montre une bouteille que tu rachètes souvent. Même si elle est connue. Même si elle coûte 18 $. Même si ta seule explication est : « celle-là, je l’aime »."),

    p("C’est une information beaucoup plus intéressante qu’elle en a l’air."),

    h2("L’étiquette : regarde seulement trois choses"),

    p("Une étiquette peut contenir assez d’information pour te faire abandonner avant même d’avoir ouvert la bouteille. Au début, concentre-toi sur trois repères : le cépage, l’endroit et le producteur."),

    p("Le cépage est la variété de raisin : Gamay, Riesling, Chardonnay, Pinot noir, Cabernet franc… Si tu réalises après quelques bouteilles que tu aimes souvent le Gamay, retiens-le. Pas besoin d’en faire davantage."),

    p("Même chose pour les endroits. Deux Beaujolais que tu as adorés? Ça commence à devenir un indice. Plusieurs blancs d’Alsace qui te plaisent? Encore un indice."),

    p("Puis regarde qui fait le vin. Quand une bouteille t’impressionne vraiment, le nom du producteur vaut la peine d’être retenu. C’est souvent une meilleure piste pour découvrir la suivante que de chercher aveuglément dans la même appellation."),

    p("Le but n’est pas de mémoriser une carte. C’est simplement de commencer à reconnaître ce qui revient dans les bouteilles que tu aimes."),

    h2("À la SAQ, dis plutôt ceci"),

    p("Le classique « je cherche un bon rouge » n’est pas une mauvaise demande. Elle est juste presque impossible à utiliser : il y en a beaucoup, des bons rouges."),

    p("Essaie plutôt :"),

    pull("On mange des pâtes à la sauce tomate. J’aime les rouges assez légers et fruités. Je veux rester autour de 25 $."),

    p("Ou : « Je cherche un blanc très frais pour l’apéro, autour de 20 $. »"),

    p("Ou encore : « Je vais chez des amis, je ne sais pas ce qu’on mange et j’ai environ 30 $. »"),

    p("Là, la personne devant toi a quelque chose avec quoi travailler."),

    p("Et si tu veux qu’elle t’emmène ailleurs que dans tes habitudes, ajoute : « Donne-moi quelque chose que je n’aurais probablement pas choisi moi-même. »"),

    h2("Six bouteilles pour commencer"),

    p("Pas un palmarès et certainement pas six bouteilles qu’il faut absolument aimer. Juste six points de départ très différents pour voir ce qui se passe dans ton verre."),

    // Les mini-fiches dynamiques du site remplacent les anciens blocs
    // entre ce H2 et le prochain H2.

    h2("Le raccourci du Premier Verre"),

    p("Devant le mur de bouteilles, reviens à ça :"),

    pull("OCCASION + STYLE + BUDGET."),

    bullet("Qu’est-ce qu’on fait avec la bouteille?"),
    bullet("Qu’est-ce que j’ai envie de boire?"),
    bullet("Combien est-ce que je veux payer?"),

    p("Le reste peut attendre. Le cépage, l’appellation, le millésime, le type de sol et toutes les autres choses passionnantes du vin deviennent beaucoup plus intéressants quand on a d’abord quelques bouteilles auxquelles les rattacher."),

    h2("Tu vas parfois te tromper"),

    p("Tu vas acheter une bouteille en pensant l’adorer et la trouver franchement ordinaire. Ça fait partie du jeu."),

    p("À l’inverse, une bouteille choisie presque par hasard va parfois te faire chercher le nom du producteur avant même que ton verre soit terminé."),

    p("Dans les deux cas, note-le. Pas besoin d’une fiche de dégustation : « très frais, adoré, à racheter » fait parfaitement le travail. Quelques mois plus tard, ce genre de note est beaucoup plus utile qu’on pense."),

    p("C’est l’idée de Ma Cave et de Mon Carnet : garder tes propres repères au lieu d’essayer de retenir ceux de quelqu’un d’autre."),

    link("→ ", "Ma Cave", "/ma-cave"),
    link("→ ", "Mon Carnet", "/mon-carnet"),

    p("Après quelques bouteilles, le mur de la SAQ change un peu. Tu reconnais un producteur. Le mot Gamay te rappelle un rouge que tu avais aimé. Une région commence à te dire quelque chose."),

    p("Et la prochaine fois que tu te retrouves devant trois cents bouteilles, oublie les trois cents. Pense à ton souper, à ce que tu aimes et à ce que tu veux payer. Il ne t’en reste déjà plus tant que ça."),

    h2("Et ce soir?"),

    p("Dis-nous ce que tu manges, ce dont tu as envie et ton budget. On part de là."),

    link("→ ", "Trouver la bouteille de ce soir", "/ce-soir"),

    p("Tu peux aussi parcourir les fiches du Premier Verre et garder les bouteilles qui t’intéressent pour plus tard."),

    p("Pour recevoir les nouvelles bouteilles, les producteurs qu’on aime et les endroits qui valent le détour :"),

    p("→ S’inscrire à l’infolettre"),
  ];

  console.log("");
  console.log("========================================");
  console.log("APERÇU DE LA NOUVELLE VERSION");
  console.log("========================================");
  console.log("");

  for (const item of content as any[]) {
    if (item._type !== "block") continue;

    const txt = item.children
      .map((child: any) => child.text || "")
      .join("");

    const kind =
      item.listItem === "bullet"
        ? "PUCE"
        : item.style === "h2"
          ? "H2"
          : item.style === "blockquote"
            ? "MISE EN VALEUR"
            : "TEXTE";

    console.log(`[${kind}] ${txt}`);
    console.log("");
  }

  await client
    .patch(articleId)
    .set({ content })
    .commit();

  console.log("");
  console.log("========================================");
  console.log("✅ NOUVELLE VERSION ENVOYÉE DANS SANITY");
  console.log("========================================");
  console.log("✓ Voix éditoriale révisée");
  console.log("✓ Liens conservés");
  console.log("✓ Structure Portable Text conservée");
  console.log("✓ Mini-fiches vins toujours dynamiques");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
