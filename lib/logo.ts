/**
 * Personal mark: a concentric bullseye head over concentric arches.
 * Single source for the favicon, the apple touch icon, and the OG card.
 *
 * The viewBox is the tight bounding box of the strokes, so callers control
 * padding themselves.
 */
export const logoAspect = 176 / 214;

export function logoSvg(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 29 176 214" fill="none">
<circle cx="100" cy="80" r="44" stroke="${color}" stroke-width="14"/>
<circle cx="100" cy="80" r="26" stroke="${color}" stroke-width="10"/>
<circle cx="100" cy="80" r="8" fill="${color}"/>
<path d="M20 235 A80 80 0 0 1 180 235" stroke="${color}" stroke-width="16"/>
<path d="M46 235 A54 54 0 0 1 154 235" stroke="${color}" stroke-width="14"/>
<path d="M69 235 A31 31 0 0 1 131 235" stroke="${color}" stroke-width="12"/>
<path d="M89 235 A11 11 0 0 1 111 235" stroke="${color}" stroke-width="12"/>
</svg>`;
}

export function logoDataUri(color: string) {
  return `data:image/svg+xml;base64,${Buffer.from(logoSvg(color)).toString("base64")}`;
}
