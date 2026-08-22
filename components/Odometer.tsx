"use client";

import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * Per-character rolling counter, matching kenemrls's footer number.
 *
 * Every glyph lives in its own fixed-width `overflow-hidden` box so digits can
 * slide vertically without reflowing their neighbours. Digits get 0.6em,
 * separators 0.3em, which is why the value must be rendered with `tabular-nums`.
 */
export default function Odometer({ value }: { value: string }) {
  return (
    <span className="inline-flex tabular-nums">
      {value.split("").map((char, i) => {
        const isDigit = char >= "0" && char <= "9";
        const width = isDigit ? "0.6em" : "0.3em";

        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden"
            style={{ width }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={char}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="inline-block text-center"
                style={{ width }}
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
}
