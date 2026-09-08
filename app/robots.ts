import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/admin-acces/",
        "/api/",
        "/studio/",
        "/connexion/",
        "/inscription/",
        "/favoris/",
        "/mon-carnet/",
        "/mes-vins/",
        "/mes-listes/",
        "/ma-cave/",
        "/recherche/",
      ],
    },
    sitemap: "https://www.lepremierverre.com/sitemap.xml",
    host: "https://www.lepremierverre.com",
  };
}
