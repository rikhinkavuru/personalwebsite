"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Paper } from "@/lib/content";
import { Badge } from "./Rows";

const EASE = [0.32, 0.72, 0, 1] as const;

/** Lined-page mark, the way kenemrls flags a written piece. */
const PaperIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-4"
    aria-hidden="true"
  >
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

/**
 * Papers, with the PDF opening in an in-page reader rather than navigating
 * away. Entries without a PDF still render, just without the affordance.
 */
export default function PaperList({ papers }: { papers: Paper[] }) {
  const [open, setOpen] = useState<Paper | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <ol className="flex flex-col">
        {papers.map((paper) => {
          const content = (
            <div className="flex gap-3 py-4">
              <span className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-primary">
                <PaperIcon />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-base font-medium text-primary">
                    {paper.venue}
                  </span>
                  <Badge>{paper.track}</Badge>
                  {paper.note && <Badge solid>{paper.note}</Badge>}
                </div>

                <p className="mt-1.5 text-base leading-[1.5] text-muted transition-colors group-hover:text-primary">
                  {paper.title}
                </p>
              </div>
            </div>
          );

          return (
            <li
              key={paper.title}
              className="border-b border-border last:border-b-0"
            >
              {paper.pdf ? (
                <button
                  type="button"
                  onClick={() => setOpen(paper)}
                  aria-label={`Read ${paper.venue} paper`}
                  className="group -mx-4 block w-[calc(100%+2rem)] cursor-pointer rounded-xl px-4 text-left transition-colors hover:bg-surface-hover"
                >
                  {content}
                </button>
              ) : (
                <div className="group -mx-4 px-4">{content}</div>
              )}
            </li>
          );
        })}
      </ol>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-4 sm:p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(null)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={open.title}
                  className="flex h-[92vh] w-[min(96vw,60rem)] flex-col overflow-hidden rounded-2xl bg-surface"
                  initial={{ scale: 0.95, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.97, opacity: 0, y: 6 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex shrink-0 items-start gap-3 border-b border-border px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-muted">
                        {open.venue} · {open.track}
                      </p>
                      <p className="mt-0.5 text-base leading-snug font-medium text-primary">
                        {open.title}
                      </p>
                    </div>

                    <a
                      href={open.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-bg"
                    >
                      Open PDF
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpen(null)}
                      aria-label="Close"
                      className="shrink-0 rounded-lg bg-foreground px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-bg"
                    >
                      Esc
                    </button>
                  </div>

                  {/* <object> rather than <iframe>: iOS Safari and some mobile
                      browsers refuse to render a PDF inline, and object gives
                      them a real fallback instead of a blank panel. */}
                  <object
                    data={`${open.pdf}#view=FitH`}
                    type="application/pdf"
                    title={open.title}
                    className="min-h-0 flex-1 bg-white"
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                      <p className="text-sm text-muted">
                        Your browser can&apos;t show PDFs inline.
                      </p>
                      <a
                        href={open.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-bg"
                      >
                        Open the paper
                      </a>
                    </div>
                  </object>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
