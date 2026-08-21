import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Whether a file exists under /public. Server-only, resolved at build time.
 *
 * This is what keeps optional images from causing layout shift. A client-side
 * `onError` fallback can only fire after the element has already rendered and
 * taken up space, so a missing postcard would appear inline and then vanish
 * mid-animation, reflowing the paragraph around it. Checking on the server
 * means the markup is correct on the very first paint.
 */
export function hasPublicFile(publicPath: string): boolean {
  const relative = publicPath.replace(/^\//, "");
  // Guard against a path escaping /public via traversal.
  if (relative.includes("..")) return false;
  return existsSync(join(process.cwd(), "public", relative));
}
