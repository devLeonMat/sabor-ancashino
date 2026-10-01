"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/lib/site-config";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));

  // Bloquea el scroll mientras el menú móvil está abierto.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "flex h-[var(--header-h)] items-center justify-between px-5 transition-[background-color,backdrop-filter,border-color] duration-500 sm:px-8 lg:px-[6vw]",
          solid && !open ? "border-b border-cream/5 bg-ink/75 backdrop-blur-md" : "border-b border-transparent",
        )}
      >
        <a href="#inicio" className="relative z-10 font-display text-xl tracking-tight text-cream" aria-label={`${siteConfig.name}, ir al inicio`}>
          Sabor <span className="italic text-maiz">Ancashino</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="group relative text-sm text-cream-2 transition-colors hover:text-cream">
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-aji transition-transform duration-500 ease-out-soft group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#reservas"
            className="rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-maiz"
          >
            Reservar
          </a>
        </nav>

        <button
          type="button"
          className="relative z-10 -mr-2 grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <motion.span
              className="absolute top-0 left-0 h-px w-full bg-cream"
              animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.4, ease }}
            />
            <motion.span
              className="absolute bottom-0 left-0 h-px w-full bg-cream"
              animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.4, ease }}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 flex flex-col justify-end bg-ink px-5 pt-[var(--header-h)] pb-10 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <nav aria-label="Menú móvil">
              <ul className="grid gap-2">
                {[...navigation, { href: "#reservas", label: "Reservar" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-display text-5xl tracking-tight text-cream"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <p className="mt-12 text-sm text-cream-2">
              {siteConfig.address.line} · {siteConfig.address.city}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
