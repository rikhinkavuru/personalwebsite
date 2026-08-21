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

/** Per-bar profile. Staggered and unequal so the four never move in lockstep. */
const BARS = [
  { x: 1, peak: 3.0, duration: 0.62, delay: 0 },
  { x: 5, peak: 1.6, duration: 0.5, delay: 0.16 },
  { x: 9, peak: 2.6, duration: 0.72, delay: 0.08 },
  { x: 13, peak: 1.9, duration: 0.56, delay: 0.24 },
];

function Equalizer({ animate }: { animate: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      className="shrink-0 overflow-visible"
    >
      {BARS.map((bar) => (
        <motion.line
          key={bar.x}
          x1={bar.x}
          x2={bar.x}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ y1: 5, y2: 7 }}
          animate={
            animate
              ? { y1: [5, 6 - bar.peak, 5], y2: [7, 6 + bar.peak, 7] }
              : { y1: 5, y2: 7 }
          }
          transition={
            animate
              ? {
                  duration: bar.duration,
                  delay: bar.delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
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
            // Anchored above the bars so it never pushes layout around.
            className="absolute bottom-full left-1/2 z-50 mb-2 block w-45 -translate-x-1/2 rounded-2xl bg-[#111214] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {track.art && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={track.art}
                alt=""
                className="mb-3 aspect-square w-full rounded-lg object-cover"
              />
            )}
            <p className="truncate text-sm font-medium text-white">
              {track.title}
            </p>
            {track.artist && (
              <p className="mt-0.5 truncate text-xs font-semibold tracking-[0.08em] text-white/45 uppercase">
                {track.artist}
              </p>
            )}
          </motion.a>
        )}
      </AnimatePresence>
    </span>
  );
}
