// Transmission des demandes vers le CRM Celexia (n8n ou Supabase) par un webhook HTTP.
// L'URL et le secret viennent de l'environnement : jamais dans le code.
//   LEADS_WEBHOOK_URL     adresse du webhook (obligatoire en production)
//   LEADS_WEBHOOK_SECRET  secret optionnel, envoyé dans l'en-tête X-Webhook-Secret

export type ForwardResult = { ok: true; configured: boolean } | { ok: false; reason: "not-configured" | "failed" };

export async function forwardToWebhook(type: "demande" | "candidature" | "evenement", payload: Record<string, unknown>): Promise<ForwardResult> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    // En développement, on journalise au lieu d'échouer. En production, l'appelant renvoie une erreur explicite.
    if (process.env.NODE_ENV !== "production") {
      console.info(`[leads:${type}] LEADS_WEBHOOK_URL absent, charge utile journalisée :`, JSON.stringify(payload));
      return { ok: true, configured: false };
    }
    return { ok: false, reason: "not-configured" };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEADS_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEADS_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ type, receivedAt: new Date().toISOString(), ...payload }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true, configured: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}

// Limitation simple par adresse IP, en mémoire de l'instance : freine les envois en rafale, sans remplacer un vrai pare-feu.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, max = 6, windowMs = 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

export const clientKey = (req: Request) => req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnu";
