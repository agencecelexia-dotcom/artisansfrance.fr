import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Hero, SectionTitle, LinkList, ArtisanCall, heroFacts, Updated } from "./Ui";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import { LeadFormBlock } from "./FormBlocks";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { deptGeo, deptPages, getPublished, guidesOf, robotsFor } from "@/lib/pages";
import { articleLd, buildMetadata } from "@/lib/seo";

export function editorialMetadata(url: string): Metadata {
  const page = getPublished(url);
  const content = getEditorial(url);
  if (!page || !content) return {};
  return buildMetadata({ title: content.titre, description: content.description, path: url, index: robotsFor(page).index });
}

/** Guide éditorial : réponse directe en tête, détail, sources officielles, liens vers le hub, le devis et les départements. */
export default function EditorialView({ url }: { url: string }) {
  const page = getPublished(url);
  const content = getEditorial(url);
  if (!page || !content || !page.trade) notFound();
  const trade = TRADES[page.trade];
  const top = deptPages(page.trade)
    .filter((p) => p.volume > 0)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 10);
  const liens = (content.liens ?? []).map((u) => ({ u, page: getPublished(u) })).filter((x) => x.page);
  const devis = guidesOf(page.trade, ["devis"]).slice(0, 3);

  return (
    <>
      <Hero
        crumbs={[
          { name: trade.nom, path: `/${page.trade}/` },
          { name: content.titre, path: url },
        ]}
        h1={content.titre}
        lead={content.reponse}
        facts={heroFacts().slice(0, 2)}
        aside={<LeadFormBlock tradeSlug={page.trade} keyword={page.keyword ?? undefined} />}
      />

      <Container className="py-12">
        <article className="texte max-w-[68ch]">
          {content.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.paragraphs?.map((t) => <p key={t}>{t}</p>)}
              {s.list && (s.ordered ? <ol>{s.list.map((t) => <li key={t}>{t}</li>)}</ol> : <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>)}
            </section>
          ))}
          <h2>Sources et textes officiels</h2>
          <ul>
            {content.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener">{s.label}</a>
              </li>
            ))}
          </ul>
        </article>

        {liens.length > 0 && (
          <>
            <SectionTitle>À lire aussi</SectionTitle>
            <LinkList items={liens.map((l) => ({ href: l.u, label: getEditorial(l.u)?.titre ?? l.page!.h1 }))} />
          </>
        )}

        <SectionTitle>Un artisan près de chez vous</SectionTitle>
        <p className="mt-3 max-w-[68ch]">
          Pour obtenir un prix ou un avis fiable, il faut une visite. Choisissez votre département pour voir comment nous traitons les demandes de votre secteur.
        </p>
        <LinkList columns items={top.map((p) => ({ href: p.url, label: `${trade.nom} en ${deptGeo(p.deptCode)?.nom ?? p.deptName} (${p.deptCode})` }))} />
        <LinkList items={[{ href: `/${page.trade}/`, label: `Tout savoir sur le métier de ${trade.nom.toLowerCase()}` }, ...devis.map((d) => ({ href: d.url, label: `Devis ${d.url.split("/")[2].replace(/-/g, " ")}` }))]} />

        <ArtisanCall trade={page.trade} tradeNom={trade.nom} />
        <Faq items={content.faq} />
        <Updated date={content.maj} />
      </Container>

      <JsonLd data={articleLd({ headline: content.titre, description: content.description, path: url, updated: content.maj })} />
    </>
  );
}
