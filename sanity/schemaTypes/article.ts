import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "content",
      title: "Contenu",
      type: "text",
      rows: 12,
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Thèmes",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "relatedCountries",
      title: "Pays liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "country" }] }],
    }),
    defineField({
      name: "relatedRegions",
      title: "Régions liées",
      type: "array",
      of: [{ type: "reference", to: [{ type: "region" }] }],
    }),
    defineField({
      name: "relatedAppellations",
      title: "Appellations liées",
      type: "array",
      of: [{ type: "reference", to: [{ type: "appellation" }] }],
    }),
    defineField({
      name: "relatedGrapes",
      title: "Cépages liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "grape" }] }],
    }),
    defineField({
      name: "relatedWines",
      title: "Vins liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "wine" }] }],
    }),
    defineField({
      name: "relatedProducers",
      title: "Producteurs liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "producer" }] }],
    }),
    defineField({
      name: "relatedVineyards",
      title: "Vignobles liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "vineyard" }] }],
    }),
    defineField({
      name: "relatedPlaces",
      title: "Bonnes adresses liées",
      type: "array",
      of: [{ type: "reference", to: [{ type: "place" }] }],
    }),

    defineField({
      name: "featured",
      title: "Article en vedette",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "published",
      title: "Publié",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
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
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
