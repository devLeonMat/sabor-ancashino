@AGENTS.md

# Sabor Ancashino — Landing

Experiencia web gastronómica (cocina ancashina). Frontend-first, sin backend.

## Stack
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion (`motion/react`) · GSAP + ScrollTrigger (`@gsap/react`) · Lenis · next/image · Vercel.
Sin Three.js/WebGL. No agregar librerías sin justificación.

## Comandos
- `pnpm dev` — servidor de desarrollo (http://localhost:3000)
- `pnpm build` — build de producción (también genera tipos `LayoutProps`)
- `pnpm lint` — ESLint
- `pnpm exec tsc --noEmit` — typecheck (correr `pnpm build` o `pnpm next typegen` antes si falta `LayoutProps`)

## Rutas clave
- `app/page.tsx` — solo compone secciones (Server Component)
- `sections/<nombre>/` — `XSection.tsx` (markup, server) + `XSceneController.tsx` (client, solo comportamiento GSAP)
- `animations/` — escenas GSAP (`heroScene.ts`, `originScene.ts`), registro de plugins (`gsap.ts`), anclas en escenas pinneadas (`anchors.ts`)
- `components/providers/SmoothScroll.tsx` — Lenis + ticker GSAP + navegación por anclas
- `components/ui/` — `Photo`, `ButtonLink`, `Reveal` (Motion), `Eyebrow`, iconos
- `components/layout/` — Header (menú móvil), Footer, MobileActionBar
- `data/` — `media.ts` (TODAS las fotos), `menu.ts`, `story.ts` (copys + ingredientes), `navigation.ts`
- `lib/` — `site-config.ts` (WhatsApp, dirección, horarios), `reservation.ts`, `whatsapp.ts`, `format.ts`
- `types/` — `media.ts`, `menu.ts`, `reservation.ts` (`ReservationChannel`)

## Decisiones (ADRs)
1. **Layout de escenas en CSS, no JS.** Variants en `app/globals.css`:
   `cine:` = ≥768px + sin reduced-motion (capas absolutas, escenario 100svh pinneado);
   `still:` = móvil o reduced-motion (flujo vertical, todo visible). Evita CLS al hidratar y da versión estática elegante.
2. **Markup server, comportamiento client.** Los `*SceneController` reciben el markup como `children`; solo ellos llevan `"use client"`.
3. **GSAP solo para scroll** (pin, scrub, máscaras, clip-path). Motion para UI (menú, tabs, botones, reveals). CSS para hovers simples.
4. **`gsap.matchMedia`** crea escenas distintas por breakpoint (desktop completa, tablet simplificada, móvil sin pin) y se revierte en cleanup (`useGSAP` + `mm.revert()`).
5. **Lenis conducido por `gsap.ticker`** (un solo RAF) + `ScrollTrigger.update` en scroll. No se instancia con reduced-motion.
6. **Anclas dentro de escenas pinneadas** (`#picante`) se resuelven vía `registerScrollAnchor` → posición real del timeline.
7. **Fotos desacopladas:** componentes usan claves de `data/media.ts`, nunca URLs. `cutout: true` para recortes transparentes (sin máscara).
8. **Reservas por canal:** `ReservationChannel` (hoy WhatsApp). Futuro: API NestJS + Prisma + PostgreSQL implementando la misma interfaz. Redis solo si hay caso real.

## Restricciones
- Next 16: `priority` está deprecado → usar `preload` solo en la imagen LCP (plato del hero). `images.qualities` es obligatorio (`[60,75,85]`).
- Fotos actuales: Unsplash provisionales (`placeholder: true`). Datos de negocio con `TODO` en `lib/site-config.ts` y precios en `data/menu.ts`.
- Respetar `prefers-reduced-motion` en todo componente nuevo.
- No convertir secciones enteras en Client Components.

## Workflow
- El usuario verifica visualmente en el browser; no usar herramientas de browser para verificar salvo pedido explícito.
- Antes de terminar: `pnpm lint` y `pnpm build` en verde.
- Edits quirúrgicos; mantener `.claude/context.md` al día.

## Despliegue
- Repo: github.com/devLeonMat/sabor-ancashino (rama `main`).
- `.github/workflows/deploy.yml`: lint + build en cada push/PR; deploy a Vercel con CLI (`main` → producción, PR → preview).
- Requiere secreto de repo `VERCEL_TOKEN`. El proyecto Vercel (`sabor-ancashino`, scope `leonmatiaswork-9958s-projects`) lo crea/enlaza `vercel link` en el primer run.
- No conectar además la integración Git de Vercel: duplicaría deploys.
