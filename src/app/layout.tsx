import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { organizationLd, websiteLd } from "@/lib/seo";
import { INDEXING_ON } from "@/config/publication";

const manrope = Manrope({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} : décrivez votre chantier, un artisan sélectionné vous contacte`, template: `%s | ${SITE.name}` },
  description: "Décrivez votre chantier : un conseiller étudie votre demande et vous met en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
  applicationName: SITE.name,
  robots: INDEXING_ON ? undefined : { index: false, follow: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#1f3a5f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col pb-20 md:pb-0">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-ui focus:bg-white focus:px-4 focus:py-2 focus:font-semibold">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCta />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
