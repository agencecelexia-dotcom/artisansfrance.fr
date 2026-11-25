import Link from "next/link";
import TextPage, { textMetadata } from "@/components/TextPage";
import { COMPANY, SITE, legalComplete } from "@/config/site";

const DESC = "Conditions d'utilisation du service Artisans France : objet, gratuité pour le particulier, rôle d'apporteur d'affaires, responsabilités.";

export const metadata = textMetadata({ title: "Conditions d'utilisation", description: DESC, path: "/cgu/", ready: legalComplete() });

export default function Page() {
  return (
    <TextPage title="Conditions d'utilisation" path="/cgu/" lead="Les règles d'utilisation du site et du service de mise en relation.">
      <h2>1. Objet</h2>
      <p>
        Ces conditions encadrent l'utilisation du site {SITE.name}, édité par {COMPANY.legalName}, et du service qui permet à un particulier de décrire un chantier et d'être mis en relation avec un artisan sélectionné.
      </p>

      <h2>2. Gratuité pour le particulier</h2>
      <p>
        Le service est gratuit pour le particulier. {COMPANY.legalName} est rémunérée par l'artisan, sous forme de commission, uniquement si le chantier est signé. Aucune commission n'est demandée au particulier.
      </p>

      <h2>3. Rôle d'Artisans France</h2>
      <p>
        {SITE.name} est un apporteur d'affaires : il étudie les demandes et met en relation. Il n'est pas partie au contrat de travaux, qui est conclu entre le particulier et l'artisan. Les artisans sont seuls responsables de la réalisation de leurs travaux et de leurs garanties légales. Les principes de mise en relation sont décrits sur la page <Link href="/classement-et-selection/">Critères de classement et de sélection</Link>.
      </p>

      <h2>4. Votre demande</h2>
      <ul>
        <li>Vous vous engagez à fournir des informations exactes et un moyen de contact valable.</li>
        <li>La transmission de votre demande à des artisans partenaires nécessite votre accord, donné à la fin du formulaire. Vous pouvez le retirer à tout moment.</li>
        <li>Déposer une demande ne vous engage pas : vous restez libre de refuser toute proposition.</li>
      </ul>

      <h2>5. Absence de garantie de disponibilité</h2>
      <p>
        Nous ne garantissons ni délai de réponse, ni disponibilité d'un artisan dans un secteur donné. Si aucun artisan sélectionné n'est disponible, nous vous en informons et pouvons garder votre demande en attente.
      </p>

      <h2>6. Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans la <Link href="/politique-de-confidentialite/">politique de confidentialité</Link>.
      </p>

      <h2>7. Contenus du site</h2>
      <p>Les guides et pages d'information sont donnés à titre indicatif. Ils ne remplacent pas le devis d'un professionnel ni un conseil juridique ou technique personnalisé.</p>

      <h2>8. Droit applicable et litiges</h2>
      <p>
        Ces conditions sont soumises au droit français. En cas de litige, le consommateur peut recourir gratuitement à un médiateur de la consommation, dont les coordonnées figurent sur la page des <Link href="/classement-et-selection/">critères de classement et de sélection</Link>.
      </p>
    </TextPage>
  );
}
