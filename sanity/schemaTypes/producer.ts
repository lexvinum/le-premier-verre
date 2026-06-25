import { defineField, defineType } from "sanity";

export const producer = defineType({
  name: "producer",
  title: "Producteurs",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),

    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),

    defineField({ name: "bio", title: "Biographie", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "country", title: "Pays", type: "reference", to: [{ type: "country" }] }),
    defineField({ name: "region", title: "Région", type: "reference", to: [{ type: "region" }] }),
    defineField({ name: "vineyard", title: "Vignoble lié", type: "reference", to: [{ type: "vineyard" }] }),

    defineField({ name: "website", title: "Site web", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),

    defineField({ name: "wines", title: "Vins liés", type: "array", of: [{ type: "reference", to: [{ type: "wine" }] }] }),
    defineField({ name: "articles", title: "Articles liés", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),

    defineField({ name: "published", title: "Publié", type: "boolean", initialValue: false }),
  ],
});
