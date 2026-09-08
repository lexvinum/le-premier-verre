import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom interne",
      type: "string",
      initialValue: "Réglages du site",
    }),

    defineField({
      name: "brand",
      title: "Identité",
      type: "object",
      fields: [
        defineField({
          name: "siteName",
          title: "Nom du site",
          type: "string",
          initialValue: "Le Premier Verre",
        }),
        defineField({
          name: "tagline",
          title: "Phrase de marque",
          type: "string",
          initialValue: "Le vin, avec beauté, clarté et intelligence.",
        }),
      ],
    }),

    defineField({
      name: "design",
      title: "Direction artistique",
      type: "object",
      fields: [
        defineField({
          name: "primaryColor",
          title: "Couleur principale",
          type: "string",
          initialValue: "#6F1D2B",
        }),
        defineField({
          name: "secondaryColor",
          title: "Couleur secondaire",
          type: "string",
          initialValue: "#343A26",
        }),
        defineField({
          name: "backgroundColor",
          title: "Fond principal",
          type: "string",
          initialValue: "#F7F1E8",
        }),
        defineField({
          name: "surfaceColor",
          title: "Fond des cartes",
          type: "string",
          initialValue: "#FBF8F2",
        }),
        defineField({
          name: "textColor",
          title: "Texte principal",
          type: "string",
          initialValue: "#1B1713",
        }),
        defineField({
          name: "accentColor",
          title: "Accent luxe",
          type: "string",
          initialValue: "#B8925A",
        }),
        defineField({
          name: "headingFont",
          title: "Police des titres",
          type: "string",
          options: {
            list: [
              { title: "Éditorial classique", value: "serif" },
              { title: "Moderne premium", value: "sans" },
            ],
          },
          initialValue: "serif",
        }),
        defineField({
          name: "bodyFont",
          title: "Police du texte",
          type: "string",
          options: {
            list: [
              { title: "Sobre moderne", value: "sans" },
              { title: "Éditorial", value: "serif" },
            ],
          },
          initialValue: "sans",
        }),
      ],
    }),

    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          title: "Grand texte",
          type: "text",
          rows: 3,
          initialValue: "Découvrir le vin comme une culture vivante.",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          initialValue:
            "Le Premier Verre réunit guides, producteurs, régions, vins et intelligence artificielle dans une expérience éditoriale contemporaine.",
        }),
        defineField({
          name: "links",
          title: "Liens",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Libellé", type: "string" }),
                defineField({ name: "href", title: "Lien", type: "string" }),
              ],
            },
          ],
          initialValue: [
            { label: "Guides", href: "/guides" },
            { label: "Vins", href: "/vins" },
            { label: "Producteurs", href: "/producteurs" },
            { label: "Sommelier IA", href: "/sommelier" },
          ],
        }),
        defineField({
          name: "copyright",
          title: "Copyright",
          type: "string",
          initialValue: "© Le Premier Verre",
        }),
      ],
    }),

    defineField({
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Liens de navigation",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Libellé", type: "string" }),
                defineField({ name: "href", title: "Lien", type: "string" }),
              ],
            },
          ],
          initialValue: [
            { label: "Guides", href: "/guides" },
            { label: "Vins", href: "/vins" },
            { label: "Producteurs", href: "/producteurs" },
            { label: "Régions", href: "/regions" },
            { label: "Sommelier", href: "/sommelier" },
          ],
        }),
        defineField({
          name: "ctaLabel",
          title: "Bouton principal",
          type: "string",
          initialValue: "Demander",
        }),
        defineField({
          name: "ctaHref",
          title: "Lien du bouton principal",
          type: "string",
          initialValue: "/sommelier",
        }),
      ],
    }),

    defineField({
      name: "home",
      title: "Accueil",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Petit titre",
          type: "string",
          initialValue: "Maison éditoriale du vin",
        }),
        defineField({
          name: "headline",
          title: "Grand titre",
          type: "text",
          rows: 3,
          initialValue: "Découvrir le vin avec beauté, confiance et intelligence.",
        }),
        defineField({
          name: "subheadline",
          title: "Sous-titre",
          type: "text",
          rows: 4,
          initialValue:
            "Le Premier Verre réunit fiches, guides, régions, producteurs et intelligence artificielle pour rendre le vin plus accessible, sans le simplifier.",
        }),
        defineField({
          name: "cards",
          title: "Cartes éditoriales",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "eyebrow", title: "Petit titre", type: "string" }),
                defineField({ name: "title", title: "Titre", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
                defineField({ name: "href", title: "Lien", type: "string" }),
                defineField({
                  name: "tone",
                  title: "Style visuel",
                  type: "string",
                  options: {
                    list: [
                      { title: "Crème", value: "cream" },
                      { title: "Olive", value: "olive" },
                      { title: "Vin", value: "wine" },
                      { title: "Photo", value: "photo" },
                    ],
                  },
                  initialValue: "cream",
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: "homeSections",
      title: "Sections éditoriales de l'accueil",
      type: "object",
      fields: [
        defineField({
          name: "featureEyebrow",
          title: "Section expérience — petit titre",
          type: "string",
          initialValue: "Expérience",
        }),
        defineField({
          name: "featureTitle",
          title: "Section expérience — titre",
          type: "string",
          initialValue: "Le vin comme culture vivante.",
        }),
        defineField({
          name: "featureDescription",
          title: "Section expérience — description",
          type: "text",
          rows: 4,
          initialValue:
            "Une table, une lumière, une région, un geste, une bouteille ouverte. Le Premier Verre raconte le vin comme une scène, pas comme une fiche.",
        }),
        defineField({
          name: "featureHref",
          title: "Section expérience — lien",
          type: "string",
          initialValue: "/regions",
        }),
        defineField({
          name: "quote",
          title: "Citation",
          type: "text",
          rows: 3,
          initialValue:
            "Choisir un vin devrait ressembler moins à une recherche et plus à une découverte.",
        }),
        defineField({
          name: "assistantEyebrow",
          title: "Bloc Sommelier — petit titre",
          type: "string",
          initialValue: "Sommelier IA",
        }),
        defineField({
          name: "assistantTitle",
          title: "Bloc Sommelier — titre",
          type: "text",
          rows: 3,
          initialValue: "Posez une question. Laissez le site répondre.",
        }),
        defineField({
          name: "assistantDescription",
          title: "Bloc Sommelier — description",
          type: "text",
          rows: 4,
          initialValue:
            "Le Sommelier IA s'appuie sur les contenus du Premier Verre : fiches, guides, régions, producteurs et vins.",
        }),
        defineField({
          name: "assistantButtonLabel",
          title: "Bloc Sommelier — bouton",
          type: "string",
          initialValue: "Ouvrir le Sommelier",
        }),
      ],
    }),

    defineField({
      name: "assistant",
      title: "Sommelier IA",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Titre",
          type: "string",
          initialValue: "Sommelier IA",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Posez une question. Le Sommelier consulte les contenus du site avant de répondre.",
        }),
        defineField({
          name: "suggestions",
          title: "Questions suggérées",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [
            "Quel vin rouge recommanderais-tu pour un souper italien?",
            "Aide-moi à découvrir un producteur intéressant.",
            "Quel contenu du site devrais-je lire pour mieux comprendre une région?",
          ],
        }),
      ],
    }),
  ],
});
