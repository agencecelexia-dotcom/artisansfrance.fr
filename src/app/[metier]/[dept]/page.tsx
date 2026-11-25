import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Hero, SectionTitle, LinkList, ArtisanCall, DataPoint, Seasonality, evolution, heroFacts, nf, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { LeadFormBlock } from "@/components/FormBlocks";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { CONTENT_UPDATED, COVERED_DEPARTMENTS, callbackText } from "@/config/site";
import { cityPages, deptGeo, deptLocal, deptPages, geo, getPublished, local as localData, guidesOf, neighbourDepts, pagesOfType, publishedPages, regionPages, robotsFor, type PlanPage } from "@/lib/pages";
import { buildMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...pagesOfType("dept").map((p) => ({ metier: p.trade!, dept: p.deptSlug! })),
    ...pagesOfType("region").map((p) => ({ metier: p.trade!, dept: p.regionSlug! })),
  ];
}

type Props = { params: Promise<{ metier: string; dept: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metier, dept } = await params;
  const page = getPublished(`/${metier}/${dept}/`);
  const trade = TRADES[metier];
  if (!page || !trade) return {};
  const decision = robotsFor(page);
  if (page.type === "region") {
    return buildMetadata({
      title: `${trade.nom} en ${page.regionName} : devis gratuit`,
      description: `${trade.nom} en ${page.regionName} : décrivez votre chantier, un conseiller Celexia l'étudie et un artisan sélectionné de votre département vous contacte. Gratuit pour vous.`,
      path: page.url,
      index: decision.index,
    });
  }
  const g = deptGeo(page.deptCode);
  return buildMetadata({
    title: `${trade.nom} en ${g?.nom ?? page.deptName} (${page.deptCode}) : devis gratuit`,
    description: `${trade.nom} en ${g?.nom ?? page.deptName} (${page.deptCode}) : décrivez votre chantier, un conseiller Celexia l'étudie et un artisan sélectionné vous contacte. ${g ? `${g.region}, ${nf.format(g.nbCommunes)} communes.` : ""} Gratuit pour vous.`,
    path: page.url,
    index: decision.index,
  });
}

export default async function DeptPage({ params }: Props) {
  const { metier, dept } = await params;
  const page = getPublished(`/${metier}/${dept}/`);
  const trade = TRADES[metier];
  if (!page || !trade) notFound();
  if (page.type === "region") return <RegionView page={page} metier={metier} />;

  const g = deptGeo(page.deptCode);
  if (!g) notFound();
  const local = deptLocal(page.deptCode);
  const nom = trade.nom;
  const lower = nom.toLowerCase();
  const covered = !!page.deptCode && COVERED_DEPARTMENTS.includes(page.deptCode);
  const villes = cityPages(metier, page.deptSlug);
  const villeByCommune = new Map(villes.map((v) => [geo.villes[v.url], v]));
  const voisins = neighbourDepts(metier, page.deptCode!);
  const autresMetiers = publishedPages().filter((p) => p.type === "dept" && p.deptCode === page.deptCode && p.trade !== metier && TRADES[p.trade!]);
  const guides = guidesOf(metier, ["probleme", "prix", "aides"]).slice(0, 6);
  const devis = guidesOf(metier, ["devis"]).slice(0, 2);
  const principales = g.communes.slice(0, 16);
  const partMaisons = local && local.ventesMaisons !== null && local.ventesAppartements !== null ? Math.round((local.ventesMaisons / Math.max(1, local.ventesMaisons + local.ventesAppartements)) * 100) : null;

  const faq = [
    {
      q: `Comment trouver ${trade.un} en ${g.nom} ?`,
      a: `Décrivez votre chantier : un conseiller Celexia l'étudie et vous rappelle ${callbackText()}. ${covered ? `Nous suivons des artisans sélectionnés en ${g.nom} : l'un d'eux peut vous contacter pour visiter et chiffrer.` : `Si aucun artisan sélectionné n'est disponible en ${g.nom}, nous vous le disons honnêtement et gardons votre demande en attente, sans promesse de délai.`}`,
    },
    {
      q: `Faut-il une autorisation pour des travaux en ${g.nom} ?`,
      a: `Cela dépend des travaux et de votre commune : en ${g.nom}, les ${nf.format(g.nbCommunes)} communes fixent chacune leurs règles d'urbanisme. Le service urbanisme de votre mairie vous dit si une déclaration préalable ou un permis est nécessaire, avant la signature du devis.`,
    },
  ];

  return (
    <>
      <Hero
        crumbs={[
          { name: nom, path: `/${metier}/` },
          { name: `${g.nom} (${page.deptCode})`, path: page.url },
        ]}
        h1={page.h1}
        lead={`Vous cherchez ${trade.un} dans le ${page.deptCode}, en ${g.nom} ? Décrivez votre chantier : un conseiller Celexia l'étudie, puis un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer.`}
        facts={heroFacts().slice(0, 2)}
        aside={<LeadFormBlock tradeSlug={metier} deptCode={page.deptCode ?? undefined} keyword={page.keyword ?? undefined} />}
      />

      <Container className="py-12">
        <div className="max-w-[68ch]">
          <h2 className="text-2xl">{covered ? `Notre réseau en ${g.nom}` : `Nos demandes en ${g.nom}`}</h2>
          <p className="mt-3">
            {covered
              ? `Des artisans sélectionnés interviennent en ${g.nom}. Votre demande est étudiée par un conseiller puis, avec votre accord, transmise à l'un d'eux pour une visite et un devis.`
              : `Nous ouvrons les départements au rythme des artisans que nous sélectionnons. Aujourd'hui, nous étudions chaque demande venant de ${g.nom} ; si aucun artisan sélectionné n'est disponible dans votre secteur, nous vous le disons honnêtement au lieu de vous faire attendre sans réponse.`}
          </p>
        </div>

        <section aria-labelledby="secteur" className="mt-12">
          <h2 id="secteur" className="text-2xl">
            {g.nom} en quelques chiffres
          </h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <DataPoint label="Région" value={g.region} />
            <DataPoint label="Communes" value={nf.format(g.nbCommunes)} />
            <DataPoint label="Habitants" value={nf.format(g.population)} note="Population municipale (Etalab)" />
            <DataPoint label="Densité" value={`${nf.format(Math.round(g.population / Math.max(1, g.surfaceKm2)))} hab./km²`} note={`${nf.format(g.surfaceKm2)} km²`} />
          </dl>
          <p className="mt-6 max-w-[68ch]">
            Le département compte {nf.format(g.tranches.moins500)} communes de moins de 500 habitants, {nf.format(g.tranches.de500a2000)} de 500 à 2 000, {nf.format(g.tranches.de2000a10000)} de 2 000 à 10 000 et {nf.format(g.tranches.plus10000)} de plus de 10 000. La plus grande, {g.communes[0]?.nom}, regroupe {nf.format(g.communes[0]?.population ?? 0)} habitants. Un artisan de {g.nom} se déplace donc souvent d'un bourg à l'autre : précisez votre commune dans votre demande.
          </p>
        </section>

        <section aria-labelledby="immobilier" className="mt-12">
          <h2 id="immobilier" className="text-2xl">
            Le parc de maisons en {g.nom}
          </h2>
          {local?.ventesMaisons != null ? (
            <>
              <p className="mt-3 max-w-[68ch]">
                En {localData.dvfYear}, {nf.format(local.ventesMaisons)} ventes de maisons ont été enregistrées en {g.nom}
                {partMaisons !== null ? `, soit environ ${partMaisons} % des ventes de logements` : ""}
                {local.precedent ? `, ${evolution(local.ventesMaisons, local.precedent.ventesMaisons)} par rapport à ${localData.dvfYear - 1} (${nf.format(local.precedent.ventesMaisons)} ventes)` : ""}.
                {local.prixMaisonM2 ? ` Le prix médian d'une maison vendue, terrain compris, ressort à environ ${nf.format(local.prixMaisonM2)} € par m² de surface bâtie.` : ""}
                {local.surfaceBatieMediane ? ` La surface bâtie médiane des maisons vendues est de ${nf.format(local.surfaceBatieMediane)} m².` : ""} Ces chiffres décrivent le marché immobilier, pas le prix de travaux : ils situent le parc de maisons où se concentrent les chantiers de {lower}.
              </p>
              {local.communesActives && local.communesActives.length > 0 && (
                <>
                  <h3 className="mt-6 text-lg">Les communes où l'on vend le plus de maisons</h3>
                  <ol className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                    {local.communesActives.map((c) => (
                      <li key={c.code} className="flex items-baseline justify-between gap-4 border-b border-sable-200 py-1.5">
                        <span>{c.nom}</span>
                        <span className="text-sm text-texte-doux">
                          {nf.format(c.ventes)} ventes{c.prixMaisonM2 ? `, ${nf.format(c.prixMaisonM2)} €/m²` : ""}
                        </span>
                      </li>
                    ))}
                  </ol>
                </>
              )}
              <p className="mt-3 text-sm text-texte-doux">Source : DVF, DGFiP (data.gouv.fr), ventes {localData.dvfYear}. Prix médian calculé sur les ventes d'une seule maison, seulement quand l'échantillon est suffisant.</p>
            </>
          ) : (
            <p className="mt-3 max-w-[68ch] text-texte-doux">Les données de ventes (DVF) ne couvrent pas ce département : la base ne comprend ni l'Alsace-Moselle ni Mayotte.</p>
          )}
        </section>

        <section aria-labelledby="communes" className="mt-12">
          <h2 id="communes" className="text-2xl">
            Les plus grandes communes de {g.nom}
          </h2>
          <ul className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {principales.map((c) => {
              const v = villeByCommune.get(c.code);
              return (
                <li key={c.code} className="flex items-baseline justify-between gap-4 border-b border-sable-200 py-1.5">
                  {v ? (
                    <a href={v.url} className="font-medium text-ardoise-700 underline decoration-ardoise-200 underline-offset-4 hover:decoration-ardoise-700">
                      {nom} à {c.nom}
                    </a>
                  ) : (
                    <span>{c.nom}</span>
                  )}
                  <span className="text-sm text-texte-doux">{nf.format(c.population)} hab.</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-sm text-texte-doux">Population municipale, source : API Découpage administratif (Etalab).</p>
        </section>

        {villes.filter((v) => !principales.some((c) => geo.villes[v.url] === c.code)).length > 0 && (
          <>
            <SectionTitle>Autres villes de {g.nom} avec une page dédiée</SectionTitle>
            <LinkList items={villes.filter((v) => !principales.some((c) => geo.villes[v.url] === c.code)).map((v) => ({ href: v.url, label: `${nom} à ${v.ville}` }))} />
          </>
        )}

        <Seasonality page={page} subject={`${trade.un} dans le ${page.deptCode}`} />

        {voisins.length > 0 && (
          <>
            <SectionTitle>Départements voisins</SectionTitle>
            <LinkList items={voisins.map((v) => ({ href: v.url, label: `${nom} en ${deptGeo(v.deptCode)?.nom ?? v.deptName} (${v.deptCode})` }))} />
          </>
        )}

        {autresMetiers.length > 0 && (
          <>
            <SectionTitle>Autres métiers en {g.nom}</SectionTitle>
            <LinkList items={autresMetiers.map((p) => ({ href: p.url, label: `${TRADES[p.trade!].nom} en ${g.nom}` }))} />
          </>
        )}

        {(guides.length > 0 || devis.length > 0) && (
          <>
            <SectionTitle>Guides et devis</SectionTitle>
            <LinkList
              items={[
                ...guides.map((p) => ({ href: p.url, label: getEditorial(p.url)?.titre ?? p.h1 })),
                ...devis.map((p) => ({ href: p.url, label: `Devis ${p.url.split("/")[2].replace(/-/g, " ")}` })),
              ]}
            />
          </>
        )}

        <ArtisanCall trade={metier} tradeNom={nom} zone={`en ${g.nom}`} />
        <Faq items={faq} title={`Questions sur les travaux en ${g.nom}`} />
        <Updated date={CONTENT_UPDATED} />
      </Container>

      <JsonLd data={serviceLd({ name: `${nom} en ${g.nom}`, description: `Mise en relation avec un artisan sélectionné pour des travaux de ${lower} en ${g.nom}.`, path: page.url, areaServed: [{ type: "AdministrativeArea", name: `${g.nom} (${page.deptCode})` }] })} />
    </>
  );
}

function RegionView({ page, metier }: { page: PlanPage; metier: string }) {
  const trade = TRADES[metier];
  const nom = trade.nom;
  const depts = deptPages(metier).filter((p) => deptGeo(p.deptCode)?.region === page.regionName);
  const regionDepts = Object.values(geo.departements).filter((d) => d.region === page.regionName);
  const population = regionDepts.reduce((s, d) => s + d.population, 0);
  const autres = regionPages(metier).filter((r) => r.url !== page.url);
  return (
    <>
      <Hero
        crumbs={[
          { name: nom, path: `/${metier}/` },
          { name: String(page.regionName), path: page.url },
        ]}
        h1={page.h1}
        lead={`Vous cherchez ${trade.un} en ${page.regionName} ? Décrivez votre chantier : un conseiller Celexia l'étudie, puis un artisan sélectionné de votre département vous contacte.`}
        facts={heroFacts()}
        aside={<LeadFormBlock tradeSlug={metier} keyword={page.keyword ?? undefined} />}
      />
      <Container className="py-12">
        <div className="max-w-[68ch]">
          <p>
            {page.regionName} regroupe {nf.format(regionDepts.length)} départements et {nf.format(population)} habitants (population municipale, source Etalab). Les règles d'urbanisme, les matériaux et le climat varient d'un département à l'autre : choisissez le vôtre pour voir ses villes principales et la façon dont nous traitons les demandes.
          </p>
        </div>
        <SectionTitle>Les départements de {page.regionName}</SectionTitle>
        <LinkList items={depts.map((p) => ({ href: p.url, label: `${nom} en ${deptGeo(p.deptCode)?.nom ?? p.deptName} (${p.deptCode})` }))} />
        <Seasonality page={page} subject={`${trade.un} en ${page.regionName}`} />
        {autres.length > 0 && (
          <>
            <SectionTitle>Autres régions</SectionTitle>
            <LinkList items={autres.map((r) => ({ href: r.url, label: r.h1 }))} />
          </>
        )}
        <ArtisanCall trade={metier} tradeNom={nom} zone={`en ${page.regionName}`} />
        <Faq items={trade.faq.slice(0, 3)} />
        <Updated date={CONTENT_UPDATED} />
      </Container>
      <JsonLd data={serviceLd({ name: `${nom} en ${page.regionName}`, description: trade.accroche, path: page.url, areaServed: [{ type: "AdministrativeArea", name: String(page.regionName) }] })} />
    </>
  );
}
