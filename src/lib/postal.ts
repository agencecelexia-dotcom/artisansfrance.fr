// Code postal -> code de département officiel. Partagé entre le Locator (client) et les pages (serveur).

/** Retourne le code de département (« 77 », « 2A », « 974 ») d'un code postal français à 5 chiffres, ou null. */
export function deptFromPostal(cp: string): string | null {
  if (!/^\d{5}$/.test(cp)) return null;
  const p2 = cp.slice(0, 2);
  const p3 = cp.slice(0, 3);
  if (p2 === "20") {
    // Corse : 200xx et 201xx = Corse-du-Sud, 202xx à 206xx = Haute-Corse
    return Number(p3) <= 201 ? "2A" : "2B";
  }
  if (p2 === "97" || p2 === "98") return p3;
  if (p2 === "00") return null;
  return p2;
}

export interface LocatorData {
  trade: string;
  tradeLabel: string;
  /** Code postal -> URL de la page ville publiée. */
  cities: Record<string, string>;
  /** Code département -> URL de la page département publiée. */
  depts: Record<string, string>;
}

export function resolveLocation(cp: string, data: LocatorData): { url: string; level: "ville" | "departement" } | null {
  const city = data.cities[cp];
  if (city) return { url: city, level: "ville" };
  const dept = deptFromPostal(cp);
  const url = dept ? data.depts[dept] : undefined;
  return url ? { url, level: "departement" } : null;
}
