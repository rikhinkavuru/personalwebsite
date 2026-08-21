"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Postcard as PostcardData } from "@/lib/content";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Progressive blur stack. Six layers of increasing blur, each masked to a
 * sliding band, so the image dissolves into the caption instead of sitting
 * behind a hard gradient. Lifted from kominko's postcard modal.
 */
const BLUR_LAYERS = [
  {
    blur: 0.5,
    mask: "linear-gradient(transparent 25%, black 36%, black 48%, transparent 59%)",
  },
  {
    blur: 1,
    mask: "linear-gradient(transparent 36%, black 48%, black 59%, transparent 70%)",
  },
  {
    blur: 2,
    mask: "linear-gradient(transparent 48%, black 59%, black 70%, transparent 82%)",
  },
  {
    blur: 4,
    mask: "linear-gradient(transparent 59%, black 70%, black 82%, transparent 93%)",
  },
  {
    blur: 8,
    mask: "linear-gradient(transparent 70%, black 82%, black 93%, transparent 100%)",
  },
  { blur: 12, mask: "linear-gradient(transparent 82%, black 93%)" },
];

export default function Postcard({
  card,
  tight = false,
}: {
  card: PostcardData;
  /** Drop the right margin when punctuation follows, as kominko does. */
  tight?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thumbRef = useRef<HTMLImageElement>(null);

  useEffect(() => setMounted(true), []);

  // The thumb request can finish before hydration, in which case onError never
  // fires. Re-check on mount so a missing file reliably hides the postcard.
  useEffect(() => {
    const img = thumbRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  // Lock the page behind the modal and wire up Escape to close.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Without a thumbnail on disk there is nothing to show inline, so the
  // sentence reads normally instead of rendering an empty frame.
  if (failed) return null;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View postcard of ${card.alt}`}
        className={`relative my-[-0.2em] inline-block aspect-3/2 h-[1.8em] cursor-pointer bg-[#efeae0] p-[4px] align-middle shadow-[0_2px_8px_rgba(0,0,0,0.14)] ring-1 ring-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-[#3a3733] ${tight ? "ml-1.5" : "mx-1.5"}`}
        style={{ borderRadius: 4 }}
        initial={{ rotate: card.rotate }}
        whileHover={{ rotate: card.rotate, scale: 1.1 }}
        whileTap={{ rotate: card.rotate, scale: 1.04 }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        {/* Plain <img>: the thumb is optional, and the whole postcard hides
            itself if the file is not there yet. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={thumbRef}
          src={card.thumb}
          alt={card.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ borderRadius: 2 }}
          onError={() => setFailed(true)}
        />
      </motion.button>

      {/* Portalled to <body>: this component is used inside a <p>, and a div
          overlay nested there is invalid HTML that breaks hydration. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label={card.alt}
                  className="w-[min(88vw,100vh,56rem)] bg-[#efece5] p-2 shadow-2xl sm:p-3"
                  style={{ borderRadius: 18 }}
                  initial={{ scale: 0.92, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.96, opacity: 0, y: 8 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative overflow-hidden rounded-[6px]">
                    <Image
                      src={card.full}
                      alt={card.alt}
                      width={1600}
                      height={1067}
                      className="aspect-3/2 w-full object-cover"
                      style={{ borderRadius: 6 }}
                      priority
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0">
                      {BLUR_LAYERS.map((layer) => (
                        <div
                          key={layer.blur}
                          className="absolute inset-0"
                          style={{
                            backdropFilter: `blur(${layer.blur}px)`,
                            WebkitBackdropFilter: `blur(${layer.blur}px)`,
                            maskImage: layer.mask,
                            WebkitMaskImage: layer.mask,
                          }}
                        />
                      ))}

                      <div className="absolute inset-0 bg-linear-to-t from-black/45 to-transparent" />

                      <div className="relative flex flex-col gap-0.5 px-4 pt-10 pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:pt-14">
                        <p className="text-sm font-medium tracking-[-0.006em] text-white">
                          {card.caption}
                        </p>
                        {card.exif && (
                          <p className="text-xs text-white/70 sm:whitespace-nowrap">
                            {card.exif}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
