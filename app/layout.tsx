import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lexvinum.com"),

  title: {
    default: "Maison Lex Vinum",
    template: "%s | Maison Lex Vinum",
  },

  description:
    "Une maison éditoriale dédiée au vin, aux vignobles, aux bars à vin et aux découvertes soigneusement choisies.",

  openGraph: {
    title: "Maison Lex Vinum",
    description:
      "Vin, culture, lieux et découvertes soigneusement choisies.",
    url: "https://www.lexvinum.com",
    siteName: "Maison Lex Vinum",
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
    <html lang="fr" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${bodyFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}