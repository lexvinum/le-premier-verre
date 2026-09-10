import "./globals.css";
import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { clerkAppearance } from "@/lib/clerk-theme";

import { SearchProvider } from "@/providers/SearchProvider";
import { SearchDialog } from "@/components/search/SearchDialog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const editorial = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-editorial",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lepremierverre.com"),

  title: {
    default: "Le Premier Verre",
    template: "%s | Le Premier Verre",
  },

  description:
    "Une plateforme québécoise pour découvrir des vins, des producteurs, des bonnes adresses et des guides avec simplicité.",

  verification: {
    google: "Sa-BZlUqEkzGY_W2pKwmF_q0Bf_sj8OfGxoJ0_2DN08",
  },

  openGraph: {
    title: "Le Premier Verre",
    description:
      "Vins, producteurs, bonnes adresses, guides et articles pour découvrir le vin autrement.",
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
    <ClerkProvider localization={frFR} appearance={clerkAppearance}>
      <html lang="fr" data-scroll-behavior="smooth">
        <body className={`${editorial.variable} ${sans.variable}`}>
          <SearchProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <SearchDialog />
          </SearchProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
