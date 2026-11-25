import Link from "next/link";
import TextPage, { textMetadata } from "@/components/TextPage";
import Faq from "@/components/Faq";

const DESC = "Annuaire, plateforme de devis, place de marché, courtier ou apporteur d'affaires : les différents sites pour trouver un artisan, comment ils fonctionnent et les questions à leur poser.";

export const metadata = textMetadata({ title: "Quel site pour trouver un artisan ?", description: DESC, path: "/quel-site-pour-trouver-un-artisan/" });

const FAQ = [
  { q: "Quel site choisir pour trouver un artisan ?", a: "Cela dépend de ce que vous cherchez : un annuaire pour contacter vous-même des entreprises, une plateforme de devis pour recevoir des propositions, un courtier ou un apporteur d'affaires pour être accompagné. Dans tous les cas, demandez comment le site est rémunéré et combien d'entreprises reçoivent votre demande." },
  { q: "Un site de mise en relation est-il payant pour le particulier ?", a: "Cela varie. De nombreux sites sont gratuits pour le particulier et rémunérés par les professionnels, mais certains facturent des services. La loi impose aux plateformes d'indiquer leurs critères de classement et leur rémunération : cherchez cette information avant de donner vos coordonnées." },
  { q: "Que signifie « apporteur d'affaires » ?", a: "L'apporteur d'affaires met en relation un client et un professionnel et est rémunéré par une commission si l'affaire se conclut. Il ne réalise pas les travaux. C'est le modèle d'Artisans France." },
];

export default function Page() {
  return (
    <TextPage title="Quel site pour trouver un artisan ?" path="/quel-site-pour-trouver-un-artisan/" about description={DESC} lead="Il existe cinq grandes façons de trouver un artisan en ligne. Voici ce qui les distingue, et les questions à poser à n'importe lequel d'entre eux.">
      <h2>Les cinq types de sites</h2>
      <h3>L'annuaire</h3>
      <p>Une liste d'entreprises classées par métier et par ville. Vous les contactez vous-même, une par une. Les classements peuvent mêler résultats gratuits et mises en avant payantes : vérifiez-le.</p>
      <h3>La plateforme de devis</h3>
      <p>Vous décrivez votre projet et plusieurs entreprises reçoivent la demande et vous proposent un devis. L'avantage est la comparaison ; la contrepartie est parfois des sollicitations nombreuses.</p>
      <h3>La place de marché de services</h3>
      <p>Vous publiez une annonce et des professionnels ou des particuliers proposent leurs services. Adaptée aux petits travaux, elle demande de vérifier soi-même l'assurance et les qualifications.</p>
      <h3>Le courtier en travaux</h3>
      <p>Un interlocuteur coordonne le chantier : il choisit les artisans, suit les travaux et facture l'ensemble. Il engage sa responsabilité sur le résultat.</p>
      <h3>L'apporteur d'affaires</h3>
      <p>
        Un conseiller étudie votre projet puis vous met en relation avec un artisan sélectionné, rémunéré par une commission si le chantier est signé. Vous signez le contrat avec l'artisan. C'est le principe d'<Link href="/comment-ca-marche/">Artisans France</Link>.
      </p>

      <h2>Les questions à poser à n'importe quel site</h2>
      <ul>
        <li>Comment êtes-vous rémunéré, et par qui ?</li>
        <li>À combien d'entreprises ma demande est-elle transmise ?</li>
        <li>Qui m'appelle, et au nom de qui ?</li>
        <li>Que vérifiez-vous sur les professionnels, et comment le prouver ?</li>
        <li>Où lire vos critères de classement et de sélection ?</li>
        <li>Comment retirer mes coordonnées si je change d'avis ?</li>
      </ul>
      <p>Ces informations doivent figurer sur le site : les plateformes en ligne ont l'obligation de les rendre accessibles aux consommateurs.</p>

      <h2>Notre réponse à ces questions</h2>
      <p>
        Nous sommes rémunérés par l'artisan, uniquement si le chantier est signé. Un conseiller Celexia vous rappelle. Votre demande n'est transmise qu'avec votre accord. Nos critères sont publiés sur la page <Link href="/classement-et-selection/">Critères de classement et de sélection</Link>.
      </p>
      <Faq items={FAQ} />
    </TextPage>
  );
}
