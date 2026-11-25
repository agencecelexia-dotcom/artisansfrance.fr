import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Hero, SectionTitle, LinkList, heroFacts, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { LeadFormBlock, LocatorBlock } from "@/components/FormBlocks";
import { TRADES } from "@/content/trades";
import { DEVIS_NOTES } from "@/content/devis-notes";
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
  const note = DEVIS_NOTES[slug];
  const guides = guidesOf(page.trade, ["prix", "probleme", "aides"]).slice(0, 6);

  const seed = [...slug].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);
  const qs = trade.questions.map((q, i) => ({ q, k: (seed ^ (i * 2654435761)) >>> 0 })).sort((x, y) => x.k - y.k).slice(0, 3).map((x) => x.q);
  const faq = [
    ...(note
      ? [
          { q: `Que doit détailler un devis ${note[0]} ?`, a: `${note[2].split("|").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ; ")}.` },
          { q: "Quelle erreur éviter ?", a: note[3] },
        ]
      : []),
    { q: "Qui reçoit ma demande ?", a: OPS.artisansPerRequest ? `Votre demande est transmise, avec votre accord, à ${OPS.artisansPerRequest} artisan${OPS.artisansPerRequest > 1 ? "s" : ""} sélectionné${OPS.artisansPerRequest > 1 ? "s" : ""} de votre secteur au plus.` : "Votre demande n'est transmise qu'avec votre accord, à des artisans sélectionnés de votre secteur." },
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
        facts={heroFacts().slice(0, 1)}
        below={<LocatorBlock trade={page.trade} />}
        aside={<LeadFormBlock tradeSlug={page.trade} keyword={page.keyword ?? undefined} title={`Devis ${s}`} />}
      />
      <Container className="py-12">
        <div className="texte max-w-[68ch]">
          {note ? (
            <>
              <p>{note[1]}</p>
              <h2>Ce que le devis {note[0]} doit détailler</h2>
              <ul>
                {note[2].split("|").map((x) => (
                  <li key={x}>{x.charAt(0).toUpperCase() + x.slice(1)}.</li>
                ))}
              </ul>
              <h2>L'erreur fréquente</h2>
              <p>{note[3]}</p>
            </>
          ) : null}

          <h2>Le déroulement après le devis</h2>
          <ol>
            {trade.etapes.slice(0, 5).map((e) => (
              <li key={e.titre}>
                <strong>{e.titre}.</strong> {e.texte}
              </li>
            ))}
          </ol>

          <h2>Les questions à poser à l'artisan avant de signer</h2>
          <ul>
            {qs.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>

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
