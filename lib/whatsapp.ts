import { siteConfig } from "./site-config";
import { buildReservationMessage, validateReservation } from "./reservation";
import type { ReservationChannel } from "@/types/reservation";

export function whatsappUrl(message?: string, phone: string = siteConfig.whatsapp) {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage = `Hola, quisiera información sobre ${siteConfig.name}.`;

/** Canal actual: abre WhatsApp con el mensaje generado. */
export const whatsappReservationChannel: ReservationChannel = {
  async submit(request) {
    const error = validateReservation(request);
    if (error) return { ok: false, error };
    window.open(whatsappUrl(buildReservationMessage(request)), "_blank", "noopener,noreferrer");
    return { ok: true, channel: "whatsapp" };
  },
};
