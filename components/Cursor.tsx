"use client";

import { useEffect, useRef } from "react";

/**
 * Ring + dot cursor. The dot tracks the pointer exactly, the ring lags behind
 * and doubles in size over anything clickable.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    document.documentElement.classList.add("cursor-active");

    // Hidden until the pointer first moves, otherwise both elements park at
    // the top-left corner as a visible artefact.
    let seen = false;

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    // The ring deliberately does not react to hover targets: growing and
    // filling it fought with the hover states of the things underneath.
    const move = (e: MouseEvent) => {
      if (!seen) {
        seen = true;
        ringX = e.clientX;
        ringY = e.clientY;
        ring.current?.classList.add("visible");
        dot.current?.classList.add("visible");
      }
      targetX = e.clientX;
      targetY = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${targetX - 2}px, ${targetY - 2}px)`;
      }
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringX - 10}px, ${ringY - 10}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
