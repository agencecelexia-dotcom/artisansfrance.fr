import TextPage, { textMetadata } from "@/components/TextPage";
import { LinkList } from "@/components/Ui";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { publishedPages } from "@/lib/pages";

const DESC = "Toutes les pages d'Artisans France : métiers, départements, villes, guides, devis et informations pratiques.";

export const metadata = textMetadata({ title: "Plan du site", description: DESC, path: "/plan-du-site/" });

export default function Page() {
  const pages = publishedPages();
  const of = (...types: string[]) => pages.filter((p) => types.includes(p.type));
  const hubs = of("hub").filter((p) => p.trade && TRADES[p.trade]);
  return (
    <TextPage title="Plan du site" path="/plan-du-site/" lead="Toutes les pages publiées, classées par rubrique.">
      <h2>Informations</h2>
      <LinkList
        items={[
          { href: "/comment-ca-marche/", label: "Comment ça marche" },
          { href: "/classement-et-selection/", label: "Critères de classement et de sélection" },
          { href: "/nos-artisans/", label: "Nos artisans" },
          { href: "/quel-site-pour-trouver-un-artisan/", label: "Quel site pour trouver un artisan ?" },
          { href: "/artisans/", label: "Espace artisans" },
          { href: "/partenaires/", label: "Liste des partenaires" },
          { href: "/zones/", label: "Zones couvertes" },
        ]}
      />
      <h2>Métiers</h2>
      <LinkList items={hubs.map((p) => ({ href: p.url, label: TRADES[p.trade!].nom }))} />
      {hubs.map((hub) => {
        const items = of("dept", "region", "ville", "devis").filter((p) => p.trade === hub.trade);
        if (items.length === 0) return null;
        return (
          <section key={hub.url}>
            <h3>{TRADES[hub.trade!].nom} par zone</h3>
            <LinkList columns items={items.map((p) => ({ href: p.url, label: p.type === "devis" ? `Devis ${p.url.split("/")[2].replace(/-/g, " ")}` : p.h1 }))} />
          </section>
        );
      })}
      {of("prix", "probleme", "aides").length > 0 && (
        <>
          <h2>Guides</h2>
          <LinkList items={of("prix", "probleme", "aides").filter((p) => getEditorial(p.url)).map((p) => ({ href: p.url, label: getEditorial(p.url)!.titre }))} />
        </>
      )}
      <h2>Mentions et règles</h2>
      <LinkList
        items={[
          { href: "/mentions-legales/", label: "Mentions légales" },
          { href: "/cgu/", label: "Conditions d'utilisation" },
          { href: "/politique-de-confidentialite/", label: "Politique de confidentialité" },
        ]}
      />
    </TextPage>
  );
}
