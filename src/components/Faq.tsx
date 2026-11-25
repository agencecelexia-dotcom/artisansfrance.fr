import JsonLd from "./JsonLd";
import { faqLd } from "@/lib/seo";
import type { Faq as FaqItem } from "@/content/types";

/** Questions en <details> : lisibles sans JavaScript, et le même contenu alimente le FAQPage. */
export default function Faq({ items, title = "Questions fréquentes" }: { items: FaqItem[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="faq-titre" className="mt-14">
      <h2 id="faq-titre" className="text-2xl sm:text-3xl">
        {title}
      </h2>
      <div className="mt-5 divide-y divide-sable-200 border-y border-sable-200">
        {items.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-bold text-ardoise-800 [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="mt-1 text-ardoise-400 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[68ch] text-[1.02rem]">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </section>
  );
}
