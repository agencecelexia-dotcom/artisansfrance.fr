import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { INDEXING_ON } from "@/config/publication";

// Les robots des moteurs d'IA (recherche et réponses) sont explicitement autorisés : être cité par ChatGPT,
// Perplexity, Claude ou Google IA fait partie de la stratégie GEO du plan.
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  // Tant que l'indexation n'est pas activée (INDEXING=on), le site entier est fermé aux robots.
  if (!INDEXING_ON) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
