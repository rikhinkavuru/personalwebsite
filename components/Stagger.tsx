import type { ReactNode } from "react";

/**
 * Page-load cascade.
 *
 * Wrap a page in <Stagger> and each block in <StaggerItem>; the blocks resolve
 * top to bottom on one timeline instead of every block running its own
 * animation and landing whenever it happens to finish.
 *
 * This is deliberately CSS rather than Framer Motion. A JS-driven variant
 * cascade has to server-render its children at `opacity: 0`, so any delay in
 * hydration shows a blank page. The `.cascade` rules in globals.css run
 * immediately on paint, need no JavaScript, and settle at the natural state.
 * Both components stay server components as a result.
 */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `cascade ${className}` : "cascade"}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Use "section" so the cascade does not flatten the page's landmarks. */
  as?: "div" | "section" | "li" | "p";
}) {
  return <Tag className={className}>{children}</Tag>;
}
