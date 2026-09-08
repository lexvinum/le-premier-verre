import { defineField, defineType } from "sanity";

export const wineFavorite = defineType({
  name: "wineFavorite",
  title: "Favori",
  type: "document",

  fields: [
    defineField({
      name: "userId",
      title: "Utilisateur",
      type: "string",
      description: "Identifiant Clerk du propriétaire du favori.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "wine",
      title: "Vin",
      type: "reference",
      to: [{ type: "wine" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "createdAt",
      title: "Ajouté le",
      type: "datetime",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      wine: "wine.name",
      vintage: "wine.vintage",
    },

    prepare({ wine, vintage }) {
      return {
        title: [wine, vintage].filter(Boolean).join(" · ") || "Favori",
        subtitle: "Favori utilisateur",
      };
    },
  },
});
