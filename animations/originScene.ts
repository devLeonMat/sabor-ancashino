import { gsap } from "./gsap";

type Variant = "desktop" | "tablet";

const q = (root: HTMLElement, sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

/**
 * CORDILLERA → TIERRA → INGREDIENTES → PREPARACIÓN → PLATO
 * Una sola escena pinneada; cada etapa entra con una técnica distinta
 * (scale, máscara inferior, ingredientes, máscara circular, split) para que
 * se lea como composición editorial y no como slideshow.
 */
export function createOriginScene(root: HTMLElement, variant: Variant) {
  const stage = root.querySelector<HTMLElement>("[data-origin-stage]")!;
  const headline = root.querySelector<HTMLElement>("[data-origin-headline]")!;
  const get = (id: string) => root.querySelector<HTMLElement>(`[data-stage-item="${id}"]`)!;
  const text = (id: string) => get(id).querySelector<HTMLElement>("[data-stage-text]")!;
  const figure = (id: string) => get(id).querySelector<HTMLElement>("[data-stage-figure]");
  const img = (id: string) => get(id).querySelector<HTMLElement>("[data-stage-img]");
  const rail = q(root, "[data-rail-item]");
  const ingredients = q(root, "[data-origin-ingredient]");
  const scrim = root.querySelector<HTMLElement>("[data-origin-scrim]")!;
  const platePanel = root.querySelector<HTMLElement>("[data-plate-panel]")!;

  const isDesktop = variant === "desktop";
  const T = { tierra: 1.6, ingredientes: 3.2, preparacion: 5, plato: 6.6 };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: stage,
      start: "top top",
      end: isDesktop ? "+=520%" : "+=380%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const swapText = (from: string, to: string, at: number) => {
    tl.to(text(from), { opacity: 0, y: -24, duration: 0.45, ease: "power1.in" }, at)
      .fromTo(text(to), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, at + 0.4);
  };

  const railTo = (index: number, at: number) => {
    rail.forEach((item, i) => {
      tl.to(item, { opacity: i === index ? 1 : 0.35, duration: 0.3 }, at);
    });
  };

  // 01 · Cordillera: lento acercamiento y titular.
  tl.fromTo(img("cordillera"), { scale: 1.18 }, { scale: 1, duration: T.tierra + 0.6 }, 0)
    .to(headline, { opacity: 0, y: -60, duration: 0.7, ease: "power1.in" }, 0.9);

  // 02 · Tierra: la foto sube como una máscara desde el suelo.
  tl.fromTo(
    figure("tierra"),
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.inOut" },
    T.tierra,
  ).fromTo(img("tierra"), { scale: 1.25, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.6 }, T.tierra);
  swapText("cordillera", "tierra", T.tierra);
  railTo(1, T.tierra + 0.4);

  // 03 · Ingredientes: se oscurece la tierra y los productos llegan desde sus bordes.
  tl.to(scrim, { opacity: 1, duration: 0.6 }, T.ingredientes);
  ingredients.forEach((el, i) => {
    tl.fromTo(
      el,
      {
        opacity: 0,
        x: `${Number(el.dataset.fromX)}vw`,
        y: `${Number(el.dataset.fromY)}vh`,
        rotate: Number(el.dataset.rotate),
        scale: 0.9,
      },
      { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.2, ease: "power2.out" },
      T.ingredientes + 0.15 + i * 0.18,
    );
  });
  swapText("tierra", "ingredientes", T.ingredientes);
  railTo(2, T.ingredientes + 0.4);

  // 04 · Preparación: los ingredientes se recogen hacia el centro, la olla se abre en círculo.
  tl.to(
    ingredients,
    { x: 0, y: 0, left: "50%", top: "55%", scale: 0.4, opacity: 0, stagger: 0.05, duration: 0.9, ease: "power2.in" },
    T.preparacion - 0.2,
  )
    .fromTo(
      figure("preparacion"),
      { clipPath: "circle(0% at 50% 55%)" },
      { clipPath: "circle(75% at 50% 55%)", duration: 1.2, ease: "power2.inOut" },
      T.preparacion + 0.3,
    )
    .fromTo(img("preparacion"), { scale: 1.2 }, { scale: 1, duration: 1.7 }, T.preparacion + 0.3);
  swapText("ingredientes", "preparacion", T.preparacion);
  railTo(3, T.preparacion + 0.4);

  // 05 · Plato: composición partida. El plato servido sube; el titular vuelve.
  tl.fromTo(platePanel, { opacity: 0, xPercent: -12 }, { opacity: 1, xPercent: 0, duration: 0.8, ease: "power2.out" }, T.plato)
    .fromTo(
      figure("plato"),
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.inOut" },
      T.plato,
    )
    .fromTo(img("plato"), { scale: 1.2 }, { scale: 1.02, duration: 1.8 }, T.plato);
  swapText("preparacion", "plato", T.plato);
  railTo(4, T.plato + 0.4);

  tl.to({}, { duration: 0.6 });
}

/** Móvil / tablet pequeña sin pin: revelados discretos por bloque. */
export function createOriginMobileScene(root: HTMLElement) {
  q(root, "[data-stage-img]").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 1.12 },
      { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });
  q(root, "[data-reveal]").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}
