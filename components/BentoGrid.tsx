"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { marks, type Project } from "@/lib/content";

const EASE = [0.32, 0.72, 0, 1] as const;

type Card = {
  project: Project;
  /** Flex basis within its column, which is what gives the grid its rhythm. */
  grow: number;
};

/**
 * Two-column bento of project cards.
 *
 * Hovering a card grows its whole column and leaves the other one dimmed and
 * desaturated, so the hovered work reads as foreground. Clicking opens the
 * card full size in a lightbox.
 *
 * A card shows the project's first screenshot when one exists, and otherwise
 * falls back to the brand colour with the logo centred, so the grid looks
 * deliberate before any screenshots land.
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

  // Alternate into two columns, giving each column a tall card and a short one.
  const columns: Card[][] = [[], []];
  projects.forEach((project, i) => {
    columns[i % 2].push({ project, grow: i < 2 ? 3 : 2 });
  });

  return (
    <>
      <div className="bento flex flex-col gap-3 sm:h-140 sm:flex-row">
        {columns.map((column, ci) => (
          <div key={ci} className="bento-col flex flex-col gap-3">
            {column.map(({ project, grow }) => (
              <BentoCard
                key={project.slug}
                project={project}
                grow={grow}
                onOpen={() => setZoomed(project)}
              />
            ))}
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
                  className="relative w-[min(90vw,60rem)] overflow-hidden rounded-2xl"
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

function BentoCard({
  project,
  grow,
  onOpen,
}: {
  project: Project;
  grow: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${project.name}`}
      className="bento-card group relative block min-h-30 cursor-pointer overflow-hidden rounded-xl"
      style={{ flexGrow: grow, flexBasis: 0 }}
    >
      <CardFace project={project} />
    </button>
  );
}

/* eslint-disable @next/next/no-img-element */

function CardFace({ project, large }: { project: Project; large?: boolean }) {
  const mark = project.mark ? marks[project.mark] : undefined;
  const shot = project.shots?.[0];

  return (
    <span
      className={`relative block h-full w-full ${large ? "aspect-3/2" : ""}`}
      style={{ backgroundColor: mark?.fallbackBg ?? "var(--foreground)" }}
    >
      {shot ? (
        <img
          src={shot.src}
          alt={shot.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        mark?.src && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <img
              src={mark.src}
              alt=""
              className={`rounded-xl object-cover ${large ? "size-28" : "size-16"}`}
            />
          </span>
        )
      )}

      {/* Legibility scrim under the label, over art or flat colour alike. */}
      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent pt-10 pb-3 pl-3 text-left">
        <span className="block text-sm font-medium text-white">
          {project.name}
        </span>
        <span className="block text-xs text-white/60">
          {project.role}
          {project.current ? " · Current" : ` · ${project.when}`}
        </span>
      </span>
    </span>
  );
}
