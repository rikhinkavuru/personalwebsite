"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { nowPlaying } from "@/lib/content";

export type Track = {
  title: string;
  artist?: string;
  art?: string;
  url: string;
  /** True while Spotify reports active playback. */
  isPlaying: boolean;
};

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Four bars, scaled by CSS keyframes rather than animated from JS. Animating
 * SVG y1/y2 per frame kept the main thread busy for the life of the page.
 */
function Equalizer({ animate }: { animate: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      className={`shrink-0 overflow-visible ${animate ? "" : "eq-paused"}`}
    >
      {[1, 5, 9, 13].map((x) => (
        <rect
          key={x}
          className="eq-bar"
          x={x - 1}
          y={2}
          width={2}
          height={8}
          rx={1}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/**
 * Equaliser bars that reveal an album card on hover, and link to the track.
 *
 * The track is hardcoded in lib/content.ts. If /api/spotify ever returns a
 * real one (credentials present), that takes over.
 */
export default function NowPlaying({ className }: { className?: string }) {
  const [live, setLive] = useState<Track | null>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) return;
        const data = (await res.json()) as Track | { track: null };
        if (!cancelled && "title" in data) setLive(data);
      } catch {
        // Route unconfigured or offline; the hardcoded track stands.
      }
    };

    load();
    const id = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const track = live ?? {
    title: nowPlaying.title,
    artist: nowPlaying.artist,
    art: nowPlaying.art,
    url: nowPlaying.url,
    isPlaying: true,
  };

  const animate = !reduced && track.isPlaying;

  return (
    <span
      className={`relative inline-flex ${className ?? ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={track.url}
        target="_blank"
        rel="noreferrer"
        aria-label={`${track.isPlaying ? "Now playing" : "Last played"}: ${track.title} by ${track.artist}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex size-9 items-center justify-center rounded-xl text-muted transition-colors hover:text-primary"
      >
        <Equalizer animate={animate} />
      </a>

      <AnimatePresence>
        {open && (
          <motion.a
            href={track.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            // Anchored to the right of the bars so it never pushes layout
            // around and never covers the bio above.
            className="absolute top-1/2 left-full z-50 ml-2 block w-36 -translate-y-1/2 rounded-2xl bg-[#111214] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, x: -6, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {track.art && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={track.art}
                alt=""
                width={320}
                height={320}
                loading="lazy"
                decoding="async"
                className="mb-3 aspect-square w-full rounded-lg object-cover"
              />
            )}
            {/* Spotify's own hierarchy: title in white, artist in grey,
                both sentence case with no letter-spacing tricks. */}
            <p className="truncate text-sm font-semibold text-white">
              {track.title}
            </p>
            {track.artist && (
              <p className="mt-0.5 truncate text-xs text-white/60">
                {track.artist}
              </p>
            )}
          </motion.a>
        )}
      </AnimatePresence>
    </span>
  );
}
