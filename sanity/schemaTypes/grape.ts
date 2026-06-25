import { defineField, defineType } from "sanity";

export const grape = defineType({
  name: "grape",
  title: "Cépage",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "color",
      title: "Couleur",
      type: "string",
      options: {
        list: [
          { title: "Blanc", value: "white" },
          { title: "Rouge", value: "red" },
          { title: "Rosé", value: "rose" },
          { title: "Gris", value: "gris" },
          { title: "Noir", value: "black" },
        ],
      },
    }),

    defineField({
      name: "heroImage",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "description",
      title: "Description courte",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "history",
      title: "Histoire",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "originCountry",
      title: "Pays d'origine",
      type: "reference",
      to: [{ type: "country" }],
    }),

    defineField({
      name: "aromas",
      title: "Arômes typiques",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "flavors",
      title: "Saveurs dominantes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "body",
      title: "Corps",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "acidity",
      title: "Acidité",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "tannins",
      title: "Tanins",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "agingPotential",
      title: "Potentiel de garde",
      type: "string",
    }),

    defineField({
      name: "servingTemperature",
      title: "Température de service",
      type: "string",
    }),

    defineField({
      name: "recommendedFoods",
      title: "Accords classiques",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "food" }],
        },
      ],
    }),

    defineField({
      name: "seoTitle",
      title: "Titre SEO",
      type: "string",
    }),

    defineField({
      name: "seoDescription",
      title: "Description SEO",
      type: "text",
      rows: 3,
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "color",
      media: "heroImage",
    },
  },
});
