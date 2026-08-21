"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Scroll-triggered entrance. Fires once, slightly before the element reaches
 * the viewport edge so content is already settled by the time it is readable.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 12,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
