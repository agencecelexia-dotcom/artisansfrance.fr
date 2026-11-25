// Données géographiques officielles pour les pages locales : src/data/geo.json
//
// Sources (toutes ouvertes, Etalab / IGN) :
//   - API Découpage administratif : https://geo.api.gouv.fr (régions, départements, communes, population, centres)
//   - Contours des départements   : https://etalab-datasets.geo.data.gouv.fr/contours-administratifs (adjacence)
//
// Entrée  : src/data/pages.json (produit par build-pages.mjs)
// Sortie  : src/data/geo.json
// Usage   : node scripts/fetch-geo.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pagesPath = join(root, "src/data/pages.json");
const outPath = join(root, "src/data/geo.json");
const API = "https://geo.api.gouv.fr";
const CONTOURS = "https://etalab-datasets.geo.data.gouv.fr/contours-administratifs/latest/geojson/departements-100m.geojson";
const TOP_COMMUNES = 40;
const NEIGHBOUR_CITIES = 8;
const NEIGHBOUR_DEPTS = 6;

const { pages } = JSON.parse(readFileSync(pagesPath, "utf8"));
const deptCodes = [...new Set(pages.filter((p) => p.type === "dept" || p.type === "ville").map((p) => p.deptCode))].sort();
const cityPages = pages.filter((p) => p.type === "ville");

const norm = (s) =>
  s.replace(/œ/gi, "oe").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function get(url) {
  for (let attempt = 1; attempt <= 4; attempt++) {
    const res = await fetch(url, { headers: { accept: "application/json" } });
    if (res.ok) return res.json();
    await new Promise((r) => setTimeout(r, 600 * attempt));
  }
  throw new Error(`Échec de l'appel ${url}`);
}

const km = ([lon1, lat1], [lon2, lat2]) => {
  const rad = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
};

const regions = new Map();
const departements = {};
const communes = {};
const allByDept = new Map();

for (const code of deptCodes) {
  const dep = await get(`${API}/departements/${code}?fields=nom,code,codeRegion`);
  if (!regions.has(dep.codeRegion)) regions.set(dep.codeRegion, (await get(`${API}/regions/${dep.codeRegion}?fields=nom,code`)).nom);
  const list = await get(`${API}/departements/${code}/communes?fields=nom,code,population,codesPostaux,centre,surface`);
  allByDept.set(code, list);
  const ranked = list.filter((c) => typeof c.population === "number").sort((a, b) => b.population - a.population);
  departements[code] = {
    code,
    nom: dep.nom,
    region: regions.get(dep.codeRegion),
    codeRegion: dep.codeRegion,
    nbCommunes: list.length,
    population: ranked.reduce((s, c) => s + c.population, 0),
    // surface en km² (l'API renvoie des hectares) et répartition des communes par taille
    surfaceKm2: Math.round(list.reduce((s, c) => s + (c.surface ?? 0), 0) / 100),
    tranches: {
      moins500: list.filter((c) => (c.population ?? 0) < 500).length,
      de500a2000: list.filter((c) => (c.population ?? 0) >= 500 && (c.population ?? 0) < 2000).length,
      de2000a10000: list.filter((c) => (c.population ?? 0) >= 2000 && (c.population ?? 0) < 10000).length,
      plus10000: list.filter((c) => (c.population ?? 0) >= 10000).length,
    },
    communes: ranked.slice(0, TOP_COMMUNES).map((c) => ({ code: c.code, nom: c.nom, population: c.population, codesPostaux: c.codesPostaux ?? [] })),
    voisins: [],
  };
  console.log(`${code} ${dep.nom} : ${list.length} communes`);
}

// Adjacence des départements : nombre de sommets de contour de l'un à moins de 0,02° (~2 km) de l'autre.
const geo = await get(CONTOURS);
const rings = new Map();
for (const f of geo.features) {
  const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
  rings.set(f.properties.code, polys.flatMap((poly) => poly[0]));
}
const TOL = 0.02;
for (const a of deptCodes) {
  const A = rings.get(a);
  if (!A) continue;
  const scores = [];
  for (const b of deptCodes) {
    if (a === b) continue;
    const B = rings.get(b);
    if (!B) continue;
    let hits = 0;
    for (const [x, y] of A) {
      for (const [u, v] of B) {
        if (Math.abs(x - u) < TOL && Math.abs(y - v) < TOL) { hits++; break; }
      }
    }
    if (hits >= 2) scores.push([b, hits]);
  }
  scores.sort((p, q) => q[1] - p[1]);
  departements[a].voisins = scores.slice(0, NEIGHBOUR_DEPTS).map(([c]) => c);
}

// Communes des pages ville, avec leurs voisines les plus proches du même département.
const villes = {};
const unmatched = [];
for (const p of cityPages) {
  const list = allByDept.get(p.deptCode) ?? [];
  const key = norm(p.ville);
  const c = list.find((x) => norm(x.nom) === key) ?? list.find((x) => norm(x.nom).startsWith(`${key}-`));
  if (!c) { unmatched.push(`${p.ville} (${p.deptCode})`); continue; }
  villes[p.url] = c.code;
  if (communes[c.code]) continue;
  const centre = c.centre?.coordinates;
  const voisines = centre
    ? list
        .filter((x) => x.code !== c.code && (x.population ?? 0) >= 1000 && x.centre)
        .map((x) => ({ x, d: km(centre, x.centre.coordinates) }))
        .sort((p1, p2) => p1.d - p2.d)
        .slice(0, NEIGHBOUR_CITIES)
        .map(({ x, d }) => ({ code: x.code, nom: x.nom, population: x.population, km: Math.round(d) }))
    : [];
  communes[c.code] = {
    code: c.code,
    nom: c.nom,
    population: c.population ?? null,
    codesPostaux: c.codesPostaux ?? [],
    deptCode: p.deptCode,
    centre: centre ? [Number(centre[0].toFixed(4)), Number(centre[1].toFixed(4))] : null,
    surfaceKm2: c.surface ? Math.round(c.surface) / 100 : null,
    rang: 1 + list.filter((x) => (x.population ?? 0) > (c.population ?? 0)).length,
    partDept: departements[p.deptCode].population ? Math.round(((c.population ?? 0) / departements[p.deptCode].population) * 1000) / 10 : null,
    voisines,
  };
}
if (unmatched.length) console.warn(`Communes introuvables (${unmatched.length}) : ${unmatched.join(", ")}`);

const out = {
  source: "geo.api.gouv.fr (Etalab) et contours-administratifs (Etalab / IGN)",
  fetchedAt: new Date().toISOString().slice(0, 10),
  departements,
  communes,
  villes,
};
writeFileSync(outPath, JSON.stringify(out));
console.log(`Écrit ${outPath} : ${Object.keys(departements).length} départements, ${Object.keys(communes).length} communes, ${Object.keys(villes).length} pages ville rattachées`);
