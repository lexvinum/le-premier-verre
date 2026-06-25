import { defineField, defineType } from "sanity";

export const food = defineType({
  name: "food",
  title: "Accords mets-vins",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Apéritif", value: "aperitif" },
          { title: "Poisson", value: "fish" },
          { title: "Fruits de mer", value: "seafood" },
          { title: "Volaille", value: "poultry" },
          { title: "Viande rouge", value: "red-meat" },
          { title: "Charcuterie", value: "charcuterie" },
          { title: "Fromage", value: "cheese" },
          { title: "Végétarien", value: "vegetarian" },
          { title: "Dessert", value: "dessert" },
          { title: "Autre", value: "other" },
        ],
      },
    }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "wines", title: "Vins associés", type: "array", of: [{ type: "reference", to: [{ type: "wine" }] }] }),
    defineField({ name: "published", title: "Publié", type: "boolean", initialValue: false }),
  ],
});
