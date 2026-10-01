import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";
import { heroIngredients, heroStory, signatureDish } from "@/data/story";
import { formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { HeroSceneController } from "./HeroSceneController";

/**
 * Hero + "Nuestro picante de cuy" comparten una sola composición.
 *
 * Dos layouts desde el mismo DOM, decididos en CSS:
 *  - base / `still:` → flujo vertical (móvil y prefers-reduced-motion), todo visible.
 *  - `cine:`        → escenario fijo de 100svh con capas absolutas que anima GSAP.
 */
export function HeroSection() {
  return (
    <HeroSceneController>
      <div
        data-stage
        className="relative isolate overflow-hidden bg-ink cine:h-svh"
      >
        {/* Luz cálida de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_55%,rgba(155,47,28,0.35),transparent_60%),radial-gradient(ellipse_at_15%_20%,rgba(216,134,47,0.12),transparent_55%)]"
        />

        {/* ── Intro ─────────────────────────────────────────────── */}
        <div
          className={cn(
            "relative z-20 px-5 pt-[calc(var(--header-h)+2.5rem)] sm:px-8",
            "still:md:grid still:md:min-h-svh still:md:grid-cols-2 still:md:items-center still:md:gap-10 still:md:px-[6vw] still:md:pt-[var(--header-h)]",
            "cine:pointer-events-none cine:absolute cine:inset-y-0 cine:left-0 cine:flex cine:w-[60vw] cine:flex-col cine:justify-center cine:pl-[6vw] cine:pt-[var(--header-h)] lg:cine:w-[52vw]",
          )}
        >
          <div className="cine:pointer-events-auto">
            <div data-intro-item>
              <Eyebrow>{heroStory.eyebrow}</Eyebrow>
            </div>
            <h1 className="mt-6 font-display text-[clamp(3.6rem,15vw,5.5rem)] leading-[0.86] font-medium tracking-[-0.035em] text-cream uppercase md:text-[clamp(4.5rem,9.2vw,9.75rem)]">
              {heroStory.titleLines.map((line, i) => (
                <span key={line} data-intro-item className={cn("block", i === 1 && "pl-[0.6em] italic font-normal normal-case text-maiz")}>
                  {line}
                </span>
              ))}
            </h1>
            <p data-intro-item className="mt-7 max-w-md text-base leading-relaxed text-cream-2 md:text-lg">
              {heroStory.subtitle}
            </p>
            <div data-intro-item className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#reservas" icon={<ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />} className="flex-row-reverse">
                Reservar mesa
              </ButtonLink>
              <ButtonLink href="#carta" variant="ghost">
                Ver la carta
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Scrim para legibilidad del texto sobre la foto en el layout cine */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[55vw] bg-gradient-to-r from-ink/85 via-ink/40 to-transparent cine:block" data-intro-item />

        {/* ── Composición: plato + ingredientes ─────────────────── */}
        <div
          data-composition
          className={cn(
            "relative mx-auto mt-4 aspect-square w-[118vw] max-sm:-translate-x-[9vw] sm:w-[92vw]",
            "still:md:absolute still:md:top-[50svh] still:md:right-[-4vw] still:md:mt-0 still:md:w-[54vw] still:md:-translate-y-1/2",
            "cine:absolute cine:top-1/2 cine:left-1/2 cine:mt-0 cine:w-[min(84svh,56vw)] cine:[translate:calc(-50%+16vw)_-50%] lg:cine:[translate:calc(-50%+14vw)_-50%]",
          )}
        >
          <div data-plate className="absolute inset-0 will-change-transform">
            <Photo
              asset="heroDish"
              preload
              quality={85}
              sizes="(min-width: 768px) 60vw, 118vw"
              className="mask-plate"
            />
          </div>

          {heroIngredients.map((ing) => (
            <div
              key={ing.key}
              data-ingredient
              data-from-x={ing.from.x}
              data-from-y={ing.from.y}
              data-rotate={ing.from.rotate}
              className={cn(
                "absolute hidden aspect-square opacity-0 cine:block",
                !ing.tablet && "md:max-lg:hidden!",
              )}
              style={{
                left: `${50 + ing.x}%`,
                top: `${50 + ing.y}%`,
                width: `${ing.size * 100}%`,
                translate: "-50% -50%",
              }}
            >
              <Photo asset={ing.key} soft sizes="22vw" quality={60} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[0.65rem] font-semibold tracking-[0.25em] whitespace-nowrap text-cream-2/80 uppercase">
                {ing.label}
              </span>
            </div>
          ))}
        </div>

        {/* Ingredientes en móvil / reduced-motion: tira estática */}
        <ul className="relative z-10 -mt-6 flex justify-center gap-4 px-5 cine:hidden still:md:hidden" aria-label="Ingredientes del picante">
          {heroIngredients.map((ing) => (
            <li key={ing.key} data-strip-item className="flex w-[4.5rem] flex-col items-center gap-2 text-center">
              <span className="relative block size-16 overflow-hidden rounded-full ring-1 ring-cream/15">
                <Photo asset={ing.key} sizes="64px" quality={60} />
              </span>
              <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-cream-2 uppercase">{ing.label}</span>
            </li>
          ))}
        </ul>

        {/* ── Frases ─────────────────────────────────────────────── */}
        <div className="relative z-20 px-5 py-16 text-center cine:pointer-events-none cine:absolute cine:inset-x-0 cine:bottom-[9svh] cine:py-0">
          <p data-line className="font-display text-[clamp(1.8rem,4.2vw,3.4rem)] leading-tight font-light italic text-cream cine:opacity-0">
            {heroStory.lines[0]}
          </p>
          <p data-line className="mt-4 text-xs font-semibold tracking-[0.5em] text-aji uppercase cine:opacity-0">
            {heroStory.lines[1]}
          </p>
        </div>

        {/* ── Nuestro picante de cuy ────────────────────────────── */}
        <div
          id="picante"
          className={cn(
            "relative z-20 px-5 pb-24 sm:px-8",
            "still:md:mx-auto still:md:max-w-3xl still:md:text-center",
            "cine:absolute cine:top-1/2 cine:right-[4vw] cine:w-[46vw] cine:-translate-y-1/2 cine:pb-0 lg:cine:right-[6vw] lg:cine:w-[38vw]",
          )}
        >
          <div data-signature-item className="cine:opacity-0">
            <Eyebrow className="still:md:justify-center">{signatureDish.eyebrow}</Eyebrow>
          </div>
          <h2 data-signature-item className="mt-5 font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.03em] text-cream uppercase cine:opacity-0">
            <span className="block">{signatureDish.title[0]}</span>
            <span className="block italic font-normal normal-case text-maiz">{signatureDish.title[1]}</span>
          </h2>
          <p data-signature-item className="mt-6 max-w-lg text-base leading-relaxed text-cream-2 still:md:mx-auto cine:opacity-0">
            {signatureDish.body}
          </p>
          <dl data-signature-item className="mt-8 grid grid-cols-3 gap-4 border-y border-cream/10 py-5 text-left cine:opacity-0">
            {signatureDish.details.map((d) => (
              <div key={d.label}>
                <dt className="text-[0.65rem] font-semibold tracking-[0.22em] text-aji uppercase">{d.label}</dt>
                <dd className="mt-1.5 text-sm leading-snug text-cream">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div data-signature-item className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 still:md:justify-center cine:opacity-0">
            <p className="font-display text-3xl text-cream">{formatPrice(signatureDish.price)}</p>
            <ButtonLink
              href={whatsappUrl("Hola, quisiera reservar para probar el picante de cuy.")}
              variant="whatsapp"
              icon={<WhatsAppIcon className="size-4" />}
            >
              Reservar por WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </HeroSceneController>
  );
}
