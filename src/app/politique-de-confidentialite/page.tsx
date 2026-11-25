import Link from "next/link";
import TextPage, { Missing, textMetadata } from "@/components/TextPage";
import { COMPANY, OPS, legalComplete } from "@/config/site";

const DESC = "Quelles données Artisans France collecte, pourquoi, qui les reçoit, combien de temps elles sont conservées et comment exercer vos droits.";

export const metadata = textMetadata({ title: "Politique de confidentialité", description: DESC, path: "/politique-de-confidentialite/", ready: legalComplete() && OPS.dataRetentionMonths !== null });

export default function Page() {
  return (
    <TextPage title="Politique de confidentialité" path="/politique-de-confidentialite/" lead="Ce que nous faisons de vos données, en langage clair.">
      <h2>Qui est responsable de vos données</h2>
      <p>
        {COMPANY.legalName}, éditeur d'Artisans France, est responsable du traitement. Contact pour toute question sur vos données :{" "}
        {COMPANY.contactEmail ? <a href={`mailto:${COMPANY.contactEmail}`}>{COMPANY.contactEmail}</a> : <Missing label="e-mail de contact" />}.
      </p>

      <h2>Les données que nous collectons</h2>
      <ul>
        <li>Votre demande de chantier : métier, type de travaux, ampleur, code postal, délai, budget, statut.</li>
        <li>Vos coordonnées : prénom, nom, téléphone, adresse e-mail.</li>
        <li>La page du site d'où part votre demande, pour traiter votre demande et améliorer le site.</li>
      </ul>
      <p>Aucune donnée n'est collectée par ce site pour de la publicité ou du suivi par des tiers. Le site n'utilise pas de cookies de mesure d'audience ni de publicité.</p>

      <h2>Pourquoi et sur quelle base</h2>
      <ul>
        <li><strong>Étudier votre demande et vous rappeler</strong> : pour exécuter votre demande de mise en relation.</li>
        <li><strong>Transmettre votre demande à des artisans partenaires</strong> : avec votre consentement, donné à la fin du formulaire par une case à cocher, que vous pouvez retirer à tout moment.</li>
        <li><strong>Mesurer le fonctionnement du site</strong> : événements techniques sans données personnelles, sur la base de notre intérêt légitime à améliorer le service.</li>
      </ul>

      <h2>Qui reçoit vos données</h2>
      <ul>
        <li>Les conseillers de {COMPANY.legalName}.</li>
        <li>Les artisans partenaires auxquels vous avez accepté que votre demande soit transmise. La <Link href="/partenaires/">liste est publique</Link> et tenue à jour.</li>
        <li>Nos prestataires techniques (hébergement, outil de gestion de demandes), qui agissent pour notre compte.</li>
      </ul>

      <h2>Combien de temps nous les gardons</h2>
      <p>
        {OPS.dataRetentionMonths ? (
          <>Vos données sont conservées {OPS.dataRetentionMonths} mois à compter de votre dernier contact, puis supprimées ou anonymisées, sauf obligation légale de conservation.</>
        ) : (
          <Missing label="durée de conservation des demandes (OPS.dataRetentionMonths)" />
        )}
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation du traitement, leur portabilité, et vous opposer à leur traitement, y compris à leur transmission à des artisans, à tout moment. Écrivez-nous à l'adresse ci-dessus. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la <a href="https://www.cnil.fr/" rel="noopener">CNIL</a>.
      </p>

      <h2>Démarchage</h2>
      <p>
        Vous ne serez contacté que par un conseiller Celexia et, avec votre accord, par les artisans partenaires. Si vous ne souhaitez plus être contacté, demandez-le à l'adresse ci-dessus ; vous pouvez aussi vous inscrire gratuitement sur la liste d'opposition au démarchage téléphonique Bloctel.
      </p>
    </TextPage>
  );
}
