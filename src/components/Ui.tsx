import Link from "next/link";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import { OPS, callbackText, confirmedChecks, hasConfirmedChecks } from "@/config/site";
import { deptGeo, type PlanPage } from "@/lib/pages";

export const nf = new Intl.NumberFormat("fr-FR");
const monthFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
const monthShort = new Intl.DateTimeFormat("fr-FR", { month: "short" });

export const frDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

/** Les trois à quatre preuves affichées sous le titre : uniquement ce qui est vrai et confirmé. */
export function heroFacts(): string[] {
  const facts = ["Gratuit pour vous : nous sommes rémunérés par l'artisan, uniquement si votre chantier est signé", `Un conseiller Celexia vous rappelle ${callbackText()}`];
  if (OPS.artisansPerRequest) facts.push(`Votre demande est transmise à ${OPS.artisansPerRequest} artisan${OPS.artisansPerRequest > 1 ? "s" : ""} au plus`);
  else facts.push("Vous restez libre de refuser les propositions");
  if (hasConfirmedChecks()) facts.push(`Artisans sélectionnés : ${confirmedChecks().map((c) => c.label.toLowerCase()).join(", ")}`);
  return facts;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

interface HeroProps {
  crumbs?: Crumb[];
  h1: string;
  lead: React.ReactNode;
  facts?: string[];
  below?: React.ReactNode;
  aside?: React.ReactNode;
}

/** Bande d'ouverture : motif d'écailles d'ardoise, titre à gauche, fiche de chantier à droite. */
export function Hero({ crumbs, h1, lead, facts, below, aside }: HeroProps) {
  return (
    <section className="sur-ardoise ecailles text-white">
      <Container className={`grid gap-10 py-10 sm:py-14 ${aside ? "lg:grid-cols-[1.05fr_0.95fr] lg:items-start" : ""}`}>
        <div>
          {crumbs && <Breadcrumbs items={crumbs} onDark />}
          <h1 className={`${crumbs ? "mt-5" : ""} max-w-[26ch] text-[2.1rem] font-extrabold leading-[1.08] text-white sm:text-5xl`}>{h1}</h1>
          <div className="mt-5 max-w-[58ch] text-lg leading-relaxed text-ardoise-100">{lead}</div>
          {facts && (
            <ul className="mt-6 space-y-2 text-[0.97rem] text-white">
              {facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <svg viewBox="0 0 20 20" className="mt-1 size-4 shrink-0 text-sable-200" aria-hidden="true">
                    <path d="m4 10.5 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}
          {below && <div className="mt-7 max-w-xl rounded-ui bg-white p-4 text-anthracite">{below}</div>}
        </div>
        {aside && <div>{aside}</div>}
      </Container>
    </section>
  );
}

/** Une donnée réelle avec sa source : le bloc qui rend une page locale unique. */
export function DataPoint({ label, value, note }: { label: string; value: React.ReactNode; note?: string }) {
  return (
    <div className="border-l-2 border-ardoise-200 pl-4">
      <dt className="text-sm text-texte-doux">{label}</dt>
      <dd className="mt-0.5 font-display text-2xl font-extrabold text-ardoise-800">{value}</dd>
      {note && <p className="mt-0.5 text-sm text-texte-doux">{note}</p>}
    </div>
  );
}

/** Saisonnalité : recherches Google des 12 derniers mois pour le mot-clé principal de la page. */
export function Seasonality({ page, subject }: { page: PlanPage; subject: string }) {
  if (!page.monthly || !page.monthlyEnd) return null;
  const [y, m] = page.monthlyEnd.split("-").map(Number);
  const labels = page.monthly.map((_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - (11 - i), 1));
    return { short: monthShort.format(d).replace(".", ""), long: monthFmt.format(d) };
  });
  const max = Math.max(...page.monthly);
  const peak = page.monthly.indexOf(max);
  return (
    <section aria-labelledby="saison" className="mt-12">
      <h2 id="saison" className="text-2xl">
        Quand cherche-t-on {subject} ?
      </h2>
      <p className="mt-3 max-w-[68ch]">
        Les recherches Google de « {page.keyword} » varient au fil de l'année. Sur les douze derniers mois, le mois le plus actif est {labels[peak].long}. Une demande déposée tôt laisse plus de choix de dates aux artisans.
      </p>
      <ol className="mt-5 flex h-36 items-end gap-1.5 sm:gap-2" role="img" aria-label={`Recherches mensuelles de ${page.keyword}, de ${labels[0].long} à ${labels[11].long} : de ${nf.format(Math.min(...page.monthly))} à ${nf.format(max)} par mois, avec un pic en ${labels[peak].long}.`}>
        {page.monthly.map((v, i) => (
          <li key={i} className="flex h-full flex-1 flex-col justify-end gap-1.5 text-center">
            <span className={`block w-full rounded-t-sm ${i === peak ? "bg-ardoise-700" : "bg-ardoise-200"}`} style={{ height: `${Math.max(6, Math.round((v / max) * 100))}%` }} />
            <span className="text-[0.7rem] leading-none text-texte-doux" aria-hidden="true">
              {labels[i].short}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-texte-doux">Source : volumes de recherche Google France (DataForSEO), moyennes mensuelles arrondies, jusqu'à {monthFmt.format(new Date(Date.UTC(y, m - 1, 1)))}.</p>
    </section>
  );
}

export function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 text-2xl sm:text-[1.75rem]">
      {children}
    </h2>
  );
}

/** Liste de liens vers d'autres pages (maillage). Les textes d'ancre viennent de l'appelant. */
export function LinkList({ items, columns = false }: { items: { href: string; label: string; note?: string }[]; columns?: boolean }) {
  if (items.length === 0) return null;
  return (
    <ul className={`mt-4 gap-x-8 gap-y-1.5 ${columns ? "sm:columns-2 lg:columns-3" : "grid sm:grid-cols-2"}`}>
      {items.map((i) => (
        <li key={i.href} className="break-inside-avoid">
          <Link href={i.href} className="font-medium text-ardoise-700 underline decoration-ardoise-200 underline-offset-4 hover:decoration-ardoise-700">
            {i.label}
          </Link>
          {i.note && <span className="text-texte-doux"> {i.note}</span>}
        </li>
      ))}
    </ul>
  );
}

/** Bandeau « vous êtes artisan ? » : les pages locales servent aussi au recrutement. */
export function ArtisanCall({ trade, tradeNom, zone }: { trade: string; tradeNom: string; zone?: string }) {
  return (
    <aside className="mt-12 rounded-ui border border-ardoise-200 bg-ardoise-50 p-6">
      <h2 className="text-xl">{zone ? `Vous êtes ${tradeNom.toLowerCase()} ${zone} ?` : `Vous êtes ${tradeNom.toLowerCase()} ?`}</h2>
      <p className="mt-2 max-w-[62ch]">
        Nous recevons des demandes de chantiers de particuliers et les confions à des artisans sélectionnés. Le modèle est l'apport d'affaires : vous nous rémunérez par une commission, uniquement si le chantier est signé.
      </p>
      <Link href={`/artisans/${trade}/`} className="mt-4 inline-block rounded-ui bg-ardoise-700 px-5 py-2.5 font-bold text-white hover:bg-ardoise-800">
        Recevoir des demandes de chantiers
      </Link>
    </aside>
  );
}

/** Départements d'une région, utilisés pour grouper la liste des départements d'un hub. */
export function groupByRegion(pages: PlanPage[]) {
  const groups = new Map<string, PlanPage[]>();
  for (const p of pages) {
    const region = deptGeo(p.deptCode)?.region ?? "Autres territoires";
    groups.set(region, [...(groups.get(region) ?? []), p]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b, "fr"));
}

export function Updated({ date }: { date: string }) {
  return <p className="mt-8 text-sm text-texte-doux">Dernière vérification du contenu : {frDate(date)}.</p>;
}

/** « en hausse de 8 % », « stable », « en baisse de 3 % » : décrit l'évolution sans la dramatiser. */
export function evolution(now: number, before: number): string {
  if (before <= 0) return "";
  const pct = Math.round(((now - before) / before) * 100);
  if (Math.abs(pct) < 2) return "un niveau stable";
  return pct > 0 ? `une hausse de ${pct} %` : `une baisse de ${Math.abs(pct)} %`;
}
