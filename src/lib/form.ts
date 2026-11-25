// Formulaire de demande de chantier : options, validation et score de qualification.
// Ce fichier est partagé entre le composant client et la route serveur : aucune dépendance Node ou React.

import { OPS } from "@/config/site";

export interface Option {
  value: string;
  label: string;
}

export const AMPLEUR: Option[] = [
  { value: "petit", label: "Petit chantier, une intervention ciblée" },
  { value: "moyen", label: "Chantier de taille moyenne" },
  { value: "grand", label: "Gros chantier, plusieurs corps de métier" },
  { value: "nsp", label: "Je ne sais pas encore" },
];

export const DELAIS: Option[] = [
  { value: "urgent", label: "Urgent, dès que possible" },
  { value: "1mois", label: "Dans le mois" },
  { value: "3mois", label: "Dans les trois mois" },
  { value: "6mois", label: "Dans les six mois" },
  { value: "plus", label: "Plus tard ou pas de date" },
];

export const BUDGETS: Option[] = [
  { value: "moins5k", label: "Moins de 5 000 €" },
  { value: "5-10k", label: "5 000 à 10 000 €" },
  { value: "10-20k", label: "10 000 à 20 000 €" },
  { value: "20-40k", label: "20 000 à 40 000 €" },
  { value: "plus40k", label: "Plus de 40 000 €" },
  { value: "nsp", label: "Je ne sais pas encore" },
];

export const STATUTS: Option[] = [
  { value: "proprietaire", label: "Propriétaire occupant" },
  { value: "bailleur", label: "Propriétaire bailleur" },
  { value: "locataire", label: "Locataire" },
  { value: "autre", label: "Autre (syndic, professionnel, etc.)" },
];

export interface LeadSource {
  /** Page d'où part la demande. */
  url: string;
  keyword?: string;
  deptCode?: string;
  ville?: string;
}

export interface LeadInput {
  trade: string;
  travaux: string;
  ampleur: string;
  codePostal: string;
  delai: string;
  budget: string;
  statut: string;
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  /** Case non cochée par défaut : transmission aux artisans partenaires. */
  partenaires: boolean;
  source: LeadSource;
  /** Champ piège : doit rester vide. */
  website?: string;
}

export const values = (opts: Option[]) => opts.map((o) => o.value);

const re = {
  cp: /^(\d{5})$/,
  tel: /^(?:\+33|0033|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
};

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

/** Validation unique, utilisée par le formulaire (pour guider) et par la route serveur (pour décider). */
export function validate(input: Partial<LeadInput>, step?: number): FieldErrors {
  const e: FieldErrors = {};
  const check = (n: number) => step === undefined || step === n;

  if (check(1)) {
    if (!input.trade) e.trade = "Choisissez un métier.";
    if (!input.travaux) e.travaux = "Choisissez le type de travaux.";
  }
  if (check(2) && !values(AMPLEUR).includes(input.ampleur ?? "")) e.ampleur = "Indiquez l'ampleur du chantier.";
  if (check(3) && !re.cp.test((input.codePostal ?? "").trim())) e.codePostal = "Saisissez un code postal à 5 chiffres.";
  if (check(4) && !values(DELAIS).includes(input.delai ?? "")) e.delai = "Indiquez le délai souhaité.";
  if (check(5) && !values(BUDGETS).includes(input.budget ?? "")) e.budget = "Indiquez un budget, même approximatif.";
  if (check(6) && !values(STATUTS).includes(input.statut ?? "")) e.statut = "Indiquez votre statut.";
  if (check(7)) {
    if (!(input.prenom ?? "").trim()) e.prenom = "Indiquez votre prénom.";
    if (!(input.nom ?? "").trim()) e.nom = "Indiquez votre nom.";
    if (!re.tel.test((input.telephone ?? "").trim())) e.telephone = "Saisissez un numéro de téléphone français valide.";
    if (!re.email.test((input.email ?? "").trim())) e.email = "Saisissez une adresse e-mail valide.";
    if (!input.partenaires) e.partenaires = "Pour que nous puissions transmettre votre demande, cochez cette case.";
  }
  return e;
}

export interface Qualification {
  budgetConfirme: boolean;
  projetProche: boolean;
  auDessusDuSeuil: boolean;
  proprietaire: boolean;
  /** De 0 à 4 : nombre de critères Celexia remplis. */
  score: number;
}

/** Les quatre critères du brief : budget confirmé, projet à moins de trois mois, chantier au-dessus du seuil, propriétaire. */
export function qualify(input: Pick<LeadInput, "budget" | "delai" | "statut">): Qualification {
  const budgetConfirme = input.budget !== "nsp";
  const projetProche = ["urgent", "1mois", "3mois"].includes(input.delai);
  const lower: Record<string, number> = { moins5k: 0, "5-10k": 5000, "10-20k": 10000, "20-40k": 20000, plus40k: 40000 };
  const auDessusDuSeuil = (lower[input.budget] ?? -1) >= OPS.minProjectBudget;
  const proprietaire = input.statut === "proprietaire" || input.statut === "bailleur";
  const score = [budgetConfirme, projetProche, auDessusDuSeuil, proprietaire].filter(Boolean).length;
  return { budgetConfirme, projetProche, auDessusDuSeuil, proprietaire, score };
}

export interface DemandeResponse {
  ok: boolean;
  /** « couverte » : métier et département suivis par le réseau. « attente » : étudiée, mise en attente si personne n'est disponible. */
  mode?: "couverte" | "attente";
  message?: string;
  errors?: FieldErrors;
}
