"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Postcard as PostcardData } from "@/lib/content";
import { EASE } from "@/lib/motion";
import Overlay from "./Overlay";

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
  const thumbRef = useRef<HTMLImageElement>(null);
  const warmed = useRef(false);

  // Fetch the full image as soon as the thumb is hovered, so opening the modal
  // does not wait on a 200KB download.
  const warm = () => {
    if (warmed.current) return;
    warmed.current = true;
    // window.Image, since `Image` in this module is next/image.
    const img = new window.Image();
    img.src = card.full;
  };

  // The thumb request can finish before hydration, in which case onError never
  // fires. Re-check on mount so a missing file reliably hides the postcard.
  useEffect(() => {
    const img = thumbRef.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  // Without a thumbnail on disk there is nothing to show inline, so the
  // sentence reads normally instead of rendering an empty frame.
  if (failed) return null;

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={warm}
        onFocus={warm}
        aria-label={`View postcard of ${card.alt}`}
        className={`relative my-[-0.2em] inline-block aspect-3/2 h-[1.8em] bg-[#d3c19a] p-[5px] align-middle shadow-[0_3px_12px_rgba(0,0,0,0.20)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-[#3a3733] ${tight ? "ml-3 mr-1.5" : "mx-3"}`}
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
          width={240}
          height={160}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ borderRadius: 2 }}
          onError={() => setFailed(true)}
        />
      </motion.button>

      <Overlay
        open={open}
        onClose={() => setOpen(false)}
        label={card.alt}
        backdropClassName="bg-black/70"
        panelClassName="w-[min(88vw,100vh,56rem)] rounded-[18px] bg-[#eee7d9] p-2 shadow-2xl sm:p-3"
      >
        <div className="relative overflow-hidden rounded-[6px]">
          <Image
            src={card.full}
            alt={card.alt}
            width={1600}
            height={1067}
            className="aspect-3/2 w-full rounded-[6px] object-cover"
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
      </Overlay>
    </>
  );
}
