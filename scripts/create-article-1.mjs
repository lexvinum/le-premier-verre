import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2025-02-19" });

const ref = (_ref, _key) => ({
  _key,
  _type: "reference",
  _ref
});

const articleId =
  "article-comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin";

const content = `COMMENT CHOISIR UNE BOUTEILLE QUAND ON NE CONNAÎT RIEN AU VIN

Pas besoin de connaître les appellations par cœur ni de savoir reconnaître douze cépages à l’aveugle. Pour choisir une bouteille, quelques bons repères valent souvent beaucoup plus qu’un grand vocabulaire.

Tu es devant une tablette remplie de bouteilles.

Il y en a peut-être deux cents, peut-être cinq cents. Certaines ont une étiquette magnifique, d’autres affichent le nom d’un village dont tu n’as jamais entendu parler. Bourgogne, Rioja, Chianti, Morgon, Riesling, Gamay, Cabernet franc… À cela s’ajoutent les millésimes, les appellations, les mentions « réserve », « vieilles vignes », « nature » ou « biologique ».

Et tout à coup, une question pourtant assez simple — qu’est-ce qu’on boit ce soir? — donne l’impression qu’il faudrait avoir étudié avant de pouvoir répondre.

Alors on finit souvent par prendre une bouteille dont on reconnaît le nom. Celle dont l’étiquette nous plaît. Celle qu’un ami nous a déjà servie. Ou celle à 28,75 $, parce que 28,75 $ semble être un prix suffisamment sérieux pour que le vin soit bon.

Il n’y a rien de dramatique là-dedans. Mais il existe une façon beaucoup plus simple de choisir, et elle ne demande pas d’en savoir énormément sur le vin.


COMMENCE PAR CE SOIR, PAS PAR L’ÉTIQUETTE

Avant de chercher un cépage, une région ou une appellation, demande-toi simplement pourquoi tu achètes cette bouteille.

Est-ce pour l’apéro? Pour accompagner des pâtes un mardi soir? Pour recevoir des amis? Pour apporter chez quelqu’un? Pour offrir? Ou simplement parce que tu as envie d’ouvrir quelque chose de bon en rentrant à la maison?

Ça semble presque trop simple, mais le contexte élimine déjà une quantité impressionnante de possibilités.

Un vin pour l’apéro n’a pas nécessairement le même rôle qu’une bouteille qui accompagnera un plat mijoté. La bouteille qu’on ouvre sans cérémonie devant un souper de semaine n’est pas forcément celle qu’on choisira pour souligner un anniversaire. Et ce n’est pas une question de prestige ou de prix : c’est surtout une question de moment.

C’est d’ailleurs de là qu’est née l’idée de « Ce soir » sur Le Premier Verre. Plutôt que de commencer par « quel vin devrais-je connaître? », on préfère commencer par « qu’est-ce que tu fais ce soir? ».

Parce que le vin n’existe pas dans le vide. Il accompagne un repas, une personne, une soirée, parfois simplement une envie.

→ Essayer « Ce soir » : /ce-soir


DONNE-TOI UN BUDGET

Il y a quelque chose d’un peu étrange avec le vin : on hésite parfois à dire combien on veut payer.

Pourtant, personne ne trouve bizarre de se donner un budget lorsqu’il cherche un hôtel, une paire de chaussures ou un restaurant. Pourquoi ce serait différent pour une bouteille?

Tu peux très bien vouloir rester autour de 20 $ pour un souper de semaine et décider d’en dépenser 40 $ parce que tu reçois samedi. Aucun des deux choix n’est plus connaisseur que l’autre.

Et surtout, une bouteille plus chère n’est pas automatiquement une bouteille que tu aimeras davantage.

Le prix peut être influencé par la région, la quantité produite, la réputation du domaine, la façon dont le raisin est cultivé, le temps passé à faire le vin ou simplement sa rareté. Tout cela peut être intéressant. Mais rien de tout cela ne peut garantir ton plaisir à toi.

Alors donne-toi un chiffre avec lequel tu es à l’aise.

Pas besoin non plus de calculer au dollar près. « Autour de 20 $ », « pas plus de 30 $ » ou « je peux aller jusqu’à 40 $ » sont déjà d’excellents points de départ.

Et si quelqu’un te conseille, dis ton budget tout de suite. Ce n’est pas un aveu d’ignorance. C’est une information utile.


PARLE DE CE QUE TU AIMES COMME TU LE DIRAIS NORMALEMENT

C’est probablement là que beaucoup de gens se compliquent inutilement la vie.

On pense qu’il faut connaître les bons mots pour parler de vin.

Pas du tout.

« J’aime les blancs vraiment frais. »

« Je n’aime pas les rouges trop lourds. »

« J’aime quand ça goûte beaucoup le fruit. »

« Je voudrais quelque chose de sec, mais pas trop acide. »

Tout ça est parfaitement valable.

Tu n’as pas besoin de parler de minéralité, de tension, de structure ou de tannins soyeux si ces mots ne veulent encore rien dire pour toi. Et surtout, il n’y a aucune raison de les utiliser simplement parce qu’ils donnent l’impression qu’on s’y connaît.

Avec le temps, ton vocabulaire deviendra peut-être plus précis. Mais au départ, l’important est beaucoup plus simple : remarquer ce que tu aimes.

Est-ce que tu préfères généralement les vins légers ou ceux qui prennent davantage de place en bouche? Quelque chose de très frais ou de plus rond? Complètement sec ou avec une petite douceur? Des saveurs franches de fruits ou quelque chose de plus discret?

Et si tu n’en sais absolument rien, il existe un raccourci encore plus facile : pense à une bouteille que tu as aimée.

Même si elle est très connue. Même si elle n’est pas particulièrement prestigieuse. Même si tu ne sais absolument pas pourquoi tu l’aimes.

Dire « j’achète souvent celle-là et j’aimerais découvrir autre chose dans le même esprit » est une excellente façon de demander conseil.

Petit à petit, des constantes vont apparaître. Tu vas peut-être réaliser que plusieurs rouges que tu aimes sont faits de Gamay. Que tu reviens souvent au Riesling. Ou simplement que tu préfères les rouges légers aux vins très puissants.

C’est comme ça qu’on développe ses goûts. En buvant, en remarquant et en revenant sur ce qu’on a aimé. Pas en mémorisant.


ET L’ÉTIQUETTE, DANS TOUT ÇA?

Elle contient beaucoup d’informations. Au début, tu n’as certainement pas besoin de toutes les comprendre.

Trois choses peuvent toutefois commencer à devenir de bons repères : le cépage, l’origine et le producteur.

Le cépage, c’est simplement la variété de raisin utilisée pour faire le vin : Gamay, Chardonnay, Riesling, Pinot noir, Cabernet franc et ainsi de suite. Il ne permet pas de prédire exactement ce qu’il y aura dans ton verre, mais il peut devenir une piste intéressante.

Si tu remarques, après quelques bouteilles, que tu aimes souvent les vins faits de Gamay, garde cette information quelque part. La prochaine fois, tu auras déjà un point de départ.

Même chose pour l’origine. Pas besoin d’apprendre la carte viticole de la France ou de comprendre toutes les appellations. Commence simplement à remarquer les noms qui reviennent.

« Tiens, encore un Beaujolais que j’aime. »

« C’est le deuxième vin d’Alsace que j’achète et que je trouve vraiment bon. »

C’est déjà apprendre le vin.

Puis il y a le producteur. C’est un repère qu’on oublie parfois lorsqu’on commence, alors qu’il peut devenir l’un des plus intéressants.

Si tu as beaucoup aimé une bouteille, regarde qui l’a faite. Il y a de bonnes chances que les autres vins de ce producteur partagent une certaine sensibilité, même s’ils ne goûtent évidemment pas tous la même chose.

C’est aussi pour cette raison qu’on accorde une place importante aux producteurs sur Le Premier Verre. Une bouteille ne vient pas seulement d’un cépage et d’une région. Quelqu’un a décidé comment cultiver le raisin, quand le récolter et quoi en faire ensuite.

Mais encore une fois : cépage, région, appellation et producteur sont des indices. Pas des choses à apprendre avant d’avoir le droit de choisir une bouteille.


QUOI DIRE QUAND QUELQU’UN TE DEMANDE : « JE PEUX VOUS AIDER? »

Tu entres à la SAQ ou chez un caviste. Quelqu’un s’approche et te demande s’il peut t’aider.

Et là, trou noir.

« Oui… je cherche un bon rouge. »

Le problème n’est pas que la demande est mauvaise. C’est simplement qu’il existe énormément de bons rouges.

Tu obtiendras une recommandation beaucoup plus intéressante en racontant en quelques mots ce que tu veux vraiment.

« On mange des pâtes à la sauce tomate ce soir. J’aime les rouges plutôt légers et fruités et je voudrais rester autour de 25 $. »

C’est parfait.

Ou encore : « Je cherche un blanc pour l’apéro. Quelque chose de très frais et sec, autour de 20 $. »

Ou même : « Je vais souper chez des amis, je ne sais pas ce qu’on mange et j’aimerais apporter quelque chose autour de 30 $. »

Tu viens de donner presque tout ce qu’il faut pour t’aider.

L’occasion. Le genre de vin que tu aimes. Ton budget.

Et si tu as envie de sortir de tes habitudes, ajoute simplement : « J’aimerais découvrir quelque chose que je ne connais pas. »

C’est souvent là que les belles découvertes commencent.


SIX BOUTEILLES POUR COMMENCER

Pas besoin de partir avec une liste de cinquante vins. Voici six bouteilles très différentes qui permettent déjà de commencer à comprendre ce qu’on aime.

Pour un blanc frais, sec et facile à servir à l’apéro :
La Sablette Muscadet-Sèvre et Maine sur Lie
→ /vins/la-sablette-muscadet-sevre-et-maine-sur-lie

Pour découvrir un blanc autrichien vif et aromatique :
Lois Grüner Veltliner — Weingut Loimer
→ /vins/loimer-lois-gruner-veltliner-2023

Pour découvrir un rouge léger et fruité à base de Gamay :
Georges Duboeuf Brouilly
→ /vins/georges-duboeuf-brouilly

Pour un rouge plus généreux à petit prix :
Vidal-Fleury Côtes-du-Rhône
→ /vins/vidal-fleury-cotes-du-rhone

Pour essayer des bulles produites au Québec :
L’Orpailleur Brut
→ /vins/l-orpailleur-brut

Pour un rouge italien souple qui fonctionne très bien avec les pâtes ou la pizza :
Zenato Valpolicella Superiore
→ /vins/zenato-valpolicella-superiore

Le but n’est pas d’aimer les six. C’est justement de commencer à remarquer les différences et de découvrir lesquelles te donnent envie d’un deuxième verre.


LE RACCOURCI DU PREMIER VERRE

Si tu ne devais retenir qu’une seule chose de tout ceci, ce serait probablement celle-là :

OCCASION + STYLE + BUDGET.

Qu’est-ce qu’on fait ce soir?

Qu’est-ce que j’ai envie de boire?

Combien ai-je envie de dépenser?

Avec ces trois réponses, tu as déjà énormément avancé.

Le cépage, la région, l’appellation, le millésime et tout le reste pourront venir tranquillement par la suite, au rythme de ta curiosité.


ET SI TU CHOISIS LA « MAUVAISE » BOUTEILLE?

Ça arrivera.

Tu vas acheter une bouteille en étant convaincue que tu vas l’adorer et la trouver plutôt ordinaire. Une autre fois, tu ouvriras quelque chose presque par hasard et tu voudras immédiatement savoir qui l’a fait.

C’est probablement l’une des meilleures façons d’apprendre.

Parce que connaître le vin, ce n’est pas arriver à un moment où l’on ne se trompe plus. C’est tranquillement comprendre pourquoi certaines bouteilles nous donnent envie d’un deuxième verre et d’autres beaucoup moins.

Quand tu aimes quelque chose, garde-en une trace. Le nom de la bouteille, le producteur, le cépage ou la région. Pas besoin d’écrire une note de dégustation de quinze lignes. « J’ai adoré, très frais, à racheter » peut être infiniment plus utile six mois plus tard.

C’est aussi l’idée derrière Ma Cave et Mon Carnet sur Le Premier Verre : se construire ses propres repères plutôt que d’essayer de retenir ceux des autres.

→ Ma Cave : /ma-cave
→ Mon Carnet : /mon-carnet

À force de goûter, le fameux mur de bouteilles devient moins intimidant. Certains noms commencent à te dire quelque chose. Tu reconnais un producteur. Un cépage te rappelle une bouteille que tu avais aimée. Tu sais davantage ce dont tu as envie.

Et surtout, tu arrêtes tranquillement de chercher « la bonne réponse ».

Parce que le bon choix n’est pas la bouteille la plus savante.

C’est celle qui convient au moment, qui te fait plaisir et, avec un peu de chance, qui te donne envie d’en découvrir une autre.


ENVIE DE TROUVER LA BOUTEILLE DE CE SOIR?

Dis-nous ce que tu manges, ce dont tu as envie et ton budget.

→ Essayer « Ce soir » : /ce-soir

Tu peux aussi parcourir les premières fiches vins du Premier Verre pour commencer à découvrir les bouteilles, les cépages, les régions et les producteurs qui correspondent à tes goûts.

Et pour recevoir nos découvertes, nouvelles bouteilles, endroits à visiter et bonnes raisons d’ouvrir quelque chose :

→ S’inscrire à l’infolettre

Le prochain verre commence ici.`;

const articleData = {
  _type: "article",

  title:
    "Comment choisir une bouteille quand on ne connaît rien au vin",

  slug: {
    _type: "slug",
    current:
      "comment-choisir-une-bouteille-quand-on-ne-connait-rien-au-vin"
  },

  excerpt:
    "Pas besoin de connaître les appellations par cœur. Occasion, goûts et budget : quelques repères simples suffisent pour choisir une bouteille avec beaucoup plus de confiance.",

  content,

  category:
    "Débuter avec le vin",

  author:
    "Le Premier Verre",

  tags: [
    "Débuter",
    "Choisir un vin",
    "SAQ",
    "Conseils",
    "Budget",
    "Accords"
  ],

  relatedCountries: [
    ref("country-france", "country-france"),
    ref("country-autriche", "country-autriche"),
    ref("d9fc0ce6-5f30-4e00-8bc5-63146a0a6407", "country-canada"),
    ref("country-italie", "country-italie")
  ],

  relatedRegions: [
    ref("region-vallee-de-la-loire", "region-loire"),
    ref(
      "region-basse-autriche-niederosterreich",
      "region-basse-autriche"
    ),
    ref("region-beaujolais", "region-beaujolais"),
    ref("region-vallee-du-rhone", "region-rhone"),
    ref(
      "55a9fe9a-b3fe-41d6-8145-6adca1a818a8",
      "region-cantons"
    ),
    ref("region-venetie", "region-venetie")
  ],

  relatedAppellations: [
    ref(
      "appellation-muscadet-sevre-et-maine",
      "appellation-muscadet"
    ),
    ref(
      "appellation-kamptal-dac",
      "appellation-kamptal"
    ),
    ref(
      "appellation-brouilly",
      "appellation-brouilly"
    ),
    ref(
      "appellation-cotes-du-rhone",
      "appellation-cotes-rhone"
    ),
    ref(
      "appellation-igp-vin-du-quebec",
      "appellation-quebec"
    ),
    ref(
      "appellation-valpolicella",
      "appellation-valpolicella"
    )
  ],

  relatedGrapes: [
    ref(
      "grape-melon-de-bourgogne",
      "grape-melon"
    ),
    ref(
      "grape-gruner-veltliner",
      "grape-gruner"
    ),
    ref(
      "grape-gamay",
      "grape-gamay"
    ),
    ref(
      "grape-grenache",
      "grape-grenache"
    ),
    ref(
      "grape-carignan",
      "grape-carignan"
    ),
    ref(
      "grape-seyval",
      "grape-seyval"
    ),
    ref(
      "grape-vidal",
      "grape-vidal"
    ),
    ref(
      "grape-corvina-veronese",
      "grape-corvina"
    ),
    ref(
      "grape-rondinella",
      "grape-rondinella"
    ),
    ref(
      "grape-corvinone",
      "grape-corvinone"
    )
  ],

  relatedWines: [
    ref(
      "wine-la-sablette-muscadet-sevre-et-maine-sur-lie",
      "wine-sablette"
    ),
    ref(
      "wine-loimer-lois-gruner-veltliner-2023",
      "wine-loimer"
    ),
    ref(
      "wine-georges-duboeuf-brouilly",
      "wine-brouilly"
    ),
    ref(
      "wine-vidal-fleury-cotes-du-rhone",
      "wine-vidal-fleury"
    ),
    ref(
      "wine-l-orpailleur-brut",
      "wine-orpailleur"
    ),
    ref(
      "wine-zenato-valpolicella-superiore",
      "wine-zenato"
    )
  ],

  relatedProducers: [
    ref(
      "producer-marcel-martin",
      "producer-marcel-martin"
    ),
    ref(
      "producer-weingut-loimer",
      "producer-loimer"
    ),
    ref(
      "producer-georges-duboeuf",
      "producer-duboeuf"
    ),
    ref(
      "producer-vidal-fleury",
      "producer-vidal-fleury"
    ),
    ref(
      "producer-vignoble-de-l-orpailleur",
      "producer-orpailleur"
    ),
    ref(
      "producer-zenato",
      "producer-zenato"
    )
  ],

  relatedVineyards: [
    ref(
      "vineyard-vignoble-de-l-orpailleur",
      "vineyard-orpailleur"
    )
  ],

  relatedPlaces: [],

  featured: true,

  /*
   * On le laisse NON PUBLIÉ pour l'instant,
   * puisque tu dois encore ajouter l'image principale.
   */
  published: false,

  seoTitle:
    "Comment choisir un vin quand on n’y connaît rien | Le Premier Verre",

  seoDescription:
    "Comment choisir un vin quand on n’y connaît rien? Occasion, goûts et budget : une méthode simple pour trouver une bouteille sans maîtriser le vocabulaire du vin."
};

const existing = await client.getDocument(articleId);

if (existing) {
  await client
    .patch(articleId)
    .set(articleData)
    .commit();

  console.log("✓ Article existant mis à jour");
} else {
  await client.create({
    _id: articleId,
    ...articleData
  });

  console.log("+ Article créé");
}

console.log("");
console.log("============================================");
console.log("📝 ARTICLE 1 TERMINÉ DANS SANITY");
console.log("============================================");
console.log("✓ Texte complet");
console.log("✓ 6 vins liés");
console.log("✓ 6 producteurs liés");
console.log("✓ Pays liés");
console.log("✓ Régions liées");
console.log("✓ Appellations liées");
console.log("✓ Cépages liés");
console.log("✓ Vignoble de l'Orpailleur lié");
console.log("✓ SEO complété");
console.log("✓ Article en vedette");
console.log("✓ Article laissé NON PUBLIÉ");
console.log("");
console.log("Il restera seulement à ajouter l'image de couverture.");
