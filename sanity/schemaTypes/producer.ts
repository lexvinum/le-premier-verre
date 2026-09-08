import { defineField, defineType } from "sanity";

export const producer = defineType({
  name: "producer",
  title: "Producteurs",
  type: "document",

  groups: [
    { name: "identity", title: "Identité", default: true },
    { name: "lpv", title: "Le Premier Verre" },
    { name: "approach", title: "Approche & cépages" },
    { name: "visit", title: "Visiter" },
    { name: "advanced", title: "Informations avancées" },
    { name: "publication", title: "Publication" },
  ],

  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "municipality",
      title: "Municipalité",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "country",
      title: "Pays",
      type: "reference",
      to: [{ type: "country" }],
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "region",
      title: "Région",
      type: "reference",
      to: [{ type: "region" }],
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
      title: "Photo principale",
      type: "image",
      group: "identity",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "oneLiner",
      title: "En une phrase",
      type: "text",
      rows: 2,
      group: "lpv",
      description:
        "Une phrase simple qui permet de comprendre immédiatement le producteur.",
      validation: (Rule) => Rule.required().max(220),
    }),

    defineField({
      name: "bio",
      title: "Qui sont-ils?",
      type: "array",
      group: "lpv",
      description: "Environ 100 à 150 mots.",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "approach",
      title: "Leur approche",
      type: "array",
      group: "approach",
      description:
        "Maximum 3 éléments : culture, vinification et/ou particularité du terroir ou du domaine.",
      validation: (Rule) => Rule.required().min(1).max(3),
      of: [
        {
          type: "object",
          name: "producerApproachItem",
          title: "Élément d’approche",
          fields: [
            defineField({
              name: "title",
              title: "Titre",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Texte",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(350),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "text",
            },
          },
        },
      ],
    }),

    defineField({
      name: "signatureGrapes",
      title: "Ce qu’ils cultivent",
      type: "array",
      group: "approach",
      of: [{ type: "reference", to: [{ type: "grape" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "whyWeFollow",
      title: "Pourquoi on les suit",
      type: "text",
      rows: 4,
      group: "lpv",
      description: "2 à 3 phrases dans le ton Le Premier Verre.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "openToVisitors",
      title: "Ouvert aux visiteurs",
      type: "boolean",
      group: "visit",
      initialValue: false,
    }),

    defineField({
      name: "visitDetails",
      title: "Informations de visite",
      type: "text",
      rows: 3,
      group: "visit",
      description:
        "Ex. dégustations, boutique, visites guidées, horaires particuliers.",
      hidden: ({ document }) => document?.openToVisitors !== true,
    }),

    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
      group: "visit",
      hidden: ({ document }) => document?.openToVisitors !== true,
    }),

    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
      group: "visit",
      description:
        "Coordonnée utilisée pour afficher le producteur sur la carte.",
      validation: (Rule) => Rule.min(-90).max(90),
    }),

    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
      group: "visit",
      description:
        "Coordonnée utilisée pour afficher le producteur sur la carte.",
      validation: (Rule) => Rule.min(-180).max(180),
    }),

    defineField({
      name: "reservationRequired",
      title: "Réservation requise",
      type: "boolean",
      group: "visit",
      hidden: ({ document }) => document?.openToVisitors !== true,
    }),

    defineField({
      name: "website",
      title: "Lien officiel",
      type: "url",
      group: "visit",
    }),

    /*
     * Champs existants conservés pour compatibilité et informations avancées.
     */

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "advanced",
      options: { hotspot: true },
    }),

    defineField({
      name: "photo",
      title: "Photo secondaire",
      type: "image",
      group: "advanced",
      options: { hotspot: true },
    }),

    defineField({
      name: "shortBio",
      title: "Ancien résumé court",
      type: "text",
      rows: 4,
      group: "advanced",
      description:
        "Champ conservé pour compatibilité. Utiliser désormais « En une phrase ».",
    }),

    defineField({
      name: "foundedYear",
      title: "Année de fondation",
      type: "number",
      group: "advanced",
    }),

    defineField({
      name: "founder",
      title: "Fondateur / fondatrice",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "currentOwner",
      title: "Propriétaire actuel",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "winemaker",
      title: "Œnologue / maître de chai",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "appellation",
      title: "Appellation principale",
      type: "reference",
      to: [{ type: "appellation" }],
      group: "advanced",
    }),

    defineField({
      name: "vineyard",
      title: "Vignoble lié",
      type: "reference",
      to: [{ type: "vineyard" }],
      group: "advanced",
    }),

    defineField({
      name: "philosophy",
      title: "Ancienne philosophie",
      type: "array",
      group: "advanced",
      of: [{ type: "block" }],
      description:
        "Champ conservé pour compatibilité. Utiliser désormais « Leur approche ».",
    }),

    defineField({
      name: "farmingPractices",
      title: "Pratiques culturales",
      type: "array",
      group: "advanced",
      of: [{ type: "string" }],
      options: { layout: "tags" },
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
      name: "signatureStyles",
      title: "Styles signatures",
      type: "array",
      group: "advanced",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      group: "advanced",
    }),

    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      group: "advanced",
    }),

    defineField({
      name: "email",
      title: "Courriel",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      group: "advanced",
    }),

    defineField({
      name: "wines",
      title: "Anciens vins liés",
      type: "array",
      group: "advanced",
      of: [{ type: "reference", to: [{ type: "wine" }] }],
      description:
        "Champ conservé pour compatibilité. La section « À découvrir » sera désormais générée automatiquement.",
    }),

    defineField({
      name: "articles",
      title: "Articles liés",
      type: "array",
      group: "advanced",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),

    defineField({
      name: "guides",
      title: "Guides liés",
      type: "array",
      group: "advanced",
      of: [{ type: "reference", to: [{ type: "guide" }] }],
    }),

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
      municipality: "municipality",
      region: "region.name",
      media: "heroImage",
    },
    prepare({ title, municipality, region, media }) {
      return {
        title,
        subtitle: [municipality, region].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
