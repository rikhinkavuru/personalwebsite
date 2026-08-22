"use client";

import { useEffect, useState } from "react";

/**
 * Shared modal plumbing: portal readiness, Escape to close, and a scroll lock
 * on the body while something is open.
 *
 * Three separate overlays each had their own copy of this, which is three
 * places for the body class to leak if an effect cleanup is missed.
 */
export function useModal(open: boolean, onClose: () => void) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return mounted;
}
