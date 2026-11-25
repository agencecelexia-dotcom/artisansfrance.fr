# Connexion n8n : formulaires -> e-mail

Quand un visiteur envoie le formulaire, le site poste les informations en JSON sur un webhook n8n, qui envoie un e-mail
**depuis agence.celexia@gmail.com vers contact.artisansfrance@gmail.com** (avec l'e-mail du visiteur en « Répondre à »).
Les événements de mesure (début de formulaire, étapes) arrivent sur le même webhook mais ne génèrent aucun e-mail.

## Mise en place (une fois)

1. **Importer** `n8n/workflow-demandes.json` : n8n > Workflows > Import from file.
2. **Credential du webhook** : sur le nœud « Webhook formulaires », créer un credential *Header Auth* :
   nom d'en-tête `X-Webhook-Secret`, valeur = `LEADS_WEBHOOK_SECRET` du fichier `.env`.
3. **Credential Gmail** : sur le nœud « Envoyer depuis agence.celexia@gmail.com », connecter le compte Google
   `agence.celexia@gmail.com` (OAuth2). L'adresse expéditrice est celle du compte connecté.
4. **Activer** le workflow (interrupteur « Active »).
5. Copier l'**URL de production** du nœud Webhook (onglet « Production URL », de la forme
   `https://<votre-n8n>/webhook/artisansfrance-demandes`, et non l'URL de test qui contient `/webhook-test/`).

## Côté site

6. Coller cette URL dans `LEADS_WEBHOOK_URL` du fichier `.env` (et dans Vercel > Settings > Environment Variables,
   avec `LEADS_WEBHOOK_SECRET`), puis **redéployer** : la valeur est lue au build.
7. Tester : `npm run test:webhook` envoie une demande « TEST » ; l'e-mail doit arriver en quelques secondes.
   `npm run test:webhook candidature` teste la candidature d'artisan.

## Contenu envoyé

- `demande` : métier, travaux, ampleur, code postal et département, délai, budget, statut, coordonnées, consentement,
  score de qualification (4 critères), département couvert, page et mot-clé d'origine.
- `candidature` : entreprise, SIREN, métier, départements, contact, message.
- `evenement` : `formulaire_debut`, `formulaire_etape`, `formulaire_envoi` (sans donnée personnelle), ignoré par le workflow.

## À savoir

- Ce workflow n'a pas été importé dans votre n8n par Claude (aucune connexion à votre instance) : si l'import signale un
  paramètre inconnu sur le nœud Gmail selon votre version de n8n, recréez ce nœud et gardez l'expression `={{ $json.subject }}`,
  `={{ $json.html }}`, destinataire `contact.artisansfrance@gmail.com`.
- Plus tard, ajoutez d'autres nœuds après « Construire l'e-mail » (Notion, Google Sheets, Supabase) sans toucher au site.
