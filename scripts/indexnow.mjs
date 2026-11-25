// Prévient Bing et les moteurs compatibles IndexNow des pages nouvelles ou modifiées.
// ChatGPT s'appuie en partie sur l'index de Bing : envoyer chaque nouvelle vague accélère sa découverte.
//
// Prérequis : INDEXNOW_KEY défini sur l'environnement de production (le site sert la clé sur /indexnow-key.txt).
// Usage : INDEXNOW_KEY=... node scripts/indexnow.mjs [https://artisansfrance.fr]
//         Les URL envoyées sont celles du sitemap en production (donc seulement les pages indexables).

const site = process.argv[2] ?? "https://artisansfrance.fr";
const key = process.env.INDEXNOW_KEY;
if (!key) {
  console.error("INDEXNOW_KEY manquant.");
  process.exit(1);
}

async function text(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} : ${res.status}`);
  return res.text();
}

const index = await text(`${site}/sitemap.xml`);
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const urls = [];
for (const sm of sitemaps) urls.push(...[...(await text(sm)).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
console.log(`${urls.length} URL à soumettre.`);

const host = new URL(site).host;
for (let i = 0; i < urls.length; i += 9000) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `${site}/indexnow-key.txt`, urlList: urls.slice(i, i + 9000) }),
  });
  console.log(`Lot ${i / 9000 + 1} : ${res.status}`);
}
