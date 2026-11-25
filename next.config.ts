import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URLs du plan de pages : toujours avec slash final (/couvreur/77-seine-et-marne/).
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // La géolocalisation n'est demandée qu'au clic sur « Utiliser ma position ».
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
  async redirects() {
    // Anciennes URLs de l'annuaire (sitemap d'avant la refonte) : on conserve les liens existants.
    return [
      { source: "/ajouter-mon-entreprise", destination: "/artisans/", permanent: true },
      { source: "/a-propos", destination: "/comment-ca-marche/", permanent: true },
      { source: "/carte", destination: "/zones/", permanent: true },
      { source: "/artisan/:id", destination: "/", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
