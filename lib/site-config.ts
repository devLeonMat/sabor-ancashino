/**
 * Datos de negocio centralizados. Valores marcados TODO son provisionales.
 */
export const siteConfig = {
  name: "Sabor Ancashino",
  tagline: "Cocina ancashina hecha como en casa",
  description:
    "Cocina ancashina hecha como en casa, con ingredientes de nuestra tierra y recetas que atraviesan generaciones. Picante de cuy, llunca, cuchicanca y más.",
  url: "https://devleonmat.github.io/sabor-ancashino", // TODO: dominio definitivo
  locale: "es-PE",
  timeZone: "America/Lima",
  // TODO: número real con código de país, sin "+" ni espacios.
  whatsapp: "51900000000",
  phoneDisplay: "+51 900 000 000", // TODO
  address: {
    line: "Jr. Por confirmar 123", // TODO
    city: "Lima, Perú", // TODO
    mapsUrl: "https://maps.google.com/?q=Sabor+Ancashino", // TODO
  },
  /** Horario de atención. day: 0 = domingo … 6 = sábado. */
  hours: [
    { days: [2, 3, 4, 5], label: "Martes a viernes", open: "12:00", close: "22:00" },
    { days: [6, 0], label: "Sábado y domingo", open: "11:00", close: "22:30" },
  ],
  closedLabel: "Lunes cerrado",
  /** Intervalo de minutos entre horarios reservables. */
  reservationSlotMinutes: 30,
  /** Última reserva antes del cierre (minutos). */
  reservationLastCallMinutes: 60,
  maxGuestsOnline: 12,
  social: {
    instagram: "https://instagram.com/", // TODO
    facebook: "https://facebook.com/", // TODO
  },
} as const;

export type SiteConfig = typeof siteConfig;
