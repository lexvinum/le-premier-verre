import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-08-15",
});

const id = "55a9fe9a-b3fe-41d6-8145-6adca1a818a8";

await client
  .patch(id)
  .set({
    introduction: [
      {
        _type: "block",
        _key: "intro-cantons-1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "intro-cantons-span-1",
            marks: [],
            text: "Les Cantons-de-l’Est occupent une place à part dans l’histoire du vin québécois. C’est autour de Dunham que la viticulture commerciale moderne du Québec a pris racine au début des années 1980, avant de s’étendre dans les collines et vallées de la région. Aujourd’hui, on y trouve une concentration remarquable de domaines, particulièrement dans Brome-Missisquoi. Le climat nordique impose une viticulture exigeante, mais il donne aussi des vins frais, souvent très expressifs. Cépages hybrides résistants au froid et variétés européennes s’y côtoient, tandis qu’une nouvelle génération de producteurs explore le biologique, les vinifications peu interventionnistes et une lecture de plus en plus précise des terroirs québécois.",
          },
        ],
      },
    ],

    locationText:
      "Au sud du Québec, près de la frontière américaine, les Cantons-de-l’Est s’étendent entre collines, vallées et contreforts des Appalaches. La viticulture est particulièrement concentrée dans Brome-Missisquoi, autour de Dunham, Frelighsburg, Saint-Armand, Brigham et Lac-Brome.",

    latitude: 45.133,
    longitude: -72.8,
    mapZoom: 9,

    climate:
      "Un climat continental nordique marqué par des hivers froids, une saison végétative relativement courte et des écarts de température importants. Le choix du site, l’exposition, le drainage et la résistance des cépages au froid jouent donc un rôle majeur. Les secteurs les mieux exposés de Brome-Missisquoi profitent toutefois de conditions favorables qui permettent autant la culture de cépages hybrides rustiques que celle de certains Vitis vinifera.",

    signatureGrapes: [
      {
        _type: "reference",
        _key: "frontenac-noir",
        _ref: "grape-frontenac-noir",
      },
      {
        _type: "reference",
        _key: "marquette",
        _ref: "grape-marquette",
      },
      {
        _type: "reference",
        _key: "vidal",
        _ref: "grape-vidal",
      },
      {
        _type: "reference",
        _key: "seyval-blanc",
        _ref: "grape-seyval-blanc",
      },
    ],

    characteristics: [
      {
        _type: "regionCharacteristic",
        _key: "berceau",
        title: "Le berceau du vin québécois",
        text: "Dunham est associé aux débuts de la viticulture commerciale moderne au Québec. Cette histoire explique la concentration de domaines et le savoir-faire développé dans la région.",
      },
      {
        _type: "regionCharacteristic",
        _key: "brome",
        title: "Brome-Missisquoi au cœur du vignoble",
        text: "Une grande partie de l’activité viticole se concentre autour de Dunham, Frelighsburg, Saint-Armand, Brigham et des villages voisins, reliés notamment par la Route des vins.",
      },
      {
        _type: "regionCharacteristic",
        _key: "nordique",
        title: "Une viticulture nordique",
        text: "Les hivers froids et la saison végétative courte obligent les producteurs à réfléchir finement au choix des cépages, à l’exposition des parcelles et aux méthodes de protection de la vigne.",
      },
      {
        _type: "regionCharacteristic",
        _key: "cepages",
        title: "Hybrides et vinifera côte à côte",
        text: "Frontenac, Marquette, Vidal et Seyval côtoient aujourd’hui des cépages européens dans les sites les plus favorables, donnant une gamme de styles beaucoup plus large qu’autrefois.",
      },
      {
        _type: "regionCharacteristic",
        _key: "diversite",
        title: "Une scène en pleine évolution",
        text: "Domaines historiques et nouvelle génération se croisent ici. Agriculture biologique, vins nature, expérimentations et recherche d’une identité proprement québécoise font partie du paysage.",
      },
    ],

    published: true,
  })
  .commit();

console.log("✅ Cantons-de-l’Est rempli.");
console.log("✅ Introduction, localisation, carte et climat ajoutés.");
console.log("✅ 4 cépages principaux ajoutés.");
console.log("✅ 5 caractéristiques LPV ajoutées.");
console.log("✅ Région publiée.");
