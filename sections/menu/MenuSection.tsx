import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getMenu } from "@/data/menu";
import { MenuTabs } from "./MenuTabs";

export function MenuSection() {
  const { categories, items } = getMenu();
  return (
    <section id="carta" aria-labelledby="carta-titulo" className="relative bg-ink-2 px-5 py-24 sm:px-8 md:py-36 lg:px-[6vw]">
      <Reveal className="max-w-3xl">
        <Eyebrow>La carta</Eyebrow>
        <h2 id="carta-titulo" className="mt-5 font-display text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.92] font-medium tracking-[-0.035em] text-cream">
          Recetas de casa, <span className="italic font-normal text-maiz">sin atajos.</span>
        </h2>
      </Reveal>
      <div className="mt-14 md:mt-20">
        <MenuTabs categories={categories} items={items} />
      </div>
    </section>
  );
}
