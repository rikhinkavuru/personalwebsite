"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import Odometer from "./Odometer";

/**
 * World population estimate, anchored to the UN World Population Prospects
 * 2024 mid-series. Roughly 70.3M added per year works out to ~2.23 people
 * per second, which is what makes the footer counter visibly tick.
 */
const ANCHOR_MS = Date.UTC(2025, 0, 1);
const ANCHOR_POPULATION = 8_231_613_070;
const PER_SECOND = 2.23;

function estimatePopulation(now: number) {
  const elapsedSeconds = (now - ANCHOR_MS) / 1000;
  return Math.floor(ANCHOR_POPULATION + elapsedSeconds * PER_SECOND);
}

export default function Footer() {
  // Held null through SSR so the server and client markup agree; the real
  // number lands on mount and then ticks.
  const [population, setPopulation] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setPopulation(estimatePopulation(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="mx-auto flex w-full max-w-[660px] flex-col items-start gap-2 px-4 pt-16 pb-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-base text-primary">
        Curated by{" "}
        <Link href="/" className="group font-medium text-primary">
          <span className="underline decoration-secondary decoration-2 underline-offset-[3px] transition-[text-decoration-color] group-hover:decoration-primary">
            {profile.fullName}
          </span>
        </Link>
      </p>

      <p
        className="text-base text-primary tabular-nums"
        title="You are one of roughly this many people alive right now"
      >
        1 /{" "}
        {population === null ? (
          <span className="text-secondary">&mdash;</span>
        ) : (
          <Odometer value={population.toLocaleString("en-US")} />
        )}
      </p>
    </footer>
  );
}
