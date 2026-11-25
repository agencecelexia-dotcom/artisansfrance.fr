import Link from "next/link";
import { Container, Hero, LinkList, Updated } from "@/components/Ui";
import Faq from "@/components/Faq";
import ArtisanForm from "@/components/ArtisanForm";
import JsonLd from "@/components/JsonLd";
import { textMetadata } from "@/components/TextPage";
import { TRADES } from "@/content/trades";
import { COMPANY, CONTENT_UPDATED } from "@/config/site";
import { pagesOfType } from "@/lib/pages";
import { serviceLd } from "@/lib/seo";

const DESC = "Apport d'affaires BTP : recevez des demandes de chantiers de particuliers dans votre département. Une commission, uniquement si le chantier est signé.";

export const metadata = textMetadata({ title: "Artisans : recevez des demandes de chantiers", description: DESC, path: "/artisans/" });

const FAQ = [
  { q: "Combien cela coûte-t-il ?", a: "Il n'y a pas de frais pour recevoir des demandes. Vous nous versez une commission, uniquement si le chantier est signé. Les conditions sont écrites dans le contrat d'apport d'affaires, que vous signez avant de recevoir les coordonnées d'un client." },
  { q: "Combien de demandes vais-je recevoir ?", a: "Nous ne promettons aucun volume : il dépend des demandes de particuliers dans votre secteur. Nous vous indiquons honnêtement s'il y en a, avant que vous vous engagiez." },
  { q: "Les demandes sont-elles exclusives ?", a: "Nous ne promettons pas d'exclusivité, ni à vous ni aux clients. Le nombre d'artisans qui reçoivent une demande est publié dans nos critères de sélection." },
  { q: "Quelles garanties demandez-vous ?", a: "Une activité déclarée, une assurance en cours de validité pour les travaux concernés et des devis écrits et détaillés. Nous précisons dans nos critères de sélection les vérifications effectivement réalisées." },
];

export default function Page() {
  const trades = pagesOfType("hub").filter((p) => p.trade && TRADES[p.trade]);
  return (
    <>
      <Hero
        crumbs={[{ name: "Artisans", path: "/artisans/" }]}
        h1="Recevez des demandes de chantiers dans votre département"
        lead="Des particuliers nous confient leurs chantiers. Nous les étudions, puis nous les confions à des artisans sélectionnés. Apport d'affaires BTP : une commission, uniquement si le chantier est signé."
        facts={["Pas de frais pour recevoir des demandes", "Aucune promesse de volume ni d'exclusivité", "Contrat d'apport d'affaires signé avant toute transmission"]}
        aside={<ArtisanForm trades={trades.map((p) => ({ slug: p.trade!, nom: TRADES[p.trade!].nom }))} fallbackEmail={!process.env.LEADS_WEBHOOK_URL && process.env.NODE_ENV === "production" ? COMPANY.contactEmail ?? undefined : undefined} />}
      />
      <Container className="py-12">
        <div className="texte max-w-[68ch]">
          <h2>Comment ça se passe pour vous</h2>
          <ol>
            <li><strong>Vous nous indiquez</strong> votre métier et les départements où vous intervenez.</li>
            <li><strong>Nous vous rappelons</strong> pour vérifier votre activité, vos assurances et vos zones.</li>
            <li><strong>Vous signez le contrat d'apport d'affaires</strong> : conditions, commission, respect des clients.</li>
            <li><strong>Vous recevez des demandes</strong> de chantiers étudiées par un conseiller Celexia, avec l'accord du client.</li>
            <li><strong>Vous nous versez la commission</strong> prévue au contrat, uniquement si le chantier est signé.</li>
          </ol>
          <h2>Pourquoi les pages de zones nous aident à recruter</h2>
          <p>
            Chaque demande qui nous arrive d'un secteur sans artisan sélectionné nous sert de point de départ : nous cherchons alors un artisan de ce secteur avec un vrai chantier à lui proposer. Si vous intervenez dans un secteur où des demandes existent, vous le saurez dès notre premier échange.
          </p>
        </div>

        <h2 className="mt-12 text-2xl">Les métiers que nous recherchons</h2>
        <LinkList columns items={trades.map((p) => ({ href: `/artisans/${p.trade}/`, label: `${TRADES[p.trade!].nom} : recevoir des demandes` }))} />
        <p className="mt-6">
          Particulier ? Retrouvez <Link href="/comment-ca-marche/" className="font-semibold text-ardoise-700 underline underline-offset-4">comment fonctionne Artisans France</Link>.
        </p>
        <Faq items={FAQ} />
        <Updated date={CONTENT_UPDATED} />
      </Container>
      <JsonLd data={serviceLd({ name: "Apport d'affaires BTP pour les artisans", description: DESC, path: "/artisans/" })} />
    </>
  );
}
