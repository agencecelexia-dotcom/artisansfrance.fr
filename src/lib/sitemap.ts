// Sitemaps par section : une section = un fichier, pour suivre l'indexation section par section dans Search Console.
// Seules les pages réellement indexables y figurent (même règle que le robots de chaque page).

import { CONTENT_UPDATED, PARTNERS, legalComplete, OPS, selectionPublishable } from "@/config/site";
import { INDEXING_ON } from "@/config/publication";
import { absoluteUrl } from "@/lib/seo";
import { local, geo, publishedPages, robotsFor, type PageType } from "@/lib/pages";

export interface Entry {
  path: string;
  lastModified: string;
}

export const SECTIONS = ["pages", "departements", "villes", "regions", "guides", "devis", "blog"] as const;
export type Section = (typeof SECTIONS)[number];

const TYPES: Record<Section, PageType[]> = {
  pages: ["hub"],
  departements: ["dept"],
  villes: ["ville"],
  regions: ["region"],
  guides: ["prix", "probleme", "aides"],
  devis: ["devis"],
  blog: ["blog"],
};

/** Date la plus récente entre le contenu éditorial et les jeux de données locales. */
const dataDate = [CONTENT_UPDATED, local.fetchedAt, geo.fetchedAt].sort().at(-1)!;

function fixedPages(): Entry[] {
  const out = ["/", "/comment-ca-marche/", "/nos-artisans/", "/quel-site-pour-trouver-un-artisan/", "/artisans/", "/partenaires/", "/zones/", "/plan-du-site/"];
  if (selectionPublishable()) out.push("/classement-et-selection/");
  if (legalComplete()) out.push("/mentions-legales/", "/cgu/");
  if (legalComplete() && OPS.dataRetentionMonths !== null) out.push("/politique-de-confidentialite/");
  void PARTNERS;
  return out.map((path) => ({ path, lastModified: CONTENT_UPDATED }));
}

export function entriesFor(section: Section): Entry[] {
  if (!INDEXING_ON) return [];
  const types = TYPES[section];
  const rows = publishedPages()
    .filter((p) => types.includes(p.type) && robotsFor(p).index)
    .map((p) => ({ path: p.url, lastModified: ["dept", "ville", "region"].includes(p.type) ? dataDate : CONTENT_UPDATED }));
  if (section === "pages") {
    const trades = publishedPages().filter((p) => p.type === "hub").map((p) => `/artisans/${p.trade}/`);
    return [...fixedPages(), ...rows, ...trades.map((path) => ({ path, lastModified: CONTENT_UPDATED }))];
  }
  return rows;
}

export const urlsetXml = (entries: Entry[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map((e) => `  <url><loc>${absoluteUrl(e.path)}</loc><lastmod>${e.lastModified}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`;

export const indexXml = () =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${SECTIONS.filter((s) => entriesFor(s).length > 0)
    .map((s) => `  <sitemap><loc>${absoluteUrl(`/sitemaps/${s}.xml`)}</loc><lastmod>${CONTENT_UPDATED}</lastmod></sitemap>`)
    .join("\n")}\n</sitemapindex>\n`;
