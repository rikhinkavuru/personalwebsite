"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/**
 * Fixed left rail with a back link and scroll-spy section list, matching
 * kenemrls's case-study pages. Hidden below the xl breakpoint, where there
 * is no room beside the 660px column.
 */
export default function TocRail({
  backHref,
  backLabel,
  items,
}: {
  backHref: string;
  backLabel: string;
  items: TocItem[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry nearest the top of the viewport among those visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Narrow band near the top so the active item changes as a heading passes it.
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="On this page"
      className="fixed top-24 left-[max(1.5rem,calc(50%-560px))] hidden w-44 flex-col gap-3 xl:flex"
    >
      <Link
        href={backHref}
        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
      >
        <span className="transition-transform group-hover:-translate-x-0.5">
          &larr;
        </span>
        {backLabel}
      </Link>

      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={
                active === item.id
                  ? "text-sm font-medium text-primary transition-colors"
                  : "text-sm text-muted transition-colors hover:text-primary"
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
