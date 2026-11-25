"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { COMPANY } from "@/config/site";

/** Mobile : « Décrire mon chantier » reste accessible en bas d'écran ; le numéro est cliquable dès qu'il existe. */
export default function StickyCta() {
  const router = useRouter();

  function go(e: React.MouseEvent) {
    e.preventDefault();
    const target = document.getElementById("demande");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.querySelector<HTMLElement>("select, input, button")?.focus({ preventScroll: true });
    } else router.push("/#demande");
  }

  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-sable-200 bg-white p-3 md:hidden">
      <Link href="/#demande" onClick={go} className="flex-1 rounded-ui bg-terre-500 px-4 py-3 text-center text-base font-bold text-white">
        Décrire mon chantier
      </Link>
      {COMPANY.phone && (
        <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="rounded-ui border border-ardoise-300 px-4 py-3 text-base font-bold text-ardoise-800">
          Appeler
        </a>
      )}
    </div>
  );
}
