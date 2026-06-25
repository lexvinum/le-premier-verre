import { defineField, defineType } from "sanity";

export const region = defineType({
  name: "region",
  title: "Région",
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
      name: "country",
      title: "Pays",
      type: "reference",
      to: [{ type: "country" }],
    }),
    defineField({
      name: "parentRegion",
      title: "Région parente",
      type: "reference",
      to: [{ type: "region" }],
      description: "Exemple : Côte de Beaune peut être rattachée à Bourgogne.",
    }),
    defineField({
      name: "heroImage",
      title: "Image héro",
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
      name: "overview",
      title: "Présentation détaillée",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "climate",
      title: "Climat",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "soilTypes",
      title: "Types de sols",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "mainWineStyles",
      title: "Styles de vins principaux",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "signatureGrapes",
      title: "Cépages emblématiques",
      type: "array",
      of: [{ type: "reference", to: [{ type: "grape" }] }],
    }),
    defineField({
      name: "latitude",
      title: "Latitude",
      type: "number",
    }),
    defineField({
      name: "longitude",
      title: "Longitude",
      type: "number",
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
      country: "country.name",
      parent: "parentRegion.name",
      media: "heroImage",
    },
    prepare({ title, country, parent }) {
      return {
        title,
        subtitle: [parent, country].filter(Boolean).join(" · "),
      };
    },
  },
});
