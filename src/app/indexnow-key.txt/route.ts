// Fichier de clé IndexNow (https://www.indexnow.org). La clé vient de l'environnement : INDEXNOW_KEY.
// Soumission des nouvelles pages : node scripts/indexnow.mjs

export const dynamic = "force-dynamic";

export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
