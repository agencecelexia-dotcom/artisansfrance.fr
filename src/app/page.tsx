import type { Metadata } from "next";
import Link from "next/link";
import { Container, Hero, LinkList, heroFacts, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import { LeadFormBlock } from "@/components/FormBlocks";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { CONTENT_UPDATED, callbackText } from "@/config/site";
import { deptGeo, pagesOfType, publishedPages } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { INDEXING_ON } from "@/config/publication";

export const metadata: Metadata = buildMetadata({
  title: "Artisans France : un artisan sélectionné pour votre chantier",
  description: "Décrivez votre chantier en deux minutes : un conseiller étudie votre demande et vous met en relation avec un artisan sélectionné près de chez vous. Gratuit pour vous.",
  path: "/",
  index: INDEXING_ON,
  absoluteTitle: true,
});

const FAQ = [
  { q: "Comment fonctionne Artisans France ?", a: "Vous décrivez votre chantier en quelques minutes. Un conseiller Celexia étudie votre demande et vous rappelle pour la préciser. Si un artisan sélectionné est disponible dans votre secteur, il vous contacte pour visiter et chiffrer. Vous restez libre de refuser." },
  { q: "Le service est-il vraiment gratuit ?", a: "Oui, pour vous. Nous sommes rémunérés par l'artisan, sous forme de commission, uniquement si votre chantier est signé. Si vous ne signez pas, personne ne nous paie." },
  { q: "Qui me rappelle, et quand ?", a: `Un conseiller Celexia, ${callbackText()}. Nous vous précisons au rappel si un artisan est disponible dans votre secteur.` },
  { q: "Que devient ma demande si aucun artisan n'est disponible près de chez moi ?", a: "Nous vous le disons honnêtement. Votre demande est gardée en attente et nous cherchons un artisan adapté dans votre secteur. Nous ne promettons ni délai ni artisan que nous n'avons pas." },
  { q: "Mes coordonnées sont-elles revendues ?", a: "Non. Elles ne sont transmises qu'avec votre accord, à des artisans partenaires sélectionnés, dont la liste est publique. Vous pouvez vous y opposer à tout moment. Détails dans la politique de confidentialité." },
  { q: "Êtes-vous un annuaire ?", a: "Non. Nous n'affichons ni liste d'artisans à comparer ni note : nous étudions votre demande et choisissons avec vous l'artisan à qui la confier. Le principe est expliqué sur la page « Critères de classement et de sélection »." },
];

export default function HomePage() {
  const trades = pagesOfType("hub").filter((p) => p.trade && TRADES[p.trade]);
  const departements = pagesOfType("dept").sort((a, b) => b.volume - a.volume).slice(0, 12);
  const devisPages = pagesOfType("devis").sort((a, b) => b.volume - a.volume);
  const guides = publishedPages()
    .filter((p) => ["probleme", "aides", "prix"].includes(p.type) && getEditorial(p.url))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 6);

  return (
    <>
      <Hero
        h1="Trouvez le bon artisan pour votre chantier, sans démarchage"
        lead="Décrivez votre chantier en deux minutes. Un conseiller l'étudie, puis un artisan sélectionné de votre secteur vous contacte pour visiter et chiffrer."
        facts={heroFacts()}
        aside={<LeadFormBlock />}
      />

      <Container className="py-14">
        <section aria-labelledby="etapes">
          <h2 id="etapes" className="text-3xl">
            Comment ça marche
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              { t: "Vous décrivez votre chantier", d: "Travaux, ampleur, code postal, délai, budget : deux minutes, sans engagement." },
              { t: "Nous l'étudions et vous rappelons", d: `Un conseiller Celexia vous rappelle ${callbackText()} pour préciser le projet.` },
              { t: "Un artisan sélectionné vous contacte", d: "Il visite et chiffre. Vous comparez et vous restez libre de dire non." },
            ].map((s, i) => (
              <li key={s.t} className="relative border-t-2 border-ardoise-700 pt-5">
                <span className="font-display text-sm font-bold text-ardoise-500">Étape {i + 1}</span>
                <h3 className="mt-1 text-xl">{s.t}</h3>
                <p className="mt-2">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="gratuit" className="mt-20 grid gap-8 rounded-ui bg-sable-100 p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
          <h2 id="gratuit" className="text-3xl">
            Pourquoi c'est gratuit pour vous
          </h2>
          <div className="space-y-4 text-lg">
            <p>Nous sommes rémunérés par l'artisan, uniquement si votre chantier est signé. Notre intérêt est donc le même que le vôtre : un bon chantier signé, pas un contact vendu à des dizaines d'entreprises.</p>
            <p>
              Nous n'affichons ni note, ni avis, ni classement payant. <Link href="/classement-et-selection/" className="font-semibold text-ardoise-700 underline underline-offset-4">Lire nos critères de classement et de sélection</Link>.
            </p>
          </div>
        </section>

        <section aria-labelledby="metiers" className="mt-20">
          <h2 id="metiers" className="text-3xl">
            Les métiers que nous traitons
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((p) => {
              const t = TRADES[p.trade!];
              return (
                <li key={p.url} className="border-t border-sable-300 pt-4">
                  <Link href={p.url} className="font-display text-xl font-bold text-ardoise-800 hover:text-ardoise-600">
                    {t.nom}
                  </Link>
                  <p className="mt-1 text-[0.95rem] text-texte-doux">{t.travaux.slice(0, 3).map((w) => w.titre.toLowerCase()).join(", ")}.</p>
                </li>
              );
            })}
          </ul>
        </section>

        {departements.length > 0 && (
          <section aria-labelledby="zones" className="mt-20">
            <h2 id="zones" className="text-3xl">
              Où nous étudions vos demandes
            </h2>
            <p className="mt-3 max-w-[68ch]">
              Partout en France. Nous ouvrons les départements au rythme des artisans sélectionnés ; si aucun n'est disponible près de chez vous, nous vous le disons. Les départements les plus consultés :
            </p>
            <LinkList columns items={departements.map((p) => ({ href: p.url, label: `${TRADES[p.trade!].nom} en ${deptGeo(p.deptCode)?.nom ?? p.deptName} (${p.deptCode})` }))} />
            <p className="mt-4">
              <Link href="/zones/" className="font-semibold text-ardoise-700 underline underline-offset-4">
                Voir tous les départements
              </Link>
            </p>
          </section>
        )}

        {guides.length > 0 && (
          <section aria-labelledby="guides" className="mt-20">
            <h2 id="guides" className="text-3xl">
              Guides pour préparer votre chantier
            </h2>
            <LinkList items={guides.map((g) => ({ href: g.url, label: getEditorial(g.url)!.titre }))} />
          </section>
        )}

        {devisPages.length > 0 && (
          <section aria-labelledby="devis" className="mt-20">
            <h2 id="devis" className="text-3xl">
              Demander un devis
            </h2>
            <p className="mt-3 max-w-[68ch]">Vous savez déjà quel chantier vous voulez faire ? Passez directement par la page devis du bon métier : le formulaire s'y ouvre en premier.</p>
            <LinkList columns items={devisPages.map((p) => ({ href: p.url, label: `Devis ${p.url.split("/")[2].replace(/-/g, " ")}` }))} />
          </section>
        )}

        <section aria-labelledby="artisans" className="mt-20 rounded-ui border border-ardoise-200 bg-ardoise-50 p-8">
          <h2 id="artisans" className="text-2xl">
            Vous êtes artisan ?
          </h2>
          <p className="mt-2 max-w-[62ch]">Recevez des demandes de chantiers de particuliers dans votre département. Modèle d'apport d'affaires : une commission, uniquement si le chantier est signé.</p>
          <Link href="/artisans/" className="mt-4 inline-block rounded-ui bg-ardoise-700 px-5 py-2.5 font-bold text-white hover:bg-ardoise-800">
            Découvrir l'espace artisans
          </Link>
        </section>

        <Faq items={FAQ} />
        <Updated date={CONTENT_UPDATED} />
      </Container>
    </>
  );
}

