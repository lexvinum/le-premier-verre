import { defineField, defineType } from "sanity";

export const wine = defineType({
  name: "wine",
  title: "Vins",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),

    defineField({ name: "vintage", title: "Millésime", type: "number" }),
    defineField({
      name: "color",
      title: "Couleur",
      type: "string",
      options: {
        list: [
          { title: "Rouge", value: "red" },
          { title: "Blanc", value: "white" },
          { title: "Rosé", value: "rose" },
          { title: "Orange", value: "orange" },
          { title: "Effervescent", value: "sparkling" },
          { title: "Fortifié", value: "fortified" },
        ],
      },
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Sec", value: "dry" },
          { title: "Demi-sec", value: "off-dry" },
          { title: "Doux", value: "sweet" },
          { title: "Nature", value: "natural" },
          { title: "Classique", value: "classic" },
        ],
      },
    }),

    defineField({ name: "bottleImage", title: "Photo bouteille", type: "image", options: { hotspot: true } }),
    defineField({ name: "labelImage", title: "Photo étiquette", type: "image", options: { hotspot: true } }),

    defineField({ name: "producer", title: "Producteur", type: "reference", to: [{ type: "producer" }] }),
    defineField({ name: "vineyard", title: "Vignoble", type: "reference", to: [{ type: "vineyard" }] }),
    defineField({ name: "country", title: "Pays", type: "reference", to: [{ type: "country" }] }),
    defineField({ name: "region", title: "Région", type: "reference", to: [{ type: "region" }] }),
    defineField({ name: "appellation", title: "Appellation", type: "reference", to: [{ type: "appellation" }] }),
    defineField({ name: "grapes", title: "Cépages", type: "array", of: [{ type: "reference", to: [{ type: "grape" }] }] }),

    defineField({ name: "saqPrice", title: "Prix SAQ", type: "number" }),
    defineField({ name: "domainPrice", title: "Prix au domaine", type: "number" }),
    defineField({ name: "availableAtSaq", title: "Disponible SAQ", type: "boolean", initialValue: false }),
    defineField({ name: "availableAtDomain", title: "Disponible au domaine", type: "boolean", initialValue: false }),

    defineField({ name: "servingTemperature", title: "Température de service", type: "string" }),
    defineField({ name: "cellaringPotential", title: "Potentiel de garde", type: "string" }),
    defineField({ name: "alcohol", title: "Alcool (%)", type: "number" }),
    defineField({ name: "sugar", title: "Sucre", type: "string" }),
    defineField({ name: "acidity", title: "Acidité", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "body", title: "Corps", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "tannins", title: "Tanins", type: "number", validation: (Rule) => Rule.min(1).max(5) }),

    defineField({ name: "isOrganic", title: "Bio", type: "boolean", initialValue: false }),
    defineField({ name: "isNatural", title: "Nature", type: "boolean", initialValue: false }),
    defineField({ name: "isBiodynamic", title: "Biodynamie", type: "boolean", initialValue: false }),
    defineField({ name: "isVegan", title: "Végan", type: "boolean", initialValue: false }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "aromas",
      title: "Arômes",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "flavors",
      title: "Saveurs",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "texture",
      title: "Texture",
      type: "string",
      description: "Exemple : soyeux, ample, tendu, crémeux, minéral.",
    }),

    defineField({
      name: "finish",
      title: "Finale",
      type: "string",
      description: "Exemple : courte, moyenne, longue, persistante.",
    }),

    defineField({
      name: "intensity",
      title: "Intensité aromatique",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "sweetness",
      title: "Perception du sucre",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "complexity",
      title: "Complexité",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "oakInfluence",
      title: "Influence du bois",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "vinification",
      title: "Vinification",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "aging",
      title: "Élevage",
      type: "string",
      description: "Exemple : 12 mois en fûts de chêne français.",
    }),

    defineField({
      name: "soil",
      title: "Sols",
      type: "string",
    }),

    defineField({
      name: "harvestMethod",
      title: "Récolte",
      type: "string",
      options: {
        list: [
          { title: "Manuelle", value: "manual" },
          { title: "Mécanique", value: "mechanical" },
          { title: "Mixte", value: "mixed" },
        ],
      },
    }),

    defineField({
      name: "bottleSize",
      title: "Format",
      type: "string",
      initialValue: "750 ml",
    }),

    defineField({
      name: "sku",
      title: "Code produit / SKU",
      type: "string",
    }),

    defineField({
      name: "saqUrl",
      title: "Lien SAQ",
      type: "url",
    }),

    defineField({
      name: "producerUrl",
      title: "Lien producteur",
      type: "url",
    }),

    defineField({ name: "foodPairings", title: "Accords mets-vins", type: "array", of: [{ type: "reference", to: [{ type: "food" }] }] }),
    defineField({ name: "articles", title: "Articles liés", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),
    defineField({ name: "tastingNotes", title: "Notes de dégustation", type: "array", of: [{ type: "block" }] }),

    defineField({
      name: "editorialNote",
      title: "Note éditoriale",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "occasionTags",
      title: "Occasions",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Exemple : apéro, souper entre amis, cadeau, cellier, BBQ.",
    }),

    defineField({
      name: "experienceLevel",
      title: "Niveau conseillé",
      type: "string",
      options: {
        list: [
          { title: "Débutant", value: "beginner" },
          { title: "Intermédiaire", value: "intermediate" },
          { title: "Avancé", value: "advanced" },
        ],
      },
    }),

    defineField({
      name: "aiSummary",
      title: "Résumé IA",
      type: "text",
      rows: 4,
      description: "Résumé synthétique destiné aux recommandations et recherches intelligentes.",
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

    defineField({ name: "published", title: "Publié", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: {
      title: "name",
      vintage: "vintage",
      producer: "producer.name",
      media: "bottleImage",
    },
    prepare({ title, vintage, producer, media }) {
      return {
        title: [title, vintage].filter(Boolean).join(" · "),
        subtitle: producer,
        media,
      };
    },
  },
});
