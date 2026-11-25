import type { Metadata } from "next";
import { SITE, COMPANY } from "@/config/site";

export const absoluteUrl = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

const SUFFIX = ` | ${SITE.name}`;

/** Coupe un titre à la limite d'un mot pour tenir dans 60 caractères avec le suffixe du site. */
export function fitTitle(core: string, max = 60 - SUFFIX.length): string {
  if (core.length <= max) return core;
  const cut = core.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;\-–]+$/, "")}…`;
}

/** Description de 150 à 160 caractères au plus, coupée proprement. */
export function fitDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;\-–]+$/, "")}…`;
}

interface MetaInput {
  title: string;
  description: string;
  path: string;
  index: boolean;
  absoluteTitle?: boolean;
  image?: string;
}

export function buildMetadata({ title, description, path, index, absoluteTitle, image }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  // Le suffixe de marque n'est ajouté que si le titre complet tient dans 60 caractères.
  const withBrand = !absoluteTitle && title.length + SUFFIX.length <= 60;
  const shown = withBrand ? title : fitTitle(title, 60);
  const ogTitle = withBrand ? `${title}${SUFFIX}` : shown;
  return {
    title: withBrand ? title : { absolute: shown },
    description: fitDescription(description),
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url,
      title: ogTitle,
      description: fitDescription(description),
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

// ------------------------------------------------------------------ JSON-LD (jamais d'avis, de note ni d'adresse inventée)

export type JsonLdObject = Record<string, unknown>;

export const organizationLd = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organisation`,
  name: SITE.name,
  legalName: COMPANY.legalName,
  url: SITE.url,
  logo: absoluteUrl("/icon.svg"),
  ...(COMPANY.siren ? { taxID: COMPANY.siren } : {}),
  ...(COMPANY.contactEmail ? { email: COMPANY.contactEmail } : {}),
});

export const websiteLd = (): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#site`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE.url}/#organisation` },
});

export const breadcrumbLd = (items: { name: string; path: string }[]): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
});

export const faqLd = (faq: { q: string; a: string }[]): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceLd = (opts: { name: string; description: string; path: string; areaServed?: { type: "Country" | "AdministrativeArea" | "City"; name: string }[] }): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  url: absoluteUrl(opts.path),
  provider: { "@id": `${SITE.url}/#organisation` },
  serviceType: "Mise en relation avec un artisan du bâtiment (apport d'affaires)",
  areaServed: (opts.areaServed ?? [{ type: "Country", name: "France" }]).map((a) => ({ "@type": a.type, name: a.name })),
});

export const articleLd = (opts: { headline: string; description: string; path: string; updated: string }): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: opts.headline,
  description: opts.description,
  url: absoluteUrl(opts.path),
  inLanguage: "fr-FR",
  dateModified: opts.updated,
  author: { "@id": `${SITE.url}/#organisation` },
  publisher: { "@id": `${SITE.url}/#organisation` },
  mainEntityOfPage: absoluteUrl(opts.path),
});

export const aboutPageLd = (opts: { name: string; description: string; path: string }): JsonLdObject => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: opts.name,
  description: opts.description,
  url: absoluteUrl(opts.path),
  isPartOf: { "@id": `${SITE.url}/#site` },
});

/** Sérialisation sûre pour une balise <script> : « < » est échappé (recommandation Next.js). */
export const serializeLd = (data: JsonLdObject | JsonLdObject[]) => JSON.stringify(data).replace(/</g, "\\u003c");
