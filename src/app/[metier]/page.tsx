import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Hero, SectionTitle, LinkList, ArtisanCall, heroFacts, groupByRegion, nf, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { LeadFormBlock, LocatorBlock } from "@/components/FormBlocks";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { CONTENT_UPDATED } from "@/config/site";
import { cityPages, deptPages, getPublished, guidesOf, pagesOfType, regionPages, robotsFor, deptGeo } from "@/lib/pages";
import { buildMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOfType("hub").map((p) => ({ metier: p.trade! }));
}

type Props = { params: Promise<{ metier: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metier } = await params;
  const page = getPublished(`/${metier}/`);
  const trade = TRADES[metier];
  if (!page || !trade) return {};
  return buildMetadata({
    title: `${trade.nom} : artisan sélectionné près de chez vous`,
    description: trade.accroche,
    path: page.url,
    index: robotsFor(page).index,
  });
}

export default async function HubPage({ params }: Props) {
  const { metier } = await params;
  const page = getPublished(`/${metier}/`);
  const trade = TRADES[metier];
  if (!page || !trade) notFound();

  const depts = deptPages(metier);
  const villes = cityPages(metier).slice(0, 15);
  const regions = regionPages(metier);
  const guides = guidesOf(metier, ["probleme", "aides", "prix"]);
  const devis = guidesOf(metier, ["devis"]);
  const grouped = groupByRegion(depts);
  const nom = trade.nom;

  return (
    <>
      <Hero
        crumbs={[{ name: nom, path: page.url }]}
        h1={page.h1}
        lead={trade.accroche}
        facts={heroFacts()}
        below={<LocatorBlock trade={metier} />}
        aside={<LeadFormBlock tradeSlug={metier} keyword={page.keyword ?? undefined} />}
      />

      <Container className="py-12">
        <div className="texte max-w-[68ch]">
          {trade.intro.map((t) => (
            <p key={t}>{t}</p>
          ))}

          <h2>Les travaux courants</h2>
          <ul>
            {trade.travaux.map((t) => (
              <li key={t.titre}>
                <strong>{t.titre}.</strong> {t.texte}
              </li>
            ))}
          </ul>

          <h2>{nom} autour de moi : un artisan de votre secteur</h2>
          <p>{trade.autour}</p>

          <h2>Les solutions et matériaux à connaître</h2>
          <dl className="space-y-3">
            {trade.solutions.map((s) => (
              <div key={s.titre}>
                <dt className="font-display text-lg font-bold text-ardoise-800">{s.titre}</dt>
                <dd>{s.texte}</dd>
              </div>
            ))}
          </dl>

          <h2>Le déroulement d'un chantier</h2>
          <ol>
            {trade.etapes.map((e) => (
              <li key={e.titre}>
                <strong>{e.titre}.</strong> {e.texte}
              </li>
            ))}
          </ol>

          <h2>Les questions à poser à l'artisan</h2>
          <ul>
            {trade.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>

          <h2>Règles et garanties à connaître</h2>
          {trade.reglementation.map((r) => (
            <p key={r}>{r}</p>
          ))}
          <p>
            Pour aller plus loin : {trade.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                <a href={s.url} rel="noopener">{s.label}</a>
              </span>
            ))}.
          </p>
        </div>

        {(guides.length > 0 || devis.length > 0) && (
          <>
            <SectionTitle>Guides et devis</SectionTitle>
            <LinkList
              items={[
                ...guides.map((g) => ({ href: g.url, label: getEditorial(g.url)?.titre ?? g.h1 })),
                ...devis.map((d) => ({ href: d.url, label: `Devis ${d.url.split("/")[2].replace(/-/g, " ")}` })),
              ]}
            />
          </>
        )}

        <SectionTitle id="departements">{nom} par département</SectionTitle>
        <p className="mt-3 max-w-[68ch]">
          Chaque page départementale présente votre secteur, ses villes principales et la façon dont nous traitons les demandes. Choisissez le vôtre, ou utilisez le champ « code postal » en haut de page.
        </p>
        <div className="mt-6 space-y-6">
          {grouped.map(([region, items]) => (
            <div key={region}>
              <h3 className="text-lg">{region}</h3>
              <LinkList columns items={items.map((p) => ({ href: p.url, label: `${nom} en ${deptGeo(p.deptCode)?.nom ?? p.deptName} (${p.deptCode})` }))} />
            </div>
          ))}
        </div>

        {regions.length > 0 && (
          <>
            <SectionTitle>{nom} par région</SectionTitle>
            <LinkList items={regions.map((r) => ({ href: r.url, label: r.h1 }))} />
          </>
        )}

        {villes.length > 0 && (
          <>
            <SectionTitle>Les villes les plus recherchées</SectionTitle>
            <LinkList columns items={villes.map((v) => ({ href: v.url, label: `${nom} à ${v.ville}`, note: v.volume > 0 ? `(${nf.format(v.volume)} recherches par mois)` : undefined }))} />
          </>
        )}

        <ArtisanCall trade={metier} tradeNom={nom} />
        <Faq items={trade.faq} />
        <Updated date={CONTENT_UPDATED} />
      </Container>

      <JsonLd data={serviceLd({ name: `${nom} : mise en relation avec un artisan sélectionné`, description: trade.accroche, path: page.url })} />
    </>
  );
}
