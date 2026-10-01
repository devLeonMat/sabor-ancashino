import type { MediaAsset } from "@/types/media";

/**
 * Catálogo único de fotografías.
 *
 * Todas las imágenes actuales son PROVISIONALES (Unsplash) y solo sirven para
 * construir la composición. Para usar fotografía propia del restaurante:
 *   1. Colocar el archivo en /public/media/... (o subirlo a un CDN permitido en next.config.ts)
 *   2. Cambiar `src`, `alt`, `aspect` y quitar `placeholder`.
 *   3. Para ingredientes recortados con transparencia, marcar `cutout: true`
 *      (la UI deja de aplicar la máscara suave).
 * Ningún componente referencia URLs directamente: solo claves de este archivo.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const media = {
  // ── Plato insignia ───────────────────────────────────────────────
  heroDish: {
    src: unsplash("1631292784640-2b24be784d5d"),
    alt: "Picante de cuy servido en una olla de hierro, salsa de ají panca y hierbas frescas, vista cenital",
    aspect: 1,
    placeholder: true,
  },

  // ── Ingredientes (idealmente recortes con transparencia) ─────────
  ingredientAji: {
    src: unsplash("1588252303782-cb80119abd6d"),
    alt: "Ajíes rojos frescos",
    aspect: 1,
    placeholder: true,
  },
  ingredientPapa: {
    src: unsplash("1518977676601-b53f82aba655"),
    alt: "Papas ancashinas recién cosechadas",
    aspect: 1.5,
    focus: "45% 50%",
    placeholder: true,
  },
  ingredientMaiz: {
    src: unsplash("1551754655-cd27e38d2076"),
    alt: "Mazorcas de maíz con sus hojas",
    aspect: 1.5,
    focus: "30% 50%",
    placeholder: true,
  },
  ingredientHierbas: {
    src: unsplash("1515586000433-45406d8e6662"),
    alt: "Hierbas aromáticas frescas",
    aspect: 0.8,
    focus: "50% 35%",
    placeholder: true,
  },
  ingredientTrigo: {
    src: unsplash("1574323347407-f5e1ad6d020b"),
    alt: "Granos de trigo",
    aspect: 1.36,
    placeholder: true,
  },

  // ── Del origen al plato ─────────────────────────────────────────
  cordillera: {
    src: unsplash("1506905925346-21bda4d32df4"),
    alt: "Picos nevados sobre un mar de nubes al amanecer",
    aspect: 1.5,
    focus: "50% 40%",
    placeholder: true,
  },
  tierra: {
    src: unsplash("1500382017468-9049fed747ef"),
    alt: "Campo de cultivo andino al atardecer",
    aspect: 1.78,
    placeholder: true,
  },
  preparacion: {
    src: unsplash("1528712306091-ed0763094c98"),
    alt: "Manos removiendo un guiso en la sartén",
    aspect: 0.76,
    focus: "50% 55%",
    placeholder: true,
  },
  platoServido: {
    src: unsplash("1534939561126-855b8675edd7"),
    alt: "Plato de guiso rojo recién servido sobre mesa de madera",
    aspect: 0.67,
    focus: "50% 30%",
    placeholder: true,
  },

  // ── Carta ───────────────────────────────────────────────────────
  dishCuchicanca: {
    src: unsplash("1600891964092-4316c288032e"),
    alt: "Carne dorada al horno con papas",
    aspect: 1.5,
    placeholder: true,
  },
  dishLlunca: {
    src: unsplash("1455619452474-d2be8b1e70cd"),
    alt: "Caldo humeante servido en plato hondo",
    aspect: 1.5,
    placeholder: true,
  },
  dishPatasca: {
    src: unsplash("1585937421612-70a008356fbe"),
    alt: "Guiso tradicional servido en cuencos de barro",
    aspect: 0.75,
    placeholder: true,
  },
  dishCharqui: {
    src: unsplash("1588166524941-3bf61a9c41db"),
    alt: "Guiso de carne con salsa y arroz",
    aspect: 0.66,
    placeholder: true,
  },

  // ── Ambiente ────────────────────────────────────────────────────
  mesa: {
    src: unsplash("1414235077428-338989a2e8c0"),
    alt: "Mesa servida en el restaurante",
    aspect: 1.5,
    placeholder: true,
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;
