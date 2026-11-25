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
  // Départements proposés : un sous-ensemble des plus recherchés, différent d'une page à l'autre selon l'URL.
  const seed = [...url].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const pool = deptPages(page.trade).filter((p) => p.volume > 0).sort((a, b) => b.volume - a.volume).slice(0, 24);
  const top = pool.map((p, i) => ({ p, k: (seed ^ (i * 2654435761)) >>> 0 })).sort((a, b) => a.k - b.k).slice(0, 6).map((x) => x.p);
  const explicit = (content.liens ?? []).map((u) => ({ u, page: getPublished(u) })).filter((x) => x.page);
  // Maillage : liens choisis à la main, puis les trois pages suivantes du même métier dans l'ordre alphabétique (cyclique),
  // ce qui garantit à chaque guide au moins trois liens entrants, puis les plus recherchés pour compléter.
  const all = guidesOf(page.trade, ["prix", "probleme", "aides", "blog"]).filter((g) => getEditorial(g.url));
  const ring = [...all].sort((a, b) => a.url.localeCompare(b.url));
  const at = ring.findIndex((g) => g.url === url);
  const cyc = at >= 0 ? [1, 2, 3].map((n) => ring[(at + n) % ring.length]).filter((g) => g && g.url !== url) : [];
  const auto = [...cyc, ...all]
    .filter((g, i, arr) => g.url !== url && !explicit.some((e) => e.u === g.url) && arr.findIndex((x) => x.url === g.url) === i)
    .slice(0, Math.max(3, 6 - explicit.length))
    .map((g) => ({ u: g.url, page: g }));
  const liens = [...explicit, ...auto];
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
        facts={heroFacts().slice(0, 1)}
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
