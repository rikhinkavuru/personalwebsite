import Link from "next/link";
import type { ReactNode } from "react";
import type { marks } from "@/lib/content";
import { LogoTile } from "./Mark";

/**
 * Status label. Bare text rather than a filled pill, matching the previous
 * design: `solid` marks something ongoing and takes the accent colour, while
 * everything else (years, tracks) sits muted.
 */
export function Badge({
  children,
  solid = false,
}: {
  children: ReactNode;
  solid?: boolean;
}) {
  return (
    <span
      className={
        solid
          ? "shrink-0 text-xs font-medium text-accent"
          : "shrink-0 text-xs text-muted"
      }
    >
      {children}
    </span>
  );
}

/**
 * One entry in a list section. Renders as a link when `href` is present and
 * as a plain row otherwise, with the same -mx-4/px-4 hover plate either way.
 */
export function Row({
  title,
  subtitle,
  detail,
  badge,
  mark,
  href,
  logoSize = 32,
}: {
  title: string;
  subtitle?: string;
  detail?: string;
  badge?: ReactNode;
  mark?: keyof typeof marks;
  href?: string;
  /** Three-line rows measure a 64px text block; match it exactly. */
  logoSize?: number;
}) {
  const body = (
    <div className="flex items-start gap-3 py-3">
      {/* No tile at all when the entry has no mark (papers, for instance).
          A defined mark whose file is missing still gets its lettered
          fallback, which is what keeps Experience rows aligned. */}
      {mark && <LogoTile name={mark} label={title} size={logoSize} />}

      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-medium text-primary">
          {title}
        </p>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        {detail && <p className="text-sm text-muted">{detail}</p>}
      </div>

      <span className="mt-0.5">{badge}</span>
    </div>
  );

  const className =
    "group relative -mx-4 block rounded-xl px-4 transition-colors hover:bg-surface-hover";

  if (!href) return <div className={className}>{body}</div>;

  const external = href.startsWith("http");

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {body}
    </a>
  ) : (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}

/** Section heading, matching kenemrls's `text-lg font-semibold mb-4`. */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 font-display text-lg font-semibold text-primary">
      {children}
    </h2>
  );
}
