// Publication : quelles pages existent, lesquelles sont indexables.
// Trois verrous (plan §3.3) : vague publiée, porte qualité, indexation activée globalement.

/**
 * Vagues du plan de pages publiées (colonne `wave` de src/data/pages.json : « phase.lot »).
 * Une page hors vague n'est pas générée (404). Chaque vague fait au plus 100 pages. « * » publie toutes les vagues :
 * décision explicite de Thomas (25/11/2026). Les garde-fous restent : la porte qualité (scripts/qa.mjs --gate)
 * passe en noindex toute page locale sous 30 % de contenu propre, et les pages sans donnée locale suffisante.
 */
export const PUBLISHED_WAVES: readonly string[] = ["*"];

/** Aperçu de toutes les pages en local ou sur un déploiement de préproduction : PREVIEW_ALL=1. */
export const PREVIEW_ALL = process.env.PREVIEW_ALL === "1";

/**
 * Indexation globale. Active par défaut ; INDEXING=off (préproduction, aperçu) met tout le site en noindex et
 * ferme robots.txt. La porte qualité de chaque page (robotsFor) reste appliquée dans tous les cas.
 */
export const INDEXING_ON = process.env.INDEXING !== "off";

/** Seuils de la porte qualité (skill seo-programmatic). */
export const QUALITY = {
  minWords: 300,
  minUniqueShare: 0.4,
  /** Volume minimal de recherches (par mois) pour qu'une page locale sans artisan couvert soit indexable. */
  minLocalVolume: 1,
} as const;

/** Mots-clés secondaires affichés sur une page (le reste sert au suivi, pas au bourrage). */
export const MAX_KEYWORDS_ON_PAGE = 10;
