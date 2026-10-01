"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registro único de plugins. Todo componente que anime con GSAP importa desde aquí.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power2.out" });
}

/** Breakpoints compartidos con el variant `cine:` de globals.css. */
export const MEDIA = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  tablet: "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
