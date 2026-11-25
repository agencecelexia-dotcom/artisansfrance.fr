"use client";

/** Événement de conversion en première partie : aucun cookie, aucune donnée personnelle. */
export function track(name: "formulaire_debut" | "formulaire_etape" | "formulaire_envoi", data: { page: string; step?: number; trade?: string }) {
  try {
    const body = JSON.stringify({ name, ...data });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/evenement/", new Blob([body], { type: "application/json" }));
    else void fetch("/api/evenement/", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
  } catch {
    /* la mesure ne doit jamais gêner le visiteur */
  }
}
