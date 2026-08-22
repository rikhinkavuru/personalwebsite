"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { marks } from "@/lib/content";
import FallbackImage from "./FallbackImage";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Inline company mark, sized in `em` so it tracks the surrounding text.
 * Falls back to a lettered tile when the logo file is missing, which keeps
 * prose from collapsing before real logos land in /public/logos.
 */
export function InlineMark({
  name,
  label,
  size = "0.9em",
}: {
  name: keyof typeof marks;
  label: string;
  size?: string;
}) {
  const mark = marks[name];

  const tile = (
    <span
      className="flex h-full w-full items-center justify-center text-[0.6em] leading-none font-bold text-white"
      style={{ backgroundColor: mark?.fallbackBg ?? "#78716c" }}
    >
      {label[0]}
    </span>
  );

  return (
    <span
      role="img"
      aria-label={`${label} logo`}
      className="relative mr-1 inline-block translate-x-[2px] overflow-hidden rounded-[3px] align-[-0.12em]"
      style={{ height: size, width: size }}
    >
      {mark?.src ? (
        <FallbackImage
          src={mark.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fallback={tile}
        />
      ) : (
        tile
      )}
    </span>
  );
}

/**
 * A company name in prose preceded by its mark. When the mark has a preview
 * screenshot, hovering the link floats it above the line.
 */
export function MarkedName({
  name,
  label,
  href,
}: {
  name: keyof typeof marks;
  label: string;
  href?: string;
}) {
  const [open, setOpen] = useState(false);
  const preview = marks[name]?.preview;

  const inner = (
    <>
      <InlineMark name={name} label={label} />
      <span>{label}</span>
    </>
  );

  if (!href) {
    return <span className="whitespace-nowrap">{inner}</span>;
  }

  return (
    <span
      className="relative inline-block whitespace-nowrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="underline decoration-secondary decoration-2 underline-offset-[3px] transition-[text-decoration-color] hover:decoration-primary"
      >
        {inner}
      </a>

      <AnimatePresence>
        {open && preview && (
          <motion.span
            // Decoration only: capturing the pointer would make it flicker as
            // the cursor moves between the link and the card.
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 block w-60 -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.22)] ring-1 ring-black/10"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="block w-full" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/** Square logo tile used in list rows (Experience / Projects). */
export function LogoTile({
  name,
  label,
  size = 32,
}: {
  name?: keyof typeof marks;
  label: string;
  /** Set to the height of the text block beside it so they align flush. */
  size?: number;
}) {
  const mark = name ? marks[name] : undefined;

  const tile = (
    <span
      className="flex h-full w-full items-center justify-center font-display font-semibold text-white select-none"
      style={{
        backgroundColor: mark?.fallbackBg ?? "#78716c",
        fontSize: Math.round(size * 0.42),
      }}
    >
      {label[0]}
    </span>
  );

  return (
    <span
      className="relative shrink-0 overflow-hidden rounded-lg bg-foreground"
      style={{ width: size, height: size }}
    >
      {mark?.src ? (
        <FallbackImage
          src={mark.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          fallback={tile}
        />
      ) : (
        tile
      )}
    </span>
  );
}
