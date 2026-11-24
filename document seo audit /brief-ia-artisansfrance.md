# Brief IA : refonte d’artisansfrance.fr en plateforme de demandes de chantiers

Celexia · audit du 24/11/2026 · données DataForSEO (Google France), ChatGPT, référentiel officiel des communes (Etalab), sources légales officielles.

Ce brief est fait pour être donné à une IA (ou un développeur) qui construit le nouveau site. Il contient les règles, l’architecture, les gabarits de pages, les mots-clés par section et les obligations légales. Le fichier JSON joint contient toutes les données brutes (dont les 8 880 requêtes analysées, avec leur historique mensuel).

## 0. Règles non négociables

- Ne jamais inventer d’avis, de note globale, de nombre d’artisans, de nombre de chantiers ou de « certification ». N’afficher que ce qui est vérifiable et documenté. Le site actuel affiche une note et « artisans certifiés » : à retirer.
- Ne jamais promettre d’exclusivité au client ni à l’artisan. Dire combien d’artisans reçoivent la demande (valeur à fixer par Thomas).
- Dire clairement que le service est gratuit pour le particulier et que la rémunération vient de l’artisan, sous forme de commission sur chantier signé (apport d’affaires, pas vente de contacts).
- Page « Comment ça marche / critères de sélection et de classement » accessible depuis toutes les pages (Code de la consommation, L111-7 et D111-7).
- Formulaire : case non cochée pour la transmission aux artisans partenaires, lien vers la liste à jour des partenaires, droit d’opposition (CNIL). Dire qui va rappeler et sous quel délai.
- Pas de pages satellites : chaque page département ou ville doit avoir un contenu propre et utile (communes, contraintes locales, délais réels, artisans réellement présents). Ne créer une page locale que si le réseau peut servir la zone ou si la page sert aussi au recrutement d’artisans de cette zone.
- Prix : fourchettes sourcées (devis réels des partenaires, sources publiques), datées, présentées comme indicatives.
- Mentions légales complètes (raison sociale CELEXIA SASU, SIREN, adresse, directeur de publication, hébergeur), CGU, politique de confidentialité.
- Ne jamais écrire de clé, mot de passe ou secret dans le code ou les fichiers du site.

## 1. Objectif et modèle

- Objectif numéro un : recevoir des demandes de chantiers qualifiées de particuliers, France entière, et les transmettre aux meilleurs artisans du réseau Celexia.
- Modèle : apport d’affaires. Celexia est payée par l’artisan, uniquement quand le chantier est signé. C’est l’argument central : l’intérêt de Celexia est aligné sur celui du client (un bon chantier signé, pas un contact revendu à cinq artisans).
- Métiers prioritaires : toiture et charpente, maçonnerie et gros œuvre, ravalement de façade, isolation extérieure, extension, menuiserie et bardage, terrassement, piscine.
- Critères de qualification (repris de Celexia) : budget confirmé, projet à moins de trois mois, chantier au-dessus du seuil (10 000 € chez Celexia, à confirmer pour la plateforme), propriétaire et décideur.
- Contrainte : la capacité dépend des artisans recrutés par département. Ouvrir les zones au rythme du réseau ; une demande hors zone doit être mise en attente honnêtement, jamais promise.

## 2. Le constat en chiffres

- 8 880 requêtes analysées (variantes regroupées), 12 175 880 recherches par mois.
- Requêtes génériques (« couvreur », « toiture ») : tenues par travaux.com, PagesJaunes, Obat, AlloVoisins ; force médiane des sites en place 398 sur 1 000.
- Requêtes métier + ville ou département : 1 349 requêtes, 431 940 recherches par mois, CPC médian 2,95 $, force médiane des sites en place 284 : le type de requête le plus accessible.
- Requêtes « devis » : CPC médian 8,5 $, le plus élevé du marché.
- Toiture : 1 755 930 recherches par mois dont 510 710 à intention d’achat ; premier métier en valeur.
- Océans bleus (au moins 50 recherches par mois, CPC d’au moins 1,5 $, intention d’achat forte, difficulté de 35 au plus) : 195 requêtes, 144 490 recherches par mois.
- artisansfrance.fr aujourd’hui : 56 domaines référents (score de spam 60/100), 17 mots-clés classés. Le domaine part quasiment de zéro.

### Valeur de la demande par métier

| Métier | Requêtes | Rech./mois | Dont intention d’achat | CPC médian $ | Difficulté méd. | Océans bleus | Valeur de la demande |
|---|---|---|---|---|---|---|---|
| Toiture & charpente | 1 850 | 1 755 930 | 510 710 | 2,5 | 55 | 97 | 2 962 445 |
| Piscine | 462 | 5 932 440 | 17 620 | 0,53 | 63 | 2 | 1 589 889 |
| Pergola, véranda, abri | 1 079 | 1 153 840 | 28 050 | 0,71 | 60 | 12 | 477 329 |
| Extension & surélévation | 647 | 847 590 | 13 330 | 0,79 | 62 | 2 | 432 801 |
| Paysage & jardin | 622 | 390 470 | 205 720 | 1,52 | 56 | 20 | 412 721 |
| Maçonnerie & gros œuvre | 646 | 384 340 | 93 430 | 1,08 | 62 | 7 | 393 346 |
| Isolation extérieure | 425 | 111 120 | 22 930 | 2,3 | 50 | 8 | 280 447 |
| Rénovation intérieure | 140 | 80 390 | 71 910 | 2,27 | 62 | 5 | 226 614 |
| Clôture & portail | 548 | 738 550 | 12 080 | 0,48 | 57 | 1 | 219 375 |
| Assainissement | 522 | 224 210 | 25 300 | 0,52 | 59 | 8 | 204 433 |
| Menuiserie | 94 | 39 920 | 36 910 | 2,36 | 56 | 13 | 200 673 |
| Façade & ravalement | 580 | 95 070 | 27 660 | 3,03 | 51 | 11 | 145 829 |
| Énergie | 46 | 31 180 | 27 530 | 1,94 | 58 | 1 | 140 145 |
| Terrassement & VRD | 772 | 109 340 | 29 100 | 1,86 | 55 | 4 | 89 361 |
| Générique (devis, artisan) | 29 | 20 150 | 10 240 | 4,68 | 57 | 2 | 82 052 |
| Bardage | 399 | 254 450 | 4 820 | 0,33 | 54 | 0 | 44 024 |
| Terrasse | 19 | 6 890 | 5 070 | 1,5 | 58 | 2 | 10 227 |

### Par type de requête

| Type | Requêtes | Rech./mois | CPC médian $ | Difficulté méd. | Force méd. des sites | Océans bleus |
|---|---|---|---|---|---|---|
| Générique | 5 816 | 10 626 200 | 0,66 | 60 | 398 | 0 |
| Pro + ville ou zone | 1 349 | 431 940 | 2,95 | 47 | 284 | 113 |
| Trouver un pro (générique) | 159 | 347 550 | 3,45 | 54,5 | 383 | 15 |
| Achat produit ou marque | 360 | 302 340 | 0,27 | 73 | 444 | 0 |
| Prix et coût | 713 | 285 630 | 1,96 | 56 | 360 | 51 |
| Information et idées | 169 | 64 070 | 0,69 | 67 | 433 | 0 |
| Devis | 88 | 55 540 | 8,5 | 47,5 | 359 | 12 |
| Aides et réglementation | 128 | 35 010 | 2,7 | 55 | 396 | 0 |
| Problème et réparation | 53 | 21 750 | 3,83 | 49,5 | 332 | 4 |
| Comparatif et choix | 45 | 5 850 | 1,93 | 63 | 440 | 0 |

## 3. Positionnement et messages

- Promesse : « Décrivez votre chantier, on l’étudie et on vous met en relation avec des artisans sélectionnés près de chez vous. »
- Preuve : méthode de sélection publiée (assurance décennale vérifiée, Kbis, chantiers visités ou références contrôlées — seulement ce qui est réellement fait), un interlocuteur humain qui étudie la demande.
- Différence : « Notre rémunération vient de l’artisan, uniquement si votre chantier est signé. Nous ne revendons pas vos coordonnées. »
- Ton : clair, concret, sans superlatifs invérifiables.

## 4. Architecture du site

| Section | Modèle d’adresse | Pages | Requêtes visées | Rech./mois | Rôle | Priorité | Garde-fou |
|---|---|---|---|---|---|---|---|
| Accueil | / | 1 | trouver un artisan, devis travaux, artisan de confiance | — | Promesse, formulaire de demande en étapes, preuve de sérieux, entrée artisans | 1 · tout de suite | Aucun chiffre ni avis inventé ; mentions de plateforme (L111-7) accessibles depuis toutes les pages |
| Pages métier | /toiture/, /maconnerie/, /ravalement-facade/, /piscine/, /menuiserie-bardage/, /extension/ | 6 à 9 | couvreur, entreprise toiture, maçon, façadier, pisciniste… | 192 380 | Expliquer le métier, prix indicatifs sourcés, étapes, formulaire spécialisé | 1 · tout de suite | Seulement les métiers à gros chantiers que le réseau peut servir |
| Métier × département | /couvreur/77-seine-et-marne/ | jusqu’à 96 par métier | couvreur 77, couvreur essonne, ravalement façade 91… | 53 730 | Le principal océan bleu : SERP moins solides, CPC élevé ; sert aussi à recruter des artisans du département | 1 · d’abord les départements couverts par des artisans | Contenu propre à chaque département (communes, climat, règles locales, délais réels) sinon risque de pages satellites |
| Métier × grande ville | /couvreur/toulouse/ | 385 villes à 200 recherches/mois ou plus pour la toiture | couvreur nantes, couvreur tours, couvreur aix-en-provence… | 309 420 | Capter les requêtes locales à volume, rattachées à leur département | 2 · après les départements | Uniquement des villes à volume réel, avec un contenu local réel |
| Guides de prix et simulateurs | /prix/nettoyage-toiture/, /prix/refaire-toiture-m2/ | 20 à 40 | nettoyage toiture prix, prix refaire toiture, prix ravalement façade m2… | 160 360 | Attirer avant le devis, obtenir des liens, convertir via un simulateur qui ouvre la demande | 1 · tout de suite | Fourchettes sourcées (devis réels des partenaires, sources publiques), datées |
| Pages devis | /devis/toiture/, /devis/ravalement-facade/ | 6 à 9 | devis toiture, devis ravalement, devis menuiserie… | 20 580 | Intention la plus chère du marché (CPC médian le plus haut) : pages courtes, formulaire d’abord | 1 · tout de suite | Dire clairement qui reçoit la demande et comment |
| Problèmes et réparations | /guides/fuite-toiture/, /guides/fissure-facade/ | 15 à 30 | réparation toiture, fuite toiture, infiltration… | 20 040 | Urgence et besoin concret : bon taux de demande | 2 | Conseils généraux et sûrs ; pas de diagnostic à distance |
| Aides et réglementation | /guides/declaration-prealable-toiture/, /aides/… | 10 à 20 | permis, déclaration préalable, aides, TVA réduite… | 23 080 | Contenu de confiance cité par les IA ; liens vers les sources officielles | 3 | Citer les textes et sites officiels, dater les mises à jour |
| Pages de confiance et GEO | /comment-ca-marche/, /nos-artisans/, /classement-et-selection/ | 5 | quel site pour trouver un artisan, avis travaux.com, plateforme artisan fiable | — | Être cité par ChatGPT et les comparatifs : méthode de sélection, rémunération, chiffres réels | 1 · tout de suite | Transparence exigée par le Code de la consommation (L111-7) |
| Espace artisans (B2B) | /artisans/, /artisans/couvreur-77/ | 1 + 1 par métier × département | apport d’affaires BTP, trouver des chantiers, plateforme chantiers artisans | — | Recruter les artisans là où les demandes arrivent : chaque page département a son appel aux artisans | 1 · tout de suite | Mention « Apport d’affaires BTP », conditions claires, pas de promesse chiffrée |

Maillage : accueil → pages métier → pages métier × département → pages métier × ville ; chaque page locale renvoie vers le guide de prix et la page devis du métier ; chaque guide renvoie vers le formulaire. Fil d’Ariane partout. Les pages département contiennent un encadré « Vous êtes artisan dans ce département ? » vers l’espace artisans.

## 5. Gabarits de pages

| Gabarit | Exemple de H1 | Contenu | Données structurées |
|---|---|---|---|
| Accueil | Trouvez le bon artisan pour votre chantier, sans démarchage | Formulaire en étapes au-dessus de la ligne de flottaison ; comment ça marche en trois étapes ; métiers couverts ; zones ouvertes ; méthode de sélection ; FAQ ; entrée artisans | Organization, WebSite, FAQPage |
| Page métier (hub) | Couvreur : trouvez un artisan sélectionné près de chez vous | Ce que fait le métier ; travaux courants ; fourchettes de prix sourcées ; étapes d’un chantier ; questions à poser à l’artisan ; départements couverts ; formulaire spécialisé | Service, FAQPage, BreadcrumbList |
| Métier × département | Couvreur en Seine-et-Marne (77) | Communes principales ; contraintes locales (climat, matériaux, règles d’urbanisme fréquentes) ; délais réels ; fourchettes de prix locales si disponibles ; artisans du réseau présents (sans inventer) ; formulaire ; appel aux artisans du département | Service avec areaServed, FAQPage, BreadcrumbList |
| Métier × ville | Couvreur à Nantes | Seulement pour les villes à volume réel ; quartiers et communes voisines ; particularités du bâti local ; lien vers la page département ; formulaire | Service avec areaServed, BreadcrumbList |
| Guide de prix | Prix d’un nettoyage de toiture en 2026 | Fourchette au m² et totale, facteurs de prix, exemples chiffrés datés, simulateur qui ouvre le formulaire pré-rempli, sources | Article, FAQPage, HowTo si pertinent |
| Page devis | Devis toiture : décrivez votre chantier | Formulaire d’abord ; ce que contient un bon devis ; délais de réponse ; qui reçoit la demande | Service, FAQPage |
| Problème / réparation | Fuite de toiture : que faire et qui appeler | Gestes immédiats sûrs, causes fréquentes, quand appeler un pro, formulaire urgence | Article, FAQPage |
| Aides et réglementation | Déclaration préalable pour refaire une toiture | Règles, liens vers les textes et sites officiels, date de mise à jour | Article |
| Comment ça marche / sélection | Comment nous sélectionnons les artisans | Critères de sélection et de classement, rémunération, nombre d’artisans contactés, traitement des données, règlement des litiges (L111-7) | AboutPage |
| Espace artisans | Recevez des demandes de chantiers dans votre département | Modèle apport d’affaires, conditions, métiers et départements recherchés, formulaire de candidature ; pas de promesse chiffrée | Service |

## 6. Formulaire de demande

Étapes : 1) métier et type de travaux ; 2) ampleur (surface, nombre de fenêtres…) ; 3) code postal ; 4) délai souhaité ; 5) budget estimé ; 6) statut (propriétaire occupant, bailleur, locataire) ; 7) photos (facultatif) ; 8) coordonnées en dernier. Case non cochée de transmission aux partenaires + lien vers la liste. Écran de confirmation : qui rappelle, quand, et ce qui se passe ensuite. Envoi dans le CRM Celexia avec un score de qualification selon les quatre critères. Hors zone : message honnête et mise en attente.

## 7. Où ouvrir en premier : demande locale par département

À croiser avec les départements où Celexia a déjà des artisans.

| Rang | Code | Département | Rech./mois | Dont toiture | Villes | Villes principales | Océans bleus | CPC méd. $ |
|---|---|---|---|---|---|---|---|---|
| 1 | 33 | Gironde | 19 370 | 16 190 | 14 | Bordeaux, Pessac, Mérignac, Libourne, Talence | 2 | 5,08 |
| 2 | 29 | Finistère | 17 100 | 11 750 | 16 | Quimper, Brest, Quimperlé, Morlaix, Concarneau | 5 | 3,07 |
| 3 | 44 | Loire-Atlantique | 16 960 | 13 360 | 24 | Nantes, Saint-Nazaire, Saint-Herblain, Orvault, Trignac | 3 | 3,71 |
| 4 | 59 | Nord | 15 950 | 13 480 | 18 | Lille, Valenciennes, Dunkerque, Tourcoing, Haubourdin | 2 | 4,5 |
| 5 | 56 | Morbihan | 12 760 | 8 320 | 14 | Lorient, Vannes, Guer, Pontivy, Lanester | 3 | 2,97 |
| 6 | 75 | Paris | 12 570 | 8 400 | 1 | Paris | 1 | 2,83 |
| 7 | 34 | Hérault | 11 650 | 9 150 | 11 | Montpellier, Béziers, Lunel, Agde, Marseillan | 3 | 4,63 |
| 8 | 85 | Vendée | 10 430 | 5 600 | 12 | La Roche-sur-Yon, Fontenay-le-Comte, Les Sables-d'Olonne, Challans, Les Herbiers | 1 | 2,05 |
| 9 | 13 | Bouches-du-Rhône | 9 910 | 7 660 | 10 | Marseille, Aix-en-Provence, Aubagne, Vitrolles, Salon-de-Provence | 4 | 3,83 |
| 10 | 78 | Yvelines | 9 360 | 8 250 | 14 | Versailles, Saint-Germain-en-Laye, Sartrouville, Rambouillet, Conflans-Sainte-Honorine | 3 | 4,89 |
| 11 | 06 | Alpes-Maritimes | 9 340 | 8 260 | 13 | Nice, Cannes, Antibes, Grasse, Cagnes-sur-Mer | 2 | 9,27 |
| 12 | 31 | Haute-Garonne | 8 860 | 6 610 | 8 | Toulouse, Saint-Gaudens, Tournefeuille, Muret, Colomiers | 1 | 3,24 |
| 13 | 76 | Seine-Maritime | 8 630 | 6 180 | 11 | Rouen, Le Havre, Dieppe, Yvetot, Sotteville-lès-Rouen | 6 | 3,38 |
| 14 | 91 | Essonne | 8 570 | 7 230 | 12 | Savigny-sur-Orge, Linas, Sainte-Geneviève-des-Bois, Palaiseau, Massy | 5 | 5,11 |
| 15 | 77 | Seine-et-Marne | 8 130 | 7 270 | 11 | Fontainebleau, Melun, Meaux, Chelles, Pontault-Combault | 3 | 4,91 |
| 16 | 83 | Var | 7 920 | 6 540 | 15 | Toulon, Fréjus, Hyères, Saint-Tropez, Draguignan | 5 | 4,91 |
| 17 | 35 | Ille-et-Vilaine | 7 860 | 4 990 | 10 | Rennes, Saint-Malo, Bruz, Dinard, Vitré | 2 | 2,5 |
| 18 | 22 | Côtes-d'Armor | 7 220 | 5 250 | 8 | Saint-Brieuc, Guingamp, Dinan, Lannion, Ploumagoar | 0 | 2,52 |
| 19 | 69 | Rhône | 7 120 | 4 600 | 5 | Lyon, Villeurbanne, Saint-Genis-Laval, Meyzieu, Villefranche-sur-Saône | 0 | 2,82 |
| 20 | 92 | Hauts-de-Seine | 6 880 | 6 880 | 14 | Clamart, Bois-Colombes, Rueil-Malmaison, Colombes, Antony | 1 | 7,26 |
| 21 | 17 | Charente-Maritime | 6 840 | 5 010 | 6 | La Rochelle, Royan, Saintes, Tonnay-Charente, Saujon | 2 | 3,12 |
| 22 | 42 | Loire | 6 690 | 4 840 | 5 | Saint-Étienne, Roanne, Saint-Just-Saint-Rambert, Saint-Chamond, Montbrison | 2 | 2,42 |
| 23 | 94 | Val-de-Marne | 6 560 | 5 460 | 11 | Saint-Maur-des-Fossés, Vincennes, Bry-sur-Marne, Le Perreux-sur-Marne, Créteil | 4 | 8,24 |
| 24 | 62 | Pas-de-Calais | 6 120 | 5 620 | 8 | Arras, Calais, Lens, Boulogne-sur-Mer, Béthune | 0 | 2,62 |
| 25 | 14 | Calvados | 5 940 | 4 080 | 7 | Caen, Deauville, Bayeux, Isigny-sur-Mer, Ouistreham | 3 | 1,76 |
| 26 | 45 | Loiret | 5 610 | 4 780 | 7 | Orléans, Montargis, Châlette-sur-Loing, Dordives, Saran | 2 | 3,21 |
| 27 | 63 | Puy-de-Dôme | 5 140 | 3 610 | 3 | Clermont-Ferrand, Issoire, Riom | 1 | 1,77 |
| 28 | 81 | Tarn | 4 870 | 3 610 | 6 | Albi, Castres, Gaillac, Mazamet, Lavaur | 1 | 2,89 |
| 29 | 95 | Val-d'Oise | 4 820 | 4 760 | 9 | Argenteuil, Viarmes, Bezons, Montmorency, L'Isle-Adam | 1 | 5,75 |
| 30 | 60 | Oise | 4 760 | 3 650 | 7 | Compiègne, Chantilly, Beauvais, Senlis, Noyon | 3 | 5,27 |
| 31 | 49 | Maine-et-Loire | 4 710 | 3 080 | 3 | Cholet, Angers, Saumur | 2 | 2,95 |
| 32 | 93 | Seine-Saint-Denis | 4 630 | 4 470 | 10 | Montreuil, Montfermeil, Drancy, Gagny, Aulnay-sous-Bois | 1 | 5,9 |
| 33 | 72 | Sarthe | 4 580 | 2 860 | 1 | Le Mans | 2 | 2,4 |
| 34 | 74 | Haute-Savoie | 4 500 | 3 150 | 3 | Annecy, Annemasse, Thonon-les-Bains | 1 | 2,36 |
| 35 | 30 | Gard | 4 450 | 3 470 | 4 | Nîmes, Alès, Uzès, Bagnols-sur-Cèze | 1 | 1,81 |
| 36 | 84 | Vaucluse | 4 400 | 3 110 | 6 | Avignon, Orange, Cavaillon, Sorgues, Carpentras | 1 | 2,98 |
| 37 | 64 | Pyrénées-Atlantiques | 4 210 | 2 870 | 6 | Pau, Bayonne, Biarritz, Saint-Jean-de-Luz, Orthez | 1 | 1,44 |
| 38 | 57 | Moselle | 4 110 | 2 560 | 6 | Metz, Thionville, Yutz, Saint-Avold, Forbach | 1 | 2,43 |
| 39 | 80 | Somme | 3 890 | 3 090 | 2 | Amiens, Abbeville | 0 | 2,17 |
| 40 | 37 | Indre-et-Loire | 3 880 | 1 920 | 3 | Tours, Amboise, Fondettes | 1 | 1,9 |
| 41 | 11 | Aude | 3 790 | 2 900 | 3 | Narbonne, Carcassonne, Castelnaudary | 0 | 3,47 |
| 42 | 03 | Allier | 3 710 | 3 260 | 4 | Montluçon, Vichy, Moulins, Domérat | 0 | 1,78 |
| 43 | 66 | Pyrénées-Orientales | 3 700 | 3 020 | 1 | Perpignan | 0 | 3,16 |
| 44 | 68 | Haut-Rhin | 3 660 | 1 620 | 2 | Mulhouse, Colmar | 2 | 1,6 |
| 45 | 50 | Manche | 3 500 | 1 950 | 5 | Cherbourg-en-Cotentin, Saint-Lô, Granville, Valognes, Avranches | 2 | 1,81 |
| 46 | 16 | Charente | 3 440 | 2 640 | 3 | Angoulême, Cognac, Ruffec | 1 | 2,71 |
| 47 | 26 | Drôme | 3 410 | 2 310 | 3 | Valence, Montélimar, Romans-sur-Isère | 0 | 3,1 |
| 48 | 02 | Aisne | 3 320 | 2 790 | 6 | Saint-Quentin, Laon, Soissons, Chauny, Tergnier | 0 | 2,14 |
| 49 | 51 | Marne | 3 310 | 2 000 | 3 | Reims, Épernay, Châlons-en-Champagne | 1 | 2,61 |
| 50 | 67 | Bas-Rhin | 3 170 | 1 830 | 2 | Strasbourg, Haguenau | 1 | 3,17 |
| 51 | 86 | Vienne | 3 150 | 1 850 | 2 | Poitiers, Châtellerault | 3 | 2,39 |
| 52 | 21 | Côte-d'Or | 3 010 | 1 460 | 2 | Dijon, Beaune | 1 | 2,43 |
| 53 | 28 | Eure-et-Loir | 2 800 | 2 000 | 3 | Chartres, Dreux, Anet | 0 | 2,54 |
| 54 | 12 | Aveyron | 2 770 | 1 890 | 4 | Rodez, Millau, Decazeville, Villefranche-de-Rouergue | 0 | 1,21 |
| 55 | 79 | Deux-Sèvres | 2 760 | 1 690 | 3 | Niort, Bressuire, Thouars | 1 | 2,12 |
| 56 | 82 | Tarn-et-Garonne | 2 700 | 2 210 | 2 | Montauban, Castelsarrasin | 1 | 2,79 |
| 57 | 18 | Cher | 2 650 | 1 890 | 2 | Bourges, Vierzon | 0 | 1,43 |
| 58 | 89 | Yonne | 2 480 | 1 850 | 2 | Auxerre, Sens | 0 | 4,03 |
| 59 | 27 | Eure | 2 470 | 2 140 | 5 | Vernon, Évreux, Gisors, Pont-Audemer, Louviers | 0 | 2,98 |
| 60 | 15 | Cantal | 2 400 | 1 780 | 1 | Aurillac | 0 | 2,72 |
| 61 | 54 | Meurthe-et-Moselle | 2 230 | 1 370 | 3 | Nancy, Toul, Longwy | 2 | 3,05 |
| 62 | 40 | Landes | 2 200 | 910 | 3 | Dax, Mont-de-Marsan, Mimizan | 2 | 1,41 |
| 63 | 24 | Dordogne | 2 120 | 1 600 | 2 | Bergerac, Périgueux | 1 | 2,28 |
| 64 | 73 | Savoie | 2 020 | 1 000 | 3 | Chambéry, Albertville, Aix-les-Bains | 3 | 1,99 |
| 65 | 41 | Loir-et-Cher | 2 000 | 850 | 2 | Blois, Vendôme | 0 | 2,22 |
| 66 | 10 | Aube | 1 950 | 1 050 | 1 | Troyes | 0 | 3,55 |
| 67 | 61 | Orne | 1 890 | 1 180 | 3 | Argentan, Flers, Alençon | 1 | 2,11 |
| 68 | 38 | Isère | 1 860 | 1 210 | 2 | Grenoble, Bourgoin-Jallieu | 0 | 4,13 |
| 69 | 47 | Lot-et-Garonne | 1 850 | 1 390 | 3 | Agen, Villeneuve-sur-Lot, Marmande | 0 | 2,45 |
| 70 | 19 | Corrèze | 1 820 | 1 390 | 2 | Brive-la-Gaillarde, Tulle | 0 | 1,52 |
| 71 | 65 | Hautes-Pyrénées | 1 780 | 1 260 | 2 | Tarbes, Lourdes | 1 | 1,88 |
| 72 | 87 | Haute-Vienne | 1 710 | 1 020 | 1 | Limoges | 2 | 2,13 |
| 73 | 71 | Saône-et-Loire | 1 630 | 990 | 5 | Montceau-les-Mines, Chalon-sur-Saône, Saint-Marcel, Tournus, Le Creusot | 1 | 2,9 |
| 74 | 07 | Ardèche | 1 520 | 1 380 | 3 | Aubenas, Privas, Annonay | 0 | 2,56 |
| 75 | 53 | Mayenne | 1 510 | 890 | 1 | Laval | 0 | 1,77 |
| 76 | 88 | Vosges | 1 370 | 600 | 1 | Épinal | 0 | 3 |
| 77 | 32 | Gers | 1 360 | 980 | 1 | Auch | 1 | 1,77 |
| 78 | 46 | Lot | 1 320 | 1 050 | 2 | Cahors, Figeac | 0 | 0,72 |
| 79 | 01 | Ain | 1 310 | 600 | 2 | Bourg-en-Bresse, Oyonnax | 1 | 1,65 |
| 80 | 09 | Ariège | 1 250 | 1 110 | 3 | Pamiers, Saint-Girons, Foix | 0 | 7,87 |
| 81 | 25 | Doubs | 1 110 | 520 | 3 | Montbéliard, Besançon, Pontarlier | 0 | 1,99 |
| 82 | 39 | Jura | 1 020 | 210 | 2 | Dole, Lons-le-Saunier | 1 | 2,24 |
| 83 | 36 | Indre | 960 | 680 | 2 | Châteauroux, Saint-Maur | 0 | 3,33 |
| 84 | 08 | Ardennes | 950 | 640 | 2 | Rethel, Charleville-Mézières | 0 | 0,89 |
| 85 | 90 | Territoire de Belfort | 850 | 260 | 1 | Belfort | 0 | 2,08 |
| 86 | 58 | Nièvre | 770 | 390 | 1 | Nevers | 0 | 1,63 |
| 87 | 04 | Alpes-de-Haute-Provence | 750 | 640 | 1 | Manosque | 0 | 5,42 |
| 88 | 05 | Hautes-Alpes | 690 | 620 | 1 | Gap | 1 | 1,18 |
| 89 | 43 | Haute-Loire | 640 | 170 | 1 | Le Puy-en-Velay | 0 | 1,54 |
| 90 | 2A | Corse-du-Sud | 540 | 260 | 1 | Ajaccio | 1 | 3,58 |
| 91 | 23 | Creuse | 420 | 170 | 0 | — | 0 | 1,1 |
| 92 | 55 | Meuse | 350 | 210 | 1 | Verdun | 0 | 3,04 |
| 93 | 52 | Haute-Marne | 320 | 320 | 1 | Saint-Dizier | 0 | 1,43 |
| 94 | 70 | Haute-Saône | 280 | 0 | 1 | Vesoul | 0 | 4,86 |
| 95 | 2B | Haute-Corse | 210 | 210 | 1 | Bastia | 0 | 5,43 |
| 96 | 48 | Lozère | 140 | 0 | 0 | — | 0 | — |
| 97 | 971 | Guadeloupe | 110 | 0 | 1 | Baie-Mahault | 0 | — |

## 8. Mots-clés par section

Liste complète, avec historique mensuel, dans le JSON (clé `mots_cles`).

### 8.1 Pages métier (hubs) (60 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier |
|---|---|---|---|---|---|
| couvreur | 49 500 | 4,99 | 48 | non | Toiture & charpente |
| couvreur à proximité | 22 200 | 5,64 | 69 | non | Toiture & charpente |
| couvreur autour de moi | 18 100 | 5,81 | 32 | oui | Toiture & charpente |
| maçon | 12 100 | 2,38 | 56 | non | Maçonnerie & gros œuvre |
| maçon autour de moi | 12 100 | 2,32 | 74 | non | Maçonnerie & gros œuvre |
| maçon à proximité | 5 400 | 1,43 | 69 | non | Maçonnerie & gros œuvre |
| carreleur piscine | 5 400 | 0,47 | 57 | non | Piscine |
| entreprise de terrassement | 4 400 | 2,01 | 32 | oui | Terrassement & VRD |
| entreprise de maçon | 4 400 | 2,47 | 45 | non | Maçonnerie & gros œuvre |
| entreprises de terrassement | 4 400 | 2,01 | 68 | non | Terrassement & VRD |
| couvreur zingueur | 3 600 | 4,69 | 70 | non | Toiture & charpente |
| entreprise maçon autour de moi | 2 400 | 2,38 | 3 | oui | Maçonnerie & gros œuvre |
| artisans couvreur | 2 400 | 4,64 | 31 | oui | Toiture & charpente |
| artisan couvreur | 2 400 | 4,64 | 59 | non | Toiture & charpente |
| couvreur charpente | 2 400 | 4,42 | 67 | non | Toiture & charpente |
| couvreur charpentier | 2 400 | 4,42 | 73 | non | Toiture & charpente |
| artisan menuiserie | 1 900 | 2,93 | 85 | non | Menuiserie |
| artisan menuisier | 1 900 | 2,93 | 86 | non | Menuiserie |
| artisan maconnerie | 1 600 | 2,29 | 36 | non | Maçonnerie & gros œuvre |
| artisan maçon | 1 600 | 2,29 | 66 | non | Maçonnerie & gros œuvre |
| entreprises isolation extérieure | 1 300 | 7,27 | 59 | non | Isolation extérieure |
| entreprise isolation extérieure | 1 300 | 7,27 | 63 | non | Isolation extérieure |
| charpentier couvreur autour de moi | 1 300 | 4,26 | 46 | non | Toiture & charpente |
| charpentier toiture | 1 300 | 3,73 | 65 | non | Toiture & charpente |
| couvreur toitures | 1 000 | 6,65 | 26 | oui | Toiture & charpente |
| entreprise charpente | 1 000 | 5,74 | 42 | non | Toiture & charpente |
| couvreurs toiture | 1 000 | 6,65 | 56 | non | Toiture & charpente |
| couvreur zingueur autour de moi | 1 000 | 5,46 | 53 | non | Toiture & charpente |
| artisan menuisier autour de moi | 1 000 | 2,92 | 39 | non | Menuiserie |
| maçon général | 1 000 | 2,34 | — | non | Maçonnerie & gros œuvre |
| entreprise terrassement autour de moi | 1 000 | 2,73 | 77 | non | Terrassement & VRD |
| artisan couvreur autour de moi | 880 | 5,63 | 36 | non | Toiture & charpente |
| artisan maçon autour de moi | 880 | 2,16 | 63 | non | Maçonnerie & gros œuvre |
| entreprise de terrassement à proximité | 880 | 1,1 | 55 | non | Terrassement & VRD |
| entreprise toiture | 720 | 5,81 | 28 | oui | Toiture & charpente |
| entreprise de ravalement de facades | 720 | 3,9 | 30 | oui | Façade & ravalement |
| entreprises de ravalement de facade | 720 | 3,9 | 42 | non | Façade & ravalement |
| entreprise ravalement de façade | 720 | 3,9 | 54 | non | Façade & ravalement |
| maçon vrd | 720 | 1,89 | 84 | non | Terrassement & VRD |
| couvreur rge autour de moi | 480 | 5,9 | 48 | non | Toiture & charpente |
| artisan fenetres | 480 | 5,99 | 72 | non | Menuiserie |
| entreprises ravalement façades | 480 | 4,65 | 72 | non | Façade & ravalement |
| peintre ravalement | 480 | 2 | 49 | non | Façade & ravalement |
| artisan menuisier bois autour de moi | 480 | 1,91 | 53 | non | Menuiserie |
| artisan charpente | 390 | 7,76 | 54 | non | Toiture & charpente |
| artisan charpentier | 390 | 7,76 | 54 | non | Toiture & charpente |
| paysagiste piscine | 390 | 2,09 | 25 | oui | Piscine |
| paysagiste-pisciniste | 390 | 2,09 | 33 | oui | Piscine |
| couvreur macon | 390 | 0,7 | 45 | non | Toiture & charpente |
| artisan toiture | 320 | 11,02 | 38 | non | Toiture & charpente |
| maçon rénovation | 320 | 3,88 | 40 | non | Maçonnerie & gros œuvre |
| entreprise couvreur | 320 | 5,87 | 65 | non | Toiture & charpente |
| maçon travaux | 320 | 3,18 | 63 | non | Maçonnerie & gros œuvre |
| entreprise isolation extérieure autour de moi | 320 | 5,52 | 92 | non | Isolation extérieure |
| entreprise rge isolation extérieure | 260 | 11,3 | 68 | non | Isolation extérieure |
| couvreur zingueur à proximité | 260 | 5,85 | — | non | Toiture & charpente |
| entreprises charpente bois | 260 | 4,62 | 44 | non | Toiture & charpente |
| entreprise charpente bois | 260 | 4,62 | 46 | non | Toiture & charpente |
| artisan piscine | 260 | 2,18 | 35 | non | Piscine |
| artisan couvreur zingueur | 260 | 4,44 | 76 | non | Toiture & charpente |

### 8.2 Métier × département (nom ou numéro) (215 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier | Zone |
|---|---|---|---|---|---|---|
| couvreur paris | 3 600 | 2,83 | 43 | non | Toiture & charpente | Paris |
| couvreur dans le 91 | 1 900 | 3,14 | 14 | oui | Toiture & charpente | 91 (Essonne) |
| couvreur 91 | 1 900 | 3,14 | 22 | oui | Toiture & charpente | 91 (Essonne) |
| couvreur 77 | 1 300 | 3,56 | 14 | oui | Toiture & charpente | 77 (Seine-et-Marne) |
| couvreur dans le 77 | 1 300 | 3,56 | 32 | oui | Toiture & charpente | 77 (Seine-et-Marne) |
| couvreur 94 | 1 300 | 3,45 | 37 | non | Toiture & charpente | 94 (Val-de-Marne) |
| couvreur 93 | 1 300 | 3,45 | 41 | non | Toiture & charpente | 93 (Seine-Saint-Denis) |
| couvreur 78 | 1 300 | 4,1 | 52 | non | Toiture & charpente | 78 (Yvelines) |
| couvreur dans le 78 | 1 300 | 4,1 | 53 | non | Toiture & charpente | 78 (Yvelines) |
| couvreur 92 | 1 300 | 1,38 | 36 | non | Toiture & charpente | 92 (Hauts-de-Seine) |
| couvreur dans le 95 | 1 000 | 4,82 | 44 | non | Toiture & charpente | 95 (Val-d'Oise) |
| couvreur 95 | 1 000 | 4,82 | 49 | non | Toiture & charpente | 95 (Val-d'Oise) |
| paris toiture | 880 | 4,19 | 63 | non | Toiture & charpente | Paris |
| couvreur 45 | 880 | 1,4 | 56 | non | Toiture & charpente | 45 (Loiret) |
| couvreur 76 | 880 | 1,17 | 51 | non | Toiture & charpente | 76 (Seine-Maritime) |
| couvreur 56 | 720 | 3,32 | 60 | non | Toiture & charpente | 56 (Morbihan) |
| couvreur 28 | 720 | 2,02 | 47 | non | Toiture & charpente | 28 (Eure-et-Loir) |
| maçon paris | 720 | 1,36 | 82 | non | Maçonnerie & gros œuvre | Paris |
| couvreur 22 | 720 | 0,46 | 56 | non | Toiture & charpente | 22 (Côtes-d'Armor) |
| couvreur essonne | 590 | 8,37 | 19 | oui | Toiture & charpente | Essonne |
| couvreur charente | 590 | 2,99 | 53 | non | Toiture & charpente | Charente |
| couvreur 62 | 590 | 0,94 | 58 | non | Toiture & charpente | 62 (Pas-de-Calais) |
| couvreur gironde | 480 | 5,09 | 53 | non | Toiture & charpente | Gironde |
| couvreur oise | 480 | 5,27 | 56 | non | Toiture & charpente | Oise |
| couvreur 34 | 480 | 6,47 | 67 | non | Toiture & charpente | 34 (Hérault) |
| couvreur 44 | 480 | 3,31 | 53 | non | Toiture & charpente | 44 (Loire-Atlantique) |
| couvreur 66 | 480 | 3,16 | 53 | non | Toiture & charpente | 66 (Pyrénées-Orientales) |
| couvreur cantal | 480 | 4,24 | 74 | non | Toiture & charpente | Cantal |
| couvreur ile de-france | 480 | 3,51 | 77 | non | Toiture & charpente | Île-de-France |
| couvreur 27 | 480 | 2,2 | 59 | non | Toiture & charpente | 27 (Eure) |
| couvreur 86 | 480 | 1,51 | 53 | non | Toiture & charpente | 86 (Vienne) |
| couvreur 83 | 390 | 4,95 | 20 | oui | Toiture & charpente | 83 (Var) |
| couvreur 06 | 390 | 4,88 | 21 | oui | Toiture & charpente | 06 (Alpes-Maritimes) |
| couvreur yvelines | 390 | 6,38 | 55 | non | Toiture & charpente | Yvelines |
| couvreur aude | 390 | 3,47 | 50 | non | Toiture & charpente | Aude |
| ravalement 91 | 390 | 2,23 | 37 | non | Façade & ravalement | 91 (Essonne) |
| couvreur 63 | 390 | 1,5 | 55 | non | Toiture & charpente | 63 (Puy-de-Dôme) |
| couvreur 59 | 390 | 0,85 | 57 | non | Toiture & charpente | 59 (Nord) |
| couvreur 67 | 390 | 0,57 | 64 | non | Toiture & charpente | 67 (Bas-Rhin) |
| couvreur 85 | 390 | 0,27 | 51 | non | Toiture & charpente | 85 (Vendée) |
| couvreur 13 | 320 | 3,19 | 20 | oui | Toiture & charpente | 13 (Bouches-du-Rhône) |
| couvreur 60 | 320 | 5,56 | 49 | non | Toiture & charpente | 60 (Oise) |
| couvreur 84 | 320 | 3 | 40 | non | Toiture & charpente | 84 (Vaucluse) |
| couvreur 04 | 320 | 5,42 | 61 | non | Toiture & charpente | 04 (Alpes-de-Haute-Provence) |
| couvreur var | 320 | 4,68 | 63 | non | Toiture & charpente | Var |
| paris charpente | 320 | 6,02 | 82 | non | Toiture & charpente | Paris |
| couvreur 31 | 320 | 1,81 | 40 | non | Toiture & charpente | 31 (Haute-Garonne) |
| couvreur sarthe | 320 | 2,89 | 58 | non | Toiture & charpente | Sarthe |
| couvreur loiret | 320 | 2,01 | 50 | non | Toiture & charpente | Loiret |
| couvreur calvados | 320 | 2,02 | 58 | non | Toiture & charpente | Calvados |
| couvreur 33 | 320 | 2,06 | 60 | non | Toiture & charpente | 33 (Gironde) |
| couvreur 35 | 320 | 0,86 | 51 | non | Toiture & charpente | 35 (Ille-et-Vilaine) |
| couvreur 37 | 320 | 0,77 | 63 | non | Toiture & charpente | 37 (Indre-et-Loire) |
| couvreur gard | 260 | 6,01 | 36 | non | Toiture & charpente | Gard |
| couvreur val d oise | 260 | 9,22 | 50 | non | Toiture & charpente | Val-d'Oise |
| terrassement landes | 260 | 3,7 | 42 | non | Terrassement & VRD | Landes |
| couvreur 79 | 260 | 4,53 | 50 | non | Toiture & charpente | 79 (Deux-Sèvres) |
| couvreur charente maritime | 260 | 4,11 | 53 | non | Toiture & charpente | Charente-Maritime |
| couvreur seine-et-marne | 260 | 5,97 | 70 | non | Toiture & charpente | Seine-et-Marne |
| couvreur gers | 260 | 1,77 | 38 | non | Toiture & charpente | Gers |
| couvreur 74 | 260 | 2,14 | 45 | non | Toiture & charpente | 74 (Haute-Savoie) |
| couvreur 49 | 260 | 1,94 | 49 | non | Toiture & charpente | 49 (Maine-et-Loire) |
| couvreur 41 | 260 | 2,83 | 70 | non | Toiture & charpente | 41 (Loir-et-Cher) |
| couvreur aveyron | 260 | 1,97 | 60 | non | Toiture & charpente | Aveyron |
| couvreur occitanie | 260 | 1,7 | 61 | non | Toiture & charpente | Occitanie |
| couvreur morbihan | 260 | 1,63 | 61 | non | Toiture & charpente | Morbihan |
| couvreur 71 | 260 | 0,8 | 37 | non | Toiture & charpente | 71 (Saône-et-Loire) |
| couvreur vendée | 260 | 1,46 | 67 | non | Toiture & charpente | Vendée |
| couvreur 03 | 260 | 0,93 | 52 | non | Toiture & charpente | 03 (Allier) |
| couvreur 80 | 260 | 0,19 | 40 | non | Toiture & charpente | 80 (Somme) |
| vosges charpente | 260 | 0,51 | 82 | non | Toiture & charpente | Vosges |
| couvreur 82 | 210 | 4,68 | 32 | oui | Toiture & charpente | 82 (Tarn-et-Garonne) |
| couvreur normandie | 210 | 8,07 | 52 | non | Toiture & charpente | Normandie |
| couvreur 17 | 210 | 6,25 | 45 | non | Toiture & charpente | 17 (Charente-Maritime) |
| couvreur val-de-marne | 210 | 8,62 | 62 | non | Toiture & charpente | Val-de-Marne |
| couvreur 30 | 210 | 3,7 | 38 | non | Toiture & charpente | 30 (Gard) |
| couvreur 89 | 210 | 4,03 | 46 | non | Toiture & charpente | 89 (Yonne) |
| couvreur vaucluse | 210 | 3,6 | 53 | non | Toiture & charpente | Vaucluse |
| couvreur dordogne | 210 | 3,46 | 62 | non | Toiture & charpente | Dordogne |
| couvreur 36 | 210 | 2,66 | 53 | non | Toiture & charpente | 36 (Indre) |
| couvreur allier | 210 | 2,87 | 58 | non | Toiture & charpente | Allier |
| couvreur haut rhin | 210 | 2,51 | 54 | non | Toiture & charpente | Haut-Rhin |
| couvreur cosne sur loire | 210 | 2,68 | 68 | non | Toiture & charpente | Loire |
| couvreur 02 | 210 | 1,5 | 60 | non | Toiture & charpente | 02 (Aisne) |
| couvreur 57 | 210 | 0,94 | 44 | non | Toiture & charpente | 57 (Moselle) |
| couvreur 29 | 210 | 1,41 | 59 | non | Toiture & charpente | 29 (Finistère) |
| couvreur haute savoie | 210 | 1,21 | 68 | non | Toiture & charpente | Haute-Savoie |
| couvreur 01 | 210 | 0,19 | 43 | non | Toiture & charpente | 01 (Ain) |
| couvreur 61 | 210 | 0 | 46 | non | Toiture & charpente | 61 (Orne) |
| couvreur vienne | 170 | 4,37 | 46 | non | Toiture & charpente | Vienne |
| couvreur aube | 170 | 5,33 | 56 | non | Toiture & charpente | Aube |
| couvreur 51 | 170 | 2,26 | 46 | non | Toiture & charpente | 51 (Marne) |
| couvreur mayenne | 170 | 2,22 | 60 | non | Toiture & charpente | Mayenne |
| couvreur creuse | 170 | 2,07 | 68 | non | Toiture & charpente | Creuse |
| couvreur dans la somme | 170 | 1,43 | 61 | non | Toiture & charpente | Somme |
| couvreur somme | 170 | 1,43 | 72 | non | Toiture & charpente | Somme |
| ravalement de facade haut rhin | 170 | 0,45 | 41 | non | Façade & ravalement | Haut-Rhin |
| couvreur 42 | 170 | 0,05 | 56 | non | Toiture & charpente | 42 (Loire) |
| couvreur 88 | 170 | 0 | 66 | non | Toiture & charpente | 88 (Vosges) |
| oise terrassement | 170 | 0,43 | 93 | non | Terrassement & VRD | Oise |
| maçon morbihan | 140 | 4,57 | 49 | non | Maçonnerie & gros œuvre | Morbihan |
| maçon sarthe | 140 | 1,22 | 47 | non | Maçonnerie & gros œuvre | Sarthe |
| maçon vaucluse | 140 | 1 | 60 | non | Maçonnerie & gros œuvre | Vaucluse |
| maçon 63 | 140 | 0 | 61 | non | Maçonnerie & gros œuvre | 63 (Puy-de-Dôme) |
| surélévation paris | 110 | 12,19 | 63 | non | Extension & surélévation | Paris |
| maçon 91 | 110 | 4,55 | 50 | non | Maçonnerie & gros œuvre | 91 (Essonne) |
| maçon 77 | 110 | 4,38 | 57 | non | Maçonnerie & gros œuvre | 77 (Seine-et-Marne) |
| maçon charente | 110 | 2,84 | 53 | non | Maçonnerie & gros œuvre | Charente |
| maçon dordogne | 110 | 1,36 | 57 | non | Maçonnerie & gros œuvre | Dordogne |
| maçon ardennes | 110 | 0,36 | 48 | non | Maçonnerie & gros œuvre | Ardennes |
| bourgogne sud tp terrassement assainissement et démolition | 110 | 0 | — | non | Terrassement & VRD | Bourgogne |
| maçon creuse | 110 | 0,14 | 86 | non | Maçonnerie & gros œuvre | Creuse |
| maçon essonne | 90 | 3,51 | 45 | non | Maçonnerie & gros œuvre | Essonne |
| maçon charente-maritime | 90 | 1,92 | 50 | non | Maçonnerie & gros œuvre | Charente-Maritime |
| maçon haut rhin | 90 | 2,49 | 66 | non | Maçonnerie & gros œuvre | Haut-Rhin |
| maçon vienne | 90 | 1,97 | 56 | non | Maçonnerie & gros œuvre | Vienne |
| ravalement de façades paris | 90 | 0,76 | — | non | Façade & ravalement | Paris |
| maçon eure et loir | 90 | 1,05 | 62 | non | Maçonnerie & gros œuvre | Eure-et-Loir |
| ravalement de façade paris | 90 | 0,76 | 53 | non | Façade & ravalement | Paris |
| ravalement de facade 91 | 70 | 22,77 | 40 | non | Façade & ravalement | 91 (Essonne) |
| terrassement essonne | 70 | 16,05 | 39 | non | Terrassement & VRD | Essonne |
| terrassement 91 | 70 | 9,05 | 39 | non | Terrassement & VRD | 91 (Essonne) |
| isolation extérieure sarthe | 70 | 11,39 | 47 | non | Isolation extérieure | Sarthe |
| maçon finistère | 70 | 10,27 | 47 | non | Maçonnerie & gros œuvre | Finistère |
| couverture ravalement 29 | 70 | 3,07 | 43 | non | Toiture & charpente | 29 (Finistère) |
| couvertures ravalement 29 | 70 | 3,07 | 63 | non | Toiture & charpente | 29 (Finistère) |
| surélévation 33 | 70 | 2,26 | 51 | non | Extension & surélévation | 33 (Gironde) |
| maçon haute loire | 70 | 1,54 | 51 | non | Maçonnerie & gros œuvre | Haute-Loire |
| maçon loir-et-cher | 70 | 1,64 | 59 | non | Maçonnerie & gros œuvre | Loir-et-Cher |
| provence ravalement peinture | 70 | 2,98 | 92 | non | Façade & ravalement | Provence |
| bové isolation extérieure ravalement bardage vosges | 70 | 2,74 | 90 | non | Façade & ravalement | Vosges |
| ravalement paris | 70 | 1,08 | 54 | non | Façade & ravalement | Paris |
| terrassement var | 70 | 0 | 47 | non | Terrassement & VRD | Var |
| viveo surélévation de toiture lyon & auvergne rhône alpes | 70 | 0 | — | non | Toiture & charpente | Auvergne-Rhône-Alpes |
| terrassement idf | 70 | 0 | 55 | non | Terrassement & VRD | Île-de-France |
| terrassement 54 | 70 | 0 | 74 | non | Terrassement & VRD | 54 (Meurthe-et-Moselle) |
| loir et cher ravalement | 70 | 0 | 92 | non | Façade & ravalement | Loir-et-Cher |
| isolation extérieure haut-rhin | 50 | 16,5 | 20 | oui | Isolation extérieure | Haut-Rhin |
| terrassement 77 | 50 | 10,71 | 47 | non | Terrassement & VRD | 77 (Seine-et-Marne) |
| entreprise terrassement 77 | 50 | 4,45 | 43 | non | Terrassement & VRD | 77 (Seine-et-Marne) |
| terrassement loiret | 50 | 1,37 | 46 | non | Terrassement & VRD | Loiret |
| terrassement 37 | 50 | 0,61 | 27 | non | Terrassement & VRD | 37 (Indre-et-Loire) |
| entreprise ravalement paris | 50 | 0,62 | 53 | non | Façade & ravalement | Paris |
| expert terrassement normandie | 50 | 0 | — | non | Terrassement & VRD | Normandie |
| ravalement 95 | 40 | 73,38 | 22 | non | Façade & ravalement | 95 (Val-d'Oise) |
| isolation extérieure morbihan | 40 | 9,31 | 19 | non | Isolation extérieure | Morbihan |
| isolation extérieure bretagne | 40 | 7,27 | 38 | non | Isolation extérieure | Bretagne |
| terrassement 78 | 40 | 2,02 | 25 | non | Terrassement & VRD | 78 (Yvelines) |
| vendee terrassement moreau batiment | 40 | 3,77 | — | non | Terrassement & VRD | Vendée |
| ravalement de façade sarthe | 40 | 2,59 | 41 | non | Façade & ravalement | Sarthe |
| terrassement 17 | 40 | 1,22 | 48 | non | Terrassement & VRD | 17 (Charente-Maritime) |
| terrassement gard | 40 | 1,11 | 48 | non | Terrassement & VRD | Gard |
| surélévation immeuble paris | 40 | 0 | 42 | non | Extension & surélévation | Paris |
| occitanie terrassement | 40 | 0 | — | non | Terrassement & VRD | Occitanie |
| ravalement 78 | 30 | 9,29 | 17 | non | Façade & ravalement | 78 (Yvelines) |
| terrassement vendee | 30 | 11,42 | 31 | non | Terrassement & VRD | Vendée |
| architecte surélévation paris | 30 | 13,39 | 44 | non | Extension & surélévation | Paris |
| isolation extérieure paris | 30 | 8,69 | 44 | non | Isolation extérieure | Paris |
| entreprise terrassement 91 | 30 | 4,09 | 44 | non | Terrassement & VRD | 91 (Essonne) |
| terrassement aube | 30 | 2,65 | 34 | non | Terrassement & VRD | Aube |
| terrassement calvados | 30 | 1,94 | 28 | non | Terrassement & VRD | Calvados |
| entreprise terrassement var | 30 | 3,19 | 48 | non | Terrassement & VRD | Var |
| terrassement 06 | 30 | 2,05 | 35 | non | Terrassement & VRD | 06 (Alpes-Maritimes) |
| terrassement corse | 30 | 2,1 | — | non | Terrassement & VRD | Corse |
| entreprise terrassement loiret | 30 | 1,41 | 40 | non | Terrassement & VRD | Loiret |
| terrassement haute savoie | 30 | 0,55 | 25 | non | Terrassement & VRD | Haute-Savoie |
| terrassement dordogne | 30 | 0 | 13 | non | Terrassement & VRD | Dordogne |
| ravalement 94 | 30 | 0 | 21 | non | Façade & ravalement | 94 (Val-de-Marne) |
| terrassement paris | 30 | 0 | 24 | non | Terrassement & VRD | Paris |
| ravalement façade vaucluse | 30 | 0 | 30 | non | Façade & ravalement | Vaucluse |
| terrassement sarthe | 30 | 0 | 28 | non | Terrassement & VRD | Sarthe |
| ravalement 77 | 30 | 0 | 34 | non | Façade & ravalement | 77 (Seine-et-Marne) |
| terrassement ardennes | 30 | 0 | 36 | non | Terrassement & VRD | Ardennes |
| terrassement vosges | 30 | 0 | 41 | non | Terrassement & VRD | Vosges |
| surélévation vendée | 30 | 0 | 42 | non | Extension & surélévation | Vendée |
| ravalement de façade vosges | 30 | 0 | 48 | non | Façade & ravalement | Vosges |
| ravalement 41 | 30 | 0 | 46 | non | Façade & ravalement | 41 (Loir-et-Cher) |
| entreprise terrassement oise | 30 | 0 | 49 | non | Terrassement & VRD | Oise |
| terrassement charente | 30 | 0 | 48 | non | Terrassement & VRD | Charente |
| yvelines ravalement | 30 | 0 | — | non | Façade & ravalement | Yvelines |
| couvreur zingueur frederic charpentier maçonnerie ravalement façade 77 | 30 | 0 | — | non | Toiture & charpente | 77 (Seine-et-Marne) |
| ravalement de façade 45 | 30 | 0 | — | non | Façade & ravalement | 45 (Loiret) |
| entreprise isolation extérieure maine et loire | 30 | 0 | 50 | non | Isolation extérieure | Maine-et-Loire |
| littoral terrassement 85 | 30 | 0 | — | non | Terrassement & VRD | 85 (Vendée) |
| terrassement tarn | 30 | 0 | — | non | Terrassement & VRD | Tarn |
| provence terrassement | 30 | 0 | — | non | Terrassement & VRD | Provence |
| ravalement essonne | 20 | 33 | 24 | non | Façade & ravalement | Essonne |
| isolation extérieure alsace | 20 | 12,77 | 16 | non | Isolation extérieure | Alsace |
| isolation extérieure haute-savoie | 20 | 15,68 | 34 | non | Isolation extérieure | Haute-Savoie |
| entreprise ravalement de facade 59 | 20 | 4,51 | 10 | non | Façade & ravalement | 59 (Nord) |
| ravalement facade vendee | 20 | 4,31 | 14 | non | Façade & ravalement | Vendée |
| ravalement de façade 44 | 20 | 17,06 | — | non | Façade & ravalement | 44 (Loire-Atlantique) |
| terrassement moselle | 20 | 7,28 | 31 | non | Terrassement & VRD | Moselle |
| isolation extérieure oise | 20 | 13,33 | — | non | Isolation extérieure | Oise |
| isolation extérieure vosges | 20 | 8,07 | 41 | non | Isolation extérieure | Vosges |
| ravalement 93 | 20 | 4,86 | 39 | non | Façade & ravalement | 93 (Seine-Saint-Denis) |
| entreprise de terrassement 78 | 20 | 4,62 | 44 | non | Terrassement & VRD | 78 (Yvelines) |
| entreprise de ravalement ile de france | 20 | 5,13 | — | non | Façade & ravalement | Île-de-France |
| entreprise isolation extérieure loire-atlantique | 20 | 4,77 | 48 | non | Isolation extérieure | Loire-Atlantique |
| isolation extérieure maine et loire | 20 | 3,34 | — | non | Isolation extérieure | Maine-et-Loire |
| ravalement vendee | 20 | 0,61 | 26 | non | Façade & ravalement | Vendée |
| ravalement 45 | 20 | 1,17 | — | non | Façade & ravalement | 45 (Loiret) |
| surélévation 44 | 20 | 0 | 37 | non | Extension & surélévation | 44 (Loire-Atlantique) |
| entreprise ravalement 91 | 20 | 0 | 44 | non | Façade & ravalement | 91 (Essonne) |
| isolation extérieure loire-atlantique | 20 | 0 | 44 | non | Isolation extérieure | Loire-Atlantique |
| isolation extérieure moselle | 20 | 0 | 42 | non | Isolation extérieure | Moselle |
| bretagne ravalement | 20 | 0 | — | non | Façade & ravalement | Bretagne |
| ravalement 33 | 20 | 0 | — | non | Façade & ravalement | 33 (Gironde) |
| ravalement façade 49 | 20 | 0 | — | non | Façade & ravalement | 49 (Maine-et-Loire) |
| fiche ravalement paris | 20 | 0 | — | non | Façade & ravalement | Paris |
| isolation extérieure val d'oise | 20 | 0 | — | non | Isolation extérieure | Val-d'Oise |
| entreprise terrassement vosges | 20 | 0 | 48 | non | Terrassement & VRD | Vosges |
| surélévation maison paris | 20 | 0 | — | non | Extension & surélévation | Paris |
| viveo surélévation de toiture bordeaux & nouvelle aquitaine | 20 | 0 | — | non | Toiture & charpente | Nouvelle-Aquitaine |
| loir et cher terrassement | 20 | 0 | 90 | non | Terrassement & VRD | Loir-et-Cher |

### 8.3 Métier × ville (volume d’au moins 90) (692 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier | Zone |
|---|---|---|---|---|---|---|
| couvreur bordeaux | 5 400 | 6,13 | 49 | non | Toiture & charpente | Bordeaux |
| couvreur bordelais | 5 400 | 6,13 | 56 | non | Toiture & charpente | Bordeaux |
| couvreur nantes | 4 400 | 3,61 | 32 | oui | Toiture & charpente | Nantes |
| couvreur lille | 4 400 | 4,5 | 45 | non | Toiture & charpente | Lille |
| couvreur marseille | 3 600 | 5,7 | 49 | non | Toiture & charpente | Marseille |
| couvreur parisien | 3 600 | 2,83 | 33 | oui | Toiture & charpente | Paris |
| couvreur montpellier | 3 600 | 5,63 | 57 | non | Toiture & charpente | Montpellier |
| couvreur toulouse | 3 600 | 3,82 | 46 | non | Toiture & charpente | Toulouse |
| couvreur saint etienne | 3 600 | 3,36 | 52 | non | Toiture & charpente | Saint-Étienne |
| couvreur lyon | 3 600 | 2,87 | 69 | non | Toiture & charpente | Lyon |
| couvreur brest | 2 900 | 4,04 | 45 | non | Toiture & charpente | Brest |
| couvreur quimper | 2 900 | 3,09 | 51 | non | Toiture & charpente | Quimper |
| couvreur clermont-ferrand | 2 900 | 2,41 | 52 | non | Toiture & charpente | Clermont-Ferrand |
| couvreur nice | 2 400 | 6,64 | 45 | non | Toiture & charpente | Nice |
| couvreur perpignan | 2 400 | 6,3 | 44 | non | Toiture & charpente | Perpignan |
| couvreur rouen | 2 400 | 3,22 | 54 | non | Toiture & charpente | Rouen |
| couvreur rennes | 2 400 | 1,62 | 45 | non | Toiture & charpente | Rennes |
| couvreur le mans | 2 400 | 1,93 | 54 | non | Toiture & charpente | Le Mans |
| couvreur orleans | 1 900 | 5,51 | 39 | non | Toiture & charpente | Orléans |
| couvreur amiens | 1 900 | 4,09 | 36 | non | Toiture & charpente | Amiens |
| couvreur toulon | 1 900 | 5,4 | 44 | non | Toiture & charpente | Toulon |
| couvreur albi | 1 900 | 4,18 | 41 | non | Toiture & charpente | Albi |
| couvreur lorient | 1 900 | 3,51 | 42 | non | Toiture & charpente | Lorient |
| couvreur la rochelle | 1 900 | 3,42 | 47 | non | Toiture & charpente | La Rochelle |
| couvreur caen | 1 900 | 1,55 | 61 | non | Toiture & charpente | Caen |
| couvreur valenciennes | 1 600 | 5,05 | 35 | non | Toiture & charpente | Valenciennes |
| couvreur tours | 1 600 | 3,04 | 25 | oui | Toiture & charpente | Tours |
| couvreur valence | 1 600 | 5,06 | 44 | non | Toiture & charpente | Valence |
| couvreur nimes | 1 600 | 4,41 | 40 | non | Toiture & charpente | Nîmes |
| couvreur vannes | 1 600 | 2,46 | 46 | non | Toiture & charpente | Vannes |
| couvreur montauban | 1 600 | 2,49 | 49 | non | Toiture & charpente | Montauban |
| couvreur arras | 1 600 | 2,65 | 71 | non | Toiture & charpente | Arras |
| couvreur aix-en-provence | 1 300 | 4,91 | 26 | oui | Toiture & charpente | Aix-en-Provence |
| couvreur beziers | 1 300 | 7,5 | 51 | non | Toiture & charpente | Béziers |
| couvreur royan | 1 300 | 5,73 | 43 | non | Toiture & charpente | Royan |
| couvreur angers | 1 300 | 2,95 | 28 | oui | Toiture & charpente | Angers |
| couvreur strasbourg | 1 300 | 2,46 | 25 | oui | Toiture & charpente | Strasbourg |
| couvreur avignon | 1 300 | 5,39 | 48 | non | Toiture & charpente | Avignon |
| couvreur la roche sur yon | 1 300 | 3,96 | 40 | non | Toiture & charpente | La Roche-sur-Yon |
| couvreur pau | 1 300 | 3,93 | 40 | non | Toiture & charpente | Pau |
| couvreur saint nazaire | 1 300 | 5,64 | 52 | non | Toiture & charpente | Saint-Nazaire |
| couvreur cholet | 1 300 | 3,46 | 43 | non | Toiture & charpente | Cholet |
| couvreur annecy | 1 300 | 2,36 | 36 | non | Toiture & charpente | Annecy |
| couvreur reims | 1 300 | 3,25 | 47 | non | Toiture & charpente | Reims |
| couvreur bourges | 1 300 | 3,06 | 49 | non | Toiture & charpente | Bourges |
| couvreur narbonne | 1 300 | 4,66 | 67 | non | Toiture & charpente | Narbonne |
| couvreur montluçon | 1 300 | 1,78 | 38 | non | Toiture & charpente | Montluçon |
| couvreur versailles | 1 300 | 3,76 | 71 | non | Toiture & charpente | Versailles |
| couvreur fontenay-le-comte | 1 300 | 2,51 | 58 | non | Toiture & charpente | Fontenay-le-Comte |
| couvreur aurillac | 1 300 | 2,75 | 78 | non | Toiture & charpente | Aurillac |
| couvreur cannes | 1 000 | 10,51 | 41 | non | Toiture & charpente | Cannes |
| couvreur montreuil | 1 000 | 10,53 | 44 | non | Toiture & charpente | Montreuil |
| couvreur antibes | 1 000 | 9,25 | 45 | non | Toiture & charpente | Antibes |
| couvreur lunel | 1 000 | 5,43 | 39 | non | Toiture & charpente | Lunel |
| couvreur carcassonne | 1 000 | 5,63 | 43 | non | Toiture & charpente | Carcassonne |
| couvreur metz | 1 000 | 2,42 | 24 | oui | Toiture & charpente | Metz |
| couvreur dijon | 1 000 | 3,07 | 32 | oui | Toiture & charpente | Dijon |
| couvreur aubenas | 1 000 | 6,16 | 54 | non | Toiture & charpente | Aubenas |
| couvreur bergerac | 1 000 | 3,21 | 35 | oui | Toiture & charpente | Bergerac |
| couvreur dunkerque | 1 000 | 4,61 | 46 | non | Toiture & charpente | Dunkerque |
| couvreur guingamp | 1 000 | 3,79 | 44 | non | Toiture & charpente | Guingamp |
| couvreur grenoble | 1 000 | 4,13 | 47 | non | Toiture & charpente | Grenoble |
| couvreur saint-brieuc | 1 000 | 3,39 | 45 | non | Toiture & charpente | Saint-Brieuc |
| couvreur calais | 1 000 | 4,69 | 59 | non | Toiture & charpente | Calais |
| couvreur dinan | 1 000 | 2,21 | 36 | non | Toiture & charpente | Dinan |
| couvreur niort | 1 000 | 2,72 | 51 | non | Toiture & charpente | Niort |
| couvreur angoulême | 1 000 | 1,19 | 37 | non | Toiture & charpente | Angoulême |
| couvreur vichy | 1 000 | 0,99 | 44 | non | Toiture & charpente | Vichy |
| couvreur argenteuil | 880 | 9,85 | 42 | non | Toiture & charpente | Argenteuil |
| couvreur cherbourg | 880 | 4,38 | 27 | oui | Toiture & charpente | Cherbourg-en-Cotentin |
| couvreur pessac | 880 | 7,3 | 47 | non | Toiture & charpente | Pessac |
| couvreur ales | 880 | 6,72 | 49 | non | Toiture & charpente | Alès |
| couvreur les sables d olonne | 880 | 6,17 | 51 | non | Toiture & charpente | Les Sables-d'Olonne |
| couvreur nancy | 880 | 3,24 | 33 | oui | Toiture & charpente | Nancy |
| couvreur fontainebleau | 880 | 5,25 | 48 | non | Toiture & charpente | Fontainebleau |
| couvreur cahors | 880 | 4,01 | 45 | non | Toiture & charpente | Cahors |
| couvreur saint maur des fosses | 880 | 3,34 | 40 | non | Toiture & charpente | Saint-Maur-des-Fossés |
| couvreur cognac | 880 | 3,53 | 42 | non | Toiture & charpente | Cognac |
| couvreur lens | 880 | 3,14 | 39 | non | Toiture & charpente | Lens |
| couvreur limoges | 880 | 2,57 | 34 | oui | Toiture & charpente | Limoges |
| couvreur mulhouse | 880 | 1,52 | 23 | oui | Toiture & charpente | Mulhouse |
| couvreur saint-quentin | 880 | 3,25 | 47 | non | Toiture & charpente | Saint-Quentin |
| couvreur auxerre | 880 | 2,27 | 40 | non | Toiture & charpente | Auxerre |
| couvreur tarbes | 880 | 2,82 | 50 | non | Toiture & charpente | Tarbes |
| couvreur poitiers | 880 | 2,53 | 49 | non | Toiture & charpente | Poitiers |
| couvreur troyes | 880 | 1,25 | 50 | non | Toiture & charpente | Troyes |
| couvreur clamart | 720 | 14 | 41 | non | Toiture & charpente | Clamart |
| couvreur cagnes sur mer | 720 | 10,68 | 37 | non | Toiture & charpente | Cagnes-sur-Mer |
| couvreur grasse | 720 | 12,15 | 43 | non | Toiture & charpente | Grasse |
| couvreur le havre | 720 | 5,75 | 33 | oui | Toiture & charpente | Le Havre |
| couvreur castres | 720 | 6,53 | 38 | non | Toiture & charpente | Castres |
| couvreur meaux | 720 | 9,68 | 53 | non | Toiture & charpente | Meaux |
| couvreur melun | 720 | 7,04 | 48 | non | Toiture & charpente | Melun |
| couvreur frejus | 720 | 5,72 | 44 | non | Toiture & charpente | Fréjus |
| couvreur thionville | 720 | 4,27 | 35 | non | Toiture & charpente | Thionville |
| couvreur saint-herblain | 720 | 6,38 | 53 | non | Toiture & charpente | Saint-Herblain |
| couvreur lannion | 720 | 3,93 | 40 | non | Toiture & charpente | Lannion |
| couvreur chartres | 720 | 3,52 | 38 | non | Toiture & charpente | Chartres |
| couvreur concarneau | 720 | 4,39 | 45 | non | Toiture & charpente | Concarneau |
| couvreur orvault | 720 | 4,73 | 57 | non | Toiture & charpente | Orvault |
| couvreur auch | 720 | 2,29 | 34 | oui | Toiture & charpente | Auch |
| couvreur dieppe | 720 | 3,53 | 47 | non | Toiture & charpente | Dieppe |
| couvreur morlaix | 720 | 2,51 | 37 | non | Toiture & charpente | Morlaix |
| couvreur saint-malo | 720 | 3,73 | 50 | non | Toiture & charpente | Saint-Malo |
| couvreur compiegne | 720 | 4,16 | 62 | non | Toiture & charpente | Compiègne |
| couvreur quimperlé | 720 | 1,76 | 50 | non | Toiture & charpente | Quimperlé |
| couvreur laval | 720 | 1,62 | 48 | non | Toiture & charpente | Laval |
| couvreur bayonne | 720 | 1,44 | 44 | non | Toiture & charpente | Bayonne |
| maçon marseille | 720 | 3,08 | 75 | non | Maçonnerie & gros œuvre | Marseille |
| couvreur laon | 720 | 1,52 | 56 | non | Toiture & charpente | Laon |
| couvreur chantilly | 590 | 5,43 | 34 | oui | Toiture & charpente | Chantilly |
| couvreur merignac | 590 | 6,68 | 42 | non | Toiture & charpente | Mérignac |
| couvreur douai | 590 | 5,86 | 39 | non | Toiture & charpente | Douai |
| couvreur granville | 590 | 4,14 | 31 | oui | Toiture & charpente | Granville |
| couvreur tourcoing | 590 | 6,14 | 43 | non | Toiture & charpente | Tourcoing |
| couvreur sens | 590 | 4,91 | 38 | non | Toiture & charpente | Sens |
| couvreur libourne | 590 | 5,71 | 45 | non | Toiture & charpente | Libourne |
| couvreur saintes | 590 | 3,11 | 30 | oui | Toiture & charpente | Saintes |
| couvreur pamiers | 590 | 7,78 | 59 | non | Toiture & charpente | Pamiers |
| couvreur beauvais | 590 | 5,94 | 50 | non | Toiture & charpente | Beauvais |
| couvreur agde | 590 | 4,63 | 44 | non | Toiture & charpente | Agde |
| couvreur montargis | 590 | 5,1 | 48 | non | Toiture & charpente | Montargis |
| couvreur haubourdin | 590 | 5,67 | 58 | non | Toiture & charpente | Haubourdin |
| couvreur vierzon | 590 | 3,56 | 47 | non | Toiture & charpente | Vierzon |
| couvreur agen | 590 | 3,26 | 50 | non | Toiture & charpente | Agen |
| charpente cambrai | 590 | 8,03 | 90 | non | Toiture & charpente | Cambrai |
| maçon toulouse | 590 | 3,69 | 56 | non | Maçonnerie & gros œuvre | Toulouse |
| couvreur abbeville | 590 | 2,77 | 48 | non | Toiture & charpente | Abbeville |
| couvreur blois | 590 | 2,24 | 45 | non | Toiture & charpente | Blois |
| couvreur vernon | 590 | 1,98 | 52 | non | Toiture & charpente | Vernon |
| couvreur brive | 590 | 1,41 | 45 | non | Toiture & charpente | Brive-la-Gaillarde |
| couvreur rodez | 590 | 1,08 | 46 | non | Toiture & charpente | Rodez |
| maçon saint lo | 590 | 0,5 | 44 | non | Maçonnerie & gros œuvre | Saint-Lô |
| couvreur bois colombes les ateliers de la couverture | 590 | 0 | 74 | non | Toiture & charpente | Bois-Colombes |
| couvreur talence | 480 | 10,07 | 34 | oui | Toiture & charpente | Talence |
| couvreur rueil malmaison | 480 | 10,69 | 46 | non | Toiture & charpente | Rueil-Malmaison |
| couvreur challans | 480 | 4,71 | 24 | oui | Toiture & charpente | Challans |
| couvreur cambrai | 480 | 6,01 | 30 | oui | Toiture & charpente | Cambrai |
| couvreur roanne | 480 | 6,23 | 33 | oui | Toiture & charpente | Roanne |
| couvreur mougins | 480 | 9,98 | 47 | non | Toiture & charpente | Mougins |
| couvreur colombes | 480 | 7,84 | 40 | non | Toiture & charpente | Colombes |
| couvreur roubaix | 480 | 8,27 | 45 | non | Toiture & charpente | Roubaix |
| couvreur antony | 480 | 8,82 | 47 | non | Toiture & charpente | Antony |
| couvreur saint-germain en laye | 480 | 9,38 | 50 | non | Toiture & charpente | Saint-Germain-en-Laye |
| couvreur dax | 480 | 2,94 | 26 | oui | Toiture & charpente | Dax |
| couvreur lanester | 480 | 4,72 | 40 | non | Toiture & charpente | Lanester |
| couvreur argentan | 480 | 4,64 | 41 | non | Toiture & charpente | Argentan |
| couvreur auray | 480 | 3,41 | 34 | oui | Toiture & charpente | Auray |
| couvreur chelles | 480 | 4,72 | 46 | non | Toiture & charpente | Chelles |
| couvreur trignac | 480 | 4,23 | 52 | non | Toiture & charpente | Trignac |
| couvreur bayeux | 480 | 2,82 | 40 | non | Toiture & charpente | Bayeux |
| couvreur douarnenez | 480 | 3,28 | 46 | non | Toiture & charpente | Douarnenez |
| couvreur annemasse | 480 | 2,59 | 39 | non | Toiture & charpente | Annemasse |
| couvreur rezé | 480 | 3,05 | 45 | non | Toiture & charpente | Rezé |
| couvreur boulogne sur-mer | 480 | 2,6 | 45 | non | Toiture & charpente | Boulogne-sur-Mer |
| couvreur saint lo | 480 | 2,49 | 49 | non | Toiture & charpente | Saint-Lô |
| couvreur deauville | 480 | 1,76 | 38 | non | Toiture & charpente | Deauville |
| couvreur pont l abbé | 480 | 1,57 | 37 | non | Toiture & charpente | Pont-l'Abbé |
| couvreur saint gaudens | 480 | 3,27 | 67 | non | Toiture & charpente | Saint-Gaudens |
| couvreur hennebont | 480 | 2,21 | 56 | non | Toiture & charpente | Hennebont |
| couvreur brive-la-gaillarde | 480 | 1,63 | 46 | non | Toiture & charpente | Brive-la-Gaillarde |
| couvreur vincennes | 480 | 2,05 | 58 | non | Toiture & charpente | Vincennes |
| couvreur gap | 480 | 1,18 | 42 | non | Toiture & charpente | Gap |
| couvreur pontivy | 480 | 1,31 | 55 | non | Toiture & charpente | Pontivy |
| couvreur savigny-sur-orge | 390 | 12,61 | 27 | oui | Toiture & charpente | Savigny-sur-Orge |
| couvreur le perreux sur marne | 390 | 11,17 | 37 | non | Toiture & charpente | Le Perreux-sur-Marne |
| couvreur conflans | 390 | 11,74 | 48 | non | Toiture & charpente | Conflans-Sainte-Honorine |
| couvreur lattes | 390 | 5,82 | 28 | oui | Toiture & charpente | Lattes |
| couvreur rambouillet | 390 | 5,97 | 32 | oui | Toiture & charpente | Rambouillet |
| couvreur muret | 390 | 7 | 39 | non | Toiture & charpente | Muret |
| couvreur colomiers | 390 | 5,68 | 34 | oui | Toiture & charpente | Colomiers |
| couvreur gaillac | 390 | 5,72 | 36 | non | Toiture & charpente | Gaillac |
| couvreur hyeres | 390 | 5,72 | 36 | non | Toiture & charpente | Hyères |
| couvreur pontault-combault | 390 | 6,6 | 42 | non | Toiture & charpente | Pontault-Combault |
| couvreur nanterre | 390 | 7,28 | 47 | non | Toiture & charpente | Nanterre |
| couvreur aubagne | 390 | 4,1 | 30 | oui | Toiture & charpente | Aubagne |
| couvreur créteil | 390 | 7,57 | 49 | non | Toiture & charpente | Créteil |
| couvreur sartrouville | 390 | 8,99 | 58 | non | Toiture & charpente | Sartrouville |
| ravalement de facade brest | 390 | 2,99 | 27 | oui | Façade & ravalement | Brest |
| couvreur maubeuge | 390 | 5,18 | 42 | non | Toiture & charpente | Maubeuge |
| couvreur bethune | 390 | 5,44 | 44 | non | Toiture & charpente | Béthune |
| couvreur tournefeuille | 390 | 5,69 | 46 | non | Toiture & charpente | Tournefeuille |
| couvreur carquefou | 390 | 4,46 | 39 | non | Toiture & charpente | Carquefou |
| couvreur guipavas | 390 | 3,48 | 34 | oui | Toiture & charpente | Guipavas |
| couvreur villeneuve-d'ascq | 390 | 5,09 | 47 | non | Toiture & charpente | Villeneuve-d'Ascq |
| couvreur montelimar | 390 | 4,13 | 43 | non | Toiture & charpente | Montélimar |
| couvreur saint-amand-les-eaux | 390 | 4,55 | 47 | non | Toiture & charpente | Saint-Amand-les-Eaux |
| couvreur boulogne billancourt | 390 | 4,44 | 46 | non | Toiture & charpente | Boulogne-Billancourt |
| couvreur balma | 390 | 3,2 | 39 | non | Toiture & charpente | Balma |
| ravalement brest | 390 | 2,62 | 34 | oui | Façade & ravalement | Brest |
| maçon rouen | 390 | 3,87 | 46 | non | Maçonnerie & gros œuvre | Rouen |
| couvreur wattrelos | 390 | 4,87 | 55 | non | Toiture & charpente | Wattrelos |
| couvreur pornichet | 390 | 5,18 | 63 | non | Toiture & charpente | Pornichet |
| couvreur bourg la reine | 390 | 3,09 | 44 | non | Toiture & charpente | Bourg-la-Reine |
| couvreur bourg-en-bresse | 390 | 3,23 | 46 | non | Toiture & charpente | Bourg-en-Bresse |
| couvreur nevers | 390 | 2,84 | 44 | non | Toiture & charpente | Nevers |
| couvreur chambéry | 390 | 2,01 | 34 | oui | Toiture & charpente | Chambéry |
| couvreur perigueux | 390 | 3,56 | 54 | non | Toiture & charpente | Périgueux |
| couvreur evreux | 390 | 3,43 | 53 | non | Toiture & charpente | Évreux |
| couvreur dreux | 390 | 2,54 | 43 | non | Toiture & charpente | Dreux |
| couvreur blagnac | 390 | 2,66 | 48 | non | Toiture & charpente | Blagnac |
| couvreur millau | 390 | 2,13 | 42 | non | Toiture & charpente | Millau |
| couvreur isigny-sur-mer | 390 | 2,74 | 56 | non | Toiture & charpente | Isigny-sur-Mer |
| couvreur bouguenais | 390 | 2,32 | 50 | non | Toiture & charpente | Bouguenais |
| couvreur vertou | 390 | 2,25 | 49 | non | Toiture & charpente | Vertou |
| couvreur marseillan | 390 | 2,1 | 49 | non | Toiture & charpente | Marseillan |
| couvreur les herbiers | 390 | 3,53 | 69 | non | Toiture & charpente | Les Herbiers |
| maçon le havre | 390 | 2,26 | 55 | non | Maçonnerie & gros œuvre | Le Havre |
| maçon montpellier | 390 | 2,43 | 59 | non | Maçonnerie & gros œuvre | Montpellier |
| maçon bordeaux | 390 | 1,51 | 56 | non | Maçonnerie & gros œuvre | Bordeaux |
| couvreur decazeville | 390 | 0,96 | 44 | non | Toiture & charpente | Decazeville |
| couvreur colmar | 390 | 0,92 | 44 | non | Toiture & charpente | Colmar |
| maçon bourg en bresse | 390 | 0,94 | 53 | non | Maçonnerie & gros œuvre | Bourg-en-Bresse |
| charpente nantes | 320 | 19,09 | 38 | non | Toiture & charpente | Nantes |
| couvreur champigny-sur-marne | 320 | 15,61 | 40 | non | Toiture & charpente | Champigny-sur-Marne |
| couvreur paimpol | 320 | 13,36 | 43 | non | Toiture & charpente | Paimpol |
| charpente annecy | 320 | 7,51 | 34 | oui | Toiture & charpente | Annecy |
| couvreur saint-paul-de-vence | 320 | 14,37 | 56 | non | Toiture & charpente | Saint-Paul-de-Vence |
| couvreur linas | 320 | 8,92 | 42 | non | Toiture & charpente | Linas |
| couvreur arcachon | 320 | 7,18 | 38 | non | Toiture & charpente | Arcachon |
| couvreur conflans-sainte-honorine | 320 | 7,91 | 41 | non | Toiture & charpente | Conflans-Sainte-Honorine |
| charpente lyon | 320 | 9,44 | 47 | non | Toiture & charpente | Lyon |
| charpente bordeaux | 320 | 8,98 | 46 | non | Toiture & charpente | Bordeaux |
| couvreur saint tropez | 320 | 4,91 | 30 | oui | Toiture & charpente | Saint-Tropez |
| couvreur salon de provence | 320 | 6,4 | 38 | non | Toiture & charpente | Salon-de-Provence |
| couvreur suresnes | 320 | 3,94 | 27 | oui | Toiture & charpente | Suresnes |
| couvreur soissons | 320 | 5,8 | 37 | non | Toiture & charpente | Soissons |
| couvreur romans-sur isère | 320 | 6,72 | 42 | non | Toiture & charpente | Romans-sur-Isère |
| couvreur senlis | 320 | 5,48 | 37 | non | Toiture & charpente | Senlis |
| couvreur moulins | 320 | 7,26 | 47 | non | Toiture & charpente | Moulins |
| couvreur villeneuve sur lot | 320 | 7,88 | 51 | non | Toiture & charpente | Villeneuve-sur-Lot |
| maçon la rochelle | 320 | 5,14 | 39 | non | Maçonnerie & gros œuvre | La Rochelle |
| couvreur manosque | 320 | 6,53 | 47 | non | Toiture & charpente | Manosque |
| couvreur drancy | 320 | 6,7 | 48 | non | Toiture & charpente | Drancy |
| couvreur mauguio | 320 | 4,29 | 35 | oui | Toiture & charpente | Mauguio |
| couvreur clisson | 320 | 6,04 | 46 | non | Toiture & charpente | Clisson |
| couvreur houilles | 320 | 4,89 | 39 | non | Toiture & charpente | Houilles |
| couvreur draguignan | 320 | 7,96 | 56 | non | Toiture & charpente | Draguignan |
| couvreur istres | 320 | 6,33 | 50 | non | Toiture & charpente | Istres |
| maçon brest | 320 | 5,29 | 46 | non | Maçonnerie & gros œuvre | Brest |
| couvreur alencon | 320 | 6,59 | 54 | non | Toiture & charpente | Alençon |
| couvreur chaville | 320 | 6,07 | 52 | non | Toiture & charpente | Chaville |
| couvreur chatellerault | 320 | 2,52 | 29 | oui | Toiture & charpente | Châtellerault |
| couvreur fouesnant | 320 | 4,11 | 44 | non | Toiture & charpente | Fouesnant |
| couvreur montfermeil | 320 | 3,55 | 40 | non | Toiture & charpente | Montfermeil |
| couvreur cavaillon | 320 | 4,15 | 45 | non | Toiture & charpente | Cavaillon |
| couvreur epernay | 320 | 2,63 | 32 | oui | Toiture & charpente | Épernay |
| couvreur arles | 320 | 3,55 | 40 | non | Toiture & charpente | Arles |
| couvreur orange | 320 | 4,21 | 46 | non | Toiture & charpente | Orange |
| couvreur yvetot | 320 | 2,91 | 35 | oui | Toiture & charpente | Yvetot |
| couvreur issoire | 320 | 3,84 | 44 | non | Toiture & charpente | Issoire |
| couvreur beaune | 320 | 5,51 | 58 | non | Toiture & charpente | Beaune |
| couvreur vitrolles | 320 | 4,31 | 49 | non | Toiture & charpente | Vitrolles |
| ravalement de façade nantes | 320 | 3,44 | 42 | non | Façade & ravalement | Nantes |
| couvreur sainte luce-sur loire | 320 | 4,73 | 53 | non | Toiture & charpente | Sainte-Luce-sur-Loire |
| ravalement de facades nantes | 320 | 3,44 | 43 | non | Façade & ravalement | Nantes |
| maçon lorient | 320 | 3,92 | 48 | non | Maçonnerie & gros œuvre | Lorient |
| maçon quimper | 320 | 3,67 | 47 | non | Maçonnerie & gros œuvre | Quimper |
| couvreur denain | 320 | 4,93 | 57 | non | Toiture & charpente | Denain |
| couvreur thonon | 320 | 2,55 | 39 | non | Toiture & charpente | Thonon-les-Bains |
| couvreur ploemeur | 320 | 5,41 | 67 | non | Toiture & charpente | Ploemeur |
| couvreur chalette sur loing | 320 | 2,93 | 47 | non | Toiture & charpente | Châlette-sur-Loing |
| couvreur sarzeau | 320 | 3,55 | 54 | non | Toiture & charpente | Sarzeau |
| couvreur tulle | 320 | 2,67 | 49 | non | Toiture & charpente | Tulle |
| couvreur chauny | 320 | 2,36 | 48 | non | Toiture & charpente | Chauny |
| maçon annecy | 320 | 2,95 | 58 | non | Maçonnerie & gros œuvre | Annecy |
| couvreur bruz | 320 | 3,2 | 64 | non | Toiture & charpente | Bruz |
| couvreur ploumagoar | 320 | 1,88 | 48 | non | Toiture & charpente | Ploumagoar |
| couvreur toul | 320 | 2,86 | 66 | non | Toiture & charpente | Toul |
| couvreur landivisiau | 320 | 2,65 | 63 | non | Toiture & charpente | Landivisiau |
| maçon le mans | 320 | 1,08 | 37 | non | Maçonnerie & gros œuvre | Le Mans |
| maçon reims | 320 | 2,1 | 65 | non | Maçonnerie & gros œuvre | Reims |
| maçon niort | 320 | 1,03 | 46 | non | Maçonnerie & gros œuvre | Niort |
| couvreur saint dizier | 320 | 1,43 | 66 | non | Toiture & charpente | Saint-Dizier |
| maçon nantes | 320 | 1 | 59 | non | Maçonnerie & gros œuvre | Nantes |
| maçon saint-etienne | 320 | 1,38 | 73 | non | Maçonnerie & gros œuvre | Saint-Étienne |
| maçon tours | 320 | 0,96 | 59 | non | Maçonnerie & gros œuvre | Tours |
| couvreur alfortville | 260 | 20,22 | 32 | oui | Toiture & charpente | Alfortville |
| couvreur massy | 260 | 13,77 | 34 | oui | Toiture & charpente | Massy |
| couvreur foix | 260 | 14,04 | 36 | non | Toiture & charpente | Foix |
| couvreur vidauban | 260 | 13,93 | 37 | non | Toiture & charpente | Vidauban |
| couvreur la crau | 260 | 15,15 | 42 | non | Toiture & charpente | La Crau |
| couvreur poissy | 260 | 14,06 | 46 | non | Toiture & charpente | Poissy |
| couvreur dordives | 260 | 14,97 | 60 | non | Toiture & charpente | Dordives |
| couvreur vence | 260 | 9,28 | 44 | non | Toiture & charpente | Vence |
| couvreur frontignan | 260 | 9,81 | 46 | non | Toiture & charpente | Frontignan |
| couvreur meudon | 260 | 8,64 | 42 | non | Toiture & charpente | Meudon |
| couvreur blaye | 260 | 7,72 | 39 | non | Toiture & charpente | Blaye |
| couvreur le vesinet | 260 | 5,69 | 32 | oui | Toiture & charpente | Le Vésinet |
| couvreur aulnay sous-bois | 260 | 9,45 | 48 | non | Toiture & charpente | Aulnay-sous-Bois |
| couvreur la garde | 260 | 7,69 | 41 | non | Toiture & charpente | La Garde |
| couvreur nemours | 260 | 13,22 | 61 | non | Toiture & charpente | Nemours |
| couvreur la seyne-sur-mer | 260 | 6,76 | 41 | non | Toiture & charpente | La Seyne-sur-Mer |
| couvreur fontenay sous bois | 260 | 5,37 | 35 | oui | Toiture & charpente | Fontenay-sous-Bois |
| couvreur viarmes | 260 | 5,84 | 40 | non | Toiture & charpente | Viarmes |
| couvreur eysines | 260 | 6,04 | 41 | non | Toiture & charpente | Eysines |
| couvreur villeurbanne | 260 | 6,64 | 46 | non | Toiture & charpente | Villeurbanne |
| couvreur gisors | 260 | 7,23 | 49 | non | Toiture & charpente | Gisors |
| couvreur bezons | 260 | 7,15 | 49 | non | Toiture & charpente | Bezons |
| couvreur ajaccio | 260 | 4,98 | 38 | non | Toiture & charpente | Ajaccio |
| couvreur berck | 260 | 5,04 | 38 | non | Toiture & charpente | Berck |
| couvreur tonnay charente | 260 | 4,92 | 39 | non | Toiture & charpente | Tonnay-Charente |
| couvreur cugnaux | 260 | 5,16 | 41 | non | Toiture & charpente | Cugnaux |
| couvreur saint girons | 260 | 7,96 | 57 | non | Toiture & charpente | Saint-Girons |
| couvreur uzes | 260 | 3,3 | 31 | oui | Toiture & charpente | Uzès |
| couvreur mont de marsan | 260 | 5,76 | 48 | non | Toiture & charpente | Mont-de-Marsan |
| couvreur gagny | 260 | 5,9 | 50 | non | Toiture & charpente | Gagny |
| couvreur montbéliard | 260 | 4,84 | 44 | non | Toiture & charpente | Montbéliard |
| couvreur martigues | 260 | 4,85 | 44 | non | Toiture & charpente | Martigues |
| couvreur sete | 260 | 5,14 | 47 | non | Toiture & charpente | Sète |
| couvreur velizy | 260 | 3,08 | 32 | oui | Toiture & charpente | Vélizy-Villacoublay |
| couvreur palaiseau | 260 | 5,64 | 51 | non | Toiture & charpente | Palaiseau |
| maçon beziers | 260 | 5,38 | 51 | non | Maçonnerie & gros œuvre | Béziers |
| couvreur quiberon | 260 | 5,98 | 56 | non | Toiture & charpente | Quiberon |
| couvreur castelsarrasin | 260 | 3,99 | 43 | non | Toiture & charpente | Castelsarrasin |
| couvreur pontchateau | 260 | 5,81 | 57 | non | Toiture & charpente | Pontchâteau |
| couvreur couëron | 260 | 3,82 | 44 | non | Toiture & charpente | Couëron |
| couvreur biarritz | 260 | 4,39 | 49 | non | Toiture & charpente | Biarritz |
| couvreur thonon les bains | 260 | 4,65 | 53 | non | Toiture & charpente | Thonon-les-Bains |
| couvreur ploermel | 260 | 4,78 | 56 | non | Toiture & charpente | Ploërmel |
| couvreur landerneau | 260 | 4,38 | 54 | non | Toiture & charpente | Landerneau |
| couvreur besançon | 260 | 3,45 | 46 | non | Toiture & charpente | Besançon |
| maçon toulon | 260 | 2,28 | 34 | oui | Maçonnerie & gros œuvre | Toulon |
| couvreur mazamet | 260 | 2,89 | 41 | non | Toiture & charpente | Mazamet |
| couvreur sorgues | 260 | 4,62 | 58 | non | Toiture & charpente | Sorgues |
| couvreur dinard | 260 | 2,63 | 42 | non | Toiture & charpente | Dinard |
| couvreur bressuire | 260 | 3,24 | 51 | non | Toiture & charpente | Bressuire |
| couvreur belfort | 260 | 3,33 | 53 | non | Toiture & charpente | Belfort |
| couvreur montceau les-mines | 260 | 3,1 | 52 | non | Toiture & charpente | Montceau-les-Mines |
| couvreur saint-gilles croix de vie | 260 | 2,85 | 49 | non | Toiture & charpente | Saint-Gilles-Croix-de-Vie |
| couvreur nort-sur-erdre | 260 | 2,86 | 52 | non | Toiture & charpente | Nort-sur-Erdre |
| couvreur bagnols-sur cèze | 260 | 1,67 | 41 | non | Toiture & charpente | Bagnols-sur-Cèze |
| maçon troyes | 260 | 2,85 | 64 | non | Maçonnerie & gros œuvre | Troyes |
| maçon vannes | 260 | 1,63 | 45 | non | Maçonnerie & gros œuvre | Vannes |
| couvreur chateauroux | 260 | 1,2 | 37 | non | Toiture & charpente | Châteauroux |
| couvreur villefranche de rouergue | 260 | 2,15 | 58 | non | Toiture & charpente | Villefranche-de-Rouergue |
| couvreur albertville | 260 | 1,97 | 56 | non | Toiture & charpente | Albertville |
| couvreur à sainte-geneviève-des-bois | 260 | 2 | 58 | non | Toiture & charpente | Sainte-Geneviève-des-Bois |
| maçon dijon | 260 | 2,02 | 67 | non | Maçonnerie & gros œuvre | Dijon |
| maçon challans | 260 | 1,27 | 50 | non | Maçonnerie & gros œuvre | Challans |
| maçon lyon | 260 | 1,1 | 46 | non | Maçonnerie & gros œuvre | Lyon |
| maçon angers | 260 | 1,43 | 60 | non | Maçonnerie & gros œuvre | Angers |
| couvreur chalon sur saone | 260 | 0,9 | 53 | non | Toiture & charpente | Chalon-sur-Saône |
| maçon la roche vineuse | 260 | 0,31 | 56 | non | Maçonnerie & gros œuvre | La Roche-sur-Yon |
| maçon albi | 260 | 0,3 | 63 | non | Maçonnerie & gros œuvre | Albi |
| maçon sete | 260 | 0 | 66 | non | Maçonnerie & gros œuvre | Sète |
| couvreur rethel | 260 | 0,31 | 68 | non | Toiture & charpente | Rethel |
| couvreur cogolin | 210 | 13,72 | 32 | oui | Toiture & charpente | Cogolin |
| couvreur creil | 210 | 16,96 | 39 | non | Toiture & charpente | Creil |
| couvreur valbonne | 210 | 10,47 | 29 | oui | Toiture & charpente | Valbonne |
| couvreur le perreux | 210 | 10,89 | 30 | oui | Toiture & charpente | Le Perreux-sur-Marne |
| couvreur le raincy | 210 | 6,08 | 21 | oui | Toiture & charpente | Le Raincy |
| couvreur etampes | 210 | 13,99 | 42 | non | Toiture & charpente | Étampes |
| couvreur vitry sur seine | 210 | 16,78 | 49 | non | Toiture & charpente | Vitry-sur-Seine |
| couvreur elbeuf | 210 | 6,57 | 27 | oui | Toiture & charpente | Elbeuf |
| couvreur bry sur marne | 210 | 7,86 | 34 | oui | Toiture & charpente | Bry-sur-Marne |
| couvreur noisy le grand | 210 | 10,56 | 43 | non | Toiture & charpente | Noisy-le-Grand |
| couvreur lourdes | 210 | 8,59 | 38 | non | Toiture & charpente | Lourdes |
| couvreur gradignan | 210 | 8,94 | 42 | non | Toiture & charpente | Gradignan |
| couvreur le cannet | 210 | 10,44 | 48 | non | Toiture & charpente | Le Cannet |
| couvreur meyzieu | 210 | 10,96 | 51 | non | Toiture & charpente | Meyzieu |
| couvreur mouans sartoux | 210 | 9,43 | 47 | non | Toiture & charpente | Mouans-Sartoux |
| couvreur castelnaudary | 210 | 6,7 | 39 | non | Toiture & charpente | Castelnaudary |
| couvreur aix-les-bains | 210 | 6,99 | 42 | non | Toiture & charpente | Aix-les-Bains |
| couvreur saint avold | 210 | 6,39 | 40 | non | Toiture & charpente | Saint-Avold |
| couvreur bastia | 210 | 5,43 | 35 | non | Toiture & charpente | Bastia |
| charpente grenoble | 210 | 6,47 | 41 | non | Toiture & charpente | Grenoble |
| couvreur livry gargan | 210 | 6,67 | 43 | non | Toiture & charpente | Livry-Gargan |
| couvreur bandol | 210 | 6,22 | 40 | non | Toiture & charpente | Bandol |
| couvreur saint-marcel | 210 | 4,64 | 33 | oui | Toiture & charpente | Saint-Marcel |
| couvreur saint cloud | 210 | 5,62 | 40 | non | Toiture & charpente | Saint-Cloud |
| couvreur clermont l hérault | 210 | 7,72 | — | non | Toiture & charpente | Clermont-l'Hérault |
| couvreur pavillons sous bois | 210 | 4,99 | 36 | non | Toiture & charpente | Les Pavillons-sous-Bois |
| couvreur triel sur-seine | 210 | 8,26 | 53 | non | Toiture & charpente | Triel-sur-Seine |
| couvreur yutz | 210 | 11,84 | 68 | non | Toiture & charpente | Yutz |
| couvreur noyon | 210 | 4,97 | 38 | non | Toiture & charpente | Noyon |
| couvreur henin beaumont | 210 | 4,8 | 39 | non | Toiture & charpente | Hénin-Beaumont |
| couvreur gif-sur-yvette | 210 | 5,49 | 44 | non | Toiture & charpente | Gif-sur-Yvette |
| couvreur chambly | 210 | 7,73 | 56 | non | Toiture & charpente | Chambly |
| couvreur carpentras | 210 | 6,83 | 53 | non | Toiture & charpente | Carpentras |
| couvreur brie comte robert | 210 | 4,91 | 42 | non | Toiture & charpente | Brie-Comte-Robert |
| couvreur guidel | 210 | 5,36 | 46 | non | Toiture & charpente | Guidel |
| couvreur fecamp | 210 | 4,97 | 46 | non | Toiture & charpente | Fécamp |
| couvreur dammarie les lys | 210 | 5,61 | 50 | non | Toiture & charpente | Dammarie-les-Lys |
| couvreur lambersart | 210 | 4,75 | 47 | non | Toiture & charpente | Lambersart |
| charpente rennes | 210 | 2,5 | 29 | oui | Toiture & charpente | Rennes |
| couvreur sotteville-les-rouen | 210 | 6,4 | 58 | non | Toiture & charpente | Sotteville-lès-Rouen |
| couvreur yerres | 210 | 3,49 | 38 | non | Toiture & charpente | Yerres |
| couvreur la chapelle-sur-erdre | 210 | 4,01 | 43 | non | Toiture & charpente | La Chapelle-sur-Erdre |
| couvreur saint-maur | 210 | 3,33 | 37 | non | Toiture & charpente | Saint-Maur |
| couvreur betton | 210 | 5,2 | 55 | non | Toiture & charpente | Betton |
| couvreur vias | 210 | 5,07 | 54 | non | Toiture & charpente | Vias |
| couvreur charleville-mézières | 210 | 3,85 | 45 | non | Toiture & charpente | Charleville-Mézières |
| ravalement de façade lille | 210 | 6,02 | 62 | non | Façade & ravalement | Lille |
| couvreur anglet | 210 | 3,99 | 47 | non | Toiture & charpente | Anglet |
| maçon rennes | 210 | 3,16 | 40 | non | Maçonnerie & gros œuvre | Rennes |
| couvreur forbach | 210 | 3,47 | 47 | non | Toiture & charpente | Forbach |
| maçon saint-malo | 210 | 3,01 | 43 | non | Maçonnerie & gros œuvre | Saint-Malo |
| couvreur louviers | 210 | 3,49 | 48 | non | Toiture & charpente | Louviers |
| couvreur l'isle adam | 210 | 4,85 | 60 | non | Toiture & charpente | L'Isle-Adam |
| couvreur brignoles | 210 | 4,02 | 53 | non | Toiture & charpente | Brignoles |
| couvreur pont audemer | 210 | 4,09 | 55 | non | Toiture & charpente | Pont-Audemer |
| couvreur orthez | 210 | 2,38 | 37 | non | Toiture & charpente | Orthez |
| couvreur dole | 210 | 4,05 | 55 | non | Toiture & charpente | Dole |
| maçon amiens | 210 | 2,15 | 36 | non | Maçonnerie & gros œuvre | Amiens |
| couvreur crozon | 210 | 2,43 | 40 | non | Toiture & charpente | Crozon |
| maçon cholet | 210 | 3,3 | 51 | non | Maçonnerie & gros œuvre | Cholet |
| maçon la roche-sur-yon | 210 | 4,05 | 60 | non | Maçonnerie & gros œuvre | La Roche-sur-Yon |
| couvreur le pouliguen | 210 | 3,39 | 53 | non | Toiture & charpente | Le Pouliguen |
| couvreur saint just saint rambert | 210 | 3,04 | — | non | Toiture & charpente | Saint-Just-Saint-Rambert |
| couvreur arpajon | 210 | 3,33 | 54 | non | Toiture & charpente | Arpajon |
| maçon orleans | 210 | 2,81 | 49 | non | Maçonnerie & gros œuvre | Orléans |
| couvreur saint omer | 210 | 2,6 | 48 | non | Toiture & charpente | Saint-Omer |
| couvreur saint-genis-laval | 210 | 2,77 | — | non | Toiture & charpente | Saint-Genis-Laval |
| maçon blois | 210 | 3,56 | 60 | non | Maçonnerie & gros œuvre | Blois |
| couvreur privas | 210 | 2,05 | 42 | non | Toiture & charpente | Privas |
| couvreur neuilly sur seine | 210 | 2,33 | 46 | non | Toiture & charpente | Neuilly-sur-Seine |
| couvreur montmorency | 210 | 2,33 | 47 | non | Toiture & charpente | Montmorency |
| couvreur guerande | 210 | 3,97 | 68 | non | Toiture & charpente | Guérande |
| couvreur châlons en champagne | 210 | 1,27 | 30 | non | Toiture & charpente | Châlons-en-Champagne |
| couvreur vitré | 210 | 2,5 | 51 | non | Toiture & charpente | Vitré |
| couvreur saujon | 210 | 2,24 | 49 | non | Toiture & charpente | Saujon |
| couvreur plabennec | 210 | 2,97 | 61 | non | Toiture & charpente | Plabennec |
| maçon clermont ferrand | 210 | 1,54 | 44 | non | Maçonnerie & gros œuvre | Clermont-Ferrand |
| couvreur lesneven | 210 | 2,37 | 61 | non | Toiture & charpente | Lesneven |
| maçon castres | 210 | 1,82 | 53 | non | Maçonnerie & gros œuvre | Castres |
| maçon carcassonne | 210 | 2,02 | 58 | non | Maçonnerie & gros œuvre | Carcassonne |
| couvreur carnac | 210 | 2,12 | 61 | non | Toiture & charpente | Carnac |
| maçon ales | 210 | 1,83 | 61 | non | Maçonnerie & gros œuvre | Alès |
| maçon montauban | 210 | 1,84 | 65 | non | Maçonnerie & gros œuvre | Montauban |
| maçon agde | 210 | 1,86 | 66 | non | Maçonnerie & gros œuvre | Agde |
| couvreur verdun | 210 | 1,17 | 50 | non | Toiture & charpente | Verdun |
| maçon nevers | 210 | 1,63 | 64 | non | Maçonnerie & gros œuvre | Nevers |
| maçon caen | 210 | 1,46 | 60 | non | Maçonnerie & gros œuvre | Caen |
| maçon lille | 210 | 2,2 | 81 | non | Maçonnerie & gros œuvre | Lille |
| maçon roanne | 210 | 1,1 | 56 | non | Maçonnerie & gros œuvre | Roanne |
| couvreur chateaulin | 210 | 0,85 | 68 | non | Toiture & charpente | Châteaulin |
| maçon bourges | 210 | 0,57 | 61 | non | Maçonnerie & gros œuvre | Bourges |
| charpente vannes | 170 | 6,38 | 16 | oui | Toiture & charpente | Vannes |
| couvreur saint laurent du var | 170 | 15,35 | 44 | non | Toiture & charpente | Saint-Laurent-du-Var |
| isolation extérieure quimper | 170 | 11,19 | 36 | non | Isolation extérieure | Quimper |
| isolation extérieure nantes | 170 | 14,78 | 47 | non | Isolation extérieure | Nantes |
| couvreur saran | 170 | 9,17 | 34 | oui | Toiture & charpente | Saran |
| couvreur draveil | 170 | 10,47 | 38 | non | Toiture & charpente | Draveil |
| couvreur roquebrune sur argens | 170 | 12,82 | 45 | non | Toiture & charpente | Roquebrune-sur-Argens |
| couvreur cergy | 170 | 11,41 | 43 | non | Toiture & charpente | Cergy |
| couvreur mantes la-jolie | 170 | 11,91 | 48 | non | Toiture & charpente | Mantes-la-Jolie |
| charpente mont de marsan | 170 | 4,66 | 23 | oui | Toiture & charpente | Mont-de-Marsan |
| couvreur sucy en brie | 170 | 9,67 | 43 | non | Toiture & charpente | Sucy-en-Brie |
| couvreur coulommiers | 170 | 8,96 | 41 | non | Toiture & charpente | Coulommiers |
| couvreur sainte-maxime | 170 | 11,66 | 50 | non | Toiture & charpente | Sainte-Maxime |
| couvreur bois colombes | 170 | 8,79 | 42 | non | Toiture & charpente | Bois-Colombes |
| couvreur saint sébastien sur loire | 170 | 10,11 | 46 | non | Toiture & charpente | Saint-Sébastien-sur-Loire |
| charpente rouen | 170 | 3,91 | 22 | oui | Toiture & charpente | Rouen |
| charpente angers | 170 | 3,72 | 22 | oui | Toiture & charpente | Angers |
| couvreur saint medard en jalles | 170 | 9,79 | 49 | non | Toiture & charpente | Saint-Médard-en-Jalles |
| couvreur herblay | 170 | 5,75 | 34 | oui | Toiture & charpente | Herblay-sur-Seine |
| ravalement de façade le havre | 170 | 8,1 | 44 | non | Façade & ravalement | Le Havre |
| charpente villeneuve sur lot | 170 | 6,95 | 39 | non | Toiture & charpente | Villeneuve-sur-Lot |
| couvreur verneuil sur seine | 170 | 8,67 | 47 | non | Toiture & charpente | Verneuil-sur-Seine |
| charpente marseille | 170 | 9,23 | 51 | non | Toiture & charpente | Marseille |
| couvreur issy-les-moulineaux | 170 | 7,26 | 45 | non | Toiture & charpente | Issy-les-Moulineaux |
| couvreur la teste-de-buch | 170 | 5,36 | 37 | non | Toiture & charpente | La Teste-de-Buch |
| charpente tarbes | 170 | 4,77 | 34 | oui | Toiture & charpente | Tarbes |
| charpente pau | 170 | 3,78 | 28 | oui | Toiture & charpente | Pau |
| couvreur la ciotat | 170 | 6,06 | 41 | non | Toiture & charpente | La Ciotat |
| couvreur trappes | 170 | 9,96 | 58 | non | Toiture & charpente | Trappes |
| couvreur thouars | 170 | 3,97 | 30 | oui | Toiture & charpente | Thouars |
| couvreur longwy | 170 | 8,19 | 53 | non | Toiture & charpente | Longwy |
| couvreur montereau-fault-yonne | 170 | 3,81 | 31 | oui | Toiture & charpente | Montereau-Fault-Yonne |
| couvreur menton | 170 | 7,44 | 53 | non | Toiture & charpente | Menton |
| couvreur claye-souilly | 170 | 5,56 | 43 | non | Toiture & charpente | Claye-Souilly |
| couvreur rosny-sous-bois | 170 | 5,75 | 44 | non | Toiture & charpente | Rosny-sous-Bois |
| couvreur miramas | 170 | 6,07 | 47 | non | Toiture & charpente | Miramas |
| couvreur perros-guirec | 170 | 5,17 | 42 | non | Toiture & charpente | Perros-Guirec |
| couvreur pontoise | 170 | 5,2 | 42 | non | Toiture & charpente | Pontoise |
| couvreur pithiviers | 170 | 4,42 | 39 | non | Toiture & charpente | Pithiviers |
| couvreur montivilliers | 170 | 7,36 | 56 | non | Toiture & charpente | Montivilliers |
| couvreur sanary sur mer | 170 | 4,03 | 38 | non | Toiture & charpente | Sanary-sur-Mer |
| couvreur pertuis | 170 | 6,13 | 52 | non | Toiture & charpente | Pertuis |
| couvreur epinal | 170 | 4,87 | 45 | non | Toiture & charpente | Épinal |
| couvreur ouistreham | 170 | 5,76 | 51 | non | Toiture & charpente | Ouistreham |
| couvreur saint chamond | 170 | 4,56 | 43 | non | Toiture & charpente | Saint-Chamond |
| couvreur brunoy | 170 | 5,11 | 47 | non | Toiture & charpente | Brunoy |
| couvreur lavaur | 170 | 3,99 | 40 | non | Toiture & charpente | Lavaur |
| couvreur savenay | 170 | 4,36 | 43 | non | Toiture & charpente | Savenay |
| couvreur hazebrouck | 170 | 3,85 | 39 | non | Toiture & charpente | Hazebrouck |
| couvreur domerat | 170 | 4,77 | 47 | non | Toiture & charpente | Domérat |
| maçon perpignan | 170 | 4,32 | 44 | non | Maçonnerie & gros œuvre | Perpignan |
| maçon salon de-provence | 170 | 3,83 | 42 | non | Maçonnerie & gros œuvre | Salon-de-Provence |
| couvreur treillieres | 170 | 4,45 | 48 | non | Toiture & charpente | Treillières |
| isolation extérieure lorient | 170 | 5,1 | 53 | non | Isolation extérieure | Lorient |
| couvreur lisieux | 170 | 3,3 | 40 | non | Toiture & charpente | Lisieux |
| artisan couvreur bordeaux | 170 | 5,07 | 55 | non | Toiture & charpente | Bordeaux |
| couvreur le puy en velay | 170 | 5,05 | 55 | non | Toiture & charpente | Le Puy-en-Velay |
| couvreur caudry | 170 | 5,01 | 55 | non | Toiture & charpente | Caudry |
| couvreur carmaux | 170 | 4,12 | 49 | non | Toiture & charpente | Carmaux |
| couvreur flers | 170 | 2,24 | 31 | oui | Toiture & charpente | Flers |
| couvreur gournay-en-bray | 170 | 4,39 | 51 | non | Toiture & charpente | Gournay-en-Bray |
| maçon narbonne | 170 | 4,7 | 55 | non | Maçonnerie & gros œuvre | Narbonne |
| couvreur olivet | 170 | 3,21 | 42 | non | Toiture & charpente | Olivet |
| isolation extérieure saint brieuc | 170 | 3,41 | 46 | non | Isolation extérieure | Saint-Brieuc |
| maçon saintes | 170 | 3,24 | 46 | non | Maçonnerie & gros œuvre | Saintes |
| couvreur ermont | 170 | 4,15 | 56 | non | Toiture & charpente | Ermont |
| couvreur anet | 170 | 2,29 | 37 | non | Toiture & charpente | Anet |
| couvreur ruffec | 170 | 2,71 | 43 | non | Toiture & charpente | Ruffec |
| couvreur tergnier | 170 | 5,49 | 70 | non | Toiture & charpente | Tergnier |
| maçon montelimar | 170 | 3,51 | 52 | non | Maçonnerie & gros œuvre | Montélimar |
| couvreur annonay | 170 | 3,08 | 48 | non | Toiture & charpente | Annonay |
| couvreur gauchy | 170 | 2,65 | 44 | non | Toiture & charpente | Gauchy |
| couvreur viroflay | 170 | 1,11 | 22 | non | Toiture & charpente | Viroflay |
| couvreur sens 89 | 170 | 2,75 | 47 | non | Toiture & charpente | Sens |
| maçon chartres | 170 | 2,93 | 50 | non | Maçonnerie & gros œuvre | Chartres |
| couvreur marcq-en-baroeul | 170 | 2,04 | 41 | non | Toiture & charpente | Marcq-en-Barœul |
| isolation extérieure vannes | 170 | 2,47 | 48 | non | Isolation extérieure | Vannes |
| couvreur saint jean de monts | 170 | 2,13 | 48 | non | Toiture & charpente | Saint-Jean-de-Monts |
| maçon auxerre | 170 | 2,01 | 46 | non | Maçonnerie & gros œuvre | Auxerre |
| couvreur fougeres | 170 | 3,3 | 67 | non | Toiture & charpente | Fougères |
| couvreur larmor plage | 170 | 2,5 | 56 | non | Toiture & charpente | Larmor-Plage |
| couvreur nogent-sur-marne | 170 | 1,9 | 46 | non | Toiture & charpente | Nogent-sur-Marne |
| couvreur saint-julien-de-concelles | 170 | 2,41 | 55 | non | Toiture & charpente | Saint-Julien-de-Concelles |
| couvreur marmande | 170 | 2,19 | 52 | non | Toiture & charpente | Marmande |
| couvreur audierne | 170 | 3,15 | 67 | non | Toiture & charpente | Audierne |
| couvreur charleville | 170 | 1,65 | 43 | non | Toiture & charpente | Charleville-Mézières |
| couvreur montgeron | 170 | 2,5 | 58 | non | Toiture & charpente | Montgeron |
| maçon strasbourg | 170 | 3,17 | 68 | non | Maçonnerie & gros œuvre | Strasbourg |
| couvreur le croisic | 170 | 1,92 | 50 | non | Toiture & charpente | Le Croisic |
| maçon dunkerque | 170 | 2,42 | 62 | non | Maçonnerie & gros œuvre | Dunkerque |
| ravalement le havre | 170 | 1,49 | 44 | non | Façade & ravalement | Le Havre |
| maçon saint brieuc | 170 | 1,61 | 48 | non | Maçonnerie & gros œuvre | Saint-Brieuc |
| maçon royan | 170 | 2,32 | 62 | non | Maçonnerie & gros œuvre | Royan |
| maçon saint nazaire | 170 | 1,83 | 59 | non | Maçonnerie & gros œuvre | Saint-Nazaire |
| couvreur mondeville | 170 | 0,77 | 33 | non | Toiture & charpente | Mondeville |
| couvreur chantonnay | 170 | 2,05 | 67 | non | Toiture & charpente | Chantonnay |
| maçon limoges | 170 | 1,68 | 61 | non | Maçonnerie & gros œuvre | Limoges |
| maçon avignon | 170 | 1,55 | 59 | non | Maçonnerie & gros œuvre | Avignon |
| maçon aix en-provence | 170 | 1,55 | 64 | non | Maçonnerie & gros œuvre | Aix-en-Provence |
| maçon nimes | 170 | 1,14 | 55 | non | Maçonnerie & gros œuvre | Nîmes |
| maçon vichy | 170 | 1,48 | 68 | non | Maçonnerie & gros œuvre | Vichy |
| couvreur langon | 170 | 0,88 | 50 | non | Toiture & charpente | Langon |
| maçon annemasse | 170 | 1,54 | 75 | non | Maçonnerie & gros œuvre | Annemasse |
| couvreur saint-jean d'angély | 170 | 0,98 | 61 | non | Toiture & charpente | Saint-Jean-d'Angély |
| maçon tarbes | 170 | 0,96 | 63 | non | Maçonnerie & gros œuvre | Tarbes |
| couvreur figeac | 170 | 0,51 | 41 | non | Toiture & charpente | Figeac |
| couvreur faches-thumesnil | 170 | 0,86 | 69 | non | Toiture & charpente | Faches-Thumesnil |
| terrassement tours | 170 | 0,39 | 52 | non | Terrassement & VRD | Tours |
| couvreur janzé | 170 | 0,53 | 73 | non | Toiture & charpente | Janzé |
| isolation extérieure brest | 140 | 13,93 | 28 | oui | Isolation extérieure | Brest |
| maçon redon | 140 | 21,68 | 41 | non | Maçonnerie & gros œuvre | Redon |
| charpente le mans | 140 | 8,71 | 30 | oui | Toiture & charpente | Le Mans |
| isolation extérieure caen | 140 | 7,72 | 33 | oui | Isolation extérieure | Caen |
| charpente montpellier | 140 | 4,48 | 27 | oui | Toiture & charpente | Montpellier |
| charpente chambery | 140 | 3,81 | 24 | oui | Toiture & charpente | Chambéry |
| charpente dijon | 140 | 9,18 | 50 | non | Toiture & charpente | Dijon |
| charpente gap | 140 | 4,63 | 30 | oui | Toiture & charpente | Gap |
| ravalement de façade lorient | 140 | 5,4 | 40 | non | Façade & ravalement | Lorient |
| maçon chambery | 140 | 3,18 | 26 | oui | Maçonnerie & gros œuvre | Chambéry |
| maçon les sables d'olonne | 140 | 4,34 | 35 | non | Maçonnerie & gros œuvre | Les Sables-d'Olonne |
| maçon beauvais | 140 | 3,03 | 28 | oui | Maçonnerie & gros œuvre | Beauvais |
| charpente brest | 140 | 7,04 | 56 | non | Toiture & charpente | Brest |
| colmar charpente | 140 | 8,67 | 67 | non | Toiture & charpente | Colmar |
| charpente montauban | 140 | 4,09 | 42 | non | Toiture & charpente | Montauban |
| charpente agen | 140 | 6,09 | 58 | non | Toiture & charpente | Agen |
| charpente strasbourg | 140 | 5,78 | 58 | non | Toiture & charpente | Strasbourg |
| charpente limoges | 140 | 3,23 | 40 | non | Toiture & charpente | Limoges |
| maçon dinan | 140 | 3,06 | 47 | non | Maçonnerie & gros œuvre | Dinan |
| maçon angouleme | 140 | 2,55 | 42 | non | Maçonnerie & gros œuvre | Angoulême |
| maçon chateauroux | 140 | 3,84 | 57 | non | Maçonnerie & gros œuvre | Châteauroux |
| ravalement de facade bordeaux | 140 | 2,37 | 53 | non | Façade & ravalement | Bordeaux |
| maçon mulhouse | 140 | 2,01 | 49 | non | Maçonnerie & gros œuvre | Mulhouse |
| maçon mont-de-marsan | 140 | 1,41 | 41 | non | Maçonnerie & gros œuvre | Mont-de-Marsan |
| ravalement de facade toulouse | 140 | 2,21 | 56 | non | Façade & ravalement | Toulouse |
| ravalement de facades toulouse | 140 | 2,21 | 57 | non | Façade & ravalement | Toulouse |
| maçon fontenay le comte | 140 | 1,65 | 48 | non | Maçonnerie & gros œuvre | Fontenay-le-Comte |
| maçon aubenas | 140 | 1,38 | 49 | non | Maçonnerie & gros œuvre | Aubenas |
| maçon poitiers | 140 | 1,78 | 60 | non | Maçonnerie & gros œuvre | Poitiers |
| maçon beaune | 140 | 1,72 | 62 | non | Maçonnerie & gros œuvre | Beaune |
| maçon cherbourg | 140 | 0,72 | 37 | non | Maçonnerie & gros œuvre | Cherbourg-en-Cotentin |
| maçon belfort | 140 | 0,93 | 47 | non | Maçonnerie & gros œuvre | Belfort |
| maçon grenoble | 140 | 1,05 | 56 | non | Maçonnerie & gros œuvre | Grenoble |
| maçon dax | 140 | 1,09 | 58 | non | Maçonnerie & gros œuvre | Dax |
| maçon besançon | 140 | 0,86 | 63 | non | Maçonnerie & gros œuvre | Besançon |
| terrassement toulouse | 140 | 0,45 | 43 | non | Terrassement & VRD | Toulouse |
| maçon tournus | 140 | 0 | 45 | non | Maçonnerie & gros œuvre | Tournus |
| maçon dole | 140 | 0,36 | 57 | non | Maçonnerie & gros œuvre | Dole |
| maçon valence | 140 | 0,3 | 55 | non | Maçonnerie & gros œuvre | Valence |
| maçon soissons | 140 | 0,38 | 66 | non | Maçonnerie & gros œuvre | Soissons |
| perpignan charpente tradition | 140 | 0 | 58 | non | Toiture & charpente | Perpignan |
| isolation extérieure le mans | 110 | 24,57 | 54 | non | Isolation extérieure | Le Mans |
| isolation extérieure rennes | 110 | 11,42 | 36 | non | Isolation extérieure | Rennes |
| isolation extérieure angers | 110 | 13,94 | 45 | non | Isolation extérieure | Angers |
| isolation extérieure rouen | 110 | 9,13 | 35 | oui | Isolation extérieure | Rouen |
| isolation extérieure le havre | 110 | 9,78 | 55 | non | Isolation extérieure | Le Havre |
| maçon vesoul | 110 | 6,96 | 48 | non | Maçonnerie & gros œuvre | Vesoul |
| charpente la rochelle | 110 | 3,89 | 34 | oui | Toiture & charpente | La Rochelle |
| isolation extérieure strasbourg | 110 | 7,39 | 58 | non | Isolation extérieure | Strasbourg |
| maçon aubagne | 110 | 4,63 | 44 | non | Maçonnerie & gros œuvre | Aubagne |
| maçon arras | 110 | 2,51 | 43 | non | Maçonnerie & gros œuvre | Arras |
| ravalement de façade belfort | 110 | 2,85 | 51 | non | Façade & ravalement | Belfort |
| ravalement de facade montpellier | 110 | 1,8 | 40 | non | Façade & ravalement | Montpellier |
| maçon draguignan | 110 | 2,08 | 44 | non | Maçonnerie & gros œuvre | Draguignan |
| maçon amboise | 110 | 3,28 | 61 | non | Maçonnerie & gros œuvre | Amboise |
| maçon montceau-les-mines | 110 | 1,68 | 39 | non | Maçonnerie & gros œuvre | Montceau-les-Mines |
| ravalement de facades montpellier | 110 | 1,8 | 43 | non | Façade & ravalement | Montpellier |
| maçon evreux | 110 | 2,17 | 49 | non | Maçonnerie & gros œuvre | Évreux |
| maçon manosque | 110 | 3,36 | 70 | non | Maçonnerie & gros œuvre | Manosque |
| maçon albertville | 110 | 1,27 | 40 | non | Maçonnerie & gros œuvre | Albertville |
| maçon fougeres | 110 | 1,86 | 53 | non | Maçonnerie & gros œuvre | Fougères |
| maçon calais | 110 | 2,58 | 73 | non | Maçonnerie & gros œuvre | Calais |
| maçon valenciennes | 110 | 1,51 | 54 | non | Maçonnerie & gros œuvre | Valenciennes |
| terrassement dijon | 110 | 0,94 | 40 | non | Terrassement & VRD | Dijon |
| vérandahlia extension maison véranda rouen | 110 | 2,35 | 77 | non | Extension & surélévation | Rouen |
| maçon metz | 110 | 1,62 | 63 | non | Maçonnerie & gros œuvre | Metz |
| maçon abbeville | 110 | 2,19 | 77 | non | Maçonnerie & gros œuvre | Abbeville |
| maçon lannion | 110 | 0,86 | 44 | non | Maçonnerie & gros œuvre | Lannion |
| maçon cahors | 110 | 0,92 | 59 | non | Maçonnerie & gros œuvre | Cahors |
| maçon moulins | 110 | 0,88 | 62 | non | Maçonnerie & gros œuvre | Moulins |
| maçon lons le saunier | 110 | 0,1 | 37 | non | Maçonnerie & gros œuvre | Lons-le-Saunier |
| maçon colmar | 110 | 0,15 | 44 | non | Maçonnerie & gros œuvre | Colmar |
| maçon saint-gilles croix de vie | 110 | 0,44 | 59 | non | Maçonnerie & gros œuvre | Saint-Gilles-Croix-de-Vie |
| maçon alencon | 110 | 0,21 | 47 | non | Maçonnerie & gros œuvre | Alençon |
| ravalement de façade la roche sur yon | 110 | 0 | 48 | non | Façade & ravalement | La Roche-sur-Yon |
| maçon bayonne | 110 | 0,46 | 64 | non | Maçonnerie & gros œuvre | Bayonne |
| maçon aizenay | 110 | 0,16 | 50 | non | Maçonnerie & gros œuvre | Aizenay |
| artisan terrassement lyon btp | 110 | 0 | — | non | Terrassement & VRD | Lyon |
| maçon oyonnax | 110 | 0 | 54 | non | Maçonnerie & gros œuvre | Oyonnax |
| maçon agen | 110 | 0,35 | 61 | non | Maçonnerie & gros œuvre | Agen |
| isolation extérieure saint nazaire | 110 | 0 | 56 | non | Isolation extérieure | Saint-Nazaire |
| terrassement ajaccio | 110 | 0 | 70 | non | Terrassement & VRD | Ajaccio |
| terrassement de la baie | 110 | 0 | 100 | non | Terrassement & VRD | Baie-Mahault |
| surélévation nantes | 90 | 18,77 | 34 | oui | Extension & surélévation | Nantes |
| surélévation maison nantes | 90 | 9,87 | 37 | non | Extension & surélévation | Nantes |
| ravalement de facade vertou | 90 | 9,44 | 46 | non | Façade & ravalement | Vertou |
| maçon pontivy | 90 | 9,74 | 50 | non | Maçonnerie & gros œuvre | Pontivy |
| isolation extérieure reims | 90 | 8,27 | 48 | non | Isolation extérieure | Reims |
| maçon libourne | 90 | 4,48 | 41 | non | Maçonnerie & gros œuvre | Libourne |
| ravalement de façade strasbourg | 90 | 3,96 | 42 | non | Façade & ravalement | Strasbourg |
| maçon guerande | 90 | 4,02 | 44 | non | Maçonnerie & gros œuvre | Guérande |
| ravalement de facade marseille | 90 | 3,89 | 45 | non | Façade & ravalement | Marseille |
| maçon chatellerault | 90 | 2,39 | 33 | oui | Maçonnerie & gros œuvre | Châtellerault |
| maçon brive la gaillarde | 90 | 3,94 | 49 | non | Maçonnerie & gros œuvre | Brive-la-Gaillarde |
| maçon arles | 90 | 2,21 | 33 | oui | Maçonnerie & gros œuvre | Arles |
| maçon fecamp | 90 | 2,57 | 39 | non | Maçonnerie & gros œuvre | Fécamp |
| maçon le creusot | 90 | 4,02 | 57 | non | Maçonnerie & gros œuvre | Le Creusot |
| maçon sens | 90 | 4,5 | 62 | non | Maçonnerie & gros œuvre | Sens |
| ravalement de façade nice | 90 | 2,24 | 40 | non | Façade & ravalement | Nice |
| maçon carquefou | 90 | 2,17 | 42 | non | Maçonnerie & gros œuvre | Carquefou |
| maçon epinal | 90 | 2,03 | 41 | non | Maçonnerie & gros œuvre | Épinal |
| maçon pontarlier | 90 | 1,63 | 37 | non | Maçonnerie & gros œuvre | Pontarlier |
| ravalement de façade angers | 90 | 2,11 | 44 | non | Façade & ravalement | Angers |
| maçon perigueux | 90 | 2,1 | 46 | non | Maçonnerie & gros œuvre | Périgueux |
| maçon chalons en champagne | 90 | 2,59 | 55 | non | Maçonnerie & gros œuvre | Châlons-en-Champagne |
| maçon chalon sur saone | 90 | 2,69 | 57 | non | Maçonnerie & gros œuvre | Chalon-sur-Saône |
| maçon aix les bains | 90 | 2,09 | 50 | non | Maçonnerie & gros œuvre | Aix-les-Bains |
| maçon aurillac | 90 | 2,55 | 58 | non | Maçonnerie & gros œuvre | Aurillac |
| sm ravalement reims | 90 | 4,02 | 79 | non | Façade & ravalement | Reims |
| maçon saint quentin | 90 | 2,14 | 52 | non | Maçonnerie & gros œuvre | Saint-Quentin |
| maçon thionville | 90 | 2,44 | 58 | non | Maçonnerie & gros œuvre | Thionville |
| maçon laval | 90 | 1,91 | 52 | non | Maçonnerie & gros œuvre | Laval |
| maçon carpentras | 90 | 1,81 | 50 | non | Maçonnerie & gros œuvre | Carpentras |
| maçon morlaix | 90 | 0,99 | 35 | non | Maçonnerie & gros œuvre | Morlaix |
| maçon douarnenez | 90 | 1,87 | 57 | non | Maçonnerie & gros œuvre | Douarnenez |
| maçon granville | 90 | 1,47 | 49 | non | Maçonnerie & gros œuvre | Granville |
| maçon lisieux | 90 | 1,09 | 42 | non | Maçonnerie & gros œuvre | Lisieux |
| maçon marmande | 90 | 1,8 | 67 | non | Maçonnerie & gros œuvre | Marmande |
| maçon cambrai | 90 | 1,7 | 67 | non | Maçonnerie & gros œuvre | Cambrai |
| maçon thouars | 90 | 0,77 | 39 | non | Maçonnerie & gros œuvre | Thouars |
| maçon pertuis | 90 | 0,72 | 38 | non | Maçonnerie & gros œuvre | Pertuis |
| maçon martigues | 90 | 1,28 | 57 | non | Maçonnerie & gros œuvre | Martigues |
| maçon laon | 90 | 1,4 | 62 | non | Maçonnerie & gros œuvre | Laon |
| maçon bayeux | 90 | 0,89 | 45 | non | Maçonnerie & gros œuvre | Bayeux |
| maçon villeneuve sur lot | 90 | 1,16 | 56 | non | Maçonnerie & gros œuvre | Villeneuve-sur-Lot |
| maçon le puy en velay | 90 | 1,04 | 53 | non | Maçonnerie & gros œuvre | Le Puy-en-Velay |
| maçon orthez | 90 | 1,02 | 56 | non | Maçonnerie & gros œuvre | Orthez |
| maçon bergerac | 90 | 0,84 | 53 | non | Maçonnerie & gros œuvre | Bergerac |
| maçon nancy | 90 | 0,84 | 57 | non | Maçonnerie & gros œuvre | Nancy |
| maçon vierzon | 90 | 0,54 | 48 | non | Maçonnerie & gros œuvre | Vierzon |
| maçon mazamet | 90 | 0,5 | 48 | non | Maçonnerie & gros œuvre | Mazamet |
| maçon rodez | 90 | 0,59 | 66 | non | Maçonnerie & gros œuvre | Rodez |
| ravalement de façade rouen | 90 | 0 | 42 | non | Façade & ravalement | Rouen |
| entreprise construction et terrassement toulouse 31 | 90 | 0 | 42 | non | Terrassement & VRD | Toulouse |
| maçon vendome | 90 | 0,37 | 50 | non | Maçonnerie & gros œuvre | Vendôme |
| maçon montbrison | 90 | 0 | 44 | non | Maçonnerie & gros œuvre | Montbrison |
| maçon millau | 90 | 0 | 47 | non | Maçonnerie & gros œuvre | Millau |
| maçon villefranche | 90 | 0 | 48 | non | Maçonnerie & gros œuvre | Villefranche-sur-Saône |
| maçon figeac | 90 | 0,27 | 48 | non | Maçonnerie & gros œuvre | Figeac |
| ravalement le mans | 90 | 0 | — | non | Façade & ravalement | Le Mans |
| maçon les herbiers | 90 | 0,36 | 59 | non | Maçonnerie & gros œuvre | Les Herbiers |
| maçon talmont saint hilaire | 90 | 0 | 58 | non | Maçonnerie & gros œuvre | Talmont-Saint-Hilaire |
| maçon gaillac | 90 | 0,33 | 61 | non | Maçonnerie & gros œuvre | Gaillac |
| maçon orange | 90 | 0 | 59 | non | Maçonnerie & gros œuvre | Orange |
| maçon parisien | 90 | 0 | 90 | non | Maçonnerie & gros œuvre | Paris |

### 8.4 Guides de prix (150 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier |
|---|---|---|---|---|---|
| nettoyage toiture prix | 2 900 | 5,6 | 29 | oui | Toiture & charpente |
| nettoyer toiture prix | 2 900 | 5,6 | 35 | oui | Toiture & charpente |
| prix isolation extérieure | 4 400 | 4,25 | 43 | non | Isolation extérieure |
| prix nettoyage toiture 100m2 | 2 900 | 4,23 | 41 | non | Toiture & charpente |
| prix démoussage toiture | 1 600 | 4,6 | 27 | oui | Toiture & charpente |
| nettoyage toiture prix m2 | 1 300 | 4,42 | 28 | oui | Toiture & charpente |
| prix nettoyage toiture 100 m2 | 2 900 | 4,23 | 55 | non | Toiture & charpente |
| isolation extérieure prix m2 | 2 400 | 3,4 | 43 | non | Isolation extérieure |
| toiture prix m2 | 1 900 | 4,04 | 42 | non | Toiture & charpente |
| beton desactive prix m2 | 3 600 | 2,17 | 44 | non | Maçonnerie & gros œuvre |
| prix refaire toiture | 1 300 | 4,83 | 38 | non | Toiture & charpente |
| prix d'un toit au m2 | 1 900 | 4,04 | 46 | non | Toiture & charpente |
| prix isolation extérieure maison 100m2 | 1 900 | 2,96 | 40 | non | Isolation extérieure |
| extension maison prix | 1 300 | 3,08 | 33 | oui | Extension & surélévation |
| prix nettoyage toiture 150 m2 | 720 | 5,1 | 32 | oui | Toiture & charpente |
| toiture prix | 1 000 | 4,62 | 38 | non | Toiture & charpente |
| prix-pose liteaux de toiture au m2 | 70 | 13,53 | 7 | oui | Toiture & charpente |
| prix démoussage toiture m2 | 1 000 | 3,65 | 34 | oui | Toiture & charpente |
| prix piscine creusée | 5 400 | 1,49 | 60 | non | Piscine |
| prix toiture 140m2 | 880 | 4,73 | 42 | non | Toiture & charpente |
| tarif au m2 nettoyage toiture | 880 | 3,71 | 35 | oui | Toiture & charpente |
| cout isolation extérieure | 1 000 | 3,96 | 41 | non | Isolation extérieure |
| combien coûte un nettoyage de toiture | 720 | 4,03 | 32 | oui | Toiture & charpente |
| combien coûte un demoussage de toiture | 720 | 4,03 | 33 | oui | Toiture & charpente |
| ravalement de facades prix | 1 600 | 4,65 | 65 | non | Façade & ravalement |
| isolation extérieure 1 euros | 260 | 9,07 | 29 | oui | Isolation extérieure |
| prix m2 isolation extérieure crépi | 1 000 | 2,36 | 30 | oui | Façade & ravalement |
| tarifs demoussage toiture | 1 000 | 4,42 | 50 | non | Toiture & charpente |
| prix toiture ardoises au m2 | 880 | 2,5 | 30 | oui | Toiture & charpente |
| isolation extérieure 1 euro | 260 | 9,07 | 32 | oui | Isolation extérieure |
| démoussage toiture tarif | 1 000 | 4,42 | 53 | non | Toiture & charpente |
| prix fenetre pvc double vitrage avec pose | 1 300 | 2,07 | 37 | non | Menuiserie |
| prix m2 etancheite toit terrasse | 720 | 4,9 | 47 | non | Toiture & charpente |
| prix nettoyage toiture 150m2 | 720 | 5,1 | 48 | non | Toiture & charpente |
| prix pose fenetres | 320 | 3,3 | 17 | oui | Menuiserie |
| réfection toiture prix m2 | 590 | 4,11 | 36 | non | Toiture & charpente |
| prix toiture m2 tuile | 720 | 2,72 | 31 | oui | Toiture & charpente |
| prix pour refaire une toiture de 100m2 en tuiles | 720 | 4,37 | 45 | non | Toiture & charpente |
| isolation extérieure tarif | 480 | 5,8 | 41 | non | Isolation extérieure |
| prix ravalement de façade | 1 600 | 4,65 | 81 | non | Façade & ravalement |
| prix au m2 pour peindre une facade | 720 | 2,94 | 34 | oui | Façade & ravalement |
| prix chape liquide m2 | 720 | 3 | 35 | oui | Maçonnerie & gros œuvre |
| prix dalle béton m2 | 2 400 | 1,27 | 46 | non | Maçonnerie & gros œuvre |
| prix extension maison 20 m2 | 1 600 | 2,47 | 55 | non | Extension & surélévation |
| extension maison 20m2 prix | 1 600 | 2,47 | 56 | non | Extension & surélévation |
| quel prix pour refaire une toiture de 100 m2 | 880 | 3,26 | 45 | non | Toiture & charpente |
| volets roulants prix avec pose | 1 600 | 2,36 | 56 | non | Menuiserie |
| prix m2 peinture facade | 720 | 2,94 | 37 | non | Façade & ravalement |
| toiture zinc prix m2 | 590 | 3,68 | 38 | non | Toiture & charpente |
| renovation toiture prix m2 | 590 | 3,97 | 40 | non | Toiture & charpente |
| etanchéité toiture terrasse prix m2 | 720 | 4,9 | 55 | non | Toiture & charpente |
| prix m2 toiture ardoise | 880 | 2,5 | 40 | non | Toiture & charpente |
| prix ravalement façade maison 100m2 | 720 | 3,2 | 41 | non | Façade & ravalement |
| prix volet roulant avec pose | 1 600 | 2,36 | 59 | non | Menuiserie |
| pose vélux prix | 1 000 | 3,39 | 55 | non | Toiture & charpente |
| toiture tuiles prix m2 | 720 | 2,72 | 38 | non | Toiture & charpente |
| enrobé prix m2 | 1 600 | 1,82 | 52 | non | Terrassement & VRD |
| prix béton ciré m2 | 1 300 | 1,05 | 30 | non | Maçonnerie & gros œuvre |
| prix velux et pose | 1 000 | 3,39 | 60 | non | Toiture & charpente |
| tuile prix m2 | 1 900 | 0,98 | 39 | non | Toiture & charpente |
| prix volets roulants électriques avec pose | 1 300 | 2,31 | 57 | non | Menuiserie |
| prix charpente et toiture 100m2 | 140 | 10,9 | 36 | non | Toiture & charpente |
| tuiles prix m2 | 1 900 | 0,98 | 43 | non | Toiture & charpente |
| prix goudron m2 | 1 000 | 1,81 | 42 | non | Terrassement & VRD |
| prix hydrofuge toiture 100 m2 | 720 | 3,51 | 55 | non | Toiture & charpente |
| prix toit ardoise m2 | 880 | 2,5 | — | non | Toiture & charpente |
| isolation par l extérieur prix m2 | 590 | 3,72 | 50 | non | Isolation extérieure |
| couvreur coutances | 480 | 3,8 | 46 | non | Toiture & charpente |
| prix volet roulant solaire avec pose | 720 | 1,83 | 36 | non | Menuiserie |
| isolation extérieure des murs prix | 320 | 4,85 | 42 | non | Isolation extérieure |
| traitement hydrofuge toiture prix au m2 | 720 | 3,24 | 56 | non | Toiture & charpente |
| prix volet roulant electrique avec pose | 1 300 | 2,31 | 68 | non | Menuiserie |
| isolation extérieure mur prix | 320 | 4,85 | 45 | non | Isolation extérieure |
| prix m2 enrobé particulier | 1 300 | 1,85 | 61 | non | Terrassement & VRD |
| prix fenetre pvc et pose | 260 | 3,76 | 32 | oui | Menuiserie |
| isolation extérieure maison prix | 390 | 3,6 | 42 | non | Isolation extérieure |
| prix goudronnage m2 | 1 000 | 1,81 | 51 | non | Terrassement & VRD |
| ravalement de façade prix m2 | 880 | 3,34 | 73 | non | Façade & ravalement |
| prix ravalement facade maison 200m2 | 320 | 3,03 | 34 | oui | Façade & ravalement |
| traitement charpente prix | 210 | 4,75 | 36 | non | Toiture & charpente |
| prix surélévation maison | 390 | 4,68 | 57 | non | Extension & surélévation |
| prix fenetre pvc pose | 260 | 3,76 | 36 | non | Menuiserie |
| prix m2 terrassement | 880 | 2,06 | 57 | non | Terrassement & VRD |
| prix extension bois 20 m2 | 880 | 1,72 | 52 | non | Extension & surélévation |
| chape prix m2 | 880 | 2,37 | 65 | non | Maçonnerie & gros œuvre |
| prix fenetre et pose | 320 | 3,3 | 40 | non | Menuiserie |
| fenetre prix pose | 320 | 3,3 | 41 | non | Menuiserie |
| prix extension bois 20m2 | 880 | 1,72 | 53 | non | Extension & surélévation |
| béton lavé prix m2 | 720 | 1,98 | 52 | non | Maçonnerie & gros œuvre |
| prix pose lambris pvc sous toiture renovation | 170 | 7,35 | 49 | non | Toiture & charpente |
| prix pose gouttière zinc | 260 | 7,63 | 68 | non | Toiture & charpente |
| prix pose fenetres pvc | 260 | 3,76 | 43 | non | Menuiserie |
| prix piscine 10 m2 | 1 000 | 1,2 | — | non | Piscine |
| prix pose gouttiere alu | 320 | 3,76 | 50 | non | Toiture & charpente |
| prix crépis m2 | 590 | 2,81 | 63 | non | Façade & ravalement |
| prix m2 isolation extérieure maison | 260 | 3,4 | 41 | non | Isolation extérieure |
| prix m2 enrobé colas | 880 | 1,48 | 55 | non | Terrassement & VRD |
| prix m2 toiture bac acier | 880 | 1,52 | 56 | non | Toiture & charpente |
| prix fenetre pvc pose comprise | 480 | 2,28 | — | non | Menuiserie |
| prix crepi m2 | 590 | 2,81 | 67 | non | Façade & ravalement |
| coût isolation extérieure maison | 210 | 4,14 | 44 | non | Isolation extérieure |
| combien coûte isolation extérieure | 320 | 4,47 | 62 | non | Isolation extérieure |
| prix pose gouttière aluminium | 320 | 3,76 | 56 | non | Toiture & charpente |
| prix fenêtre pvc avec pose | 210 | 2,99 | 35 | non | Menuiserie |
| prix d un velux 114x118 pose | 480 | 2,1 | — | non | Toiture & charpente |
| prix ardoise m2 | 590 | 1,07 | 36 | non | Toiture & charpente |
| tarif terrassement m2 | 170 | 6,42 | 53 | non | Terrassement & VRD |
| prix porte d'entrée avec pose | 720 | 2,06 | 66 | non | Menuiserie |
| prix extension maison 20m2 toit plat | 480 | 2,49 | 58 | non | Toiture & charpente |
| prix m2 peinture murs | 590 | 1,48 | 47 | non | Maçonnerie & gros œuvre |
| ardoises prix au m2 | 590 | 1,07 | 37 | non | Toiture & charpente |
| ravalement prix m2 | 260 | 2,63 | 39 | non | Façade & ravalement |
| prix m2 peinture mur | 590 | 1,48 | 47 | non | Maçonnerie & gros œuvre |
| ravalement de facade tarif | 170 | 3,69 | 37 | non | Façade & ravalement |
| prix m2 enrobé daniel moquet | 720 | 1,83 | 63 | non | Terrassement & VRD |
| prix fenetres pvc avec pose | 210 | 2,99 | 38 | non | Menuiserie |
| prix porte garage électrique avec pose | 590 | 1,86 | 56 | non | Menuiserie |
| panneaux sandwich toiture prix m2 | 880 | 1,22 | 55 | non | Toiture & charpente |
| panneau sandwich toiture prix m2 | 880 | 1,22 | 55 | non | Toiture & charpente |
| prix au m2 pour peindre un mur | 590 | 1,48 | 48 | non | Maçonnerie & gros œuvre |
| charpente couverture prix m2 | 170 | 3,73 | 38 | non | Toiture & charpente |
| prix charpente et couverture au m2 | 170 | 3,73 | 39 | non | Toiture & charpente |
| prix charpente bois | 140 | 8,46 | 60 | non | Toiture & charpente |
| pose gouttiere prix | 110 | 8,1 | — | non | Toiture & charpente |
| peinture murale prix m2 | 590 | 1,48 | — | non | Maçonnerie & gros œuvre |
| changer toit véranda prix | 210 | 5,04 | 57 | non | Toiture & charpente |
| prix terrassement | 590 | 1,72 | 56 | non | Terrassement & VRD |
| prix ravalement façade maison 150m2 | 210 | 2,32 | 33 | oui | Façade & ravalement |
| prix charpente | 210 | 6,34 | 67 | non | Toiture & charpente |
| ravalement de facade combien ca coute | 320 | 3,72 | 63 | non | Façade & ravalement |
| pose volet roulant électrique prix | 260 | 4,21 | 60 | non | Menuiserie |
| béton prix m2 | 880 | 1,4 | 65 | non | Maçonnerie & gros œuvre |
| extension maison 30m2 prix | 390 | 2,48 | 56 | non | Extension & surélévation |
| isolation extérieure prix moyen | 210 | 3,23 | 43 | non | Isolation extérieure |
| baie vitrée prix pose | 110 | 4,03 | 31 | oui | Menuiserie |
| prix beton ciré sol m2 | 880 | 0,84 | 48 | non | Maçonnerie & gros œuvre |
| prix isolation façade extérieure | 90 | 5,01 | 34 | oui | Façade & ravalement |
| combien coute un ravalement de facade | 320 | 3,72 | 68 | non | Façade & ravalement |
| prix volet roulant aluminium avec pose | 320 | 2,5 | 53 | non | Menuiserie |
| béton drainant prix m2 | 720 | 1,19 | 56 | non | Maçonnerie & gros œuvre |
| prix volet roulant manuel avec pose | 320 | 2,56 | 54 | non | Menuiserie |
| prix pose gouttieres | 110 | 8,1 | 57 | non | Toiture & charpente |
| prix porte de garage avec pose | 480 | 1,86 | 57 | non | Menuiserie |
| prix charpente m2 | 390 | 2,9 | 68 | non | Toiture & charpente |
| prix au mètre carré isolation extérieure | 170 | 2,86 | 38 | non | Isolation extérieure |
| prix pose gouttière pvc | 110 | 9,65 | 66 | non | Toiture & charpente |
| pose bâche toiture urgence prix | 90 | 6,92 | 46 | non | Toiture & charpente |
| prix velux avec pose | 390 | 2,79 | 68 | non | Toiture & charpente |
| ravalement façade cout | 260 | 3,11 | 57 | non | Façade & ravalement |
| prix pose tuile au m2 sans fourniture | 140 | 3,37 | 39 | non | Toiture & charpente |

### 8.5 Pages devis (88 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier |
|---|---|---|---|---|---|
| climatisation devis | 4 400 | 5,54 | 43 | non | Énergie |
| electricien devis | 2 400 | 12,51 | 36 | non | Rénovation intérieure |
| devis électricité | 2 400 | 12,51 | 46 | non | Rénovation intérieure |
| fenetres devis | 1 600 | 14,5 | 36 | non | Menuiserie |
| devis fenêtre | 1 600 | 14,5 | 40 | non | Menuiserie |
| devis et travaux | 1 300 | 12,85 | 57 | non | Générique (devis, artisan) |
| cuisine devis | 1 300 | 7,46 | 44 | non | Rénovation intérieure |
| devis cuisine en ligne | 1 300 | 6,67 | 44 | non | Rénovation intérieure |
| travaux devis | 1 300 | 12,85 | 71 | non | Générique (devis, artisan) |
| salle de bain devis | 1 000 | 6,82 | 41 | non | Rénovation intérieure |
| devis salle de bains | 1 000 | 6,82 | 43 | non | Rénovation intérieure |
| devis climatisation reversible | 1 000 | 5,46 | 63 | non | Énergie |
| volets roulants devis | 880 | 9,48 | 30 | oui | Menuiserie |
| devis volet roulants | 880 | 9,48 | 31 | oui | Menuiserie |
| devis volet roulant | 880 | 9,48 | 31 | oui | Menuiserie |
| devis volets roulant | 880 | 9,48 | 31 | oui | Menuiserie |
| pisciniste devis | 880 | 10,7 | 39 | non | Piscine |
| devis piscines | 880 | 10,7 | 44 | non | Piscine |
| piscine devis | 880 | 10,7 | 45 | non | Piscine |
| devis toit | 880 | 10,5 | — | non | Toiture & charpente |
| toiture devis | 880 | 10,5 | 57 | non | Toiture & charpente |
| devis toitures | 880 | 10,5 | 62 | non | Toiture & charpente |
| devis pose climatisation | 880 | 5,21 | 40 | non | Énergie |
| plomberie devis | 880 | 5,21 | 46 | non | Rénovation intérieure |
| devis installation climatisation | 880 | 4,82 | 47 | non | Énergie |
| plombier devis | 880 | 5,21 | 73 | non | Rénovation intérieure |
| devis panneau solaire | 720 | 25,48 | 36 | non | Énergie |
| pompe a chaleur devis | 720 | 23,35 | 40 | non | Énergie |
| devis panneaux solaires | 720 | 25,48 | 44 | non | Énergie |
| panneaux solaire devis | 720 | 25,48 | 46 | non | Énergie |
| devis fenêtre en ligne | 720 | 13,95 | 40 | non | Menuiserie |
| devis travaux ligne | 720 | 14,25 | 41 | non | Générique (devis, artisan) |
| devis fenetres en ligne | 720 | 13,95 | 42 | non | Menuiserie |
| devis en ligne climatisation | 720 | 7,16 | 64 | non | Énergie |
| cloture devis | 720 | 4,13 | 50 | non | Clôture & portail |
| devis clotures | 720 | 4,13 | 54 | non | Clôture & portail |
| devis travaux ninja | 720 | 0 | 49 | non | Générique (devis, artisan) |
| devis menuiseries | 590 | 13,68 | 34 | oui | Menuiserie |
| devis menuiserie | 590 | 13,68 | 36 | non | Menuiserie |
| devis menuisier | 590 | 13,68 | 58 | non | Menuiserie |
| devis travaux habitatpresto | 590 | 8,57 | 48 | non | Générique (devis, artisan) |
| maconnerie devis | 590 | 8,31 | 49 | non | Maçonnerie & gros œuvre |
| devis maçon | 590 | 8,31 | 57 | non | Maçonnerie & gros œuvre |
| paysagiste devis | 590 | 4,84 | 58 | non | Paysage & jardin |
| devis paysage | 590 | 4,84 | 60 | non | Paysage & jardin |
| devis fenetres pvc | 480 | 13,3 | 26 | oui | Menuiserie |
| portail devis | 480 | 13,03 | 40 | non | Clôture & portail |
| fenetre pvc devis | 480 | 13,3 | 44 | non | Menuiserie |
| devis porte d'entrée | 480 | 8,64 | 32 | oui | Menuiserie |
| devis isolation extérieure | 480 | 20,67 | 71 | non | Isolation extérieure |
| devis carrelage | 480 | 4,67 | 44 | non | Rénovation intérieure |
| devis pour construction maison | 390 | 7,92 | 35 | oui | Générique (devis, artisan) |
| terrasse devis | 390 | 6,18 | 35 | oui | Terrasse |
| devis transporteur | 390 | 5 | 31 | oui | Menuiserie |
| terrasse bois devis | 390 | 5,68 | 36 | non | Terrasse |
| devis electricite et gaz | 390 | 13,11 | 67 | non | Rénovation intérieure |
| devis gaz electricité | 390 | 13,11 | 75 | non | Rénovation intérieure |
| devis constructeur maison | 390 | 7,92 | 58 | non | Générique (devis, artisan) |
| devis en ligne salle de bain | 390 | 8,04 | 64 | non | Rénovation intérieure |
| construire maison devis | 390 | 7,92 | 64 | non | Générique (devis, artisan) |
| devis peinture maison | 390 | 8,17 | 74 | non | Générique (devis, artisan) |
| devis pose carrelage | 390 | 4,03 | 82 | non | Rénovation intérieure |
| exemple devis paysagiste | 320 | 1,44 | 48 | non | Paysage & jardin |
| véranda devis | 260 | 14,21 | 31 | oui | Pergola, véranda, abri |
| devis terrassement | 260 | 3,63 | 42 | non | Terrassement & VRD |
| charpente devis | 210 | 11,34 | 30 | oui | Toiture & charpente |
| couvreur devis | 210 | 10,48 | 61 | non | Toiture & charpente |
| devis fosse septique | 210 | 6,32 | 49 | non | Assainissement |
| devis ravalement facade | 170 | 8,5 | 73 | non | Façade & ravalement |
| devis fosse septique en ligne | 140 | 5,43 | 57 | non | Assainissement |
| exemple devis isolation extérieure | 110 | 4,56 | 60 | non | Isolation extérieure |
| exemple devis terrassement | 110 | 3,16 | 56 | non | Terrassement & VRD |
| devise franc maçon | 110 | 0 | 57 | non | Maçonnerie & gros œuvre |
| devis isolation extérieure maison | 90 | 19,38 | 69 | non | Isolation extérieure |
| exemple devis ravalement façade maison | 90 | 0 | 52 | non | Façade & ravalement |
| devis maçon en ligne | 70 | 9,15 | 41 | non | Maçonnerie & gros œuvre |
| devis surélévation maison | 70 | 7,54 | 56 | non | Extension & surélévation |
| devis ravalement | 50 | 3,24 | 62 | non | Façade & ravalement |
| exemple devis ravalement façade | 50 | 0 | 51 | non | Façade & ravalement |
| devis terrassement terrain | 40 | 3,43 | — | non | Terrassement & VRD |
| devis surélévation | 40 | 0 | 56 | non | Extension & surélévation |
| devis isolation extérieure en ligne | 30 | 19,95 | — | non | Isolation extérieure |
| devis terrassement piscine | 30 | 2,73 | 43 | non | Piscine |
| devis terrassement en ligne | 30 | 4,19 | 58 | non | Terrassement & VRD |
| devis terrassement maison | 30 | 3,32 | 65 | non | Terrassement & VRD |
| exemple devis terrassement piscine | 30 | 1,54 | 48 | non | Piscine |
| terrassier exemple devis terrassement | 30 | 0 | 65 | non | Terrassement & VRD |
| devis ravalement maison | 20 | 0 | — | non | Façade & ravalement |

### 8.6 Problèmes et réparations (53 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier |
|---|---|---|---|---|---|
| traitement bois et charpente | 1 600 | 3,78 | 48 | non | Toiture & charpente |
| traitement charpente bois | 1 600 | 3,78 | 48 | non | Toiture & charpente |
| traitement vers bois charpente | 1 600 | 3,78 | 54 | non | Toiture & charpente |
| traitement toiture | 1 300 | 2,77 | 76 | non | Toiture & charpente |
| réparations toiture | 1 000 | 5,75 | 28 | oui | Toiture & charpente |
| couvreur réparation toiture | 1 000 | 5,33 | 30 | oui | Toiture & charpente |
| fuites toiture | 1 000 | 7,45 | 46 | non | Toiture & charpente |
| réparation toiture | 1 000 | 5,75 | 40 | non | Toiture & charpente |
| toiture fuite | 1 000 | 7,45 | 56 | non | Toiture & charpente |
| fuite dans toiture | 1 000 | 7,45 | 58 | non | Toiture & charpente |
| réparer toiture | 1 000 | 5,75 | 84 | non | Toiture & charpente |
| traitement toiture hydrofuge | 880 | 3,85 | 60 | non | Toiture & charpente |
| traitement charpente | 880 | 4,26 | 68 | non | Toiture & charpente |
| fuite toiture forte pluie | 720 | 5 | 64 | non | Toiture & charpente |
| réparation véranda autour de moi | 480 | 3,71 | 63 | non | Pergola, véranda, abri |
| injection traitement charpente | 320 | 2,67 | 42 | non | Toiture & charpente |
| traitement par injection charpente | 320 | 2,67 | 61 | non | Toiture & charpente |
| injecteur traitement charpente | 320 | 2,67 | 75 | non | Toiture & charpente |
| véranda rideau problème | 320 | 2,11 | 70 | non | Pergola, véranda, abri |
| réparation toiture véranda polycarbonate | 260 | 8,02 | 37 | non | Toiture & charpente |
| afpah traitement de charpente termite capricorne merule demoussage humidite | 260 | 5,82 | 47 | non | Toiture & charpente |
| traitement de charpente par pulvérisation | 260 | 3,3 | 53 | non | Toiture & charpente |
| artisan réparation porte de garage | 260 | 2,7 | 49 | non | Menuiserie |
| artisan réparation fenêtre pvc | 260 | 1,94 | 40 | non | Menuiserie |
| traitement capricornes charpente | 210 | 4,18 | 40 | non | Toiture & charpente |
| entreprise traitement de charpente | 210 | 6,74 | 59 | non | Toiture & charpente |
| reparation véranda ancienne | 210 | 3,12 | 34 | oui | Pergola, véranda, abri |
| charpente capricorne traitement | 210 | 4,18 | — | non | Toiture & charpente |
| couvreur urgence | 170 | 10,37 | 20 | oui | Toiture & charpente |
| sos fuite toiture couvreur la seyne sur mer | 170 | 4,18 | — | non | Toiture & charpente |
| entreprise traitement bois charpente | 170 | 4,97 | 58 | non | Toiture & charpente |
| bardage cassette | 170 | 0,1 | 48 | non | Bardage |
| réparation étanchéité véranda | 140 | 4,33 | 49 | non | Pergola, véranda, abri |
| traitement xylophene charpente | 140 | 0,5 | 80 | non | Toiture & charpente |
| problème avec isolation extérieure forum | 140 | 0 | 81 | non | Isolation extérieure |
| vidange fosse septique urgence | 110 | 3,86 | 47 | non | Assainissement |
| traitement poutre et charpente | 110 | 3,81 | 55 | non | Toiture & charpente |
| réparation fosse septique | 110 | 4,88 | 65 | non | Assainissement |
| traitement fosse septique | 110 | 0,44 | 46 | non | Assainissement |
| fuite véranda qui appeler | 90 | 8,57 | 50 | non | Pergola, véranda, abri |
| réparation toiture véranda | 90 | 5,78 | 46 | non | Toiture & charpente |
| réparation fissure mur extérieur ravalement | 90 | 1,31 | 67 | non | Façade & ravalement |
| réparation porte coulissante véranda | 70 | 3,77 | — | non | Pergola, véranda, abri |
| réparation véranda autour de moi les mieux notes | 70 | 3,44 | — | non | Pergola, véranda, abri |
| problème avec isolation extérieure | 50 | 13,11 | 54 | non | Isolation extérieure |
| roland sas terrassement carrière traitement de sols | 50 | 0 | — | non | Terrassement & VRD |
| surélévation de la coupole diaphragmatique droite traitement | 40 | 0 | 34 | non | Extension & surélévation |
| surélévation de la coupole diaphragmatique gauche traitement | 40 | 0 | — | non | Extension & surélévation |
| fissure isolation extérieure | 30 | 2,42 | 46 | non | Isolation extérieure |
| ravalement blanc cassé | 30 | 0,04 | 51 | non | Façade & ravalement |
| traitement à la chaux terrassement | 30 | 0 | — | non | Terrassement & VRD |
| concassé terrassement | 30 | 0,03 | 48 | non | Terrassement & VRD |
| isolation extérieure traitement des ouvertures | 20 | 0,52 | 49 | non | Isolation extérieure |

### 8.7 Aides et réglementation (80 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier |
|---|---|---|---|---|---|
| aide isolation extérieure | 2 900 | 6,92 | 57 | non | Isolation extérieure |
| aides isolation extérieure | 2 900 | 6,92 | 58 | non | Isolation extérieure |
| aides isolation extérieure 2026 | 1 600 | 6,35 | 59 | non | Isolation extérieure |
| aide pour refaire sa toiture 2026 | 1 600 | 3,22 | 49 | non | Toiture & charpente |
| aide isolation extérieure 2026 | 1 600 | 6,35 | 77 | non | Isolation extérieure |
| avancée de toiture | 1 300 | 0,27 | 55 | non | Toiture & charpente |
| refaire toiture aide | 880 | 2,9 | 38 | non | Toiture & charpente |
| aides pour refaire une toiture | 880 | 2,9 | 41 | non | Toiture & charpente |
| aide pour renover toiture | 720 | 3,09 | 45 | non | Toiture & charpente |
| aides renovation toiture | 720 | 3,09 | 54 | non | Toiture & charpente |
| aide renovation toiture | 720 | 3,09 | 59 | non | Toiture & charpente |
| nouvelle loi ravalement de façade | 590 | 2,54 | 38 | non | Façade & ravalement |
| maprimerenov isolation extérieure | 320 | 8,58 | 58 | non | Isolation extérieure |
| ma prime renov isolation extérieure | 320 | 8,58 | 62 | non | Isolation extérieure |
| aide maçon | 320 | 1,45 | 76 | non | Maçonnerie & gros œuvre |
| aide ravalement façade sans isolation extérieur | 260 | 3,32 | 33 | non | Façade & ravalement |
| prime renov isolation extérieure | 260 | 6,65 | 68 | non | Isolation extérieure |
| bardage bois dtu | 260 | 0 | 68 | non | Bardage |
| prime isolation extérieure | 210 | 7,1 | 50 | non | Isolation extérieure |
| aide ravalement de facade | 210 | 3,44 | 42 | non | Façade & ravalement |
| aides pour ravalement de facades | 210 | 3,44 | 45 | non | Façade & ravalement |
| aides ravalement de facade | 210 | 3,44 | 50 | non | Façade & ravalement |
| charpente avancée de toit | 210 | 1,07 | 79 | non | Toiture & charpente |
| dtu bardage bois vertical | 210 | 0,39 | 49 | non | Bardage |
| aides isolation extérieure 2025 | 210 | 0 | 65 | non | Isolation extérieure |
| aide isolation extérieure 2025 | 210 | 0 | 76 | non | Isolation extérieure |
| prime cee isolation extérieure | 170 | 7,7 | 39 | non | Isolation extérieure |
| aides de l'état isolation extérieure | 170 | 8,69 | 66 | non | Isolation extérieure |
| aide état isolation extérieure | 170 | 7,61 | 65 | non | Isolation extérieure |
| aide de l'état isolation extérieure 2026 | 140 | 9,69 | 65 | non | Isolation extérieure |
| prime isolation extérieure 2026 | 140 | 6,79 | 56 | non | Isolation extérieure |
| subventions isolation extérieure | 110 | 6,21 | 48 | non | Isolation extérieure |
| simulation aide isolation extérieure | 110 | 10,92 | 72 | non | Isolation extérieure |
| subvention isolation extérieure | 110 | 6,21 | 53 | non | Isolation extérieure |
| aide ravalement facade mairie | 110 | 2,92 | 41 | non | Façade & ravalement |
| anah aide ravalement façade | 110 | 3,63 | 64 | non | Façade & ravalement |
| supprimer entrait charpente | 110 | 0 | 90 | non | Toiture & charpente |
| cee isolation extérieure | 90 | 7,1 | 35 | non | Isolation extérieure |
| exemple déclaration préalable isolation extérieure | 90 | 2,65 | 45 | non | Isolation extérieure |
| dtu isolation extérieure | 90 | 2,68 | 75 | non | Isolation extérieure |
| prime rénov 2026 isolation extérieure | 70 | 7,18 | 70 | non | Isolation extérieure |
| quelles aides pour isolation extérieure | 70 | 4,44 | 52 | non | Isolation extérieure |
| quelle aide pour isolation extérieure | 70 | 4,44 | 53 | non | Isolation extérieure |
| réglementation talus terrassement | 70 | 0 | 92 | non | Terrassement & VRD |
| aide isolation extérieure maison | 50 | 6,84 | 35 | non | Isolation extérieure |
| aides isolation extérieure maison | 50 | 6,84 | 39 | non | Isolation extérieure |
| anah isolation extérieure | 50 | 8,14 | 59 | non | Isolation extérieure |
| subvention ravalement de facade | 50 | 3,43 | 56 | non | Façade & ravalement |
| subventions pour ravalement de façade | 50 | 3,43 | 69 | non | Façade & ravalement |
| ravalement de facade autorisation | 50 | 0,05 | 67 | non | Façade & ravalement |
| tva terrassement | 50 | 0 | 80 | non | Terrassement & VRD |
| isolation extérieure sans autorisation | 40 | 3,67 | 32 | non | Isolation extérieure |
| ravalement de façade déclaration préalable | 40 | 3,12 | 37 | non | Façade & ravalement |
| dtu isolation extérieure polystyrène | 40 | 1,61 | 58 | non | Isolation extérieure |
| nouvelle loi ravalement de façade maison individuelle | 40 | 0,57 | — | non | Façade & ravalement |
| montant des aides pour isolation extérieure | 30 | 3,71 | 36 | non | Isolation extérieure |
| meilleure prime cee isolation extérieure | 30 | 5,82 | 60 | non | Isolation extérieure |
| aide cee isolation extérieure | 30 | 4,44 | — | non | Isolation extérieure |
| loi alur ravalement de façade | 30 | 1,16 | 27 | non | Façade & ravalement |
| autorisation mairie isolation extérieure | 30 | 2,37 | — | non | Isolation extérieure |
| anah ravalement de façade | 30 | 1,77 | 48 | non | Façade & ravalement |
| faut-il une autorisation pour faire un terrassement | 30 | 1,04 | 33 | non | Terrassement & VRD |
| ravalement de façade isolation thermique obligatoire | 30 | 2,38 | 60 | non | Façade & ravalement |
| formulaire déclaration de travaux ravalement de façade | 30 | 1,48 | 46 | non | Façade & ravalement |
| tva pour ravalement de facade | 30 | 0 | — | non | Façade & ravalement |
| dtu terrassement | 30 | 0 | 48 | non | Terrassement & VRD |
| dtu ravalement de façade | 30 | 0 | 72 | non | Façade & ravalement |
| prime énergie isolation extérieure | 20 | 10,82 | 38 | non | Isolation extérieure |
| formulaire déclaration préalable isolation extérieure | 20 | 7,1 | — | non | Isolation extérieure |
| aides financières isolation extérieure | 20 | 5,37 | — | non | Isolation extérieure |
| aide financière isolation extérieure | 20 | 5,37 | — | non | Isolation extérieure |
| prime cee isolation extérieure 2026 | 20 | 5,22 | — | non | Isolation extérieure |
| montant prime cee isolation extérieure | 20 | 3,02 | — | non | Isolation extérieure |
| ravalement de façade aide de l'état | 20 | 2,99 | — | non | Façade & ravalement |
| déclaration travaux isolation extérieure | 20 | 2,66 | — | non | Isolation extérieure |
| aide isolation extérieure copropriété | 20 | 2,18 | 46 | non | Isolation extérieure |
| isolation extérieure permis de construire | 20 | 1,97 | — | non | Isolation extérieure |
| isolation extérieure biosourcée | 20 | 1,75 | 46 | non | Isolation extérieure |
| déclaration préalable de travaux isolation extérieure | 20 | 1,11 | — | non | Isolation extérieure |
| aide ravalement façade copropriété | 20 | 0,26 | 49 | non | Façade & ravalement |

### 8.8 Tous les océans bleus (195 requêtes)

| Requête | Rech./mois | CPC $ | Difficulté | Océan bleu | Métier | Type |
|---|---|---|---|---|---|---|
| couvreur autour de moi | 18 100 | 5,81 | 32 | oui | Toiture & charpente | Trouver un pro (générique) |
| prix pour vidanger une fosse septique | 2 900 | 2,98 | 4 | oui | Assainissement | Prix et coût |
| entreprise maçon autour de moi | 2 400 | 2,38 | 3 | oui | Maçonnerie & gros œuvre | Trouver un pro (générique) |
| couvreur nantes | 4 400 | 3,61 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| nettoyage toiture prix | 2 900 | 5,6 | 29 | oui | Toiture & charpente | Prix et coût |
| couvreur dans le 91 | 1 900 | 3,14 | 14 | oui | Toiture & charpente | Pro + ville ou zone |
| nettoyer toiture prix | 2 900 | 5,6 | 35 | oui | Toiture & charpente | Prix et coût |
| artisans couvreur | 2 400 | 4,64 | 31 | oui | Toiture & charpente | Trouver un pro (générique) |
| couvreur 77 | 1 300 | 3,56 | 14 | oui | Toiture & charpente | Pro + ville ou zone |
| vidange fosse septique prix | 2 900 | 2,98 | 22 | oui | Assainissement | Prix et coût |
| couvreur parisien | 3 600 | 2,83 | 33 | oui | Toiture & charpente | Pro + ville ou zone |
| prix dépose carrelage au m2 | 5 400 | 1,79 | 28 | oui | Rénovation intérieure | Prix et coût |
| couvreur 91 | 1 900 | 3,14 | 22 | oui | Toiture & charpente | Pro + ville ou zone |
| volets roulants devis | 880 | 9,48 | 30 | oui | Menuiserie | Devis |
| couvreur essonne | 590 | 8,37 | 19 | oui | Toiture & charpente | Pro + ville ou zone |
| entreprise de terrassement | 4 400 | 2,01 | 32 | oui | Terrassement & VRD | Trouver un pro (générique) |
| devis volet roulants | 880 | 9,48 | 31 | oui | Menuiserie | Devis |
| devis volet roulant | 880 | 9,48 | 31 | oui | Menuiserie | Devis |
| devis volets roulant | 880 | 9,48 | 31 | oui | Menuiserie | Devis |
| couvreur toitures | 1 000 | 6,65 | 26 | oui | Toiture & charpente | Trouver un pro (générique) |
| couvreur aix-en-provence | 1 300 | 4,91 | 26 | oui | Toiture & charpente | Pro + ville ou zone |
| devis fenetres pvc | 480 | 13,3 | 26 | oui | Menuiserie | Devis |
| carrelage prix m2 pose | 5 400 | 1,79 | 31 | oui | Rénovation intérieure | Prix et coût |
| devis menuiseries | 590 | 13,68 | 34 | oui | Menuiserie | Devis |
| prix démoussage toiture | 1 600 | 4,6 | 27 | oui | Toiture & charpente | Prix et coût |
| couvreur tours | 1 600 | 3,04 | 25 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur savigny-sur-orge | 390 | 12,61 | 27 | oui | Toiture & charpente | Pro + ville ou zone |
| réparations toiture | 1 000 | 5,75 | 28 | oui | Toiture & charpente | Problème et réparation |
| nettoyage toiture prix m2 | 1 300 | 4,42 | 28 | oui | Toiture & charpente | Prix et coût |
| couvreur alfortville | 260 | 20,22 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| entreprise toiture | 720 | 5,81 | 28 | oui | Toiture & charpente | Trouver un pro (générique) |
| couvreur réparation toiture | 1 000 | 5,33 | 30 | oui | Toiture & charpente | Problème et réparation |
| couvreur dans le 77 | 1 300 | 3,56 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur cherbourg | 880 | 4,38 | 27 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur angers | 1 300 | 2,95 | 28 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur talence | 480 | 10,07 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur strasbourg | 1 300 | 2,46 | 25 | oui | Toiture & charpente | Pro + ville ou zone |
| tarifs vidange fosse septique | 1 600 | 2,95 | 29 | oui | Assainissement | Prix et coût |
| tarif pour vidanger une fosse septique | 1 600 | 2,95 | 30 | oui | Assainissement | Prix et coût |
| climatisation prix pose | 1 300 | 2,13 | 18 | oui | Énergie | Prix et coût |
| devis porte d'entrée | 480 | 8,64 | 32 | oui | Menuiserie | Devis |
| tarif vidange fosse septique | 1 600 | 2,95 | 30 | oui | Assainissement | Prix et coût |
| couvreur le havre | 720 | 5,75 | 33 | oui | Toiture & charpente | Pro + ville ou zone |
| véranda devis | 260 | 14,21 | 31 | oui | Pergola, véranda, abri | Devis |
| couvreur metz | 1 000 | 2,42 | 24 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur massy | 260 | 13,77 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur 83 | 390 | 4,95 | 20 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur challans | 480 | 4,71 | 24 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur cambrai | 480 | 6,01 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur dijon | 1 000 | 3,07 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| extension maison prix | 1 300 | 3,08 | 33 | oui | Extension & surélévation | Prix et coût |
| couvreur 06 | 390 | 4,88 | 21 | oui | Toiture & charpente | Pro + ville ou zone |
| entreprise de ravalement de facades | 720 | 3,9 | 30 | oui | Façade & ravalement | Trouver un pro (générique) |
| prix nettoyage toiture 150 m2 | 720 | 5,1 | 32 | oui | Toiture & charpente | Prix et coût |
| couvreur chantilly | 590 | 5,43 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur bergerac | 1 000 | 3,21 | 35 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur roanne | 480 | 6,23 | 33 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur cogolin | 210 | 13,72 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| prix-pose liteaux de toiture au m2 | 70 | 13,53 | 7 | oui | Toiture & charpente | Prix et coût |
| devis pour construction maison | 390 | 7,92 | 35 | oui | Générique (devis, artisan) | Devis |
| prix démoussage toiture m2 | 1 000 | 3,65 | 34 | oui | Toiture & charpente | Prix et coût |
| couvreur nancy | 880 | 3,24 | 33 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste bordeaux | 1 300 | 1,84 | 29 | oui | Paysage & jardin | Pro + ville ou zone |
| paysagiste nancy | 590 | 2,15 | 16 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur lattes | 390 | 5,82 | 28 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente devis | 210 | 11,34 | 30 | oui | Toiture & charpente | Devis |
| couvreur granville | 590 | 4,14 | 31 | oui | Toiture & charpente | Pro + ville ou zone |
| artisan rénovation | 590 | 4,68 | 34 | oui | Générique (devis, artisan) | Trouver un pro (générique) |
| couvreur valbonne | 210 | 10,47 | 29 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur le perreux | 210 | 10,89 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| ravalement de façade caen | 70 | 17,3 | 17 | oui | Façade & ravalement | Pro + ville ou zone |
| couvreur rambouillet | 390 | 5,97 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| tarif au m2 nettoyage toiture | 880 | 3,71 | 35 | oui | Toiture & charpente | Prix et coût |
| couvreur urgence | 170 | 10,37 | 20 | oui | Toiture & charpente | Problème et réparation |
| isolation extérieure brest | 140 | 13,93 | 28 | oui | Isolation extérieure | Pro + ville ou zone |
| combien coûte un nettoyage de toiture | 720 | 4,03 | 32 | oui | Toiture & charpente | Prix et coût |
| combien coûte un demoussage de toiture | 720 | 4,03 | 33 | oui | Toiture & charpente | Prix et coût |
| charpente annecy | 320 | 7,51 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente vannes | 170 | 6,38 | 16 | oui | Toiture & charpente | Pro + ville ou zone |
| terrasse devis | 390 | 6,18 | 35 | oui | Terrasse | Devis |
| paysagiste clermont ferrand | 480 | 2,84 | 22 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur limoges | 880 | 2,57 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| isolation extérieure 1 euros | 260 | 9,07 | 29 | oui | Isolation extérieure | Prix et coût |
| couvreur le raincy | 210 | 6,08 | 21 | oui | Toiture & charpente | Pro + ville ou zone |
| prix m2 isolation extérieure crépi | 1 000 | 2,36 | 30 | oui | Façade & ravalement | Prix et coût |
| devis transporteur | 390 | 5 | 31 | oui | Menuiserie | Devis |
| couvreur colomiers | 390 | 5,68 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| vider fosse septique tarif | 720 | 3,24 | 30 | oui | Assainissement | Prix et coût |
| couvreur saintes | 590 | 3,11 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur mulhouse | 880 | 1,52 | 23 | oui | Toiture & charpente | Pro + ville ou zone |
| prix toiture ardoises au m2 | 880 | 2,5 | 30 | oui | Toiture & charpente | Prix et coût |
| paysagiste morbihan | 390 | 2,93 | 20 | oui | Paysage & jardin | Pro + ville ou zone |
| isolation extérieure 1 euro | 260 | 9,07 | 32 | oui | Isolation extérieure | Prix et coût |
| couvreur dax | 480 | 2,94 | 26 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste brest | 480 | 2,56 | 24 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur elbeuf | 210 | 6,57 | 27 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur aubagne | 390 | 4,1 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur saint tropez | 320 | 4,91 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur 13 | 320 | 3,19 | 20 | oui | Toiture & charpente | Pro + ville ou zone |
| prix pose fenetres | 320 | 3,3 | 17 | oui | Menuiserie | Prix et coût |
| prix toiture m2 tuile | 720 | 2,72 | 31 | oui | Toiture & charpente | Prix et coût |
| surélévation nantes | 90 | 18,77 | 34 | oui | Extension & surélévation | Pro + ville ou zone |
| prix au m2 pour peindre une facade | 720 | 2,94 | 34 | oui | Façade & ravalement | Prix et coût |
| prix chape liquide m2 | 720 | 3 | 35 | oui | Maçonnerie & gros œuvre | Prix et coût |
| couvreur bry sur marne | 210 | 7,86 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur suresnes | 320 | 3,94 | 27 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur auch | 720 | 2,29 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur auray | 480 | 3,41 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste caen | 590 | 1,98 | 26 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur le vesinet | 260 | 5,69 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| ravalement de facade brest | 390 | 2,99 | 27 | oui | Façade & ravalement | Pro + ville ou zone |
| couvreur saran | 170 | 9,17 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| isolation extérieure haut-rhin | 50 | 16,5 | 20 | oui | Isolation extérieure | Pro + ville ou zone |
| charpente le mans | 140 | 8,71 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur fontenay sous bois | 260 | 5,37 | 35 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur mauguio | 320 | 4,29 | 35 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur guipavas | 390 | 3,48 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente mont de marsan | 170 | 4,66 | 23 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste piscine | 390 | 2,09 | 25 | oui | Piscine | Trouver un pro (générique) |
| prix pose m2 parquet | 880 | 1,72 | 35 | oui | Rénovation intérieure | Prix et coût |
| prix pose carrelage m2 sans fourniture | 720 | 1,79 | 31 | oui | Rénovation intérieure | Prix et coût |
| isolation extérieure caen | 140 | 7,72 | 33 | oui | Isolation extérieure | Pro + ville ou zone |
| charpente rouen | 170 | 3,91 | 22 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste limoges | 390 | 1,69 | 22 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur 82 | 210 | 4,68 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente angers | 170 | 3,72 | 22 | oui | Toiture & charpente | Pro + ville ou zone |
| maçonnerie terrassement | 110 | 6,75 | 26 | oui | Terrassement & VRD | Trouver un pro (générique) |
| entreprise véranda | 140 | 7,42 | 35 | oui | Pergola, véranda, abri | Trouver un pro (générique) |
| ravalement brest | 390 | 2,62 | 34 | oui | Façade & ravalement | Pro + ville ou zone |
| couvreur saint-marcel | 210 | 4,64 | 33 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur herblay | 170 | 5,75 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| cout vidange fosse septique | 390 | 2,85 | 31 | oui | Assainissement | Prix et coût |
| couvreur chatellerault | 320 | 2,52 | 29 | oui | Toiture & charpente | Pro + ville ou zone |
| prix portail coulissant motorisé 4m avec pose | 590 | 1,53 | 26 | oui | Clôture & portail | Prix et coût |
| prix m2 parquet flottant pose | 720 | 1,65 | 33 | oui | Rénovation intérieure | Prix et coût |
| isolation extérieure rouen | 110 | 9,13 | 35 | oui | Isolation extérieure | Pro + ville ou zone |
| couvreur uzes | 260 | 3,3 | 31 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste poitiers | 480 | 2,02 | 35 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur epernay | 320 | 2,63 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur yvetot | 320 | 2,91 | 35 | oui | Toiture & charpente | Pro + ville ou zone |
| couvreur velizy | 260 | 3,08 | 32 | oui | Toiture & charpente | Pro + ville ou zone |
| prix fenetre pvc et pose | 260 | 3,76 | 32 | oui | Menuiserie | Prix et coût |
| artisan terrasse exterieur | 260 | 3,09 | 33 | oui | Terrasse | Trouver un pro (générique) |
| paysagiste-pisciniste | 390 | 2,09 | 33 | oui | Piscine | Trouver un pro (générique) |
| charpente montpellier | 140 | 4,48 | 27 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente tarbes | 170 | 4,77 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente pau | 170 | 3,78 | 28 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente chambery | 140 | 3,81 | 24 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste orleans | 320 | 1,71 | 24 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur thouars | 170 | 3,97 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| constructeur de véranda | 90 | 9,12 | 35 | oui | Pergola, véranda, abri | Trouver un pro (générique) |
| paysagiste avignon | 210 | 2,96 | 28 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur chambéry | 390 | 2,01 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| prix ravalement facade maison 200m2 | 320 | 3,03 | 34 | oui | Façade & ravalement | Prix et coût |
| paysagiste oise | 260 | 1,82 | 23 | oui | Paysage & jardin | Pro + ville ou zone |
| charpente gap | 140 | 4,63 | 30 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste ajaccio | 170 | 2,19 | 18 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur montereau-fault-yonne | 170 | 3,81 | 31 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste sarthe | 320 | 2,2 | 34 | oui | Paysage & jardin | Pro + ville ou zone |
| paysagiste dole | 390 | 1,7 | 33 | oui | Paysage & jardin | Pro + ville ou zone |
| paysagiste le havre | 210 | 2,7 | 29 | oui | Paysage & jardin | Pro + ville ou zone |
| paysagiste dans la loire | 170 | 2,95 | 26 | oui | Paysage & jardin | Pro + ville ou zone |
| véranda bioclimatique prix | 320 | 2,56 | 33 | oui | Pergola, véranda, abri | Prix et coût |
| charpente rennes | 210 | 2,5 | 29 | oui | Toiture & charpente | Pro + ville ou zone |
| véranda alu prix | 140 | 4,65 | 29 | oui | Pergola, véranda, abri | Prix et coût |
| vidange fosse septique tarif 2026 | 260 | 2,44 | 29 | oui | Assainissement | Prix et coût |
| maçon chambery | 140 | 3,18 | 26 | oui | Maçonnerie & gros œuvre | Pro + ville ou zone |
| maçon toulon | 260 | 2,28 | 34 | oui | Maçonnerie & gros œuvre | Pro + ville ou zone |
| paysagiste bourg-en-bresse | 210 | 2,36 | 29 | oui | Paysage & jardin | Pro + ville ou zone |
| paysagiste terrassement | 90 | 6,01 | 34 | oui | Terrassement & VRD | Trouver un pro (générique) |
| maçon beauvais | 140 | 3,03 | 28 | oui | Maçonnerie & gros œuvre | Pro + ville ou zone |
| prix pergola bioclimatique avec pose | 260 | 2,47 | 34 | oui | Pergola, véranda, abri | Prix et coût |
| reparation véranda ancienne | 210 | 3,12 | 34 | oui | Pergola, véranda, abri | Problème et réparation |
| ravalement de facade rennes | 70 | 5,79 | 28 | oui | Façade & ravalement | Pro + ville ou zone |
| paysagiste angouleme | 170 | 2,13 | 26 | oui | Paysage & jardin | Pro + ville ou zone |
| couvreur flers | 170 | 2,24 | 31 | oui | Toiture & charpente | Pro + ville ou zone |
| charpente la rochelle | 110 | 3,89 | 34 | oui | Toiture & charpente | Pro + ville ou zone |
| paysagiste hyeres | 140 | 2,35 | 28 | oui | Paysage & jardin | Pro + ville ou zone |
| paysagiste douai | 140 | 2,55 | 30 | oui | Paysage & jardin | Pro + ville ou zone |
| prix ravalement façade maison 150m2 | 210 | 2,32 | 33 | oui | Façade & ravalement | Prix et coût |
| véranda 10 m2 | 260 | 1,84 | 33 | oui | Pergola, véranda, abri | Prix et coût |
| baie vitrée prix pose | 110 | 4,03 | 31 | oui | Menuiserie | Prix et coût |
| prix isolation façade extérieure | 90 | 5,01 | 34 | oui | Façade & ravalement | Prix et coût |
| prix véranda 12m2 | 170 | 1,95 | 30 | oui | Pergola, véranda, abri | Prix et coût |
| cout isolation extérieure au m2 | 110 | 3,52 | 34 | oui | Isolation extérieure | Prix et coût |
| prix pose volet roulant solaire | 90 | 2,9 | 27 | oui | Menuiserie | Prix et coût |
| isolation extérieure des murs prix m2 | 110 | 2,97 | 34 | oui | Isolation extérieure | Prix et coût |
| véranda akena prix | 110 | 2,1 | 28 | oui | Pergola, véranda, abri | Prix et coût |
| maçon chatellerault | 90 | 2,39 | 33 | oui | Maçonnerie & gros œuvre | Pro + ville ou zone |
| maçon arles | 90 | 2,21 | 33 | oui | Maçonnerie & gros œuvre | Pro + ville ou zone |
| terrassement albi | 50 | 3,35 | 30 | oui | Terrassement & VRD | Pro + ville ou zone |
| prix fenêtre double vitrage bois avec pose | 90 | 2,04 | 26 | oui | Menuiserie | Prix et coût |
| véranda aluminium prix au m2 | 70 | 2,12 | 33 | oui | Pergola, véranda, abri | Prix et coût |
| petite véranda prix | 70 | 1,58 | 29 | oui | Pergola, véranda, abri | Prix et coût |
| ravalement de façade saint-herblain | 50 | 1,5 | 28 | oui | Façade & ravalement | Pro + ville ou zone |

## 9. GEO : être cité par les IA

Réponse de ChatGPT (recherche web) à « quel site pour trouver un bon couvreur » le 24/11/2026 :

| Ordre | Élément | Type | Détail |
|---|---|---|---|
| 1 | Travaux.com | Plateforme recommandée | « Mon premier choix » : devis de réfection, mise en relation avec plusieurs artisans, profils et avis |
| 2 | Habitatpresto | Plateforme recommandée | Devis gratuit, adapté aux rénovations importantes |
| 3 | Ootravaux | Plateforme recommandée | Comparaison de professionnels et de devis |
| 4 | Houzz | Plateforme recommandée | Recherche par secteur, photos de réalisations, avis |
| 5 | PagesJaunes | Plateforme recommandée | Trouver des couvreurs proches, avis, appel direct |
| 6 | francenum.gouv.fr | Source citée | Guide « Professionnels du BTP : comment trouver des clients via les plateformes de mise en relation ? » (2021) |
| 7 | legibat.fr | Source citée | Comparatif « Quel site pour trouver un artisan ? » publié le 03/11/2026 |
| 8 | obat.fr (blog) | Source citée | Article « Artisans : où acheter des devis travaux ? » (06/2026) |

Actions : obtenir une mention dans les comparatifs cités (legibat, francenum, blogs de logiciels artisans), publier une page méthode claire et des études de prix sourcées et datées, garder un profil d’entreprise cohérent partout (nom, adresse, SIREN).

## 10. Concurrence

| Site | Type | Visites Google/mois | Mots-clés | Domaines référents | Autorité |
|---|---|---|---|---|---|
| travaux.com | Plateforme de devis (mise en relation) | 235 791 | 48 889 | 5 697 | 609 |
| habitatpresto.com | Plateforme de devis (mise en relation) | 40 119 | 29 357 | 3 757 | 406 |
| quotatis.fr | Plateforme de devis (mise en relation) | 227 | 522 | 1 501 | 362 |
| ootravaux.fr | Plateforme de devis (mise en relation) | 47 435 | 25 726 | 1 725 | 421 |
| illico-travaux.com | Réseau de courtiers en travaux | 23 892 | 4 328 | 1 588 | 382 |
| starofservice.com | Place de marché de services | 249 416 | 215 914 | 4 583 | 511 |
| allovoisins.com | Place de marché de services | 211 827 | 43 133 | 2 108 | 348 |
| jemepropose.com | Place de marché de services | 8 717 | 7 087 | 1 643 | 245 |
| pagesjaunes.fr | Annuaire | 27 151 441 | 2 951 215 | — | — |
| lesbonsartisans.fr | Annuaire d’artisans | 11 291 | 6 647 | 464 | 423 |
| houzz.fr | Annuaire et inspiration | 85 242 | 34 172 | 5 600 | 559 |
| mesdepanneurs.fr | Annuaire dépannage | 80 797 | 34 258 | 2 920 | 318 |
| obat.fr | Logiciel artisan + annuaire (travaux.obat.fr) | 51 370 | 29 067 | 3 964 | 415 |
| batiweb.com | Média et annuaire BTP | 47 186 | 17 392 | 4 183 | 400 |
| hellopro.fr | Annuaire B2B | 107 767 | 60 910 | 8 553 | 370 |
| hellowatt.fr | Rénovation énergétique | 259 354 | 30 360 | 4 274 | 422 |
| effy.fr | Rénovation énergétique | 74 411 | 17 148 | 2 141 | 369 |
| conseils-thermiques.org | Guide rénovation énergétique | 36 268 | 6 519 | 2 022 | 300 |
| guide-piscine.fr | Média piscine | 545 749 | 39 269 | 3 218 | 341 |
| prix-pose.com | Guide de prix | 14 553 | 11 635 | 3 882 | 371 |
| artisansfrance.fr | Votre domaine | 6 | 17 | 56 | — |

### Qui est en page 1 (échantillons)

| Échantillon | Domaine | Requêtes présentes | Testées | Position méd. |
|---|---|---|---|---|
| Prix, devis, réparation | travaux.com | 15 | 26 | 5 |
| Prix, devis, réparation | ootravaux.fr | 15 | 26 | 14 |
| Prix, devis, réparation | youtube.com | 14 | 26 | 16 |
| Prix, devis, réparation | facebook.com | 14 | 26 | 44 |
| Prix, devis, réparation | prix-pose.com | 12 | 26 | 17 |
| Prix, devis, réparation | habitatpresto.com | 12 | 26 | 20 |
| Prix, devis, réparation | lamaisonsaintgobain.fr | 11 | 26 | 15 |
| Prix, devis, réparation | prix-travaux-m2.com | 10 | 26 | 41 |
| Prix, devis, réparation | dsdrenov.com | 8 | 26 | 20 |
| Prix, devis, réparation | monsieurpeinture.com | 8 | 26 | 28 |
| Prix, devis, réparation | avenir-renovations.fr | 8 | 26 | 34 |
| Prix, devis, réparation | tiktok.com | 8 | 26 | 27 |
| Prix, devis, réparation | calculeo.fr | 7 | 26 | 17 |
| Prix, devis, réparation | illico-travaux.com | 6 | 26 | 2 |
| Prix, devis, réparation | quelleenergie.fr | 6 | 26 | 8 |
| Pro + ville ou département | pagesjaunes.fr | 26 | 26 | 9 |
| Pro + ville ou département | travaux.obat.fr | 24 | 26 | 6 |
| Pro + ville ou département | travaux.com | 22 | 26 | 2 |
| Pro + ville ou département | allovoisins.com | 22 | 26 | 7 |
| Pro + ville ou département | qualitoit.fr | 21 | 26 | 22 |
| Pro + ville ou département | ab-couverture.fr | 21 | 26 | 29 |
| Pro + ville ou département | rdvartisans.fr | 20 | 26 | 14 |
| Pro + ville ou département | couvreurinfo.com | 19 | 26 | 28 |
| Pro + ville ou département | facebook.com | 19 | 26 | 31 |
| Pro + ville ou département | trustup.fr | 16 | 26 | 13 |
| Pro + ville ou département | toitureinfo.com | 16 | 26 | 38 |
| Pro + ville ou département | starofservice.com | 15 | 26 | 25 |
| Pro + ville ou département | technitoit.com | 14 | 26 | 11 |
| Pro + ville ou département | mappy.com | 10 | 26 | 16 |
| Pro + ville ou département | threebestrated.fr | 9 | 26 | 8 |

## 11. Acquisition

| Canal | Priorité | Délai | Coût | Rôle |
|---|---|---|---|---|
| SEO (ce site) | 1 | 4 à 12 mois | Temps + contenu | Volume durable et gratuit sur les océans bleus (départements, prix, problèmes) |
| GEO (ChatGPT, Perplexity, Claude) | 1 | 2 à 6 mois | Faible | Être dans les comparatifs que les IA citent (legibat.fr, francenum, blogs) et publier une page méthode claire |
| Google Local Services Ads | 1 dès qu’il y a du budget | Immédiat | Budget pub | Déjà maîtrisé par Celexia : appels qualifiés pendant que le SEO monte |
| Google Ads « devis + métier » | 2 | Immédiat | CPC élevé | Tester les pages devis ; mesurer le coût par demande qualifiée avant d’investir |
| Meta Ads (formulaires) | 2 | Immédiat | Budget pub | Toiture et piscine : volume rapide, qualification forte nécessaire |
| YouTube et TikTok | 3 | 1 à 6 mois | Tournage | YouTube et TikTok apparaissent dans les résultats « prix » et « réparation » : vidéos courtes de chantiers et de prix |
| Partenariats d’apport | 2 | 1 à 3 mois | Commission | Agences immobilières, syndics, diagnostiqueurs, courtiers, négoces : sources de demandes qualifiées |
| Annuaires et presse locale | 2 | 1 à 3 mois | Faible | Liens et confiance : un domaine neuf a besoin de domaines référents réels |

## 12. Feuille de route

| Période | Chantier | Actions |
|---|---|---|
| Semaines 1 et 2 | Fondations | Choisir les métiers et départements couverts ; rédiger la promesse (sans exclusivité) ; mentions plateforme L111-7, CGU, liste des partenaires (CNIL) ; formulaire en étapes avec les 4 critères de qualification ; suivi des conversions |
| Semaines 3 à 6 | Socle de pages | Accueil, 6 à 9 pages métier, 6 à 9 pages devis, 10 guides de prix à plus forte valeur, page méthode et sélection, espace artisans |
| Semaines 7 à 10 | Départements | Pages métier × département pour les départements couverts, puis les plus recherchés (77, 91, 83, 06…), chacune avec contenu local et appel aux artisans |
| Semaines 11 à 13 | Autorité | Inscriptions annuaires, comparatifs GEO, partenariats, premières études de prix publiées pour obtenir des liens ; mesure : demandes, taux de qualification, chantiers signés |
| Mois 4 à 6 | Extension | Villes à volume, guides problèmes et aides, vidéos ; ouvrir un nouveau département quand il a des artisans actifs |

## 13. Cadre légal (à valider avec l’avocat de Celexia)

| Sujet | Ce qu’il faut faire | Source |
|---|---|---|
| Plateforme en ligne (Code de la consommation, L111-7) | Rubrique accessible depuis toutes les pages : critères de classement et de référencement, existence d’une rémunération ou d’un lien qui les influence, qualité des professionnels, règlement des litiges | DGCCRF, INC, décret 2017-1434 |
| Pratiques relevées par la DGCCRF sur les plateformes de travaux | Ne pas annoncer la gratuité si des frais existent ; dire qui rappelle le client (les consommateurs démarchés ne savaient pas si l’appelant était lié à la plateforme) ; informer sur la rémunération | DGCCRF, enquête plateformes de travaux à domicile |
| Transmission des coordonnées aux artisans (RGPD) | Informer sur le formulaire, liste à jour des partenaires, possibilité de s’opposer ; consentement par case non cochée si les partenaires démarchent par e-mail ou SMS | CNIL, transmission des données à des partenaires (2026) |
| Avis en ligne (L111-7-2) | Information loyale sur la collecte et la modération des avis ; ne jamais publier d’avis ou de notes non vérifiables (le site actuel affiche une note et des « artisans certifiés ») | Code de la consommation |
| Règles anti-spam de Google | Pas de pages satellites (doorway) ni de contenu produit en masse sans valeur : chaque page ville ou département doit apporter du contenu propre | Google Search Central, spam policies (mars 2024) |
| Apport d’affaires (modèle Celexia) | Commission sur chantier signé ; à dire clairement au client (rémunération par l’artisan) ; contrat d’apporteur avec chaque artisan | À valider avec l’avocat de Celexia |

## 14. Décisions à prendre par Thomas avant de coder

- Départements ouverts au lancement (ceux où le réseau a des artisans actifs).
- Métiers ouverts au lancement.
- Nombre d’artisans qui reçoivent chaque demande.
- Seuil de chantier et traitement des petites demandes.
- Délai de rappel promis et qui rappelle.
- Ce que la sélection des artisans vérifie réellement (pour la page méthode).
- Sort des demandes hors zone.

## 15. Méthode et limites

- Mots-clés : suggestions DataForSEO Labs (Google France) pour une vingtaine de métiers et d’intentions ; requêtes de moins de 20 recherches par mois exclues ; variantes regroupées.
- Difficulté : moyenne de la difficulté DataForSEO et de la force des domaines en page 1, ramenée sur 100. Score : volume × CPC × poids de l’intention, divisé par la difficulté.
- Zones vérifiées contre le référentiel officiel des communes, départements et régions (Etalab) ; requêtes d’emploi, de formation et hors de France exclues.
- Volumes et positions nationaux ; une requête locale peut donner d’autres résultats depuis la ville.
- Certains appels DataForSEO plafonnent à 10 résultats (concurrents de domaine, volumes Google Ads).
- ChatGPT : une seule formulation testée.
- CPC en dollars (DataForSEO).