import type { Editorial, EditorialSection, Faq, SourceLink } from "./types";
import type { GuideSpec, PrixSpec } from "./spec-types";
import { CONTENT_UPDATED } from "@/config/site";
import { PRIX_TOITURE } from "./specs/prix-toiture";
import { PRIX_MACON_FACADE } from "./specs/prix-macon-facade";
import { PRIX_INTERIEUR } from "./specs/prix-interieur";
import { PRIX_EXTERIEUR } from "./specs/prix-exterieur";
import { GUIDES_INFO } from "./specs/guides-info";
import { BLOG } from "./specs/blog";

// Assemble les guides compacts (src/content/specs/*) en pages éditoriales complètes.
// Règle du brief : aucune fourchette de prix sans source datée. Un guide de prix explique donc ce qui fait varier le coût.

const SP: SourceLink = { label: "service-public.fr", url: "https://www.service-public.fr/" };
const DGCCRF: SourceLink = { label: "DGCCRF", url: "https://www.economie.gouv.fr/dgccrf" };

const split = (s: string) => s.split("|").map((x) => x.trim()).filter(Boolean);
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const firstSentence = (s: string) => s.split(/(?<=\.)\s/)[0];

// Phrase unique « pas de prix » : six formulations alternées, pour ne pas répéter le même paragraphe sur toutes les pages.
const SANS_PRIX: string[] = [
  "Nous n'affichons pas de fourchette de prix : nous n'avons pas de source datée et vérifiable pour ce chantier, et un chiffre sans source ferait croire à un prix qui n'existe pas pour vous.",
  "Ce guide ne donne volontairement aucun montant : un prix fiable ne s'obtient qu'avec une visite, et nous ne publions de chiffres que s'ils viennent de devis réels ou de sources officielles datées.",
  "Aucun prix n'est affiché ici, faute de source vérifiable : le coût réel de ce chantier dépend de votre logement et d'une visite, pas d'une moyenne.",
  "Pas de tarif indicatif sur cette page : tant que nous n'avons pas de devis réels ou de publication officielle datée à citer, nous préférons expliquer ce qui fait le prix plutôt que d'inventer un chiffre.",
  "Nous ne publions pas de prix pour ce chantier : un chiffre sans origine précise est trompeur, et seuls des devis établis après visite reflètent votre situation.",
  "Les montants ne figurent pas dans ce guide : ils varient trop d'un chantier à l'autre pour qu'une moyenne ait un sens, et nous n'affichons que des chiffres sourcés et datés.",
];
const PREFIX = ["Faites inscrire au devis", "Exigez par écrit", "Vérifiez que le devis mentionne", "Demandez que le devis précise"];

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

function fromPrix(s: PrixSpec): Editorial {
  const f = split(s.f);
  const v = split(s.v);
  const h = hash(s.u);
  const top = f.slice(0, 3).map(lowerFirst);
  const reponse = `${s.q} Son prix dépend surtout de ${top[0]}, ${top[1]} et ${top[2]}. Seul un devis détaillé établi après visite donne un prix fiable pour votre chantier.`;
  // Checklist propre à la page : chaque facteur de prix devient une ligne à faire écrire au devis.
  const checklist = f.slice(0, 5).map((x, i) => `${PREFIX[(h + i) % PREFIX.length]} ${lowerFirst(x)}.`);
  const sections: EditorialSection[] = [
    { h2: "Ce qui fait varier le prix", list: f },
    ...(s.extra ? [{ h2: s.extra.h2, paragraphs: [s.extra.p] }] : []),
    { h2: "Les points de vigilance", list: v },
    { h2: "Votre devis, ligne à ligne", paragraphs: ["Comparez des devis de même périmètre : un total moins élevé peut simplement omettre un poste."], list: checklist },
    { h2: "À propos des prix", paragraphs: [SANS_PRIX[(h >>> 2) % SANS_PRIX.length]] },
  ];
  const faq: Faq[] = [];
  if (s.faq) faq.push({ q: s.faq[0], a: s.faq[1] });
  return {
    url: `/prix/${s.u}/`,
    titre: s.t,
    description: firstSentence(s.q),
    reponse,
    sections,
    faq,
    sources: s.sources ?? [SP, DGCCRF],
    maj: CONTENT_UPDATED,
  };
}

function fromGuide(g: GuideSpec): Editorial {
  const sections: EditorialSection[] = g.s.map(([h2, body]) => (body.startsWith("•") ? { h2, list: split(body.replace(/^•\s*/, "")) } : { h2, paragraphs: [body] }));
  return {
    url: g.url,
    titre: g.t,
    description: g.d,
    reponse: g.r,
    sections,
    faq: (g.faq ?? []).map(([q, a]) => ({ q, a })),
    sources: g.sources ?? [SP, DGCCRF],
    maj: CONTENT_UPDATED,
  };
}

export const BUILT_EDITORIAL: Editorial[] = [
  ...[...PRIX_TOITURE, ...PRIX_MACON_FACADE, ...PRIX_INTERIEUR, ...PRIX_EXTERIEUR].map(fromPrix),
  ...GUIDES_INFO.map(fromGuide),
  ...BLOG.map(fromGuide),
];
