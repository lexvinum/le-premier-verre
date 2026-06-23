import { defineField, defineType } from "sanity";

export const country = defineType({
  name: "country",
  title: "Pays",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
