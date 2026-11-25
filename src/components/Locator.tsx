"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { resolveLocation, type LocatorData } from "@/lib/postal";

/**
 * « {Métier} autour de moi » : le visiteur saisit son code postal ou autorise sa position, et arrive sur la page
 * de sa ville (si publiée), sinon de son département. La position n'est lue qu'au clic et n'est jamais stockée.
 */
export default function Locator({ data, className = "" }: { data: LocatorData; className?: string }) {
  const router = useRouter();
  const id = useId();
  const [cp, setCp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function go(code: string) {
    const target = resolveLocation(code, data);
    if (target) {
      router.push(target.url);
      return true;
    }
    setMessage(`Nous n'avons pas encore de page pour ce secteur. Décrivez votre chantier : nous l'étudions et vous disons honnêtement si un artisan est disponible.`);
    return false;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!/^\d{5}$/.test(cp)) {
      setMessage("Saisissez un code postal à 5 chiffres.");
      return;
    }
    go(cp);
  }

  function locate() {
    setMessage(null);
    if (!("geolocation" in navigator)) {
      setMessage("Votre navigateur ne permet pas la localisation. Saisissez votre code postal.");
      return;
    }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(`https://geo.api.gouv.fr/communes?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&fields=codesPostaux&limit=1`);
          const [commune] = (await res.json()) as { codesPostaux?: string[] }[];
          const code = commune?.codesPostaux?.[0];
          if (code) {
            setCp(code);
            go(code);
          } else setMessage("Nous n'avons pas pu déterminer votre commune. Saisissez votre code postal.");
        } catch {
          setMessage("La localisation a échoué. Saisissez votre code postal.");
        } finally {
          setBusy(false);
        }
      },
      () => {
        setBusy(false);
        setMessage("Localisation refusée ou indisponible. Saisissez votre code postal.");
      },
      { timeout: 10000 },
    );
  }

  return (
    <div className={className}>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end" noValidate>
        <div className="flex-1">
          <label htmlFor={`${id}-cp`} className="mb-1 block text-sm font-semibold text-ardoise-800">
            Votre code postal
          </label>
          <input
            id={`${id}-cp`}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            value={cp}
            onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-ui border border-sable-300 bg-white px-3 py-2.5 text-base text-anthracite"
            aria-describedby={message ? `${id}-msg` : undefined}
          />
        </div>
        <button type="submit" className="rounded-ui bg-ardoise-700 px-5 py-3 font-bold text-white transition-colors hover:bg-ardoise-800">
          Voir {data.tradeLabel} près de chez moi
        </button>
        <button type="button" onClick={locate} disabled={busy} className="rounded-ui border border-ardoise-300 bg-white px-4 py-3 text-sm font-semibold text-ardoise-700 hover:border-ardoise-700 disabled:opacity-60">
          {busy ? "Localisation…" : "Utiliser ma position"}
        </button>
      </form>
      {message && (
        <p id={`${id}-msg`} className="mt-3 text-sm font-medium text-terre-700" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
