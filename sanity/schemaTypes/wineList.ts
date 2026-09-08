import { defineArrayMember, defineField, defineType } from "sanity";

export const wineList = defineType({
  name: "wineList",
  title: "Liste de vins",
  type: "document",

  fields: [
    defineField({
      name: "userId",
      title: "Utilisateur",
      type: "string",
      description: "Identifiant Clerk du propriétaire de la liste.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "name",
      title: "Nom de la liste",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(80),
    }),

    defineField({
      name: "wines",
      title: "Vins",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "wine" }],
        }),
      ],
    }),

    defineField({
      name: "createdAt",
      title: "Créée le",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "updatedAt",
      title: "Modifiée le",
      type: "datetime",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: "name",
      userId: "userId",
      wines: "wines",
    },
    prepare({ title, userId, wines }) {
      const count = Array.isArray(wines) ? wines.length : 0;

      return {
        title: title || "Liste sans nom",
        subtitle: `${count} vin${count === 1 ? "" : "s"} · ${userId || "Utilisateur inconnu"}`,
      };
    },
  },
});
