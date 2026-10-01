# Contexto actual

**Fecha:** 2026-09-30
**Estado:** v1 completa construida. Lint y build en verde. Pendiente verificación visual del usuario.

## Hecho
- Scaffold Next 16 + Tailwind v4 + Motion + GSAP/ScrollTrigger + Lenis.
- Hero storytelling pinneado (Picante de cuy): intro → plato centrado + zoom sutil → ingredientes → frases → transición a "Nuestro picante de cuy" (misma composición).
- "Del origen al plato" pinneado: cordillera → tierra → ingredientes → preparación → plato, con riel de progreso.
- Carta con tabs (Motion), reservas WhatsApp (fecha/hora/personas + preview del mensaje), Visítanos, header + menú móvil, barra de acciones móvil.

## Pendiente / decisiones abiertas
- Reemplazar fotos Unsplash por fotografía real (ver `data/media.ts`). Ingredientes ideales: recortes PNG/WebP/AVIF transparentes → `cutout: true`.
- Datos reales: WhatsApp, teléfono, dirección, Maps, redes, dominio (`lib/site-config.ts`), precios de la carta.
- Ajuste fino de tiempos/posiciones de las escenas tras revisión visual.
- Lighthouse en build de producción (objetivo > 90).
- Repo en GitHub + deploy con GitHub Actions → Vercel. Falta secreto VERCEL_TOKEN.
