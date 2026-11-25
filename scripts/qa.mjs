// Audit du site construit : lit le HTML généré dans .next/server/app et signale les défauts de SEO et de qualité.
//
// Contrôles : un seul H1, title et description dans les limites, canonical auto-référent, JSON-LD valide,
// liens internes cassés, pages indexables orphelines (moins de 3 liens entrants), nombre de mots,
// unicité des pages locales entre elles, mentions interdites (note, avis, « certifié »).
//
// Usage : npm run build puis node scripts/qa.mjs   (PREVIEW_ALL=1 INDEXING=on au build pour auditer tout le plan)

import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, ".next/server/app");
const SITE = "https://artisansfrance.fr";

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const toPath = (file) => {
  let p = "/" + relative(appDir, file).replace(/\.html$/, "").replace(/\\/g, "/");
  p = p.replace(/\/index$/, "");
  return p === "" ? "/" : `${p}/`;
};

const pages = new Map();
for (const file of walk(appDir)) {
  const path = toPath(file);
  if (path.startsWith("/_")) continue;
  const html = readFileSync(file, "utf8");
  const main = (html.match(/<main[\s\S]*?<\/main>/) ?? [html])[0];
  const text = decode(main.replace(/<form[\s\S]*?<\/form>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1] ?? "");
  const description = decode((html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? "");
  const canonical = decode((html.match(/<link rel="canonical" href="([^"]*)"/) ?? [])[1] ?? "");
  const robots = decode((html.match(/<meta name="robots" content="([^"]*)"/) ?? [])[1] ?? "");
  const h1 = (main.match(/<h1[\s>]/g) ?? []).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  // Tous les liens internes de la page (en-tête, contenu, pied de page) : ce que voit un robot qui explore le site.
  const links = [...html.matchAll(/<a [^>]*href="([^"#?]+)[^"]*"/g)].map((m) => decode(m[1])).filter((h) => h.startsWith("/"));
  const footerLinks = [...html.matchAll(/<footer[\s\S]*?<\/footer>/g)].flatMap((m) => [...m[0].matchAll(/href="(\/[^"#?]*)"/g)].map((x) => x[1]));
  pages.set(path, { path, text, words: text.split(" ").length, title, description, canonical, robots, h1, ld, links, footerLinks });
}

const problems = [];
const warn = (path, msg) => problems.push({ path, msg });
const indexable = (p) => !/noindex/.test(p.robots);

const inbound = new Map();
for (const p of pages.values()) for (const l of new Set(p.links)) {
  const norm = l.endsWith("/") ? l : `${l}/`;
  if (norm === p.path) continue;
  inbound.set(norm, (inbound.get(norm) ?? 0) + 1);
}

const known = (l) => {
  const n = l.endsWith("/") ? l : `${l}/`;
  return pages.has(n) || /^\/(api|sitemaps?|robots|llms|indexnow|icon)/.test(n);
};

for (const p of pages.values()) {
  if (p.path === "/404/") continue;
  if (p.h1 !== 1) warn(p.path, `${p.h1} balises H1`);
  if (!p.title) warn(p.path, "title absent");
  else if (p.title.length > 60) warn(p.path, `title trop long (${p.title.length}) : ${p.title}`);
  if (!p.description) warn(p.path, "meta description absente");
  else if (p.description.length > 160) warn(p.path, `description trop longue (${p.description.length})`);
  if (indexable(p) && p.canonical !== `${SITE}${p.path}`) warn(p.path, `canonical inattendu : ${p.canonical}`);
  for (const raw of p.ld) {
    try { JSON.parse(raw); } catch { warn(p.path, "JSON-LD invalide"); }
  }
  for (const l of new Set(p.links)) if (!known(l)) warn(p.path, `lien interne cassé : ${l}`);
  if (/\b(certifié|certifiée|certifiés|certifiées|avis clients?|note moyenne|★)/i.test(p.text)) warn(p.path, "mention suspecte (certifié, avis, note)");
  if (indexable(p) && p.path !== "/" && (inbound.get(p.path) ?? 0) < 3) warn(p.path, `page indexable orpheline (${inbound.get(p.path) ?? 0} lien(s) entrant(s))`);
}

// Nombre de mots par type de gabarit.
const kind = (path) => {
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "prix") return "prix";
  if (["guides", "aides", "devis", "blog"].includes(parts[0])) return parts[0];
  if (parts.length === 1 && !["artisans", "zones", "cgu", "partenaires", "comment-ca-marche", "mentions-legales", "nos-artisans", "plan-du-site", "classement-et-selection", "politique-de-confidentialite", "quel-site-pour-trouver-un-artisan"].includes(parts[0])) return "hub";
  if (parts.length === 2 && !["artisans"].includes(parts[0])) return /^[a-z]+-[a-z-]+$/.test(parts[1]) && !/^\d/.test(parts[1]) && !/^2[ab]-/.test(parts[1]) ? "region" : "dept";
  if (parts.length === 3 && parts[0] !== "artisans") return "ville";
  return "autre";
};
const byKind = new Map();
for (const p of pages.values()) byKind.set(kind(p.path), [...(byKind.get(kind(p.path)) ?? []), p]);

// Unicité : part des séquences de 5 mots d'une page absentes de toutes les autres pages du même gabarit et du même métier.
function shingles(text, n = 5) {
  const w = text.toLowerCase().replace(/[^\p{L}\p{N}' ]/gu, " ").split(/\s+/).filter(Boolean);
  const out = new Set();
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(" "));
  return out;
}
const uniq = [];
const gate = [];
// Locales : comparées entre pages du même métier. Éditoriales : comparées entre pages du même gabarit.
const groups = [];
for (const k of ["dept", "ville"]) {
  const byTrade = new Map();
  for (const p of (byKind.get(k) ?? []).filter((p) => !p.path.startsWith("/artisans"))) byTrade.set(p.path.split("/")[1], [...(byTrade.get(p.path.split("/")[1]) ?? []), p]);
  for (const list of byTrade.values()) groups.push([k, list]);
}
for (const k of ["prix", "devis", "guides", "aides", "blog"]) if (byKind.get(k)) groups.push([k, byKind.get(k)]);
for (const [k, list] of groups) {
  const counts = new Map();
  const sh = list.map((p) => shingles(p.text));
  sh.forEach((set) => set.forEach((x) => counts.set(x, (counts.get(x) ?? 0) + 1)));
  list.forEach((p, i) => {
    const own = [...sh[i]].filter((x) => counts.get(x) === 1).length;
    const share = sh[i].size ? own / sh[i].size : 0;
    uniq.push({ path: p.path, kind: k, share, words: p.words });
    if (list.length > 1 && (share < 0.3 || p.words < 300)) gate.push(p.path);
    if (list.length > 1 && share < 0.3) warn(p.path, `contenu propre faible : ${(share * 100).toFixed(0)} % (seuil 30 %)`);
    else if (list.length > 1 && share < 0.4) warn(p.path, `contenu propre sous 40 % : ${(share * 100).toFixed(0)} %`);
    if (p.words < 300) warn(p.path, `moins de 300 mots (${p.words})`);
  });
}

const stat = (arr) => (arr.length ? { n: arr.length, min: Math.min(...arr), moy: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length), max: Math.max(...arr) } : null);
const lines = [];
lines.push("# Rapport d'audit du site construit", "");
lines.push(`Pages HTML analysées : ${pages.size}. Indexables : ${[...pages.values()].filter(indexable).length}. En noindex : ${[...pages.values()].filter((p) => !indexable(p)).length}.`, "");
lines.push("## Mots par gabarit", "", "| Gabarit | Pages | Min | Moyenne | Max |", "|---|---|---|---|---|");
for (const [k, list] of byKind) { const s = stat(list.map((p) => p.words)); lines.push(`| ${k} | ${s.n} | ${s.min} | ${s.moy} | ${s.max} |`); }
lines.push("", "## Contenu propre des pages locales (séquences de 5 mots absentes des autres pages du même métier)", "", "| Gabarit | Pages | Min | Moyenne | Max |", "|---|---|---|---|---|");
for (const k of ["dept", "ville", "prix", "devis", "guides", "aides", "blog"]) { const s = stat(uniq.filter((u) => u.kind === k).map((u) => Math.round(u.share * 100))); if (s) lines.push(`| ${k} | ${s.n} | ${s.min} % | ${s.moy} % | ${s.max} % |`); }
lines.push("", `## Problèmes (${problems.length})`, "");
const grouped = new Map();
for (const pr of problems) { const key = pr.msg.replace(/[0-9]+/g, "N").replace(/ : .*/, ""); grouped.set(key, [...(grouped.get(key) ?? []), pr]); }
for (const [key, list] of grouped) {
  lines.push(`### ${key} (${list.length})`, "");
  for (const pr of list.slice(0, 15)) lines.push(`- ${pr.path} : ${pr.msg}`);
  if (list.length > 15) lines.push(`- … et ${list.length - 15} autres`);
  lines.push("");
}
// --gate : écrit la liste des pages locales sous le seuil de contenu propre ; le site les passe en noindex au build suivant.
if (process.argv.includes("--gate")) {
  const out = { generatedAt: new Date().toISOString().slice(0, 10), seuils: { contenuPropreMin: 0.3, motsMin: 300 }, noindex: [...new Set(gate)].sort() };
  writeFileSync(join(root, "src/data/quality.json"), JSON.stringify(out, null, 1));
  console.log(`Porte qualité : ${out.noindex.length} page(s) locale(s) passée(s) en noindex (src/data/quality.json).`);
}
mkdirSync(join(root, "reports"), { recursive: true });
writeFileSync(join(root, "reports/audit-site.md"), lines.join("\n"));
console.log(lines.slice(0, 40).join("\n"));
console.log(`\n${problems.length} problème(s). Rapport complet : reports/audit-site.md`);
