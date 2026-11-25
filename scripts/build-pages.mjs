// Transforme l'audit SEO (plan de pages + mots-clés + JSON) en données de pages propres pour le site.
//
// Entrées  : document seo audit /plan-pages-artisansfrance.csv, artisansfrance-mots-cles.csv, artisansfrance-donnees.json
// Sorties  : src/data/pages.json            pages retenues, tous métiers, avec vague de publication
//            reports/plan-nettoyage.md       pages rejetées / fusionnées / renommées, avec la raison
//            reports/couverture-mots-cles.md mots-clés placés, rattachés ou ignorés
//
// Usage : node scripts/build-pages.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const auditDir = join(root, "document seo audit ");
const out = (p) => join(root, p);

// ---------------------------------------------------------------- lecture

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ";") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [header, ...lines] = rows;
  return lines.filter((l) => l.length === header.length).map((l) => Object.fromEntries(header.map((h, i) => [h, l[i]])));
}

const readCsv = (name) => parseCsv(readFileSync(join(auditDir, name), "utf8").replace(/^﻿/, ""));
const plan = readCsv("plan-pages-artisansfrance.csv");
const keywords = readCsv("artisansfrance-mots-cles.csv");
const donnees = JSON.parse(readFileSync(join(auditDir, "artisansfrance-donnees.json"), "utf8"));

const num = (v) => Number(String(v ?? "").replace(/\s/g, "").replace(",", ".")) || 0;
const list = (v) => (v ? v.split("|").map((s) => s.trim()).filter(Boolean) : []);

// ---------------------------------------------------------------- métiers

// Le libellé du métier dans l'audit -> slug du hub (première URL du plan, section 1).
const hubs = plan.filter((r) => r.section.startsWith("1."));
const METIER_TO_TRADE = Object.fromEntries(hubs.map((h) => [h.metier, h.url.split("/").filter(Boolean)[0]]));
const TIER = Object.fromEntries(hubs.map((h) => [h.url.split("/").filter(Boolean)[0], h.tier]));

const TYPE_BY_SECTION = { 1: "hub", 2: "dept", 3: "ville", 4: "prix", 5: "devis", 6: "probleme", 7: "aides", 8: "blog", 9: "blog" };

// ---------------------------------------------------------------- bruit, marques, noms propres

// Requêtes à ne jamais transformer en page : marques, concurrents, noms propres, requêtes hors sujet.
const NOISE = new RegExp(
  [
    "yann", "ninja", "habitatpresto", "coutances", "bubendorff", "akena", "moquet", "colas", "moreau", "tortosa",
    "didier", "transporteur", "sushi", "vs[ -]?code", "coupole", "diaphragm", "viveo", "afpah", "roland", "vérandahlia",
    "verandahlia", "bov[eé]", "nicolas", "franc[ -]?ma", "france ma", "sm ravalement", "leroy merlin",
    // famille « extension » polluée : cils, cheveux, Chrome, sport, informatique
    "cils", "cheveux", "capillaire", "chrome", "triceps", "leg extension", "browser", "chromebook", "chromedriver",
    "wordpress", "firefox", "edge", "gaz", "chaudi[eè]re", "gazon", "cash", "maillot", "intex", "tubulaire", "gonflable",
    "gonflante", "magazine", "lycée", "lycee", "clôture de compte", "cloture de compte", "forum",
  ].join("|"),
  "i",
);
const isNoise = (s) => NOISE.test(String(s ?? "").normalize("NFC"));

// ---------------------------------------------------------------- slugs

const LEADING_STOP = new Set(["d", "une", "un", "de", "du", "des", "la", "le", "les", "l", "pour", "sa", "son", "ses", "en", "au", "aux", "a"]);

function cleanSlug(type, slug) {
  let tokens = slug.split("-").filter(Boolean);
  const drop = new Set(["prix", "tarif", "tarifs", "cout", "couts"]);
  if (type === "devis") drop.add("devis");
  if (type === "prix") tokens = tokens.filter((t) => !drop.has(t));
  if (type === "devis") tokens = tokens.filter((t) => !drop.has(t));
  // les années périment l'URL : « -2026 » est retiré, l'année est dite dans le titre
  tokens = tokens.filter((t) => !/^20\d\d$/.test(t));
  while (tokens.length > 1 && LEADING_STOP.has(tokens[0])) tokens.shift();
  if (tokens.length > 1 && tokens[0] === "m2") tokens.push(tokens.shift());
  if (type === "aides") tokens = tokens.filter((t, i) => !(i > 0 && LEADING_STOP.has(t) && ["pour", "sa", "son"].includes(t)));
  return tokens.join("-") || slug;
}

// Surcharges manuelles (phase 1) : URL du plan -> URL finale. Elles priment sur la règle automatique.
const OVERRIDES = {
  "/devis/devis-toit/": "/devis/toiture/",
  "/devis/couvreur-devis/": "/devis/toiture/",
  "/devis/charpente-devis/": "/devis/charpente/",
  "/guides/fuites-toiture/": "/guides/fuite-toiture/",
  "/guides/reparations-toiture/": "/guides/reparation-toiture/",
  "/guides/traitement-bois-et-charpente/": "/guides/traitement-charpente/",
};

// Regroupement des pages devis qui visent la même demande (synonymes, « en ligne », « exemple ») : une page canonique
// garde tous les mots-clés, les autres disparaissent pour ne pas se concurrencer entre elles.
const DEVIS_CANONICAL = {
  "macon-en-ligne": "macon", maconnerie: "macon",
  ravalement: "ravalement-facade",
  "surelevation-maison": "surelevation",
  "cuisine-en-ligne": "cuisine",
  electricien: "electricite",
  "fenetre-en-ligne": "fenetres", "fenetres-pvc": "fenetres",
  menuisier: "menuiserie", menuiseries: "menuiserie",
  paysage: "paysagiste", "exemple-paysagiste": "paysagiste",
  piscines: "piscine", pisciniste: "piscine",
  plombier: "plomberie",
  "terrassement-en-ligne": "terrassement", "terrassement-maison": "terrassement", "terrassement-terrain": "terrassement", "exemple-terrassement": "terrassement",
  "climatisation-reversible": "climatisation", "installation-climatisation": "climatisation", "pose-climatisation": "climatisation", "ligne-climatisation": "climatisation",
  "constructeur-maison": "construction-maison",
  "terrasse-bois": "terrasse",
  "pose-carrelage": "carrelage",
  "et-travaux": "travaux", "travaux-ligne": "travaux",
  "porte-d-entree": "porte-entree",
  "panneaux-solaires": "panneau-solaire",
};

// ---------------------------------------------------------------- étape 1 : classement des lignes du plan

// Filtre structurel des mots-clés locaux : « métier + lieu » seulement. Un mot-clé qui contient un mot inconnu
// (nom d'entreprise, prénom d'artisan) ou un lieu étranger au département est écarté.
const tok = (s) =>
  (String(s ?? "").replace(/œ/gi, "oe").replace(/æ/gi, "ae").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().match(/[a-z0-9]+/g) ?? [])
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t));
const VOCAB = new Set([
  "dans", "le", "la", "les", "de", "du", "des", "en", "a", "au", "aux", "et", "sur", "sous", "d", "l", "autour", "moi",
  "proximite", "pres", "chez", "artisan", "entreprise", "ma", "pro", "professionnel", "france", "maison", "immeuble",
  "architecte", "echoppe", "bassin", "ile", "region", "departement",
]);
for (const h of hubs) for (const k of [h.mot_cle_principal, ...list(h.mots_cles_secondaires)]) tok(k).forEach((t) => VOCAB.add(t));
for (const t of "couvreur zingueur charpentier charpente toiture couverture macon maconnerie facade ravalement peintre peinture isolation exterieur exterieure terrassement terrassier surelevation extension menuisier menuiserie bardage paysagiste piscine pisciniste plombier electricien chauffagiste veranda pergola cloture portail terrasse assainissement fosse septique climatisation renovation salle bain travaux".split(" ")) VOCAB.add(t);
const placesByDept = new Map();
for (const r of plan) {
  if (!r.section.startsWith("3.")) continue;
  const code = r.departement.split(" ")[0];
  const set = placesByDept.get(code) ?? new Set();
  tok(r.ville).forEach((t) => set.add(t));
  placesByDept.set(code, set);
}
function localKeywordOk(keyword, deptCode, deptName, ville) {
  const zone = new Set([...tok(deptName), ...tok(ville), ...(placesByDept.get(deptCode) ?? [])]);
  // gentilés et adjectifs de lieu (parisien, bordelais) : les 4 premières lettres d'un nom de lieu du département
  const demonym = (t) => t.length >= 6 && [...zone].some((z) => z.length >= 4 && t.startsWith(z.slice(0, 4)));
  return tok(keyword).every((t) => VOCAB.has(t) || zone.has(t) || t === deptCode.toLowerCase() || demonym(t));
}

const kwVolume = new Map(keywords.map((k) => [k.mot_cle, k.volume]));
const sanitized = [];
const rejected = [];
const merged = [];
const renamed = [];

const candidates = [];
for (const r of plan) {
  const type = TYPE_BY_SECTION[r.section.trim()[0]];
  if (!type) continue;
  const trade = METIER_TO_TRADE[r.metier];
  const url = r.url;
  const reason = [];
  const isLocal = type === "dept" || type === "ville";
  let keyword = r.mot_cle_principal || null;
  let secondary = list(r.mots_cles_secondaires);
  let volume = num(r.volume_total);
  if (isLocal) {
    // Une page département ou ville existe pour sa zone : seul le mot-clé parasite (marque, nom d'artisan) est écarté.
    const [code0, ...nameParts0] = (r.departement || "").split(" ");
    const okK = (k) => !isNoise(k) && localKeywordOk(k, code0, nameParts0.join(" "), r.ville);
    if ([keyword, ...secondary].some((k) => k && !okK(k))) {
      const bad = [keyword, ...secondary].filter((k) => k && !okK(k));
      const kept = [keyword, ...secondary].filter((k) => k && okK(k));
      const volOf = (k) => num(kwVolume.get(k));
      volume = kept.reduce((sum, k) => sum + volOf(k), 0);
      keyword = kept[0] ?? null;
      secondary = kept.slice(1);
      sanitized.push({ url, dropped: bad });
    }
  } else if (isNoise(url) || isNoise(keyword)) {
    reason.push("nom propre, marque, concurrent ou requête hors sujet");
  }
  if (reason.length) { rejected.push({ url, keyword: r.mot_cle_principal, reason: reason.join(", ") }); continue; }

  const parts = url.split("/").filter(Boolean);
  let finalUrl = url;
  if (["prix", "devis", "probleme", "aides"].includes(type) && parts.length === 2) {
    finalUrl = OVERRIDES[url] ?? `/${parts[0]}/${cleanSlug(type, parts[1])}/`;
    if (type === "devis") {
      const slug = finalUrl.split("/")[2];
      finalUrl = `/devis/${DEVIS_CANONICAL[slug] ?? slug}/`;
    }
  } else if (type === "blog" && parts.length === 2) {
    finalUrl = OVERRIDES[url] ?? url;
  }
  if (finalUrl !== url) renamed.push({ from: url, to: finalUrl });

  const [deptCode, ...deptName] = (r.departement || "").split(" ");
  candidates.push({
    id: finalUrl,
    type,
    url: finalUrl,
    trade: trade ?? null,
    metier: r.metier,
    tier: r.tier,
    h1: r.h1,
    keyword,
    secondary,
    volume,
    nbRequetes: num(r.nb_requetes),
    oceans: num(r.oceans),
    cpc: num(r.cpc_pondere),
    difficulty: num(r.difficulte_principale),
    phase: Number(r.phase),
    ...(type === "dept" || type === "ville"
      ? { deptCode: deptCode || null, deptName: deptName.join(" ") || null, deptSlug: parts[1] }
      : {}),
    ...(type === "ville" ? { ville: r.ville, villeSlug: parts[2] } : {}),
  });
}

// ---------------------------------------------------------------- étape 2 : fusion des collisions d'URL et des doublons d'intention

const byUrl = new Map();
for (const c of candidates) {
  const prev = byUrl.get(c.url);
  if (!prev) { byUrl.set(c.url, c); continue; }
  const keep = prev.volume >= c.volume ? prev : c;
  const drop = keep === prev ? c : prev;
  keep.secondary = [...new Set([...keep.secondary, drop.keyword, ...drop.secondary].filter(Boolean))];
  keep.volume += drop.volume;
  keep.nbRequetes += drop.nbRequetes;
  merged.push({ from: drop.keyword ?? drop.url, into: keep.url, reason: "même URL après nettoyage du slug" });
  byUrl.set(c.url, keep);
}

const normIntent = (s) => {
  const stop = new Set(["de", "du", "des", "la", "le", "les", "d", "en", "au", "aux", "et", "a", "avec", "pour", "un", "une", "l", "prix", "devis", "tarif", "cout"]);
  return (s ?? "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .match(/[a-z0-9]+/g)?.filter((t) => !stop.has(t))
    .map((t) => (t === "aluminium" ? "alu" : t.endsWith("eaux") ? t.slice(0, -1) : t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t))
    .sort().join(" ") ?? "";
};

const groups = new Map();
for (const c of byUrl.values()) {
  if (!["prix", "devis", "probleme", "aides"].includes(c.type)) continue;
  const key = `${c.type}|${c.metier}|${normIntent(c.keyword)}`;
  groups.set(key, [...(groups.get(key) ?? []), c]);
}
for (const g of groups.values()) {
  if (g.length < 2) continue;
  g.sort((a, b) => b.volume - a.volume);
  const [keep, ...rest] = g;
  for (const d of rest) {
    keep.secondary = [...new Set([...keep.secondary, d.keyword, ...d.secondary].filter(Boolean))];
    keep.nbRequetes += d.nbRequetes;
    merged.push({ from: d.url, into: keep.url, reason: "même intention (singulier/pluriel, alu/aluminium, ordre des mots)" });
    byUrl.delete(d.url);
  }
}

let pages = [...byUrl.values()];

// ---------------------------------------------------------------- étape 3 : pages région (ajout hors CSV justifié par la donnée)

const REGIONS = {
  Bretagne: "bretagne",
  Normandie: "normandie",
  "Île-de-France": "ile-de-france",
  Occitanie: "occitanie",
  "Pays de la Loire": "pays-de-la-loire",
  "Auvergne-Rhône-Alpes": "auvergne-rhone-alpes",
  Corse: "corse",
};
const regionRows = new Map();
for (const z of donnees.datasets.af_zones) {
  if (!(z.zone in REGIONS) || isNoise(z.mot_cle)) continue;
  const trade = METIER_TO_TRADE[z.metier];
  if (!trade) continue;
  const key = `${trade}|${z.zone}`;
  regionRows.set(key, [...(regionRows.get(key) ?? []), z]);
}
const hubName = (trade) => hubs.find((h) => h.url === `/${trade}/`)?.h1.split(":")[0] ?? trade;
for (const [key, rows] of regionRows) {
  const [trade, region] = key.split("|");
  const volume = rows.reduce((s, z) => s + z.volume, 0);
  if (volume < 100) continue;
  rows.sort((a, b) => b.volume - a.volume);
  pages.push({
    id: `/${trade}/${REGIONS[region]}/`,
    type: "region",
    url: `/${trade}/${REGIONS[region]}/`,
    trade,
    metier: rows[0].metier,
    tier: TIER[trade] ?? "B",
    h1: `${hubName(trade)} en ${region}`,
    keyword: rows[0].mot_cle,
    secondary: rows.slice(1).map((z) => z.mot_cle),
    volume,
    nbRequetes: rows.length,
    oceans: rows.filter((z) => z.ocean_bleu === "oui").length,
    cpc: 0,
    difficulty: 0,
    phase: 2,
    regionName: region,
    regionSlug: REGIONS[region],
  });
}

// ---------------------------------------------------------------- étape 4 : couverture des mots-clés orphelins

const usedKeywords = new Set();
for (const p of pages) {
  if (p.keyword) usedKeywords.add(p.keyword);
  p.secondary.forEach((k) => usedKeywords.add(k));
}

const tokens = (s) => new Set(normIntent(s).split(" ").filter(Boolean));
const jaccard = (a, b) => {
  const A = tokens(a), B = tokens(b);
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter || 1);
};

const hubByTrade = new Map(pages.filter((p) => p.type === "hub").map((p) => [p.trade, p]));
const pagesOf = (type, metier) => pages.filter((p) => p.type === type && p.metier === metier);

const TYPE_TARGET = {
  "Prix et coût": "prix",
  "Aides et réglementation": "aides",
  "Problème et réparation": "probleme",
  Devis: "devis",
  "Comparatif et choix": "blog",
  "Information et idées": "blog",
};
const assigned = [];
const ignored = { bruit: [], generique: [], produit: [], sansCible: [], horsSujet: [] };
const HEAD_WORDS = /maison|agrandissement|surélévation|surelevation|toiture|charpente|bardage|couvreur|ma[cç]on|terrassement|ravalement|isolation|v[eé]randa|pergola|cl[oô]ture|portail|paysag/i;

for (const k of keywords) {
  if (usedKeywords.has(k.mot_cle)) continue;
  const volume = num(k.volume);
  if (isNoise(k.mot_cle)) { ignored.bruit.push(k); continue; }
  const trade = METIER_TO_TRADE[k.metier];
  const hub = hubByTrade.get(trade);
  const type = k.type;

  if (type === "Achat produit ou marque") { ignored.produit.push(k); continue; }

  let target = null;
  if (type === "Trouver un pro (générique)" || type === "Pro + ville ou zone") {
    target = hub;
  } else if (TYPE_TARGET[type]) {
    const cands = pagesOf(TYPE_TARGET[type], k.metier)
      .map((p) => ({ p, s: jaccard(k.mot_cle, p.keyword) }))
      .sort((a, b) => b.s - a.s);
    target = cands[0] && cands[0].s >= 0.4 ? cands[0].p : hub;
  } else if (type === "Générique") {
    // têtes de requête : rattachées au hub seulement si prioritaires, assez recherchées et liées au métier
    if (k.prioritaire_celexia === "oui" && volume >= 1000 && HEAD_WORDS.test(k.mot_cle) && hub) target = hub;
    else { ignored.generique.push(k); continue; }
  }
  if (!target) { ignored.sansCible.push(k); continue; }
  target.extraKeywords ??= [];
  target.extraKeywords.push(k.mot_cle);
  target.extraVolume = (target.extraVolume ?? 0) + volume;
  usedKeywords.add(k.mot_cle);
  assigned.push({ keyword: k.mot_cle, volume, type, to: target.url });
}

// Les hubs et pages qui reçoivent des mots-clés additionnels voient leur volume ciblé augmenter.
for (const p of pages) if (p.extraVolume) p.volumeWithExtras = p.volume + p.extraVolume;

// ---------------------------------------------------------------- étape 5 : vagues de publication

const TYPE_ORDER = ["hub", "devis", "probleme", "aides", "prix", "dept", "region", "ville", "blog"];
const WAVE_SIZE = 100;
const wavesByPhase = new Map();
for (const p of pages) wavesByPhase.set(p.phase, [...(wavesByPhase.get(p.phase) ?? []), p]);
for (const [phase, list_] of wavesByPhase) {
  list_.sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type) || b.volume - a.volume || a.url.localeCompare(b.url));
  list_.forEach((p, i) => { p.wave = `${phase}.${Math.floor(i / WAVE_SIZE) + 1}`; });
}
pages.sort((a, b) => a.phase - b.phase || a.wave.localeCompare(b.wave, "fr", { numeric: true }) || a.url.localeCompare(b.url));

// ---------------------------------------------------------------- séries mensuelles (saisonnalité)

// Série des 12 derniers mois de recherches Google (DataForSEO) du mot-clé principal, ancienne -> récente.
// Seulement pour les pages locales dont le mot-clé dépasse un seuil : sous 200 recherches/mois, la série est du bruit.
const monthlyByKeyword = new Map(donnees.mots_cles.filter((m) => m.mensuel).map((m) => [m.mot_cle, m.mensuel]));
let withMonthly = 0;
for (const p of pages) {
  if (!["dept", "ville", "region", "hub"].includes(p.type) || !p.keyword) continue;
  const series = monthlyByKeyword.get(p.keyword);
  if (!series) continue;
  const months = Object.keys(series).sort();
  if (months.length < 12) continue;
  const values = months.slice(-12).map((m) => series[m] ?? 0);
  if (Math.max(...values) < 200) continue;
  p.monthly = values;
  p.monthlyEnd = months.at(-1);
  withMonthly++;
}

// ---------------------------------------------------------------- contrôles

const urls = new Set();
const dup = [];
for (const p of pages) { if (urls.has(p.url)) dup.push(p.url); urls.add(p.url); }
if (dup.length) throw new Error(`URL en double : ${dup.slice(0, 5).join(", ")}`);
const badUrl = pages.filter((p) => !/^\/[a-z0-9\-/]*\/$|^\/$/.test(p.url));
if (badUrl.length) throw new Error(`URL invalides : ${badUrl.slice(0, 5).map((p) => p.url).join(", ")}`);

// ---------------------------------------------------------------- écriture

mkdirSync(out("src/data"), { recursive: true });
mkdirSync(out("reports"), { recursive: true });

const trades = Object.entries(METIER_TO_TRADE).map(([metier, slug]) => ({
  slug,
  metier,
  tier: TIER[slug],
  hubUrl: `/${slug}/`,
}));
writeFileSync(out("src/data/pages.json"), JSON.stringify({ source: "plan-pages-artisansfrance.csv", trades, pages }));

const byTypePhase = {};
for (const p of pages) {
  byTypePhase[p.type] ??= {};
  byTypePhase[p.type][p.phase] = (byTypePhase[p.type][p.phase] ?? 0) + 1;
}

const md = [];
md.push("# Nettoyage du plan de pages", "");
md.push(`Plan d'origine : ${plan.length} pages. Pages retenues : ${pages.length} (dont ${pages.filter((p) => p.type === "region").length} pages région ajoutées).`, "");
md.push(`- Rejetées : ${rejected.length}`, `- Fusionnées : ${merged.length}`, `- URL renommées : ${renamed.length}`, "");
md.push("## Pages retenues par type et par phase", "", "| Type | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Total |", "|---|---|---|---|---|---|");
for (const [t, ph] of Object.entries(byTypePhase)) {
  md.push(`| ${t} | ${ph[1] ?? 0} | ${ph[2] ?? 0} | ${ph[3] ?? 0} | ${ph[4] ?? 0} | ${Object.values(ph).reduce((a, b) => a + b, 0)} |`);
}
md.push("", "## Pages rejetées", "", "| URL du plan | Mot-clé | Raison |", "|---|---|---|");
for (const r of rejected) md.push(`| ${r.url} | ${r.keyword} | ${r.reason} |`);
md.push("", "## Pages locales conservées, mot-clé parasite écarté", "", "| Page | Mots-clés écartés |", "|---|---|");
for (const s of sanitized) md.push(`| ${s.url} | ${s.dropped.join(", ")} |`);
md.push("", "## Pages fusionnées", "", "| Page supprimée | Page conservée | Raison |", "|---|---|---|");
for (const m of merged) md.push(`| ${m.from} | ${m.into} | ${m.reason} |`);
md.push("", "## URL renommées (nettoyage des slugs)", "", "| Avant | Après |", "|---|---|");
for (const r of renamed) md.push(`| ${r.from} | ${r.to} |`);
const zeroVol = pages.filter((p) => ["dept", "ville"].includes(p.type) && p.volume === 0);
md.push("", "## Pages locales sans recherche", "", `${zeroVol.length} pages département ou ville ont un volume de 0 : elles restent en noindex tant que le département n'est pas couvert par des artisans.`, "");
writeFileSync(out("reports/plan-nettoyage.md"), md.join("\n"));

const vol = (arr) => arr.reduce((s, k) => s + num(k.volume), 0);
const cov = [];
cov.push("# Couverture des mots-clés", "");
cov.push(`Mots-clés dans l'audit : ${keywords.length} (${vol(keywords).toLocaleString("fr-FR")} recherches/mois).`);
cov.push(`Placés par le plan d'origine : ${new Set(plan.flatMap((r) => [r.mot_cle_principal, ...list(r.mots_cles_secondaires)]).filter(Boolean)).size}.`);
cov.push(`Rattachés automatiquement à une page existante : ${assigned.length} (${assigned.reduce((s, a) => s + a.volume, 0).toLocaleString("fr-FR")} recherches/mois).`, "");
cov.push("## Ignorés, avec la raison", "", "| Raison | Mots-clés | Recherches/mois |", "|---|---|---|");
cov.push(`| Nom propre, marque, requête hors sujet | ${ignored.bruit.length} | ${vol(ignored.bruit).toLocaleString("fr-FR")} |`);
cov.push(`| Achat de produit ou de marque | ${ignored.produit.length} | ${vol(ignored.produit).toLocaleString("fr-FR")} |`);
cov.push(`| Requête générique d'un mot, trop disputée | ${ignored.generique.length} | ${vol(ignored.generique).toLocaleString("fr-FR")} |`);
cov.push(`| Sans page cible | ${ignored.sansCible.length} | ${vol(ignored.sansCible).toLocaleString("fr-FR")} |`);
cov.push("", "## Rattachés automatiquement (à valider)", "", "| Mot-clé | Recherches/mois | Type | Page |", "|---|---|---|---|");
for (const a of assigned.sort((x, y) => y.volume - x.volume).slice(0, 150)) cov.push(`| ${a.keyword} | ${a.volume} | ${a.type} | ${a.to} |`);
cov.push("", "## Requêtes « autour de moi / à proximité / près de chez moi »", "");
const proxRe = /autour de moi|à proximité|a proximité|près de chez|pres de chez|proche de moi/;
const prox = keywords.filter((k) => proxRe.test(k.mot_cle) && !isNoise(k.mot_cle));
cov.push(`${prox.length} requêtes utiles, ${prox.filter((k) => usedKeywords.has(k.mot_cle)).length} placées après rattachement.`, "");
cov.push("| Requête | Recherches/mois | Placée |", "|---|---|---|");
for (const k of prox.sort((a, b) => num(b.volume) - num(a.volume)).slice(0, 40)) cov.push(`| ${k.mot_cle} | ${k.volume} | ${usedKeywords.has(k.mot_cle) ? "oui" : "non"} |`);
writeFileSync(out("reports/couverture-mots-cles.md"), cov.join("\n"));

console.log(`Séries mensuelles : ${withMonthly} pages`);
console.log(`Pages retenues : ${pages.length} (rejetées ${rejected.length}, locales assainies ${sanitized.length}, fusionnées ${merged.length}, renommées ${renamed.length}, région +${pages.filter((p) => p.type === "region").length})`);
console.log(JSON.stringify(byTypePhase));
console.log(`Mots-clés rattachés : ${assigned.length}, ignorés : bruit ${ignored.bruit.length}, produit ${ignored.produit.length}, générique ${ignored.generique.length}, sans cible ${ignored.sansCible.length}`);
