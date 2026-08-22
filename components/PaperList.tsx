"use client";

import { useState } from "react";
import type { Paper } from "@/lib/content";
import Overlay from "./Overlay";
import { Badge } from "./Rows";

/**
 * Papers, each showing a rendered preview of its own first page. The PDF opens
 * in an in-page reader rather than navigating away; entries without one still
 * render, just without the preview or the affordance.
 */
export default function PaperList({ papers }: { papers: Paper[] }) {
  const [open, setOpen] = useState<Paper | null>(null);

  return (
    <>
      <ol className="flex flex-col">
        {papers.map((paper) => {
          const body = (
            <div className="flex items-start gap-4 py-4">
              {paper.thumb ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={paper.thumb}
                  alt=""
                  width={300}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-18 w-13.5 shrink-0 rounded-md bg-white object-cover object-top ring-1 ring-black/10 dark:ring-white/15"
                />
              ) : (
                /* Keeps rows without a PDF aligned to the same text column. */
                <span aria-hidden="true" className="w-13.5 shrink-0" />
              )}

              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-medium text-primary">
                  {paper.venue}
                </p>
                <p className="mt-1 text-base leading-[1.5] text-muted transition-colors group-hover:text-primary">
                  {paper.title}
                </p>
              </div>

              {/* Right-aligned against the top of the row, not inline with the
                  venue, which is where it reads as status rather than label. */}
              <span className="mt-0.5 w-32 shrink-0 text-right sm:w-40">
                <Badge solid={Boolean(paper.note)}>
                  {paper.note ?? paper.track}
                </Badge>
              </span>
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
                  aria-label={`Read the ${paper.venue} paper`}
                  className="group -mx-4 block w-[calc(100%+2rem)] cursor-pointer rounded-xl px-4 text-left transition-colors hover:bg-surface-hover"
                >
                  {body}
                </button>
              ) : (
                <div className="group -mx-4 px-4">{body}</div>
              )}
            </li>
          );
        })}
      </ol>

      <Overlay
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        label={open?.title ?? "Paper"}
        panelClassName="flex h-[92vh] w-[min(96vw,60rem)] flex-col overflow-hidden rounded-2xl bg-surface"
      >
        {open && (
          <>
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

            {/* <object> rather than <iframe>: iOS Safari often refuses to render
                a PDF inline, and object gives it a real fallback instead of a
                blank panel. */}
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
          </>
        )}
      </Overlay>
    </>
  );
}
