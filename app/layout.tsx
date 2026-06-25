import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lepremierverre.com"),

  title: {
    default: "Le Premier Verre",
    template: "%s | Le Premier Verre",
  },

  description:
    "Une plateforme éditoriale et technologique consacrée au vin, avec une approche accessible, élégante et orientée Québec.",

  verification: {
    google: "-ZkGDMvO096Fv0c2_Vb71lbrue-NOCRrWBpkSP6qdzo",
  },

  openGraph: {
    title: "Le Premier Verre",
    description:
      "Articles, guides, vignobles, bonnes adresses et outils intelligents pour mieux choisir, comprendre et apprécier le vin.",
    url: "https://www.lepremierverre.com",
    siteName: "Le Premier Verre",
    locale: "fr_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" data-scroll-behavior="smooth">
        <body className={`${display.variable} ${bodyFont.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}