"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { defaultWhatsappMessage, whatsappUrl } from "@/lib/whatsapp";

/** Acceso permanente a reservar / WhatsApp en móvil, tras pasar el hero. */
export function MobileActionBar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.6));

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-full border border-cream/10 bg-ink/85 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-md md:hidden"
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#reservas" className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-aji text-sm font-semibold text-ink">
            Reservar mesa
          </a>
          <a
            href={whatsappUrl(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="grid size-12 place-items-center rounded-full bg-whatsapp text-ink"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
