import { getCliClient } from "sanity/cli";
import { mkdirSync, writeFileSync } from "node:fs";

const client = getCliClient({ apiVersion: "2025-08-15" });

const articleId =
  "article-comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin";

let counter = 0;

const key = (prefix: string) =>
  `${prefix}-${String(++counter).padStart(3, "0")}`;

function block(
  style: "normal" | "h2" | "h3" | "blockquote",
  text: string
) {
  return {
    _type: "block",
    _key: key("block"),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: key("span"),
        text,
        marks: [],
      },
    ],
  };
}

function paragraph(text: string) {
  return block("normal", text);
}

function h2(text: string) {
  return block("h2", text);
}

function h3(text: string) {
  return block("h3", text);
}

function quote(text: string) {
  return block("blockquote", text);
}

function linkedParagraph(
  before: string,
  label: string,
  href: string,
  after = ""
) {
  const markKey = key("link");

  return {
    _type: "block",
    _key: key("block"),
    style: "normal",
    markDefs: [
      {
        _type: "link",
        _key: markKey,
        href,
      },
    ],
    children: [
      ...(before
        ? [
            {
              _type: "span",
              _key: key("span"),
              text: before,
              marks: [],
            },
          ]
        : []),
      {
        _type: "span",
        _key: key("span"),
        text: label,
        marks: [markKey],
      },
      ...(after
        ? [
            {
              _type: "span",
              _key: key("span"),
              text: after,
              marks: [],
            },
          ]
        : []),
    ],
  };
}

function bullet(text: string) {
  return {
    _type: "block",
    _key: key("block"),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: key("span"),
        text,
        marks: [],
      },
    ],
  };
}

async function run() {
  const article = await client.getDocument(articleId);

  if (!article) {
    throw new Error(`Article introuvable : ${articleId}`);
  }

  mkdirSync("scripts/backups", { recursive: true });

  writeFileSync(
    "scripts/backups/article-1-before-portable-text.json",
    JSON.stringify(article, null, 2)
  );

  console.log("✅ Sauvegarde de l'article actuel créée.");

  const content = [
    paragraph(
      "Pas besoin de connaître les appellations par cœur ni de savoir reconnaître douze cépages à l’aveugle. Pour choisir une bouteille, quelques bons repères valent souvent beaucoup plus qu’un grand vocabulaire."
    ),

    paragraph("Tu es devant une tablette remplie de bouteilles."),

    paragraph(
      "Il y en a peut-être deux cents, peut-être cinq cents. Certaines ont une étiquette magnifique, d’autres affichent le nom d’un village dont tu n’as jamais entendu parler. Bourgogne, Rioja, Chianti, Morgon, Riesling, Gamay, Cabernet franc… À cela s’ajoutent les millésimes, les appellations, les mentions « réserve », « vieilles vignes », « nature » ou « biologique »."
    ),

    paragraph(
      "Et tout à coup, une question pourtant assez simple — qu’est-ce qu’on boit ce soir? — donne l’impression qu’il faudrait avoir étudié avant de pouvoir répondre."
    ),

    paragraph(
      "Alors on finit souvent par prendre une bouteille dont on reconnaît le nom. Celle dont l’étiquette nous plaît. Celle qu’un ami nous a déjà servie. Ou celle à 28,75 $, parce que 28,75 $ semble être un prix suffisamment sérieux pour que le vin soit bon."
    ),

    paragraph(
      "Il n’y a rien de dramatique là-dedans. Mais il existe une façon beaucoup plus simple de choisir, et elle ne demande pas d’en savoir énormément sur le vin."
    ),

    h2("Commence par ce soir, pas par l’étiquette"),

    paragraph(
      "Avant de chercher un cépage, une région ou une appellation, demande-toi simplement pourquoi tu achètes cette bouteille."
    ),

    paragraph(
      "Est-ce pour l’apéro? Pour accompagner des pâtes un mardi soir? Pour recevoir des amis? Pour apporter chez quelqu’un? Pour offrir? Ou simplement parce que tu as envie d’ouvrir quelque chose de bon en rentrant à la maison?"
    ),

    paragraph(
      "Ça semble presque trop simple, mais le contexte élimine déjà une quantité impressionnante de possibilités."
    ),

    paragraph(
      "Un vin pour l’apéro n’a pas nécessairement le même rôle qu’une bouteille qui accompagnera un plat mijoté. La bouteille qu’on ouvre sans cérémonie devant un souper de semaine n’est pas forcément celle qu’on choisira pour souligner un anniversaire. Et ce n’est pas une question de prestige ou de prix : c’est surtout une question de moment."
    ),

    paragraph(
      "C’est d’ailleurs de là qu’est née l’idée de « Ce soir » sur Le Premier Verre. Plutôt que de commencer par « quel vin devrais-je connaître? », on préfère commencer par « qu’est-ce que tu fais ce soir? »."
    ),

    paragraph(
      "Parce que le vin n’existe pas dans le vide. Il accompagne un repas, une personne, une soirée, parfois simplement une envie."
    ),

    linkedParagraph("→ ", "Essayer « Ce soir »", "/ce-soir"),

    h2("Donne-toi un budget"),

    paragraph(
      "Il y a quelque chose d’un peu étrange avec le vin : on hésite parfois à dire combien on veut payer."
    ),

    paragraph(
      "Pourtant, personne ne trouve bizarre de se donner un budget lorsqu’il cherche un hôtel, une paire de chaussures ou un restaurant. Pourquoi ce serait différent pour une bouteille?"
    ),

    paragraph(
      "Tu peux très bien vouloir rester autour de 20 $ pour un souper de semaine et décider d’en dépenser 40 $ parce que tu reçois samedi. Aucun des deux choix n’est plus connaisseur que l’autre."
    ),

    paragraph(
      "Et surtout, une bouteille plus chère n’est pas automatiquement une bouteille que tu aimeras davantage."
    ),

    paragraph(
      "Le prix peut être influencé par la région, la quantité produite, la réputation du domaine, la façon dont le raisin est cultivé, le temps passé à faire le vin ou simplement sa rareté. Tout cela peut être intéressant. Mais rien de tout cela ne peut garantir ton plaisir à toi."
    ),

    paragraph(
      "Alors donne-toi un chiffre avec lequel tu es à l’aise."
    ),

    paragraph(
      "Pas besoin non plus de calculer au dollar près. « Autour de 20 $ », « pas plus de 30 $ » ou « je peux aller jusqu’à 40 $ » sont déjà d’excellents points de départ."
    ),

    paragraph(
      "Et si quelqu’un te conseille, dis ton budget tout de suite. Ce n’est pas un aveu d’ignorance. C’est une information utile."
    ),

    h2("Parle de ce que tu aimes comme tu le dirais normalement"),

    paragraph(
      "C’est probablement là que beaucoup de gens se compliquent inutilement la vie."
    ),

    paragraph("On pense qu’il faut connaître les bons mots pour parler de vin."),

    paragraph("Pas du tout."),

    quote(
      "« J’aime les blancs vraiment frais. » « Je n’aime pas les rouges trop lourds. » « J’aime quand ça goûte beaucoup le fruit. » « Je voudrais quelque chose de sec, mais pas trop acide. »"
    ),

    paragraph("Tout ça est parfaitement valable."),

    paragraph(
      "Tu n’as pas besoin de parler de minéralité, de tension, de structure ou de tannins soyeux si ces mots ne veulent encore rien dire pour toi. Et surtout, il n’y a aucune raison de les utiliser simplement parce qu’ils donnent l’impression qu’on s’y connaît."
    ),

    paragraph(
      "Avec le temps, ton vocabulaire deviendra peut-être plus précis. Mais au départ, l’important est beaucoup plus simple : remarquer ce que tu aimes."
    ),

    paragraph(
      "Est-ce que tu préfères généralement les vins légers ou ceux qui prennent davantage de place en bouche? Quelque chose de très frais ou de plus rond? Complètement sec ou avec une petite douceur? Des saveurs franches de fruits ou quelque chose de plus discret?"
    ),

    paragraph(
      "Et si tu n’en sais absolument rien, il existe un raccourci encore plus facile : pense à une bouteille que tu as aimée."
    ),

    paragraph(
      "Même si elle est très connue. Même si elle n’est pas particulièrement prestigieuse. Même si tu ne sais absolument pas pourquoi tu l’aimes."
    ),

    quote(
      "« J’achète souvent celle-là et j’aimerais découvrir autre chose dans le même esprit. »"
    ),

    paragraph(
      "Petit à petit, des constantes vont apparaître. Tu vas peut-être réaliser que plusieurs rouges que tu aimes sont faits de Gamay. Que tu reviens souvent au Riesling. Ou simplement que tu préfères les rouges légers aux vins très puissants."
    ),

    paragraph(
      "C’est comme ça qu’on développe ses goûts. En buvant, en remarquant et en revenant sur ce qu’on a aimé. Pas en mémorisant."
    ),

    h2("Et l’étiquette, dans tout ça?"),

    paragraph(
      "Elle contient beaucoup d’informations. Au début, tu n’as certainement pas besoin de toutes les comprendre."
    ),

    paragraph(
      "Trois choses peuvent toutefois commencer à devenir de bons repères : le cépage, l’origine et le producteur."
    ),

    paragraph(
      "Le cépage, c’est simplement la variété de raisin utilisée pour faire le vin : Gamay, Chardonnay, Riesling, Pinot noir, Cabernet franc et ainsi de suite. Il ne permet pas de prédire exactement ce qu’il y aura dans ton verre, mais il peut devenir une piste intéressante."
    ),

    paragraph(
      "Si tu remarques, après quelques bouteilles, que tu aimes souvent les vins faits de Gamay, garde cette information quelque part. La prochaine fois, tu auras déjà un point de départ."
    ),

    paragraph(
      "Même chose pour l’origine. Pas besoin d’apprendre la carte viticole de la France ou de comprendre toutes les appellations. Commence simplement à remarquer les noms qui reviennent."
    ),

    quote(
      "« Tiens, encore un Beaujolais que j’aime. » « C’est le deuxième vin d’Alsace que j’achète et que je trouve vraiment bon. »"
    ),

    paragraph("C’est déjà apprendre le vin."),

    paragraph(
      "Puis il y a le producteur. C’est un repère qu’on oublie parfois lorsqu’on commence, alors qu’il peut devenir l’un des plus intéressants."
    ),

    paragraph(
      "Si tu as beaucoup aimé une bouteille, regarde qui l’a faite. Il y a de bonnes chances que les autres vins de ce producteur partagent une certaine sensibilité, même s’ils ne goûtent évidemment pas tous la même chose."
    ),

    paragraph(
      "C’est aussi pour cette raison qu’on accorde une place importante aux producteurs sur Le Premier Verre. Une bouteille ne vient pas seulement d’un cépage et d’une région. Quelqu’un a décidé comment cultiver le raisin, quand le récolter et quoi en faire ensuite."
    ),

    paragraph(
      "Mais encore une fois : cépage, région, appellation et producteur sont des indices. Pas des choses à apprendre avant d’avoir le droit de choisir une bouteille."
    ),

    h2("Quoi dire quand quelqu’un te demande : « Je peux vous aider? »"),

    paragraph(
      "Tu entres à la SAQ ou chez un caviste. Quelqu’un s’approche et te demande s’il peut t’aider."
    ),

    paragraph("Et là, trou noir."),

    quote("« Oui… je cherche un bon rouge. »"),

    paragraph(
      "Le problème n’est pas que la demande est mauvaise. C’est simplement qu’il existe énormément de bons rouges."
    ),

    paragraph(
      "Tu obtiendras une recommandation beaucoup plus intéressante en racontant en quelques mots ce que tu veux vraiment."
    ),

    quote(
      "« On mange des pâtes à la sauce tomate ce soir. J’aime les rouges plutôt légers et fruités et je voudrais rester autour de 25 $. »"
    ),

    paragraph("C’est parfait."),

    quote(
      "« Je cherche un blanc pour l’apéro. Quelque chose de très frais et sec, autour de 20 $. »"
    ),

    quote(
      "« Je vais souper chez des amis, je ne sais pas ce qu’on mange et j’aimerais apporter quelque chose autour de 30 $. »"
    ),

    paragraph("Tu viens de donner presque tout ce qu’il faut pour t’aider."),

    paragraph("L’occasion. Le genre de vin que tu aimes. Ton budget."),

    paragraph(
      "Et si tu as envie de sortir de tes habitudes, ajoute simplement : « J’aimerais découvrir quelque chose que je ne connais pas. »"
    ),

    paragraph("C’est souvent là que les belles découvertes commencent."),

    h2("Six bouteilles pour commencer"),

    paragraph(
      "Pas besoin de partir avec une liste de cinquante vins. Voici six bouteilles très différentes qui permettent déjà de commencer à comprendre ce qu’on aime."
    ),

    h3("Un blanc frais, sec et facile à servir à l’apéro"),
    linkedParagraph(
      "",
      "La Sablette Muscadet-Sèvre et Maine sur Lie",
      "/vins/la-sablette-muscadet-sevre-et-maine-sur-lie"
    ),

    h3("Un blanc autrichien vif et aromatique"),
    linkedParagraph(
      "",
      "Lois Grüner Veltliner — Weingut Loimer",
      "/vins/loimer-lois-gruner-veltliner-2023"
    ),

    h3("Un rouge léger et fruité à base de Gamay"),
    linkedParagraph(
      "",
      "Georges Duboeuf Brouilly",
      "/vins/georges-duboeuf-brouilly"
    ),

    h3("Un rouge plus généreux à petit prix"),
    linkedParagraph(
      "",
      "Vidal-Fleury Côtes-du-Rhône",
      "/vins/vidal-fleury-cotes-du-rhone"
    ),

    h3("Des bulles produites au Québec"),
    linkedParagraph(
      "",
      "L’Orpailleur Brut",
      "/vins/l-orpailleur-brut"
    ),

    h3("Un rouge italien souple pour les pâtes ou la pizza"),
    linkedParagraph(
      "",
      "Zenato Valpolicella Superiore",
      "/vins/zenato-valpolicella-superiore"
    ),

    paragraph(
      "Le but n’est pas d’aimer les six. C’est justement de commencer à remarquer les différences et de découvrir lesquelles te donnent envie d’un deuxième verre."
    ),

    h2("Le raccourci du Premier Verre"),

    paragraph(
      "Si tu ne devais retenir qu’une seule chose de tout ceci, ce serait probablement celle-là :"
    ),

    quote("OCCASION + STYLE + BUDGET."),

    bullet("Qu’est-ce qu’on fait ce soir?"),
    bullet("Qu’est-ce que j’ai envie de boire?"),
    bullet("Combien ai-je envie de dépenser?"),

    paragraph(
      "Avec ces trois réponses, tu as déjà énormément avancé."
    ),

    paragraph(
      "Le cépage, la région, l’appellation, le millésime et tout le reste pourront venir tranquillement par la suite, au rythme de ta curiosité."
    ),

    h2("Et si tu choisis la « mauvaise » bouteille?"),

    paragraph("Ça arrivera."),

    paragraph(
      "Tu vas acheter une bouteille en étant convaincue que tu vas l’adorer et la trouver plutôt ordinaire. Une autre fois, tu ouvriras quelque chose presque par hasard et tu voudras immédiatement savoir qui l’a fait."
    ),

    paragraph(
      "C’est probablement l’une des meilleures façons d’apprendre."
    ),

    paragraph(
      "Parce que connaître le vin, ce n’est pas arriver à un moment où l’on ne se trompe plus. C’est tranquillement comprendre pourquoi certaines bouteilles nous donnent envie d’un deuxième verre et d’autres beaucoup moins."
    ),

    paragraph(
      "Quand tu aimes quelque chose, garde-en une trace. Le nom de la bouteille, le producteur, le cépage ou la région. Pas besoin d’écrire une note de dégustation de quinze lignes. « J’ai adoré, très frais, à racheter » peut être infiniment plus utile six mois plus tard."
    ),

    paragraph(
      "C’est aussi l’idée derrière Ma Cave et Mon Carnet sur Le Premier Verre : se construire ses propres repères plutôt que d’essayer de retenir ceux des autres."
    ),

    linkedParagraph("→ ", "Ma Cave", "/ma-cave"),
    linkedParagraph("→ ", "Mon Carnet", "/mon-carnet"),

    paragraph(
      "À force de goûter, le fameux mur de bouteilles devient moins intimidant. Certains noms commencent à te dire quelque chose. Tu reconnais un producteur. Un cépage te rappelle une bouteille que tu avais aimée. Tu sais davantage ce dont tu as envie."
    ),

    paragraph(
      "Et surtout, tu arrêtes tranquillement de chercher « la bonne réponse »."
    ),

    paragraph(
      "Parce que le bon choix n’est pas la bouteille la plus savante."
    ),

    paragraph(
      "C’est celle qui convient au moment, qui te fait plaisir et, avec un peu de chance, qui te donne envie d’en découvrir une autre."
    ),

    h2("Envie de trouver la bouteille de ce soir?"),

    paragraph(
      "Dis-nous ce que tu manges, ce dont tu as envie et ton budget."
    ),

    linkedParagraph("→ ", "Essayer « Ce soir »", "/ce-soir"),

    paragraph(
      "Tu peux aussi parcourir les premières fiches vins du Premier Verre pour commencer à découvrir les bouteilles, les cépages, les régions et les producteurs qui correspondent à tes goûts."
    ),

    paragraph(
      "Et pour recevoir nos découvertes, nouvelles bouteilles, endroits à visiter et bonnes raisons d’ouvrir quelque chose :"
    ),

    paragraph("→ S’inscrire à l’infolettre"),

    quote("Le prochain verre commence ici."),
  ];

  await client
    .patch(articleId)
    .set({
      content,
    })
    .commit();

  console.log("");
  console.log("============================================");
  console.log("📝 ARTICLE 1 MIGRÉ EN PORTABLE TEXT");
  console.log("============================================");
  console.log(`✓ ${content.length} blocs structurés`);
  console.log("✓ Intertitres H2");
  console.log("✓ Sous-titres H3");
  console.log("✓ Citations");
  console.log("✓ Liste");
  console.log("✓ Liens internes");
  console.log("✓ 6 vins cliquables");
  console.log("✓ Coquilles de collage corrigées");
  console.log("✓ Ancienne version sauvegardée localement");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
