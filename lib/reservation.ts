import { siteConfig } from "./site-config";
import { formatLongDate, formatTime, weekdayOf } from "./format";
import type { ReservationRequest } from "@/types/reservation";

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Horarios reservables para una fecha, según `siteConfig.hours`. */
export function getTimeSlots(isoDate: string): string[] {
  if (!isoDate) return [];
  const day = weekdayOf(isoDate);
  const schedule = siteConfig.hours.find((h) => (h.days as readonly number[]).includes(day));
  if (!schedule) return [];
  const start = toMinutes(schedule.open);
  const end = toMinutes(schedule.close) - siteConfig.reservationLastCallMinutes;
  const slots: string[] = [];
  for (let t = start; t <= end; t += siteConfig.reservationSlotMinutes) slots.push(fromMinutes(t));
  return slots;
}

export function validateReservation(r: ReservationRequest): string | null {
  if (!r.date) return "Elige una fecha.";
  if (!r.time) return "Elige una hora.";
  if (!getTimeSlots(r.date).includes(r.time)) return "Ese día no atendemos en ese horario.";
  if (r.guests < 1) return "Indica el número de personas.";
  return null;
}

/**
 * "Hola, quisiera reservar una mesa para 4 personas el sábado 10 de octubre a las 8:00 p. m."
 */
export function buildReservationMessage(r: ReservationRequest) {
  const people = r.guests === 1 ? "1 persona" : `${r.guests} personas`;
  let message = `Hola, quisiera reservar una mesa para ${people} el ${formatLongDate(r.date)} a las ${formatTime(r.time)}.`;
  if (r.name?.trim()) message += ` A nombre de ${r.name.trim()}.`;
  if (r.notes?.trim()) message += ` ${r.notes.trim()}`;
  return message;
}
