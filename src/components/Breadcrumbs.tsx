import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

/** Fil d'Ariane visible et BreadcrumbList : Accueil > Couvreur > Seine-et-Marne (77) > Meaux. */
export default function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  const all = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane" className={`text-sm ${onDark ? "text-ardoise-100" : "text-texte-doux"}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < all.length - 1 ? (
                <Link href={c.path} className="underline-offset-4 hover:underline">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold">
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
