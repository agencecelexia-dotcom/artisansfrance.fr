import Link from "next/link";
import Logo from "./Logo";
import { TRADES } from "@/content/trades";
import { publishedTrades } from "@/lib/pages";
import { COMPANY } from "@/config/site";

/** Métiers mis en avant dans la barre ; les autres sont dans le menu « Tous les métiers ». */
const FEATURED = ["couvreur", "macon", "facade-ravalement"];

export default function Header() {
  const trades = publishedTrades().map((p) => p.trade).filter((t): t is string => !!t && !!TRADES[t]);
  const featured = FEATURED.filter((t) => trades.includes(t));
  const others = trades.filter((t) => !featured.includes(t));

  return (
    <header className="no-print sticky top-0 z-30 border-b border-sable-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Artisans France, accueil">
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {featured.map((t) => (
            <Link key={t} href={`/${t}/`} className="whitespace-nowrap rounded-ui px-3 py-2 text-[0.95rem] font-semibold text-ardoise-800 hover:bg-ardoise-50">
              {TRADES[t].nom}
            </Link>
          ))}
          <details className="relative">
            <summary className="cursor-pointer list-none whitespace-nowrap rounded-ui px-3 py-2 text-[0.95rem] font-semibold text-ardoise-800 hover:bg-ardoise-50 [&::-webkit-details-marker]:hidden">Tous les métiers</summary>
            <ul className="absolute right-0 mt-2 grid w-72 gap-0.5 rounded-ui border border-sable-200 bg-white p-2 shadow-sm">
              {trades.map((t) => (
                <li key={t}>
                  <Link href={`/${t}/`} className="block rounded-ui px-3 py-1.5 text-[0.95rem] hover:bg-ardoise-50">
                    {TRADES[t].nom}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <Link href="/comment-ca-marche/" className="whitespace-nowrap rounded-ui px-3 py-2 text-[0.95rem] font-semibold text-ardoise-800 hover:bg-ardoise-50">
            Comment ça marche
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {COMPANY.phone && (
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hidden rounded-ui px-3 py-2 font-semibold text-ardoise-800 hover:bg-ardoise-50 sm:block">
              {COMPANY.phone}
            </a>
          )}
          <Link href="/#demande" className="hidden whitespace-nowrap rounded-ui bg-terre-500 px-4 py-2.5 text-[0.95rem] font-bold text-white transition-colors hover:bg-terre-600 sm:block">
            Décrire mon chantier
          </Link>
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-ui border border-sable-300 px-3 py-2 text-sm font-semibold text-ardoise-800 [&::-webkit-details-marker]:hidden">Menu</summary>
            <div className="absolute right-0 mt-2 w-72 rounded-ui border border-sable-200 bg-white p-3 shadow-sm">
              <ul className="grid gap-0.5">
                {[...featured, ...others].map((t) => (
                  <li key={t}>
                    <Link href={`/${t}/`} className="block rounded-ui px-3 py-1.5 hover:bg-ardoise-50">
                      {TRADES[t].nom}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/comment-ca-marche/" className="block rounded-ui px-3 py-1.5 font-semibold hover:bg-ardoise-50">
                    Comment ça marche
                  </Link>
                </li>
                <li>
                  <Link href="/artisans/" className="block rounded-ui px-3 py-1.5 font-semibold hover:bg-ardoise-50">
                    Vous êtes artisan ?
                  </Link>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
