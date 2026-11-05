import { NextResponse, type NextRequest } from "next/server";
import { profile } from "@/lib/content";
import { siteName } from "@/lib/site";

/**
 * Temporary "site is being updated" gate. Delete this file to unveil the site.
 *
 * Only production is gated, so `next dev` and Vercel previews show the real
 * site. On production, visiting /?bypass=<MAINTENANCE_BYPASS> sets a cookie
 * that lets that browser through. If the variable is unset nobody gets through.
 */
const BYPASS_PARAM = "bypass";
const BYPASS_COOKIE = "site-preview";
const THIRTY_DAYS = 60 * 60 * 24 * 30;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${siteName}</title>
<script>
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
</script>
<style>
  :root { --bg: #ffffff; --ink: #2d2d2d; --muted: #79716b; }
  .dark { --bg: #101010; --ink: #f5f5f4; --muted: #a8a29e; }
  * { margin: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: var(--bg);
    color: var(--ink);
    font-family: "SF Pro", "SF Pro Display", -apple-system, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  main { width: 100%; max-width: 660px; margin: 0 auto; padding: 96px 16px; }
  img { display: block; width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
  .name { margin-top: 16px; font-size: 14px; font-weight: 500; color: var(--muted); }
  h1 { margin-top: 8px; font-size: 30px; font-weight: 600; letter-spacing: -0.02em; }
  .note { margin-top: 8px; font-size: 16px; color: var(--muted); }
  nav { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 24px; font-size: 14px; font-weight: 500; }
  a { color: var(--muted); transition: color 0.15s; }
  a:hover { color: var(--ink); }
</style>
</head>
<body>
<main>
  <img src="${profile.avatar}" alt="">
  <p class="name">${siteName}</p>
  <h1>Site is being updated</h1>
  <p class="note">Back soon.</p>
  <nav>
    <a href="mailto:${profile.email}">Email</a>
    <a href="${profile.github}">GitHub</a>
    <a href="${profile.linkedin}">LinkedIn</a>
  </nav>
</main>
</body>
</html>`;

export function middleware(request: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") return NextResponse.next();

  const secret = process.env.MAINTENANCE_BYPASS;
  if (secret) {
    if (request.nextUrl.searchParams.get(BYPASS_PARAM) === secret) {
      const clean = request.nextUrl.clone();
      clean.searchParams.delete(BYPASS_PARAM);
      const response = NextResponse.redirect(clean);
      response.cookies.set(BYPASS_COOKIE, secret, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: THIRTY_DAYS,
      });
      return response;
    }
    if (request.cookies.get(BYPASS_COOKIE)?.value === secret) {
      return NextResponse.next();
    }
  }

  // 503 tells search engines this is temporary, so they keep the real pages.
  return new NextResponse(html, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "3600",
    },
  });
}

export const config = {
  // Pages only: assets, API routes and favicons pass through untouched.
  matcher: ["/((?!_next/|api/|icon|apple-icon|.*\\..*).*)"],
};
