import type { ImageLoaderProps } from "next/image";

/**
 * Loader para export estático (GitHub Pages).
 * - Unsplash: su CDN redimensiona y negocia AVIF/WebP (`auto=format`).
 * - Archivos locales (/media/...): se sirven tal cual, con el basePath de Pages.
 * Al migrar a fotos propias en un CDN con transformaciones (Cloudinary, imgix…),
 * agregar aquí su rama.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    return url.toString();
  }
  if (src.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
  }
  return src;
}
