"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { socialCards } from "@/lib/content";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * Wraps a social icon so a profile preview opens beneath it on hover or focus.
 *
 * The card is absolutely positioned, so it never widens the icon row or pushes
 * the layout around.
 */
export function HoverCard({
  children,
  card,
}: {
  children: ReactNode;
  card: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            // pointer-events-none: the card is decoration, and letting it
            // capture the pointer would make it flicker as the cursor leaves
            // the icon underneath.
            className="pointer-events-none absolute top-full left-0 z-50 mt-2"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -2, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
          >
            {card}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const shell =
  "w-64 overflow-hidden rounded-2xl bg-white text-left shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5";

/* eslint-disable @next/next/no-img-element */

export function InstagramCard() {
  const c = socialCards.instagram;
  const hasStats = c.posts !== null || c.followers !== null;

  return (
    <div className={`${shell} p-3`}>
      <div className="flex items-center gap-3">
        {/* The gradient ring is Instagram's story treatment. */}
        <div className="shrink-0 rounded-full bg-linear-to-tr from-[#fdf497] via-[#d6249f] to-[#285AEB] p-[2px]">
          <img
            src={c.avatar}
            alt=""
            className="block size-11 rounded-full border-2 border-white object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {c.handle}
          </p>
          <p className="truncate text-sm text-neutral-500">{c.name}</p>
        </div>

        <span className="shrink-0 rounded-lg bg-[#0095f6] px-3 py-1.5 text-xs font-semibold text-white">
          Follow
        </span>
      </div>

      {hasStats && (
        <div className="mt-3 flex items-center gap-4 text-xs text-neutral-700">
          <Stat value={c.posts} label="posts" />
          <Stat value={c.followers} label="followers" />
          <Stat value={c.following} label="following" />
        </div>
      )}
    </div>
  );
}

export function LinkedInCard() {
  const c = socialCards.linkedin;

  return (
    <div className={shell}>
      {/* Banner band, matching LinkedIn's card chrome. */}
      <div className="h-12 bg-neutral-200" />

      <div className="px-3 pb-3">
        <img
          src={c.avatar}
          alt=""
          className="-mt-6 block size-12 rounded-full border-2 border-white object-cover"
        />
        <p className="mt-2 text-sm font-semibold text-neutral-900">{c.name}</p>
        <p className="mt-0.5 text-sm leading-snug text-neutral-700">
          {c.headline}
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          {c.location}
          {c.connections ? ` · ${c.connections} connections` : ""}
        </p>

        <div className="mt-3 rounded-full bg-[#0a66c2] py-1.5 text-center text-sm font-semibold text-white">
          + Connect
        </div>
      </div>
    </div>
  );
}

export function GitHubCard() {
  const c = socialCards.github;

  return (
    <div className={`${shell} p-3`}>
      <div className="flex items-center gap-3">
        <img
          src={c.avatar}
          alt=""
          className="block size-11 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {c.handle}
          </p>
          <p className="truncate text-sm text-neutral-500">{c.name}</p>
        </div>

        <span className="shrink-0 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-800 ring-1 ring-black/10">
          Follow
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-neutral-700">
        <Stat value={c.followers} label="followers" />
        <Stat value={c.following} label="following" />
        <Stat value={c.repos} label="repos" />
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number | null; label: string }) {
  if (value === null) return null;

  return (
    <span className="whitespace-nowrap">
      <strong className="font-semibold text-neutral-900">
        {value.toLocaleString("en-US")}
      </strong>{" "}
      <span className="text-neutral-500">{label}</span>
    </span>
  );
}
