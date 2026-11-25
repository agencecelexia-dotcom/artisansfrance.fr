import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Hero, SectionTitle, LinkList, ArtisanCall, DataPoint, Seasonality, evolution, heroFacts, nf, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { LeadFormBlock } from "@/components/FormBlocks";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { CONTENT_UPDATED, COVERED_DEPARTMENTS, callbackText } from "@/config/site";
import { communeLocal, communeOfPage, deptGeo, geo, getPublished, guidesOf, local as localData, neighbourCities, nearestPublishedCities, pagesOfType, robotsFor } from "@/lib/pages";
import { buildMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOfType("ville").map((p) => ({ metier: p.trade!, dept: p.deptSlug!, ville: p.villeSlug! }));
}

type Props = { params: Promise<{ metier: string; dept: string; ville: string }> };

/** Métiers pour lesquels les risques liés au sol et au terrain comptent vraiment dans le chantier. */
const SOL = new Set(["macon", "terrassement", "extension-maison", "assainissement", "pisciniste", "terrasse"]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metier, dept, ville } = await params;
  const page = getPublished(`/${metier}/${dept}/${ville}/`);
  const trade = TRADES[metier];
  if (!page || !trade) return {};
  const commune = communeOfPage(page);
  return buildMetadata({
    title: `${trade.nom} à ${page.ville} : devis gratuit`,
    description: `${trade.nom} à ${page.ville}${commune?.population ? ` (${nf.format(commune.population)} habitants)` : ""} : décrivez votre chantier, un conseiller Celexia l'étudie et un artisan sélectionné vous contacte. Gratuit pour vous.`,
    path: page.url,
    index: robotsFor(page).index,
  });
}

export default async function VillePage({ params }: Props) {
  const { metier, dept, ville } = await params;
  const page = getPublished(`/${metier}/${dept}/${ville}/`);
  const trade = TRADES[metier];
  if (!page || !trade || !page.ville) notFound();

  const commune = communeOfPage(page);
  const g = deptGeo(page.deptCode);
  const stats = communeLocal(commune?.code);
  const deptPage = getPublished(`/${metier}/${page.deptSlug}/`);
  const nom = trade.nom;
  const lower = nom.toLowerCase();
  const covered = !!page.deptCode && COVERED_DEPARTMENTS.includes(page.deptCode);
  const voisinesPubliees = new Map(neighbourCities(page).map((c) => [geo.villes[c.url], c]));
  const autresVilles = nearestPublishedCities(page, 6);
  const guides = guidesOf(metier, ["probleme", "prix"]).slice(0, 3);
  const devis = guidesOf(metier, ["devis"]).slice(0, 2);
  const deptName = g?.nom ?? page.deptName ?? "";

  const faq = [
    {
      q: `Comment trouver ${trade.un} à ${page.ville} ?`,
      a: `Décrivez votre chantier : un conseiller Celexia l'étudie et vous rappelle ${callbackText()}. ${covered ? `Un artisan sélectionné de ${deptName} peut ensuite vous contacter.` : `Si aucun artisan sélectionné n'est disponible autour de ${page.ville}, nous vous le disons honnêtement et gardons votre demande en attente.`}`,
    },
    {
      q: `Faut-il une autorisation à ${page.ville} ?`,
      a: `Les règles d'urbanisme sont fixées par chaque commune : plan local d'urbanisme, secteurs protégés, avis éventuel de l'architecte des bâtiments de France. Le service urbanisme de la mairie de ${page.ville} vous dit si votre projet nécessite une déclaration préalable ou un permis.`,
    },
  ];

  return (
    <>
      <Hero
        crumbs={[
          { name: nom, path: `/${metier}/` },
          ...(deptPage ? [{ name: `${deptName} (${page.deptCode})`, path: deptPage.url }] : []),
          { name: page.ville, path: page.url },
        ]}
        h1={page.h1}
        lead={`Vous cherchez ${trade.un} à ${page.ville} ? Décrivez votre chantier : un conseiller Celexia l'étudie, puis un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer.`}
        facts={heroFacts().slice(0, 2)}
        aside={<LeadFormBlock tradeSlug={metier} deptCode={page.deptCode ?? undefined} ville={page.ville} keyword={page.keyword ?? undefined} />}
      />

      <Container className="py-12">
        <section aria-labelledby="commune">
          <h2 id="commune" className="text-2xl">
            {page.ville} en quelques chiffres
          </h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commune?.population != null && <DataPoint label="Habitants" value={nf.format(commune.population)} note="Population municipale (Etalab)" />}
            {commune?.population != null && commune.surfaceKm2 ? <DataPoint label="Densité" value={`${nf.format(Math.round(commune.population / commune.surfaceKm2))} hab./km²`} note={`${nf.format(Math.round(commune.surfaceKm2 * 10) / 10)} km²`} /> : null}
            {commune && commune.codesPostaux.length > 0 && <DataPoint label={commune.codesPostaux.length > 1 ? "Codes postaux" : "Code postal"} value={commune.codesPostaux.slice(0, 3).join(", ")} />}
            <DataPoint label="Département" value={deptPage ? <Link href={deptPage.url} className="underline decoration-ardoise-200 underline-offset-4">{deptName} ({page.deptCode})</Link> : `${deptName} (${page.deptCode})`} />
          </dl>
          {commune?.population != null && commune.rang ? (
            <p className="mt-6 max-w-[68ch]">
              {page.ville} est la {commune.rang === 1 ? "première" : `${commune.rang}e`} commune de {deptName} par sa population
              {commune.partDept ? `, avec ${commune.partDept.toLocaleString("fr-FR")} % des habitants du département` : ""}
              {g && commune.surfaceKm2 ? `. Sa densité de ${nf.format(Math.round(commune.population / commune.surfaceKm2))} habitants au km² se compare à ${nf.format(Math.round(g.population / Math.max(1, g.surfaceKm2)))} pour l'ensemble du département` : ""}.
            </p>
          ) : null}
          {stats?.ventesMaisons != null && (
            <p className="mt-4 max-w-[68ch]">
              À {page.ville}, {nf.format(stats.ventesMaisons)} ventes de maisons ont été enregistrées en {localData.dvfYear}
              {stats.ventesAppartements != null ? `, contre ${nf.format(stats.ventesAppartements)} ventes d'appartements` : ""}
              {stats.precedent ? ` ; c'est ${evolution(stats.ventesMaisons, stats.precedent.ventesMaisons)} pour les maisons par rapport à ${localData.dvfYear - 1} (${nf.format(stats.precedent.ventesMaisons)} ventes)` : ""}.
              {stats.prixMaisonM2 ? ` Le prix médian d'une maison vendue, terrain compris, ressort à environ ${nf.format(stats.prixMaisonM2)} € par m² de surface bâtie.` : " L'échantillon est trop petit pour publier un prix médian fiable."}
              {stats.surfaceBatieMediane ? ` La surface bâtie médiane des maisons vendues est de ${nf.format(stats.surfaceBatieMediane)} m².` : ""} Ces données décrivent le marché immobilier de la commune, pas le prix de travaux de {lower}. Source : DVF, DGFiP (data.gouv.fr).
            </p>
          )}
        </section>

        {stats?.risques && stats.risques.length > 0 && (
          <section aria-labelledby="risques" className="mt-12 max-w-[68ch]">
            <h2 id="risques" className="text-2xl">
              Risques recensés à {page.ville}
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              {stats.risques.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-3">
              {SOL.has(metier)
                ? "Pour un chantier qui touche aux fondations ou au terrain, ces risques peuvent justifier une étude de sol ou des prescriptions particulières. Votre artisan et votre mairie vous renseignent."
                : "Ces informations sont données à titre de repère sur la commune ; elles ne remplacent pas la visite de l'artisan."}{" "}
            </p>
            <p className="text-sm text-texte-doux">Source : base GASPAR, Géorisques (ministère de la Transition écologique).</p>
          </section>
        )}

        <Seasonality page={page} subject={`${trade.un} à ${page.ville}`} />

        {commune && commune.voisines.length > 0 && (
          <section aria-labelledby="voisines" className="mt-12">
            <h2 id="voisines" className="text-2xl">
              Communes autour de {page.ville}
            </h2>
            <p className="mt-3 max-w-[68ch]">Un artisan de {deptName} intervient souvent sur plusieurs communes voisines. Voici les plus proches de {page.ville}, avec leur distance à vol d'oiseau.</p>
            <ul className="mt-4 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {commune.voisines.map((v) => {
                const p = voisinesPubliees.get(v.code);
                return (
                  <li key={v.code} className="flex items-baseline justify-between gap-4 border-b border-sable-200 py-1.5">
                    {p ? (
                      <Link href={p.url} className="font-medium text-ardoise-700 underline decoration-ardoise-200 underline-offset-4 hover:decoration-ardoise-700">
                        {nom} à {v.nom}
                      </Link>
                    ) : (
                      <span>{v.nom}</span>
                    )}
                    <span className="text-sm text-texte-doux">
                      {nf.format(v.population)} hab., {v.km} km
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {autresVilles.length > 0 && (
          <>
            <SectionTitle>Villes proches de {page.ville}</SectionTitle>
            <LinkList items={autresVilles.map((c) => ({ href: c.page.url, label: `${nom} à ${c.page.ville}`, note: `à ${c.km} km` }))} />
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

        <ArtisanCall trade={metier} tradeNom={nom} zone={`à ${page.ville}`} />
        <Faq items={faq} title={`Questions sur les travaux à ${page.ville}`} />
        <Updated date={CONTENT_UPDATED} />
      </Container>

      <JsonLd data={serviceLd({ name: `${nom} à ${page.ville}`, description: `Mise en relation avec un artisan sélectionné pour des travaux de ${lower} à ${page.ville}.`, path: page.url, areaServed: [{ type: "City", name: page.ville }] })} />
    </>
  );
}
