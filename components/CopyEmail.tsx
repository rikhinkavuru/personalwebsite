"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";

const EASE = [0.32, 0.72, 0, 1] as const;

const CopyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5"
    aria-hidden="true"
  >
    <rect width="12" height="14" x="8" y="8" rx="2.5" />
    <path d="M17 5.5A2.5 2.5 0 0 0 14.5 3H6.5A3.5 3.5 0 0 0 3 6.5v8A2.5 2.5 0 0 0 5.5 17" />
  </svg>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/**
 * The email address under the name, with a bare copy control beside it.
 *
 * The icon sits directly on the page in the same muted tone as the address,
 * and flips to a check for a moment after a successful copy.
 */
export default function CopyEmail() {
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
      // Clipboard blocked (insecure origin or denied permission); fall back so
      // the click still does something useful.
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
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="flex items-center gap-1.5 text-base leading-6 text-muted">
      <span>{profile.email}</span>

      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="inline-flex size-5 cursor-pointer items-center justify-center text-muted transition-colors hover:text-primary"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="flex items-center justify-center"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </motion.span>
        </AnimatePresence>
      </button>
    </span>
  );
}
