import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { originStory, type OriginStage } from "@/data/story";
import { cn } from "@/lib/cn";
import { OriginSceneController } from "./OriginSceneController";

/** Posiciones editoriales de los ingredientes en la escena cine (% del escenario). */
const ingredientLayout = [
  { x: 22, y: 34, size: "min(30vh,22vw)", from: { x: -30, y: 10, rotate: -10 } },
  { x: 44, y: 70, size: "min(26vh,19vw)", from: { x: -5, y: 40, rotate: 8 } },
  { x: 58, y: 28, size: "min(22vh,16vw)", from: { x: 10, y: -40, rotate: -6 } },
  { x: 76, y: 58, size: "min(28vh,20vw)", from: { x: 35, y: 15, rotate: 12 } },
  { x: 88, y: 24, size: "min(18vh,13vw)", from: { x: 30, y: -30, rotate: -14 } },
];

const figureInitial: Record<string, string> = {
  tierra: "cine:[clip-path:inset(100%_0%_0%_0%)]",
  preparacion: "cine:[clip-path:circle(0%_at_50%_55%)]",
  plato: "cine:[clip-path:inset(100%_0%_0%_0%)] cine:left-1/2",
};

function StageText({ stage, first, cta }: { stage: OriginStage; first: boolean; cta?: boolean }) {
  return (
    <div
      data-stage-text
      data-reveal
      className={cn(
        "relative px-5 pt-8 pb-4 sm:px-8",
        "cine:absolute cine:bottom-[9svh] cine:left-[6vw] cine:max-w-md cine:p-0",
        stage.id === "plato" && "cine:bottom-auto cine:top-1/2 cine:-translate-y-1/2 cine:max-w-[36vw]",
        !first && "cine:opacity-0",
      )}
    >
      <p className="font-display text-sm text-aji italic">
        {stage.index} — {stage.label}
      </p>
      {stage.id === "plato" ? (
        <p className="mt-3 font-display text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.03em] text-cream">
          {originStory.headline}
        </p>
      ) : null}
      <h3 className="mt-3 font-display text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-cream">
        {stage.title}
      </h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-2 md:text-base">{stage.caption}</p>
      {cta ? (
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#carta">Descubre la carta</ButtonLink>
          <ButtonLink href="#reservas" variant="ghost">Reservar</ButtonLink>
        </div>
      ) : null}
    </div>
  );
}

export function OriginSection() {
  const { stages, ingredients } = originStory;

  return (
    <OriginSceneController>
      <div data-origin-stage className="relative isolate overflow-hidden cine:h-svh">
        {/* Titular inicial */}
        <div
          data-origin-headline
          className="relative z-30 px-5 pt-24 pb-10 sm:px-8 cine:pointer-events-none cine:absolute cine:inset-0 cine:flex cine:flex-col cine:items-center cine:justify-center cine:p-0 cine:text-center"
        >
          <Eyebrow className="cine:justify-center">{originStory.eyebrow}</Eyebrow>
          <h2
            id="origen-titulo"
            className="mt-5 max-w-4xl font-display text-[clamp(2.6rem,7.5vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.035em] text-cream cine:drop-shadow-[0_4px_40px_rgba(0,0,0,0.5)]"
          >
            {originStory.headline}
          </h2>
        </div>

        <ol className="relative">
          {stages.map((stage, i) => {
            const isIngredients = stage.id === "ingredientes";
            const isPlate = stage.id === "plato";
            return (
              <li
                key={stage.id}
                data-stage-item={stage.id}
                className={cn("relative pb-14 cine:absolute cine:inset-0 cine:h-svh cine:pb-0", isPlate && "z-10")}
              >
                {isPlate ? (
                  <div
                    data-plate-panel
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 hidden w-1/2 bg-ink cine:block cine:opacity-0"
                  />
                ) : null}

                {stage.image ? (
                  <div
                    data-stage-figure
                    className={cn(
                      "grain relative mx-5 aspect-[4/5] overflow-hidden rounded-sm sm:mx-8 sm:aspect-[16/10]",
                      "cine:absolute cine:inset-0 cine:mx-0 cine:aspect-auto cine:rounded-none",
                      figureInitial[stage.id],
                    )}
                  >
                    <div data-stage-img className="absolute inset-0 will-change-transform">
                      <Photo
                        asset={stage.image}
                        sizes={isPlate ? "(min-width: 768px) 50vw, 100vw" : "100vw"}
                        quality={i === 0 ? 75 : 60}
                      />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
                  </div>
                ) : null}

                {isIngredients ? (
                  <>
                    <div data-origin-scrim aria-hidden="true" className="absolute inset-0 hidden bg-ink/75 cine:block cine:opacity-0" />
                    <ul className="grid grid-cols-3 gap-x-3 gap-y-6 px-5 sm:grid-cols-5 sm:px-8 cine:absolute cine:inset-0 cine:block cine:p-0">
                      {ingredients.map((ing, j) => {
                        const layout = ingredientLayout[j];
                        return (
                          <li
                            key={ing.key}
                            data-origin-ingredient
                            data-reveal
                            data-from-x={layout.from.x}
                            data-from-y={layout.from.y}
                            data-rotate={layout.from.rotate}
                            className="flex flex-col items-center gap-3 cine:absolute cine:top-[var(--y)] cine:left-[var(--x)] cine:-translate-x-1/2 cine:-translate-y-1/2 cine:opacity-0"
                            style={{ "--x": `${layout.x}%`, "--y": `${layout.y}%`, "--s": layout.size } as React.CSSProperties}
                          >
                            <span className="relative block aspect-square w-full overflow-hidden rounded-full cine:w-[var(--s)] cine:overflow-visible cine:rounded-none">
                              <Photo asset={ing.key} sizes="(min-width: 768px) 22vw, 33vw" quality={60} className="cine:mask-soft" />
                            </span>
                            <span className="text-[0.65rem] font-semibold tracking-[0.25em] text-cream-2 uppercase">{ing.label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : null}

                <StageText stage={stage} first={i === 0} cta={isPlate} />
              </li>
            );
          })}
        </ol>

        {/* Riel de progreso (solo cine) */}
        <ol aria-hidden="true" className="absolute top-1/2 right-[3vw] z-40 hidden -translate-y-1/2 flex-col gap-4 text-right cine:flex">
          {stages.map((stage, i) => (
            <li key={stage.id} data-rail-item className={cn("text-[0.65rem] font-semibold tracking-[0.25em] text-cream uppercase", i > 0 && "opacity-35")}>
              {stage.label} <span className="ml-2 font-display text-aji">{stage.index}</span>
            </li>
          ))}
        </ol>
      </div>
    </OriginSceneController>
  );
}
