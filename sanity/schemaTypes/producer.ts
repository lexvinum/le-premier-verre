import { defineField, defineType } from "sanity";

export const producer = defineType({
  name: "producer",
  title: "Producteurs",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),

    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImage", title: "Image héro", type: "image", options: { hotspot: true } }),

    defineField({ name: "shortBio", title: "Résumé court", type: "text", rows: 4 }),
    defineField({ name: "bio", title: "Biographie", type: "array", of: [{ type: "block" }] }),

    defineField({ name: "foundedYear", title: "Année de fondation", type: "number" }),
    defineField({ name: "founder", title: "Fondateur / fondatrice", type: "string" }),
    defineField({ name: "currentOwner", title: "Propriétaire actuel", type: "string" }),
    defineField({ name: "winemaker", title: "Œnologue / maître de chai", type: "string" }),

    defineField({ name: "country", title: "Pays", type: "reference", to: [{ type: "country" }] }),
    defineField({ name: "region", title: "Région", type: "reference", to: [{ type: "region" }] }),
    defineField({ name: "appellation", title: "Appellation principale", type: "reference", to: [{ type: "appellation" }] }),
    defineField({ name: "vineyard", title: "Vignoble lié", type: "reference", to: [{ type: "vineyard" }] }),

    defineField({
      name: "philosophy",
      title: "Philosophie",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "farmingPractices",
      title: "Pratiques culturales",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Exemple : biologique, biodynamie, durable, régénératif.",
    }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "signatureGrapes",
      title: "Cépages signatures",
      type: "array",
      of: [{ type: "reference", to: [{ type: "grape" }] }],
    }),

    defineField({
      name: "signatureStyles",
      title: "Styles signatures",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({ name: "website", title: "Site web", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),

    defineField({ name: "email", title: "Courriel", type: "string" }),
    defineField({ name: "phone", title: "Téléphone", type: "string" }),

    defineField({ name: "wines", title: "Vins liés", type: "array", of: [{ type: "reference", to: [{ type: "wine" }] }] }),
    defineField({ name: "articles", title: "Articles liés", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),

    defineField({
      name: "guides",
      title: "Guides liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "guide" }] }],
    }),

    defineField({
      name: "aiSummary",
      title: "Résumé IA",
      type: "text",
      rows: 4,
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
      region: "region.name",
      country: "country.name",
      media: "logo",
    },
    prepare({ title, region, country, media }) {
      return {
        title,
        subtitle: [region, country].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
