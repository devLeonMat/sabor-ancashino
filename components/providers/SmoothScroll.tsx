"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { resolveScrollAnchor } from "@/animations/anchors";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Instancia única de Lenis expuesta como store externo (sin setState en efectos).
let current: Lenis | null = null;
const listeners = new Set<() => void>();
function setCurrent(instance: Lenis | null) {
  current = instance;
  listeners.forEach((l) => l());
}

export function useLenis() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => null,
  );
}

function headerOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return -(parseFloat(value) * 16 || 72);
}

/**
 * Lenis conducido por el ticker de GSAP: un solo requestAnimationFrame
 * para scroll suave y ScrollTrigger, sin desincronización.
 * Con prefers-reduced-motion no se instancia: scroll nativo.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.9,
      // Touch nativo en móviles: más fiable y sin coste extra.
      syncTouch: false,
    });

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setCurrent(lenis);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", update);
      lenis.destroy();
      setCurrent(null);
    };
  }, [reduced]);

  // Anclas internas: respetan escenas pinneadas (ver animations/anchors.ts).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      if (!id) return;
      const pinned = resolveScrollAnchor(id);
      const target = document.getElementById(id);
      if (pinned === undefined && !target) return;

      event.preventDefault();
      if (current) {
        if (pinned !== undefined) current.scrollTo(pinned, { duration: 1.6 });
        else current.scrollTo(target!, { offset: headerOffset(), duration: 1.6 });
      } else if (pinned !== undefined) {
        window.scrollTo({ top: pinned });
      } else {
        target!.scrollIntoView();
      }
      history.replaceState(null, "", `#${id}`);
      // Accesibilidad: mover el foco a la sección destino.
      if (target && pinned === undefined) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return children;
}
