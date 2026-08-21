"use client";

import { useEffect, useRef, useState } from "react";

/**
 * <img> that swaps in a fallback when the file is missing.
 *
 * A plain onError handler is not enough: the browser can finish (and fail) the
 * request before React hydrates, so the handler is never attached and the
 * broken-image glyph sticks. The post-mount `naturalWidth === 0` check catches
 * exactly that case.
 */
export default function FallbackImage({
  src,
  alt,
  className,
  style,
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      // Empty until it loads, so a failed request never paints alt text.
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
