import { defineField, defineType } from "sanity";

export const pageSection = defineType({
  name: "pageSection",
  title: "Section de page",
  type: "object",
  fields: [
    defineField({
      name: "sectionType",
      title: "Type de section",
      type: "string",
      options: {
        list: [
          { title: "Hero éditorial", value: "hero" },
          { title: "Mosaïque photo", value: "imageMosaic" },
          { title: "Grille éditoriale", value: "editorialGrid" },
          { title: "Citation", value: "quote" },
          { title: "Mise en avant", value: "feature" },
          { title: "Sommelier IA", value: "sommelierCta" },
          { title: "Sélection de vins", value: "featuredWines" },
          { title: "Sélection de producteurs", value: "featuredProducers" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({ name: "eyebrow", title: "Petit titre", type: "string" }),
    defineField({ name: "title", title: "Titre", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "href", title: "Lien", type: "string" }),
    defineField({ name: "buttonLabel", title: "Texte du bouton", type: "string" }),

    defineField({
      name: "editorialAsset",
      title: "Image de la bibliothèque",
      type: "reference",
      to: [{ type: "editorialAsset" }],
      description: "Prioritaire si sélectionnée. Sinon, l'image principale sera utilisée.",
    }),

    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "secondaryImage",
      title: "Image secondaire",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "thirdImage",
      title: "Troisième image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "tone",
      title: "Ambiance",
      type: "string",
      options: {
        list: [
          { title: "Clair", value: "light" },
          { title: "Olive", value: "olive" },
          { title: "Vin", value: "wine" },
          { title: "Encre", value: "ink" },
        ],
      },
      initialValue: "light",
    }),

    defineField({
      name: "wines",
      title: "Vins à afficher",
      type: "array",
      of: [{ type: "reference", to: [{ type: "wine" }] }],
    }),

    defineField({
      name: "producers",
      title: "Producteurs à afficher",
      type: "array",
      of: [{ type: "reference", to: [{ type: "producer" }] }],
    }),

    defineField({
      name: "cards",
      title: "Cartes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "eyebrow", title: "Petit titre", type: "string" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "href", title: "Lien", type: "string" }),
            defineField({
              name: "tone",
              title: "Style visuel",
              type: "string",
              options: {
                list: [
                  { title: "Crème", value: "cream" },
                  { title: "Olive", value: "olive" },
                  { title: "Vin", value: "wine" },
                  { title: "Photo", value: "photo" },
                ],
              },
              initialValue: "cream",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "sectionType",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Section sans titre",
        subtitle,
      };
    },
  },
});
