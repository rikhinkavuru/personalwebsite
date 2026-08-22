/**
 * Shared motion constants.
 *
 * Every component was declaring its own copy of this curve, which meant eight
 * chances for them to drift apart.
 */
export const EASE = [0.32, 0.72, 0, 1] as const;

/** Used wherever the header morphs between its full and compact states. */
export const SPRING = {
  type: "spring",
  stiffness: 400,
  damping: 40,
  mass: 0.6,
} as const;
