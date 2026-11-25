import LeadForm, { type TradeOption } from "./LeadForm";
import Locator from "./Locator";
import { callbackText } from "@/config/site";
import { TRADES } from "@/content/trades";
import { cityPages, deptPages, geo, communeOfPage, publishedTrades } from "@/lib/pages";
import type { LocatorData } from "@/lib/postal";

/** Options du formulaire : les métiers dont le hub est publié. */
export function tradeOptions(): TradeOption[] {
  return publishedTrades()
    .map((p) => p.trade)
    .filter((t): t is string => !!t && !!TRADES[t])
    .map((slug) => ({ slug, nom: TRADES[slug].nom, types: TRADES[slug].typesTravaux }));
}

interface FormProps {
  tradeSlug?: string;
  deptCode?: string;
  ville?: string;
  keyword?: string;
  title?: string;
  className?: string;
}

/** Formulaire de demande avec ses valeurs de configuration (rappel, métiers). */
export function LeadFormBlock(props: FormProps) {
  return <LeadForm trades={tradeOptions()} callbackText={callbackText()} {...props} />;
}

/** Données du Locator d'un métier : codes postaux des villes publiées et départements publiés. */
export function locatorData(trade: string): LocatorData {
  const cities: Record<string, string> = {};
  for (const p of cityPages(trade)) {
    const c = communeOfPage(p);
    for (const cp of c?.codesPostaux ?? []) cities[cp] ??= p.url;
  }
  const depts: Record<string, string> = {};
  for (const p of deptPages(trade)) if (p.deptCode) depts[p.deptCode] = p.url;
  void geo;
  return { trade, tradeLabel: TRADES[trade]?.nom.toLowerCase() ?? trade, cities, depts };
}

export function LocatorBlock({ trade, className }: { trade: string; className?: string }) {
  return <Locator data={locatorData(trade)} className={className} />;
}
