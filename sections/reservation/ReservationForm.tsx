"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { formatTime, todayIso } from "@/lib/format";
import { buildReservationMessage, getTimeSlots, validateReservation } from "@/lib/reservation";
import { whatsappReservationChannel } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import type { ReservationChannel, ReservationRequest } from "@/types/reservation";

const field =
  "w-full rounded-none border-0 border-b border-cream/25 bg-transparent px-0 py-3 text-lg text-cream placeholder:text-muted/70 focus:border-aji focus:ring-0 focus:outline-none disabled:opacity-40";
const noopSubscribe = () => () => {};
const label = "text-[0.7rem] font-semibold tracking-[0.22em] text-muted uppercase";

/**
 * Formulario de reserva. El envío se delega a un `ReservationChannel`:
 * hoy WhatsApp; mañana un endpoint real sin cambiar esta UI.
 */
export function ReservationForm({ channel = whatsappReservationChannel }: { channel?: ReservationChannel }) {
  const [request, setRequest] = useState<ReservationRequest>({ date: "", time: "", guests: 2, name: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  // La página es estática: la fecha mínima se calcula solo en el cliente.
  const minDate = useSyncExternalStore(noopSubscribe, todayIso, () => undefined);

  const slots = useMemo(() => getTimeSlots(request.date), [request.date]);
  const closed = Boolean(request.date) && slots.length === 0;
  const complete = !validateReservation(request);
  const preview = complete ? buildReservationMessage(request) : null;

  const update = (patch: Partial<ReservationRequest>) => {
    setError(null);
    setSent(false);
    setRequest((r) => {
      const next = { ...r, ...patch };
      if (patch.date !== undefined && !getTimeSlots(next.date).includes(next.time)) next.time = "";
      return next;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await channel.submit(request);
    if (result.ok) setSent(true);
    else setError(result.error);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className={label}>Fecha</span>
          <input
            type="date"
            required
            min={minDate}
            value={request.date}
            onChange={(e) => update({ date: e.target.value })}
            className={cn(field, "[color-scheme:dark]")}
          />
          {closed ? <span className="text-sm text-aji">{siteConfig.closedLabel}. Elige otro día.</span> : null}
        </label>

        <label className="grid gap-1">
          <span className={label}>Hora</span>
          <select
            required
            value={request.time}
            disabled={!slots.length}
            onChange={(e) => update({ time: e.target.value })}
            className={cn(field, "appearance-none bg-[length:12px] bg-[right_center] bg-no-repeat [background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23a8977f' fill='none' stroke-width='1.5'/></svg>\")]")}
          >
            <option value="" disabled className="bg-ink">
              {request.date ? "Elige una hora" : "Primero elige la fecha"}
            </option>
            {slots.map((s) => (
              <option key={s} value={s} className="bg-ink">
                {formatTime(s)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="grid gap-3">
        <legend className={label}>Personas</legend>
        <div className="mt-3 flex items-center gap-5">
          <Stepper label="Quitar una persona" onClick={() => update({ guests: Math.max(1, request.guests - 1) })} disabled={request.guests <= 1}>
            −
          </Stepper>
          <output aria-live="polite" className="min-w-[3ch] text-center font-display text-4xl text-cream tabular-nums">
            {request.guests}
          </output>
          <Stepper
            label="Agregar una persona"
            onClick={() => update({ guests: Math.min(siteConfig.maxGuestsOnline, request.guests + 1) })}
            disabled={request.guests >= siteConfig.maxGuestsOnline}
          >
            +
          </Stepper>
          {request.guests >= siteConfig.maxGuestsOnline ? (
            <span className="text-sm text-cream-2">¿Más? Cuéntanos en el mensaje.</span>
          ) : null}
        </div>
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="grid gap-1">
          <span className={label}>Nombre (opcional)</span>
          <input
            type="text"
            autoComplete="name"
            value={request.name}
            onChange={(e) => update({ name: e.target.value })}
            className={field}
            placeholder="¿A nombre de quién?"
          />
        </label>
        <label className="grid gap-1">
          <span className={label}>Comentario (opcional)</span>
          <input
            type="text"
            value={request.notes}
            onChange={(e) => update({ notes: e.target.value })}
            className={field}
            placeholder="Cumpleaños, silla para bebé…"
          />
        </label>
      </div>

      <AnimatePresence initial={false}>
        {preview ? (
          <motion.blockquote
            key="preview"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="rounded-2xl rounded-bl-sm bg-[#1f2c26] px-5 py-4 text-sm leading-relaxed text-cream">{preview}</p>
          </motion.blockquote>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4">
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className="inline-flex min-h-14 items-center gap-3 rounded-full bg-whatsapp px-8 text-base font-semibold text-ink transition-[filter] hover:brightness-110"
        >
          <WhatsAppIcon className="size-5" />
          Reservar por WhatsApp
        </motion.button>
        <p role="status" aria-live="polite" className={cn("text-sm", error ? "text-aji" : "text-cream-2")}>
          {error ?? (sent ? "Abrimos WhatsApp con tu mensaje. ¡Te confirmamos por ahí!" : null)}
        </p>
      </div>
    </form>
  );
}

function Stepper({ children, label: aria, ...rest }: { children: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <motion.button
      type="button"
      aria-label={aria}
      whileTap={{ scale: 0.9 }}
      className="grid size-12 place-items-center rounded-full border border-cream/25 text-2xl text-cream transition-colors hover:border-aji hover:text-aji disabled:opacity-30 disabled:hover:border-cream/25 disabled:hover:text-cream"
      {...rest}
    >
      {children}
    </motion.button>
  );
}
