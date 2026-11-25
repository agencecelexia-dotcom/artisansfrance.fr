// Données locales officielles agrégées par commune et par département : src/data/local.json
//
// Sources (ouvertes) :
//   - DVF, « Demandes de valeurs foncières » (DGFiP), fichiers géolocalisés Etalab : https://files.data.gouv.fr/geo-dvf
//   - Géorisques, base GASPAR : https://georisques.gouv.fr/api/v1/gaspar/risques
//
// Ce que le script calcule (et rien d'autre) :
//   - ventesMaisons / ventesAppartements : nombre de mutations « Vente » de l'année, qui contiennent une maison / un appartement
//   - prixMaisonM2 : médiane de (valeur foncière / surface bâtie) des ventes à une seule maison, terrain compris.
//     Calculée seulement s'il y a au moins MIN_SALES ventes, sinon null (pas de chiffre sur un échantillon trop petit).
//   - risques : libellés de risques naturels et technologiques recensés dans la commune.
//
// Entrée : src/data/geo.json   Sortie : src/data/local.json
// Usage  : node scripts/fetch-local.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const geo = JSON.parse(readFileSync(join(root, "src/data/geo.json"), "utf8"));
const YEAR = 2024;
const PREV_YEAR = YEAR - 1;
const MIN_SALES = 10;
const dvfBase = (y) => `https://files.data.gouv.fr/geo-dvf/latest/csv/${y}`;
const RISKS = "https://georisques.gouv.fr/api/v1/gaspar/risques";

async function fetchRetry(url, asBuffer = false) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok) return asBuffer ? Buffer.from(await res.arrayBuffer()) : res.json();
      if (res.status === 404) return null;
    } catch { /* nouvelle tentative */ }
    await new Promise((r) => setTimeout(r, 700 * attempt));
  }
  throw new Error(`Échec : ${url}`);
}

function parseCsvLine(line) {
  const out = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { out.push(cell); cell = ""; }
    else cell += ch;
  }
  out.push(cell);
  return out;
}

const median = (arr) => {
  const a = [...arr].sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

function aggregate(csvText) {
  const lines = csvText.split("\n");
  const header = parseCsvLine(lines[0]);
  const idx = Object.fromEntries(["id_mutation", "nature_mutation", "valeur_fonciere", "type_local", "surface_reelle_bati", "code_commune", "nom_commune"].map((k) => [k, header.indexOf(k)]));
  const mutations = new Map();
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const c = parseCsvLine(lines[i]);
    if (c[idx.nature_mutation] !== "Vente") continue;
    const id = c[idx.id_mutation];
    let m = mutations.get(id);
    if (!m) { m = { value: Number(c[idx.valeur_fonciere]) || 0, maisons: [], appart: 0, commune: c[idx.code_commune], nom: c[idx.nom_commune] }; mutations.set(id, m); }
    const type = c[idx.type_local];
    if (type === "Maison") m.maisons.push(Number(c[idx.surface_reelle_bati]) || 0);
    else if (type === "Appartement") m.appart++;
  }
  let ventesMaisons = 0;
  let ventesAppartements = 0;
  const prices = [];
  const surfaces = [];
  const byCommune = new Map();
  for (const m of mutations.values()) {
    if (m.maisons.length) {
      ventesMaisons++;
      const surface = m.maisons[0];
      const ok = m.maisons.length === 1 && m.appart === 0 && m.value > 0 && surface >= 20 && surface <= 500;
      if (ok) { prices.push(m.value / surface); surfaces.push(surface); }
      const bc = byCommune.get(m.commune) ?? { nom: m.nom, ventes: 0, prices: [] };
      bc.ventes++;
      if (ok) bc.prices.push(m.value / surface);
      byCommune.set(m.commune, bc);
    } else if (m.appart) ventesAppartements++;
  }
  const top = [...byCommune.entries()]
    .sort((a, b) => b[1].ventes - a[1].ventes)
    .slice(0, 8)
    .map(([code, v]) => ({ code, nom: v.nom, ventes: v.ventes, prixMaisonM2: v.prices.length >= MIN_SALES ? Math.round(median(v.prices) / 10) * 10 : null }));
  return {
    ventesMaisons,
    ventesAppartements,
    prixMaisonM2: prices.length >= MIN_SALES ? Math.round(median(prices) / 10) * 10 : null,
    surfaceBatieMediane: surfaces.length >= MIN_SALES ? Math.round(median(surfaces) / 5) * 5 : null,
    ...(top.length ? { communesActives: top } : {}),
  };
}

async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) { const item = items[i++]; await fn(item); } }));
}

const out = {
  source: "DVF (DGFiP, Etalab) et Géorisques (GASPAR)",
  dvfYear: YEAR,
  fetchedAt: new Date().toISOString().slice(0, 10),
  departements: {},
  communes: {},
};

const deptCodes = Object.keys(geo.departements);
let done = 0;
await pool(deptCodes, 4, async (code) => {
  const buf = await fetchRetry(`${dvfBase(YEAR)}/departements/${code}.csv.gz`, true);
  if (!buf) return;
  const cur = aggregate(gunzipSync(buf).toString("utf8"));
  const prevBuf = await fetchRetry(`${dvfBase(PREV_YEAR)}/departements/${code}.csv.gz`, true);
  const prev = prevBuf ? aggregate(gunzipSync(prevBuf).toString("utf8")) : null;
  out.departements[code] = { ...cur, ...(prev ? { precedent: { ventesMaisons: prev.ventesMaisons, prixMaisonM2: prev.prixMaisonM2 } } : {}) };
  if (++done % 10 === 0) console.log(`départements DVF : ${done}/${deptCodes.length}`);
});

const communeCodes = Object.keys(geo.communes);
done = 0;
await pool(communeCodes, 6, async (code) => {
  const dep = geo.communes[code].deptCode;
  const folder = dep.length === 3 ? dep : dep.padStart(2, "0");
  const buf = await fetchRetry(`${dvfBase(YEAR)}/communes/${folder}/${code}.csv`, true);
  const prevBuf = await fetchRetry(`${dvfBase(PREV_YEAR)}/communes/${folder}/${code}.csv`, true);
  const prev = prevBuf ? aggregate(prevBuf.toString("utf8")) : null;
  // Pas de fichier = pas de donnée (DVF ne couvre ni l'Alsace-Moselle ni Mayotte) : null, jamais un faux zéro.
  const dvf = buf ? aggregate(buf.toString("utf8")) : { ventesMaisons: null, ventesAppartements: null, prixMaisonM2: null, surfaceBatieMediane: null };
  if (dvf.communesActives) delete dvf.communesActives;
  if (buf && prev) dvf.precedent = { ventesMaisons: prev.ventesMaisons, prixMaisonM2: prev.prixMaisonM2 };
  const risks = await fetchRetry(`${RISKS}?code_insee=${code}`);
  const labels = new Set();
  for (const row of risks?.data ?? []) {
    for (const r of row.risques_detail ?? []) {
      if (/^\d\d$/.test(String(r.num_risque))) labels.add(r.libelle_risque_long);
    }
  }
  out.communes[code] = { ...dvf, risques: [...labels].sort() };
  if (++done % 50 === 0) console.log(`communes : ${done}/${communeCodes.length}`);
});

writeFileSync(join(root, "src/data/local.json"), JSON.stringify(out));
console.log(`Écrit src/data/local.json : ${Object.keys(out.departements).length} départements, ${Object.keys(out.communes).length} communes`);
