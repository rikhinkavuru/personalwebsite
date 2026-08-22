"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { EASE } from "@/lib/motion";
import { MoonIcon, SunIcon } from "./icons";

export default function ThemeToggle() {
  // Rendered dark-agnostic on the server; the real value lands after mount so
  // the markup matches whatever the pre-hydration script already applied.
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private browsing with storage disabled; the toggle still works per-session.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex size-8 shrink-0 cursor-pointer items-center justify-center self-start overflow-hidden rounded-xl bg-foreground text-primary transition-colors hover:bg-primary hover:text-bg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted && dark ? "sun" : "moon"}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="flex items-center justify-center"
        >
          {mounted && dark ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
