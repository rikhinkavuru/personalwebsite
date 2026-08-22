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
    let running = false;

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
      start();
      if (dot.current) {
        dot.current.style.transform = `translate(${targetX - 2}px, ${targetY - 2}px)`;
      }
    };

    // The loop only runs while the ring is still catching up. Leaving a
    // requestAnimationFrame running for the life of the page costs a frame of
    // main-thread work forever, for nothing once the cursor has settled.
    const tick = () => {
      const dx = targetX - ringX;
      const dy = targetY - ringY;
      ringX += dx * 0.18;
      ringY += dy * 0.18;

      if (ring.current) {
        ring.current.style.transform = `translate(${ringX - 10}px, ${ringY - 10}px)`;
      }

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const hide = () => {
      ring.current?.classList.remove("visible");
      dot.current?.classList.remove("visible");
    };

    // Re-entering: jump straight to the pointer instead of easing in from
    // wherever the ring was abandoned.
    const show = (e: MouseEvent) => {
      ringX = targetX = e.clientX;
      ringY = targetY = e.clientY;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringX - 10}px, ${ringY - 10}px)`;
        ring.current.classList.add("visible");
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${ringX - 2}px, ${ringY - 2}px)`;
        dot.current.classList.add("visible");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
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
