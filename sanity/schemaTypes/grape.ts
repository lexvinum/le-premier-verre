import { defineField, defineType } from "sanity";

export const grape = defineType({
  name: "grape",
  title: "Cépage",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "color", title: "Couleur", type: "string", options: { list: ["rouge", "blanc", "rosé", "orange"] } }),
  ],
});
