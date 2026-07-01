import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Pages éditoriales",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageType",
      title: "Type de page",
      type: "string",
      options: {
        list: [
          { title: "Accueil", value: "home" },
          { title: "À propos", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Services juridiques", value: "legal-services" },
          { title: "Page générale", value: "general" },
        ],
      },
      initialValue: "general",
    }),
    defineField({
      name: "published",
      title: "Publié",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "heroTitle",
      title: "Titre hero",
      type: "string",
    }),
    defineField({
      name: "heroText",
      title: "Texte hero",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sections",
      title: "Sections de page",
      type: "array",
      of: [{ type: "pageSection" }],
      description:
        "Composez la page comme un magazine : hero, grille, citation, mise en avant, Sommelier IA.",
    }),
    defineField({
      name: "content",
      title: "Contenu",
      type: "array",
      of: [{ type: "block" }],
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
    }),
  ],
});
