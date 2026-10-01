"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MEDIA } from "@/animations/gsap";
import { createHeroScene, createHeroMobileScene } from "@/animations/heroScene";

/**
 * Solo comportamiento: el markup llega renderizado desde el servidor como `children`.
 * gsap.matchMedia crea una escena distinta por breakpoint y la revierte al salir de él.
 */
export function HeroSceneController({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => createHeroScene(el, "desktop"));
      mm.add(MEDIA.tablet, () => createHeroScene(el, "tablet"));
      mm.add(MEDIA.mobile, () => createHeroMobileScene(el));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="inicio" aria-label="Sabores de nuestra tierra" className="relative">
      {children}
    </section>
  );
}
