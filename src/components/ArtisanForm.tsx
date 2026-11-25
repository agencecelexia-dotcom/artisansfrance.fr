"use client";

import { useId, useState } from "react";
import Link from "next/link";

interface Props {
  trades: { slug: string; nom: string }[];
  tradeSlug?: string;
  /** Tant que le webhook n'est pas branché : la candidature part depuis la messagerie du visiteur. */
  fallbackEmail?: string;
}

const input = "w-full rounded-ui border border-sable-300 bg-white px-3 py-2.5 text-base text-anthracite";

/** Candidature d'un artisan : envoyée au même webhook que les demandes, avec le type « candidature ». */
export default function ArtisanForm({ trades, tradeSlug, fallbackEmail }: Props) {
  const uid = useId();
  const [data, setData] = useState({ entreprise: "", siren: "", trade: tradeSlug ?? "", departements: "", prenom: "", nom: "", telephone: "", email: "", message: "", accord: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const set = (k: keyof typeof data, v: string | boolean) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (fallbackEmail) {
      const missing: Record<string, string> = {};
      if (!data.entreprise.trim()) missing.entreprise = "Indiquez le nom de l'entreprise.";
      if (!/^\d{9}$/.test(data.siren.replace(/\s/g, ""))) missing.siren = "Le SIREN comporte 9 chiffres.";
      if (!data.trade) missing.trade = "Choisissez un métier.";
      if (!data.departements.trim()) missing.departements = "Indiquez les départements où vous intervenez.";
      if (!data.prenom.trim() || !data.nom.trim()) missing.nom = "Indiquez votre prénom et votre nom.";
      if (!data.telephone.trim()) missing.telephone = "Indiquez un numéro de téléphone.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) missing.email = "Saisissez une adresse e-mail valide.";
      if (!data.accord) missing.accord = "Cochez la case pour que nous puissions vous recontacter.";
      setErrors(missing);
      if (Object.keys(missing).length > 0) return;
      const body = [`Entreprise : ${data.entreprise}`, `SIREN : ${data.siren}`, `Métier : ${trades.find((t) => t.slug === data.trade)?.nom ?? data.trade}`, `Départements : ${data.departements}`, `Contact : ${data.prenom} ${data.nom}, ${data.telephone}, ${data.email}`, data.message ? `Message : ${data.message}` : ""].filter(Boolean).join("\n");
      window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent("Candidature artisan : " + data.entreprise)}&body=${encodeURIComponent(body)}`;
      setState("done");
      setMessage("Votre messagerie s'est ouverte avec votre candidature : envoyez le message pour que nous la recevions.");
      return;
    }
    setState("sending");
    setMessage(null);
    try {
      const res = await fetch("/api/candidature/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { ok: boolean; message?: string; errors?: Record<string, string> };
      if (res.ok && json.ok) {
        setState("done");
        setMessage(json.message ?? null);
        return;
      }
      setErrors(json.errors ?? {});
      setMessage(json.message ?? "L'envoi a échoué.");
    } catch {
      setMessage("La connexion a échoué. Réessayez dans un instant.");
    }
    setState("idle");
  }

  if (state === "done")
    return (
      <div className="rounded-ui bg-white p-6 text-anthracite" id="candidature">
        <h2 className="text-2xl">Candidature reçue</h2>
        <p className="mt-3">{message}</p>
      </div>
    );

  const field = (k: keyof typeof data, label: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className="mb-1 block text-sm font-semibold text-ardoise-800">
        {label}
      </label>
      <input id={`${uid}-${k}`} className={input} value={String(data[k])} onChange={(e) => set(k, e.target.value)} aria-describedby={errors[k] ? `${uid}-${k}-err` : undefined} {...extra} />
      {errors[k] && (
        <p id={`${uid}-${k}-err`} className="mt-1 text-sm font-medium text-terre-700" role="alert">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate id="candidature" className="space-y-4 rounded-ui bg-white p-5 text-anthracite sm:p-6">
      <h2 className="text-2xl">Recevoir des demandes de chantiers</h2>
      {field("entreprise", "Nom de l'entreprise", { autoComplete: "organization" })}
      {field("siren", "SIREN (9 chiffres)", { inputMode: "numeric", maxLength: 11 })}
      <div>
        <label htmlFor={`${uid}-trade`} className="mb-1 block text-sm font-semibold text-ardoise-800">
          Métier
        </label>
        <select id={`${uid}-trade`} className={input} value={data.trade} onChange={(e) => set("trade", e.target.value)}>
          <option value="">Choisir un métier</option>
          {trades.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.nom}
            </option>
          ))}
        </select>
        {errors.trade && <p className="mt-1 text-sm font-medium text-terre-700" role="alert">{errors.trade}</p>}
      </div>
      {field("departements", "Départements où vous intervenez")}
      <div className="grid gap-4 sm:grid-cols-2">
        {field("prenom", "Prénom", { autoComplete: "given-name" })}
        {field("nom", "Nom", { autoComplete: "family-name" })}
      </div>
      {field("telephone", "Téléphone", { type: "tel", autoComplete: "tel" })}
      {field("email", "Adresse e-mail", { type: "email", autoComplete: "email" })}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input type="checkbox" checked={data.accord} onChange={(e) => set("accord", e.target.checked)} className="mt-1 size-4 accent-ardoise-700" />
        <span>
          J'accepte d'être recontacté par Celexia au sujet de cette candidature. Détails dans la <Link href="/politique-de-confidentialite/" className="underline underline-offset-4">politique de confidentialité</Link>.
        </span>
      </label>
      {errors.accord && <p className="text-sm font-medium text-terre-700" role="alert">{errors.accord}</p>}
      {message && state === "idle" && <p className="rounded-ui border border-terre-200 bg-terre-50 p-3 text-sm font-medium text-terre-700" role="alert">{message}</p>}
      <button type="submit" disabled={state === "sending"} className="rounded-ui bg-terre-500 px-6 py-3 font-bold text-white hover:bg-terre-600 disabled:opacity-60">
        {state === "sending" ? "Envoi en cours" : "Envoyer ma candidature"}
      </button>
    </form>
  );
}
