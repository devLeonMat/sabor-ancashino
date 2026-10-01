import type { MediaKey } from "./media";

/** Copys del storytelling principal. */
export const heroStory = {
  eyebrow: "Cocina ancashina · Desde Carhuaz",
  titleLines: ["Sabores", "de nuestra", "tierra"],
  subtitle:
    "Cocina ancashina hecha como en casa, con ingredientes de nuestra tierra y recetas que atraviesan generaciones.",
  lines: ["Una receta que atraviesa generaciones.", "Carhuaz · Áncash"],
};

export type HeroIngredient = {
  key: MediaKey;
  label: string;
  /** Posición final relativa al plato (en % del contenedor de la composición). */
  x: number;
  y: number;
  /** Tamaño relativo al plato (1 = mismo diámetro). */
  size: number;
  /** Desde dónde entra (en vw/vh relativos). */
  from: { x: number; y: number; rotate: number };
  /** Si es `false`, se omite en tablet para simplificar la escena. */
  tablet?: boolean;
};

/** Ingredientes que rodean al plato. Posiciones pensadas sobre un plato centrado. */
export const heroIngredients: HeroIngredient[] = [
  { key: "ingredientAji", label: "Ají", x: -46, y: -30, size: 0.36, from: { x: -40, y: -20, rotate: -18 }, tablet: true },
  { key: "ingredientPapa", label: "Papa ancashina", x: 50, y: 30, size: 0.42, from: { x: 40, y: 25, rotate: 14 }, tablet: true },
  { key: "ingredientMaiz", label: "Maíz", x: 46, y: -36, size: 0.32, from: { x: 35, y: -35, rotate: 10 } },
  { key: "ingredientHierbas", label: "Hierbas aromáticas", x: -44, y: 38, size: 0.3, from: { x: -35, y: 30, rotate: -8 } },
];

export const signatureDish = {
  id: "signature",
  eyebrow: "Plato insignia",
  title: ["Nuestro", "picante de cuy"],
  body: "Cuy dorado entero, bañado en un aderezo de ají panca molido en batán, servido con papa ancashina sancochada, arroz graneado y sarza de cebolla. La receta de la abuela, sin atajos.",
  details: [
    { label: "Ají", value: "Panca molido en batán" },
    { label: "Papa", value: "Huayro de Carhuaz" },
    { label: "Tiempo", value: "Seis horas de preparación" },
  ],
  price: 58,
};

export type OriginStage = {
  id: string;
  index: string;
  label: string;
  title: string;
  caption: string;
  image?: MediaKey;
};

export const originStory = {
  eyebrow: "Del origen al plato",
  headline: "Todo comienza en nuestra tierra.",
  stages: [
    {
      id: "cordillera",
      index: "01",
      label: "Cordillera Blanca",
      title: "El deshielo que riega el valle",
      caption: "Las aguas de los nevados bajan por el Callejón de Huaylas y alimentan cada chacra.",
      image: "cordillera",
    },
    {
      id: "tierra",
      index: "02",
      label: "Tierra",
      title: "Chacras a tres mil metros",
      caption: "Suelos fríos y generosos donde la papa, el maíz y el trigo crecen despacio.",
      image: "tierra",
    },
    {
      id: "ingredientes",
      index: "03",
      label: "Ingredientes",
      title: "Lo que la tierra nos da",
      caption: "Papa, maíz, trigo, ajíes y hierbas que llegan directo de productores ancashinos.",
    },
    {
      id: "preparacion",
      index: "04",
      label: "Preparación",
      title: "Fuego lento, manos pacientes",
      caption: "Aderezos molidos en batán y ollas que hierven durante horas, como en casa.",
      image: "preparacion",
    },
    {
      id: "plato",
      index: "05",
      label: "Plato",
      title: "Servido en tu mesa",
      caption: "Una historia que empieza en la cordillera y termina en cada cucharada.",
      image: "platoServido",
    },
  ] satisfies OriginStage[],
  ingredients: [
    { key: "ingredientPapa", label: "Papa" },
    { key: "ingredientMaiz", label: "Maíz" },
    { key: "ingredientTrigo", label: "Trigo" },
    { key: "ingredientAji", label: "Ajíes" },
    { key: "ingredientHierbas", label: "Hierbas" },
  ] satisfies Array<{ key: MediaKey; label: string }>,
};
