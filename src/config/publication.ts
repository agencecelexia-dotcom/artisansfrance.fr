// Publication : quelles pages existent, lesquelles sont indexables.
// Trois verrous (plan §3.3) : vague publiée, porte qualité, indexation activée globalement.

/**
 * Vagues du plan de pages publiées (colonne `wave` de src/data/pages.json : « phase.lot »).
 * Une page hors vague n'est pas générée (404). Chaque vague fait au plus 100 pages.
 *
 * Phase 1 = 533 pages : au-delà de 500 pages, le skill seo-programmatic exige un accord explicite et un audit
 * de contenu. On publie donc le premier lot seulement ; Thomas ajoute les lots suivants après relecture.
 */
export const PUBLISHED_WAVES: readonly string[] = ["1.1"];

/** Aperçu de toutes les pages en local ou sur un déploiement de préproduction : PREVIEW_ALL=1. */
export const PREVIEW_ALL = process.env.PREVIEW_ALL === "1";

/**
 * Indexation globale. Désactivée par défaut : toutes les pages sont en noindex et robots.txt interdit le site,
 * tant que INDEXING=on n'est pas défini sur l'environnement de production (après relecture des textes).
 */
export const INDEXING_ON = process.env.INDEXING === "on";

/** Seuils de la porte qualité (skill seo-programmatic). */
export const QUALITY = {
  minWords: 300,
  minUniqueShare: 0.4,
  /** Volume minimal de recherches (par mois) pour qu'une page locale sans artisan couvert soit indexable. */
  minLocalVolume: 1,
} as const;

/** Mots-clés secondaires affichés sur une page (le reste sert au suivi, pas au bourrage). */
export const MAX_KEYWORDS_ON_PAGE = 10;
