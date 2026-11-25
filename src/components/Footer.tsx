import Link from "next/link";
import Logo from "./Logo";
import { TRADES } from "@/content/trades";
import { publishedTrades } from "@/lib/pages";
import { COMPANY } from "@/config/site";

export default function Footer() {
  const trades = publishedTrades().map((p) => p.trade).filter((t): t is string => !!t && !!TRADES[t]);
  return (
    <footer className="no-print sur-ardoise ecailles mt-24 text-ardoise-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo onDark />
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed">
              Décrivez votre chantier : un conseiller Celexia l'étudie, puis un artisan sélectionné de votre secteur vous contacte. Gratuit pour vous : nous sommes rémunérés par l'artisan, uniquement si votre chantier est signé.
            </p>
          </div>

          <nav aria-label="Métiers">
            <p className="font-display text-base font-bold text-white">Métiers</p>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              {trades.map((t) => (
                <li key={t}>
                  <Link href={`/${t}/`} className="underline-offset-4 hover:text-white hover:underline">
                    {TRADES[t].nom}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Confiance et méthode">
            <p className="font-display text-base font-bold text-white">Confiance</p>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              <li>
                <Link href="/comment-ca-marche/" className="underline-offset-4 hover:text-white hover:underline">
                  Comment ça marche
                </Link>
              </li>
              {/* Obligation de transparence des plateformes (Code de la consommation, L111-7) : visible sur toutes les pages. */}
              <li>
                <Link href="/classement-et-selection/" className="underline-offset-4 hover:text-white hover:underline">
                  Critères de classement et de sélection
                </Link>
              </li>
              <li>
                <Link href="/nos-artisans/" className="underline-offset-4 hover:text-white hover:underline">
                  Nos artisans
                </Link>
              </li>
              <li>
                <Link href="/quel-site-pour-trouver-un-artisan/" className="underline-offset-4 hover:text-white hover:underline">
                  Quel site pour trouver un artisan ?
                </Link>
              </li>
              <li>
                <Link href="/zones/" className="underline-offset-4 hover:text-white hover:underline">
                  Zones couvertes
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Artisans et informations légales">
            <p className="font-display text-base font-bold text-white">Artisans et légal</p>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              <li>
                <Link href="/artisans/" className="underline-offset-4 hover:text-white hover:underline">
                  Vous êtes artisan ?
                </Link>
              </li>
              <li>
                <Link href="/partenaires/" className="underline-offset-4 hover:text-white hover:underline">
                  Liste des partenaires
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales/" className="underline-offset-4 hover:text-white hover:underline">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/cgu/" className="underline-offset-4 hover:text-white hover:underline">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite/" className="underline-offset-4 hover:text-white hover:underline">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/plan-du-site/" className="underline-offset-4 hover:text-white hover:underline">
                  Plan du site
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-white/15 pt-6 text-sm">
          Artisans France est un service de {COMPANY.legalName}. Apport d'affaires BTP : nous ne réalisons pas les travaux, nous mettons en relation avec des artisans sélectionnés.
        </p>
      </div>
    </footer>
  );
}
