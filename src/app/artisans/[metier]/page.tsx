import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Hero, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import ArtisanForm from "@/components/ArtisanForm";
import { TRADES } from "@/content/trades";
import { COMPANY, CONTENT_UPDATED, COVERED_DEPARTMENTS } from "@/config/site";
import { INDEXING_ON } from "@/config/publication";
import { deptGeo, getPublished, pagesOfType } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOfType("hub").map((p) => ({ metier: p.trade! }));
}

type Props = { params: Promise<{ metier: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metier } = await params;
  const trade = TRADES[metier];
  if (!trade || !getPublished(`/${metier}/`)) return {};
  return buildMetadata({
    title: `${trade.nom} : recevoir des demandes de chantiers`,
    description: `Artisan ${trade.nom.toLowerCase()} : recevez des demandes de chantiers de particuliers. Apport d'affaires BTP, commission uniquement si le chantier est signé.`,
    path: `/artisans/${metier}/`,
    index: INDEXING_ON,
  });
}

export default async function Page({ params }: Props) {
  const { metier } = await params;
  const trade = TRADES[metier];
  if (!trade || !getPublished(`/${metier}/`)) notFound();
  const fallback = !process.env.LEADS_WEBHOOK_URL && process.env.NODE_ENV === "production" ? COMPANY.contactEmail ?? undefined : undefined;
  const covered = COVERED_DEPARTMENTS.map((c) => deptGeo(c)?.nom ?? c);

  return (
    <>
      <Hero
        crumbs={[
          { name: "Artisans", path: "/artisans/" },
          { name: trade.nom, path: `/artisans/${metier}/` },
        ]}
        h1={`${trade.nom} : recevez des demandes de chantiers`}
        lead={`Des particuliers nous confient des chantiers de ${trade.nom.toLowerCase()}. Nous les étudions, puis nous les confions à des artisans sélectionnés de leur secteur.`}
        facts={["Commission uniquement si le chantier est signé", "Aucune promesse de volume ni d'exclusivité", "Contrat d'apport d'affaires signé avant toute transmission"]}
        aside={<ArtisanForm trades={[{ slug: metier, nom: trade.nom }]} tradeSlug={metier} fallbackEmail={fallback} />}
      />
      <Container className="py-12">
        <div className="texte max-w-[68ch]">
          <h2>Le principe</h2>
          <p>
            Nous recevons des demandes de particuliers, nous les étudions et nous les confions à un artisan sélectionné de leur secteur. Vous ne payez rien pour recevoir des demandes : vous nous versez une commission, définie au contrat d'apport d'affaires, uniquement si le chantier est signé.
          </p>
          <h2>Où nous recherchons des artisans</h2>
          <p>
            {covered.length > 0
              ? `Nous suivons déjà des artisans sélectionnés en ${covered.join(", ")}. Dans les autres départements, nous cherchons un artisan dès qu'une demande de chantier nous parvient.`
              : "Nous cherchons un artisan dès qu'une demande de chantier nous parvient d'un secteur où nous n'avons pas encore de partenaire. Indiquez vos départements d'intervention : nous vous disons si des demandes existent chez vous."}
          </p>
          <h2>Ce que nous attendons d'un artisan</h2>
          <ul>
            <li>Une activité déclarée dans le métier concerné et une assurance en cours de validité.</li>
            <li>Des devis écrits et détaillés, un contact rapide avec les clients.</li>
            <li>Le respect du client, qui reste libre de refuser.</li>
          </ul>
          <p>
            Les pages départementales du métier présentent les secteurs où nous recevons des demandes : <Link href={`/${metier}/`}>{trade.nom}</Link>.
          </p>
        </div>
        <Faq
          items={[
            { q: "Combien de demandes vais-je recevoir ?", a: "Nous ne promettons aucun volume. Il dépend des demandes de particuliers dans votre secteur, et nous vous le disons franchement avant que vous vous engagiez." },
            { q: "Y a-t-il un abonnement ?", a: "Non : une commission, définie au contrat d'apport d'affaires, est due uniquement si le chantier est signé." },
          ]}
        />
        <Updated date={CONTENT_UPDATED} />
      </Container>
    </>
  );
}
