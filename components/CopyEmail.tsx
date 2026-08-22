"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import { copyText } from "@/lib/clipboard";
import { EASE } from "@/lib/motion";
import { CheckIcon, CopyIcon } from "./icons";

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
    if (!(await copyText(profile.email))) return;

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
