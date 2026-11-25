import { NextResponse } from "next/server";
import { clientKey, forwardToWebhook, rateLimited } from "@/lib/leads";

export const dynamic = "force-dynamic";

interface Candidature {
  entreprise: string;
  siren: string;
  trade: string;
  departements: string;
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  message?: string;
  accord: boolean;
  website?: string;
}

const reply = (body: { ok: boolean; message?: string; errors?: Record<string, string> }, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  if (rateLimited(clientKey(req))) return reply({ ok: false, message: "Trop d'envois en peu de temps. Patientez une minute." }, 429);
  let c: Partial<Candidature>;
  try {
    c = (await req.json()) as Partial<Candidature>;
  } catch {
    return reply({ ok: false, message: "La demande est illisible." }, 400);
  }
  if (c.website) return reply({ ok: true, message: "Merci, nous avons bien reçu votre candidature." });

  const e: Record<string, string> = {};
  if (!c.entreprise?.trim()) e.entreprise = "Indiquez le nom de l'entreprise.";
  if (!/^\d{9}$/.test((c.siren ?? "").replace(/\s/g, ""))) e.siren = "Le SIREN comporte 9 chiffres.";
  if (!c.trade) e.trade = "Choisissez un métier.";
  if (!c.departements?.trim()) e.departements = "Indiquez les départements où vous intervenez.";
  if (!c.prenom?.trim() || !c.nom?.trim()) e.nom = "Indiquez votre prénom et votre nom.";
  if (!/^(?:\+33|0033|0)\s?[1-9](?:[\s.-]?\d{2}){4}$/.test((c.telephone ?? "").trim())) e.telephone = "Saisissez un numéro de téléphone français valide.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((c.email ?? "").trim())) e.email = "Saisissez une adresse e-mail valide.";
  if (!c.accord) e.accord = "Cochez la case pour que nous puissions vous recontacter.";
  if (Object.keys(e).length) return reply({ ok: false, errors: e, message: "Certaines réponses sont à corriger." }, 422);

  const result = await forwardToWebhook("candidature", {
    entreprise: c.entreprise!.trim(),
    siren: c.siren!.replace(/\s/g, ""),
    trade: c.trade,
    departements: c.departements!.trim(),
    contact: { prenom: c.prenom!.trim(), nom: c.nom!.trim(), telephone: c.telephone!.trim(), email: c.email!.trim().toLowerCase() },
    message: (c.message ?? "").slice(0, 1000),
  });
  if (!result.ok) return reply({ ok: false, message: result.reason === "not-configured" ? "Le service n'est pas encore en service : votre candidature n'a pas été enregistrée." : "Votre candidature n'a pas pu être enregistrée. Réessayez dans un instant." }, 503);
  return reply({ ok: true, message: "Merci, nous avons bien reçu votre candidature. Nous vous recontactons pour la suite." });
}
