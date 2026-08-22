"use client";

import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import { EASE } from "@/lib/motion";
import { useModal } from "@/lib/useModal";

/**
 * Portalled modal shell: backdrop, entrance, dismissal, and scroll lock.
 *
 * The postcard, project, and paper dialogs were three near-identical copies of
 * this. They differ only in how the panel is sized and coloured, so that is all
 * a caller passes.
 *
 * Portalled to <body> because callers sit inside paragraphs and flex rows,
 * where a fixed overlay would inherit a stacking or containing block.
 */
export default function Overlay({
  open,
  onClose,
  label,
  panelClassName,
  panelStyle,
  backdropClassName = "bg-black/80",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  panelClassName: string;
  panelStyle?: CSSProperties;
  backdropClassName?: string;
  children: ReactNode;
}) {
  const mounted = useModal(open, onClose);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6 ${backdropClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className={panelClassName}
            style={panelStyle}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
