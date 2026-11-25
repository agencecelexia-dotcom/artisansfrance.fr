import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Hero, SectionTitle, LinkList, heroFacts, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { LeadFormBlock, LocatorBlock } from "@/components/FormBlocks";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { CONTENT_UPDATED, OPS, callbackText } from "@/config/site";
import { getPublished, guidesOf, pagesOfType, robotsFor } from "@/lib/pages";
import { buildMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOfType("devis").map((p) => ({ slug: p.url.split("/").filter(Boolean)[1] }));
}

type Props = { params: Promise<{ slug: string }> };

const sujet = (slug: string) => slug.replace(/-/g, " ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublished(`/devis/${slug}/`);
  if (!page) return {};
  return buildMetadata({
    title: `Devis ${sujet(slug)} : décrivez votre chantier`,
    description: `Devis ${sujet(slug)} : décrivez votre chantier en deux minutes, un conseiller Celexia l'étudie et un artisan sélectionné vous contacte pour visiter et chiffrer. Gratuit pour vous.`,
    path: page.url,
    index: robotsFor(page).index,
  });
}

export default async function DevisPage({ params }: Props) {
  const { slug } = await params;
  const page = getPublished(`/devis/${slug}/`);
  const trade = page?.trade ? TRADES[page.trade] : undefined;
  if (!page || !page.trade || !trade) notFound();
  const s = sujet(slug);
  const guides = guidesOf(page.trade, ["prix", "probleme", "aides"]).slice(0, 6);

  const faq = [
    { q: "Le devis est-il gratuit ?", a: "Notre service est gratuit pour vous. Le devis lui-même relève de l'artisan : demandez-lui, avant la visite, si le déplacement et le devis sont facturés." },
    { q: "Qui reçoit ma demande ?", a: OPS.artisansPerRequest ? `Votre demande est transmise, avec votre accord, à ${OPS.artisansPerRequest} artisan${OPS.artisansPerRequest > 1 ? "s" : ""} sélectionné${OPS.artisansPerRequest > 1 ? "s" : ""} de votre secteur au plus.` : "Votre demande n'est transmise qu'avec votre accord, à des artisans sélectionnés de votre secteur. Les critères de sélection sont détaillés sur la page « Critères de classement et de sélection »." },
    { q: "Dois-je accepter le devis ?", a: "Non. Vous restez libre de comparer plusieurs devis et de refuser. Nous ne sommes rémunérés par l'artisan que si votre chantier est signé." },
    ...trade.faq.slice(0, 2),
  ];

  return (
    <>
      <Hero
        crumbs={[
          { name: trade.nom, path: `/${page.trade}/` },
          { name: `Devis ${s}`, path: page.url },
        ]}
        h1={`Devis ${s} : décrivez votre chantier`}
        lead={`Dites-nous ce que vous voulez faire. Un conseiller Celexia étudie votre demande et vous rappelle ${callbackText()}, puis un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer.`}
        facts={heroFacts()}
        below={<LocatorBlock trade={page.trade} />}
        aside={<LeadFormBlock tradeSlug={page.trade} keyword={page.keyword ?? undefined} title={`Devis ${s}`} />}
      />
      <Container className="py-12">
        <div className="texte max-w-[68ch]">
          <h2>Ce que contient un bon devis</h2>
          <ul>
            <li>L'identité de l'entreprise, son adresse et son numéro d'immatriculation.</li>
            <li>Le détail des travaux, poste par poste, avec les quantités et les matériaux.</li>
            <li>Le prix hors taxes, le taux de TVA appliqué et le prix toutes taxes comprises.</li>
            <li>Les dates ou délais de début et de fin de chantier.</li>
            <li>La durée de validité du devis et les conditions de paiement.</li>
            <li>L'assurance de l'entreprise et les garanties applicables.</li>
          </ul>

          <h2>Les questions à poser avant de signer</h2>
          <ul>
            {trade.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>

          <h2>Comparer plusieurs devis</h2>
          <p>
            Comparez le contenu, pas seulement le total : un devis moins élevé peut omettre des postes (échafaudage, évacuation, finitions). Un conseiller peut vous aider à repérer ces écarts lors du rappel.
          </p>
        </div>

        {guides.length > 0 && (
          <>
            <SectionTitle>Guides pour préparer votre devis</SectionTitle>
            <LinkList items={guides.map((p) => ({ href: p.url, label: getEditorial(p.url)?.titre ?? p.h1 }))} />
          </>
        )}
        <LinkList items={[{ href: `/${page.trade}/`, label: `Tout savoir sur le métier de ${trade.nom.toLowerCase()}` }]} />
        <Faq items={faq} />
        <Updated date={CONTENT_UPDATED} />
      </Container>
      <JsonLd data={serviceLd({ name: `Devis ${s}`, description: trade.accroche, path: page.url })} />
    </>
  );
}
