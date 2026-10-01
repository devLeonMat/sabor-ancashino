import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    // Fotografías temporales. Al migrar a fotos propias en /public o un CDN
    // del restaurante, agregar/quitar el patrón correspondiente.
    // Patrón objeto (no `new URL`): con URL, la query vacía se exige literal
    // y las URLs de Unsplash llevan parámetros (?auto=format&w=...).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
};

export default nextConfig;
