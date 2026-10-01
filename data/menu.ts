import type { MenuCategory, MenuItem } from "@/types/menu";

/**
 * Carta. Fuente única de datos de platos; mañana se reemplaza por una API/CMS
 * que devuelva la misma forma (`MenuCategory[]`, `MenuItem[]`).
 * TODO: confirmar precios y descripciones con el restaurante.
 */
export const menuCategories: MenuCategory[] = [
  { id: "fondos", name: "Platos de fondo", description: "Recetas de casa, porciones generosas." },
  { id: "entradas", name: "Entradas", description: "Para abrir el apetito o compartir." },
  { id: "caldos", name: "Caldos", description: "Calientes, reconfortantes, de olla grande." },
  { id: "bebidas", name: "Bebidas", description: "Chichas y preparados de la casa." },
  { id: "postres", name: "Postres", description: "El dulce final." },
];

export const menuItems: MenuItem[] = [
  // Platos de fondo
  {
    id: "picante-de-cuy",
    categoryId: "fondos",
    name: "Picante de cuy",
    description: "Cuy entero dorado en aderezo de ají panca, papa huayro, arroz y sarza criolla.",
    price: 58,
    featured: true,
    tags: ["insignia", "picante"],
    image: "heroDish",
  },
  {
    id: "cuchicanca",
    categoryId: "fondos",
    name: "Cuchicanca",
    description: "Lechón macerado en chicha de jora y hierbas, horneado lento hasta dorar.",
    price: 52,
    featured: true,
    image: "dishCuchicanca",
  },
  {
    id: "charqui-con-mote",
    categoryId: "fondos",
    name: "Charqui con mote",
    description: "Charqui desmenuzado guisado con ají, papa amarilla y mote pelado.",
    price: 42,
    image: "dishCharqui",
  },
  {
    id: "patasca-ancashina",
    categoryId: "fondos",
    name: "Patasca ancashina",
    description: "Guiso espeso de mote y mondongo con hierbabuena y rocoto.",
    price: 38,
    image: "dishPatasca",
  },
  {
    id: "pachamanca-olla",
    categoryId: "fondos",
    name: "Pachamanca a la olla",
    description: "Cerdo, pollo y carnero en hierbas andinas, con humita, haba y camote.",
    price: 55,
    tags: ["para-compartir"],
  },
  // Entradas
  {
    id: "ceviche-de-chochos",
    categoryId: "entradas",
    name: "Ceviche de chochos",
    description: "Tarwi, cebolla, tomate y ají limo en limón, con cancha tostada.",
    price: 22,
  },
  {
    id: "papa-a-la-ancashina",
    categoryId: "entradas",
    name: "Papa con queso y ají",
    description: "Papa huayro sancochada, crema de queso fresco y ají de huacatay.",
    price: 18,
  },
  {
    id: "humitas",
    categoryId: "entradas",
    name: "Humitas de la casa",
    description: "Choclo molido con queso fresco y anís, cocidas en panca.",
    price: 15,
    tags: ["temporada"],
  },
  // Caldos
  {
    id: "llunca-de-gallina",
    categoryId: "caldos",
    name: "Llunca de gallina",
    description: "Caldo de gallina de corral con trigo pelado, hierbabuena y papa.",
    price: 32,
    featured: true,
    image: "dishLlunca",
  },
  {
    id: "pecan-caldo",
    categoryId: "caldos",
    name: "Pecán caldo",
    description: "Caldo de cabeza de carnero con mote, menta y ají. Ideal para la mañana.",
    price: 28,
  },
  // Bebidas
  {
    id: "chicha-de-jora",
    categoryId: "bebidas",
    name: "Chicha de jora",
    description: "Fermentada en casa, servida fresca.",
    price: 12,
  },
  {
    id: "chicha-morada",
    categoryId: "bebidas",
    name: "Chicha morada",
    description: "Maíz morado, piña, canela y clavo. Jarra de un litro.",
    price: 16,
  },
  {
    id: "emoliente",
    categoryId: "bebidas",
    name: "Emoliente caliente",
    description: "Cebada tostada, linaza, cola de caballo y limón.",
    price: 8,
  },
  // Postres
  {
    id: "mazamorra-morada",
    categoryId: "postres",
    name: "Mazamorra morada",
    description: "Con frutos secos y canela.",
    price: 12,
  },
  {
    id: "arroz-con-leche",
    categoryId: "postres",
    name: "Arroz con leche",
    description: "Cremoso, con clavo y canela.",
    price: 12,
  },
];

export function getMenu() {
  return { categories: menuCategories, items: menuItems.filter((i) => i.available !== false) };
}
