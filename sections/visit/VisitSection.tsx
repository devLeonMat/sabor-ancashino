import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/whatsapp";
import { formatTime } from "@/lib/format";

export function VisitSection() {
  const { address, hours, closedLabel, phoneDisplay } = siteConfig;
  return (
    <section id="visitanos" aria-labelledby="visitanos-titulo" className="bg-ink-2 px-5 py-24 sm:px-8 md:py-32 lg:px-[6vw]">
      <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <Eyebrow>Visítanos</Eyebrow>
          <h2 id="visitanos-titulo" className="mt-5 font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.035em] text-cream">
            La puerta <span className="italic font-normal text-maiz">está abierta.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={whatsappUrl(defaultWhatsappMessage)} variant="whatsapp" icon={<WhatsAppIcon className="size-4" />}>
              Escríbenos
            </ButtonLink>
            <ButtonLink href={address.mapsUrl} variant="ghost">
              Cómo llegar
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <h3 className="text-[0.7rem] font-semibold tracking-[0.22em] text-aji uppercase">Dirección</h3>
            <address className="mt-3 text-lg leading-relaxed text-cream not-italic">
              {address.line}
              <br />
              {address.city}
            </address>
            <p className="mt-2 text-cream-2">{phoneDisplay}</p>
          </div>
          <div>
            <h3 className="text-[0.7rem] font-semibold tracking-[0.22em] text-aji uppercase">Horario</h3>
            <dl className="mt-3 grid gap-2 text-lg text-cream">
              {hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-6 border-b border-cream/10 pb-2">
                  <dt>{h.label}</dt>
                  <dd className="text-cream-2 tabular-nums">
                    {formatTime(h.open)} – {formatTime(h.close)}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-6">
                <dt className="text-cream-2">{closedLabel}</dt>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
