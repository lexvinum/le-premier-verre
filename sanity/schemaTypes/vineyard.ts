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
    defineField({ name: "gallery", title: "Galerie", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),

    defineField({ name: "excerpt", title: "Description courte", type: "text" }),
    defineField({ name: "description", title: "Description longue", type: "array", of: [{ type: "block" }] }),

    defineField({ name: "address", title: "Adresse", type: "string" }),
    defineField({ name: "city", title: "Ville", type: "string" }),
    defineField({ name: "province", title: "Province", type: "string", initialValue: "Québec" }),
    defineField({ name: "country", title: "Pays", type: "reference", to: [{ type: "country" }] }),
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

    defineField({ name: "openingHours", title: "Horaire", type: "text" }),
    defineField({ name: "averagePrice", title: "Prix moyen", type: "string" }),

    defineField({ name: "producers", title: "Producteurs liés", type: "array", of: [{ type: "reference", to: [{ type: "producer" }] }] }),
    defineField({ name: "wines", title: "Vins liés", type: "array", of: [{ type: "reference", to: [{ type: "wine" }] }] }),
    defineField({ name: "articles", title: "Articles liés", type: "array", of: [{ type: "reference", to: [{ type: "article" }] }] }),

    defineField({ name: "published", title: "Publié", type: "boolean", initialValue: false }),
  ],
});
