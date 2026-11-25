// Configuration unique du site : identité, décisions métier à fixer par Thomas, métiers et départements ouverts.
// Règle du brief : aucune valeur inconnue n'est inventée. Une valeur `null` masque la phrase qui en dépend.

export const SITE = {
  name: "Artisans France",
  url: "https://artisansfrance.fr",
  tagline: "Décrivez votre chantier, on met en relation avec un artisan sélectionné près de chez vous",
  locale: "fr_FR",
} as const;

/** Informations légales de l'éditeur. À compléter : les pages légales restent en noindex tant qu'il manque une valeur. */
export const COMPANY = {
  legalName: "CELEXIA SASU",
  siren: null as string | null,
  address: null as string | null,
  publicationDirector: null as string | null,
  contactEmail: null as string | null,
  phone: null as string | null,
  host: "Vercel Inc.",
  hostAddress: null as string | null,
} as const;

/** Décisions ouvertes (brief §14). `null` = pas encore décidé : le site n'affiche alors aucune promesse chiffrée. */
export const OPS = {
  /** Nombre d'artisans qui reçoivent chaque demande (jamais d'exclusivité promise). */
  artisansPerRequest: null as number | null,
  /** Délai de rappel promis, en heures. */
  callbackDelayHours: null as number | null,
  /** Seuil de chantier en euros (10 000 chez Celexia, à confirmer pour la plateforme). */
  minProjectBudget: 10000,
  /** Délai d'attente avant de prévenir le client qu'aucun artisan n'est disponible, en heures. */
  noArtisanDelayHours: null as number | null,
  /** Durée de conservation des demandes, en mois. À fixer (RGPD) : la politique de confidentialité le signale tant qu'elle manque. */
  dataRetentionMonths: null as number | null,
} as const;

/** Artisans partenaires auxquels une demande peut être transmise (liste publique exigée par la CNIL). Vide tant qu'aucun contrat d'apport d'affaires n'est signé. */
export const PARTNERS: readonly { name: string; trades: string[]; departments: string[] }[] = [];

/** Métiers ouverts au lancement : seuls ces métiers ont des pages indexables. Phase 1 du plan = toiture. */
export const OPEN_TRADES: readonly string[] = ["couvreur"];

/** Départements où le réseau a des artisans actifs (codes). Vide tant que Thomas ne les a pas fournis. */
export const COVERED_DEPARTMENTS: readonly string[] = [];

/**
 * Ce que la sélection des artisans vérifie réellement. Une vérification n'est affichée comme telle
 * que si `confirmed` est true (brief §0 : jamais de « certification » ou de « vérifié » non documenté).
 */
export const SELECTION_CHECKS = [
  { id: "kbis", label: "Immatriculation de l'entreprise (extrait Kbis)", confirmed: false },
  { id: "decennale", label: "Attestation d'assurance décennale en cours de validité", confirmed: false },
  { id: "references", label: "Références de chantiers contrôlées", confirmed: false },
  { id: "visites", label: "Chantiers visités par Celexia", confirmed: false },
] as const;

export const confirmedChecks = () => SELECTION_CHECKS.filter((c) => c.confirmed);
export const hasConfirmedChecks = () => confirmedChecks().length > 0;

/**
 * Critères de mise en relation publiés sur la page L111-7 (« Critères de classement et de sélection »).
 * Rien n'est affiché comme vrai tant que Thomas n'a pas confirmé `confirmed: true` : la page reste alors en noindex.
 */
export const MATCHING_CRITERIA = [
  { id: "metier", label: "Le métier demandé", confirmed: false },
  { id: "zone", label: "La zone d'intervention de l'artisan", confirmed: false },
  { id: "disponibilite", label: "La disponibilité de l'artisan pour votre projet", confirmed: false },
] as const;

export const confirmedCriteria = () => MATCHING_CRITERIA.filter((c) => c.confirmed);
/** La page de transparence est publiable seulement si les critères sont confirmés. */
export const selectionPublishable = () => confirmedCriteria().length > 0;

/** Champs légaux manquants (pour savoir si les pages légales peuvent être indexées). */
export function missingLegalFields(): string[] {
  const labels: Record<string, string> = {
    siren: "SIREN",
    address: "adresse du siège",
    publicationDirector: "directeur de la publication",
    contactEmail: "e-mail de contact",
    hostAddress: "adresse de l'hébergeur",
  };
  return Object.entries(labels)
    .filter(([key]) => !COMPANY[key as keyof typeof COMPANY])
    .map(([, label]) => label);
}

export const legalComplete = () => missingLegalFields().length === 0;

/** Date de dernière mise à jour du contenu éditorial (utilisée pour lastmod et les mentions de date). */
export const CONTENT_UPDATED = "2026-11-25";

export const callbackText = () =>
  OPS.callbackDelayHours ? `sous ${OPS.callbackDelayHours} h ouvrées` : "dès que votre demande a été étudiée";

export const isOpenTrade = (slug: string) => OPEN_TRADES.includes(slug);
