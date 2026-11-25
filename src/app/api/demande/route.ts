import { NextResponse } from "next/server";
import { COVERED_DEPARTMENTS } from "@/config/site";
import { qualify, validate, type DemandeResponse, type LeadInput } from "@/lib/form";
import { clientKey, forwardToWebhook, rateLimited } from "@/lib/leads";
import { deptFromPostal } from "@/lib/postal";

export const dynamic = "force-dynamic";

const json = (body: DemandeResponse, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (rateLimited(clientKey(req))) return json({ ok: false, message: "Trop d'envois en peu de temps. Patientez une minute puis réessayez." }, 429);

  let input: Partial<LeadInput>;
  try {
    input = (await req.json()) as Partial<LeadInput>;
  } catch {
    return json({ ok: false, message: "La demande est illisible." }, 400);
  }

  // Champ piège rempli : on répond comme si tout allait bien, sans rien transmettre.
  if (input.website) return json({ ok: true, mode: "attente", message: "Nous avons bien reçu votre demande." });

  const errors = validate(input);
  if (Object.keys(errors).length > 0) return json({ ok: false, errors, message: "Certaines réponses sont à corriger." }, 422);

  const lead = input as LeadInput;
  const deptCode = deptFromPostal(lead.codePostal.trim());
  const covered = !!deptCode && COVERED_DEPARTMENTS.includes(deptCode);
  const qualification = qualify(lead);

  const result = await forwardToWebhook("demande", {
    trade: lead.trade,
    travaux: lead.travaux,
    ampleur: lead.ampleur,
    codePostal: lead.codePostal.trim(),
    deptCode,
    delai: lead.delai,
    budget: lead.budget,
    statut: lead.statut,
    contact: { prenom: lead.prenom.trim(), nom: lead.nom.trim(), telephone: lead.telephone.trim(), email: lead.email.trim().toLowerCase() },
    consentement: { transmissionPartenaires: true, recueilliLe: new Date().toISOString() },
    source: { url: String(lead.source?.url ?? "").slice(0, 300), keyword: lead.source?.keyword ?? null, deptCode: lead.source?.deptCode ?? null, ville: lead.source?.ville ?? null },
    qualification,
    couvert: covered,
  });

  if (!result.ok) {
    const message =
      result.reason === "not-configured"
        ? "Le service de réception des demandes n'est pas encore en service : votre demande n'a pas été enregistrée. Merci de réessayer plus tard."
        : "Votre demande n'a pas pu être enregistrée. Réessayez dans un instant : vos réponses sont conservées.";
    return json({ ok: false, message }, 503);
  }

  return json({
    ok: true,
    mode: covered ? "couverte" : "attente",
    message: covered ? "Un conseiller Celexia étudie votre demande." : "Nous étudions votre demande. Nous vous disons honnêtement si un artisan sélectionné est disponible dans votre secteur.",
  });
}
