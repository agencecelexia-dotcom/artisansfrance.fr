import type { TradeContent, SourceLink } from "./types";

// Contenu éditorial des hubs métier. Règles : aucun prix, aucune statistique, aucun avis, aucune promesse de délai.
// Les seuls chiffres sont des faits juridiques généraux (garanties légales). Texte à relire avant mise en ligne.

const SP: SourceLink = { label: "service-public.fr", url: "https://www.service-public.fr/" };
const RENOV: SourceLink = { label: "France Rénov'", url: "https://france-renov.gouv.fr/" };
const DGCCRF: SourceLink = { label: "DGCCRF", url: "https://www.economie.gouv.fr/dgccrf" };

const GARANTIES =
  "Les travaux de construction sont couverts par des garanties légales : la garantie de parfait achèvement (un an après la réception), la garantie biennale pour les éléments d'équipement dissociables (deux ans) et la garantie décennale pour les dommages qui compromettent la solidité de l'ouvrage (dix ans). Demandez l'attestation d'assurance décennale en cours de validité avant de signer.";

const URBANISME =
  "Les travaux qui modifient l'aspect extérieur d'un bâtiment relèvent en général d'une déclaration préalable ou d'un permis, et les règles locales (plan local d'urbanisme, secteurs protégés, avis de l'architecte des bâtiments de France) peuvent s'ajouter. Renseignez-vous auprès du service urbanisme de votre mairie avant de signer le devis.";

export const TRADES: Record<string, TradeContent> = {
  couvreur: {
    slug: "couvreur",
    nom: "Couvreur",
    un: "un couvreur",
    accroche: "Décrivez votre chantier de toiture : nous l'étudions et vous mettons en relation avec un couvreur sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Un couvreur pose, répare et entretient la couverture d'un bâtiment : tuiles, ardoises, zinc, bac acier, mais aussi gouttières, solins, fenêtres de toit et étanchéité des toits plats. C'est le métier à appeler pour une fuite, une toiture qui vieillit ou un projet de rénovation.",
      "Artisans France ne vous laisse pas chercher seul : vous décrivez votre chantier en deux minutes, un conseiller Celexia l'étudie et vous rappelle, puis un artisan sélectionné de votre secteur vient visiter et chiffrer. Le service est gratuit pour vous : nous sommes rémunérés par l'artisan, uniquement si votre chantier est signé.",
    ],
    travaux: [
      { titre: "Refaire une toiture", texte: "Dépose de l'ancienne couverture, contrôle de la charpente et du support, pose d'un écran sous toiture, puis de la nouvelle couverture et de la zinguerie." },
      { titre: "Réparer une fuite ou remplacer des éléments", texte: "Recherche de l'origine de l'infiltration (tuile cassée, noue, solin, cheminée), puis réparation ciblée. Une fuite visible au plafond vient souvent de plus haut dans la toiture." },
      { titre: "Nettoyer, démousser, traiter", texte: "Nettoyage de la couverture, démoussage et traitement hydrofuge pour ralentir le retour de la mousse et protéger les tuiles ou les ardoises." },
      { titre: "Gouttières, zinguerie, fenêtres de toit", texte: "Pose et remplacement des gouttières et descentes, des solins et des noues, installation de fenêtres de toit avec leur étanchéité." },
      { titre: "Isoler la toiture", texte: "Isolation des combles ou de la couverture, souvent réalisée en même temps que la réfection pour éviter de démonter deux fois." },
    ],
    solutions: [
      { titre: "Tuile terre cuite ou béton", texte: "Très répandue, large choix de formes et de couleurs, elle se pose sur des toitures à pente. Les règles locales imposent parfois un modèle ou une teinte." },
      { titre: "Ardoise naturelle ou fibrociment", texte: "Couverture fine et durable, caractéristique de plusieurs régions. Sa pose demande un savoir-faire précis et une charpente adaptée." },
      { titre: "Zinc et bac acier", texte: "Légers, adaptés aux pentes faibles, aux extensions et aux toitures contemporaines. Le zinc est aussi le matériau classique de la zinguerie." },
      { titre: "Toit plat et étanchéité", texte: "Membrane bitumineuse, synthétique ou végétalisation : l'étanchéité d'un toit-terrasse relève d'un savoir-faire spécifique, distinct de la couverture en pente." },
    ],
    etapes: [
      { titre: "Visite sur place", texte: "Le couvreur monte sur le toit ou l'inspecte depuis les combles : état de la couverture, de la charpente, de la zinguerie et des raccords." },
      { titre: "Devis détaillé", texte: "Surface, matériaux, dépose et évacuation, échafaudage, zinguerie, isolation éventuelle : chaque poste figure au devis, avec la TVA applicable et la durée de validité." },
      { titre: "Démarches d'urbanisme", texte: "Si l'aspect de la toiture change (matériau, couleur, fenêtres de toit), une déclaration préalable est généralement nécessaire avant les travaux." },
      { titre: "Chantier", texte: "Mise en place des protections et de l'échafaudage, dépose, réparations de charpente éventuelles, pose de la couverture et de la zinguerie. La météo peut décaler les dates." },
      { titre: "Réception", texte: "Vous contrôlez le travail avec l'artisan et signez le procès-verbal de réception, avec ou sans réserves. Les garanties légales courent à partir de cette date." },
    ],
    questions: [
      "Pouvez-vous me fournir votre attestation d'assurance décennale en cours de validité ?",
      "Le devis détaille-t-il la dépose, l'évacuation des gravats, l'échafaudage et la zinguerie ?",
      "Qui réalise les travaux : vos équipes ou un sous-traitant ?",
      "Que se passe-t-il si vous découvrez une charpente abîmée une fois la couverture déposée ?",
      "Quelles garanties sont attachées aux matériaux posés, et comment les fait-on jouer ?",
      "Comment le chantier est-il protégé en cas de pluie, et quelle est la date de début prévue ?",
    ],
    reglementation: [URBANISME, GARANTIES],
    faq: [
      { q: "Qui appeler en cas de fuite de toiture ?", a: "Un couvreur. En attendant, protégez vos biens, récupérez l'eau et prévenez votre assureur : une déclaration rapide de sinistre peut être nécessaire. Ne montez pas sur le toit par temps humide." },
      { q: "Faut-il une autorisation pour refaire une toiture ?", a: "Cela dépend de ce qui change. Une réfection à l'identique est souvent possible sans démarche lourde, mais un changement de matériau, de couleur ou la pose de fenêtres de toit relève en général d'une déclaration préalable. Les règles locales et les secteurs protégés peuvent s'ajouter : demandez à votre mairie." },
      { q: "Comment choisir un couvreur ?", a: "Demandez plusieurs devis détaillés, vérifiez l'attestation décennale, comparez ce que chaque devis comprend (dépose, échafaudage, zinguerie) et pas seulement le total, et demandez des références de chantiers comparables au vôtre." },
      { q: "Combien de temps dure un chantier de toiture ?", a: "La durée dépend de la surface, du type de couverture, de l'état de la charpente et de la météo. Le couvreur vous donne une estimation après la visite ; elle n'est fiable qu'une fois la toiture vue de près." },
      { q: "Artisans France est-il payant ?", a: "Non, pas pour vous. Nous sommes rémunérés par l'artisan, sous forme de commission, uniquement si votre chantier est signé. Nous ne revendons pas vos coordonnées à une liste d'entreprises." },
    ],
    sources: [SP, RENOV, DGCCRF],
    typesTravaux: ["Refaire toute la toiture", "Réparer une fuite", "Remplacer des tuiles ou des ardoises", "Nettoyage, démoussage, traitement", "Gouttières et zinguerie", "Fenêtre de toit", "Isolation de la toiture", "Charpente", "Autre"],
    autour: "Un couvreur près de chez vous connaît les contraintes de votre secteur : vent, neige, matériaux locaux, règles d'urbanisme. Indiquez votre code postal ou autorisez la localisation pour accéder à la page de votre département ou de votre ville, ou décrivez directement votre chantier.",
  },

  macon: {
    slug: "macon",
    nom: "Maçon",
    un: "un maçon",
    accroche: "Décrivez votre chantier de maçonnerie : nous l'étudions et vous mettons en relation avec un maçon sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Un maçon construit et rénove le gros œuvre : fondations, murs porteurs, dalles, ouvertures dans un mur, extensions, clôtures maçonnées, terrasses. C'est lui qui assure la solidité de l'ouvrage, avant les travaux de second œuvre.",
      "Décrivez votre projet : nous l'étudions, un conseiller Celexia vous rappelle pour le préciser, puis un artisan sélectionné de votre secteur vient visiter et chiffrer. Gratuit pour vous, rémunération par l'artisan uniquement si le chantier est signé.",
    ],
    travaux: [
      { titre: "Construire ou agrandir", texte: "Fondations, élévation des murs, dalle, charpente et couverture : une extension fait intervenir plusieurs corps de métier coordonnés." },
      { titre: "Ouvrir ou modifier un mur", texte: "Création d'une ouverture dans un mur porteur : elle demande une étude, un dimensionnement de linteau et un étaiement. Ne jamais l'improviser." },
      { titre: "Dalles, terrasses, chapes", texte: "Réalisation de dalles béton, chapes, terrasses et accès, avec le drainage et les pentes nécessaires." },
      { titre: "Murs, clôtures et soutènements", texte: "Murs de clôture, murets, murs de soutènement et enduits de finition." },
      { titre: "Rénovation de maçonnerie ancienne", texte: "Reprise de joints, consolidation, traitement de l'humidité et enduits adaptés aux murs en pierre ou en brique." },
    ],
    solutions: [
      { titre: "Parpaing, brique, béton banché", texte: "Les techniques diffèrent par la rapidité de pose, la résistance et les performances thermiques. Le choix dépend du projet, du terrain et de la réglementation thermique." },
      { titre: "Pierre et maçonnerie traditionnelle", texte: "Chaux, joints à la pierre, enduits perspirants : pour les bâtiments anciens, on évite le ciment pur qui emprisonne l'humidité." },
      { titre: "Fondations adaptées au sol", texte: "La nature du sol conditionne le type de fondations. Une étude de sol peut être exigée dans certaines zones sensibles au retrait-gonflement des argiles." },
    ],
    etapes: [
      { titre: "Visite et cadrage du projet", texte: "Le maçon examine l'existant, le terrain et vos besoins, et signale ce qui nécessite un architecte, un bureau d'études ou une autorisation." },
      { titre: "Devis détaillé", texte: "Postes de gros œuvre, matériaux, évacuation des déblais, échafaudage et délais. Un chantier d'extension est chiffré par lot." },
      { titre: "Autorisations", texte: "Selon la surface créée, une déclaration préalable ou un permis de construire est nécessaire, parfois avec recours à un architecte." },
      { titre: "Chantier et suivi", texte: "Implantation, fondations, élévation, puis coordination avec les autres corps d'état. Les points d'arrêt (fondations, ferraillage) se contrôlent avant de couler." },
      { titre: "Réception", texte: "Réception des travaux avec procès-verbal. Les garanties légales courent à partir de cette date." },
    ],
    questions: [
      "Pouvez-vous me fournir votre attestation décennale couvrant la maçonnerie et le gros œuvre ?",
      "Qui s'occupe de l'étude de sol et des plans si le projet l'exige ?",
      "Le devis inclut-il l'évacuation des déblais, l'échafaudage et la remise en état du terrain ?",
      "Comment coordonnez-vous le chantier avec la charpente, la couverture et les autres corps de métier ?",
      "Quelles sont les étapes de contrôle avant de couler les fondations et les dalles ?",
    ],
    reglementation: [URBANISME, GARANTIES],
    faq: [
      { q: "Faut-il un permis de construire pour une extension ?", a: "Cela dépend de la surface créée et de la zone où se trouve votre maison. Une déclaration préalable suffit pour les petites surfaces, un permis est requis au-delà de seuils fixés par le code de l'urbanisme. Votre mairie vous indique la procédure applicable." },
      { q: "Peut-on ouvrir un mur porteur ?", a: "Oui, mais jamais sans étude. Il faut calculer et poser un linteau adapté, étayer pendant les travaux et, en copropriété, obtenir l'accord de l'assemblée générale." },
      { q: "Comment comparer deux devis de maçonnerie ?", a: "Vérifiez que les deux couvrent le même périmètre : fondations, déblais, échafaudage, fournitures, finitions. Un devis moins cher peut simplement être incomplet." },
      { q: "Artisans France est-il payant ?", a: "Non, pas pour vous. Nous sommes rémunérés par l'artisan, uniquement si votre chantier est signé." },
    ],
    sources: [SP, RENOV, DGCCRF],
    typesTravaux: ["Extension de maison", "Ouverture dans un mur", "Dalle ou terrasse", "Mur ou clôture", "Fondations", "Rénovation de maçonnerie", "Autre"],
    autour: "Un maçon de votre secteur connaît la nature des sols et les règles d'urbanisme locales. Indiquez votre code postal pour accéder à la page de votre département ou de votre ville, ou décrivez directement votre chantier.",
  },

  "facade-ravalement": {
    slug: "facade-ravalement",
    nom: "Ravalement de façade",
    un: "une entreprise de ravalement de façade",
    accroche: "Décrivez votre chantier de façade : nous l'étudions et vous mettons en relation avec un artisan du ravalement sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Le ravalement de façade nettoie, répare et protège les murs extérieurs : enduit, peinture, traitement des fissures, remplacement de pierres. Il peut aussi être l'occasion d'isoler par l'extérieur.",
      "Dans certaines communes, le ravalement est obligatoire à intervalles réguliers ; dans d'autres, il dépend de règles locales. Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Nettoyage et traitement", texte: "Nettoyage de la façade (hydrogommage, lavage), traitement des mousses et des salissures." },
      { titre: "Réparation des fissures et du support", texte: "Rebouchage, reprise de l'enduit, traitement des fissures actives après avoir cherché leur cause." },
      { titre: "Enduit et peinture de façade", texte: "Application d'un enduit ou d'une peinture adaptés au support, avec la bonne préparation." },
      { titre: "Isolation thermique par l'extérieur", texte: "Pose d'un isolant sous enduit ou sous bardage, couplée au ravalement pour ne pas intervenir deux fois." },
    ],
    solutions: [
      { titre: "Enduit monocouche ou traditionnel", texte: "Plusieurs types d'enduit existent selon le support et l'aspect recherché. Sur un mur ancien, on privilégie des enduits perméables à la vapeur d'eau." },
      { titre: "Peinture de façade", texte: "Les peintures pour façade se choisissent selon le support, l'exposition et le niveau de protection attendu." },
      { titre: "Ravalement avec isolation", texte: "L'isolation par l'extérieur améliore le confort thermique ; elle modifie l'aspect de la façade et exige donc des démarches d'urbanisme." },
    ],
    etapes: [
      { titre: "Diagnostic de la façade", texte: "Examen du support, des fissures, de l'humidité et des points sensibles (appuis, soubassement)." },
      { titre: "Devis et choix des finitions", texte: "Surface, échafaudage, préparation, produits et finitions. Pour un immeuble, le vote de l'assemblée générale est nécessaire." },
      { titre: "Autorisation", texte: "Un ravalement qui modifie l'aspect de la façade nécessite en général une déclaration préalable, souvent avec avis de l'architecte des bâtiments de France en secteur protégé." },
      { titre: "Chantier", texte: "Installation de l'échafaudage, préparation, application, finitions et nettoyage." },
      { titre: "Réception", texte: "Contrôle de l'aspect et de l'uniformité avec l'artisan, puis procès-verbal de réception." },
    ],
    questions: [
      "Quelles causes avez-vous identifiées pour les fissures, et comment seront-elles traitées ?",
      "Le devis comprend-il l'échafaudage, la préparation du support et la protection des ouvertures ?",
      "Quels produits seront utilisés, et sont-ils adaptés à mon support ?",
      "Le ravalement nécessite-t-il une déclaration préalable chez moi ?",
      "Pouvez-vous me fournir votre attestation décennale ?",
    ],
    reglementation: [URBANISME, GARANTIES],
    faq: [
      { q: "Le ravalement de façade est-il obligatoire ?", a: "Dans certaines communes, un arrêté municipal impose le ravalement à intervalles réguliers. Renseignez-vous auprès de votre mairie : l'obligation dépend de votre commune et du secteur où se trouve le bâtiment." },
      { q: "Une déclaration préalable est-elle nécessaire ?", a: "Oui en général, dès que l'aspect extérieur change (couleur, matériau, isolation). Les secteurs protégés ajoutent des contraintes : consultez le service urbanisme avant de signer." },
      { q: "Peut-on isoler en même temps ?", a: "C'est l'occasion idéale, car l'échafaudage est déjà là. L'isolation par l'extérieur suppose une étude du mur et des démarches d'urbanisme." },
    ],
    sources: [SP, RENOV, DGCCRF],
    typesTravaux: ["Nettoyage de façade", "Peinture de façade", "Enduit de façade", "Traitement de fissures", "Ravalement avec isolation extérieure", "Autre"],
    autour: "Un artisan du ravalement de votre secteur connaît les règles de votre commune. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre chantier.",
  },

  "isolation-exterieure": {
    slug: "isolation-exterieure",
    nom: "Isolation extérieure",
    un: "une entreprise d'isolation extérieure",
    accroche: "Décrivez votre projet d'isolation par l'extérieur : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "L'isolation thermique par l'extérieur (ITE) enveloppe les murs d'un isolant recouvert d'un enduit ou d'un bardage. Elle améliore le confort, limite les ponts thermiques et ne réduit pas la surface habitable.",
      "Les aides à la rénovation énergétique dépendent de conditions précises (logement, revenus, artisan qualifié). Décrivez votre projet : nous l'étudions et un artisan sélectionné vous contacte. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "ITE sous enduit", texte: "Panneaux isolants collés ou fixés, puis armature et enduit de finition." },
      { titre: "ITE sous bardage", texte: "Isolant posé sur une ossature, recouvert d'un bardage bois, composite ou métallique." },
      { titre: "Traitement des points singuliers", texte: "Soubassements, appuis de fenêtres, angles et débords de toiture : c'est là que se joue la qualité de la pose." },
    ],
    solutions: [
      { titre: "Isolants rigides ou biosourcés", texte: "Polystyrène, laine minérale, fibre de bois : chaque isolant a ses performances, son comportement à l'humidité et son coût. L'artisan vous conseille selon le mur et l'usage." },
      { titre: "Enduit ou bardage", texte: "L'enduit donne un aspect lisse proche de l'existant ; le bardage change l'aspect de la maison et se prête à des esthétiques contemporaines." },
    ],
    etapes: [
      { titre: "Étude du bâti", texte: "État des murs, humidité, ventilation, ouvertures : une ITE se prépare sur le bâti existant." },
      { titre: "Devis et aides", texte: "Le devis précise l'isolant, son épaisseur, les finitions et la qualification de l'entreprise, nécessaire pour certaines aides." },
      { titre: "Autorisation", texte: "La façade change d'aspect : une déclaration préalable est requise, avec des contraintes particulières en secteur protégé." },
      { titre: "Chantier", texte: "Échafaudage, préparation, pose de l'isolant, enduit ou bardage, reprise des ouvertures." },
      { titre: "Réception", texte: "Contrôle des finitions et des points singuliers, puis procès-verbal de réception." },
    ],
    questions: [
      "Quel isolant proposez-vous et pourquoi est-il adapté à mon mur ?",
      "Votre entreprise est-elle qualifiée pour les aides auxquelles je peux prétendre ?",
      "Comment sont traités les soubassements, les appuis de fenêtres et les débords de toit ?",
      "Qui dépose la demande d'autorisation en mairie ?",
      "Pouvez-vous me fournir votre attestation décennale ?",
    ],
    reglementation: [URBANISME, GARANTIES, "Les aides publiques à la rénovation énergétique évoluent régulièrement et dépendent de votre situation. Vérifiez les conditions à jour sur France Rénov' avant de signer un devis."],
    faq: [
      { q: "Quelles aides pour une isolation extérieure ?", a: "Des aides existent, mais leurs montants et leurs conditions changent et dépendent du logement, de vos ressources et de la qualification de l'entreprise. Consultez France Rénov' pour les conditions en vigueur." },
      { q: "Faut-il une déclaration préalable ?", a: "Oui en général, puisque l'aspect de la façade change. Les secteurs protégés imposent des règles supplémentaires." },
      { q: "L'isolation extérieure réduit-elle la surface habitable ?", a: "Non : l'isolant est posé à l'extérieur des murs." },
    ],
    sources: [SP, RENOV, DGCCRF],
    typesTravaux: ["Isolation extérieure sous enduit", "Isolation extérieure sous bardage", "Isolation et ravalement combinés", "Autre"],
    autour: "Un artisan de votre secteur connaît les règles locales et les aides disponibles. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  terrassement: {
    slug: "terrassement",
    nom: "Terrassement",
    un: "une entreprise de terrassement",
    accroche: "Décrivez votre chantier de terrassement : nous l'étudions et vous mettons en relation avec une entreprise sélectionnée près de chez vous. Gratuit pour vous.",
    intro: [
      "Le terrassement prépare le terrain : décaissement, nivellement, tranchées, plateformes, évacuation des terres, accès. Il précède les fondations, les piscines, les assainissements et les aménagements extérieurs.",
      "Décrivez votre chantier : nous l'étudions et une entreprise sélectionnée de votre secteur vous contacte pour visiter le terrain et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Plateforme et fondations", texte: "Décaissement et nivellement pour une maison, une extension ou un garage." },
      { titre: "Tranchées et réseaux", texte: "Tranchées pour l'eau, l'électricité, le gaz, l'assainissement et le drainage." },
      { titre: "Accès et voirie privée", texte: "Création d'une entrée, d'un chemin ou d'une aire de stationnement." },
      { titre: "Piscine et aménagements", texte: "Terrassement pour une piscine ou un bassin, avec évacuation des terres." },
    ],
    solutions: [
      { titre: "Évacuation ou réemploi des terres", texte: "Les terres excavées peuvent être évacuées ou réutilisées sur place. L'évacuation pèse souvent sur le coût d'un chantier." },
      { titre: "Accès du chantier", texte: "L'accès des engins (largeur, pente, portail) détermine le matériel utilisable et donc la durée du chantier." },
    ],
    etapes: [
      { titre: "Visite du terrain", texte: "Nature du sol, pente, accès, réseaux enterrés : l'entreprise relève ce qui conditionne les travaux." },
      { titre: "Devis", texte: "Volume à déplacer, évacuation, matériel, remise en état. Les réseaux enterrés doivent être déclarés avant de creuser." },
      { titre: "Déclarations", texte: "Avant des travaux à proximité de réseaux, une déclaration est obligatoire pour éviter les dommages." },
      { titre: "Chantier", texte: "Piquetage, décaissement, évacuation, finition de la plateforme." },
      { titre: "Réception", texte: "Contrôle des niveaux, de la plateforme et de la remise en état." },
    ],
    questions: [
      "Qui déclare les travaux auprès des gestionnaires de réseaux avant de creuser ?",
      "Où seront évacuées les terres, et ce poste est-il détaillé au devis ?",
      "Quel matériel sera utilisé et comment accédera-t-il au terrain ?",
      "Que prévoyez-vous si le sol se révèle différent de ce qui était attendu ?",
      "Pouvez-vous me fournir votre attestation d'assurance ?",
    ],
    reglementation: [URBANISME, "Avant tout creusement, une déclaration préalable aux gestionnaires de réseaux enterrés est obligatoire (guichet unique des réseaux), afin d'éviter les dégradations de canalisations et de câbles."],
    faq: [
      { q: "Faut-il une autorisation pour terrasser ?", a: "Selon l'ampleur des mouvements de terre et la zone, une déclaration préalable ou un permis peut être nécessaire. Votre mairie vous renseigne." },
      { q: "Pourquoi le terrassement est-il difficile à chiffrer à distance ?", a: "Parce qu'il dépend du sol, de la pente, de l'accès et du volume réel. Une visite est indispensable pour un devis fiable." },
    ],
    sources: [SP, DGCCRF],
    typesTravaux: ["Plateforme pour construction", "Tranchées et réseaux", "Accès et chemin", "Piscine", "Évacuation de terres", "Autre"],
    autour: "Une entreprise de votre secteur connaît les sols et les contraintes locales. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre chantier.",
  },

  bardage: {
    slug: "bardage",
    nom: "Bardage",
    un: "une entreprise de bardage",
    accroche: "Décrivez votre projet de bardage : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Le bardage habille une façade d'un revêtement fixé sur une ossature : bois, composite, métal, fibrociment. Il protège le mur, peut accompagner une isolation par l'extérieur et change l'aspect du bâtiment.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Bardage bois", texte: "Lames de bois posées à la verticale, à l'horizontale ou en claire-voie, avec un traitement et une finition adaptés à l'exposition." },
      { titre: "Bardage composite ou métallique", texte: "Revêtements à entretien réduit, souvent choisis pour les façades contemporaines." },
      { titre: "Bardage avec isolation", texte: "Isolant posé entre ou derrière l'ossature, recouvert du bardage." },
    ],
    solutions: [
      { titre: "Ossature et ventilation", texte: "Une lame d'air ventilée derrière le bardage évacue l'humidité. Sa mise en œuvre conditionne la durabilité de l'ensemble." },
      { titre: "Choix du matériau", texte: "Le bois demande un entretien différent du composite ou du métal. Le choix se fait selon l'exposition, le budget et l'esthétique." },
    ],
    etapes: [
      { titre: "Visite", texte: "Examen du support, de l'exposition et des points singuliers (angles, menuiseries, soubassement)." },
      { titre: "Devis", texte: "Matériau, ossature, isolation éventuelle, finitions et échafaudage." },
      { titre: "Autorisation", texte: "Le bardage modifie l'aspect extérieur : déclaration préalable en général." },
      { titre: "Chantier et réception", texte: "Pose de l'ossature, de l'isolant éventuel et du revêtement, puis réception." },
    ],
    questions: [
      "Comment la lame d'air et la ventilation sont-elles traitées ?",
      "Quel entretien le matériau demande-t-il dans la durée ?",
      "Le devis comprend-il l'échafaudage et les finitions autour des ouvertures ?",
      "Pouvez-vous me fournir votre attestation décennale ?",
    ],
    reglementation: [URBANISME, GARANTIES],
    faq: [
      { q: "Faut-il une autorisation pour poser un bardage ?", a: "En général oui, une déclaration préalable, puisque l'aspect de la façade change. Vérifiez les règles de votre commune." },
      { q: "Le bardage isole-t-il ?", a: "Le bardage protège ; c'est l'isolant posé derrière qui isole. Les deux se combinent souvent." },
    ],
    sources: [SP, DGCCRF],
    typesTravaux: ["Bardage bois", "Bardage composite ou métallique", "Bardage avec isolation", "Autre"],
    autour: "Un artisan de votre secteur connaît les règles locales. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  menuisier: {
    slug: "menuisier",
    nom: "Menuisier",
    un: "un menuisier",
    accroche: "Décrivez votre projet de menuiserie : nous l'étudions et vous mettons en relation avec un menuisier sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Un menuisier fabrique et pose les ouvertures et aménagements : fenêtres, portes, volets, escaliers, placards, portes de garage. Il intervient en rénovation comme en construction neuve.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Fenêtres et portes", texte: "Remplacement de fenêtres et de portes d'entrée, avec dépose ou en rénovation sur l'existant." },
      { titre: "Volets roulants et battants", texte: "Pose et remplacement de volets, manuels ou motorisés." },
      { titre: "Escaliers, placards, agencement", texte: "Fabrication sur mesure et pose d'éléments intérieurs." },
      { titre: "Portes de garage", texte: "Remplacement ou motorisation de portes de garage." },
    ],
    solutions: [
      { titre: "PVC, bois ou aluminium", texte: "Chaque matériau a ses atouts : entretien, esthétique, finesse des profilés, comportement thermique. Le choix dépend du bâtiment et du style." },
      { titre: "Pose en rénovation ou en dépose totale", texte: "La pose en rénovation conserve l'ancien dormant ; la dépose totale remplace tout et traite mieux l'étanchéité." },
    ],
    etapes: [
      { titre: "Relevé de mesures", texte: "Le menuisier prend les cotes sur place : un mauvais relevé coûte cher à rattraper." },
      { titre: "Devis", texte: "Matériau, vitrage, ouvertures, pose, finitions, délais de fabrication." },
      { titre: "Fabrication et pose", texte: "Fabrication sur mesure, puis pose et réglages." },
      { titre: "Réception", texte: "Contrôle du fonctionnement et de l'étanchéité à l'air et à l'eau." },
    ],
    questions: [
      "Qui prend les mesures, et qui est responsable en cas d'erreur de cotes ?",
      "Quel type de pose proposez-vous et pourquoi ?",
      "Le devis précise-t-il le vitrage, la quincaillerie et la reprise des finitions ?",
      "Pouvez-vous me fournir votre attestation d'assurance ?",
    ],
    reglementation: [URBANISME, GARANTIES],
    faq: [
      { q: "Faut-il une autorisation pour changer des fenêtres ?", a: "Si l'aspect extérieur change (matériau, couleur, forme), une déclaration préalable est en général requise, et des règles particulières s'appliquent en secteur protégé ou en copropriété." },
      { q: "Quelles aides pour changer ses fenêtres ?", a: "Des aides à la rénovation énergétique existent sous conditions. Consultez France Rénov' pour les règles en vigueur." },
    ],
    sources: [SP, RENOV],
    typesTravaux: ["Fenêtres", "Porte d'entrée", "Volets", "Porte de garage", "Escalier ou agencement", "Autre"],
    autour: "Un menuisier de votre secteur peut se déplacer pour relever les mesures. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  "extension-maison": {
    slug: "extension-maison",
    nom: "Extension de maison",
    un: "une entreprise d'extension de maison",
    accroche: "Décrivez votre projet d'extension ou de surélévation : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Agrandir une maison peut se faire en extension au sol, en surélévation ou par aménagement de combles. Chaque option a ses contraintes de structure, d'urbanisme et de budget.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Extension de plain-pied", texte: "Nouveau volume accolé à la maison : fondations, murs, charpente, couverture et raccordement à l'existant." },
      { titre: "Surélévation", texte: "Ajout d'un niveau, qui exige de vérifier la capacité de la structure et des fondations." },
      { titre: "Extension en ossature bois", texte: "Construction rapide à sec, adaptée à de nombreux terrains." },
      { titre: "Aménagement des combles", texte: "Création de pièces dans un volume existant, avec isolation et fenêtres de toit." },
    ],
    solutions: [
      { titre: "Extension ou surélévation", texte: "L'extension consomme du terrain ; la surélévation en gagne mais sollicite la structure existante. Une étude préalable tranche." },
      { titre: "Architecte ou non", texte: "Au-delà d'un seuil de surface de plancher, le recours à un architecte est obligatoire. Votre mairie ou un professionnel vous indique le seuil applicable à votre projet." },
    ],
    etapes: [
      { titre: "Faisabilité", texte: "Étude du terrain, des règles d'urbanisme, de la structure existante et de vos besoins." },
      { titre: "Plans et autorisation", texte: "Plans, puis déclaration préalable ou permis de construire selon la surface créée." },
      { titre: "Devis par lot", texte: "Gros œuvre, charpente, couverture, menuiseries, isolation, électricité, plomberie, finitions." },
      { titre: "Chantier", texte: "Terrassement, fondations, structure, hors d'eau hors d'air, puis second œuvre." },
      { titre: "Réception", texte: "Réception des travaux par lot ou globale, avec déclaration d'achèvement." },
    ],
    questions: [
      "Qui coordonne les différents corps de métier ?",
      "Le projet nécessite-t-il un architecte, une étude de sol, un bureau d'études ?",
      "Quelles assurances couvrent les travaux (décennale, dommages-ouvrage) ?",
      "Comment le raccord avec l'existant est-il traité ?",
    ],
    reglementation: [URBANISME, GARANTIES, "Pour une construction ou une extension, l'assurance dommages-ouvrage est obligatoire pour le maître d'ouvrage qui fait réaliser les travaux. Renseignez-vous auprès de votre assureur."],
    faq: [
      { q: "Quelle autorisation pour une extension ?", a: "Selon la surface créée et la zone, une déclaration préalable ou un permis de construire. Le code de l'urbanisme fixe des seuils ; votre mairie vous indique celui qui s'applique." },
      { q: "Extension ou surélévation ?", a: "Tout dépend du terrain, du budget, de la structure existante et de vos besoins. Une étude de faisabilité permet de choisir." },
    ],
    sources: [SP, DGCCRF],
    typesTravaux: ["Extension de plain-pied", "Surélévation", "Extension en ossature bois", "Aménagement de combles", "Autre"],
    autour: "Un artisan de votre secteur connaît les règles d'urbanisme locales. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  paysagiste: {
    slug: "paysagiste",
    nom: "Paysagiste",
    un: "un paysagiste",
    accroche: "Décrivez votre projet de jardin : nous l'étudions et vous mettons en relation avec un paysagiste sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Un paysagiste conçoit et réalise l'aménagement extérieur : plantations, terrasses, allées, clôtures, arrosage, éclairage, entretien. Certains concilient création et suivi du jardin dans le temps.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Création de jardin", texte: "Plan, plantations, engazonnement, allées et terrasses." },
      { titre: "Terrasses et allées", texte: "Dallage, pavage, bois ou composite, avec drainage et pentes." },
      { titre: "Plantations et haies", texte: "Choix des essences adaptées au sol, à l'exposition et à votre usage." },
      { titre: "Arrosage et éclairage", texte: "Arrosage automatique, éclairage extérieur, récupération d'eau." },
      { titre: "Entretien", texte: "Tonte, taille, désherbage et entretien régulier du jardin." },
    ],
    solutions: [
      { titre: "Essences locales et sol", texte: "Les plantes adaptées à votre climat et à votre sol demandent moins d'eau et d'entretien." },
      { titre: "Revêtements perméables", texte: "Les allées et terrasses perméables limitent le ruissellement et conviennent mieux à de nombreux terrains." },
    ],
    etapes: [
      { titre: "Visite et échange sur vos usages", texte: "Le paysagiste observe le terrain, l'exposition, le sol et vos besoins." },
      { titre: "Proposition et devis", texte: "Plan ou esquisse, essences, matériaux, phasage et entretien prévu." },
      { titre: "Réalisation", texte: "Terrassement léger, plantations, aménagements et finitions, dans l'ordre qui convient à la saison." },
      { titre: "Suivi", texte: "Entretien initial et conseils pour la reprise des végétaux." },
    ],
    questions: [
      "Quelles essences proposez-vous, et sont-elles adaptées à mon sol et à mon climat ?",
      "La reprise des plantations est-elle suivie ?",
      "Le devis précise-t-il l'évacuation des déblais et la remise en état ?",
      "Pouvez-vous me fournir votre attestation d'assurance ?",
    ],
    reglementation: [URBANISME, "Certains aménagements (clôtures, terrasses surélevées, abris) relèvent d'une déclaration préalable. Les règles de plantation à proximité d'une limite de propriété sont fixées par le code civil et par les usages locaux."],
    faq: [
      { q: "Quand planter ?", a: "La saison dépend des végétaux et du climat : en général, les périodes de repos de la végétation conviennent mieux aux plantations à racines nues. Votre paysagiste vous conseille selon les essences retenues." },
      { q: "Faut-il une autorisation pour une terrasse ou une clôture ?", a: "Selon la hauteur, la surface et la zone, une déclaration préalable peut être nécessaire. Vérifiez auprès de votre mairie." },
    ],
    sources: [SP],
    typesTravaux: ["Création de jardin", "Terrasse ou allée", "Plantations et haies", "Arrosage et éclairage", "Entretien", "Autre"],
    autour: "Un paysagiste de votre secteur connaît le sol et le climat locaux. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  "pergola-veranda": {
    slug: "pergola-veranda",
    nom: "Pergola et véranda",
    un: "une entreprise de pergola et véranda",
    accroche: "Décrivez votre projet de pergola ou de véranda : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Une pergola couvre une terrasse, une véranda crée une pièce vitrée en prolongement de la maison. Les deux se distinguent par le niveau de fermeture, l'isolation et les démarches d'urbanisme.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Pergola bioclimatique ou à toile", texte: "Structure en aluminium ou en bois avec lames orientables ou toile, posée sur une terrasse." },
      { titre: "Véranda", texte: "Pièce vitrée adossée à la maison, avec fondations, structure, vitrage et raccordement." },
      { titre: "Rénovation et réparation", texte: "Changement de toiture de véranda, reprise d'étanchéité, remplacement de vitrage." },
    ],
    solutions: [
      { titre: "Aluminium, bois, acier", texte: "L'aluminium demande peu d'entretien ; le bois a un cachet particulier mais exige un traitement régulier." },
      { titre: "Vitrage et isolation", texte: "Le choix du vitrage conditionne le confort d'été et d'hiver." },
    ],
    etapes: [
      { titre: "Visite et faisabilité", texte: "Exposition, support, raccord avec la maison, règles d'urbanisme." },
      { titre: "Autorisation", texte: "Selon la surface et l'emprise au sol, une déclaration préalable ou un permis de construire est requis." },
      { titre: "Devis et fabrication", texte: "Choix du modèle, délais de fabrication, pose." },
      { titre: "Pose et réception", texte: "Fondations ou plots, montage, étanchéité, réglages et procès-verbal." },
    ],
    questions: [
      "Qui dépose la demande d'autorisation en mairie ?",
      "Quels sont les délais de fabrication et de pose ?",
      "Comment l'étanchéité avec le mur de la maison est-elle réalisée ?",
      "Pouvez-vous me fournir votre attestation décennale ?",
    ],
    reglementation: [URBANISME, GARANTIES],
    faq: [
      { q: "Faut-il un permis pour une véranda ou une pergola ?", a: "Cela dépend de la surface créée, de l'emprise au sol et de la zone. Une déclaration préalable ou un permis peut être nécessaire : renseignez-vous auprès de votre mairie avant de commander." },
      { q: "Quelle différence entre pergola et véranda ?", a: "La pergola couvre un espace sans le fermer ; la véranda le ferme par des parois vitrées et en fait une pièce." },
    ],
    sources: [SP, DGCCRF],
    typesTravaux: ["Pergola", "Véranda", "Réparation de véranda", "Autre"],
    autour: "Un artisan de votre secteur connaît les règles locales d'urbanisme. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  "cloture-portail": {
    slug: "cloture-portail",
    nom: "Clôture et portail",
    un: "une entreprise de clôture et portail",
    accroche: "Décrivez votre projet de clôture ou de portail : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Clôtures, portails, portillons, motorisations : ces ouvrages délimitent votre propriété et obéissent à des règles de hauteur et d'aspect propres à votre commune.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Clôture", texte: "Grillage rigide, panneaux, bois, composite, aluminium ou muret surmonté d'une grille." },
      { titre: "Portail et portillon", texte: "Battants ou coulissant, manuels ou motorisés." },
      { titre: "Motorisation et automatismes", texte: "Moteur, télécommande, visiophone, sécurité de fermeture." },
    ],
    solutions: [
      { titre: "Hauteur et aspect", texte: "Le plan local d'urbanisme fixe souvent la hauteur maximale et les matériaux admis en limite de voirie." },
      { titre: "Portail coulissant ou battant", texte: "Le coulissant demande de la place le long de la clôture ; le battant, de l'espace pour s'ouvrir." },
    ],
    etapes: [
      { titre: "Visite et relevé", texte: "Implantation, limite de propriété, terrain, accès." },
      { titre: "Autorisation", texte: "Une clôture ou un portail relèvent souvent d'une déclaration préalable ; vérifiez les règles de la commune." },
      { titre: "Devis et pose", texte: "Fondations, poteaux, remplissage, finitions et motorisation." },
      { titre: "Réception", texte: "Contrôle du fonctionnement et des finitions." },
    ],
    questions: [
      "La hauteur et l'aspect prévus sont-ils conformes aux règles de ma commune ?",
      "Qui assure la pose des fondations et le branchement de la motorisation ?",
      "Comment la limite de propriété est-elle vérifiée ?",
    ],
    reglementation: [URBANISME],
    faq: [
      { q: "Faut-il une déclaration préalable pour une clôture ?", a: "Cela dépend de la commune : certaines imposent une déclaration pour toute clôture, d'autres seulement dans certaines zones. Votre mairie vous renseigne." },
      { q: "Qui paie une clôture mitoyenne ?", a: "Les règles de mitoyenneté relèvent du code civil et des usages locaux. Un accord écrit avec le voisin évite les litiges." },
    ],
    sources: [SP],
    typesTravaux: ["Clôture", "Portail", "Portillon", "Motorisation", "Autre"],
    autour: "Un artisan de votre secteur connaît les règles de votre commune. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  assainissement: {
    slug: "assainissement",
    nom: "Assainissement",
    un: "une entreprise d'assainissement",
    accroche: "Décrivez votre projet d'assainissement ou de fosse septique : nous l'étudions et vous mettons en relation avec une entreprise sélectionnée près de chez vous. Gratuit pour vous.",
    intro: [
      "L'assainissement non collectif (fosse septique, micro-station, filtre à sable) concerne les logements non raccordés au tout-à-l'égout. Installation, vidange et mise aux normes sont encadrées et contrôlées par le service public d'assainissement non collectif de votre commune.",
      "Décrivez votre projet : nous l'étudions et une entreprise sélectionnée de votre secteur vous contacte. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Installation ou remplacement", texte: "Pose d'une fosse toutes eaux, d'une micro-station ou d'un système adapté à votre terrain." },
      { titre: "Vidange et entretien", texte: "Vidange périodique par un vidangeur agréé, avec remise d'un bordereau de suivi." },
      { titre: "Mise aux normes", texte: "Mise en conformité après un contrôle du service d'assainissement." },
    ],
    solutions: [
      { titre: "Étude de sol", texte: "La nature du sol et la surface disponible déterminent le système possible. Une étude préalable est la règle." },
    ],
    etapes: [
      { titre: "Étude et demande d'autorisation", texte: "Étude de sol, puis dépôt du projet auprès du service d'assainissement non collectif." },
      { titre: "Devis", texte: "Système retenu, terrassement, raccordements, remise en état." },
      { titre: "Travaux et contrôle", texte: "Installation, puis contrôle de bonne exécution par le service compétent avant remblaiement." },
    ],
    questions: [
      "Qui réalise l'étude de sol et dépose le dossier auprès du service d'assainissement ?",
      "Le devis comprend-il le terrassement et la remise en état ?",
      "Votre entreprise connaît-elle les exigences de mon service d'assainissement ?",
    ],
    reglementation: ["L'assainissement non collectif est contrôlé par le service public d'assainissement non collectif (SPANC) de votre commune, qui doit valider le projet avant les travaux et vérifier leur bonne exécution."],
    faq: [
      { q: "Qui contrôle mon assainissement ?", a: "Le service public d'assainissement non collectif de votre commune ou intercommunalité. Il examine votre projet avant les travaux et réalise des contrôles périodiques." },
      { q: "Quand vidanger une fosse septique ?", a: "La fréquence dépend du type de fosse et de l'usage du logement. Le vidangeur agréé vous renseigne et vous remet un bordereau de suivi." },
    ],
    sources: [SP],
    typesTravaux: ["Installation d'une fosse ou micro-station", "Vidange", "Mise aux normes", "Autre"],
    autour: "Une entreprise de votre secteur connaît le service d'assainissement de votre commune. Indiquez votre code postal pour accéder à la page de votre département ou décrivez directement votre projet.",
  },

  energie: {
    slug: "energie",
    nom: "Énergie et climatisation",
    un: "un installateur",
    accroche: "Décrivez votre projet de climatisation ou d'énergie : nous l'étudions et vous mettons en relation avec un installateur sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Climatisation, pompe à chaleur, panneaux solaires : les installations énergétiques demandent un dimensionnement soigné et des professionnels qualifiés, surtout si vous souhaitez bénéficier d'aides.",
      "Décrivez votre projet : nous l'étudions et un installateur sélectionné de votre secteur vous contacte. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Climatisation et pompe à chaleur", texte: "Installation, remplacement et maintenance." },
      { titre: "Panneaux solaires", texte: "Étude d'implantation, pose et raccordement." },
    ],
    solutions: [{ titre: "Dimensionnement", texte: "Une installation trop puissante ou insuffisante coûte plus cher à l'usage. Le professionnel dimensionne selon le logement et l'usage." }],
    etapes: [
      { titre: "Étude", texte: "Visite, relevé et dimensionnement." },
      { titre: "Devis et aides", texte: "Devis détaillé et conditions d'éligibilité aux aides, qui dépendent de la qualification de l'installateur." },
      { titre: "Installation et mise en service", texte: "Pose, raccordement, mise en service et explications d'usage." },
    ],
    questions: [
      "Votre entreprise est-elle qualifiée pour les aides auxquelles je peux prétendre ?",
      "Comment avez-vous dimensionné l'installation proposée ?",
      "Quelle maintenance prévoyez-vous, et à quel rythme ?",
    ],
    reglementation: [URBANISME, "Les aides à la rénovation énergétique dépendent de votre situation et évoluent : consultez France Rénov' pour les conditions en vigueur."],
    faq: [{ q: "Y a-t-il des aides ?", a: "Des aides existent pour certaines installations, sous conditions de logement, de ressources et de qualification de l'installateur. Consultez France Rénov' pour les règles à jour." }],
    sources: [SP, RENOV],
    typesTravaux: ["Climatisation", "Pompe à chaleur", "Panneaux solaires", "Autre"],
    autour: "Un installateur de votre secteur peut se déplacer pour une étude. Indiquez votre code postal ou décrivez directement votre projet.",
  },

  "renovation-interieure": {
    slug: "renovation-interieure",
    nom: "Rénovation intérieure",
    un: "un artisan de la rénovation intérieure",
    accroche: "Décrivez votre projet de rénovation : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Salle de bains, cuisine, plomberie, électricité, carrelage : la rénovation intérieure fait intervenir plusieurs métiers. Un chantier mal coordonné allonge les délais ; un devis précis par lot les limite.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Salle de bains", texte: "Dépose, plomberie, étanchéité, carrelage et sanitaires." },
      { titre: "Cuisine", texte: "Plomberie, électricité, pose des meubles et du plan de travail." },
      { titre: "Plomberie et électricité", texte: "Remplacement ou mise aux normes des installations." },
      { titre: "Carrelage et sols", texte: "Dépose, ragréage et pose." },
    ],
    solutions: [{ titre: "Mise aux normes électriques", texte: "Une installation électrique ancienne peut nécessiter une mise aux normes avant ou pendant les travaux." }],
    etapes: [
      { titre: "Visite et cadrage", texte: "Relevé des existants et définition des lots." },
      { titre: "Devis par lot", texte: "Chaque métier chiffre son périmètre ; un coordinateur évite les oublis." },
      { titre: "Chantier", texte: "Ordre des interventions : dépose, réseaux, supports, finitions." },
      { titre: "Réception", texte: "Contrôle des installations et des finitions." },
    ],
    questions: [
      "Qui coordonne les différents corps de métier ?",
      "Les installations existantes sont-elles conformes, et que prévoyez-vous si ce n'est pas le cas ?",
      "Pouvez-vous me fournir votre attestation d'assurance ?",
    ],
    reglementation: [GARANTIES],
    faq: [{ q: "Faut-il un artisan par métier ?", a: "Pas forcément : certaines entreprises coordonnent plusieurs lots. Dans tous les cas, demandez un devis qui détaille chaque poste." }],
    sources: [SP, DGCCRF],
    typesTravaux: ["Salle de bains", "Cuisine", "Plomberie", "Électricité", "Carrelage", "Autre"],
    autour: "Un artisan de votre secteur peut se déplacer pour chiffrer. Indiquez votre code postal ou décrivez directement votre projet.",
  },

  terrasse: {
    slug: "terrasse",
    nom: "Terrasse",
    un: "un artisan de la terrasse",
    accroche: "Décrivez votre projet de terrasse : nous l'étudions et vous mettons en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Une terrasse en bois, en composite, en carrelage ou en dalles prolonge la maison. Sa tenue dépend du support, du drainage et de la mise en œuvre.",
      "Décrivez votre projet : nous l'étudions et un artisan sélectionné de votre secteur vous contacte. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Terrasse bois ou composite", texte: "Structure sur plots ou lambourdes, lames et finitions." },
      { titre: "Terrasse carrelée ou dallée", texte: "Dalle béton, pentes, étanchéité et revêtement." },
    ],
    solutions: [{ titre: "Drainage et pentes", texte: "Une pente de quelques millimètres par mètre évite l'eau stagnante. Elle se prévoit dès la conception." }],
    etapes: [
      { titre: "Visite", texte: "Support, orientation, accès et usage." },
      { titre: "Devis et autorisation", texte: "Selon la hauteur et la surface, une déclaration préalable peut être nécessaire." },
      { titre: "Réalisation et réception", texte: "Préparation, pose, finitions." },
    ],
    questions: ["Comment l'écoulement de l'eau est-il prévu ?", "Quel entretien le matériau demande-t-il ?"],
    reglementation: [URBANISME],
    faq: [{ q: "Faut-il une autorisation pour une terrasse ?", a: "Une terrasse de plain-pied est généralement dispensée de formalités, mais une terrasse surélevée ou couverte peut relever d'une déclaration préalable. Vérifiez auprès de votre mairie." }],
    sources: [SP],
    typesTravaux: ["Terrasse bois ou composite", "Terrasse carrelée ou dallée", "Autre"],
    autour: "Un artisan de votre secteur peut venir chiffrer. Indiquez votre code postal ou décrivez directement votre projet.",
  },

  pisciniste: {
    slug: "pisciniste",
    nom: "Pisciniste",
    un: "un pisciniste",
    accroche: "Décrivez votre projet de piscine : nous l'étudions et vous mettons en relation avec un pisciniste sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Construire une piscine mobilise terrassement, structure, étanchéité, filtration et sécurité. Les règles d'urbanisme et de sécurité s'appliquent dès la conception.",
      "Décrivez votre projet : nous l'étudions et un pisciniste sélectionné de votre secteur vous contacte. Gratuit pour vous.",
    ],
    travaux: [
      { titre: "Piscine enterrée", texte: "Terrassement, structure, étanchéité, local technique." },
      { titre: "Rénovation", texte: "Remplacement du revêtement, de la filtration ou mise aux normes de sécurité." },
    ],
    solutions: [{ titre: "Sécurité", texte: "Les piscines enterrées non closes doivent comporter un dispositif de sécurité normalisé (barrière, alarme, couverture ou abri) conforme à la réglementation." }],
    etapes: [
      { titre: "Étude et autorisation", texte: "Faisabilité, déclaration préalable ou permis selon la surface du bassin." },
      { titre: "Chantier", texte: "Terrassement, structure, étanchéité, équipements." },
      { titre: "Mise en service", texte: "Remplissage, réglages et conseils d'entretien." },
    ],
    questions: ["Quel dispositif de sécurité est prévu ?", "Qui gère les déclarations en mairie ?", "Pouvez-vous me fournir votre attestation décennale ?"],
    reglementation: [URBANISME, GARANTIES],
    faq: [{ q: "Faut-il une autorisation pour une piscine ?", a: "Oui en général, déclaration préalable ou permis selon la surface du bassin. Votre mairie vous indique la procédure." }],
    sources: [SP],
    typesTravaux: ["Piscine enterrée", "Rénovation de piscine", "Autre"],
    autour: "Un pisciniste de votre secteur connaît les sols et les règles locales. Indiquez votre code postal ou décrivez directement votre projet.",
  },

  travaux: {
    slug: "travaux",
    nom: "Travaux",
    un: "un artisan du bâtiment",
    accroche: "Décrivez vos travaux : nous les étudions et vous mettons en relation avec un artisan du bâtiment sélectionné près de chez vous. Gratuit pour vous.",
    intro: [
      "Que votre projet concerne la toiture, la façade, la maçonnerie ou l'aménagement, décrivez-le : nous l'étudions et orientons votre demande vers un artisan du bon métier.",
      "Le service est gratuit pour vous : nous sommes rémunérés par l'artisan, uniquement si votre chantier est signé.",
    ],
    travaux: [{ titre: "Tous travaux du bâtiment", texte: "Toiture, façade, maçonnerie, isolation, extension, menuiserie, terrassement." }],
    solutions: [{ titre: "Un seul interlocuteur pour démarrer", texte: "Un conseiller Celexia étudie votre demande et vous rappelle pour la préciser avant toute mise en relation." }],
    etapes: [
      { titre: "Vous décrivez le projet", texte: "En quelques minutes, sans engagement." },
      { titre: "Nous l'étudions", texte: "Un conseiller Celexia vous rappelle pour préciser le projet." },
      { titre: "Un artisan vous contacte", texte: "Il visite et chiffre ; vous restez libre de refuser." },
    ],
    questions: ["Que comprend le devis, poste par poste ?", "Pouvez-vous me fournir votre attestation décennale ?"],
    reglementation: [GARANTIES],
    faq: [{ q: "Comment fonctionne Artisans France ?", a: "Vous décrivez votre chantier, nous l'étudions et nous vous mettons en relation avec un artisan sélectionné. Le service est gratuit pour vous : l'artisan nous rémunère uniquement si le chantier est signé." }],
    sources: [DGCCRF],
    typesTravaux: ["Toiture", "Façade", "Maçonnerie", "Isolation", "Extension", "Menuiserie", "Terrassement", "Autre"],
    autour: "Indiquez votre code postal ou décrivez directement votre projet.",
  },
};

export const getTrade = (slug?: string | null) => (slug ? TRADES[slug] : undefined);
