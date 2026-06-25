import { defineField, defineType } from "sanity";

export const vineyard = defineType({
  name: "vineyard",
  title: "Vignobles",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nom", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),

    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "coverImage", title: "Photo couverture", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImage", title: "Image héro", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galerie", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),

    defineField({ name: "excerpt", title: "Description courte", type: "text", rows: 4 }),
    defineField({ name: "description", title: "Description longue", type: "array", of: [{ type: "block" }] }),

    defineField({ name: "foundedYear", title: "Année de fondation", type: "number" }),
    defineField({ name: "owner", title: "Propriétaire", type: "string" }),
    defineField({ name: "winemaker", title: "Œnologue / maître de chai", type: "string" }),

    defineField({ name: "address", title: "Adresse", type: "string" }),
    defineField({ name: "city", title: "Ville", type: "string" }),
    defineField({ name: "province", title: "Province", type: "string", initialValue: "Québec" }),
    defineField({ name: "postalCode", title: "Code postal", type: "string" }),
    defineField({ name: "country", title: "Pays", type: "reference", to: [{ type: "country" }] }),
    defineField({ name: "region", title: "Région", type: "reference", to: [{ type: "region" }] }),
    defineField({ name: "appellation", title: "Appellation", type: "reference", to: [{ type: "appellation" }] }),

    defineField({ name: "latitude", title: "Latitude", type: "number" }),
    defineField({ name: "longitude", title: "Longitude", type: "number" }),

    defineField({ name: "phone", title: "Téléphone", type: "string" }),
    defineField({ name: "email", title: "Courriel", type: "string" }),
    defineField({ name: "website", title: "Site web", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "facebook", title: "Facebook", type: "url" }),
    defineField({ name: "bookingUrl", title: "Lien de réservation", type: "url" }),

    defineField({ name: "hasRestaurant", title: "Restaurant", type: "boolean", initialValue: false }),
    defineField({ name: "hasAccommodation", title: "Hébergement", type: "boolean", initialValue: false }),
    defineField({ name: "hasTerrace", title: "Terrasse", type: "boolean", initialValue: false }),
    defineField({ name: "hasShop", title: "Boutique", type: "boolean", initialValue: false }),
    defineField({ name: "hasGuidedTour", title: "Visite guidée", type: "boolean", initialValue: false }),
    defineField({ name: "hasTasting", title: "Dégustation", type: "boolean", initialValue: false }),
    defineField({ name: "allowsPets", title: "Animaux acceptés", type: "boolean", initialValue: false }),
    defineField({ name: "familyFriendly", title: "Adapté aux familles", type: "boolean", initialValue: false }),
    defineField({ name: "accessible", title: "Accessible aux personnes à mobilité réduite", type: "boolean", initialValue: false }),

    defineField({ name: "openingHours", title: "Horaire", type: "text", rows: 4 }),
    defineField({ name: "seasonality", title: "Saisonnalité", type: "string" }),
    defineField({ name: "averagePrice", title: "Prix moyen", type: "string" }),
    defineField({ name: "visitDuration", title: "Durée moyenne de visite", type: "string" }),

    defineField({
      name: "experiences",
      title: "Expériences offertes",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Exemple : dégustation, visite des vignes, pique-nique, atelier, vendanges.",
    }),

    defineField({
      name: "farmingPractices",
      title: "Pratiques culturales",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "mainGrapes",
      title: "Cépages principaux",
      type: "array",
      of: [{ type: "reference", to: [{ type: "grape" }] }],
    }),

    defineField({
      name: "wineStyles",
      title: "Styles de vins produits",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),

    defineField({
      name: "visitorTips",
      title: "Conseils de visite",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({ name: "producers", title: "Producteurs liés", type: "array", of: [{ type: "reference", to: [{ type: "producer" }] }] }),
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
      city: "city",
      region: "region.name",
      media: "coverImage",
    },
    prepare({ title, city, region, media }) {
      return {
        title,
        subtitle: [city, region].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
