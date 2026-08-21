# Assets to drop in

Everything below is optional. The site renders correctly without any of it —
missing images fall back to lettered tiles, and missing postcards remove
themselves from the sentence. Drop a file in the right place and it appears; no
code change needed unless noted.

## 1. Profile photo — done

`public/avatar.jpg`, centre-cropped square from the photo you sent. Replace by
overwriting that path with another square image.

## 2. Logos — done

All nine tiles are in `public/logos/` as 256x256 full-bleed PNGs, built to read
as app icons (the tile clips them to a rounded square, so they fill it edge to
edge rather than sitting contained inside it).

| Logo | Source |
| --- | --- |
| `telo.png`, `inkr.png`, `linkd.png` | Files you sent, trimmed and squared |
| `convexia.png` | convexia.bio web clip |
| `broad.png` | Blue mark cropped from the Broad wordmark |
| `yale.png` | Yale School of Medicine shield |
| `adaptyv.png` | adaptyvbio.com icon |
| `purdue.png` | pfw.edu touch icon |
| `virahacks.png` | virahacks.com favicon, inverted onto brand green |

Replace any of them by dropping a new square PNG at the same path. Brand hover
tints live in `marks` in `lib/content.ts`.

## 3. Postcards

Two files per postcard: a small inline crop and the full image the modal opens.
Both must be **3:2** or they will be cropped to it.

```
public/postcards/fort-wayne-thumb.jpg   ~200px wide
public/postcards/fort-wayne.jpg         ~1600px wide
public/postcards/boston-thumb.jpg       ~200px wide
public/postcards/boston.jpg             ~1600px wide
```

Captions, alt text, and the EXIF line live in `postcards` in `lib/content.ts`.
The `exif` field is blank by default; fill it in for kominko's
`Shot on iPhone 16 Pro · 24mm · ƒ/1.8 · ISO 50 · 1/1385s` line, or leave it
empty and only the caption shows.

To add, remove, or relocate a postcard, edit the `postcards` object and the
corresponding `<Postcard card={...} />` in `app/page.tsx`.

## 4. Spotify

The track is currently hardcoded in `nowPlaying` (lib/content.ts) to
TELEKINESIS by Travis Scott, with the cover at `public/music/telekinesis.jpg`.
Hovering the equaliser bars opens the album card, which links to the track.

To swap it, change `nowPlaying` and drop a new square cover at that path.

To make it live instead, set these three environment variables; whatever
`/api/spotify` returns takes over from the hardcoded track.

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Getting them:

1. Create an app at <https://developer.spotify.com/dashboard>. Copy the Client
   ID and Client Secret.
2. Add `http://localhost:3000/callback` as a Redirect URI in the app settings.
3. Visit this URL in a browser, replacing `CLIENT_ID`, and approve:

   ```
   https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
   ```

4. You land on a broken `localhost/callback?code=...` page. Copy the `code`.
5. Exchange it for a refresh token:

   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Authorization: Basic $(printf '%s:%s' CLIENT_ID CLIENT_SECRET | base64)" \
     -d grant_type=authorization_code \
     -d code=THE_CODE \
     -d redirect_uri=http://localhost:3000/callback
   ```

   The `refresh_token` in the response does not expire. Put all three in
   `.env.local` locally and in the Vercel project's environment variables for
   production.

The equaliser bars are already on the page and already moving; credentials add
the track name and make them link to Spotify. With a track playing the bars
animate, and they hold still when playback is paused.

## 5. Social hover cards

Hovering an icon opens a profile preview. Data lives in `socialCards`
(lib/content.ts).

GitHub's numbers are real, pulled from its public API. Instagram and LinkedIn
have no public API, so their stats are `null` on purpose rather than invented:
fill in `posts` / `followers` / `following` and `connections` and the cards
grow those rows. The GitHub avatar is the default identicon at
`public/social/github-avatar.jpg` until you set a photo on GitHub.

## 6. Book a call

Set `profile.bookingUrl` in `lib/content.ts` to a cal.com or Calendly link. The
primary button switches from "Get in touch" (mailto) to "Book a call", and email
moves into the icon row beside GitHub and LinkedIn.

## 7. Project case studies

Each project already has a page at `/projects/<slug>`. Right now they show the
logo, title, role, tags, one-line summary, and a link out.

To turn one into a full case study like kenemrls's `/findu`, add `sections` and
`stats` to that project in `lib/content.ts`:

```ts
sections: [
  {
    id: "overview",
    heading: "Overview",
    paragraphs: ["First paragraph.", "Second paragraph."],
    image: { src: "/projects/inkr-1.png", alt: "...", caption: "..." },
  },
],
stats: [
  { value: "60K+", label: "Users", detail: "Since launch" },
],
```

The left-rail table of contents builds itself from `sections` and highlights the
active one as you scroll. It only appears once at least one section exists, and
only on screens wide enough to hold it (1280px+).
