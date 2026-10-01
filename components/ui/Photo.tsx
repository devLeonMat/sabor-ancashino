import Image, { type ImageProps } from "next/image";
import { media, type MediaKey } from "@/data/media";
import { cn } from "@/lib/cn";

type PhotoProps = Omit<ImageProps, "src" | "alt" | "fill"> & {
  asset: MediaKey;
  /** Aplica la máscara suave cuando el asset no es un recorte transparente. */
  soft?: boolean;
  alt?: string;
};

/**
 * Fotografía a sangre dentro de su contenedor (que debe tener tamaño y `position`).
 * Lee todo desde data/media.ts, por lo que cambiar una foto no toca componentes.
 */
export function Photo({ asset, soft, className, style, alt, quality = 75, ...rest }: PhotoProps) {
  const item = media[asset];
  const cutout = "cutout" in item && item.cutout;
  const focus = "focus" in item ? item.focus : undefined;
  return (
    <Image
      src={item.src}
      alt={alt ?? item.alt}
      fill
      quality={quality}
      className={cn(cutout ? "object-contain" : "object-cover", soft && !cutout && "mask-soft", className)}
      style={{ objectPosition: focus, ...style }}
      {...rest}
    />
  );
}
