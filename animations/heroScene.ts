import { gsap } from "./gsap";
import { registerScrollAnchor } from "./anchors";

type Variant = "desktop" | "tablet";

const q = (root: HTMLElement, sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

/**
 * Escena del plato insignia, controlada por scroll:
 *   intro → plato al centro + zoom sutil → ingredientes → frases →
 *   el plato se desplaza y la misma composición se convierte en "Nuestro picante de cuy".
 *
 * Debe ejecutarse dentro de un gsap.context / matchMedia para que el revert
 * limpie timeline, ScrollTrigger y pin al desmontar o cambiar de breakpoint.
 */
export function createHeroScene(root: HTMLElement, variant: Variant) {
  const stage = root.querySelector<HTMLElement>("[data-stage]")!;
  const composition = root.querySelector<HTMLElement>("[data-composition]")!;
  const plate = root.querySelector<HTMLElement>("[data-plate]")!;
  const introItems = q(root, "[data-intro-item]");
  const ingredients = q(root, "[data-ingredient]").filter((el) => el.offsetParent !== null);
  const [line1, line2] = q(root, "[data-line]");
  const signature = q(root, "[data-signature-item]");

  const isDesktop = variant === "desktop";

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: isDesktop ? "+=340%" : "+=240%",
      pin: true,
      scrub: isDesktop ? 1.1 : 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Zoom extremadamente sutil durante toda la escena.
  tl.fromTo(plate, { scale: 1 }, { scale: isDesktop ? 1.07 : 1.04, duration: 6 }, 0);

  // 1 · El texto principal se disuelve; el plato se acerca al centro.
  tl.to(introItems, { opacity: 0, y: -48, stagger: 0.08, duration: 0.9, ease: "power1.in" }, 0)
    .to(composition, { x: isDesktop ? "-14vw" : "-16vw", y: "2vh", duration: 1.4, ease: "power1.inOut" }, 0.1);

  // 2 · Ingredientes: entran lentos desde distintas direcciones y se asientan.
  ingredients.forEach((el, i) => {
    const fromX = Number(el.dataset.fromX ?? 0);
    const fromY = Number(el.dataset.fromY ?? 0);
    const rotate = Number(el.dataset.rotate ?? 0);
    tl.fromTo(
      el,
      { opacity: 0, x: `${fromX}vw`, y: `${fromY}vh`, rotate, scale: 0.88 },
      { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.6, ease: "power2.out" },
      1.1 + i * 0.28,
    );
  });

  // 3 · Frases.
  tl.fromTo(line1, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.6)
    .fromTo(line2, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.15)
    .to([line1, line2], { opacity: 0, y: -24, duration: 0.6, ease: "power1.in" }, 3.95);

  // 4 · La composición se desplaza y se transforma en "Nuestro picante de cuy".
  tl.to(
    composition,
    { x: "-36vw", scale: isDesktop ? 0.86 : 0.8, duration: 1.3, ease: "power2.inOut" },
    4.35,
  );
  tl.fromTo(
    signature,
    { opacity: 0, x: 48 },
    { opacity: 1, x: 0, stagger: 0.09, duration: 0.9, ease: "power2.out" },
    4.85,
  );
  tl.addLabel("signature", 5.9).to({}, { duration: 0.5 });

  const st = tl.scrollTrigger!;
  const unregister = registerScrollAnchor("picante", () => {
    const progress = tl.labels.signature / tl.duration();
    return st.start + (st.end - st.start) * progress;
  });

  return () => unregister();
}

/** Móvil: sin pin. Solo un leve asentamiento del plato al hacer scroll. */
export function createHeroMobileScene(root: HTMLElement) {
  const plate = root.querySelector<HTMLElement>("[data-plate]");
  const strip = q(root, "[data-strip-item]");
  if (plate) {
    gsap.fromTo(
      plate,
      { scale: 1.06 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: plate, start: "top bottom", end: "bottom center", scrub: true },
      },
    );
  }
  if (strip.length) {
    gsap.from(strip, {
      opacity: 0,
      y: 24,
      stagger: 0.08,
      duration: 0.8,
      scrollTrigger: { trigger: strip[0], start: "top 90%", once: true },
    });
  }
}
