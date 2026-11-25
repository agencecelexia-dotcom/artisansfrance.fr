import Link from "next/link";
import { Container, LinkList } from "@/components/Ui";
import { TRADES } from "@/content/trades";
import { pagesOfType } from "@/lib/pages";

export const metadata = { title: "Page introuvable", robots: { index: false, follow: true } };

export default function NotFound() {
  const hubs = pagesOfType("hub").filter((p) => p.trade && TRADES[p.trade]);
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-extrabold">Cette page n'existe pas ou n'est pas encore ouverte</h1>
      <p className="mt-4 max-w-[60ch] text-lg">
        Nous ouvrons les pages métier par métier et département par département, au rythme des artisans sélectionnés. Si vous cherchiez un secteur précis, vous pouvez quand même <Link href="/#demande" className="font-semibold text-ardoise-700 underline underline-offset-4">décrire votre chantier</Link> : nous vous disons honnêtement si un artisan est disponible près de chez vous.
      </p>
      <h2 className="mt-10 text-2xl">Les métiers</h2>
      <LinkList columns items={hubs.map((p) => ({ href: p.url, label: TRADES[p.trade!].nom }))} />
    </Container>
  );
}
