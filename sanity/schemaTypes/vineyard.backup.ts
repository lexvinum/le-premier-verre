import { defineField, defineType } from "sanity";

export const vineyard = defineType({
  name: "vineyard",
  title: "Vignobles",
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
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "region",
      title: "Région",
      type: "string",
    }),
    defineField({
      name: "city",
      title: "Ville",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Site web",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "coverImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "published",
      title: "Publié",
      type: "boolean",
      initialValue: false,
    }),
  ],
});