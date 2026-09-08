import { defineField, defineType } from "sanity";

export const userPreferences = defineType({
  name: "userPreferences",
  title: "Préférences utilisateur",
  type: "document",

  fields: [
    defineField({
      name: "userId",
      title: "Utilisateur",
      type: "string",
      description: "Identifiant Clerk du propriétaire des préférences.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainWineType",
      title: "Je bois surtout",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Blanc", value: "white" },
          { title: "Rouge", value: "red" },
          { title: "Bulles", value: "sparkling" },
          { title: "Rosé", value: "rose" },
          { title: "Orange", value: "orange" },
          { title: "Je touche à tout", value: "everything" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "budget",
      title: "Mon budget habituel",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Moins de 20 $", value: "under-20" },
          { title: "20 à 30 $", value: "20-30" },
          { title: "30 à 50 $", value: "30-50" },
          { title: "50 $ et plus", value: "50-plus" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "bodyPreference",
      title: "Je préfère généralement",
      description: "1 = très léger · 5 = très généreux",
      type: "number",
      options: {
        list: [
          { title: "1 — Très léger", value: 1 },
          { title: "2 — Plutôt léger", value: 2 },
          { title: "3 — Entre les deux", value: 3 },
          { title: "4 — Plutôt généreux", value: 4 },
          { title: "5 — Très généreux", value: 5 },
        ],
      },
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),

    defineField({
      name: "stylePreference",
      title: "J’aime",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Classique", value: "classic" },
          { title: "Aventureux", value: "adventurous" },
          { title: "Les deux", value: "both" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainOccasion",
      title: "Je cherche surtout du vin pour",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Souper de semaine", value: "weeknight" },
          { title: "Recevoir", value: "hosting" },
          { title: "Découvrir", value: "discovering" },
          { title: "Offrir", value: "gifting" },
          { title: "Occasions spéciales", value: "special-occasions" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "createdAt",
      title: "Créées le",
      type: "datetime",
      readOnly: true,
    }),

    defineField({
      name: "updatedAt",
      title: "Modifiées le",
      type: "datetime",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      userId: "userId",
      mainWineType: "mainWineType",
      budget: "budget",
    },

    prepare({ userId, mainWineType, budget }) {
      const wineLabels: Record<string, string> = {
        white: "Blanc",
        red: "Rouge",
        sparkling: "Bulles",
        rose: "Rosé",
        orange: "Orange",
        everything: "Touche à tout",
      };

      const budgetLabels: Record<string, string> = {
        "under-20": "Moins de 20 $",
        "20-30": "20 à 30 $",
        "30-50": "30 à 50 $",
        "50-plus": "50 $ et plus",
      };

      return {
        title: userId || "Utilisateur",
        subtitle: [
          wineLabels[mainWineType],
          budgetLabels[budget],
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
