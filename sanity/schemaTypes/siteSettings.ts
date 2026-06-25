import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Accueil / Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Petit titre",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Titre principal",
      type: "string",
    }),
    defineField({
      name: "heroText",
      title: "Texte principal",
      type: "text",
    }),
    defineField({
      name: "primaryButtonLabel",
      title: "Bouton principal - texte",
      type: "string",
    }),
    defineField({
      name: "primaryButtonHref",
      title: "Bouton principal - lien",
      type: "string",
    }),
    defineField({
      name: "secondaryButtonLabel",
      title: "Bouton secondaire - texte",
      type: "string",
    }),
    defineField({
      name: "secondaryButtonHref",
      title: "Bouton secondaire - lien",
      type: "string",
    }),
    defineField({
      name: "introTitle",
      title: "Titre introduction",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Texte introduction",
      type: "text",
    }),
  ],
});