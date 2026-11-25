import Link from "next/link";
import TextPage, { textMetadata } from "@/components/TextPage";
import { confirmedChecks, hasConfirmedChecks } from "@/config/site";
import { TRADES } from "@/content/trades";
import { LinkList } from "@/components/Ui";
import { pagesOfType } from "@/lib/pages";

const DESC = "Comment Artisans France constitue son réseau d'artisans, département par département, et ce que nous attendons d'eux.";

export const metadata = textMetadata({ title: "Nos artisans", description: DESC, path: "/nos-artisans/" });

export default function Page() {
  const checks = confirmedChecks();
  return (
    <TextPage title="Nos artisans" path="/nos-artisans/" about description={DESC} lead="Notre réseau se construit département par département, au rythme des artisans que nous sélectionnons.">
      <h2>Un réseau en construction, présenté sans chiffre inventé</h2>
      <p>
        Artisans France ne vous présente pas un annuaire de milliers d'entreprises. Nous recrutons des artisans là où des particuliers nous confient des chantiers, et nous n'ouvrons un département que lorsque des artisans sélectionnés peuvent y intervenir. Nous ne publions ni nombre d'artisans, ni nombre de chantiers, ni note : seuls des chiffres vérifiables y figureraient.
      </p>

      <h2>Ce que nous vérifions</h2>
      {hasConfirmedChecks() ? (
        <ul>
          {checks.map((c) => (
            <li key={c.id}>{c.label}</li>
          ))}
        </ul>
      ) : (
        <p>Le détail des vérifications est publié sur la page des <Link href="/classement-et-selection/">critères de classement et de sélection</Link>, qui fait foi.</p>
      )}

      <h2>Ce que nous attendons d'un artisan partenaire</h2>
      <ul>
        <li>Une activité déclarée et exercée dans le métier concerné.</li>
        <li>Une assurance en cours de validité pour les travaux réalisés.</li>
        <li>Des devis écrits, détaillés et compréhensibles.</li>
        <li>Un contact rapide avec les clients que nous lui confions.</li>
        <li>Un contrat d'apport d'affaires signé avant toute transmission de demande.</li>
      </ul>

      <h2>Les métiers pour lesquels nous recrutons</h2>
      <LinkList items={pagesOfType("hub").filter((p) => p.trade && TRADES[p.trade]).map((p) => ({ href: `/artisans/${p.trade}/`, label: `${TRADES[p.trade!].nom} : recevoir des demandes de chantiers` }))} />

      <h2>Vous êtes artisan ?</h2>
      <p>
        Découvrez l'<Link href="/artisans/">espace artisans</Link> : nous recevons des demandes de chantiers de particuliers et les confions à des artisans sélectionnés. Pas de promesse de volume, pas d'exclusivité : une commission, uniquement si le chantier est signé.
      </p>
    </TextPage>
  );
}
