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
            width={256}
            height={256}
            className={`absolute inset-0 h-full w-full object-cover ${dark ? "dark:hidden" : ""}`}
            fallback={tile}
          />
          {/* A black-on-transparent mark disappears on a dark page, so marks
              that need it ship a light twin swapped in by theme. */}
          {dark && (
            <FallbackImage
              src={dark}
              alt=""
              width={256}
              height={256}
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
 * A company name in prose, preceded by its mark. The label picks up the brand
 * colour on hover; no underline and no preview card, which read as too much
 * decoration inside a short paragraph.
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
    return <span className="whitespace-nowrap">{inner}</span>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group whitespace-nowrap"
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
          width={256}
          height={256}
          className="absolute inset-0 h-full w-full object-cover"
          fallback={tile}
        />
      ) : (
        tile
      )}
    </span>
  );
}
