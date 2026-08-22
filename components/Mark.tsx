"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
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

  const dark = mark?.srcDark;

  return (
    <span
      role="img"
      aria-label={`${label} logo`}
      className="relative mr-1 inline-block translate-x-[2px] overflow-hidden rounded-[3px] align-[-0.12em]"
      style={{ height: size, width: size }}
    >
      {mark?.src ? (
        <>
          <FallbackImage
            src={mark.src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${dark ? "dark:hidden" : ""}`}
            fallback={tile}
          />
          {/* A black-on-transparent mark disappears on a dark page, so marks
              that need it ship a light twin swapped in by theme. */}
          {dark && (
            <FallbackImage
              src={dark}
              alt=""
              className="absolute inset-0 hidden h-full w-full object-cover dark:block"
              fallback={tile}
            />
          )}
        </>
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const preview = marks[name]?.preview;

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  // Closing on a delay leaves the gap between the word and the card
  // crossable; otherwise the card vanishes the moment the pointer leaves the
  // text and can never be reached.
  const hide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

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
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onFocus={show}
        onBlur={hide}
        className="underline decoration-secondary decoration-2 underline-offset-[3px] transition-[text-decoration-color] hover:decoration-primary"
      >
        {inner}
      </a>

      <AnimatePresence>
        {open && preview && (
          <motion.span
            // Hoverable, so moving onto the card keeps it open.
            onMouseEnter={show}
            onMouseLeave={hide}
            className="absolute top-full left-1/2 z-[200] mt-2 block w-72 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-[0_16px_50px_rgba(0,0,0,0.28)] ring-1 ring-black/10"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="block w-full rounded-xl" />
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
