/**
 * Un asset fotográfico desacoplado de los componentes.
 * Reemplazar `src` por la fotografía definitiva no requiere tocar la UI.
 */
export type MediaAsset = {
  src: string;
  alt: string;
  /** Proporción original (ancho / alto). Útil para reservar espacio. */
  aspect: number;
  /**
   * `true` cuando el archivo es un recorte con transparencia (PNG/WebP/AVIF).
   * Si es `false`, la UI aplica una máscara suave para integrarlo a la composición.
   */
  cutout?: boolean;
  /** Punto focal para object-position, ej. "50% 40%". */
  focus?: string;
  /** Marca fotografías provisionales pendientes de reemplazo. */
  placeholder?: boolean;
};
