import { defineField, defineType } from "sanity";

export const editorialAsset = defineType({
  name: "editorialAsset",
  title: "Bibliothèque photo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre interne",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Hero", value: "hero" },
          { title: "Lifestyle", value: "lifestyle" },
          { title: "Vignoble", value: "vineyard" },
          { title: "Repas", value: "food" },
          { title: "Verre", value: "glass" },
          { title: "Bouteille", value: "bottle" },
          { title: "Producteur", value: "producer" },
          { title: "Texture", value: "texture" },
          { title: "Carte", value: "map" },
        ],
      },
      initialValue: "lifestyle",
    }),
    defineField({
      name: "mood",
      title: "Ambiance",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Ex. lumineux, intime, moderne, rural, table, voyage.",
    }),
    defineField({
      name: "alt",
      title: "Texte alternatif",
      type: "string",
    }),
    defineField({
      name: "credit",
      title: "Crédit photo",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
