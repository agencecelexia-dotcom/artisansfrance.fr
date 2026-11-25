// Accès typé aux pages du plan nettoyé (src/data/pages.json), à la géographie officielle et aux données locales.
// Tout ce qui est « publié » ou « indexable » est décidé ici et nulle part ailleurs.

import pagesData from "@/data/pages.json";
import geoData from "@/data/geo.json";
import localData from "@/data/local.json";
import qualityData from "@/data/quality.json";
import { COVERED_DEPARTMENTS, legalComplete } from "@/config/site";
import { INDEXING_ON, PREVIEW_ALL, PUBLISHED_WAVES } from "@/config/publication";
import { hasEditorial } from "@/content/editorial";
import { TRADES } from "@/content/trades";

export type PageType = "hub" | "dept" | "ville" | "region" | "prix" | "devis" | "probleme" | "aides" | "blog";

export interface PlanPage {
  id: string;
  type: PageType;
  url: string;
  trade: string | null;
  metier: string;
  tier: string;
  h1: string;
  keyword: string | null;
  secondary: string[];
  extraKeywords?: string[];
  volume: number;
  nbRequetes: number;
  oceans: number;
  phase: number;
  wave: string;
  deptCode?: string | null;
  deptName?: string | null;
  deptSlug?: string;
  ville?: string;
  villeSlug?: string;
  regionName?: string;
  regionSlug?: string;
  /** Recherches Google des 12 derniers mois pour le mot-clé principal (DataForSEO), de la plus ancienne à la plus récente. */
  monthly?: number[];
  monthlyEnd?: string;
}

export interface Commune {
  code: string;
  nom: string;
  population: number | null;
  codesPostaux: string[];
  deptCode: string;
  centre: [number, number] | null;
  surfaceKm2: number | null;
  /** Rang de la commune par population dans son département, et part de ses habitants (en %). */
  rang: number;
  partDept: number | null;
  voisines: { code: string; nom: string; population: number; km: number }[];
}

export interface DeptGeo {
  code: string;
  nom: string;
  region: string;
  codeRegion: string;
  nbCommunes: number;
  population: number;
  surfaceKm2: number;
  tranches: { moins500: number; de500a2000: number; de2000a10000: number; plus10000: number };
  communes: { code: string; nom: string; population: number; codesPostaux: string[] }[];
  voisins: string[];
}

export interface LocalStats {
  ventesMaisons: number | null;
  ventesAppartements: number | null;
  prixMaisonM2: number | null;
  surfaceBatieMediane?: number | null;
  /** Même mesure l'année précédente, pour dire l'évolution sans extrapoler. */
  precedent?: { ventesMaisons: number; prixMaisonM2: number | null };
  /** Communes du département où l'on vend le plus de maisons (départements seulement). */
  communesActives?: { code: string; nom: string; ventes: number; prixMaisonM2: number | null }[];
  risques?: string[];
}

const pages = pagesData.pages as unknown as PlanPage[];
const byUrl = new Map(pages.map((p) => [p.url, p]));

export const geo = geoData as unknown as {
  fetchedAt: string;
  departements: Record<string, DeptGeo>;
  communes: Record<string, Commune>;
  villes: Record<string, string>;
};
export const local = localData as unknown as {
  dvfYear: number;
  fetchedAt: string;
  departements: Record<string, LocalStats>;
  communes: Record<string, LocalStats>;
};

// ------------------------------------------------------------------ publication

/** Une page existe seulement si sa vague est publiée et, pour les contenus éditoriaux, si le texte est rédigé. */
export function isPublished(p: PlanPage): boolean {
  if (!PREVIEW_ALL && !PUBLISHED_WAVES.includes("*") && !PUBLISHED_WAVES.includes(p.wave)) return false;
  if (p.trade && !TRADES[p.trade]) return false;
  if (["prix", "probleme", "aides", "blog"].includes(p.type)) return hasEditorial(p.url);
  return true;
}

export const allPages = () => pages;
export const publishedPages = () => pages.filter(isPublished);
export const getPage = (url: string) => byUrl.get(url);
export const getPublished = (url: string) => {
  const p = byUrl.get(url);
  return p && isPublished(p) ? p : undefined;
};

export const pagesOfType = (type: PageType) => publishedPages().filter((p) => p.type === type);
export const publishedTrades = () => pagesOfType("hub");

export const deptPages = (trade: string) => pagesOfType("dept").filter((p) => p.trade === trade);
export const cityPages = (trade: string, deptSlug?: string) =>
  pagesOfType("ville").filter((p) => p.trade === trade && (!deptSlug || p.deptSlug === deptSlug));
export const regionPages = (trade: string) => pagesOfType("region").filter((p) => p.trade === trade);

/** Pages de contenu (prix, problèmes, aides, devis) d'un métier, les plus recherchées d'abord. */
export const guidesOf = (trade: string, types: PageType[]) =>
  publishedPages()
    .filter((p) => p.trade === trade && types.includes(p.type))
    .sort((a, b) => b.volume - a.volume);

// ------------------------------------------------------------------ géographie et données locales

export const deptGeo = (code?: string | null) => (code ? geo.departements[code] : undefined);
export const communeOfPage = (p: PlanPage) => {
  const code = geo.villes[p.url];
  return code ? geo.communes[code] : undefined;
};
export const deptLocal = (code?: string | null) => (code ? local.departements[code] : undefined);
export const communeLocal = (code?: string) => (code ? local.communes[code] : undefined);

/** Les départements voisins qui ont une page publiée pour ce métier. */
export function neighbourDepts(trade: string, code: string) {
  const g = deptGeo(code);
  if (!g) return [];
  const published = new Map(deptPages(trade).map((p) => [p.deptCode, p]));
  return g.voisins.map((c) => published.get(c)).filter((p): p is PlanPage => !!p);
}

/** Les villes voisines (même département) qui ont une page publiée pour ce métier. */
export function neighbourCities(p: PlanPage) {
  const commune = communeOfPage(p);
  if (!commune || !p.trade) return [];
  const published = new Map(cityPages(p.trade, p.deptSlug).map((c) => [geo.villes[c.url], c]));
  return commune.voisines.map((v) => published.get(v.code)).filter((c): c is PlanPage => !!c);
}

const km = (a: [number, number], b: [number, number]) => {
  const rad = Math.PI / 180;
  const h = Math.sin(((b[1] - a[1]) * rad) / 2) ** 2 + Math.cos(a[1] * rad) * Math.cos(b[1] * rad) * Math.sin(((b[0] - a[0]) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};

/** Les pages ville publiées les plus proches de cette ville (même au-delà du département), avec leur distance. */
export function nearestPublishedCities(p: PlanPage, count = 8) {
  const here = communeOfPage(p);
  if (!here?.centre || !p.trade) return [];
  return cityPages(p.trade)
    .filter((c) => c.url !== p.url)
    .map((c) => ({ page: c, commune: communeOfPage(c) }))
    .filter((x): x is { page: PlanPage; commune: Commune } => !!x.commune?.centre)
    .map((x) => ({ page: x.page, km: Math.round(km(here.centre!, x.commune.centre!)) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

// ------------------------------------------------------------------ indexation

export interface RobotsDecision {
  index: boolean;
  reason?: string;
}

/** Nombre de blocs de données locales réelles disponibles pour une page locale. */
export function localBlocks(p: PlanPage): number {
  let n = 0;
  if (p.type === "dept") {
    const g = deptGeo(p.deptCode);
    if (g) n += 1;
    const l = deptLocal(p.deptCode);
    if (l && l.ventesMaisons !== null) n += 1;
    if (g && g.voisins.length) n += 1;
  } else if (p.type === "ville") {
    const c = communeOfPage(p);
    if (c) n += 1;
    const l = communeLocal(c?.code);
    if (l && l.ventesMaisons !== null) n += 1;
    if (l?.risques?.length) n += 1;
    if (c && c.voisines.length >= 3) n += 1;
  }
  return n;
}

const lowQuality = new Set<string>((qualityData as { noindex: string[] }).noindex);

export function robotsFor(p: PlanPage): RobotsDecision {
  if (lowQuality.has(p.url)) return { index: false, reason: "contenu propre insuffisant (audit scripts/qa.mjs --gate)" };
  if (!INDEXING_ON) return { index: false, reason: "indexation désactivée (INDEXING=on non défini)" };
  if (p.type === "dept" || p.type === "ville" || p.type === "region") {
    const covered = !!p.deptCode && COVERED_DEPARTMENTS.includes(p.deptCode);
    if (p.volume <= 0 && !covered) return { index: false, reason: "aucune recherche et département non couvert" };
    if (p.type !== "region" && localBlocks(p) < 3) return { index: false, reason: "moins de 3 blocs de données locales réelles" };
  }
  return { index: true };
}

export const legalIndexable = () => INDEXING_ON && legalComplete();
export const slugifyTradeLabel = (s: string) => s.toLowerCase();

export function allTrades() {
  return pagesData.trades as { slug: string; metier: string; tier: string; hubUrl: string }[];
}
