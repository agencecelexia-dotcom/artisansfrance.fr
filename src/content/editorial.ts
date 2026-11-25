import type { Editorial, SourceLink, EditorialSection, Faq } from "./types";
import { CONTENT_UPDATED } from "@/config/site";

// Guides éditoriaux : problèmes, aides, prix. Règles du brief : conseils généraux et sûrs, aucun diagnostic à distance,
// aucune fourchette de prix sans source datée, sources officielles citées. Textes à relire avant mise en ligne.

const SP: SourceLink = { label: "service-public.fr", url: "https://www.service-public.fr/" };
const RENOV: SourceLink = { label: "France Rénov'", url: "https://france-renov.gouv.fr/" };
const DGCCRF: SourceLink = { label: "DGCCRF", url: "https://www.economie.gouv.fr/dgccrf" };

const SANS_PRIX: EditorialSection = {
  h2: "Pourquoi ce guide n'affiche pas de fourchette de prix",
  paragraphs: [
    "Nous n'affichons pas de fourchette de prix tant que nous ne disposons pas de sources datées et vérifiables, comme des devis réels ou des publications officielles. Un chiffre sans source ferait croire à un prix qui n'existe pas pour votre chantier.",
    "Le prix fiable est celui d'un devis établi après visite. Décrivez votre chantier : un conseiller Celexia l'étudie et un artisan sélectionné de votre secteur vous chiffre.",
  ],
};

const COMMENT_LIRE: EditorialSection = {
  h2: "Comment lire un devis",
  list: [
    "Chaque poste est détaillé : fournitures, main-d'œuvre, matériel d'accès, évacuation.",
    "La surface, les matériaux et leurs références sont indiqués.",
    "La TVA applicable, la durée de validité du devis et les conditions de paiement sont précisées.",
    "Les garanties et l'assurance de l'entreprise figurent sur le devis ou en pièce jointe.",
    "Les éventuelles réserves (état de la charpente, support) sont écrites, pas seulement dites.",
  ],
};

const DEVIS_GRATUIT: Faq = {
  q: "Comment obtenir un prix fiable ?",
  a: "En demandant un devis détaillé après visite sur place, idéalement à plusieurs artisans pour comparer ce que chaque devis comprend. Artisans France vous met en relation avec un artisan sélectionné, gratuitement pour vous.",
};

function ed(e: Omit<Editorial, "maj" | "sources"> & { sources?: SourceLink[] }): Editorial {
  return { maj: CONTENT_UPDATED, sources: [SP, DGCCRF], ...e };
}

const LIST: Editorial[] = [
  // ------------------------------------------------------------------ problèmes et réparations
  ed({
    url: "/guides/fuite-toiture/",
    titre: "Fuite de toiture : que faire et qui appeler",
    description: "Une fuite de toiture se traite en deux temps : protéger vos biens tout de suite, puis faire chercher l'origine par un couvreur. Les gestes sûrs et les erreurs à éviter.",
    reponse: "En cas de fuite de toiture, protégez vos biens, récupérez l'eau, photographiez les dégâts et prévenez votre assureur. Ne montez pas sur le toit : appelez un couvreur, qui cherchera l'origine de l'infiltration, souvent éloignée de la tache visible au plafond.",
    sections: [
      { h2: "Les gestes à faire tout de suite", list: ["Placez un récipient sous l'écoulement et protégez meubles et sols.", "Coupez l'électricité de la pièce si l'eau approche des prises ou du luminaire.", "Photographiez les dégâts avant tout nettoyage, pour l'assurance.", "Si le plafond gonfle d'eau, percez-le à un endroit de votre choix pour le vider dans un seau plutôt que de le laisser céder.", "Prévenez votre assureur : le contrat fixe un délai de déclaration, en général de quelques jours ouvrés."] },
      { h2: "Pourquoi la tache n'est pas sous la fuite", paragraphs: ["L'eau suit la charpente, l'isolant ou la sous-face avant de s'écouler. Le point où elle apparaît au plafond peut se trouver à plusieurs mètres de l'infiltration réelle. C'est pourquoi une réparation à l'endroit de la tache échoue souvent."] },
      { h2: "Les causes les plus fréquentes", list: ["Tuiles ou ardoises cassées, déplacées ou poreuses.", "Noues, solins et rives dont l'étanchéité a vieilli.", "Raccords autour d'une cheminée ou d'un conduit.", "Gouttière obstruée ou débordante qui renvoie l'eau sous la couverture.", "Fenêtre de toit dont l'étanchéité périphérique est défaillante.", "Toit plat : membrane percée ou évacuation bouchée."] },
      { h2: "Ce que fait le couvreur", paragraphs: ["Il inspecte la couverture et les combles, localise l'infiltration, répare ou propose une réfection partielle, et vous remet un devis écrit. Pour une urgence, une mise à l'abri provisoire peut précéder la réparation définitive."] },
      { h2: "Ce qu'il ne faut pas faire", list: ["Monter sur le toit mouillé ou sans équipement de sécurité.", "Colmater avec un produit étanchéifiant sans connaître la cause : il masque le problème.", "Signer sous la pression d'un démarcheur : comparez, lisez, exigez un devis écrit."] },
    ],
    faq: [
      { q: "Qui prévenir en premier ?", a: "Votre assureur, pour déclarer le sinistre dans le délai du contrat, et un couvreur pour trouver et réparer l'origine de la fuite." },
      { q: "La fuite est-elle couverte par l'assurance ?", a: "Cela dépend de votre contrat et de la cause (tempête, usure, défaut d'entretien). Votre assureur vous le confirme après examen." },
      { q: "Peut-on réparer soi-même ?", a: "Une mise à l'abri provisoire depuis l'intérieur est possible. Les réparations sur le toit comportent un risque de chute : confiez-les à un professionnel." },
    ],
    liens: ["/guides/reparation-toiture/", "/guides/couvreur-urgence/"],
  }),
  ed({
    url: "/guides/reparation-toiture/",
    titre: "Réparation de toiture : réparer ou refaire ?",
    description: "Une réparation ciblée suffit quand les dégâts sont localisés. Les signes qui conduisent à refaire une toiture et les questions à poser au couvreur.",
    reponse: "Une toiture se répare quand les désordres sont localisés : quelques tuiles cassées, un solin défaillant, une gouttière. Elle se refait quand l'usure est générale, que la charpente est atteinte ou que les réparations se répètent. Seule une visite d'un couvreur permet de trancher.",
    sections: [
      { h2: "Les cas où une réparation suffit", list: ["Quelques éléments de couverture cassés ou déplacés après un coup de vent.", "Un solin, une noue ou un raccord de cheminée à reprendre.", "Une gouttière ou une descente à remplacer.", "Une fenêtre de toit dont l'étanchéité est à refaire."] },
      { h2: "Les signes qui orientent vers une réfection", list: ["Nombreuses tuiles poreuses, éclatées ou ardoises qui glissent.", "Fuites qui reviennent après réparation.", "Charpente humide, affaissée ou attaquée par des insectes ou des champignons.", "Écran sous toiture absent ou dégradé, avec isolant mouillé."] },
      { h2: "Comment le couvreur décide", paragraphs: ["Il examine la couverture depuis le toit et les combles, juge l'état de la charpente et de l'isolation, et vous explique ce qu'une réparation permet ou non. Un bon devis distingue la réparation immédiate de ce qu'il faudra anticiper."] },
      { h2: "Les questions à poser", list: ["Quelle est l'origine précise du désordre ?", "La réparation proposée règle-t-elle la cause ou seulement le symptôme ?", "Quelle garantie couvre l'intervention ?", "Quels travaux faudra-t-il prévoir à moyen terme ?"] },
    ],
    faq: [
      { q: "Une réparation est-elle garantie ?", a: "L'artisan assume la garantie de ses travaux dans le cadre légal et selon son devis. Demandez ce qu'elle couvre et comment la faire jouer." },
      { q: "Faut-il une autorisation ?", a: "Une réparation à l'identique n'en demande en général pas, mais un changement d'aspect (matériau, couleur) relève d'une déclaration préalable. Votre mairie vous renseigne." },
    ],
    liens: ["/guides/fuite-toiture/", "/guides/traitement-toiture/"],
  }),
  ed({
    url: "/guides/traitement-charpente/",
    titre: "Traitement de charpente : insectes, champignons, humidité",
    description: "Comment reconnaître une charpente attaquée, ce que traitent les traitements préventif et curatif, et pourquoi la cause d'humidité doit être corrigée en premier.",
    reponse: "Une charpente se traite après un diagnostic : trous de sortie, sciure, bois spongieux ou friable sont des signes d'insectes ou de champignons. Le traitement, curatif ou préventif, ne dure que si la cause d'humidité est corrigée. Demandez un diagnostic écrit à un professionnel.",
    sections: [
      { h2: "Les signes d'alerte", list: ["Petits trous ronds ou ovales dans le bois, avec de la fine sciure.", "Bois qui s'effrite, devient spongieux ou se creuse.", "Traces de filaments blanchâtres ou odeur de moisi dans les combles.", "Galeries ou boue le long des murs : possible présence de termites."] },
      { h2: "Insectes et champignons : deux familles de problèmes", paragraphs: ["Les insectes xylophages (capricornes, vrillettes) creusent le bois. Les champignons, comme la mérule, se développent dans une humidité persistante. Les traitements diffèrent, et une charpente humide est exposée aux deux."] },
      { h2: "Traitement préventif ou curatif", list: ["Le préventif protège un bois sain, par pulvérisation ou imprégnation.", "Le curatif traite un bois déjà attaqué, par pulvérisation, injection ou remplacement des pièces trop abîmées.", "Dans tous les cas, la cause d'humidité (fuite, ventilation insuffisante) doit être traitée en premier."] },
      { h2: "Ce qu'il faut exiger", list: ["Un diagnostic écrit avant le devis.", "Le nom des produits utilisés et la zone traitée.", "Une attestation ou un certificat de traitement en fin de chantier.", "La mention des garanties offertes et de leur durée."] },
      { h2: "Cas particulier des termites", paragraphs: ["Si vous constatez la présence de termites, la loi impose de le déclarer en mairie. Le traitement relève alors d'un professionnel spécialisé."] },
    ],
    faq: [
      { q: "Faut-il traiter une charpente neuve ?", a: "Les bois de charpente reçoivent en général un traitement adapté à leur classe d'emploi. Demandez à votre artisan quel traitement est prévu et sa justification." },
      { q: "Un traitement suffit-il si la toiture fuit ?", a: "Non. Tant que l'humidité persiste, les attaques reviennent. Il faut d'abord réparer la fuite." },
    ],
    liens: ["/guides/fuite-toiture/", "/guides/traitement-toiture/"],
  }),
  ed({
    url: "/guides/traitement-toiture/",
    titre: "Traitement de toiture : démoussage, anti-mousse, hydrofuge",
    description: "Démoussage, traitement anti-mousse et hydrofuge n'ont pas le même rôle. Ce que chaque étape apporte, les précautions et les questions à poser.",
    reponse: "Le démoussage retire les mousses et lichens, l'anti-mousse ralentit leur retour et l'hydrofuge limite l'absorption d'eau par la couverture. Ce sont trois opérations distinctes, qui se combinent. Un nettoyage à trop forte pression abîme les tuiles : confiez-le à un professionnel équipé.",
    sections: [
      { h2: "Trois opérations, trois rôles", list: ["Le démoussage retire mousses, lichens et salissures.", "Le traitement anti-mousse dépose un produit qui freine leur retour.", "L'hydrofuge limite l'imprégnation d'eau de la couverture, il ne la rend pas étanche."] },
      { h2: "Pourquoi traiter une toiture", paragraphs: ["Les mousses retiennent l'humidité, accélèrent le vieillissement de la couverture et peuvent gêner l'évacuation de l'eau. Traiter une toiture saine prolonge sa durée de vie ; sur une toiture déjà dégradée, le traitement ne remplace pas une réparation."] },
      { h2: "Les précautions", list: ["Un nettoyeur haute pression trop puissant décape la surface des tuiles et des ardoises.", "Les produits ruissellent : l'artisan doit protéger les eaux et les plantations.", "Le travail en hauteur exige harnais et protections collectives.", "Une toiture ne se traite pas sous la pluie ou par grand froid : le produit doit sécher."] },
      { h2: "Quand préférer une réparation", paragraphs: ["Si des éléments sont cassés, poreux ou déplacés, le traitement ne suffit pas. Le couvreur vous le dit après inspection."] },
    ],
    faq: [
      { q: "À quelle fréquence traiter ?", a: "Cela dépend de l'exposition, de l'ombre, de la végétation proche et du type de couverture. Votre couvreur vous conseille après inspection." },
      { q: "L'hydrofuge est-il obligatoire ?", a: "Non, c'est un choix de protection. Il dépend de l'état de la couverture et de son exposition." },
    ],
    liens: ["/prix/nettoyage-toiture/", "/prix/demoussage-toiture/", "/prix/hydrofuge-toiture-100-m2/"],
  }),
  ed({
    url: "/guides/couvreur-urgence/",
    titre: "Couvreur en urgence : que faire après une tempête ou une fuite",
    description: "Tuiles arrachées, fuite active, tempête : les gestes de sécurité, ce qu'une intervention d'urgence peut faire et les précautions à prendre avant de signer.",
    reponse: "En urgence, mettez-vous et vos biens en sécurité, évitez le toit et appelez un couvreur pour une mise à l'abri provisoire. Demandez un devis écrit avant d'intervenir, même en urgence, et méfiez-vous des démarcheurs qui se présentent après une tempête.",
    sections: [
      { h2: "En cas de danger", list: ["Éloignez-vous des tuiles ou éléments prêts à tomber et balisez la zone.", "Ne montez pas sur le toit.", "Pour un danger immédiat pour des personnes, contactez les services de secours."] },
      { h2: "Ce qu'une intervention d'urgence peut faire", paragraphs: ["Le couvreur pose une protection provisoire (bâche, remplacement de quelques éléments) pour arrêter l'entrée d'eau. La réparation définitive se planifie ensuite, avec un devis dédié."] },
      { h2: "Avant de signer", list: ["Exigez un devis écrit qui décrit l'intervention et son prix, même pour une mise à l'abri.", "Vérifiez le nom de l'entreprise, son adresse et son assurance.", "Gardez les photos et les pièces pour votre assureur.", "En cas de démarchage à votre domicile, un délai de rétractation s'applique en principe. Une intervention d'urgence que vous demandez expressément a des règles particulières : lisez le contrat avant de signer."] },
      { h2: "Après une tempête", paragraphs: ["Les artisans sont très sollicités. Déclarez le sinistre à votre assureur dans le délai de votre contrat et demandez un devis pour la réparation définitive avant de choisir."] },
    ],
    faq: [
      { q: "Artisans France peut-il envoyer un couvreur tout de suite ?", a: "Nous ne promettons aucun délai d'intervention. Nous étudions votre demande et vous mettons en relation avec un artisan sélectionné quand il y en a un disponible dans votre secteur. En cas de danger immédiat, appelez les secours." },
    ],
    liens: ["/guides/fuite-toiture/", "/guides/reparation-toiture/"],
  }),

  // ------------------------------------------------------------------ aides et réglementation
  ed({
    url: "/aides/aide-refaire-toiture/",
    titre: "Aides pour refaire sa toiture : lesquelles, sous quelles conditions",
    description: "Refaire une toiture donne rarement droit, à elle seule, aux aides à la rénovation énergétique. Ce que visent les dispositifs et comment vérifier vos droits.",
    reponse: "Refaire seulement la couverture d'une toiture ne donne en général pas droit aux aides à la rénovation énergétique, qui visent l'isolation. Si le chantier inclut l'isolation de la toiture, des aides peuvent s'appliquer sous conditions de logement, de ressources et de qualification de l'artisan. Vérifiez sur France Rénov'.",
    sections: [
      { h2: "Ce que les aides financent", paragraphs: ["Les aides nationales à la rénovation énergétique visent à réduire la consommation d'énergie du logement. Elles concernent donc l'isolation des combles et de la toiture, pas le simple remplacement de tuiles ou d'ardoises."] },
      { h2: "Les dispositifs à connaître", list: ["MaPrimeRénov' : aide de l'État sous conditions de logement et de ressources.", "Certificats d'économies d'énergie (CEE) : primes proposées par des fournisseurs d'énergie, selon les travaux.", "Éco-prêt à taux zéro : prêt pour financer des travaux de rénovation énergétique.", "TVA à taux réduit pour des travaux d'amélioration dans un logement ancien, selon les cas.", "Aides locales : certaines collectivités complètent les dispositifs nationaux."] },
      { h2: "Les conditions qui reviennent", list: ["Logement ancien et, selon l'aide, résidence principale.", "Travaux réalisés par une entreprise qualifiée pour les aides concernées.", "Demande déposée avant la signature du devis ou le début des travaux, selon le dispositif.", "Plafonds de ressources pour certaines aides."] },
      { h2: "Comment vérifier vos droits", paragraphs: ["Les montants, les critères et les dates de dépôt changent régulièrement. Consultez France Rénov', service public qui informe et oriente, avant de signer un devis. Un artisan qui promet une aide sans examiner votre dossier doit éveiller la méfiance."] },
    ],
    faq: [
      { q: "Mon artisan doit-il être qualifié ?", a: "Pour plusieurs aides à la rénovation énergétique, oui. Demandez-lui sa qualification et vérifiez-la avant de signer." },
      { q: "Artisans France monte-t-il mon dossier d'aide ?", a: "Non. Nous vous mettons en relation avec un artisan. Les démarches d'aides se font auprès des organismes compétents, avec l'aide éventuelle de votre artisan." },
    ],
    sources: [RENOV, SP, DGCCRF],
    liens: ["/aides/aide-renover-toiture/", "/aides/avancee-de-toiture/", "/devis/toiture/"],
  }),
  ed({
    url: "/aides/aide-renover-toiture/",
    titre: "Financer la rénovation de sa toiture : par où commencer",
    description: "Comparer les devis, vérifier l'assurance, examiner les aides, le taux de TVA et les modes de financement : les étapes pour préparer le financement d'une toiture.",
    reponse: "Pour financer une rénovation de toiture, commencez par comparer plusieurs devis détaillés, vérifiez ce que votre assurance couvre, examinez les aides possibles sur France Rénov' puis les options de prêt. N'engagez pas de dépense avant d'avoir vérifié les conditions de dépôt des aides.",
    sections: [
      { h2: "Dans quel ordre procéder", list: ["Faire établir un diagnostic et des devis détaillés.", "Vérifier si votre assurance couvre une partie des dégâts, par exemple après une tempête.", "Examiner les aides auxquelles vous pouvez prétendre, avant de signer.", "Comparer les options de financement : épargne, prêt travaux, éco-prêt à taux zéro selon les travaux.", "Signer le devis, et conserver les factures et attestations nécessaires aux aides."] },
      { h2: "L'assurance habitation", paragraphs: ["Une toiture endommagée par une tempête ou la grêle relève en général de la garantie correspondante de votre contrat. L'usure normale et le défaut d'entretien ne sont en revanche pas couverts. Votre assureur vous indique ce qui s'applique après expertise."] },
      { h2: "TVA et pièces à conserver", paragraphs: ["Un taux de TVA réduit peut s'appliquer à des travaux d'amélioration dans un logement ancien, selon leur nature. Le devis doit indiquer le taux appliqué. Conservez devis, factures et attestations : plusieurs aides les exigent."] },
      { h2: "Les pièges", list: ["Une aide promise sans examen de votre situation.", "Un devis non daté, sans détail ou sans mention d'assurance.", "Un acompte trop important demandé avant le début du chantier."] },
    ],
    faq: [
      { q: "Peut-on étaler le paiement ?", a: "Oui, par un prêt ou par un échéancier prévu au devis. Évitez les acomptes importants avant le démarrage et vérifiez le calendrier de paiement." },
    ],
    sources: [RENOV, SP, DGCCRF],
    liens: ["/aides/aide-refaire-toiture/", "/aides/avancee-de-toiture/", "/devis/toiture/"],
  }),
  ed({
    url: "/aides/avancee-de-toiture/",
    titre: "Avancée de toiture : règles, autorisations et voisinage",
    description: "Une avancée de toiture protège les murs et prolonge la couverture. Les règles d'urbanisme, de voisinage et d'écoulement des eaux à vérifier avant les travaux.",
    reponse: "Une avancée de toiture, ou débord, prolonge la couverture au-delà du mur. Selon sa taille et ce qu'elle couvre, elle peut relever d'une déclaration préalable ou d'un permis. Elle ne doit pas déverser les eaux de pluie chez le voisin : le code civil l'interdit. Vérifiez auprès de votre mairie.",
    sections: [
      { h2: "À quoi sert un débord de toit", paragraphs: ["Il éloigne l'eau de pluie des murs, protège les façades et les menuiseries, et peut abriter une entrée ou une terrasse. Sa longueur dépend du style de la maison et des règles locales."] },
      { h2: "Les autorisations", paragraphs: ["Prolonger un toit modifie l'aspect extérieur de la construction et, si l'avancée couvre un espace, peut créer de la surface ou de l'emprise au sol. Une déclaration préalable ou un permis de construire peut alors être exigé selon les seuils du code de l'urbanisme et le plan local d'urbanisme de votre commune."] },
      { h2: "Le voisinage", list: ["Le code civil impose d'établir les toits de façon que les eaux de pluie s'écoulent sur votre terrain ou sur la voie publique, et non sur celui du voisin.", "Les règles de distance par rapport à la limite de propriété et les règles de vue relèvent du plan local d'urbanisme et du code civil.", "En copropriété, l'accord de l'assemblée générale peut être nécessaire."] },
      { h2: "Avant de signer", list: ["Demandez à la mairie si une autorisation est requise pour votre projet.", "Faites préciser au devis la longueur du débord, la charpente concernée et l'évacuation des eaux.", "Vérifiez que l'artisan est assuré pour ce type de travaux."] },
    ],
    faq: [
      { q: "Une avancée de toit nécessite-t-elle toujours une autorisation ?", a: "Non, pas toujours. Cela dépend de sa taille, de l'espace couvert et des règles locales. Seule votre mairie peut vous répondre pour votre terrain." },
    ],
    liens: ["/aides/aide-refaire-toiture/", "/aides/aide-renover-toiture/", "/devis/toiture/", "/devis/charpente/"],
  }),

  // ------------------------------------------------------------------ guides de prix (sans fourchette : facteurs de prix, lecture du devis)
  ed({
    url: "/prix/nettoyage-toiture/",
    titre: "Prix d'un nettoyage de toiture : ce qui le fait varier",
    description: "Surface, pente, accès, niveau d'encrassement et traitements associés font varier le prix d'un nettoyage de toiture. Ce que doit comprendre un devis.",
    reponse: "Le prix d'un nettoyage de toiture dépend de la surface, de la pente, de l'accès (échafaudage, nacelle), du niveau d'encrassement, du type de couverture et des traitements associés. Seul un devis détaillé établi après visite donne un prix fiable pour votre toiture.",
    sections: [
      { h2: "Ce qui fait varier le prix", list: ["La surface de toiture réellement nettoyée, pas seulement l'emprise au sol de la maison.", "La pente et l'accessibilité : une toiture raide ou haute demande des protections et du matériel d'accès.", "Le niveau d'encrassement : mousses épaisses, lichens et dépôts demandent plus de temps.", "Le type de couverture : tuile, ardoise, fibrociment ne se nettoient pas de la même façon.", "Les traitements associés : anti-mousse, hydrofuge.", "La gestion des eaux de ruissellement et la protection des abords."] },
      { h2: "Ce que le devis doit détailler", list: ["Les opérations prévues : démoussage, anti-mousse, hydrofuge.", "Les protections du chantier et le matériel d'accès.", "Le traitement des eaux de ruissellement et l'évacuation des déchets.", "Les garanties offertes sur le traitement."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Faut-il nettoyer une toiture ?", a: "Cela dépend de l'état de la couverture et de l'exposition. Un nettoyage régulier limite l'humidité, mais il ne remplace pas la réparation d'éléments abîmés." },
      DEVIS_GRATUIT,
    ],
    liens: ["/guides/traitement-toiture/", "/prix/demoussage-toiture/", "/devis/toiture/"],
  }),
  ed({
    url: "/prix/demoussage-toiture/",
    titre: "Prix d'un démoussage de toiture : facteurs et devis",
    description: "Le prix d'un démoussage de toiture dépend de la surface, de l'accès et de l'état de la couverture. Ce qui est compris et ce qu'il faut demander.",
    reponse: "Le prix d'un démoussage de toiture dépend de la surface, de la pente, de l'accès et de l'épaisseur des mousses, ainsi que des traitements ajoutés (anti-mousse, hydrofuge). Seul un devis établi après visite donne un prix fiable ; il doit détailler chaque opération.",
    sections: [
      { h2: "Ce qui fait varier le prix", list: ["Surface de couverture et nombre de pans.", "Pente, hauteur du bâtiment et nécessité d'un échafaudage ou d'une nacelle.", "Épaisseur et ancienneté des mousses et lichens.", "Méthode employée : brossage, application de produit, nettoyage doux.", "Traitement complémentaire : anti-mousse ou hydrofuge."] },
      { h2: "Les points à vérifier avant de signer", list: ["La méthode : un nettoyage trop agressif abîme la couverture.", "La protection des eaux, des plantations et des façades.", "La garantie proposée sur le résultat.", "L'assurance de l'entreprise pour le travail en hauteur."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Démoussage et nettoyage, est-ce la même chose ?", a: "Le démoussage retire les mousses ; le nettoyage peut aussi retirer les salissures et dépôts. Les deux sont souvent combinés dans un même devis." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/nettoyage-toiture/", "/prix/hydrofuge-toiture-100-m2/", "/guides/traitement-toiture/"],
  }),
  ed({
    url: "/prix/refaire-toiture/",
    titre: "Prix pour refaire une toiture : ce qui compte vraiment",
    description: "Refaire une toiture mobilise la couverture, la charpente, la zinguerie et l'accès au chantier. Les postes qui font varier le prix et la lecture d'un devis.",
    reponse: "Le prix pour refaire une toiture dépend de la surface, de la complexité de la toiture, du matériau choisi, de l'état de la charpente, de la dépose de l'ancienne couverture, de l'isolation et de l'accès au chantier. Un devis détaillé après visite est le seul moyen d'avoir un prix fiable.",
    sections: [
      { h2: "Les postes d'un devis de réfection", list: ["Installation de chantier et échafaudage.", "Dépose de l'ancienne couverture et évacuation.", "Contrôle et réparation éventuelle de la charpente.", "Écran sous toiture, liteaux et chevrons.", "Couverture : matériau, accessoires de faîtage, rives et ventilation.", "Zinguerie : gouttières, noues, solins.", "Isolation, si elle est prévue en même temps."] },
      { h2: "Ce qui explique les écarts entre deux devis", list: ["Le matériau : tuile, ardoise, zinc, bac acier n'ont ni le même coût, ni la même durée de vie.", "La complexité : nombre de pans, lucarnes, noues, cheminées.", "L'état de la charpente, qu'on ne connaît qu'une fois la couverture déposée.", "Le périmètre : un devis moins cher peut simplement omettre la zinguerie ou l'évacuation."] },
      { h2: "Les démarches associées", paragraphs: ["Changer l'aspect de la toiture demande en général une déclaration préalable. Vérifiez les règles locales avant de signer. Si l'isolation fait partie du chantier, renseignez-vous sur les aides à la rénovation énergétique avant de signer le devis."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Peut-on refaire la toiture par moitié ?", a: "Oui, par pan par exemple, mais cela peut coûter plus cher au total que d'intervenir en une fois, à cause du matériel d'accès et des raccords. Demandez les deux chiffrages." },
      DEVIS_GRATUIT,
    ],
    liens: ["/aides/aide-refaire-toiture/", "/prix/toiture-m2/", "/devis/toiture/"],
  }),
  ed({
    url: "/prix/toiture-m2/",
    titre: "Prix d'une toiture au m² : pourquoi ce chiffre est trompeur",
    description: "Le prix d'une toiture au m² dépend du matériau, de la pente, de la charpente et des travaux associés. Comment lire un prix au m² sans se tromper.",
    reponse: "Un prix de toiture au m² est une moyenne qui masque des écarts importants : matériau, forme de la toiture, état de la charpente, dépose, zinguerie et accès font varier le coût réel. Il sert à comparer des devis de même périmètre, pas à budgéter un chantier.",
    sections: [
      { h2: "Pourquoi un prix au m² est trompeur", list: ["La surface de toiture est supérieure à l'emprise au sol, à cause de la pente.", "Le prix au m² d'un matériau n'inclut pas toujours dépose, charpente et zinguerie.", "Les petites toitures coûtent proportionnellement plus cher que les grandes, car l'installation de chantier est incompressible.", "Une toiture complexe (lucarnes, noues) demande plus de découpes et de temps."] },
      { h2: "Comment s'en servir", paragraphs: ["Utilisez le prix au m² pour comparer deux devis qui couvrent le même périmètre, en vérifiant ligne à ligne ce que chacun inclut. Pour budgéter, demandez un devis global après visite."] },
      { h2: "Les matériaux courants", list: ["Tuile terre cuite ou béton.", "Ardoise naturelle ou fibrociment.", "Zinc.", "Bac acier, panneaux sandwich."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Comment mesurer sa surface de toiture ?", a: "Elle se calcule à partir de l'emprise au sol en tenant compte de la pente. Le couvreur la relève sur place ; ne vous fiez pas à la seule surface habitable." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/refaire-toiture/", "/prix/tuile-m2/", "/prix/toiture-ardoises-au-m2/"],
  }),
  ed({
    url: "/prix/pose-velux/",
    titre: "Prix de la pose d'un Velux : fenêtre de toit et devis",
    description: "La pose d'une fenêtre de toit dépend du modèle, des dimensions, de l'accès, de la reprise de charpente et de l'étanchéité. Ce qu'un devis doit contenir.",
    reponse: "Le prix de la pose d'une fenêtre de toit dépend du modèle et de ses dimensions, de l'ouverture à créer ou à remplacer, de la charpente à reprendre, de l'habillage intérieur, de l'étanchéité périphérique et de l'accès. Un devis détaillé après visite donne le prix fiable.",
    sections: [
      { h2: "Ce qui fait varier le prix", list: ["Le modèle : ouverture, motorisation, vitrage, volet ou store.", "Les dimensions de la fenêtre et du châssis.", "Remplacement d'une fenêtre existante ou création d'une ouverture dans la toiture.", "La reprise éventuelle de la charpente et de l'isolation.", "L'habillage intérieur et les finitions.", "L'accès au toit et la hauteur."] },
      { h2: "Les points qui conditionnent la durabilité", list: ["Le raccord d'étanchéité avec la couverture (solin ou raccord adapté à la couverture).", "La compatibilité du raccord avec le type de tuile ou d'ardoise.", "La pose de l'écran sous toiture autour du châssis."] },
      { h2: "Autorisation", paragraphs: ["Créer ou modifier une fenêtre de toit change l'aspect extérieur : une déclaration préalable est en général nécessaire. Renseignez-vous auprès de votre mairie."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Peut-on poser un Velux soi-même ?", a: "C'est possible techniquement, mais l'étanchéité et la charpente demandent un vrai savoir-faire. Une erreur se paie en infiltrations. Un professionnel assuré engage sa garantie." },
      DEVIS_GRATUIT,
    ],
    liens: ["/devis/toiture/", "/prix/toiture-m2/"],
  }),
  ed({
    url: "/prix/bac-acier-m2/",
    titre: "Prix d'une toiture en bac acier : facteurs et points de vigilance",
    description: "Pente, épaisseur, isolation, accessoires et pose font varier le prix d'une toiture en bac acier. Les points à vérifier avant de signer.",
    reponse: "Le prix d'une toiture en bac acier dépend de la surface, de la pente, du type de profil et de son revêtement, de l'isolation associée (panneaux sandwich ou isolant sous le bac), des accessoires de rive et de faîtage, et de la pose. Un devis détaillé donne le prix fiable.",
    sections: [
      { h2: "Pour quels toits ?", paragraphs: ["Le bac acier se pose sur des toitures à faible pente, des extensions, des bâtiments annexes. Léger, il se met en œuvre rapidement. Le bruit de la pluie et la condensation demandent une attention particulière, notamment sur les toitures non isolées."] },
      { h2: "Ce qui fait varier le prix", list: ["Profil et épaisseur de la tôle, finition de surface et couleur.", "Bac simple peau ou panneau sandwich isolé.", "Accessoires : rives, faîtière, closoirs, gouttières.", "Charpente à adapter ou à renforcer.", "Accessibilité et logistique de livraison."] },
      { h2: "Points de vigilance", list: ["La pente minimale recommandée par le fabricant doit être respectée.", "Les fixations et leur étanchéité conditionnent la durabilité.", "L'isolation et la ventilation évitent condensation et bruit.", "Les règles locales peuvent restreindre le choix du matériau."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Le bac acier est-il bruyant ?", a: "Sans isolation, il peut l'être en cas de pluie forte. Un panneau sandwich ou un isolant adapté atténue le bruit." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/toiture-m2/", "/devis/toiture/"],
  }),
  ed({
    url: "/prix/tuile-m2/",
    titre: "Prix de la tuile au m² : terre cuite, béton et pose",
    description: "Le prix d'une couverture en tuiles dépend du type de tuile, de la forme de la toiture, de la pose et de ses accessoires. Ce qu'il faut distinguer dans un devis.",
    reponse: "Le prix d'une couverture en tuiles dépend du type de tuile (terre cuite ou béton), de sa forme et de sa finition, de la complexité de la toiture, des accessoires de faîtage et de rive et de la pose. Le prix de la fourniture seule n'est pas le prix posé : demandez un devis complet.",
    sections: [
      { h2: "Ne pas confondre fourniture et pose", paragraphs: ["Un prix de tuile au m² est souvent le prix de la fourniture. Le coût d'un chantier comprend aussi la dépose, les liteaux, l'écran sous toiture, les accessoires de faîtage et de rive, la main-d'œuvre et l'accès."] },
      { h2: "Ce qui fait varier le prix", list: ["Terre cuite ou béton, forme (plate, canal, à emboîtement), teinte et finition.", "Pente et complexité du toit (noues, lucarnes).", "Quantité d'accessoires (tuiles de rive, faîtières, tuiles à douille).", "Modèle imposé par le plan local d'urbanisme ou un secteur protégé."] },
      { h2: "À vérifier", list: ["Les règles locales sur la forme et la couleur des tuiles.", "La compatibilité de la tuile avec la pente du toit.", "Les garanties du fabricant sur le produit."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Terre cuite ou béton ?", a: "Les deux conviennent à de nombreuses toitures. Le choix dépend de l'aspect recherché, de la charpente et des règles locales. Votre couvreur vous conseille selon votre maison." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/toiture-m2/", "/prix/refaire-toiture/"],
  }),
  ed({
    url: "/prix/hydrofuge-toiture-100-m2/",
    titre: "Prix d'un hydrofuge de toiture : facteurs et précautions",
    description: "Le prix d'un traitement hydrofuge de toiture dépend de la surface, de l'état du support et du produit. Ce qu'il apporte et ce qu'il ne fait pas.",
    reponse: "Le prix d'un traitement hydrofuge de toiture dépend de la surface, de l'état et de la porosité de la couverture, du nettoyage préalable, du produit utilisé et de l'accès. L'hydrofuge limite l'absorption d'eau mais ne répare pas une toiture abîmée ni ne la rend étanche.",
    sections: [
      { h2: "Ce que fait l'hydrofuge", paragraphs: ["Il réduit l'imprégnation d'eau des tuiles ou des ardoises, ce qui limite la prolifération de mousse et l'effet du gel. Il ne remplace ni la réparation d'éléments cassés ni l'étanchéité de la toiture."] },
      { h2: "Ce qui fait varier le prix", list: ["La surface, le nombre de pans et l'accès.", "La nécessité d'un nettoyage ou d'un démoussage préalable.", "Le type de couverture et sa porosité.", "Le produit, sa durée de protection annoncée et son application."] },
      { h2: "À demander", list: ["La garantie proposée et sa durée.", "Les conditions de pose : météo, séchage préalable.", "Le produit utilisé et sa fiche technique."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "L'hydrofuge est-il durable ?", a: "Sa durée dépend du produit, de l'exposition et du support. Demandez la durée de protection annoncée par le fabricant et ce que l'artisan garantit." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/demoussage-toiture/", "/guides/traitement-toiture/"],
  }),
  ed({
    url: "/prix/toiture-ardoises-au-m2/",
    titre: "Prix d'une toiture en ardoises : naturelle ou fibrociment",
    description: "Ardoise naturelle ou fibrociment, pose au clou ou au crochet : ce qui fait varier le prix d'une couverture en ardoises et ce qu'il faut demander.",
    reponse: "Le prix d'une toiture en ardoises dépend de la nature de l'ardoise (naturelle ou fibrociment), de son origine et de son format, du mode de pose (au clou ou au crochet), de la complexité du toit, de l'état de la charpente et de la zinguerie. La pose d'ardoises naturelles demande un savoir-faire spécifique.",
    sections: [
      { h2: "Ardoise naturelle ou fibrociment", paragraphs: ["L'ardoise naturelle est un matériau extrait de carrières, réputé pour sa longévité. L'ardoise en fibrociment est un produit manufacturé. Les deux n'ont ni le même aspect, ni la même durée de vie, ni la même pose."] },
      { h2: "Ce qui fait varier le prix", list: ["Origine, épaisseur et format de l'ardoise.", "Pose au clou ou au crochet.", "Complexité de la toiture : pans, noues, arêtiers, lucarnes.", "Zinguerie et accessoires en zinc ou en plomb.", "État et adaptation de la charpente."] },
      { h2: "À vérifier", list: ["L'expérience de l'artisan sur ce type de pose.", "La conformité aux règles locales et aux secteurs protégés.", "Les garanties du fabricant."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "L'ardoise dure-t-elle plus longtemps que la tuile ?", a: "L'ardoise naturelle est réputée très durable, mais la longévité dépend aussi de la pose, de l'entretien et de la charpente. Demandez conseil à votre couvreur." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/toiture-m2/", "/prix/refaire-toiture/"],
  }),
  ed({
    url: "/prix/pose-gouttiere-zinc/",
    titre: "Prix de la pose d'une gouttière en zinc : ce qui compte",
    description: "Développé, longueur, accessoires et accès font varier le prix d'une gouttière en zinc. Ce que doit détailler un devis de zinguerie.",
    reponse: "Le prix de la pose d'une gouttière en zinc dépend de sa longueur et de son développé, du nombre de descentes, de coudes et d'accessoires, de la dépose de l'ancienne gouttière, des fixations et de l'accès au chantier. Un devis détaillé après visite donne le prix fiable.",
    sections: [
      { h2: "Pourquoi le zinc", paragraphs: ["Le zinc est un matériau traditionnel de la zinguerie, durable et adapté à de nombreuses couvertures. Sa pose se fait par soudure ou assemblage, par un artisan formé à ces techniques."] },
      { h2: "Ce qui fait varier le prix", list: ["Longueur de gouttière et développé (largeur de la tôle).", "Nombre de descentes, de coudes et de raccords.", "Dépose et évacuation de l'ancienne gouttière.", "Fixations, pentes et évacuation vers le réseau d'eaux pluviales.", "Hauteur du bâtiment et accès."] },
      { h2: "À vérifier", list: ["Le raccordement à l'évacuation des eaux pluviales.", "La compatibilité des matériaux voisins (éviter certains contacts entre métaux).", "Les règles locales sur l'aspect des gouttières."] },
      COMMENT_LIRE,
      SANS_PRIX,
    ],
    faq: [
      { q: "Zinc, aluminium ou PVC ?", a: "Chaque matériau a ses atouts : durabilité, entretien, aspect. Votre couvreur vous conseille selon la toiture et le style de la maison." },
      DEVIS_GRATUIT,
    ],
    liens: ["/prix/refaire-toiture/", "/devis/toiture/"],
  }),
];

const BY_URL = new Map(LIST.map((e) => [e.url, e]));

export const hasEditorial = (url: string) => BY_URL.has(url);
export const getEditorial = (url: string) => BY_URL.get(url);
export const allEditorial = () => LIST;
