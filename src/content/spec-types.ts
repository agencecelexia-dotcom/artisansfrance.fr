import type { SourceLink } from "./types";

/** Guide de prix compact : le texte est assemblé par `editorial-build.ts`. Pas de prix : seulement des facteurs et des points de vigilance. */
export interface PrixSpec {
  /** Fin de l'URL, sans /prix/ ni slash. */
  u: string;
  /** Titre de la page (H1). */
  t: string;
  /** Ce que c'est, en une ou deux phrases (la première sert de meta description). */
  q: string;
  /** Facteurs de prix, séparés par « | », en groupes nominaux commençant par une minuscule. */
  f: string;
  /** Points de vigilance, séparés par « | », en phrases. */
  v: string;
  /** Une question propre à la page et sa réponse. */
  faq?: [string, string];
  /** Texte spécifique supplémentaire (obligations légales, usage) ajouté avant les points de vigilance. */
  extra?: { h2: string; p: string };
  sources?: SourceLink[];
}

/** Guide d'information (problème, aide, blog) : sections libres, mais écrites à la main. */
export interface GuideSpec {
  /** Chemin complet : /guides/..., /aides/..., /blog/... */
  url: string;
  t: string;
  d: string;
  /** Réponse directe de 40 à 60 mots. */
  r: string;
  /** Sections : [titre, paragraphe ou liste séparée par « | »]. Un « • » en début de texte signale une liste. */
  s: [string, string][];
  faq?: [string, string][];
  sources?: SourceLink[];
}
