"use client";

import { marks } from "@/lib/content";
import FallbackImage from "./FallbackImage";

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
 * A company name in prose preceded by its mark. The label tints to the brand
 * colour on hover, matching kominko's inline treatment.
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
  const tint = marks[name]?.tint;
  const inner = (
    <>
      <InlineMark name={name} label={label} />
      <span
        className="transition-colors group-hover:[color:var(--tint)]"
        style={{ "--tint": tint } as React.CSSProperties}
      >
        {label}
      </span>
    </>
  );

  if (!href) {
    return <span className="group whitespace-nowrap">{inner}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group whitespace-nowrap underline decoration-secondary decoration-2 underline-offset-[3px] transition-[text-decoration-color] hover:decoration-primary"
    >
      {inner}
    </a>
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
