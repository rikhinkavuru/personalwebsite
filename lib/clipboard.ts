/**
 * Copy text, falling back to a hidden field when the Clipboard API is
 * unavailable — it needs a secure origin, so plain-HTTP previews would
 * otherwise silently do nothing.
 *
 * Returns whether the copy actually happened, so callers only show success
 * when there was some.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      document.body.removeChild(field);
    }
  }
}
