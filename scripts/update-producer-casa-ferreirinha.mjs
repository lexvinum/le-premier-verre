import { getCliClient } from "sanity/cli";

const client = getCliClient({
  apiVersion: "2025-02-19",
  perspective: "raw"
});

const publishedId = "producer-casa-ferreirinha";
const draftId = "drafts.producer-casa-ferreirinha";

const published = await client.getDocument(publishedId);

if (!published) {
  throw new Error("Le producteur Casa Ferreirinha est introuvable.");
}

const data = {
  ...published,
  _id: draftId,
  _type: "producer",

  municipality: "Vila Nova de Foz Côa",

  oneLiner: "Une maison emblématique du Douro, héritière de Dona Antónia Ferreira et pionnière des grands vins tranquilles de la région.",

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
          text: "Casa Ferreirinha occupe une place particulière dans l’histoire du Douro. Son nom rend hommage à Dona Antónia Adelaide Ferreira, grande figure du XIXe siècle dont l’influence a profondément marqué la région. Alors que le Douro est longtemps resté surtout associé au porto, Casa Ferreirinha a contribué à démontrer le potentiel des vins tranquilles du territoire. Aujourd’hui, la maison poursuit ce travail à travers des cuvées allant de vins accessibles comme Papa Figos jusqu’à des vins iconiques comme Barca-Velha, avec une attention constante portée aux cépages autochtones et aux différents terroirs du Douro."
        }
      ]
    }
  ],

  approach: [
    {
      _key: "heritage",
      _type: "producerApproachItem",
      title: "L’héritage de Dona Antónia",
      text: "Casa Ferreirinha porte l’héritage de Dona Antónia Adelaide Ferreira, figure majeure du Douro reconnue pour sa contribution au développement et au rayonnement de la région."
    },
    {
      _key: "douro",
      _type: "producerApproachItem",
      title: "Révéler le Douro autrement",
      text: "La maison a joué un rôle important dans la reconnaissance des vins tranquilles du Douro, en montrant que cette région pouvait produire bien davantage que du porto."
    },
    {
      _key: "terroirs",
      _type: "producerApproachItem",
      title: "Des terroirs multiples",
      text: "Les vins s’appuient sur une sélection de cépages traditionnels et de parcelles réparties dans différentes zones du Douro, notamment le Cima Corgo et le Douro Superior."
    }
  ],

  signatureGrapes: [
    {
      _key: "touriga-nacional",
      _type: "reference",
      _ref: "grape-touriga-nacional"
    },
    {
      _key: "touriga-franca",
      _type: "reference",
      _ref: "grape-touriga-franca"
    },
    {
      _key: "tinta-roriz",
      _type: "reference",
      _ref: "grape-tinta-roriz"
    },
    {
      _key: "tinta-barroca",
      _type: "reference",
      _ref: "grape-tinta-barroca"
    }
  ],

  whyWeFollow: "Parce que Casa Ferreirinha permet de découvrir le Douro loin des seuls vins de Porto. Des cuvées accessibles comme Papa Figos jusqu’aux grandes bouteilles de garde, la maison offre une excellente façon de comprendre les cépages, les paysages et la personnalité de cette région spectaculaire.",

  openToVisitors: false,

  website: "https://sogrape.com/pt/brand/casa-ferreirinha",

  currentOwner: "Sogrape",

  winemaker: "Luís Sottomayor",

  signatureStyles: [
    "Vins rouges du Douro",
    "Assemblages de cépages autochtones",
    "Vins de garde",
    "Douro contemporain"
  ],

  seoTitle: "Casa Ferreirinha | Producteur du Douro | Le Premier Verre",

  seoDescription: "Découvrez Casa Ferreirinha, maison emblématique du Douro héritière de Dona Antónia Ferreira et pionnière des grands vins tranquilles portugais.",

  aiSummary: "Casa Ferreirinha est une maison historique du Douro, héritière de Dona Antónia Adelaide Ferreira et reconnue pour avoir contribué au rayonnement des vins tranquilles de la région.",

  published: false
};

delete data._rev;
delete data._createdAt;
delete data._updatedAt;
delete data._system;

const existingDraft = await client.getDocument(draftId);

if (existingDraft) {
  await client.patch(draftId).set(data).commit();
  console.log("✓ Draft Casa Ferreirinha mis à jour");
} else {
  await client.create(data);
  console.log("✓ Draft Casa Ferreirinha créé");
}

console.log("✓ Bio, approche et cépages ajoutés");
console.log("✓ Œnologue et informations SEO ajoutés");
console.log("✓ Photo principale à ajouter dans Studio");
