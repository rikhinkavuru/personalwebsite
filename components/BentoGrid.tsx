"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { marks, type Project } from "@/lib/content";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Slot weights, matching the reference: the two columns are equal height but
 * split unevenly, so no two cards are the same size.
 *
 * Order is fixed by slug rather than by array position, because the visual
 * arrangement is a design decision, not a content one.
 */
const LAYOUT: { slug: string; grow: number }[][] = [
  [
    { slug: "telo", grow: 62 },
    { slug: "virahacks", grow: 38 },
  ],
  [
    { slug: "linkd", grow: 46 },
    { slug: "inkr", grow: 54 },
  ],
];

/**
 * Two-column bento of project cards.
 *
 * Hovering a card grows its whole column and leaves the other one dimmed and
 * desaturated, so the hovered work reads as foreground. Clicking opens the
 * card full size in a lightbox. Cards carry no text: the artwork is the label.
 */
export default function BentoGrid({ projects }: { projects: Project[] }) {
  const [zoomed, setZoomed] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!zoomed) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomed]);

  const bySlug = new Map(projects.map((p) => [p.slug, p]));

  return (
    <>
      <div className="bento flex flex-col gap-3 sm:h-125 sm:flex-row">
        {LAYOUT.map((column, ci) => (
          <div key={ci} className="bento-col flex flex-col gap-3">
            {column.map(({ slug, grow }) => {
              const project = bySlug.get(slug);
              if (!project) return null;

              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setZoomed(project)}
                  aria-label={`View ${project.name}`}
                  className="bento-card group relative block min-h-24 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10"
                  style={{ flexGrow: grow, flexBasis: 0 }}
                >
                  <CardFace project={project} />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {zoomed && (
              <motion.div
                className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setZoomed(null)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={zoomed.name}
                  className="relative w-[min(92vw,58rem)] overflow-hidden rounded-2xl"
                  initial={{ scale: 0.94, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.96, opacity: 0, y: 6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <CardFace project={zoomed} large />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

/* eslint-disable @next/next/no-img-element */

function CardFace({ project, large }: { project: Project; large?: boolean }) {
  const mark = project.mark ? marks[project.mark] : undefined;
  const shot = project.shots?.[0];

  if (shot) {
    return (
      <img
        src={shot.src}
        alt={shot.alt}
        // The lightbox shows the whole image; the tile crops to fill its slot.
        className={
          large
            ? "block h-auto w-full object-contain"
            : "absolute inset-0 h-full w-full object-cover"
        }
      />
    );
  }

  // No artwork yet: brand colour with the logo centred.
  return (
    <span
      className={`relative block h-full w-full ${large ? "aspect-3/2" : ""}`}
      style={{ backgroundColor: mark?.fallbackBg ?? "var(--foreground)" }}
    >
      {mark?.src && (
        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src={mark.src}
            alt={project.name}
            className={`rounded-xl object-cover ${large ? "size-28" : "size-16"}`}
          />
        </span>
      )}
    </span>
  );
}
