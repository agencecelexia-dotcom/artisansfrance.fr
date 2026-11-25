import Link from "next/link";
import TextPage, { textMetadata } from "@/components/TextPage";
import { callbackText, COMPANY } from "@/config/site";

const DESC = "Vous décrivez votre chantier, un conseiller Celexia l'étudie et vous rappelle, puis un artisan sélectionné de votre secteur vous contacte. Gratuit pour vous.";

export const metadata = textMetadata({ title: "Comment ça marche", description: DESC, path: "/comment-ca-marche/" });

export default function Page() {
  return (
    <TextPage title="Comment ça marche" path="/comment-ca-marche/" about description={DESC} lead="Vous décrivez votre chantier, nous l'étudions, un artisan sélectionné de votre secteur vous contacte. Voici le détail, sans zone d'ombre.">
      <h2>Les trois étapes</h2>
      <ol>
        <li>
          <strong>Vous décrivez votre chantier.</strong> Métier, type de travaux, ampleur, code postal, délai, budget, statut : le formulaire prend deux minutes et ne vous engage à rien.
        </li>
        <li>
          <strong>Nous l'étudions et nous vous rappelons.</strong> Un conseiller Celexia vous rappelle {callbackText()} pour préciser votre projet et vérifier qu'il est réalisable dans votre secteur.
        </li>
        <li>
          <strong>Un artisan sélectionné vous contacte.</strong> Avec votre accord, votre demande est transmise à un artisan de votre secteur. Il visite et chiffre ; vous comparez, vous décidez, vous restez libre de refuser.
        </li>
      </ol>

      <h2>Pourquoi c'est gratuit pour vous</h2>
      <p>
        Artisans France est un service d'apport d'affaires. Nous sommes rémunérés par l'artisan, sous forme de commission, uniquement si votre chantier est signé. Vous ne payez rien : ni l'étude de votre demande, ni la mise en relation. Si vous ne signez pas, personne ne nous paie.
      </p>
      <p>
        Cela distingue notre démarche de la vente de contacts : notre intérêt est que le chantier se passe bien et soit signé, pas de revendre vos coordonnées à de nombreuses entreprises.
      </p>

      <h2>Qui vous rappelle</h2>
      <p>
        C'est un conseiller de {COMPANY.legalName}, la société qui édite Artisans France. Il se présente comme tel : vous savez qui vous appelle et pourquoi. Le délai de rappel est {callbackText()}.
      </p>

      <h2>Si aucun artisan n'est disponible près de chez vous</h2>
      <p>
        Nous ouvrons les départements au rythme des artisans que nous sélectionnons. Si nous n'avons pas d'artisan disponible dans votre secteur, nous vous le disons honnêtement, au lieu de vous laisser sans réponse. Votre demande est alors gardée en attente, et nous cherchons un artisan adapté ; nous ne promettons ni délai ni artisan que nous n'avons pas.
      </p>

      <h2>Ce que nous ne faisons pas</h2>
      <ul>
        <li>Nous ne réalisons pas les travaux : ce sont les artisans qui interviennent et qui sont responsables de leurs chantiers.</li>
        <li>Nous n'affichons ni note, ni avis, ni classement payant.</li>
        <li>Nous ne promettons pas d'exclusivité, ni à vous ni à l'artisan.</li>
        <li>Nous ne transmettons votre demande qu'avec votre accord, que vous donnez à la fin du formulaire.</li>
      </ul>

      <h2>Vos données</h2>
      <p>
        Vos coordonnées servent à étudier votre demande et à la transmettre aux artisans partenaires que vous avez acceptés. La <Link href="/partenaires/">liste des partenaires</Link> est publique et la <Link href="/politique-de-confidentialite/">politique de confidentialité</Link> détaille vos droits, dont celui de vous opposer à tout moment.
      </p>
      <p>
        Pour les règles de mise en relation et notre rémunération, consultez les <Link href="/classement-et-selection/">critères de classement et de sélection</Link>.
      </p>
    </TextPage>
  );
}
