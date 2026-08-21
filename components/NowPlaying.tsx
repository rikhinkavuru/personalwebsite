"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export type Track = {
  title: string;
  artist?: string;
  url: string;
  /** True while Spotify reports active playback, which drives the bar animation. */
  isPlaying: boolean;
};

/** Per-bar animation profile. Staggered so the four bars never move in lockstep. */
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

export default function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (!res.ok) return;
        const data = (await res.json()) as Track | { track: null };
        if (!cancelled && "title" in data) setTrack(data);
      } catch {
        // Offline or the route is unconfigured; the row simply stays hidden.
      }
    };

    load();
    // Refresh while the tab is open so the track keeps up with playback.
    const id = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noreferrer"
      aria-label={
        track.isPlaying ? `Now playing ${track.title}` : `Last played ${track.title}`
      }
      className="inline-flex items-center gap-2 text-sm font-medium tracking-[-0.006em] text-muted transition-colors hover:text-primary"
    >
      <Equalizer animate={track.isPlaying} />
      <span className="truncate">
        {track.title}
        {track.artist && <span className="text-secondary"> · {track.artist}</span>}
      </span>
    </a>
  );
}
