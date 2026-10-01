"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MEDIA } from "@/animations/gsap";
import { createOriginMobileScene, createOriginScene } from "@/animations/originScene";

export function OriginSceneController({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => createOriginScene(el, "desktop"));
      mm.add(MEDIA.tablet, () => createOriginScene(el, "tablet"));
      mm.add(MEDIA.mobile, () => createOriginMobileScene(el));
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="origen" aria-labelledby="origen-titulo" className="relative bg-ink">
      {children}
    </section>
  );
}
