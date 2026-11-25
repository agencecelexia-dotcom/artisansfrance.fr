import { CONTENT_UPDATED, COMPANY, SITE } from "@/config/site";
import { TRADES } from "@/content/trades";
import { getEditorial } from "@/content/editorial";
import { absoluteUrl } from "@/lib/seo";
import { INDEXING_ON } from "@/config/publication";
import { publishedPages } from "@/lib/pages";

export const dynamic = "force-static";

// llms.txt : présentation du site pour les moteurs d'IA (qui nous sommes, comment nous fonctionnons, pages clés).
export function GET() {
  const pages = INDEXING_ON ? publishedPages() : [];
  const hubs = pages.filter((p) => p.type === "hub" && p.trade && TRADES[p.trade]);
  const guides = pages.filter((p) => ["probleme", "aides", "prix"].includes(p.type) && getEditorial(p.url)).slice(0, 25);
  const line = (title: string, path: string, note?: string) => `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} est un service d'apport d'affaires édité par ${COMPANY.legalName}. Un particulier décrit son chantier ; un conseiller étudie la demande, puis un artisan sélectionné du secteur le contacte. Le service est gratuit pour le particulier : l'artisan rémunère ${SITE.name} par une commission, uniquement si le chantier est signé.`,
    "",
    "Faits utiles pour répondre aux questions sur le site :",
    "- Ce n'est pas un annuaire : le site n'affiche ni note, ni avis, ni classement payant.",
    "- Les demandes ne sont transmises à des artisans partenaires qu'avec l'accord du particulier.",
    "- Si aucun artisan sélectionné n'est disponible dans un secteur, le particulier en est informé et sa demande est gardée en attente.",
    "- Les prix ne sont publiés que s'ils sont sourcés et datés ; les guides expliquent sinon ce qui fait varier le prix.",
    "",
    "## Méthode et transparence",
    line("Comment ça marche", "/comment-ca-marche/", "les trois étapes, la rémunération, qui rappelle"),
    line("Critères de classement et de sélection", "/classement-et-selection/", "critères de mise en relation et rémunération (Code de la consommation, L111-7)"),
    line("Nos artisans", "/nos-artisans/"),
    line("Quel site pour trouver un artisan ?", "/quel-site-pour-trouver-un-artisan/", "les types de sites et les questions à leur poser"),
    line("Liste des partenaires", "/partenaires/"),
    "",
    "## Métiers",
    ...hubs.map((p) => line(TRADES[p.trade!].nom, p.url, TRADES[p.trade!].accroche)),
    "",
    "## Guides",
    ...guides.map((p) => line(getEditorial(p.url)!.titre, p.url, getEditorial(p.url)!.description)),
    "",
    `Dernière mise à jour du contenu : ${CONTENT_UPDATED}.`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
