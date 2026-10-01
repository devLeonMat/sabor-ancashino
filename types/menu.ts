import type { MediaKey } from "@/data/media";

export type MenuCategoryId =
  | "fondos"
  | "entradas"
  | "caldos"
  | "bebidas"
  | "postres";

export type MenuCategory = {
  id: MenuCategoryId;
  name: string;
  description?: string;
};

export type MenuItem = {
  id: string;
  categoryId: MenuCategoryId;
  name: string;
  description: string;
  /** Precio en soles (PEN). */
  price: number;
  featured?: boolean;
  available?: boolean;
  tags?: Array<"insignia" | "picante" | "para-compartir" | "temporada">;
  image?: MediaKey;
};
