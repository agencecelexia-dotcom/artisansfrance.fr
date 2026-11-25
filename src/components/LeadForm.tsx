"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { track } from "@/lib/track";
import { AMPLEUR, BUDGETS, DELAIS, STATUTS, validate, type DemandeResponse, type FieldErrors, type LeadInput, type Option } from "@/lib/form";

export interface TradeOption {
  slug: string;
  nom: string;
  types: string[];
}

interface Props {
  trades: TradeOption[];
  /** Métier présélectionné (page d'un métier). */
  tradeSlug?: string;
  deptCode?: string;
  ville?: string;
  keyword?: string;
  /** Texte « qui vous rappelle et quand », fourni par la configuration. */
  callbackText: string;
  /** Titre court au-dessus du formulaire. */
  title?: string;
  /** Fond clair ou sombre autour de la fiche (jamais de dégradé). */
  className?: string;
}

const TOTAL = 7;

const STEP_TITLES = ["Votre chantier", "Son ampleur", "Où se trouve-t-il ?", "Quand souhaitez-vous commencer ?", "Quel budget envisagez-vous ?", "Quel est votre statut ?", "Vos coordonnées"];

function Tiles({ step }: { step: number }) {
  return (
    <div className="flex gap-1.5" aria-hidden="true">
      {Array.from({ length: TOTAL }, (_, i) => (
        <span
          key={i}
          className={`h-5 flex-1 [clip-path:polygon(0_0,100%_0,100%_58%,50%_100%,0_58%)] transition-colors duration-300 ${
            i < step ? "bg-ardoise-700" : i === step ? "bg-ardoise-400" : "bg-ardoise-100"
          }`}
        />
      ))}
    </div>
  );
}

function Radios({ name, options, value, onChange, error }: { name: string; options: Option[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="grid gap-2" role="radiogroup" aria-describedby={error ? `${name}-err` : undefined}>
      {options.map((o) => (
        <label
          key={o.value}
          className={`flex cursor-pointer items-center gap-3 rounded-ui border px-4 py-3 text-[0.97rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terre-500 ${
            value === o.value ? "border-ardoise-700 bg-ardoise-50 text-ardoise-900" : "border-sable-300 bg-white hover:border-ardoise-300"
          }`}
        >
          <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="size-4 accent-ardoise-700" />
          <span>{o.label}</span>
        </label>
      ))}
      {error && (
        <p id={`${name}-err`} className="text-sm font-medium text-terre-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-ardoise-800">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-sm font-medium text-terre-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = "w-full rounded-ui border border-sable-300 bg-white px-3 py-2.5 text-base text-anthracite placeholder:text-texte-doux/70 focus:border-ardoise-700";

export default function LeadForm({ trades, tradeSlug, deptCode, ville, keyword, callbackText, title = "Décrivez votre chantier", className = "" }: Props) {
  const pathname = usePathname();
  const uid = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<DemandeResponse | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [data, setData] = useState<Partial<LeadInput>>({ trade: tradeSlug ?? "", travaux: "", partenaires: false, website: "" });

  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const trade = trades.find((t) => t.slug === data.trade);

  // Après chaque changement d'étape, le focus passe au titre : lecteurs d'écran et clavier suivent le parcours.
  useEffect(() => {
    if (step > 0 || done) headingRef.current?.focus();
  }, [step, done]);

  function next() {
    const e = validate(data, step + 1);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step === 0) track("formulaire_debut", { page: pathname, trade: data.trade });
      track("formulaire_etape", { page: pathname, step: step + 2, trade: data.trade });
      setStep((s) => Math.min(s + 1, TOTAL - 1));
    }
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const firstStep = [1, 2, 3, 4, 5, 6, 7].find((n) => Object.keys(validate(data, n)).length > 0);
      if (firstStep && firstStep !== TOTAL) setStep(firstStep - 1);
      return;
    }
    setSending(true);
    setFailure(null);
    try {
      const payload: Partial<LeadInput> = { ...data, source: { url: pathname, keyword, deptCode, ville } };
      const res = await fetch("/api/demande/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json()) as DemandeResponse;
      if (res.ok && json.ok) {
        track("formulaire_envoi", { page: pathname, trade: data.trade });
        setDone(json);
      }
      else {
        if (json.errors) setErrors(json.errors);
        setFailure(json.message ?? "Votre demande n'a pas pu être envoyée. Réessayez dans un instant.");
      }
    } catch {
      setFailure("La connexion a échoué. Vérifiez votre réseau et réessayez : vos réponses sont conservées.");
    } finally {
      setSending(false);
    }
  }

  const shell = `rounded-ui bg-white text-anthracite ${className}`;

  if (done) {
    return (
      <div className={shell} id="demande">
        <div className="border-b border-sable-200 p-5">
          <Tiles step={TOTAL} />
        </div>
        <div className="p-5 sm:p-6">
          <h2 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
            Votre demande est enregistrée
          </h2>
          <p className="mt-3">{done.message}</p>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[0.97rem]">
            <li>Qui vous rappelle : un conseiller Celexia, {callbackText}.</li>
            <li>
              Ensuite : {done.mode === "couverte" ? "un artisan sélectionné de votre secteur peut vous contacter pour visiter et chiffrer" : "si un artisan sélectionné est disponible dans votre secteur, il pourra vous contacter ; sinon, nous vous le dirons et garderons votre demande en attente"}. Vous restez libre de refuser.
            </li>
            <li>
              Pour comprendre notre méthode, lisez <Link href="/comment-ca-marche/" className="underline underline-offset-4">comment ça marche</Link>.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={shell} id="demande" noValidate aria-labelledby={`${uid}-titre`}>
      <div className="border-b border-sable-200 p-5">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <p id={`${uid}-titre`} className="font-display text-lg font-extrabold text-ardoise-800">
            {title}
          </p>
          <p className="text-sm text-texte-doux" aria-live="polite">
            Étape {step + 1} sur {TOTAL}
          </p>
        </div>
        <Tiles step={step} />
      </div>

      <div className="p-5 sm:p-6">
        <h2 ref={headingRef} tabIndex={-1} className="mb-4 text-xl outline-none">
          {STEP_TITLES[step]}
        </h2>

        {step === 0 && (
          <fieldset className="space-y-4">
            <legend className="sr-only">Métier et type de travaux</legend>
            <Field id={`${uid}-trade`} label="Métier" error={errors.trade}>
              <select
                id={`${uid}-trade`}
                className={inputClass}
                value={data.trade ?? ""}
                onChange={(e) => {
                  set("trade", e.target.value);
                  set("travaux", "");
                }}
                aria-describedby={errors.trade ? `${uid}-trade-err` : undefined}
              >
                <option value="">Choisir un métier</option>
                {trades.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.nom}
                  </option>
                ))}
              </select>
            </Field>
            {trade && (
              <Field id={`${uid}-travaux`} label="Type de travaux" error={errors.travaux}>
                <select id={`${uid}-travaux`} className={inputClass} value={data.travaux ?? ""} onChange={(e) => set("travaux", e.target.value)} aria-describedby={errors.travaux ? `${uid}-travaux-err` : undefined}>
                  <option value="">Choisir</option>
                  {trade.types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="sr-only">Ampleur du chantier</legend>
            <Radios name="ampleur" options={AMPLEUR} value={data.ampleur ?? ""} onChange={(v) => set("ampleur", v)} error={errors.ampleur} />
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="sr-only">Code postal du chantier</legend>
            <Field id={`${uid}-cp`} label="Code postal du chantier" error={errors.codePostal}>
              <input
                id={`${uid}-cp`}
                className={inputClass}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                value={data.codePostal ?? ""}
                onChange={(e) => set("codePostal", e.target.value.replace(/\D/g, ""))}
                aria-describedby={errors.codePostal ? `${uid}-cp-err` : undefined}
              />
            </Field>
            <p className="mt-2 text-sm text-texte-doux">Il nous sert à chercher un artisan de votre secteur.</p>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="sr-only">Délai souhaité</legend>
            <Radios name="delai" options={DELAIS} value={data.delai ?? ""} onChange={(v) => set("delai", v)} error={errors.delai} />
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="sr-only">Budget envisagé</legend>
            <Radios name="budget" options={BUDGETS} value={data.budget ?? ""} onChange={(v) => set("budget", v)} error={errors.budget} />
          </fieldset>
        )}

        {step === 5 && (
          <fieldset>
            <legend className="sr-only">Statut</legend>
            <Radios name="statut" options={STATUTS} value={data.statut ?? ""} onChange={(v) => set("statut", v)} error={errors.statut} />
          </fieldset>
        )}

        {step === 6 && (
          <fieldset className="space-y-4">
            <legend className="sr-only">Coordonnées</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id={`${uid}-prenom`} label="Prénom" error={errors.prenom}>
                <input id={`${uid}-prenom`} className={inputClass} autoComplete="given-name" value={data.prenom ?? ""} onChange={(e) => set("prenom", e.target.value)} aria-describedby={errors.prenom ? `${uid}-prenom-err` : undefined} />
              </Field>
              <Field id={`${uid}-nom`} label="Nom" error={errors.nom}>
                <input id={`${uid}-nom`} className={inputClass} autoComplete="family-name" value={data.nom ?? ""} onChange={(e) => set("nom", e.target.value)} aria-describedby={errors.nom ? `${uid}-nom-err` : undefined} />
              </Field>
            </div>
            <Field id={`${uid}-tel`} label="Téléphone" error={errors.telephone}>
              <input id={`${uid}-tel`} className={inputClass} type="tel" inputMode="tel" autoComplete="tel" value={data.telephone ?? ""} onChange={(e) => set("telephone", e.target.value)} aria-describedby={errors.telephone ? `${uid}-tel-err` : undefined} />
            </Field>
            <Field id={`${uid}-email`} label="Adresse e-mail" error={errors.email}>
              <input id={`${uid}-email`} className={inputClass} type="email" autoComplete="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
            </Field>

            {/* Champ piège : invisible pour les personnes, rempli par les robots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Ne pas remplir
                <input tabIndex={-1} autoComplete="off" value={data.website ?? ""} onChange={(e) => set("website", e.target.value)} />
              </label>
            </div>

            <div className="rounded-ui bg-sable-100 p-4 text-sm leading-relaxed">
              <p>
                <strong>Qui vous rappelle :</strong> un conseiller Celexia, {callbackText}. Artisans France est un service de Celexia, rémunérée par l'artisan uniquement si votre chantier est signé. Le service est gratuit pour vous.
              </p>
              <label className="mt-3 flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={!!data.partenaires} onChange={(e) => set("partenaires", e.target.checked)} className="mt-1 size-4 accent-ardoise-700" aria-describedby={errors.partenaires ? `${uid}-part-err` : undefined} />
                <span>
                  J'accepte que ma demande et mes coordonnées soient transmises à un ou plusieurs artisans partenaires sélectionnés pour me proposer un devis. Je peux m'y opposer à tout moment. <Link href="/partenaires/" className="underline underline-offset-4">Voir la liste des partenaires</Link>.
                </span>
              </label>
              {errors.partenaires && (
                <p id={`${uid}-part-err`} className="mt-2 font-medium text-terre-700" role="alert">
                  {errors.partenaires}
                </p>
              )}
              <p className="mt-3">
                Vos données servent à étudier votre demande. Détails et droits d'accès, de rectification et d'opposition : <Link href="/politique-de-confidentialite/" className="underline underline-offset-4">politique de confidentialité</Link>.
              </p>
            </div>

            {failure && (
              <p className="rounded-ui border border-terre-200 bg-terre-50 p-3 text-sm font-medium text-terre-700" role="alert">
                {failure}
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="rounded-ui px-3 py-2 text-sm font-semibold text-ardoise-700 underline underline-offset-4">
              Retour
            </button>
          ) : (
            <span />
          )}
          {step < TOTAL - 1 ? (
            <button type="button" onClick={next} className="rounded-ui bg-terre-500 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-terre-600">
              Continuer
            </button>
          ) : (
            <button type="submit" disabled={sending} className="rounded-ui bg-terre-500 px-6 py-3 text-base font-bold text-white transition-colors hover:bg-terre-600 disabled:opacity-60">
              {sending ? "Envoi en cours" : "Envoyer ma demande"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
