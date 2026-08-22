"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/content";
import FallbackImage from "./FallbackImage";

const SPRING = { type: "spring", stiffness: 400, damping: 40, mass: 0.6 } as const;

/**
 * Profile photo that shrinks with the sticky header (80px/r12 -> 32px/r10).
 * Falls back to an initials tile when /public/avatar.jpg is absent, so the
 * layout is correct before the real photo is dropped in.
 */
export default function Avatar({ compact }: { compact: boolean }) {
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  const tile = (
    <motion.span
      className="flex h-full w-full items-center justify-center font-display font-semibold text-muted select-none"
      animate={{ fontSize: compact ? 12 : 26 }}
      transition={SPRING}
    >
      {initials}
    </motion.span>
  );

  return (
    <motion.div
      className="relative shrink-0 overflow-hidden bg-foreground"
      animate={{
        width: compact ? 32 : 80,
        height: compact ? 32 : 80,
        borderRadius: compact ? 10 : 12,
      }}
      transition={SPRING}
    >
      <FallbackImage
        src={profile.avatar}
        alt={profile.fullName}
        width={400}
        height={400}
        className="absolute inset-0 h-full w-full object-cover"
        fallback={tile}
      />
    </motion.div>
  );
}
