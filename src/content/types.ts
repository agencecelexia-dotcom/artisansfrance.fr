export interface Faq {
  q: string;
  a: string;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface TradeContent {
  slug: string;
  /** Libellé court pour les titres : « Couvreur ». */
  nom: string;
  /** Forme à l'article indéfini : « un couvreur ». */
  un: string;
  /** Ce que la page hub promet, en une phrase (meta description). */
  accroche: string;
  intro: string[];
  /** Travaux courants. */
  travaux: { titre: string; texte: string }[];
  /** Matériaux, techniques ou solutions : ce qu'il faut savoir pour discuter avec l'artisan. */
  solutions: { titre: string; texte: string }[];
  etapes: { titre: string; texte: string }[];
  questions: string[];
  /** Règles générales (urbanisme, garanties) formulées sans chiffre propre à un territoire. */
  reglementation: string[];
  faq: Faq[];
  sources: SourceLink[];
  /** Types de travaux proposés dans le formulaire. */
  typesTravaux: string[];
  /** Paragraphe de la section « … autour de moi » (requêtes de proximité). */
  autour: string;
}

export interface EditorialSection {
  h2: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
}

/** Guide éditorial (prix, problème, aides, blog). Les prix chiffrés n'y figurent que s'ils sont sourcés. */
export interface Editorial {
  url: string;
  titre: string;
  description: string;
  /** Réponse directe en tête de page (40 à 60 mots) : citée telle quelle par les moteurs et les IA. */
  reponse: string;
  sections: EditorialSection[];
  faq: Faq[];
  sources: SourceLink[];
  /** Date de dernière vérification du contenu. */
  maj: string;
  /** Autres guides à proposer (URL). */
  liens?: string[];
}
