import { defineField, defineType } from "sanity";

export const wine = defineType({
  name: "wine",
  title: "Vins",
  type: "document",

  groups: [
    { name: "identity", title: "Identité", default: true },
    { name: "purchase", title: "Achat" },
    { name: "lpv", title: "Le Premier Verre" },
    { name: "profile", title: "Profil" },
    { name: "service", title: "Service & accords" },
    { name: "advanced", title: "Informations avancées" },
    { name: "publication", title: "Publication" },
  ],

  fields: [
    // IDENTITÉ
    defineField({
      name: "name",
      title: "Nom de la cuvée",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "producer",
      title: "Producteur",
      type: "reference",
      group: "identity",
      to: [{ type: "producer" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "vintage",
      title: "Millésime",
      type: "number",
      group: "identity",
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),

    defineField({
      name: "color",
      title: "Couleur / type",
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Rouge", value: "red" },
          { title: "Blanc", value: "white" },
          { title: "Rosé", value: "rose" },
          { title: "Orange", value: "orange" },
          { title: "Bulles", value: "sparkling" },
          { title: "Fortifié", value: "fortified" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "country",
      title: "Pays",
      type: "reference",
      group: "identity",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "region",
      title: "Région",
      type: "reference",
      group: "identity",
      to: [{ type: "region" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "appellation",
      title: "Appellation",
      type: "reference",
      group: "identity",
      to: [{ type: "appellation" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "grapes",
      title: "Cépage ou assemblage",
      type: "array",
      group: "identity",
      of: [{ type: "reference", to: [{ type: "grape" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "bottleImage",
      title: "Photo bouteille",
      type: "image",
      group: "identity",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "labelImage",
      title: "Photo étiquette",
      type: "image",
      group: "identity",
      options: { hotspot: true },
    }),

    defineField({
      name: "vineyard",
      title: "Vignoble",
      type: "reference",
      group: "identity",
      to: [{ type: "vineyard" }],
    }),

    // ACHAT
    defineField({
      name: "approxPrice",
      title: "Prix approximatif",
      type: "number",
      group: "purchase",
      description: "Prix approximatif en dollars canadiens.",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "purchaseChannel",
      title: "Circuit d’achat",
      type: "string",
      group: "purchase",
      options: {
        list: [
          { title: "SAQ", value: "saq" },
          { title: "Importation privée", value: "private-import" },
          { title: "Producteur", value: "producer" },
          { title: "Autre", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "purchaseChannelDetails",
      title: "Précision sur le circuit d’achat",
      type: "string",
      group: "purchase",
      description: "Exemple : agence d’importation privée, boutique ou point de vente.",
    }),

    defineField({
      name: "purchaseUrl",
      title: "Lien d’achat",
      type: "url",
      group: "purchase",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "purchaseLastChecked",
      title: "Date de dernière vérification",
      type: "date",
      group: "purchase",
      validation: (Rule) => Rule.required(),
    }),

    // LE PREMIER VERRE
    defineField({
      name: "oneLiner",
      title: "En une phrase",
      type: "text",
      rows: 3,
      group: "lpv",
      description:
        "Une phrase simple permettant de comprendre immédiatement le vin.",
      validation: (Rule) => Rule.required().max(220),
    }),

    defineField({
      name: "tastingKeywords",
      title: "On goûte",
      type: "array",
      group: "lpv",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "3 à 5 mots maximum. Exemple : cerise, poivre, herbes, terre.",
      validation: (Rule) => Rule.required().min(3).max(5),
    }),

    defineField({
      name: "perfectFor",
      title: "Parfait pour",
      type: "array",
      group: "lpv",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "2 à 3 occasions ou plats.",
      validation: (Rule) => Rule.required().min(2).max(3),
    }),

    defineField({
      name: "whyWeRecommend",
      title: "Pourquoi Le Premier Verre le recommande",
      type: "text",
      rows: 5,
      group: "lpv",
      description: "2 à 4 phrases.",
      validation: (Rule) => Rule.required(),
    }),

    // PROFIL
    defineField({
      name: "body",
      title: "Léger ↔ puissant",
      type: "number",
      group: "profile",
      description: "1 = très léger · 5 = très puissant",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: "sweetness",
      title: "Sec ↔ doux",
      type: "number",
      group: "profile",
      description: "1 = très sec · 5 = très doux",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    defineField({
      name: "roundness",
      title: "Vif ↔ rond",
      type: "number",
      group: "profile",
      description: "1 = très vif · 5 = très rond",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),

    // SERVICE & ACCORDS
    defineField({
      name: "servingTemperature",
      title: "Température de service",
      type: "string",
      group: "service",
      description: "Exemple : 14–16 °C",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "decant",
      title: "Carafe",
      type: "boolean",
      group: "service",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "foodPairings",
      title: "Accords mets-vins",
      type: "array",
      group: "service",
      of: [{ type: "reference", to: [{ type: "food" }] }],
    }),

    // INFORMATIONS AVANCÉES
    defineField({
      name: "style",
      title: "Style complémentaire",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "cellaringPotential",
      title: "Potentiel de garde",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "alcohol",
      title: "Alcool (%)",
      type: "number",
      group: "advanced",
    }),

    defineField({
      name: "sugar",
      title: "Sucre",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "acidity",
      title: "Acidité",
      type: "number",
      group: "advanced",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "tannins",
      title: "Tanins",
      type: "number",
      group: "advanced",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "isOrganic",
      title: "Bio",
      type: "boolean",
      group: "advanced",
      initialValue: false,
    }),

    defineField({
      name: "isNatural",
      title: "Nature",
      type: "boolean",
      group: "advanced",
      initialValue: false,
    }),

    defineField({
      name: "isBiodynamic",
      title: "Biodynamie",
      type: "boolean",
      group: "advanced",
      initialValue: false,
    }),

    defineField({
      name: "isVegan",
      title: "Végan",
      type: "boolean",
      group: "advanced",
      initialValue: false,
    }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      group: "advanced",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "aromas",
      title: "Arômes",
      type: "array",
      group: "advanced",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "flavors",
      title: "Saveurs",
      type: "array",
      group: "advanced",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "texture",
      title: "Texture",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "finish",
      title: "Finale",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "intensity",
      title: "Intensité aromatique",
      type: "number",
      group: "advanced",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "complexity",
      title: "Complexité",
      type: "number",
      group: "advanced",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "oakInfluence",
      title: "Influence du bois",
      type: "number",
      group: "advanced",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "vinification",
      title: "Vinification",
      type: "array",
      group: "advanced",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "aging",
      title: "Élevage",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "soil",
      title: "Sols",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "harvestMethod",
      title: "Récolte",
      type: "string",
      group: "advanced",
      options: {
        list: [
          { title: "Manuelle", value: "manual" },
          { title: "Mécanique", value: "mechanical" },
          { title: "Mixte", value: "mixed" },
        ],
      },
    }),

    defineField({
      name: "bottleSize",
      title: "Format",
      type: "string",
      group: "advanced",
      initialValue: "750 ml",
    }),

    defineField({
      name: "sku",
      title: "Code produit / SKU",
      type: "string",
      group: "advanced",
    }),

    // ANCIENS CHAMPS ACHAT CONSERVÉS POUR COMPATIBILITÉ
    defineField({
      name: "saqPrice",
      title: "Prix SAQ — ancien champ",
      type: "number",
      group: "advanced",
      hidden: true,
    }),

    defineField({
      name: "domainPrice",
      title: "Prix au domaine — ancien champ",
      type: "number",
      group: "advanced",
      hidden: true,
    }),

    defineField({
      name: "availableAtSaq",
      title: "Disponible SAQ — ancien champ",
      type: "boolean",
      group: "advanced",
      hidden: true,
    }),

    defineField({
      name: "availableAtDomain",
      title: "Disponible au domaine — ancien champ",
      type: "boolean",
      group: "advanced",
      hidden: true,
    }),

    defineField({
      name: "saqUrl",
      title: "Lien SAQ — ancien champ",
      type: "url",
      group: "advanced",
      hidden: true,
    }),

    defineField({
      name: "producerUrl",
      title: "Lien producteur — ancien champ",
      type: "url",
      group: "advanced",
      hidden: true,
    }),

    defineField({
      name: "articles",
      title: "Articles liés",
      type: "array",
      group: "advanced",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),

    defineField({
      name: "tastingNotes",
      title: "Notes de dégustation",
      type: "array",
      group: "advanced",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "editorialNote",
      title: "Note éditoriale",
      type: "array",
      group: "advanced",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "occasionTags",
      title: "Occasions — ancien champ",
      type: "array",
      group: "advanced",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "experienceLevel",
      title: "Niveau conseillé",
      type: "string",
      group: "advanced",
      options: {
        list: [
          { title: "Débutant", value: "beginner" },
          { title: "Intermédiaire", value: "intermediate" },
          { title: "Avancé", value: "advanced" },
        ],
      },
    }),

    // PUBLICATION
    defineField({
      name: "aiSummary",
      title: "Résumé IA",
      type: "text",
      rows: 4,
      group: "publication",
    }),

    defineField({
      name: "seoTitle",
      title: "Titre SEO",
      type: "string",
      group: "publication",
    }),

    defineField({
      name: "seoDescription",
      title: "Description SEO",
      type: "text",
      rows: 3,
      group: "publication",
    }),

    defineField({
      name: "published",
      title: "Publié",
      type: "boolean",
      group: "publication",
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: "name",
      vintage: "vintage",
      producer: "producer.name",
      media: "bottleImage",
    },
    prepare({ title, vintage, producer, media }) {
      return {
        title: [title, vintage].filter(Boolean).join(" · "),
        subtitle: producer,
        media,
      };
    },
  },
});
