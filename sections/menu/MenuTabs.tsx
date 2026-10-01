"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/ui/Photo";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { MenuCategory, MenuCategoryId, MenuItem } from "@/types/menu";
import type { MediaKey } from "@/data/media";

const tagLabel: Record<NonNullable<MenuItem["tags"]>[number], string> = {
  insignia: "Insignia",
  picante: "Picante",
  "para-compartir": "Para compartir",
  temporada: "Temporada",
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MenuTabs({ categories, items }: { categories: MenuCategory[]; items: MenuItem[] }) {
  const [active, setActive] = useState<MenuCategoryId>(categories[0].id);
  const reduced = useReducedMotion();
  const baseId = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const visible = items.filter((i) => i.categoryId === active);
  const category = categories.find((c) => c.id === active)!;
  const lead = visible.find((i) => i.featured && i.image) ?? visible.find((i) => i.image);
  const leadImage: MediaKey = lead?.image ?? "mesa";

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + categories.length) % categories.length;
    setActive(categories[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      {/* Foto protagonista de la categoría */}
      <div className="relative order-2 lg:order-1">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={leadImage}
              className="grain absolute inset-0"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <Photo asset={leadImage} sizes="(min-width: 1024px) 40vw, 100vw" />
            </motion.div>
          </AnimatePresence>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          {lead ? (
            <p className="absolute bottom-5 left-5 font-display text-xl text-cream italic">{lead.name}</p>
          ) : null}
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div
          role="tablist"
          aria-label="Categorías de la carta"
          className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categories.map((c, i) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${baseId}-tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(c.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                  selected ? "text-ink" : "text-cream-2 hover:text-cream",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId={`${baseId}-pill`}
                    className="absolute inset-0 -z-0 rounded-full bg-cream"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{c.name}</span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${active}`} className="mt-8 min-h-[28rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              {category.description ? <p className="text-cream-2">{category.description}</p> : null}
              <ul className="mt-6 divide-y divide-cream/10 border-y border-cream/10">
                {visible.map((item) => (
                  <li key={item.id} className="py-6">
                    <div className="flex items-baseline gap-4">
                      <h3 className="font-display text-2xl leading-tight text-cream md:text-[1.7rem]">{item.name}</h3>
                      <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-cream/25" />
                      <p className="font-display text-xl text-maiz tabular-nums">{formatPrice(item.price)}</p>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream-2">{item.description}</p>
                    {item.tags?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <li
                            key={t}
                            className={cn(
                              "rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase",
                              t === "insignia" ? "border-aji text-aji" : "border-cream/20 text-cream-2",
                            )}
                          >
                            {tagLabel[t]}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
