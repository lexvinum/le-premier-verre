import { getCliClient } from "sanity/cli";
import fs from "fs";

const client = getCliClient({ apiVersion: "2025-08-15" });

const articleId =
  "article-comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin";

let i = 0;
const key = (prefix: string) => `${prefix}-${++i}`;

const span = (text: string, marks: string[] = []) => ({
  _type: "span",
  _key: key("s"),
  text,
  marks,
});

const block = (
  text: string,
  style: "normal" | "h2" | "blockquote" = "normal"
) => ({
  _type: "block",
  _key: key("b"),
  style,
  markDefs: [],
  children: [span(text)],
});

const p = (text: string) => block(text);
const h2 = (text: string) => block(text, "h2");
const quote = (text: string) => block(text, "blockquote");

const bullet = (text: string) => ({
  _type: "block",
  _key: key("b"),
  style: "normal",
  listItem: "bullet",
  level: 1,
  markDefs: [],
  children: [span(text)],
});

const link = (prefix: string, label: string, href: string) => {
  const mark = key("link");

  return {
    _type: "block",
    _key: key("b"),
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

  fs.mkdirSync("scripts/backups", { recursive: true });
  fs.writeFileSync(
    "scripts/backups/article-1-before-warm-voice.json",
    JSON.stringify(article, null, 2)
  );

  const content = [
    p("Tu es devant les bouteilles et tu ne sais pas laquelle prendre. Ça arrive tout le temps. Il y en a des centaines, les étiquettes ne disent pas toujours grand-chose quand on commence et, plus on essaie de comprendre, plus le choix semble compliqué."),

    p("Pourtant, trouver une bonne bouteille pour ce soir ne demande pas de connaître toutes les appellations ni de savoir reconnaître un cépage à l’aveugle. Quelques repères suffisent. Et le premier n’est même pas écrit sur la bouteille."),

    h2("Commence par ce soir"),

    p("Qu’est-ce que tu fais avec cette bouteille? Un verre à l’apéro, les pâtes de mardi soir, un steak sur le BBQ, un souper chez des amis, un cadeau? Commence là."),

    p("Le vin qu’on ouvre en préparant le souper n’a pas besoin de jouer le même rôle que celui qu’on apporte chez des amis. Et la bouteille parfaite pour une pizza un vendredi soir n’est peut-être pas celle qu’on choisira pour un anniversaire. Ce n’est pas une question de prestige. C’est simplement une question de moment."),

    p("C’est de là qu’est née l’idée de « Ce soir » au Premier Verre. Plutôt que de te demander quel vin tu devrais connaître, on préfère savoir ce que tu as prévu."),

    link("→ ", "Trouver une bouteille pour ce soir", "/ce-soir"),

    h2("Combien tu veux mettre?"),

    p("Ton budget est un excellent point de départ. Si tu veux une bouteille autour de 20 $ pour un souper de semaine, il y en a de très bonnes. Si tu as envie de mettre un peu plus parce que tu reçois samedi, parfait aussi."),

    p("Une bouteille plus chère n’est pas automatiquement une bouteille que tu vas préférer. Le prix peut s’expliquer par une foule de choses — l’endroit où le raisin pousse, la quantité produite, le travail du vigneron, l’élevage, la rareté — mais aucune de ces choses ne connaît tes goûts."),

    p("Alors si tu demandes conseil, dis simplement combien tu veux mettre. « Autour de 20 $ » ou « pas plus de 30 $ », c’est exactement le genre d’information qui aide à trouver quelque chose qui te convient."),

    h2("Dis simplement ce que tu aimes"),

    p("Tu n’as pas besoin de parler comme un sommelier pour parler de vin. Si tu aimes les blancs très frais, dis-le. Si les rouges costauds ne sont pas ton truc, dis-le aussi."),

    quote("J’aime les blancs très frais. Je voudrais quelque chose de sec. J’aime les rouges fruités, mais pas trop lourds."),

    p("C’est amplement assez pour commencer."),

    p("Avec le temps, tu vas peut-être mettre des mots plus précis sur ce que tu aimes. Tu vas comprendre que certains blancs que tu trouves particulièrement frais ont une acidité plus vive, ou que tu préfères généralement les rouges plus légers. Mais il n’y a aucune urgence à apprendre le vocabulaire avant d’avoir appris tes propres goûts."),

    p("Et si tu ne sais pas quoi répondre, pense simplement à une bouteille que tu as déjà aimée. Tu peux même la prendre en photo. La prochaine fois, montre-la et demande quelque chose dans le même esprit. C’est souvent comme ça que les découvertes commencent."),

    h2("Quelques repères pour la prochaine fois"),

    p("À force de goûter, certains noms vont commencer à revenir. C’est là que l’étiquette devient intéressante."),

    p("Regarde d’abord le cépage. Gamay, Riesling, Chardonnay, Pinot noir… Si tu réalises que plusieurs bouteilles que tu aimes sont faites avec le même raisin, garde ça en tête."),

    p("Regarde aussi d’où vient le vin. Tu n’as pas besoin de connaître la carte viticole de la France. Mais si c’est le troisième Beaujolais qui te plaît, ça vaut peut-être la peine de t’en souvenir."),

    p("Et puis il y a le producteur. Quand une bouteille te plaît vraiment, regarde qui l’a faite. Les autres vins de cette personne ou de ce domaine ne goûteront pas nécessairement la même chose, mais c’est une très bonne piste pour continuer à découvrir."),

    p("Petit à petit, tous ces noms qui semblaient abstraits commencent à être rattachés à de vraies bouteilles et à de vrais souvenirs. C’est beaucoup plus facile de les retenir comme ça."),

    h2("Si tu demandes conseil"),

    p("Tu peux entrer à la SAQ sans savoir si tu cherches du Gamay, du Grenache ou du Sangiovese. Ce n’est pas un problème."),

    p("Au lieu de demander simplement « un bon rouge », raconte en une phrase ce que tu vas en faire."),

    quote("On mange des pâtes à la sauce tomate ce soir. J’aime les rouges pas trop lourds et j’aimerais rester autour de 25 $."),

    p("Ou : « Je cherche un blanc très frais pour l’apéro, autour de 20 $. »"),

    p("Ou encore : « Je vais souper chez des amis, je ne sais pas ce qu’on mange et j’aimerais apporter quelque chose autour de 30 $. »"),

    p("Tu viens de donner tout ce qu’il faut pour commencer à chercher. Et si tu as envie d’une surprise, tu peux toujours ajouter que tu aimerais découvrir quelque chose que tu n’aurais pas choisi toi-même."),

    h2("Six bouteilles pour commencer"),

    p("On aurait pu t’en proposer cinquante. On préfère commencer avec six. Elles sont assez différentes les unes des autres pour te permettre de goûter, de comparer et surtout de voir ce qui te donne envie d’un autre verre."),

    h2("Le raccourci du Premier Verre"),

    p("Si tu te retrouves encore devant une tablette sans savoir où commencer, pense simplement à ceci :"),

    quote("OCCASION + STYLE + BUDGET."),

    bullet("Qu’est-ce qu’on fait avec la bouteille?"),
    bullet("Qu’est-ce que j’ai envie de boire?"),
    bullet("Combien j’ai envie de dépenser?"),

    p("Avec ça, tu peux déjà faire un très bon choix. Tout le reste viendra tranquillement, au fil des bouteilles que tu auras envie de découvrir."),

    h2("Une bouteille que tu n’aimes pas, ça compte aussi"),

    p("Il y aura forcément des bouteilles que tu pensais aimer et qui te laisseront plutôt indifférent. Ce n’est pas un mauvais choix perdu. Tu viens simplement d’apprendre quelque chose sur tes goûts."),

    p("Et puis il y aura l’inverse : une bouteille prise presque au hasard que tu vas adorer. Celle-là, garde-la quelque part."),

    p("Pas besoin d’écrire une note de dégustation compliquée. « Très frais, adoré, à racheter » est déjà une excellente note. L’important, c’est de pouvoir la retrouver quelques mois plus tard."),

    p("C’est exactement l’idée derrière Ma Cave et Mon Carnet : garder une trace des bouteilles que tu as bues, de celles que tu veux essayer et des petits repères qui deviennent les tiens."),

    link("→ ", "Ouvrir Ma Cave", "/ma-cave"),
    link("→ ", "Voir Mon Carnet", "/mon-carnet"),

    p("Après un certain temps, quelque chose change. Devant les mêmes centaines de bouteilles, quelques noms te disent maintenant quelque chose. Tu reconnais un producteur. Tu te souviens que tu avais aimé un Gamay. Tu vois une région que tu as déjà croisée."),

    p("Tu n’as pas appris le vin par cœur. Tu as simplement commencé à savoir ce que tu aimes. Et c’est beaucoup plus utile."),

    h2("Alors, qu’est-ce qu’on boit ce soir?"),

    p("Dis-nous ce que tu manges, ce dont tu as envie et combien tu veux mettre. On va partir de là."),

    link("→ ", "Trouver ma bouteille", "/ce-soir"),

    p("Et si tu préfères prendre ton temps, parcours les fiches vins, garde celles qui t’intriguent et reviens-y quand tu auras envie d’ouvrir quelque chose."),

    p("Pour recevoir de temps en temps nos nouvelles découvertes, les producteurs qu’on aime et les endroits où on a envie de s’arrêter :"),

    p("→ S’inscrire à l’infolettre"),
  ];

  await client.patch(articleId).set({ content }).commit();

  console.log("✅ Article mis à jour dans Sanity.");
  console.log("✓ Voix plus humaine et chaleureuse");
  console.log("✓ Structure Portable Text conservée");
  console.log("✓ Six vins dynamiques conservés");
  console.log("✓ Liens conservés");
  console.log("✓ Sauvegarde : scripts/backups/article-1-before-warm-voice.json");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
