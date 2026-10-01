"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Entrada sutil al entrar en viewport (Motion). Para secciones fuera de las escenas GSAP. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
