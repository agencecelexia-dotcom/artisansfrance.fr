import Link from "next/link";
import TextPage, { textMetadata } from "@/components/TextPage";
import { LinkList, groupByRegion } from "@/components/Ui";
import { TRADES } from "@/content/trades";
import { deptGeo, deptPages, pagesOfType, regionPages } from "@/lib/pages";

const DESC = "Tous les départements et régions pour lesquels Artisans France étudie des demandes de chantiers, par métier.";

export const metadata = textMetadata({ title: "Zones couvertes", description: DESC, path: "/zones/" });

export default function Page() {
  const trades = pagesOfType("hub").filter((p) => p.trade && TRADES[p.trade]);
  return (
    <TextPage title="Zones couvertes" path="/zones/" lead="Nous étudions les demandes partout en France. Choisissez votre métier, puis votre département.">
      {trades.map((p) => {
        const depts = deptPages(p.trade!);
        if (depts.length === 0) return null;
        const regions = regionPages(p.trade!);
        return (
          <section key={p.trade}>
            <h2>
              <Link href={p.url}>{TRADES[p.trade!].nom}</Link>
            </h2>
            {groupByRegion(depts).map(([region, items]) => (
              <div key={region}>
                <h3>{region}</h3>
                <LinkList columns items={items.map((d) => ({ href: d.url, label: `${deptGeo(d.deptCode)?.nom ?? d.deptName} (${d.deptCode})` }))} />
              </div>
            ))}
            {regions.length > 0 && <LinkList items={regions.map((r) => ({ href: r.url, label: r.h1 }))} />}
          </section>
        );
      })}
      <p>
        Votre département n'apparaît pas ? Décrivez quand même votre chantier depuis la <Link href="/#demande">page d'accueil</Link> : nous vous disons honnêtement si un artisan est disponible dans votre secteur.
      </p>
    </TextPage>
  );
}
