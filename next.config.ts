import type { NextConfig } from "next";

/**
 * Sitio estático para GitHub Pages.
 * PAGES_BASE_PATH lo inyecta el workflow (ej. "/sabor-ancashino"); en local queda vacío.
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // Sin servidor no hay optimizador de Next: el loader delega en el CDN de la imagen.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    qualities: [60, 75, 85],
  },
};

export default nextConfig;
