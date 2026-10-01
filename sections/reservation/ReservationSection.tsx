import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ReservationForm } from "./ReservationForm";

export function ReservationSection() {
  return (
    <section id="reservas" aria-labelledby="reservas-titulo" className="relative overflow-hidden bg-ink">
      <div className="grid lg:grid-cols-2">
        <div className="grain relative aspect-[4/3] lg:aspect-auto lg:min-h-full">
          <Photo asset="mesa" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink" />
        </div>
        <Reveal className="relative px-5 py-20 sm:px-8 md:py-28 lg:px-[5vw]">
          <Eyebrow>Reservas</Eyebrow>
          <h2 id="reservas-titulo" className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.03em] text-cream">
            Tu mesa, <span className="italic font-normal text-maiz">como en casa.</span>
          </h2>
          <p className="mt-5 max-w-md text-cream-2">
            Elige día, hora y cuántos vienen. Te abrimos WhatsApp con el mensaje listo y te confirmamos al toque.
          </p>
          <div className="mt-12">
            <ReservationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
