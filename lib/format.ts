import { siteConfig } from "./site-config";

const priceFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: "PEN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

/** "2026-10-10" → "sábado 10 de octubre" (sin desfase de zona horaria). */
export function formatLongDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat(siteConfig.locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}

/** "20:00" → "8:00 p. m." */
export function formatTime(time: string) {
  const [h, min] = time.split(":").map(Number);
  const period = h >= 12 ? "p. m." : "a. m.";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(min).padStart(2, "0")} ${period}`;
}

/** Día de la semana (0–6) de una fecha ISO. */
export function weekdayOf(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

/** Fecha de hoy en Lima como ISO `YYYY-MM-DD`. */
export function todayIso() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: siteConfig.timeZone }).format(new Date());
}
