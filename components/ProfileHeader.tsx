"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { profile } from "@/lib/content";
import Avatar from "./Avatar";
import CopyEmail from "./CopyEmail";
import ThemeToggle from "./ThemeToggle";

/**
 * Collapse and expand use separate thresholds on purpose.
 *
 * Collapsing shortens the header by roughly 50px, which shortens the document.
 * With one threshold, a scroll position sitting near it could be pushed back
 * under it by that very height change, expanding the header, lengthening the
 * page, crossing the threshold again -- a visible loop of the header zooming
 * in and out. The dead band between these two values is wider than the height
 * change, so the state cannot flip back on its own.
 */
const COLLAPSE_AT = 120;
const EXPAND_AT = 32;

const EASE = [0.32, 0.72, 0, 1] as const;
const SPRING = { type: "spring", stiffness: 400, damping: 40, mass: 0.6 } as const;

export type Crumb = { label: string; href?: string };

/**
 * The morphing sticky header. At rest it is a full profile card; past
 * COLLAPSE_AT it compacts into a blurred bar with a shrunken avatar and name.
 *
 * On sub-pages, `crumbs` replaces the collapsed name with a breadcrumb trail,
 * which is how kenemrls handles its case-study pages.
 */
export default function ProfileHeader({ crumbs }: { crumbs?: Crumb[] }) {
  const { scrollY } = useScroll();
  const [collapsed, setCollapsed] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setCollapsed((was) => (was ? y > EXPAND_AT : y > COLLAPSE_AT));
  });

  const isSubPage = Boolean(crumbs?.length);
  // Sub-pages open already collapsed: there is no big profile card to shrink.
  const compact = isSubPage || collapsed;

  return (
    <motion.div
      className="sticky top-0 z-100 -mx-4 px-4 sm:-mx-6 sm:px-6"
      animate={{ paddingTop: compact ? 12 : 0, paddingBottom: compact ? 12 : 0 }}
      transition={SPRING}
    >
      {/* Blur plate. Separate layer so the content above it stays crisp. */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-bg-blur backdrop-blur-xl"
        animate={{ opacity: compact ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      />

      <div className="relative flex items-stretch gap-3">
        <Avatar compact={compact} />

        <div className="flex min-w-0 flex-1 flex-col justify-end">
          <div className="flex items-baseline gap-2">
            {/* On the home page the name scale-morphs, which is smooth but
                leaves the pre-scale layout width behind. Sub-pages open
                already compact and have a breadcrumb sitting right after the
                name, so they set the smaller size directly instead. */}
            <motion.h1
              className={
                isSubPage
                  ? "font-display text-base font-semibold leading-[1.2] text-primary"
                  : "font-display text-2xl font-semibold leading-[1.2] text-primary"
              }
              style={{ transformOrigin: "left center" }}
              animate={{ scale: isSubPage ? 1 : compact ? 0.667 : 1 }}
              transition={SPRING}
            >
              {isSubPage ? (
                <Link href="/" className="transition-opacity hover:opacity-70">
                  {profile.fullName}
                </Link>
              ) : (
                profile.fullName
              )}
            </motion.h1>

            {isSubPage && <Breadcrumbs crumbs={crumbs!} />}
          </div>

          {/* Collapses to zero height rather than unmounting, so the row's
              siblings slide up smoothly instead of snapping. */}
          <motion.div
            className="overflow-hidden"
            animate={{ height: compact ? 0 : 24, opacity: compact ? 0 : 1 }}
            transition={SPRING}
          >
            <CopyEmail />
          </motion.div>
        </div>

        <ThemeToggle />
      </div>
    </motion.div>
  );
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-baseline gap-2">
      {crumbs.map((crumb) => (
        <span key={crumb.label} className="flex items-baseline gap-2">
          <span aria-hidden="true" className="text-base text-secondary">
            /
          </span>
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="truncate text-base text-primary underline decoration-secondary decoration-2 underline-offset-[3px] transition-[text-decoration-color] hover:decoration-primary"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="truncate text-base text-muted">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
