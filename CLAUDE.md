# CLAUDE.md — artisansfrance.fr

Site de **demandes de chantiers** pour particuliers, France entière, édité par CELEXIA SASU. Modèle : apport d'affaires (l'artisan paie une commission, uniquement si le chantier est signé ; gratuit pour le particulier). Langue : français pour les textes, anglais pour les identifiants.

**Source de vérité : `document seo audit /`** (espace final dans le nom : toujours entre guillemets). Ne pas modifier ces fichiers. Le site est construit à partir d'eux ; voir « Données » ci-dessous.

AGENTS.md rappelle que Next.js 16 diffère de ce qu'on connaît : lire `node_modules/next/dist/docs/` avant de toucher aux APIs de Next.

## Commandes

```bash
npm run dev            # développement (http://localhost:3000)
npm run build          # build de production (seulement les pages des vagues publiées)
npm run build && npm run qa:gate && npm run build   # build complet puis porte qualité
npm run qa             # audit du HTML généré -> reports/audit-site.md
npm run typecheck && npm run lint
npm run data           # régénère src/data/*.json (pages, géo, données locales) ; ~10 min, réseau requis
```

## Règles non négociables (brief §0)

- **Aucun avis, note, nombre d'artisans/chantiers, « certifié » ou prix inventé.** Un prix n'est affiché que s'il est sourcé et daté ; sinon les guides expliquent ce qui fait varier le prix.
- Page « Critères de classement et de sélection » (L111-7) liée depuis le pied de page de **toutes** les pages.
- Formulaire : case de transmission aux partenaires **non cochée**, lien vers `/partenaires/`, droit d'opposition, qui rappelle et quand.
- Pas de pages satellites : une page locale n'est indexable que si elle contient des données locales réelles (voir « Publication »).
- Jamais de clé, mot de passe ou secret dans le code. Les secrets viennent de l'environnement.
- Toute valeur inconnue est `null` dans `src/config/site.ts` : le site masque la phrase correspondante ou affiche un champ « à renseigner » (et passe la page en noindex). **Ne jamais inventer de valeur pour la remplir.**

## Architecture

```
document seo audit /          sources (CSV du plan, mots-clés, JSON de l'audit, brief, PDF)
scripts/
  build-pages.mjs             plan CSV -> src/data/pages.json (nettoyage, fusions, slugs, vagues, saisonnalité, régions)
                              + reports/plan-nettoyage.md et reports/couverture-mots-cles.md
  fetch-geo.mjs               API Etalab + contours officiels -> src/data/geo.json (communes, voisins, adjacence)
  fetch-local.mjs             DVF (DGFiP) et Géorisques -> src/data/local.json
  qa.mjs                      audit du HTML généré (H1, title, canonical, JSON-LD, liens cassés, orphelines, unicité)
  indexnow.mjs                notifie Bing/IndexNow des pages publiées
src/config/site.ts            identité, décisions ouvertes (OPS), métiers/départements couverts, infos légales
src/config/publication.ts     vagues publiées, INDEXING_ON, PREVIEW_ALL, seuils qualité
src/lib/pages.ts              accès aux pages ; isPublished(), robotsFor() : TOUTE la logique de publication/indexation
src/lib/seo.ts                metadata (title 60 car., description), JSON-LD (jamais d'avis ni de note)
src/lib/form.ts, leads.ts     formulaire : options, validation, score de qualification ; envoi au webhook
src/content/trades.ts         contenu des 17 hubs métier (écrit à la main, sans chiffre inventé)
src/content/editorial.ts      guides (problèmes, aides, prix) : un guide n'existe que s'il est rédigé ici
src/app/[metier]/...          hub, département (et région), ville : générés depuis pages.json
src/app/{guides,aides,prix,devis}/[slug]   guides et devis
src/app/api/{demande,candidature,evenement}   routes serveur -> LEADS_WEBHOOK_URL
```

URLs : métier en premier, slash final (`/couvreur/77-seine-et-marne/`, `/couvreur/33-gironde/bordeaux/`, `/prix/nettoyage-toiture/`, `/devis/toiture/`, `/guides/fuite-toiture/`, `/aides/aide-refaire-toiture/`).

## Publication (état au 25/11/2026 : tout est publié)

1. **Vagues** : `PUBLISHED_WAVES = ["*"]` dans `publication.ts` publie toutes les vagues du plan (décision explicite de Thomas). Pour revenir à un déploiement progressif, lister les lots (`"1.1"`, `"1.2"`…).
2. **Porte qualité** (`robotsFor()` dans `pages.ts`) : `npm run qa:gate` (après un build) écrit `src/data/quality.json` : toute page sous 30 % de contenu propre (face aux pages du même gabarit) ou sous 300 mots passe en noindex et sort du sitemap. Ensuite : rebuild. À relancer après toute modification de contenu ou de gabarit. Une page locale sans recherche et sans artisan couvert, ou avec moins de 3 blocs de données réelles, est aussi en noindex.
3. **Indexation globale** : active par défaut ; `INDEXING=off` met tout le site en noindex et ferme `robots.txt` (préproduction).

Un guide (prix, problème, aides, blog) n'existe que s'il est rédigé : `src/content/editorial.ts` (textes à la main) ou `src/content/specs/*` (guides compacts assemblés par `editorial-build.ts`). Les pages devis utilisent `src/content/devis-notes.ts`. Les guides de prix n'affichent jamais de montant (aucune source) : ils expliquent les facteurs de prix.

Le plan CSV n'est pas publié tel quel : `scripts/build-pages.mjs` retire les marques et noms propres, fusionne les doublons d'intention (table `MERGE`, `DEVIS_CANONICAL`), nettoie les slugs et rapporte tout dans `reports/`.

Formulaires : tant que `LEADS_WEBHOOK_URL` n'est pas défini au build, les formulaires proposent l'envoi par e-mail (messagerie du visiteur, adresse `COMPANY.contactEmail`) ; une fois défini, ils postent sur `/api/demande` et `/api/candidature`.

## Variables d'environnement

`LEADS_WEBHOOK_URL` (à définir AVANT le build : sans lui, `/api/demande` renvoie une erreur honnête et les formulaires basculent sur l'e-mail), `LEADS_WEBHOOK_SECRET`, `INDEXING=off` (préproduction), `PREVIEW_ALL=1`, `INDEXNOW_KEY`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.

## Décisions ouvertes (à demander à Thomas, jamais à deviner)

SIREN, adresse du siège, directeur de la publication, adresse de l'hébergeur (`COMPANY`) ; délai de rappel et nombre d'artisans par demande (`OPS`) ; durée de conservation (36 mois posés par défaut : à valider) ; vérifications réellement faites sur les artisans (`SELECTION_CHECKS`, toutes `false`) ; départements couverts (`COVERED_DEPARTMENTS`) ; liste des partenaires (`PARTNERS`) ; médiateur de la consommation ; URL du webhook ; téléphone ; sources de prix ; relecture des textes (avocat de Celexia pour le cadre légal).

## Données et honnêteté

- Chaque donnée locale affichée a sa source et son millésime : Etalab (population, communes), DVF 2024 (ventes de maisons ; l'Alsace-Moselle et Mayotte ne sont pas couverts, la page le dit), Géorisques (risques), DataForSEO (volumes de recherche, jusqu'à octobre 2026).
- Les prix médians DVF ne sont calculés qu'avec au moins 10 ventes, sinon `null`.
- Ne jamais présenter un prix de vente immobilière comme un prix de travaux.

## Conventions

- Commits conventionnels (`feat:`, `fix:`, `chore:`).
- Les pages `[metier]/...` sont génériques : ouvrir un métier = rédiger son contenu dans `trades.ts` (et ses guides dans `editorial.ts`), puis publier sa vague.
- Après toute modification de gabarit : `PREVIEW_ALL=1 INDEXING=on npm run build && npm run qa`, et vérifier le contenu propre des pages locales (seuil 40 %, arrêt sous 30 %).
