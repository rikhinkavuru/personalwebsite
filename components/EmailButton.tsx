"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";

const EASE = [0.32, 0.72, 0, 1] as const;

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/**
 * Copies the email address instead of opening a mail client.
 *
 * Hovering inverts the tile, and a successful copy swaps the envelope for a
 * check that holds for a couple of seconds before reverting.
 */
export default function EmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Clipboard blocked (insecure origin or denied permission). Fall back to
      // a hidden textarea so the click still does something useful.
      const field = document.createElement("textarea");
      field.value = profile.email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand("copy");
      } catch {
        return;
      } finally {
        document.body.removeChild(field);
      }
    }

    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : `Copy email address, ${profile.email}`}
      title={profile.email}
      className={`group relative inline-flex size-9 items-center justify-center overflow-hidden rounded-xl bg-foreground text-primary transition-colors hover:bg-primary hover:text-bg ${
        copied ? "bg-primary text-bg" : ""
      } ${className ?? ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "check" : "mail"}
          initial={{ opacity: 0, scale: 0.5, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -4 }}
          transition={{ duration: 0.18, ease: EASE }}
          className="flex items-center justify-center"
        >
          {copied ? <CheckIcon /> : <MailIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
