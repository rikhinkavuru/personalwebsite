import Link from "next/link";
import type { ReactNode } from "react";
import type { marks } from "@/lib/content";
import { LogoTile } from "./Mark";

/** Small pill used for roles, venues, and status. */
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
          ? "inline-flex shrink-0 items-center rounded-lg bg-primary px-2 py-1 text-xs font-medium text-bg"
          : "inline-flex shrink-0 items-center rounded-lg border border-border px-2 py-1 text-xs font-medium text-muted"
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
}: {
  title: string;
  subtitle?: string;
  detail?: string;
  badge?: ReactNode;
  mark?: keyof typeof marks;
  href?: string;
}) {
  const body = (
    <div className="flex items-center gap-3 py-3">
      {/* No tile at all when the entry has no mark (papers, for instance).
          A defined mark whose file is missing still gets its lettered
          fallback, which is what keeps Experience rows aligned. */}
      {mark && <LogoTile name={mark} label={title} />}

      <div className="min-w-0 flex-1">
        <p className="font-display text-base font-medium text-primary">
          {title}
        </p>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        {detail && <p className="text-sm text-muted">{detail}</p>}
      </div>

      {badge}
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
