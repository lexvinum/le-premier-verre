import { defineField, defineType } from "sanity";

export const producer = defineType({
  name: "producer",
  title: "Producteur",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "country", title: "Pays", type: "reference", to: [{ type: "country" }] }),
    defineField({ name: "region", title: "Région", type: "reference", to: [{ type: "region" }] }),
    defineField({ name: "description", title: "Description", type: "text" }),
  ],
});
