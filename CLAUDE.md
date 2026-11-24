# CLAUDE.md — artisansfrance.fr

Projet de Celexia (CELEXIA SASU) : plateforme de **demandes de chantiers** pour particuliers, France entière, construite **from scratch**. L'ancien site (annuaire d'artisans Next.js) est abandonné ; il n'existe plus que dans l'historique git. Rien de l'ancien code, des anciens métiers ou de l'ancienne charte n'est à reprendre.

Langue de travail : français (textes du site en français, code et identifiants en anglais).

## État actuel

Le dépôt ne contient que le dossier `document seo audit /` (**espace final dans le nom** : toujours entre guillemets dans le shell). Aucune stack n'est encore choisie, aucun code n'existe.

## Source de vérité : `document seo audit /`

Ne pas modifier ces fichiers.

| Fichier | Contenu | Usage |
|---|---|---|
| `brief-ia-artisansfrance.md` | Règles, architecture, gabarits, formulaire, mots-clés par section, GEO, concurrence, acquisition, roadmap, cadre légal, décisions ouvertes | **À lire avant toute page ou fonctionnalité** |
| `plan-pages-artisansfrance.csv` | 2 055 pages à créer (`;`, UTF-8 BOM) : section, url, h1, métier, tier, mot-clé principal, volume, secondaires, **phase**, département, ville | Liste ordonnée de ce qu'il faut construire |
| `artisansfrance-mots-cles.csv` | 8 880 requêtes (`;`, décimales avec virgule) : volume, CPC, difficulté, intention, score, océan bleu | Enrichir une page |
| `artisansfrance-donnees.json` | `meta`, `datasets` (kpis, métiers, zones, départements, plateformes, GEO, architecture, acquisition, roadmap, légal), `mots_cles` avec historique mensuel (6 Mo) | Référence ; ne jamais le charger en entier côté client |
| `Artisans France — plan machine à leads (France entière).pdf` | Plan en 15 p. : positionnement, DA, gabarits, liens, conversion, objectifs, garde-fous, prompt de départ | Vue d'ensemble |
| `audit-seo-artisansfrance-clair.pdf` | Audit lisible, 107 p. (surtout tableaux de mots-clés) | Consultation |

En cas de divergence avec ce fichier, le brief gagne.

## Cible (résumé du brief)

**Modèle** : apport d'affaires. Celexia est rémunérée par l'artisan, uniquement sur chantier signé ; gratuit pour le particulier ; coordonnées jamais revendues. Qualification : budget confirmé, projet < 3 mois, chantier > 10 000 € (à confirmer), propriétaire décideur.

**Règles non négociables** (brief §0) :
- Jamais d'avis, note, nombre d'artisans/chantiers ou « certification » inventés. Pas d'exclusivité promise ; dire combien d'artisans reçoivent la demande.
- Page « Comment ça marche / critères de sélection et de classement » liée depuis toutes les pages (Code de la consommation L111-7).
- Formulaire : case **non cochée** pour la transmission aux partenaires, lien vers la liste des partenaires, droit d'opposition (CNIL), dire qui rappelle et sous quel délai. Hors zone : mise en attente honnête.
- Pas de pages satellites : une page département ou ville sans donnée locale propre n'est pas créée (fusionnée dans la page département).
- Prix : fourchettes sourcées, datées, indicatives. Mentions légales complètes (CELEXIA SASU, SIREN, adresse, hébergeur), CGU, confidentialité.
- Jamais de clé, mot de passe ou secret dans le code ou les fichiers.

**URL** (métier en premier) : `/couvreur/`, `/couvreur/77-seine-et-marne/`, `/couvreur/44-loire-atlantique/nantes/` (ville seulement si ≥ 50 recherches/mois), `/prix/…`, `/devis/…`, `/guides/…`, `/aides/…`, `/comment-ca-marche/`, `/nos-artisans/`, `/classement-et-selection/`, `/artisans/` (espace B2B et recrutement), `/blog/…`.

**Métiers** : niveau A (96 départements) = toiture/charpente, façade/ravalement, isolation extérieure, maçonnerie, extension, terrassement, menuiserie, bardage. Niveau B = paysagiste, pergola/véranda, clôture/portail, fosse septique, climatisation, rénovation intérieure, terrasse. Niveau C = piscine (guides de prix et devis seulement). Toiture d'abord.

**Phases** (colonne `phase`, 1 à 4) : on n'ouvre la suivante que si la précédente est indexée ; vagues de 50 à 150 pages/semaine. Commencer par le socle : gabarits, formulaire en étapes, pages fixes, pages légales.

**Gabarits et JSON-LD** : accueil (Organization, WebSite, FAQPage) ; hub métier et métier × zone (Service + areaServed, FAQPage, BreadcrumbList) ; guide de prix (Article, FAQPage) ; devis (Service, FAQPage) ; problèmes et aides (Article) ; sélection (AboutPage). Fil d'Ariane partout ; encadré « Vous êtes artisan dans ce département ? » sur les pages département.

**Formulaire** : métier/travaux → ampleur → code postal → délai → budget → statut → photos (facultatif) → coordonnées en dernier. Envoi vers le CRM Celexia (n8n / Supabase) avec score de qualification, page d'origine et mot-clé. Confirmation : qui rappelle, quand.

**Direction artistique** : bleu ardoise `#1F3A5F`, terre cuite `#C2552D` (boutons d'action), fonds blanc et sable `#F6F1EA`, texte `#2B2B2B`. Titres Manrope ou Outfit, texte Inter. Vraies photos de chantiers avec accord, icônes au trait d'une seule famille. Mobile : bouton « Décrire mon chantier » fixé en bas, numéro cliquable.

**SEO / GEO** : ne pas bloquer les robots IA ; sitemap généré depuis le plan de pages ; Search Console, Bing Webmaster, IndexNow ; nom/adresse/SIREN identiques partout ; jamais d'achat de liens.

**Contenu** : chaque gabarit est généré depuis les données puis relu. Jamais 800 pages identiques où seul le nom de la ville change. Données locales : Etalab (communes, population), Insee, zones vent/neige, secteurs protégés, aides locales, chiffres réels Celexia quand ils existent.

## Décisions ouvertes (demander à Thomas, ne pas deviner)

Stack technique (à choisir ; garder en tête ~2 055 pages générées et un formulaire branché sur n8n/Supabase) ; départements et métiers ouverts au lancement ; nombre d'artisans par demande ; seuil de chantier et sort des petites demandes ; délai de rappel promis et qui rappelle ; ce que la sélection vérifie réellement ; sort des demandes hors zone ; validation du modèle juridique par l'avocat de Celexia.

## Conventions

- Valeur inconnue = constante nommée à fixer par Thomas, jamais un chiffre inventé.
- Zones (départements, communes) : référentiel Etalab ou JSON d'audit, pas de saisie manuelle.
- CPC en dollars (DataForSEO) ; volumes nationaux.
- Commits conventionnels (`feat:`, `fix:`), comme dans l'historique.
