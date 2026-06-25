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

    defineField({ name: "foodPairings", title: "Accords mets-vins", type: "array", of: [{ type: "reference", to: [{ type: "food" }] }] }),
    defineField({ name: "articles", title: "Articles liés", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),
    defineField({ name: "tastingNotes", title: "Notes de dégustation", type: "array", of: [{ type: "block" }] }),

    defineField({ name: "published", title: "Publié", type: "boolean", initialValue: false }),
  ],
});
