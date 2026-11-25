import { NextResponse } from "next/server";
import { clientKey, forwardToWebhook, rateLimited } from "@/lib/leads";

export const dynamic = "force-dynamic";

// Événements de conversion en première partie, sans cookie et sans donnée personnelle :
// ils permettent de suivre demandes et abandons par page et par mot-clé (plan §8).
const ALLOWED = new Set(["formulaire_debut", "formulaire_etape", "formulaire_envoi"]);

export async function POST(req: Request) {
  if (rateLimited(clientKey(req), 60)) return new NextResponse(null, { status: 204 });
  try {
    const body = (await req.json()) as { name?: string; page?: string; step?: number; trade?: string };
    if (!body.name || !ALLOWED.has(body.name)) return new NextResponse(null, { status: 204 });
    await forwardToWebhook("evenement", { name: body.name, page: String(body.page ?? "").slice(0, 200), step: Number(body.step ?? 0), trade: String(body.trade ?? "").slice(0, 60) });
  } catch {
    /* un événement perdu n'est pas une erreur pour le visiteur */
  }
  return new NextResponse(null, { status: 204 });
}
