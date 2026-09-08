import { defineField, defineType } from "sanity";

export const wineJournalEntry = defineType({
  name: "wineJournalEntry",
  title: "Entrée de carnet",
  type: "document",

  fields: [
    defineField({
      name: "userId",
      title: "Utilisateur",
      type: "string",
      description: "Identifiant Clerk du propriétaire de l'entrée.",
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
      name: "tastedAt",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "appreciation",
      title: "Appréciation",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Aimé", value: "liked" },
          { title: "Moyen", value: "average" },
          { title: "Pas aimé", value: "disliked" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "note",
      title: "Note",
      type: "text",
      rows: 4,
      description: "Ex. Super avec les pâtes aux champignons.",
    }),

    defineField({
      name: "buyAgain",
      title: "Rachèterais",
      type: "boolean",
      validation: (Rule) => Rule.required(),
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
      wine: "wine.name",
      vintage: "wine.vintage",
      date: "tastedAt",
      appreciation: "appreciation",
    },

    prepare({ wine, vintage, date, appreciation }) {
      const labels: Record<string, string> = {
        liked: "Aimé",
        average: "Moyen",
        disliked: "Pas aimé",
      };

      return {
        title: [wine, vintage].filter(Boolean).join(" · ") || "Entrée de carnet",
        subtitle: [date, labels[appreciation]].filter(Boolean).join(" · "),
      };
    },
  },
});
