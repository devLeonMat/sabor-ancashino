export type ReservationRequest = {
  /** Fecha en formato ISO `YYYY-MM-DD`. */
  date: string;
  /** Hora en formato 24h `HH:mm`. */
  time: string;
  guests: number;
  name?: string;
  notes?: string;
};

export type ReservationResult =
  | { ok: true; channel: "whatsapp" | "api"; reference?: string }
  | { ok: false; error: string };

/**
 * Canal de reservas. Hoy existe solo WhatsApp; mañana un endpoint
 * (NestJS + Prisma) implementará la misma interfaz.
 */
export interface ReservationChannel {
  submit(request: ReservationRequest): Promise<ReservationResult>;
}
