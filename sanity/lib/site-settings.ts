import { client } from "@/sanity/lib/client";

export type SiteSettings = {
  brand?: {
    siteName?: string;
    tagline?: string;
  };
  design?: {
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    surfaceColor?: string;
    textColor?: string;
    accentColor?: string;
    headingFont?: "serif" | "sans";
    bodyFont?: "serif" | "sans";
  };
  footer?: {
    headline?: string;
    description?: string;
    links?: {
      label?: string;
      href?: string;
    }[];
    copyright?: string;
  };
  navigation?: {
    items?: {
      label?: string;
      href?: string;
    }[];
    ctaLabel?: string;
    ctaHref?: string;
  };
  home?: {
    eyebrow?: string;
    headline?: string;
    subheadline?: string;
    cards?: {
      eyebrow?: string;
      title?: string;
      description?: string;
      href?: string;
      tone?: "cream" | "olive" | "wine" | "photo";
    }[];
  };
  homeSections?: {
    featureEyebrow?: string;
    featureTitle?: string;
    featureDescription?: string;
    featureHref?: string;
    quote?: string;
    assistantEyebrow?: string;
    assistantTitle?: string;
    assistantDescription?: string;
    assistantButtonLabel?: string;
  };
  assistant?: {
    title?: string;
    description?: string;
    suggestions?: string[];
  };
};

export const defaultSiteSettings: Required<SiteSettings> = {
  brand: {
    siteName: "Le Premier Verre",
    tagline: "Choisir mieux. Recevoir simplement. Boire avec plaisir.",
  },
  design: {
    primaryColor: "#74283A",
    secondaryColor: "#3F4A36",
    backgroundColor: "#F5EFE5",
    surfaceColor: "#FBF7EF",
    textColor: "#151210",
    accentColor: "#D7C4AA",
    headingFont: "serif",
    bodyFont: "sans",
  },
  footer: {
    headline: "Le vin devient plus simple quand il devient utile.",
    description:
      "Le Premier Verre réunit répertoire, accords, carte interactive, boutique, blogue et Sommelier IA dans une plateforme lifestyle pensée pour le quotidien.",
    links: [
      { label: "Répertoire", href: "/repertoire" },
      { label: "Accords", href: "/accords" },
      { label: "Carte", href: "/carte" },
      { label: "Blogue", href: "/blog" },
      { label: "Boutique", href: "/boutique" },
      { label: "Sommelier IA", href: "/sommelier" },
    ],
    copyright: "© Le Premier Verre",
  },
  navigation: {
    items: [
      { label: "Répertoire", href: "/repertoire" },
      { label: "Accords", href: "/accords" },
      { label: "Carte", href: "/carte" },
      { label: "Blogue", href: "/blog" },
      { label: "Boutique", href: "/boutique" },
    ],
    ctaLabel: "Sommelier IA",
    ctaHref: "/sommelier",
  },
  home: {
    eyebrow: "Plateforme lifestyle du vin",
    headline: "Qu’est-ce qu’on boit aujourd’hui?",
    subheadline:
      "Une plateforme belle, pratique et intelligente pour choisir une bouteille, trouver un accord, planifier une route des vins et découvrir quoi boire selon le moment.",
    cards: [],
  },
  homeSections: {
    featureEyebrow: "Carte interactive",
    featureTitle: "Planifier une journée dans les vignobles.",
    featureDescription:
      "Découvrir les vignobles autour de soi, organiser des arrêts et générer un itinéraire simple pour une escapade vin.",
    featureHref: "/carte",
    quote:
      "Le bon vin n’est pas seulement une bouteille. C’est le bon choix, au bon moment.",
    assistantEyebrow: "Sommelier IA",
    assistantTitle: "Dis-moi ce que tu manges, je te dis quoi boire.",
    assistantDescription:
      "Une aide simple et rapide pour choisir une bouteille selon ton repas, ton budget, ton envie ou l’occasion.",
    assistantButtonLabel: "Demander au Sommelier",
  },
  assistant: {
    title: "Que voulez-vous boire?",
    description: "Une conversation guidée par les contenus du Premier Verre.",
    suggestions: [
      "Quel vin servir avec des pâtes ce soir?",
      "Trouve-moi une bouteille accessible pour recevoir.",
      "Quel vignoble visiter ce week-end?",
    ],
  },
};

export async function getSiteSettings(): Promise<Required<SiteSettings>> {
  const settings = await client.fetch<SiteSettings | null>(
    `*[_type == "siteSettings"][0]{
      brand,
      design,
      footer,
      navigation,
      home,
      homeSections,
      assistant
    }`,
    {},
    { next: { revalidate: 60 } }
  );

  return {
    brand: {
      ...defaultSiteSettings.brand,
      ...settings?.brand,
    },
    design: {
      ...defaultSiteSettings.design,
      ...settings?.design,
    },
    footer: {
      ...defaultSiteSettings.footer,
      ...settings?.footer,
    },
    navigation: {
      ...defaultSiteSettings.navigation,
      ...settings?.navigation,
    },
    home: {
      ...defaultSiteSettings.home,
      ...settings?.home,
    },
    homeSections: {
      ...defaultSiteSettings.homeSections,
      ...settings?.homeSections,
    },
    assistant: {
      ...defaultSiteSettings.assistant,
      ...settings?.assistant,
    },
  };
}

export function getThemeStyle(settings: Required<SiteSettings>) {
  return {
    "--lpv-bg": settings.design.backgroundColor,
    "--lpv-surface": settings.design.surfaceColor,
    "--lpv-ink": settings.design.textColor,
    "--lpv-olive": settings.design.secondaryColor,
    "--lpv-wine": settings.design.primaryColor,
    "--lpv-clay": settings.design.accentColor,
    "--lpv-sand": settings.design.accentColor,
  } as React.CSSProperties;
}
