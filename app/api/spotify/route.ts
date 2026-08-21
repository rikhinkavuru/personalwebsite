import { NextResponse } from "next/server";

/**
 * Spotify "now playing / last played" endpoint.
 *
 * Requires three env vars, obtained once via the Authorization Code flow with
 * the `user-read-currently-playing user-read-recently-played` scopes:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_REFRESH_TOKEN
 *
 * With none of them set the route returns `{ track: null }` and the UI hides
 * the row, so the site works fine before Spotify is wired up.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

// Cache for a minute; playback does not need to be second-accurate.
export const revalidate = 60;

type SpotifyArtist = { name: string };
type SpotifyTrack = {
  name: string;
  artists: SpotifyArtist[];
  external_urls: { spotify: string };
};

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

function shape(track: SpotifyTrack, isPlaying: boolean) {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    url: track.external_urls.spotify,
    isPlaying,
  };
}

export async function GET() {
  const token = await getAccessToken();
  if (!token) return NextResponse.json({ track: null });

  const auth = { Authorization: `Bearer ${token}` };

  try {
    const now = await fetch(NOW_PLAYING_URL, { headers: auth, cache: "no-store" });

    // 204 means nothing is playing right now, so fall through to history.
    if (now.status === 200) {
      const data = (await now.json()) as {
        is_playing: boolean;
        item: SpotifyTrack | null;
      };
      if (data.item) {
        return NextResponse.json(shape(data.item, data.is_playing));
      }
    }

    const recent = await fetch(RECENT_URL, { headers: auth, cache: "no-store" });
    if (!recent.ok) return NextResponse.json({ track: null });

    const history = (await recent.json()) as {
      items: { track: SpotifyTrack }[];
    };
    const last = history.items?.[0]?.track;
    if (!last) return NextResponse.json({ track: null });

    return NextResponse.json(shape(last, false));
  } catch {
    return NextResponse.json({ track: null });
  }
}
